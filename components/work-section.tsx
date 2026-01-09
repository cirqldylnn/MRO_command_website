"use client"

import React, { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const modules = [
  {
    title: "RFQ Builder Agent",
    description: "Clarifies specs, normalizes requests, prevents back-and-forth.",
    icon: "builder",
    features: ["AI asks missing questions", "Part number research", "Spec normalization"],
    highlight: false,
  },
  {
    title: "Vendor Matching",
    description: "Preferred vendors first, category fit, response-time scoring.",
    icon: "matching",
    features: ["Category-based matching", "Preferred vendor priority", "Response history"],
    highlight: false,
  },
  {
    title: "Automated Outreach",
    description: "Sends clean RFQs, chases responses, escalates when critical.",
    icon: "outreach",
    features: ["Auto follow-ups", "Escalation rules", "Multi-vendor sends"],
    highlight: false,
  },
  {
    title: "Quote Parsing",
    description: "Reads email/PDF quotes → extracts price, lead time, freight, terms.",
    icon: "parsing",
    features: ["PDF extraction", "Email parsing", "Image OCR"],
    highlight: false,
  },
  {
    title: "Quote Compare + Award",
    description: "Side-by-side comparison with confidence scoring.",
    icon: "compare",
    features: ["Normalized comparison", "One-click award", "PO generation"],
    highlight: false,
  },
  {
    title: "Live Concierge",
    description: "One click: 'talk to a person' for complex or line-down events.",
    icon: "concierge",
    features: ["Instant escalation", "Human handoff", "24/7 support"],
    highlight: false,
  },
  {
    title: "Vendor Intelligence",
    description: "Track performance over time. Know who responds fast, who delivers.",
    icon: "analytics",
    features: ["Response time tracking", "Win rate analytics", "Spend per vendor"],
    highlight: true,
  },
]

// Module icon components
function BuilderIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="6" width="24" height="20" rx="2" className="stroke-current" />
      <line x1="4" y1="12" x2="28" y2="12" className="stroke-current" />
      <line x1="8" y1="17" x2="18" y2="17" className="stroke-muted-foreground" />
      <line x1="8" y1="21" x2="14" y2="21" className="stroke-muted-foreground" />
      <circle cx="23" cy="19" r="3" className="stroke-accent fill-accent/20" />
      <path d="M22 19l1 1 2-2" className="stroke-accent" strokeWidth="1.5" />
    </svg>
  )
}

function MatchingIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="10" cy="12" r="4" className="stroke-current" />
      <circle cx="22" cy="12" r="4" className="stroke-current" />
      <circle cx="16" cy="22" r="4" className="stroke-accent fill-accent/20" />
      <line x1="12" y1="15" x2="14" y2="19" className="stroke-muted-foreground" strokeDasharray="2 2" />
      <line x1="20" y1="15" x2="18" y2="19" className="stroke-muted-foreground" strokeDasharray="2 2" />
    </svg>
  )
}

function OutreachIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 8l12 8 12-8" className="stroke-current" />
      <rect x="4" y="8" width="24" height="16" rx="2" className="stroke-current" />
      <circle cx="26" cy="6" r="4" className="stroke-accent fill-accent/20" />
      <line x1="26" y1="4" x2="26" y2="6" className="stroke-accent" />
      <line x1="26" y1="6" x2="28" y2="6" className="stroke-accent" />
    </svg>
  )
}

function ParsingIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="6" y="4" width="14" height="18" rx="1" className="stroke-current" />
      <line x1="9" y1="9" x2="17" y2="9" className="stroke-muted-foreground" />
      <line x1="9" y1="13" x2="15" y2="13" className="stroke-muted-foreground" />
      <line x1="9" y1="17" x2="13" y2="17" className="stroke-muted-foreground" />
      <path d="M20 14l4 4m0 0l4 4m-4-4l4-4m-4 4l-4 4" className="stroke-accent" strokeWidth="2" />
    </svg>
  )
}

function CompareIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="6" width="10" height="20" rx="1" className="stroke-current" />
      <rect x="18" y="6" width="10" height="20" rx="1" className="stroke-current" />
      <line x1="7" y1="11" x2="11" y2="11" className="stroke-muted-foreground" />
      <line x1="7" y1="15" x2="11" y2="15" className="stroke-muted-foreground" />
      <line x1="21" y1="11" x2="25" y2="11" className="stroke-muted-foreground" />
      <line x1="21" y1="15" x2="25" y2="15" className="stroke-muted-foreground" />
      <circle cx="9" cy="21" r="2" className="stroke-accent fill-accent/20" />
      <circle cx="23" cy="21" r="2" className="stroke-muted-foreground" />
    </svg>
  )
}

function ConciergeIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="16" cy="10" r="5" className="stroke-current" />
      <path d="M8 26c0-4.4 3.6-8 8-8s8 3.6 8 8" className="stroke-current" />
      <circle cx="24" cy="8" r="5" className="stroke-accent fill-accent/20" />
      <path d="M22 8h4M24 6v4" className="stroke-accent" strokeWidth="2" />
    </svg>
  )
}

function AnalyticsIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Chart bars */}
      <rect x="6" y="18" width="4" height="8" rx="0.5" className="stroke-current fill-current/20" />
      <rect x="14" y="12" width="4" height="14" rx="0.5" className="stroke-accent fill-accent/30" />
      <rect x="22" y="6" width="4" height="20" rx="0.5" className="stroke-current fill-current/20" />
      {/* Trend line */}
      <path d="M4 22l8-6 6 3 10-12" className="stroke-accent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Arrow head */}
      <path d="M26 5l2 2-4 0z" className="fill-accent stroke-accent" />
    </svg>
  )
}

const moduleIcons: Record<string, () => React.ReactElement> = {
  builder: BuilderIcon,
  matching: MatchingIcon,
  outreach: OutreachIcon,
  parsing: ParsingIcon,
  compare: CompareIcon,
  concierge: ConciergeIcon,
  analytics: AnalyticsIcon,
}

// Vendor Intelligence Dashboard Mockup
function VendorDashboardMockup() {
  return (
    <div className="bg-zinc-950 rounded-lg border border-emerald-500/30 p-4 mt-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider">Vendor Performance</span>
      </div>
      
      {/* Mini vendor stats */}
      <div className="space-y-2">
        {[
          { name: "Acme Industrial", response: "2.3h avg", rate: "94%", spend: "$47k", best: true },
          { name: "FastParts Co", response: "4.1h avg", rate: "87%", spend: "$32k", best: false },
          { name: "Quality MRO", response: "6.8h avg", rate: "72%", spend: "$18k", best: false },
        ].map((vendor, i) => (
          <div key={i} className={cn(
            "flex items-center justify-between p-2 rounded-lg text-[10px] font-mono",
            vendor.best ? "bg-emerald-500/10 border border-emerald-500/30" : "bg-zinc-900/50"
          )}>
            <div className="flex items-center gap-2">
              {vendor.best && <span className="text-emerald-400">★</span>}
              <span className={vendor.best ? "text-emerald-400" : "text-zinc-400"}>{vendor.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-zinc-500">{vendor.response}</span>
              <span className={vendor.best ? "text-emerald-400" : "text-zinc-400"}>{vendor.rate}</span>
              <span className="text-zinc-600">{vendor.spend}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Before/After Illustration Component
function BeforeAfterIllustration() {
  return (
    <div className="relative w-full mb-16">
      <div className="grid md:grid-cols-2 gap-6">
        {/* BEFORE Side */}
        <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-lg border border-red-500/20 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-red-500/10 bg-red-500/5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-red-400">
                Before
              </span>
              <span className="font-mono text-[10px] text-red-400/50">The old way</span>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {/* Chaos visualization */}
            <div className="relative h-64 flex flex-col items-center justify-center">
              {/* Central chaos icon */}
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center">
                  <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                {/* Floating chaos elements */}
                <div className="absolute -top-2 -right-4 w-8 h-10 bg-red-900/40 rounded border border-red-700/40 flex items-center justify-center transform rotate-12">
                  <span className="text-[9px] font-bold text-red-400">PDF</span>
                </div>
                <div className="absolute -bottom-1 -left-6 w-10 h-8 bg-yellow-500/20 rounded border border-yellow-500/30 transform -rotate-6 flex items-center justify-center">
                  <span className="text-[8px] text-yellow-400">???</span>
                </div>
                <div className="absolute top-0 -left-3 text-xl text-red-400/60 font-bold">?</div>
                <div className="absolute -bottom-2 right-0 text-lg text-red-400/40 font-bold">?</div>
              </div>
              
              {/* Pain points */}
              <div className="space-y-3 w-full max-w-xs">
                <div className="flex items-center gap-3 bg-red-500/5 rounded-lg px-4 py-3 border border-red-500/10">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-400 text-sm">✗</span>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-300">Lost in email threads</div>
                    <div className="text-xs text-zinc-500">Scattered across 47 messages</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-red-500/5 rounded-lg px-4 py-3 border border-red-500/10">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-400 text-sm">✗</span>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-300">Missing critical data</div>
                    <div className="text-xs text-zinc-500">Lead times, freight, terms</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-red-500/5 rounded-lg px-4 py-3 border border-red-500/10">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-400 text-sm">✗</span>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-300">No audit trail</div>
                    <div className="text-xs text-zinc-500">Who approved what, when?</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom stat */}
            <div className="mt-4 pt-4 border-t border-red-500/10 text-center">
              <div className="font-mono text-2xl text-red-400">~4 hours</div>
              <div className="text-xs text-zinc-500 mt-1">Average time per RFQ cycle</div>
            </div>
          </div>
        </div>
        
        {/* AFTER Side */}
        <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-lg border border-accent/30 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-accent/20 bg-accent/5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                After
              </span>
              <span className="font-mono text-[10px] text-accent/50">With MRO.ai</span>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {/* Clean workflow visualization */}
            <div className="relative h-64 flex flex-col">
              {/* Pipeline visualization */}
              <div className="flex items-center justify-between mb-6 px-2">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono">RFQ</span>
                </div>
                
                <svg className="w-6 h-6 text-accent/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono">VENDORS</span>
                </div>
                
                <svg className="w-6 h-6 text-accent/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono">COMPARE</span>
                </div>
                
                <svg className="w-6 h-6 text-accent/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-accent border border-accent flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono">AWARD</span>
                </div>
              </div>
              
              {/* Benefits */}
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3 bg-accent/5 rounded-lg px-4 py-3 border border-accent/10">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-accent text-sm">✓</span>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-300">Structured & searchable</div>
                    <div className="text-xs text-zinc-500">Every RFQ normalized automatically</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-accent/5 rounded-lg px-4 py-3 border border-accent/10">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-accent text-sm">✓</span>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-300">Real-time vendor tracking</div>
                    <div className="text-xs text-zinc-500">See who responded, who's pending</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-accent/5 rounded-lg px-4 py-3 border border-accent/10">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-accent text-sm">✓</span>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-300">Complete audit trail</div>
                    <div className="text-xs text-zinc-500">Full history, compliance ready</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom stat */}
            <div className="mt-4 pt-4 border-t border-accent/10 text-center">
              <div className="font-mono text-2xl text-accent">~15 minutes</div>
              <div className="text-xs text-zinc-500 mt-1">Average time per RFQ cycle</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Center arrow for mobile */}
      <div className="flex md:hidden justify-center -my-3 relative z-10">
        <div className="w-10 h-10 rounded-full bg-zinc-900 border border-accent/50 flex items-center justify-center rotate-90">
          <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const illustrationRef = useRef<HTMLDivElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in from left
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Illustration fade in
      if (illustrationRef.current) {
        gsap.fromTo(
          illustrationRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: illustrationRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }

      const cards = gridRef.current?.querySelectorAll("article")
      if (cards && cards.length > 0) {
        gsap.set(cards, { y: 60, opacity: 0 })
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Featured card animation
      if (featuredRef.current) {
        gsap.fromTo(
          featuredRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: featuredRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Separate featured module from regular modules
  const regularModules = modules.filter(m => !m.highlight)
  const featuredModule = modules.find(m => m.highlight)

  return (
    <section ref={sectionRef} id="work" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">02 / The Modules</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
          THE SYSTEM, NOT JUST THE SCREEN.
        </h2>
        <p className="mt-6 font-mono text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Requests in. Quotes out. Full audit trail. <span className="text-accent">Vendor performance over time.</span>
        </p>
      </div>

      {/* Before/After Illustration */}
      <div ref={illustrationRef}>
        <BeforeAfterIllustration />
      </div>

      {/* Module cards grid - 6 regular modules */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8"
      >
        {regularModules.map((module, index) => (
          <ModuleCard key={index} module={module} index={index} />
        ))}
      </div>

      {/* Featured Module - Vendor Intelligence */}
      {featuredModule && (
        <div ref={featuredRef}>
          <FeaturedModuleCard module={featuredModule} />
        </div>
      )}
    </section>
  )
}

function ModuleCard({
  module,
  index,
}: {
  module: {
    title: string
    description: string
    icon: string
    features: string[]
    highlight: boolean
  }
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const IconComponent = moduleIcons[module.icon]

  return (
    <article
      className={cn(
        "group relative border border-border/40 p-6 flex flex-col transition-all duration-500 cursor-pointer overflow-hidden rounded-lg",
        isHovered && "border-accent/60",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background layer */}
      <div
        className={cn(
          "absolute inset-0 bg-accent/5 transition-opacity duration-500",
          isHovered ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Top accent line */}
      <div 
        className={cn(
          "absolute top-0 left-0 h-px bg-accent transition-all duration-500",
          isHovered ? "w-full" : "w-0"
        )}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon and index */}
        <div className="flex items-start justify-between mb-6">
          <div className={cn(
            "text-muted-foreground transition-colors duration-300",
            isHovered && "text-accent"
          )}>
            <IconComponent />
          </div>
          <span className={cn(
            "font-mono text-[10px] transition-colors duration-300",
            isHovered ? "text-accent" : "text-muted-foreground/40"
          )}>
            {String(index + 1).padStart(2, "0")}
        </span>
        </div>

        {/* Title */}
        <h3
          className={cn(
            "font-[var(--font-bebas)] text-2xl tracking-tight transition-colors duration-300 mb-3",
            isHovered ? "text-accent" : "text-foreground",
          )}
        >
          {module.title}
        </h3>

        {/* Divider */}
        <div className={cn(
          "h-px bg-accent/60 mb-4 transition-all duration-500",
          isHovered ? "w-full" : "w-8"
        )} />

        {/* Description */}
        <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-4">
          {module.description}
        </p>

        {/* Feature bullets */}
        <div className="space-y-1.5">
          {module.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={cn(
                "w-1 h-1 rounded-full transition-colors duration-300",
                isHovered ? "bg-accent" : "bg-muted-foreground/40"
              )} />
              <span className="font-mono text-[10px] text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Corner accent */}
      <div
          className={cn(
          "absolute bottom-0 right-0 w-12 h-12 transition-all duration-500",
          isHovered ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-accent" />
        <div className="absolute bottom-0 right-0 w-[1px] h-full bg-accent" />
      </div>
    </article>
  )
}

function FeaturedModuleCard({
  module,
}: {
  module: {
    title: string
    description: string
    icon: string
    features: string[]
    highlight: boolean
  }
}) {
  const [isHovered, setIsHovered] = useState(false)
  const IconComponent = moduleIcons[module.icon]

  return (
    <article
      className={cn(
        "group relative border-2 border-emerald-500/30 p-6 md:p-8 transition-all duration-500 cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500/5 via-zinc-900/50 to-zinc-950",
        isHovered && "border-emerald-500/60",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* NEW badge */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6">
        <div className="bg-emerald-500 text-black font-mono text-[10px] font-bold px-2 py-1 rounded">
          NEW
        </div>
      </div>

      {/* Top accent line */}
      <div 
        className={cn(
          "absolute top-0 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-accent transition-all duration-500",
          isHovered ? "w-full" : "w-1/3"
        )}
      />

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Content */}
        <div>
          {/* Icon and label */}
          <div className="flex items-center gap-3 mb-6">
            <div className={cn(
              "w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center transition-colors duration-300",
              isHovered && "bg-emerald-500/20"
            )}>
              <div className="text-emerald-400">
                <IconComponent />
              </div>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400">
              07 / Analytics
      </span>
          </div>

          {/* Title */}
          <h3 className="font-[var(--font-bebas)] text-3xl md:text-4xl tracking-tight text-emerald-400 mb-4">
            {module.title}
          </h3>

          {/* Divider */}
          <div className={cn(
            "h-px bg-emerald-500/40 mb-4 transition-all duration-500",
            isHovered ? "w-full" : "w-16"
          )} />

          {/* Description */}
          <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-6">
            {module.description}
          </p>

          {/* Feature bullets - larger */}
          <div className="space-y-3">
            {module.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-400 text-xs">✓</span>
                </div>
                <span className="font-mono text-sm text-zinc-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Mini dashboard mockup */}
        <div className="hidden lg:block">
          <VendorDashboardMockup />
        </div>
      </div>

      {/* Corner accent */}
      <div
        className={cn(
          "absolute bottom-0 right-0 w-20 h-20 transition-all duration-500",
          isHovered ? "opacity-100" : "opacity-50",
        )}
      >
        <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-emerald-500/60 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[2px] h-full bg-gradient-to-t from-emerald-500/60 to-transparent" />
      </div>
    </article>
  )
}
