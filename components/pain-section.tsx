"use client"

import React, { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const painPoints = [
  {
    icon: "phone",
    title: "Blurry photos, no context",
    description: "Technicians texting 'need this ASAP' with a picture of a worn part — no model, no specs, no urgency level.",
    connectsTo: "AI Intake",
  },
  {
    icon: "scatter",
    title: "Requests everywhere",
    description: "Quote requests scattered across email threads, text messages, sticky notes, and someone's memory.",
    connectsTo: "Multi-Channel",
  },
  {
    icon: "machine",
    title: "Machine down, no parts intel",
    description: "Technician staring at a broken pump with no clue what part they need. Walk to the office. Dig through binders. Line sits idle.",
    connectsTo: "Floor Agent",
  },
  {
    icon: "vendors",
    title: "Same 2 vendors every time",
    description: "You call the same suppliers because getting quotes from more is too much hassle. That 'hassle' costs 10-15% on every order.",
    connectsTo: "Competitive Bids",
  },
  {
    icon: "inventory",
    title: "Parts you already own",
    description: "Emergency order arrives Tuesday. Tuesday afternoon you find the same part in the back of the crib. Nobody knew it was there.",
    connectsTo: "Inventory Intel",
  },
  {
    icon: "project",
    title: "Big projects, bigger chaos",
    description: "New crane install? That's 47 separate requests, 12 vendors, and zero budget visibility until accounting calls you in.",
    connectsTo: "Project Mode",
  },
]

// Icons
function PhoneIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l1.5 1.5L9 12M15 9l-1.5 1.5L15 12" strokeOpacity="0.5" />
    </svg>
  )
}

function ScatterIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
      <circle cx="18" cy="17" r="2" strokeOpacity="0.5" />
      <circle cx="6" cy="6" r="1.5" strokeOpacity="0.5" />
    </svg>
  )
}

function MachineIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Gear/machine */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437" />
    </svg>
  )
}

function VendorsIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Two people/vendors */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  )
}

function InventoryIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Box/inventory */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  )
}

function ProjectIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Gantt chart / project timeline */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  )
}

const painIcons: Record<string, () => React.ReactElement> = {
  phone: PhoneIcon,
  scatter: ScatterIcon,
  machine: MachineIcon,
  vendors: VendorsIcon,
  inventory: InventoryIcon,
  project: ProjectIcon,
}

export function PainSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        )
      }

      // Cards animation
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="relative py-24 md:py-32 pl-6 md:pl-28 pr-6 md:pr-12"
    >
      {/* Section Label */}
      <div className="absolute left-4 md:left-6 top-24 md:top-32">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground -rotate-90 origin-left block">
          The Problem
        </span>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-16 max-w-3xl">
          <div className="inline-block border border-red-500/30 bg-red-500/10 px-3 py-1 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-red-400">
              Sound Familiar?
            </span>
          </div>
          
          <h2 className="font-[var(--font-bebas)] text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.9] text-foreground mb-6 tracking-wide">
            YOUR MRO PROCESS<br />
            <span className="text-red-400">IS BLEEDING TIME & MONEY.</span>
          </h2>
          
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            It's not just slow quotes — it's missed savings, idle machines, and 
            invisible spend. Death by a thousand paper cuts.
          </p>
        </div>

        {/* Pain Point Cards - 2x3 grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {painPoints.map((pain, index) => {
            const IconComponent = painIcons[pain.icon]
            return (
              <div
                key={pain.icon}
                className="group relative border border-red-500/10 bg-red-500/[0.02] p-6 hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300"
              >
                {/* Number badge */}
                <div className="absolute top-4 right-4 font-mono text-[10px] text-red-500/30">
                  0{index + 1}
                </div>
                
                <div className="w-12 h-12 rounded-sm bg-red-500/10 flex items-center justify-center text-red-400 mb-4 group-hover:bg-red-500/20 transition-colors">
                  <IconComponent />
                </div>
                
                <h3 className="font-mono text-sm text-foreground font-medium mb-2">
                  {pain.title}
                </h3>
                
                <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-3">
                  {pain.description}
                </p>
                
                {/* Feature tag */}
                <div className="inline-flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                  <span className="font-mono text-[9px] uppercase tracking-wider text-accent/60">
                    We fix this → {pain.connectsTo}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-8 p-6 border border-accent/30 bg-accent/5 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="font-[var(--font-bebas)] text-2xl text-accent tracking-wide mb-2">
              There's a better way.
            </div>
            <p className="font-mono text-xs text-muted-foreground max-w-lg">
              What if every request — photo, text, email — became a structured RFQ automatically? 
              What if you knew what parts you had? What if more vendors saw your RFQs?
            </p>
          </div>
          <a 
            href="#work" 
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-accent hover:text-accent/80 transition-colors whitespace-nowrap"
          >
            See the ROI
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
