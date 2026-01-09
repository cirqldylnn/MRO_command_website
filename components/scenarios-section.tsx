"use client"

import React, { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const scenarios = [
  {
    id: "pump-down",
    title: "The Pump Goes Down",
    subtitle: "Line-down emergency at 2pm",
    icon: "alert",
    without: {
      steps: [
        { time: "2:00 PM", text: "Technician finds failed pump", status: "problem" },
        { time: "2:15 PM", text: "Searches emails for 'who did we buy from?'", status: "delay" },
        { time: "2:45 PM", text: "Calls 3 vendors, leaves voicemails", status: "delay" },
        { time: "Next Day", text: "Gets 1 callback, needs more info", status: "delay" },
        { time: "Day 3", text: "Finally receives quote", status: "delay" },
        { time: "Day 4", text: "Parts arrive", status: "result" },
      ],
      result: "4 days",
      resultLabel: "Total downtime",
    },
    with: {
      steps: [
        { time: "2:00 PM", text: "Technician scans QR on pump", status: "action" },
        { time: "2:01 PM", text: "AI loads specs, parts, vendor history", status: "auto" },
        { time: "2:02 PM", text: "RFQs sent to 5 matched vendors", status: "auto" },
        { time: "4:30 PM", text: "3 quotes received, compared", status: "success" },
        { time: "4:35 PM", text: "Best quote awarded, PO sent", status: "success" },
        { time: "Next AM", text: "Parts arrive via overnight", status: "result" },
      ],
      result: "18 hrs",
      resultLabel: "Total downtime",
    },
  },
  {
    id: "new-tech",
    title: "The New Maintenance Tech",
    subtitle: "First week on the job",
    icon: "user",
    without: {
      steps: [
        { time: "Monday", text: "Needs to order replacement bearings", status: "problem" },
        { time: "", text: "Doesn't know vendors or part numbers", status: "delay" },
        { time: "", text: "Asks coworker — they're on vacation", status: "delay" },
        { time: "Tuesday", text: "Finds old PO in filing cabinet", status: "delay" },
        { time: "", text: "Calls vendor, wrong part number", status: "delay" },
        { time: "Wednesday", text: "Finally gets correct quote", status: "result" },
      ],
      result: "3 days",
      resultLabel: "Time to first quote",
    },
    with: {
      steps: [
        { time: "Monday", text: "Takes photo of equipment nameplate", status: "action" },
        { time: "", text: "AI extracts model, serial, specs", status: "auto" },
        { time: "", text: "Parts breakdown loaded automatically", status: "auto" },
        { time: "", text: "Vendor suggestions based on category", status: "auto" },
        { time: "", text: "Structured RFQ created, sent", status: "success" },
        { time: "", text: "Quote received same day", status: "result" },
      ],
      result: "4 hrs",
      resultLabel: "Time to first quote",
    },
  },
  {
    id: "friday-critical",
    title: "Friday at 4pm",
    subtitle: "Critical failure, weekend looming",
    icon: "clock",
    without: {
      steps: [
        { time: "4:00 PM", text: "Conveyor motor fails — line stops", status: "problem" },
        { time: "4:15 PM", text: "Call usual vendor — already closed", status: "delay" },
        { time: "4:30 PM", text: "Try other vendors — voicemails", status: "delay" },
        { time: "5:00 PM", text: "Give up, go home", status: "delay" },
        { time: "Monday", text: "Start process over", status: "delay" },
        { time: "Tuesday", text: "Parts finally ordered", status: "result" },
      ],
      result: "4 days",
      resultLabel: "Lost production time",
    },
    with: {
      steps: [
        { time: "4:00 PM", text: "Text photo to MRO.ai", status: "action" },
        { time: "4:01 PM", text: "AI identifies motor, finds alternatives", status: "auto" },
        { time: "4:05 PM", text: "Discovers 2 suppliers with stock", status: "auto" },
        { time: "4:10 PM", text: "Overnight shipping options found", status: "success" },
        { time: "4:15 PM", text: "Order placed with expedited delivery", status: "success" },
        { time: "Saturday AM", text: "Parts arrive, line restored", status: "result" },
      ],
      result: "16 hrs",
      resultLabel: "Lost production time",
    },
  },
  {
    id: "quote-chaos",
    title: "Quote Comparison Chaos",
    subtitle: "5 vendors, 5 formats",
    icon: "compare",
    without: {
      steps: [
        { time: "", text: "Quote 1: PDF attachment", status: "problem" },
        { time: "", text: "Quote 2: Pricing in email body", status: "delay" },
        { time: "", text: "Quote 3: Phone call, scribbled notes", status: "delay" },
        { time: "", text: "Quote 4: Missing freight costs", status: "delay" },
        { time: "", text: "Build spreadsheet manually", status: "delay" },
        { time: "", text: "Miss that Quote 2 had best terms", status: "result" },
      ],
      result: "2+ hrs",
      resultLabel: "Time to compare",
    },
    with: {
      steps: [
        { time: "", text: "All quotes forwarded to MRO.ai", status: "action" },
        { time: "", text: "AI parses PDF, email, even images", status: "auto" },
        { time: "", text: "Extracts: price, lead time, freight, terms", status: "auto" },
        { time: "", text: "Side-by-side comparison auto-generated", status: "auto" },
        { time: "", text: "Best value highlighted with confidence score", status: "success" },
        { time: "", text: "One-click award, PO generated", status: "result" },
      ],
      result: "5 min",
      resultLabel: "Time to compare",
    },
  },
]

// Icons
function AlertIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function CompareIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  )
}

const scenarioIcons: Record<string, () => React.ReactElement> = {
  alert: AlertIcon,
  user: UserIcon,
  clock: ClockIcon,
  compare: CompareIcon,
}

const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
  problem: { bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-500" },
  delay: { bg: "bg-yellow-500/10", text: "text-yellow-400", dot: "bg-yellow-500" },
  action: { bg: "bg-accent/10", text: "text-accent", dot: "bg-accent" },
  auto: { bg: "bg-cyan-500/10", text: "text-cyan-400", dot: "bg-cyan-500" },
  success: { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-500" },
  result: { bg: "bg-zinc-800", text: "text-white", dot: "bg-white" },
}

export function ScenariosSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [activeScenario, setActiveScenario] = useState(0)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return

    const ctx = gsap.context(() => {
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const currentScenario = scenarios[activeScenario]
  const IconComponent = scenarioIcons[currentScenario.icon]

  return (
    <section ref={sectionRef} id="scenarios" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/50 to-zinc-950 pointer-events-none" />
      
      <div className="relative">
        {/* Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Real-World Scenarios</span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
            SEE THE DIFFERENCE.
          </h2>
          <p className="mt-6 font-mono text-sm text-muted-foreground max-w-xl mx-auto">
            Same situations. Different outcomes. Here's what changes with MRO.ai.
          </p>
        </div>

        {/* Scenario selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {scenarios.map((scenario, index) => {
            const Icon = scenarioIcons[scenario.icon]
            return (
              <button
                key={scenario.id}
                onClick={() => setActiveScenario(index)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs transition-all duration-300",
                  activeScenario === index
                    ? "bg-accent text-black"
                    : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-700/50"
                )}
              >
                <Icon />
                <span className="hidden sm:inline">{scenario.title}</span>
              </button>
            )
          })}
        </div>

        {/* Scenario title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 rounded-lg px-5 py-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <IconComponent />
            </div>
            <div className="text-left">
              <div className="font-[var(--font-bebas)] text-xl text-white">{currentScenario.title}</div>
              <div className="font-mono text-xs text-muted-foreground">{currentScenario.subtitle}</div>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* WITHOUT */}
            <div className="bg-zinc-900/30 border border-red-500/20 rounded-xl overflow-hidden">
              <div className="px-6 py-4 bg-red-500/10 border-b border-red-500/20">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-red-400 font-bold">WITHOUT MRO.ai</span>
                  <span className="font-mono text-[10px] text-red-400/60">The old way</span>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  {currentScenario.without.steps.map((step, index) => {
                    const colors = statusColors[step.status]
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className={cn("w-2 h-2 rounded-full mt-1.5 flex-shrink-0", colors.dot)} />
                        <div className="flex-1 min-w-0">
                          {step.time && (
                            <span className="font-mono text-[10px] text-zinc-500 mr-2">{step.time}</span>
                          )}
                          <span className={cn("font-mono text-sm", colors.text)}>{step.text}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="pt-4 border-t border-red-500/20">
                  <div className="flex items-end justify-between">
                    <span className="font-mono text-xs text-zinc-500">{currentScenario.without.resultLabel}</span>
                    <div className="text-right">
                      <div className="font-[var(--font-bebas)] text-4xl text-red-400">{currentScenario.without.result}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* WITH */}
            <div className="bg-zinc-900/30 border border-accent/30 rounded-xl overflow-hidden">
              <div className="px-6 py-4 bg-accent/10 border-b border-accent/20">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-accent font-bold">WITH MRO.ai</span>
                  <span className="font-mono text-[10px] text-accent/60">The new way</span>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  {currentScenario.with.steps.map((step, index) => {
                    const colors = statusColors[step.status]
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className={cn("w-2 h-2 rounded-full mt-1.5 flex-shrink-0", colors.dot)} />
                        <div className="flex-1 min-w-0">
                          {step.time && (
                            <span className="font-mono text-[10px] text-zinc-500 mr-2">{step.time}</span>
                          )}
                          <span className={cn("font-mono text-sm", colors.text)}>{step.text}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="pt-4 border-t border-accent/20">
                  <div className="flex items-end justify-between">
                    <span className="font-mono text-xs text-zinc-500">{currentScenario.with.resultLabel}</span>
                    <div className="text-right">
                      <div className="font-[var(--font-bebas)] text-4xl text-accent">{currentScenario.with.result}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Improvement callout */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-6 py-3">
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="font-mono text-sm text-emerald-400">
                {currentScenario.id === "pump-down" && "95% faster resolution"}
                {currentScenario.id === "new-tech" && "No learning curve needed"}
                {currentScenario.id === "friday-critical" && "Weekends don't stop you"}
                {currentScenario.id === "quote-chaos" && "24x faster comparison"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}





