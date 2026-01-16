import { NextRequest, NextResponse } from "next/server"
import type { Resend } from "resend"
import OpenAI from "openai"

// Types
interface FormData {
  fullName: string
  email: string
  companyName: string
  jobTitle: string
  phone?: string
  partnerType: string
  message?: string
}

interface AIAnalysis {
  partnerScore: number
  companyProfile: string
  partnerFit: string
  potentialReach: string
  talkingPoints: string[]
  concerns: string[]
}

// Partnership type labels
const partnerTypeLabels: Record<string, string> = {
  reseller: "Reseller Partner",
  distributor: "Distributor Partner",
  technology: "Technology Partner",
  implementation: "Implementation Partner",
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

async function analyzePartnerWithAI(data: FormData): Promise<AIAnalysis | null> {
  if (!process.env.OPENAI_API_KEY) {
    console.log("OpenAI API key not configured, skipping AI analysis")
    return null
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const domain = data.email.split('@')[1]
  const partnerTypeLabel = partnerTypeLabels[data.partnerType] || data.partnerType

  const prompt = `You are a partnership analyst for MRO Command, an AI-powered MRO (Maintenance, Repair, and Operations) procurement SaaS platform. Analyze this potential partner and provide insights.

WHAT MRO COMMAND DOES:
- AI-powered RFQ creation and vendor matching
- Multi-channel intake (SMS, email, kiosk, QR codes)
- Automatic quote parsing and comparison
- Inventory tracking and management
- Used by maintenance teams in manufacturing, industrial facilities

PARTNERSHIP TYPES:
- Reseller: Consultants/firms who can refer or sell to their clients
- Distributor: Parts vendors who want to receive RFQs through the platform
- Technology: ERP/CMMS vendors who want to integrate
- Implementation: System integrators who help deploy

PARTNER APPLICATION:
- Email Domain: ${domain}
- Company Name: ${data.companyName}
- Contact Name: ${data.fullName}
- Job Title: ${data.jobTitle}
- Partnership Type: ${partnerTypeLabel}
- Their Message: ${data.message || "Not provided"}

Based on this information, provide a JSON response with:
{
  "partnerScore": <number 1-10, where 10 is ideal partner>,
  "companyProfile": "<1-2 sentences guessing what the company does based on domain and name>",
  "partnerFit": "<1-2 sentences on how well they fit the ${partnerTypeLabel} model>",
  "potentialReach": "<estimate their potential reach - how many clients/deals could they bring?>",
  "talkingPoints": ["<3-4 things to discuss with them based on their profile>"],
  "concerns": ["<any red flags or things to verify, or empty array if none>"]
}

Be specific. Consider their company type and how it aligns with the partnership model they selected.
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

    const analysis = JSON.parse(content) as AIAnalysis
    return analysis
  } catch (error) {
    console.error("AI analysis failed:", error)
    return null
  }
}

function formatEmailBody(data: FormData, analysis: AIAnalysis | null): string {
  const partnerTypeLabel = partnerTypeLabels[data.partnerType] || data.partnerType
  
  const scoreEmoji = analysis 
    ? analysis.partnerScore >= 8 ? "🔥" 
      : analysis.partnerScore >= 6 ? "⭐" 
      : analysis.partnerScore >= 4 ? "👀" 
      : "📝"
    : "📝"

  const scoreSection = analysis 
    ? `${scoreEmoji} Partner Score: ${analysis.partnerScore}/10`
    : "📝 Partner Score: AI analysis unavailable"

  let emailBody = `
🤝 NEW PARTNER APPLICATION - ${scoreSection}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARTNERSHIP TYPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${partnerTypeLabel}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}
Company: ${data.companyName}
Title: ${data.jobTitle}
`

  if (data.message) {
    emailBody += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ABOUT THEIR BUSINESS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"${data.message}"
`
  }

  if (analysis) {
    emailBody += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AI ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 COMPANY PROFILE
${analysis.companyProfile}

🤝 PARTNER FIT
${analysis.partnerFit}

📈 POTENTIAL REACH
${analysis.potentialReach}

💬 TALKING POINTS
${analysis.talkingPoints.map((point, i) => `${i + 1}. ${point}`).join('\n')}
`

    if (analysis.concerns && analysis.concerns.length > 0) {
      emailBody += `
⚠️ THINGS TO VERIFY
${analysis.concerns.map(c => `• ${c}`).join('\n')}
`
    }
  }

  emailBody += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted via mrocommand.com/partners
`

  return emailBody
}

export async function POST(request: NextRequest) {
  try {
    const data: FormData = await request.json()

    // Validate required fields
    if (!data.fullName || !data.email || !data.companyName || !data.jobTitle || !data.partnerType) {
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
    const analysis = await analyzePartnerWithAI(data)

    // Format email
    const emailBody = formatEmailBody(data, analysis)
    const scoreText = analysis ? ` [Score: ${analysis.partnerScore}/10]` : ""
    const partnerTypeLabel = partnerTypeLabels[data.partnerType] || data.partnerType

    // Send email
    if (!process.env.RESEND_API_KEY) {
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

    const { Resend } = await import("resend")
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error: emailError } = await resend.emails.send({
      from: "MRO Command <notifications@mrocommand.com>",
      to: "dylnn@mrocommand.com",
      subject: `Partner Application: ${data.companyName} (${partnerTypeLabel})${scoreText}`,
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
    console.error("Partner request error:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
