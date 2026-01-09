"use client"

import React, { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: "01",
    title: "Capture the Request",
    description: "Photo, voice, text — tied to equipment and location when possible.",
    details: [
      "Snap a photo of the part",
      "Voice note: \"Need 12 of these\"",
      "Auto-tagged to asset #4420",
    ],
    icon: "capture",
  },
  {
    number: "02",
    title: "Structure & Route",
    description: "Agent fills missing fields, selects vendors, sends RFQs automatically.",
    details: [
      "AI extracts part number & specs",
      "Matches to preferred vendors",
      "Sends clean RFQs in parallel",
    ],
    icon: "route",
  },
  {
    number: "03",
    title: "Close the Loop",
    description: "Quotes parsed → compared → awarded → tracked → summarized.",
    details: [
      "Quotes auto-parsed from email/PDF",
      "Side-by-side comparison table",
      "One-click award & PO generation",
    ],
    icon: "close",
  },
]

// Step icon components
function CaptureIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Camera body */}
      <rect 
        x="6" y="14" width="36" height="26" rx="3" 
        className={cn("transition-colors duration-500", isActive ? "stroke-accent" : "stroke-current")} 
      />
      {/* Lens */}
      <circle 
        cx="24" cy="27" r="8" 
        className={cn("transition-colors duration-500", isActive ? "stroke-accent" : "stroke-current")} 
      />
      <circle 
        cx="24" cy="27" r="4" 
        className={cn("transition-all duration-500", isActive ? "fill-accent/30 stroke-accent" : "fill-transparent stroke-current")} 
      />
      {/* Flash */}
      <rect x="10" y="18" width="6" height="4" rx="1" className="stroke-muted-foreground" />
      {/* Top bump */}
      <path d="M16 14V11a2 2 0 012-2h12a2 2 0 012 2v3" className="stroke-muted-foreground" />
      {/* Shutter button */}
      <circle cx="38" cy="11" r="3" className={cn("transition-colors duration-500", isActive ? "fill-accent stroke-accent" : "stroke-muted-foreground fill-transparent")} />
    </svg>
  )
}

function RouteIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Central brain/AI node */}
      <circle 
        cx="24" cy="24" r="10" 
        className={cn("transition-colors duration-500", isActive ? "stroke-accent fill-accent/10" : "stroke-current fill-transparent")} 
      />
      {/* AI symbol inside */}
      <path 
        d="M20 24h8M24 20v8" 
        className={cn("transition-colors duration-500", isActive ? "stroke-accent" : "stroke-current")} 
        strokeWidth="2"
      />
      {/* Input node */}
      <circle cx="8" cy="24" r="4" className="stroke-muted-foreground" />
      {/* Output nodes */}
      <circle cx="40" cy="14" r="4" className="stroke-muted-foreground" />
      <circle cx="40" cy="24" r="4" className="stroke-muted-foreground" />
      <circle cx="40" cy="34" r="4" className="stroke-muted-foreground" />
      {/* Connection lines */}
      <path d="M12 24h4" className="stroke-muted-foreground" strokeDasharray="2 2" />
      <path d="M34 21l2-4" className={cn("transition-colors duration-500", isActive ? "stroke-accent" : "stroke-muted-foreground")} />
      <path d="M34 24h2" className={cn("transition-colors duration-500", isActive ? "stroke-accent" : "stroke-muted-foreground")} />
      <path d="M34 27l2 4" className={cn("transition-colors duration-500", isActive ? "stroke-accent" : "stroke-muted-foreground")} />
    </svg>
  )
}

function CloseIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Checkmark circle */}
      <circle 
        cx="24" cy="24" r="16" 
        className={cn("transition-colors duration-500", isActive ? "stroke-accent" : "stroke-current")} 
      />
      {/* Checkmark */}
      <path 
        d="M16 24l6 6 12-12" 
        className={cn("transition-colors duration-500", isActive ? "stroke-accent" : "stroke-current")} 
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Radiating lines when active */}
      <path 
        d="M24 4v4M24 40v4M4 24h4M40 24h4M10 10l3 3M35 35l3 3M10 38l3-3M35 13l3-3" 
        className={cn("transition-all duration-500", isActive ? "stroke-accent/60" : "stroke-transparent")} 
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

const stepIcons: Record<string, ({ isActive }: { isActive: boolean }) => React.ReactElement> = {
  capture: CaptureIcon,
  route: RouteIcon,
  close: CloseIcon,
}

export function PrinciplesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const confidenceRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !stepsRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in
      gsap.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      )

      // Steps stagger in
      const stepCards = stepsRef.current?.querySelectorAll(".step-card")
      if (stepCards && stepCards.length > 0) {
        gsap.fromTo(
          stepCards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        )
      }

      // Confidence callout
      if (confidenceRef.current) {
        gsap.fromTo(
          confidenceRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: confidenceRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="principles" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-16 md:mb-24 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">03 / Process</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">HOW IT WORKS</h2>
        <p className="mt-6 font-mono text-sm text-muted-foreground max-w-xl mx-auto">
          From request to award in three simple steps. The AI handles the complexity.
        </p>
      </div>

      {/* Steps */}
      <div ref={stepsRef} className="relative">
        {/* Connection line - desktop */}
        <div className="hidden lg:block absolute top-32 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>

      {/* Confidence callout */}
      <div ref={confidenceRef} className="mt-20 md:mt-32">
        <div className="max-w-3xl mx-auto bg-zinc-900/50 border border-accent/20 rounded-lg p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <h4 className="font-[var(--font-bebas)] text-xl md:text-2xl tracking-tight text-foreground mb-2">
                Confidence + Human-in-the-Loop
              </h4>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                If the system isn't confident, it flags for review — <span className="text-accent">no silent guesses</span>. 
                Complex requests or line-down emergencies can escalate to a live concierge with one click.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StepCard({
  step,
  index,
}: {
  step: {
    number: string
    title: string
    description: string
    details: string[]
    icon: string
  }
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (!cardRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => setIsActive(true),
        onLeave: () => setIsActive(false),
        onEnterBack: () => setIsActive(true),
        onLeaveBack: () => setIsActive(false),
      })
    }, cardRef)

    return () => ctx.revert()
  }, [])

  const IconComponent = stepIcons[step.icon]

  return (
    <div
      ref={cardRef}
      className={cn(
        "step-card relative group",
        "transition-all duration-500",
      )}
    >
      {/* Step number - large background */}
      <div className="absolute -top-4 -left-2 font-[var(--font-bebas)] text-[120px] md:text-[160px] leading-none text-zinc-900/50 select-none pointer-events-none -z-10">
        {step.number}
      </div>

      {/* Card content */}
      <div className={cn(
        "relative bg-zinc-900/30 border rounded-lg p-6 md:p-8 transition-all duration-500",
        isActive ? "border-accent/50 bg-zinc-900/60" : "border-border/30"
      )}>
        {/* Top connector dot - desktop */}
        <div className={cn(
          "hidden lg:block absolute -top-[25px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all duration-500",
          isActive ? "bg-accent border-accent" : "bg-zinc-900 border-border"
        )} />

        {/* Icon */}
        <div className={cn(
          "mb-6 transition-all duration-500",
          isActive ? "text-accent" : "text-muted-foreground"
        )}>
          <IconComponent isActive={isActive} />
        </div>

        {/* Step label */}
        <div className="flex items-center gap-2 mb-3">
          <span className={cn(
            "font-mono text-xs px-2 py-0.5 rounded transition-all duration-500",
            isActive ? "bg-accent text-black" : "bg-zinc-800 text-muted-foreground"
          )}>
            STEP {step.number}
          </span>
        </div>

        {/* Title */}
        <h3 className={cn(
          "font-[var(--font-bebas)] text-2xl md:text-3xl tracking-tight mb-3 transition-colors duration-500",
          isActive ? "text-accent" : "text-foreground"
        )}>
          {step.title}
        </h3>

        {/* Description */}
        <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-6">
          {step.description}
        </p>

        {/* Divider */}
        <div className={cn(
          "h-px mb-6 transition-all duration-500",
          isActive ? "bg-accent/40 w-full" : "bg-border/50 w-12"
        )} />

        {/* Details list */}
        <ul className="space-y-2">
          {step.details.map((detail, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className={cn(
                "mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-500",
                isActive ? "bg-accent" : "bg-muted-foreground/40"
              )} />
              <span className="font-mono text-xs text-muted-foreground">{detail}</span>
            </li>
          ))}
        </ul>

        {/* Arrow to next step - desktop only, not on last card */}
        {index < 2 && (
          <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10">
            <div className={cn(
              "w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500",
              isActive ? "bg-accent/10 border-accent/50" : "bg-zinc-900 border-border/30"
            )}>
              <svg className={cn(
                "w-4 h-4 transition-colors duration-500",
                isActive ? "text-accent" : "text-muted-foreground"
              )} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

