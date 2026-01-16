import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import OpenAI from "openai"

// Types
interface FormData {
  fullName: string
  email: string
  companyName: string
  jobTitle: string
  companySize: string
  phone?: string
  challenge?: string
  hearAboutUs?: string
  requestType: "demo" | "pilot"
}

interface AIAnalysis {
  leadScore: number
  companyProfile: string
  industryFit: string
  potentialValue: string
  talkingPoints: string[]
  redFlags: string[]
}

// Blocked personal email domains
const BLOCKED_DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
  'aol.com', 'icloud.com', 'protonmail.com', 'mail.com',
  'ymail.com', 'live.com', 'msn.com', 'me.com',
  'comcast.net', 'verizon.net', 'att.net', 'sbcglobal.net',
  'bellsouth.net', 'cox.net', 'earthlink.net', 'juno.com',
  'zoho.com', 'gmx.com', 'mailinator.com', 'guerrillamail.com',
  'tempmail.com', 'throwaway.email', 'sharklasers.com',
  'googlemail.com', 'fastmail.com', 'tutanota.com', 'hey.com'
]

function isWorkEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase()
  return domain ? !BLOCKED_DOMAINS.includes(domain) : false
}

async function analyzeLeadWithAI(data: FormData): Promise<AIAnalysis | null> {
  if (!process.env.OPENAI_API_KEY) {
    console.log("OpenAI API key not configured, skipping AI analysis")
    return null
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const domain = data.email.split('@')[1]

  const prompt = `You are a sales intelligence assistant for MRO Command, an AI-powered MRO (Maintenance, Repair, and Operations) procurement SaaS platform. Analyze this lead and provide insights.

WHAT MRO COMMAND DOES:
- AI-powered RFQ creation and vendor matching
- Multi-channel intake (SMS, email, kiosk, QR codes)
- Automatic quote parsing and comparison
- Inventory tracking and management
- Floor-level troubleshooting with AI agent
- Project mode for multi-phase maintenance projects

LEAD INFORMATION:
- Email Domain: ${domain}
- Company Name: ${data.companyName}
- Contact Name: ${data.fullName}
- Job Title: ${data.jobTitle}
- Company Size: ${data.companySize}
- Their Challenge: ${data.challenge || "Not specified"}
- Request Type: ${data.requestType}
- How they heard about us: ${data.hearAboutUs || "Not specified"}

Based on this information, provide a JSON response with the following structure:
{
  "leadScore": <number 1-10, where 10 is perfect fit>,
  "companyProfile": "<1-2 sentences guessing what the company does based on the domain and name>",
  "industryFit": "<1-2 sentences on how well MRO software fits their likely industry>",
  "potentialValue": "<estimate of potential value - consider company size, likely MRO spend, pain points>",
  "talkingPoints": ["<3-4 personalized talking points for the demo based on their role and challenge>"],
  "redFlags": ["<any concerns or things to clarify, or empty array if none>"]
}

Be specific and actionable. If the company domain suggests a specific industry, mention relevant features.
Return ONLY valid JSON, no markdown or explanation.`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 800,
    })

    const content = completion.choices[0]?.message?.content
    if (!content) return null

    // Parse the JSON response
    const analysis = JSON.parse(content) as AIAnalysis
    return analysis
  } catch (error) {
    console.error("AI analysis failed:", error)
    return null
  }
}

function formatEmailBody(data: FormData, analysis: AIAnalysis | null): string {
  const requestTypeEmoji = data.requestType === "demo" ? "📅" : "🚀"
  const requestTypeLabel = data.requestType === "demo" ? "DEMO REQUEST" : "PILOT REQUEST"
  
  const leadScoreEmoji = analysis 
    ? analysis.leadScore >= 8 ? "🔥" 
      : analysis.leadScore >= 6 ? "⭐" 
      : analysis.leadScore >= 4 ? "👀" 
      : "📝"
    : "📝"

  const leadScoreSection = analysis 
    ? `${leadScoreEmoji} Lead Score: ${analysis.leadScore}/10`
    : "📝 Lead Score: AI analysis unavailable"

  let emailBody = `
${requestTypeEmoji} NEW ${requestTypeLabel} - ${leadScoreSection}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}
Company: ${data.companyName}
Title: ${data.jobTitle}
Size: ${data.companySize} employees
Source: ${data.hearAboutUs || "Not specified"}
`

  if (data.challenge) {
    emailBody += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THEIR CHALLENGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"${data.challenge}"
`
  }

  if (analysis) {
    emailBody += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AI ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 COMPANY PROFILE
${analysis.companyProfile}

🏭 INDUSTRY FIT
${analysis.industryFit}

💰 POTENTIAL VALUE
${analysis.potentialValue}

💬 TALKING POINTS FOR DEMO
${analysis.talkingPoints.map((point, i) => `${i + 1}. ${point}`).join('\n')}
`

    if (analysis.redFlags && analysis.redFlags.length > 0) {
      emailBody += `
⚠️ THINGS TO CLARIFY
${analysis.redFlags.map(flag => `• ${flag}`).join('\n')}
`
    }
  }

  emailBody += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted via mrocommand.com/demo
`

  return emailBody
}

export async function POST(request: NextRequest) {
  try {
    const data: FormData = await request.json()

    // Validate required fields
    if (!data.fullName || !data.email || !data.companyName || !data.jobTitle || !data.companySize) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Validate work email
    if (!isWorkEmail(data.email)) {
      return NextResponse.json(
        { error: "Please use your work email address" },
        { status: 400 }
      )
    }

    // Run AI analysis
    const analysis = await analyzeLeadWithAI(data)

    // Format email
    const emailBody = formatEmailBody(data, analysis)
    const leadScoreText = analysis ? ` [Score: ${analysis.leadScore}/10]` : ""
    const requestTypeLabel = data.requestType === "demo" ? "Demo" : "Pilot"

    // Send email
    if (!process.env.RESEND_API_KEY) {
      // If no Resend key, log to console for development
      console.log("=".repeat(60))
      console.log("EMAIL WOULD BE SENT TO: dylnn@mrocommand.com")
      console.log("=".repeat(60))
      console.log(emailBody)
      console.log("=".repeat(60))
      
      return NextResponse.json({ 
        success: true, 
        message: "Form submitted (email logging mode - no RESEND_API_KEY)" 
      })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error: emailError } = await resend.emails.send({
      from: "MRO Command <notifications@mrocommand.com>",
      to: "dylnn@mrocommand.com",
      subject: `${requestTypeLabel} Request: ${data.companyName}${leadScoreText}`,
      text: emailBody,
      replyTo: data.email,
    })

    if (emailError) {
      console.error("Failed to send email:", emailError)
      return NextResponse.json(
        { error: "Failed to send notification. Please try again." },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Demo request error:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
