"use client"

import React, { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const outcomes = [
  {
    stat: "50%",
    label: "less back-and-forth",
    description: "Cut RFQ cycles with structured requests that capture specs upfront.",
    icon: "messages",
    color: "accent",
  },
  {
    stat: "3x",
    label: "faster vendor responses",
    description: "Automated follow-ups handle the chasing so your team doesn't have to.",
    icon: "clock",
    color: "emerald",
  },
  {
    stat: "75%",
    label: "quicker award decisions",
    description: "Side-by-side quote comparisons with all the data in one place.",
    icon: "chart",
    color: "cyan",
  },
]

// Animated counter component
function AnimatedStat({ value, suffix = "", isActive }: { value: string; suffix?: string; isActive: boolean }) {
  const [displayValue, setDisplayValue] = useState("0")
  
  useEffect(() => {
    if (!isActive) {
      setDisplayValue("0")
      return
    }
    
    // Extract number from value (e.g., "50%" -> 50, "3x" -> 3)
    const numericValue = parseInt(value.replace(/[^0-9]/g, ""))
    const duration = 1500
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function (ease out cubic)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(numericValue * eased)
      
      setDisplayValue(current.toString())
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [isActive, value])
  
  // Get suffix from original value
  const originalSuffix = value.replace(/[0-9]/g, "")
  
  return (
    <span>
      {displayValue}
      {originalSuffix}
    </span>
  )
}

// Icons
function MessagesIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  )
}

const outcomeIcons: Record<string, () => React.ReactElement> = {
  messages: MessagesIcon,
  clock: ClockIcon,
  chart: ChartIcon,
}

const colorClasses: Record<string, { text: string; bg: string; border: string; glow: string }> = {
  accent: {
    text: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/30",
    glow: "shadow-accent/20",
  },
  emerald: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    glow: "shadow-emerald-500/20",
  },
  cyan: {
    text: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    glow: "shadow-cyan-500/20",
  },
}

export function ROISection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        )
      }

      // Cards animation + trigger counter
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".outcome-card")
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
              onEnter: () => setIsVisible(true),
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="roi" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>
      
      <div className="relative">
        {/* Section header */}
        <div ref={headerRef} className="mb-16 md:mb-24 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">06 / Results</span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-4xl md:text-6xl lg:text-7xl tracking-tight max-w-4xl mx-auto">
            FASTER QUOTES. FEWER ERRORS. LESS DOWNTIME.
          </h2>
          <p className="mt-6 font-mono text-sm text-muted-foreground max-w-xl mx-auto">
            Conservative estimates based on process improvements. Real numbers coming from early pilots.
          </p>
        </div>

        {/* Stats cards */}
        <div ref={cardsRef} className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {outcomes.map((outcome, index) => {
              const IconComponent = outcomeIcons[outcome.icon]
              const colors = colorClasses[outcome.color]
              
              return (
                <div
                  key={index}
                  className={cn(
                    "outcome-card relative group",
                    "bg-zinc-900/50 border rounded-xl p-8 md:p-10",
                    "transition-all duration-500 hover:scale-[1.02]",
                    colors.border,
                    "hover:shadow-lg",
                    colors.glow
                  )}
                >
                  {/* Background glow on hover */}
                  <div className={cn(
                    "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10",
                    colors.bg
                  )} />
                  
                  {/* Icon */}
                  <div className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center mb-6",
                    colors.bg,
                    colors.border,
                    "border"
                  )}>
                    <div className={colors.text}>
                      <IconComponent />
                    </div>
                  </div>
                  
                  {/* Stat */}
                  <div className={cn(
                    "font-[var(--font-bebas)] text-6xl md:text-7xl tracking-tight mb-2",
                    colors.text
                  )}>
                    <AnimatedStat value={outcome.stat} isActive={isVisible} />
                  </div>
                  
                  {/* Label */}
                  <div className="font-[var(--font-bebas)] text-xl md:text-2xl text-foreground tracking-tight mb-4">
                    {outcome.label}
                  </div>
                  
                  {/* Divider */}
                  <div className={cn(
                    "w-12 h-px mb-4 transition-all duration-500 group-hover:w-full",
                    outcome.color === "accent" ? "bg-accent/40" : 
                    outcome.color === "emerald" ? "bg-emerald-500/40" : "bg-cyan-500/40"
                  )} />
                  
                  {/* Description */}
                  <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                    {outcome.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-zinc-900/50 border border-border/30 rounded-full px-4 py-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs text-muted-foreground">
              Pilot programs now open — <a href="#" className="text-accent hover:underline">get early access</a>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}





