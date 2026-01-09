"use client"

import React, { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    title: "Standalone cellular connection",
    description: "No plant network required — works anywhere with cell signal.",
    icon: "cellular",
  },
  {
    title: "Health pings + remote monitoring",
    description: "Know it's online. Get alerts if it goes dark.",
    icon: "monitor",
  },
  {
    title: "Kiosk mode UI",
    description: "Big buttons, glove-friendly, fast. Built for the floor.",
    icon: "touch",
  },
  {
    title: "Talk to a live person",
    description: "One tap for urgent requests or line-down emergencies.",
    icon: "support",
  },
]

// Feature icons
function CellularIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 20V4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MonitorIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 18v4M8 22h8M3 4h18a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="3" className="stroke-accent" />
      <path d="M12 7v0" className="stroke-accent" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function TouchIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 11V3M9 6l3-3 3 3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="5" y="11" width="14" height="10" rx="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="16" r="2" className="stroke-accent fill-accent/20" />
    </svg>
  )
}

function SupportIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="5" r="3" className="stroke-accent fill-accent" />
    </svg>
  )
}

const featureIcons: Record<string, () => React.ReactElement> = {
  cellular: CellularIcon,
  monitor: MonitorIcon,
  touch: TouchIcon,
  support: SupportIcon,
}

// Kiosk UI Mockup Component
function KioskMockup() {
  return (
    <div className="relative">
      {/* Kiosk frame - wall mounted look */}
      <div className="relative mx-auto max-w-md">
        {/* Mount bracket hint */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-3 bg-zinc-700 rounded-t-sm" />
        
        {/* Main kiosk body */}
        <div className="relative bg-zinc-800 rounded-lg border-4 border-zinc-700 shadow-2xl shadow-black/50 overflow-hidden">
          {/* Top bezel with camera/mic */}
          <div className="bg-zinc-900 px-4 py-2 flex items-center justify-between border-b border-zinc-700">
            <div className="flex items-center gap-2">
              {/* Camera */}
              <div className="w-2 h-2 rounded-full bg-zinc-600 ring-1 ring-zinc-500" />
              {/* Mic */}
              <div className="w-1.5 h-3 rounded-full bg-zinc-600" />
            </div>
            {/* Status indicator */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider">Online</span>
            </div>
          </div>
          
          {/* Screen content */}
          <div className="bg-zinc-950 p-6 md:p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 mb-4">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-xs text-accent">MRO ASSIST READY</span>
              </div>
              <h3 className="font-[var(--font-bebas)] text-2xl md:text-3xl text-white tracking-tight">
                How can we help?
              </h3>
            </div>
            
            {/* Main action buttons */}
            <div className="space-y-4">
              {/* Create Request */}
              <button className="w-full group relative bg-accent hover:bg-accent/90 text-black rounded-lg p-5 md:p-6 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-black/20 flex items-center justify-center">
                    <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-[var(--font-bebas)] text-xl md:text-2xl tracking-tight">Create Request</div>
                    <div className="text-sm opacity-80">Photo, voice, or text</div>
                  </div>
                </div>
                <svg className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 opacity-60 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Scan Equipment QR */}
              <button className="w-full group relative bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-zinc-600 rounded-lg p-5 md:p-6 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center">
                    <svg className="w-7 h-7 md:w-8 md:h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2M7 8h.01M7 12h.01M7 16h.01M11 8h.01M11 12h.01M11 16h.01M15 8h.01M15 12h.01M15 16h.01" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-[var(--font-bebas)] text-xl md:text-2xl tracking-tight">Scan Equipment QR</div>
                    <div className="text-sm text-zinc-400">Link request to asset</div>
                  </div>
                </div>
                <svg className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-zinc-500 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Talk to Live Person */}
              <button className="w-full group relative bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-zinc-600 rounded-lg p-5 md:p-6 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center relative">
                    <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    {/* Live indicator */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-zinc-900 animate-pulse" />
                  </div>
                  <div className="text-left">
                    <div className="font-[var(--font-bebas)] text-xl md:text-2xl tracking-tight">Talk to a Live Person</div>
                    <div className="text-sm text-zinc-400">Urgent or complex requests</div>
                  </div>
                </div>
                <svg className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-zinc-500 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Bottom status bar */}
            <div className="mt-8 pt-4 border-t border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0" />
                </svg>
                <span className="font-mono text-[10px] text-zinc-500">LTE Connected</span>
              </div>
              <div className="font-mono text-[10px] text-zinc-600">v2.4.1</div>
            </div>
          </div>
          
          {/* Bottom bezel */}
          <div className="bg-zinc-900 h-3 border-t border-zinc-700" />
        </div>
        
        {/* Shadow/glow effect */}
        <div className="absolute -inset-4 bg-accent/5 rounded-2xl blur-2xl -z-10" />
      </div>
    </div>
  )
}

export function KioskSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const kioskRef = useRef<HTMLDivElement>(null)
  const pricingRef = useRef<HTMLDivElement>(null)

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

      // Features animation
      if (contentRef.current) {
        const features = contentRef.current.querySelectorAll(".feature-item")
        gsap.fromTo(
          features,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        )
      }

      // Kiosk mockup animation
      if (kioskRef.current) {
        gsap.fromTo(
          kioskRef.current,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: kioskRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        )
      }

      // Pricing callout animation
      if (pricingRef.current) {
        gsap.fromTo(
          pricingRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: pricingRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="kiosk" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />
      
      <div className="relative">
        {/* Section header */}
        <div ref={headerRef} className="mb-16 md:mb-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">04 / Hardware</span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">THE KIOSK</h2>
          <p className="mt-6 font-[var(--font-bebas)] text-2xl md:text-4xl text-muted-foreground tracking-tight max-w-2xl">
            A sourcing desk that lives on the floor.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Features */}
          <div ref={contentRef}>
            <div className="space-y-6">
              {features.map((feature, index) => {
                const IconComponent = featureIcons[feature.icon]
                return (
                  <div
                    key={index}
                    className="feature-item flex items-start gap-4 p-4 rounded-lg bg-zinc-900/30 border border-border/30 hover:border-accent/30 transition-colors duration-300"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                      <IconComponent />
                    </div>
                    <div>
                      <h4 className="font-[var(--font-bebas)] text-lg tracking-tight text-foreground mb-1">
                        {feature.title}
                      </h4>
                      <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right: Kiosk Mockup */}
          <div ref={kioskRef}>
            <KioskMockup />
          </div>
        </div>

        {/* Pricing callout */}
        <div ref={pricingRef} className="mt-20 md:mt-24">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-accent/10 via-accent/5 to-transparent border border-accent/30 rounded-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
                  <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-[var(--font-bebas)] text-2xl md:text-3xl tracking-tight text-accent mb-2">
                  Key Accounts get one included.
                </h4>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  Targeting <span className="text-foreground">$50k+/year</span> in spend or qualifying for a service tier? 
                  We install one kiosk <span className="text-accent">free</span> — hardware, cellular, and setup included.
                </p>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="#colophon"
                  className="inline-flex items-center gap-2 bg-accent text-black font-mono text-sm font-bold px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors duration-200"
                >
                  Get in Touch
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}





