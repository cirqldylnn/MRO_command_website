"use client"

import { useState, useEffect, Suspense } from "react"
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
  companySize: z.string().min(1, "Please select company size"),
  phone: z.string().optional(),
  challenge: z.string().optional(),
  hearAboutUs: z.string().optional(),
  requestType: z.enum(["demo", "pilot"]),
})

type FormData = z.infer<typeof formSchema>

const companySizeOptions = [
  { value: "1-50", label: "1-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1,000 employees" },
  { value: "1000+", label: "1,000+ employees" },
]

const hearAboutUsOptions = [
  { value: "", label: "Select an option" },
  { value: "search", label: "Google / Search" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "referral", label: "Referral / Word of mouth" },
  { value: "conference", label: "Trade show / Conference" },
  { value: "article", label: "Article / Blog" },
  { value: "other", label: "Other" },
]

function DemoPageContent() {
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [requestType, setRequestType] = useState<"demo" | "pilot">("demo")

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requestType: "demo",
    },
  })

  // Check URL params for request type on mount
  useEffect(() => {
    const typeParam = searchParams.get("type")
    if (typeParam === "pilot") {
      setRequestType("pilot")
      setValue("requestType", "pilot")
    }
  }, [searchParams, setValue])

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/demo-request", {
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

  const handleRequestTypeChange = (type: "demo" | "pilot") => {
    setRequestType(type)
    setValue("requestType", type)
  }

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-lg text-center">
          {/* Success icon */}
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-accent/20 flex items-center justify-center">
            <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="font-[var(--font-bebas)] text-5xl md:text-6xl tracking-tight mb-4">
            YOU'RE IN.
          </h1>
          
          <p className="font-mono text-sm text-muted-foreground mb-8 leading-relaxed">
            We've received your request and will be in touch within 24 hours. 
            Keep an eye on your inbox for next steps.
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

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Info */}
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              Get Started
            </span>
            <h1 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
              LET'S TALK<br />
              <span className="text-accent">MRO.</span>
            </h1>
            
            <p className="mt-6 font-mono text-sm text-muted-foreground leading-relaxed max-w-md">
              Fill out the form and we'll reach out within 24 hours to schedule a personalized demo 
              or discuss starting a pilot with your team.
            </p>

            {/* What to expect */}
            <div className="mt-12 space-y-6">
              <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                What to expect
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-sm text-accent">1</span>
                  </div>
                  <div>
                    <div className="font-mono text-sm text-foreground">Quick intro call</div>
                    <div className="font-mono text-xs text-muted-foreground">15 minutes to understand your workflow</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-sm text-accent">2</span>
                  </div>
                  <div>
                    <div className="font-mono text-sm text-foreground">Personalized demo</div>
                    <div className="font-mono text-xs text-muted-foreground">See the system with your use cases</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-sm text-accent">3</span>
                  </div>
                  <div>
                    <div className="font-mono text-sm text-foreground">Pilot setup</div>
                    <div className="font-mono text-xs text-muted-foreground">Up and running in under a week</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust signals */}
            <div className="mt-12 pt-8 border-t border-border/30">
              <div className="flex flex-wrap gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-mono text-xs">No commitment</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-mono text-xs">No credit card</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-mono text-xs">Your vendors</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Form */}
          <div>
            {/* Request type toggle */}
            <div className="mb-8">
              <div className="inline-flex rounded-lg border border-border/50 p-1 bg-zinc-900/50">
                <button
                  type="button"
                  onClick={() => handleRequestTypeChange("demo")}
                  className={cn(
                    "px-6 py-2 rounded-md font-mono text-sm transition-all",
                    requestType === "demo"
                      ? "bg-accent text-black font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Book a Demo
                </button>
                <button
                  type="button"
                  onClick={() => handleRequestTypeChange("pilot")}
                  className={cn(
                    "px-6 py-2 rounded-md font-mono text-sm transition-all",
                    requestType === "pilot"
                      ? "bg-accent text-black font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Start a Pilot
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name and Email row */}
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

              {/* Company and Title row */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-zinc-500 mb-2">
                    Company Name *
                  </label>
                  <input
                    {...register("companyName")}
                    type="text"
                    placeholder="Acme Manufacturing"
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
                    placeholder="Maintenance Manager"
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

              {/* Company Size and Phone row */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-zinc-500 mb-2">
                    Company Size *
                  </label>
                  <select
                    {...register("companySize")}
                    className={cn(
                      "w-full px-4 py-3 bg-zinc-900/50 border rounded-lg font-mono text-sm",
                      "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent",
                      "transition-all appearance-none cursor-pointer",
                      errors.companySize ? "border-red-500" : "border-border/50",
                      "text-zinc-400"
                    )}
                    defaultValue=""
                  >
                    <option value="" disabled>Select size</option>
                    {companySizeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {errors.companySize && (
                    <p className="mt-1 font-mono text-xs text-red-500">{errors.companySize.message}</p>
                  )}
                </div>

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
              </div>

              {/* Challenge textarea */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-zinc-500 mb-2">
                  What's your biggest MRO challenge? <span className="text-zinc-600">(optional)</span>
                </label>
                <textarea
                  {...register("challenge")}
                  rows={3}
                  placeholder="E.g., spending too much time chasing quotes, hard to track what we have in inventory, floor workers can't easily request parts..."
                  className={cn(
                    "w-full px-4 py-3 bg-zinc-900/50 border border-border/50 rounded-lg font-mono text-sm",
                    "placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent",
                    "transition-all resize-none"
                  )}
                />
              </div>

              {/* How did you hear about us */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-zinc-500 mb-2">
                  How did you hear about us? <span className="text-zinc-600">(optional)</span>
                </label>
                <select
                  {...register("hearAboutUs")}
                  className={cn(
                    "w-full px-4 py-3 bg-zinc-900/50 border border-border/50 rounded-lg font-mono text-sm",
                    "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent",
                    "transition-all appearance-none cursor-pointer text-zinc-400"
                  )}
                  defaultValue=""
                >
                  {hearAboutUsOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Error message */}
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="font-mono text-sm text-red-500">{error}</p>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full py-4 rounded-lg font-mono text-sm font-bold transition-all duration-200",
                  "flex items-center justify-center gap-3",
                  isSubmitting
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
                    Processing...
                  </>
                ) : (
                  <>
                    {requestType === "demo" ? "Request Demo" : "Start Pilot"}
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
        </div>
      </div>
    </main>
  )
}

export default function DemoPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-mono text-sm text-muted-foreground">Loading...</p>
        </div>
      </main>
    }>
      <DemoPageContent />
    </Suspense>
  )
}
