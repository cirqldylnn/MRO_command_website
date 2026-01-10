"use client"

import React, { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const phases = [
  {
    id: "assessment",
    name: "Site Assessment",
    duration: "Week 1-2",
    rfqs: 2,
    items: ["Engineering survey", "Foundation specs"],
    status: "complete",
    spend: 12500,
  },
  {
    id: "procurement",
    name: "Equipment Procurement",
    duration: "Week 3-8",
    rfqs: 5,
    items: ["Crane unit", "Rigging hardware", "Control systems", "Safety gear", "Spare parts kit"],
    status: "active",
    spend: 285000,
  },
  {
    id: "installation",
    name: "Installation Services",
    duration: "Week 9-12",
    rfqs: 3,
    items: ["Crane assembly crew", "Electrical hookup", "Certification inspection"],
    status: "pending",
    spend: 0,
  },
]

const features = [
  {
    icon: "questions",
    title: "Smart Scoping",
    description: "Clarifying questions upfront to define the full project scope",
  },
  {
    icon: "phases",
    title: "Auto Phase Breakdown",
    description: "AI generates phases with dependencies and timelines",
  },
  {
    icon: "rfqs",
    title: "Per-Phase RFQs",
    description: "Each phase gets its own tracked RFQs and vendor outreach",
  },
  {
    icon: "budget",
    title: "Live Budget Tracking",
    description: "Real-time spend roll-up across all vendors and phases",
  },
]

// Icons
function QuestionsIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function PhasesIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  )
}

function RFQsIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  )
}

function BudgetIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
    </svg>
  )
}

const featureIcons: Record<string, () => React.ReactElement> = {
  questions: QuestionsIcon,
  phases: PhasesIcon,
  rfqs: RFQsIcon,
  budget: BudgetIcon,
}

// Timeline Visual Component
function ProjectTimeline() {
  const [activePhase, setActivePhase] = useState(1)
  const totalBudget = 350000
  const currentSpend = phases.reduce((sum, p) => sum + p.spend, 0)
  const spendPercent = (currentSpend / totalBudget) * 100

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhase(prev => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative bg-black/40 border border-white/10 rounded-sm p-6 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
            Active Project
          </div>
          <div className="font-[var(--font-bebas)] text-2xl text-foreground tracking-wide">
            New Overhead Crane — Building 4
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
            Total RFQs
          </div>
          <div className="font-[var(--font-bebas)] text-2xl text-accent">
            10
          </div>
        </div>
      </div>

      {/* Budget Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Budget Tracking
          </span>
          <span className="font-mono text-xs text-foreground">
            ${currentSpend.toLocaleString()} / ${totalBudget.toLocaleString()}
          </span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-accent to-amber-500 rounded-full transition-all duration-1000"
            style={{ width: `${spendPercent}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="font-mono text-[9px] text-emerald-400">On track</span>
          <span className="font-mono text-[9px] text-muted-foreground">{spendPercent.toFixed(0)}% committed</span>
        </div>
      </div>

      {/* Phase Timeline */}
      <div className="space-y-4">
        {phases.map((phase, index) => {
          const isActive = index === activePhase
          const isComplete = phase.status === "complete"
          const isPending = phase.status === "pending"
          
          return (
            <div 
              key={phase.id}
              className={cn(
                "relative border rounded-sm p-4 transition-all duration-500",
                isActive 
                  ? "border-accent/50 bg-accent/5" 
                  : isComplete 
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-white/10 bg-white/[0.02]"
              )}
            >
              {/* Phase Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {/* Status Indicator */}
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    isComplete && "bg-emerald-500",
                    isActive && "bg-accent animate-pulse",
                    isPending && "bg-white/20"
                  )} />
                  <div>
                    <div className="font-mono text-sm text-foreground font-medium">
                      Phase {index + 1}: {phase.name}
                    </div>
                    <div className="font-mono text-[10px] text-muted-foreground">
                      {phase.duration}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={cn(
                    "font-mono text-xs px-2 py-0.5 rounded-sm",
                    isComplete && "bg-emerald-500/20 text-emerald-400",
                    isActive && "bg-accent/20 text-accent",
                    isPending && "bg-white/10 text-muted-foreground"
                  )}>
                    {phase.rfqs} RFQs
                  </div>
                  {phase.spend > 0 && (
                    <div className="font-mono text-[10px] text-muted-foreground mt-1">
                      ${phase.spend.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>

              {/* Items */}
              <div className="flex flex-wrap gap-2">
                {phase.items.map((item, i) => (
                  <span 
                    key={i}
                    className={cn(
                      "font-mono text-[10px] px-2 py-1 rounded-sm",
                      isComplete 
                        ? "bg-emerald-500/10 text-emerald-400/80 line-through"
                        : isActive
                          ? "bg-accent/10 text-accent/80"
                          : "bg-white/5 text-muted-foreground"
                    )}
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Progress bar for active phase */}
              {isActive && (
                <div className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-accent/50 rounded-full w-2/3 animate-pulse" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Connection lines between phases */}
      <div className="absolute left-[26px] top-[180px] bottom-[100px] w-px bg-gradient-to-b from-emerald-500/50 via-accent/50 to-white/10" />
    </div>
  )
}

export function ProjectModeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

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

      // Content animation
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
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
      id="projects"
      className="relative min-h-screen py-24 md:py-32 pl-6 md:pl-28 pr-6 md:pr-12"
    >
      {/* Section Label */}
      <div className="absolute left-4 md:left-6 top-24 md:top-32">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground -rotate-90 origin-left block">
          Project Mode
        </span>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <div className="inline-block border border-violet-500/30 bg-violet-500/10 px-3 py-1 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-violet-400">
              Capital Projects
            </span>
          </div>
          
          <h2 className="font-[var(--font-bebas)] text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] text-foreground mb-6 tracking-wide">
            ONE REQUEST.<br />
            <span className="text-violet-400">FULL PROJECT DELIVERY.</span>
          </h2>
          
          <p className="max-w-2xl font-mono text-sm text-muted-foreground leading-relaxed">
            Tell us you need a crane. We'll break it into phases, manage every RFQ, 
            track the budget, and close it out — automatically.
          </p>
        </div>

        {/* Main Content Grid */}
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Timeline Visualization */}
          <div>
            <ProjectTimeline />
          </div>

          {/* Right: Features + CTA */}
          <div className="space-y-6">
            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature) => {
                const IconComponent = featureIcons[feature.icon]
                return (
                  <div
                    key={feature.icon}
                    className="border border-white/10 bg-white/[0.02] p-4 rounded-sm hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-sm bg-violet-500/10 flex items-center justify-center text-violet-400 mb-3">
                      <IconComponent />
                    </div>
                    <div className="font-mono text-xs text-foreground font-medium mb-1">
                      {feature.title}
                    </div>
                    <div className="font-mono text-[10px] text-muted-foreground leading-relaxed">
                      {feature.description}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* How it works callout */}
            <div className="border border-violet-500/20 bg-violet-500/5 p-6 rounded-sm">
              <div className="font-mono text-[10px] uppercase tracking-widest text-violet-400 mb-4">
                How It Works
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 font-mono text-[10px] flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="font-mono text-xs text-muted-foreground">
                    <span className="text-foreground">Describe the project</span> — "I need to install a new overhead crane in Building 4"
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 font-mono text-[10px] flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="font-mono text-xs text-muted-foreground">
                    <span className="text-foreground">Answer clarifying questions</span> — capacity, span, power requirements, timeline
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 font-mono text-[10px] flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="font-mono text-xs text-muted-foreground">
                    <span className="text-foreground">AI generates the project plan</span> — phases, RFQs, vendor outreach, budget tracking
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <a
                href="#cta"
                className="group inline-flex items-center gap-2 bg-violet-500 text-white px-5 py-2.5 font-mono text-xs uppercase tracking-widest font-medium hover:bg-violet-600 transition-all duration-200"
              >
                See a Demo Project
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <span className="font-mono text-[10px] text-muted-foreground">
                Works with existing vendor lists
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

