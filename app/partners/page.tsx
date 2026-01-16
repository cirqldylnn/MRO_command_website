"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { cn } from "@/lib/utils"

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

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email").refine(isWorkEmail, {
    message: "Please use your work email address"
  }),
  companyName: z.string().min(2, "Company name is required"),
  jobTitle: z.string().min(2, "Job title is required"),
  phone: z.string().optional(),
  partnerType: z.string().min(1, "Please select a partnership type"),
  message: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

// Partnership types with benefits
const partnershipTypes = [
  {
    id: "reseller",
    title: "Reseller Partner",
    icon: "🤝",
    tagline: "Earn commission while helping your clients modernize MRO operations.",
    color: "accent",
    benefits: [
      "Competitive commission on every closed deal",
      "\"Preferred Vendor\" status when RFQs are sent out",
      "Co-branded marketing materials and case studies",
      "Dedicated partner success manager",
      "Early access to new features and roadmap",
    ],
  },
  {
    id: "distributor",
    title: "Distributor Partner",
    icon: "📦",
    tagline: "Get qualified RFQs directly from maintenance teams using MRO Command.",
    color: "emerald",
    benefits: [
      "Direct access to active RFQs in your product categories",
      "Faster quote-to-order with structured, complete requests",
      "Performance analytics and win rate tracking",
      "Priority placement for responsive vendors",
      "No cold outreach — they're already looking to buy",
    ],
  },
  {
    id: "technology",
    title: "Technology Partner",
    icon: "🔗",
    tagline: "Integrate your ERP, CMMS, or software with MRO Command.",
    color: "violet",
    benefits: [
      "Full API access for deep integrations",
      "Joint solution selling opportunities",
      "Shared customer success stories",
      "Technical co-development support",
      "Partner directory listing and referrals",
    ],
  },
  {
    id: "implementation",
    title: "Implementation Partner",
    icon: "🛠️",
    tagline: "Help clients deploy and get value from MRO Command.",
    color: "cyan",
    benefits: [
      "Partner certification and training",
      "Implementation referral fees",
      "Access to client leads in your region",
      "Co-selling support from our team",
      "White-glove onboarding resources",
    ],
  },
]

const colorClasses: Record<string, { bg: string; border: string; text: string; ring: string }> = {
  accent: { bg: "bg-accent/10", border: "border-accent/30", text: "text-accent", ring: "ring-accent/50" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", ring: "ring-emerald-500/50" },
  violet: { bg: "bg-violet-500/10", border: "border-violet-500/30", text: "text-violet-400", ring: "ring-violet-500/50" },
  cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400", ring: "ring-cyan-500/50" },
}

export default function PartnersPage() {
  const searchParams = useSearchParams()
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  // Check URL params for pre-selected type
  useEffect(() => {
    const typeParam = searchParams.get("type")
    if (typeParam && partnershipTypes.some(p => p.id === typeParam)) {
      setSelectedType(typeParam)
      setValue("partnerType", typeParam)
    }
  }, [searchParams, setValue])

  const handleCardClick = (typeId: string) => {
    setSelectedType(typeId)
    setValue("partnerType", typeId)
    // Scroll to form
    document.getElementById("partner-form")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/partner-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong")
      }

      setIsSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-lg text-center">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-accent/20 flex items-center justify-center">
            <span className="text-4xl">🤝</span>
          </div>
          
          <h1 className="font-[var(--font-bebas)] text-5xl md:text-6xl tracking-tight mb-4">
            LET'S DO THIS.
          </h1>
          
          <p className="font-mono text-sm text-muted-foreground mb-8 leading-relaxed">
            Thanks for your interest in partnering with us! We'll review your application 
            and reach out within 2 business days to discuss next steps.
          </p>
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-sm text-accent hover:underline"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to homepage
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/30 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-mono text-sm text-accent font-bold tracking-wider">MRO.ai</span>
          </Link>
          <Link
            href="/"
            className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="max-w-3xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            Partner Program
          </span>
          <h1 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
            GROW WITH US.<br />
            <span className="text-accent">PARTNER WITH MRO COMMAND.</span>
          </h1>
          
          <p className="mt-6 font-mono text-sm text-muted-foreground leading-relaxed max-w-2xl">
            Whether you're a consultant, distributor, technology vendor, or integrator — 
            there's a partnership model that works for you. Help maintenance teams work smarter 
            while growing your business.
          </p>
        </div>
      </section>

      {/* Partnership Cards */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="mb-8">
          <h2 className="font-mono text-xs uppercase tracking-wider text-zinc-500">
            Choose Your Partnership Type
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {partnershipTypes.map((type) => {
            const colors = colorClasses[type.color]
            const isSelected = selectedType === type.id
            
            return (
              <button
                key={type.id}
                onClick={() => handleCardClick(type.id)}
                className={cn(
                  "text-left p-6 rounded-xl border-2 transition-all duration-300",
                  "hover:scale-[1.02] hover:shadow-lg",
                  isSelected
                    ? cn(colors.border, colors.bg, "ring-2", colors.ring)
                    : "border-border/50 bg-zinc-900/30 hover:border-zinc-700"
                )}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center text-2xl",
                      colors.bg
                    )}>
                      {type.icon}
                    </div>
                    <div>
                      <h3 className={cn(
                        "font-mono text-lg font-bold transition-colors",
                        isSelected ? colors.text : "text-foreground"
                      )}>
                        {type.title}
                      </h3>
                    </div>
                  </div>
                  {isSelected && (
                    <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", colors.bg)}>
                      <svg className={cn("w-4 h-4", colors.text)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Tagline */}
                <p className="font-mono text-sm text-muted-foreground mb-4">
                  {type.tagline}
                </p>

                {/* Benefits */}
                <div className="space-y-2">
                  {type.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <svg className={cn("w-4 h-4 mt-0.5 flex-shrink-0", colors.text)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-mono text-xs text-zinc-400">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA hint */}
                <div className={cn(
                  "mt-6 pt-4 border-t flex items-center justify-between",
                  isSelected ? colors.border.replace("border-", "border-t-") : "border-border/30"
                )}>
                  <span className={cn(
                    "font-mono text-xs",
                    isSelected ? colors.text : "text-zinc-500"
                  )}>
                    {isSelected ? "Selected — fill out form below" : "Click to select"}
                  </span>
                  <svg className={cn("w-4 h-4", isSelected ? colors.text : "text-zinc-600")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Form Section */}
      <section id="partner-form" className="max-w-6xl mx-auto px-6 pb-24">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-[var(--font-bebas)] text-4xl tracking-tight mb-2">
              TELL US ABOUT YOURSELF
            </h2>
            <p className="font-mono text-sm text-muted-foreground">
              We'll review your application and reach out within 2 business days.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Partnership Type (hidden but validated) */}
            <input type="hidden" {...register("partnerType")} />
            
            {selectedType ? (
              <div className={cn(
                "p-4 rounded-lg border flex items-center justify-between",
                colorClasses[partnershipTypes.find(p => p.id === selectedType)?.color || "accent"].border,
                colorClasses[partnershipTypes.find(p => p.id === selectedType)?.color || "accent"].bg
              )}>
                <div className="flex items-center gap-3">
                  <span className="text-xl">{partnershipTypes.find(p => p.id === selectedType)?.icon}</span>
                  <span className="font-mono text-sm font-medium">
                    {partnershipTypes.find(p => p.id === selectedType)?.title}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedType(null)
                    setValue("partnerType", "")
                  }}
                  className="font-mono text-xs text-zinc-500 hover:text-foreground"
                >
                  Change
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-lg border border-amber-500/30 bg-amber-500/10">
                <p className="font-mono text-sm text-amber-400">
                  ↑ Please select a partnership type above
                </p>
              </div>
            )}
            {errors.partnerType && (
              <p className="font-mono text-xs text-red-500">{errors.partnerType.message}</p>
            )}

            {/* Name and Email */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-zinc-500 mb-2">
                  Full Name *
                </label>
                <input
                  {...register("fullName")}
                  type="text"
                  placeholder="John Smith"
                  className={cn(
                    "w-full px-4 py-3 bg-zinc-900/50 border rounded-lg font-mono text-sm",
                    "placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent",
                    "transition-all",
                    errors.fullName ? "border-red-500" : "border-border/50"
                  )}
                />
                {errors.fullName && (
                  <p className="mt-1 font-mono text-xs text-red-500">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-zinc-500 mb-2">
                  Work Email *
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="john@company.com"
                  className={cn(
                    "w-full px-4 py-3 bg-zinc-900/50 border rounded-lg font-mono text-sm",
                    "placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent",
                    "transition-all",
                    errors.email ? "border-red-500" : "border-border/50"
                  )}
                />
                {errors.email && (
                  <p className="mt-1 font-mono text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Company and Title */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-zinc-500 mb-2">
                  Company Name *
                </label>
                <input
                  {...register("companyName")}
                  type="text"
                  placeholder="Acme Industrial Services"
                  className={cn(
                    "w-full px-4 py-3 bg-zinc-900/50 border rounded-lg font-mono text-sm",
                    "placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent",
                    "transition-all",
                    errors.companyName ? "border-red-500" : "border-border/50"
                  )}
                />
                {errors.companyName && (
                  <p className="mt-1 font-mono text-xs text-red-500">{errors.companyName.message}</p>
                )}
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-zinc-500 mb-2">
                  Job Title *
                </label>
                <input
                  {...register("jobTitle")}
                  type="text"
                  placeholder="Director of Sales"
                  className={cn(
                    "w-full px-4 py-3 bg-zinc-900/50 border rounded-lg font-mono text-sm",
                    "placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent",
                    "transition-all",
                    errors.jobTitle ? "border-red-500" : "border-border/50"
                  )}
                />
                {errors.jobTitle && (
                  <p className="mt-1 font-mono text-xs text-red-500">{errors.jobTitle.message}</p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-zinc-500 mb-2">
                Phone <span className="text-zinc-600">(optional)</span>
              </label>
              <input
                {...register("phone")}
                type="tel"
                placeholder="(555) 123-4567"
                className={cn(
                  "w-full px-4 py-3 bg-zinc-900/50 border border-border/50 rounded-lg font-mono text-sm",
                  "placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent",
                  "transition-all"
                )}
              />
            </div>

            {/* Message */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-zinc-500 mb-2">
                Tell us about your business <span className="text-zinc-600">(optional)</span>
              </label>
              <textarea
                {...register("message")}
                rows={4}
                placeholder="E.g., We're an MRO consulting firm with 50+ manufacturing clients in the Midwest. We're looking to add MRO Command to our service offerings..."
                className={cn(
                  "w-full px-4 py-3 bg-zinc-900/50 border border-border/50 rounded-lg font-mono text-sm",
                  "placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent",
                  "transition-all resize-none"
                )}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="font-mono text-sm text-red-500">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || !selectedType}
              className={cn(
                "w-full py-4 rounded-lg font-mono text-sm font-bold transition-all duration-200",
                "flex items-center justify-center gap-3",
                isSubmitting || !selectedType
                  ? "bg-accent/50 text-black/50 cursor-not-allowed"
                  : "bg-accent text-black hover:bg-accent/90 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/25"
              )}
            >
              {isSubmitting ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>

            <p className="font-mono text-[10px] text-zinc-600 text-center">
              By submitting, you agree to our{" "}
              <a href="#" className="text-zinc-500 hover:text-foreground">Privacy Policy</a>
              {" "}and{" "}
              <a href="#" className="text-zinc-500 hover:text-foreground">Terms of Service</a>.
            </p>
          </form>
        </div>
      </section>
    </main>
  )
}
