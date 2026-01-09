"use client"

import React, { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const securityFeatures = [
  {
    title: "Dedicated mailbox options",
    description: "Customer-domain mailbox connection or dedicated MRO inbox.",
    icon: "mail",
  },
  {
    title: "No plant network required",
    description: "Kiosks run on cellular — fully air-gapped from your infrastructure.",
    icon: "network",
  },
  {
    title: "Role-based access + audit trail",
    description: "Every request tracked. Every action logged. Compliance ready.",
    icon: "shield",
  },
  {
    title: "Vendor status controls",
    description: "Preferred, approved, or blocked — you set the rules.",
    icon: "vendor",
  },
  {
    title: "Exportable everything",
    description: "RFQs, quote history, and reports — your data, your way.",
    icon: "export",
  },
]

// Feature icons
function MailIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  )
}

function NetworkIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12 18h.01" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  )
}

function VendorIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  )
}

function ExportIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
  )
}

const featureIcons: Record<string, () => React.ReactElement> = {
  mail: MailIcon,
  network: NetworkIcon,
  shield: ShieldIcon,
  vendor: VendorIcon,
  export: ExportIcon,
}

// Dashboard Mockup Component
function DashboardMockup() {
  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Browser chrome */}
      <div className="bg-zinc-900 rounded-t-lg border border-zinc-700 border-b-0">
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-zinc-800 rounded-md px-4 py-1 flex items-center gap-2">
              <svg className="w-3 h-3 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="font-mono text-xs text-zinc-400">app.mro.ai/command</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dashboard content */}
      <div className="bg-zinc-950 border border-zinc-700 border-t-0 rounded-b-lg overflow-hidden">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-48 bg-zinc-900/50 border-r border-zinc-800 p-4 hidden md:block">
            {/* Logo */}
            <div className="mb-6">
              <div className="text-accent font-mono text-sm font-bold tracking-wider">MRO COMMAND</div>
              <div className="text-zinc-600 font-mono text-[10px]">v1.0 OPERATIONS</div>
            </div>
            
            {/* Nav items */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 bg-accent text-black rounded px-3 py-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span className="font-mono text-xs font-medium">COMMAND CENTER</span>
              </div>
              {["NEW REQUEST", "PARTS INTEL", "COMMS", "EQUIPMENT"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 rounded px-3 py-2 transition-colors">
                  <div className="w-4 h-4 rounded bg-zinc-800" />
                  <span className="font-mono text-xs">{item}</span>
                </div>
              ))}
            </div>
            
            {/* Status */}
            <div className="mt-auto pt-6 border-t border-zinc-800 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-mono text-[10px] text-zinc-400">SYSTEM ONLINE</span>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1 p-4 md:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-zinc-500">MRO COMMAND /</span>
                <span className="font-mono text-xs text-accent">OVERVIEW</span>
              </div>
              <div className="font-mono text-[10px] text-zinc-600">12/21/2025 14:21 UTC</div>
            </div>
            
            {/* Stats cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <svg className="w-5 h-5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  <span className="font-mono text-[10px] text-zinc-500">● ACTIVE</span>
                </div>
                <div className="font-[var(--font-bebas)] text-3xl text-white">15</div>
                <div className="font-mono text-[10px] text-zinc-500">Total Requests</div>
              </div>
              
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <svg className="w-5 h-5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-mono text-[10px] text-yellow-500">● WAITING</span>
                </div>
                <div className="font-[var(--font-bebas)] text-3xl text-white">2</div>
                <div className="font-mono text-[10px] text-zinc-500">Awaiting Response</div>
              </div>
              
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <svg className="w-5 h-5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-mono text-[10px] text-accent bg-accent/10 px-1.5 py-0.5 rounded">ACTION</span>
                </div>
                <div className="font-[var(--font-bebas)] text-3xl text-accent">1</div>
                <div className="font-mono text-[10px] text-zinc-500">Quotes Ready</div>
              </div>
              
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <svg className="w-5 h-5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                  </svg>
                </div>
                <div className="font-[var(--font-bebas)] text-3xl text-white">11</div>
                <div className="font-mono text-[10px] text-zinc-500">Active Projects</div>
              </div>
            </div>
            
            {/* Requests list */}
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg">
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
                <span className="font-mono text-xs text-zinc-400 tracking-wider">ACTIVE REQUESTS</span>
                <span className="font-mono text-[10px] text-accent">VIEW ALL →</span>
              </div>
              <div className="divide-y divide-zinc-800/50">
                {[
                  { text: "Request for Quotation for Becker Pump Vanes", status: "PENDING VENDOR RESPONSE", statusColor: "bg-yellow-500/20 text-yellow-400" },
                  { text: "I need a new Becker VTLF 2.250", status: "DRAFT", statusColor: "bg-zinc-700 text-zinc-400" },
                  { text: "Request for Quotes on Vacuum Pump Vanes", status: "PENDING VENDOR RESPONSE", statusColor: "bg-yellow-500/20 text-yellow-400" },
                  { text: "Annual inspection for overhead cranes", status: "DRAFT", statusColor: "bg-zinc-700 text-zinc-400" },
                ].map((request, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-zinc-800/30 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-8 bg-accent/60 rounded-full" />
                      <div>
                        <div className="font-mono text-sm text-zinc-300 group-hover:text-white transition-colors">
                          {request.text.length > 45 ? request.text.slice(0, 45) + "..." : request.text}
                        </div>
                        <div className="font-mono text-[10px] text-zinc-600">John Requester</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={cn("font-mono text-[9px] px-2 py-0.5 rounded", request.statusColor)}>
                        {request.status}
                      </span>
                      <svg className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right sidebar - simplified */}
          <div className="w-56 bg-zinc-900/30 border-l border-zinc-800 p-4 hidden lg:block">
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span className="font-mono text-xs text-zinc-300">Awaiting Vendor Response</span>
              </div>
              <div className="font-mono text-[10px] text-zinc-500">14 pending · 0 overdue</div>
              <div className="mt-2 flex items-center gap-2">
                <span className="font-mono text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">14 medium</span>
              </div>
            </div>
            
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-3">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-zinc-400">YOUR IMPACT</span>
                <span className="font-mono text-[9px] text-accent bg-accent/10 px-1.5 py-0.5 rounded">🔥 2 day streak</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="font-[var(--font-bebas)] text-xl text-white">8</div>
                  <div className="font-mono text-[9px] text-zinc-500">Parts</div>
                </div>
                <div>
                  <div className="font-[var(--font-bebas)] text-xl text-white">~2hrs</div>
                  <div className="font-mono text-[9px] text-zinc-500">Saved</div>
                </div>
                <div>
                  <div className="font-[var(--font-bebas)] text-xl text-emerald-400">$0</div>
                  <div className="font-mono text-[9px] text-zinc-500">vs List</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Glow effect */}
      <div className="absolute -inset-8 bg-accent/5 rounded-3xl blur-3xl -z-10" />
    </div>
  )
}

export function ColophonSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const dashboardRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

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
      if (featuresRef.current) {
        const items = featuresRef.current.querySelectorAll(".feature-item")
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        )
      }

      // Dashboard animation
      if (dashboardRef.current) {
        gsap.fromTo(
          dashboardRef.current,
          { y: 60, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: dashboardRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        )
      }

      // CTA animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
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
    <section
      ref={sectionRef}
      id="colophon"
      className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/50 to-zinc-900/80 pointer-events-none" />
      
      <div className="relative">
        {/* Section header */}
        <div ref={headerRef} className="mb-16 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">05 / Trust & Security</span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
            BUILT FOR REAL FACILITIES.
          </h2>
          <p className="mt-6 font-mono text-sm text-muted-foreground max-w-xl mx-auto">
            Enterprise-grade controls. Your data stays yours. Compliance-ready from day one.
          </p>
        </div>

        {/* Security features grid */}
        <div ref={featuresRef} className="max-w-4xl mx-auto mb-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {securityFeatures.map((feature, index) => {
              const IconComponent = featureIcons[feature.icon]
              return (
                <div
                  key={index}
                  className={cn(
                    "feature-item flex items-start gap-3 p-4 rounded-lg bg-zinc-900/30 border border-border/30 hover:border-accent/30 transition-colors duration-300",
                    index === 4 && "lg:col-start-2" // Center the last item on large screens
                  )}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <IconComponent />
                  </div>
                  <div>
                    <h4 className="font-mono text-sm text-foreground mb-1">
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

        {/* Dashboard mockup */}
        <div ref={dashboardRef} className="mb-16">
          <DashboardMockup />
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-accent text-black font-mono text-sm font-bold px-8 py-4 rounded-lg hover:bg-accent/90 transition-all duration-200 hover:scale-105"
            >
              Try the Demo
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Schedule a walkthrough
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
          
          {/* Footer note */}
          <div className="mt-16 pt-8 border-t border-border/20">
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              © 2025 MRO.ai · Built for maintenance teams that move fast.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
