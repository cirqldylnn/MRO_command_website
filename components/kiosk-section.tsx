"use client"

import React, { useRef, useEffect, useState } from "react"
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

// Kiosk UI Mockup Component - Vertical Freestanding
function KioskMockup() {
  const [currentScreen, setCurrentScreen] = useState(0)
  
  // Cycle through screens
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative flex flex-col items-center">
      {/* Kiosk frame - vertical freestanding */}
      <div className="relative w-[280px] md:w-[320px]">
        
        {/* Main kiosk body - taller/vertical aspect */}
        <div className="relative bg-zinc-800 rounded-2xl border-4 border-zinc-700 shadow-2xl shadow-black/50 overflow-hidden">
          {/* Top bezel with camera/mic */}
          <div className="bg-zinc-900 px-4 py-3 flex items-center justify-between border-b border-zinc-700">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-600 ring-1 ring-zinc-500" />
              <div className="w-1.5 h-4 rounded-full bg-zinc-600" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-wider">Online</span>
            </div>
          </div>
          
          {/* Screen content - cycling */}
          <div className="bg-zinc-950 min-h-[480px] relative overflow-hidden">
            
            {/* Screen 0: Order Updates Dashboard */}
            <div className={cn(
              "absolute inset-0 p-4 transition-all duration-500",
              currentScreen === 0 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
            )}>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-mono text-[9px] text-zinc-500 uppercase">Welcome back</div>
                  <div className="font-[var(--font-bebas)] text-lg text-white">Mike T.</div>
                </div>
                <div className="flex items-center gap-1 bg-accent/10 border border-accent/30 rounded-full px-2 py-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="font-mono text-[8px] text-accent">3 UPDATES</span>
                </div>
              </div>

              {/* Active Orders */}
              <div className="mb-4">
                <div className="font-mono text-[9px] text-zinc-500 uppercase mb-2">Active Orders</div>
                <div className="space-y-2">
                  {/* Order 1 - Quotes received */}
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] text-emerald-400 font-medium">RFQ #4418</span>
                      <span className="font-mono text-[8px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">3 QUOTES</span>
                    </div>
                    <div className="font-mono text-xs text-white mb-1">Vacuum Pump Rebuild Kit</div>
                    <div className="font-mono text-[9px] text-zinc-500">Ready for review →</div>
                  </div>
                  
                  {/* Order 2 - In transit */}
                  <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] text-zinc-400">PO #8821</span>
                      <span className="font-mono text-[8px] bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded">IN TRANSIT</span>
                    </div>
                    <div className="font-mono text-xs text-white mb-1">Bearing SKF 6205-2RS (x4)</div>
                    <div className="font-mono text-[9px] text-zinc-500">Arrives tomorrow, 2pm</div>
                  </div>

                  {/* Order 3 - Pending */}
                  <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] text-zinc-400">RFQ #4420</span>
                      <span className="font-mono text-[8px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded">PENDING</span>
                    </div>
                    <div className="font-mono text-xs text-white mb-1">Motor Coupling L-100</div>
                    <div className="font-mono text-[9px] text-zinc-500">Sent to 4 vendors</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-accent text-black rounded-lg p-3 text-center">
                  <svg className="w-5 h-5 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="font-mono text-[9px] font-bold">New Request</span>
                </button>
                <button className="bg-zinc-800 border border-zinc-700 text-white rounded-lg p-3 text-center">
                  <svg className="w-5 h-5 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z" />
                  </svg>
                  <span className="font-mono text-[9px]">Scan QR</span>
                </button>
              </div>
            </div>

            {/* Screen 1: Parts Diagram View */}
            <div className={cn(
              "absolute inset-0 p-4 transition-all duration-500",
              currentScreen === 1 ? "opacity-100 translate-x-0" : currentScreen === 0 ? "opacity-0 translate-x-full" : "opacity-0 -translate-x-full"
            )}>
              {/* Header */}
              <div className="flex items-center gap-2 mb-3">
                <button className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                  <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <div className="font-mono text-[9px] text-zinc-500 uppercase">Equipment</div>
                  <div className="font-[var(--font-bebas)] text-base text-white">Becker VTLF 2.250</div>
                </div>
              </div>

              {/* Parts diagram placeholder */}
              <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-3 mb-3">
                <div className="aspect-square bg-zinc-800 rounded-lg relative overflow-hidden mb-3">
                  {/* Simplified pump diagram */}
                  <svg className="w-full h-full p-4" viewBox="0 0 100 100" fill="none">
                    {/* Pump body */}
                    <rect x="20" y="30" width="60" height="40" rx="4" className="stroke-zinc-600" strokeWidth="1.5" fill="none" />
                    {/* Inlet */}
                    <rect x="10" y="42" width="12" height="16" rx="2" className="stroke-zinc-600" strokeWidth="1.5" fill="none" />
                    {/* Outlet */}
                    <rect x="78" y="42" width="12" height="16" rx="2" className="stroke-zinc-600" strokeWidth="1.5" fill="none" />
                    {/* Motor */}
                    <circle cx="50" cy="50" r="15" className="stroke-zinc-500" strokeWidth="1.5" fill="none" />
                    <circle cx="50" cy="50" r="8" className="stroke-accent" strokeWidth="2" fill="none" />
                    {/* Mounting */}
                    <rect x="25" y="70" width="10" height="8" rx="1" className="fill-zinc-700" />
                    <rect x="65" y="70" width="10" height="8" rx="1" className="fill-zinc-700" />
                    {/* Highlight callout */}
                    <circle cx="50" cy="50" r="20" className="stroke-accent/50" strokeWidth="1" strokeDasharray="4 2" fill="none" />
                  </svg>
                  {/* Part callout */}
                  <div className="absolute top-2 right-2 bg-accent text-black font-mono text-[8px] font-bold px-1.5 py-0.5 rounded">
                    TAP TO ZOOM
                  </div>
                </div>
                
                {/* Part info */}
                <div className="font-mono text-[9px] text-zinc-500 uppercase mb-1">Selected Part</div>
                <div className="font-mono text-sm text-white mb-1">Rotor Assembly</div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] text-zinc-500">Part #:</span>
                  <span className="font-mono text-[9px] text-accent">BK-VTLF-ROT-250</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button className="w-full bg-accent text-black rounded-lg p-3 font-mono text-xs font-bold flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Request This Part
                </button>
                <button className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg p-3 font-mono text-xs flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  View Full Manual
                </button>
              </div>
            </div>

            {/* Screen 2: Quote Comparison */}
            <div className={cn(
              "absolute inset-0 p-4 transition-all duration-500",
              currentScreen === 2 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
            )}>
              {/* Header */}
              <div className="flex items-center gap-2 mb-3">
                <button className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                  <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <div className="font-mono text-[9px] text-zinc-500 uppercase">RFQ #4418</div>
                  <div className="font-[var(--font-bebas)] text-base text-white">Compare Quotes</div>
                </div>
              </div>

              {/* Part summary */}
              <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-3 mb-3">
                <div className="font-mono text-xs text-white mb-1">Vacuum Pump Rebuild Kit</div>
                <div className="font-mono text-[9px] text-zinc-500">For: Becker VTLF 2.250 · Qty: 1</div>
              </div>

              {/* Quote cards */}
              <div className="space-y-2 mb-3">
                {/* Best quote */}
                <div className="bg-emerald-500/10 border-2 border-emerald-500/50 rounded-lg p-3 relative">
                  <div className="absolute -top-2 right-2 bg-emerald-500 text-black font-mono text-[7px] font-bold px-1.5 py-0.5 rounded">
                    BEST VALUE
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-white font-medium">Industrial Supply Co</span>
                    <span className="font-[var(--font-bebas)] text-xl text-emerald-400">$847</span>
                  </div>
                  <div className="flex items-center gap-3 text-[9px] font-mono text-zinc-400">
                    <span>Ships: 2 days</span>
                    <span>•</span>
                    <span>In Stock</span>
                  </div>
                </div>

                {/* Quote 2 */}
                <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-white">MRO Direct</span>
                    <span className="font-[var(--font-bebas)] text-xl text-white">$892</span>
                  </div>
                  <div className="flex items-center gap-3 text-[9px] font-mono text-zinc-400">
                    <span>Ships: 1 day</span>
                    <span>•</span>
                    <span>In Stock</span>
                  </div>
                </div>

                {/* Quote 3 */}
                <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-white">Grainger</span>
                    <span className="font-[var(--font-bebas)] text-xl text-white">$923</span>
                  </div>
                  <div className="flex items-center gap-3 text-[9px] font-mono text-zinc-400">
                    <span>Ships: 3 days</span>
                    <span>•</span>
                    <span>In Stock</span>
                  </div>
                </div>
              </div>

              {/* Award button */}
              <button className="w-full bg-accent text-black rounded-lg p-3 font-mono text-xs font-bold flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Award to Industrial Supply
              </button>
            </div>

            {/* Screen indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {[0, 1, 2].map((i) => (
                <div 
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    currentScreen === i ? "w-6 bg-accent" : "w-1.5 bg-zinc-700"
                  )}
                />
              ))}
            </div>
          </div>
          
          {/* Bottom bezel */}
          <div className="bg-zinc-900 h-4 border-t border-zinc-700" />
        </div>

        {/* Kiosk stand/pedestal */}
        <div className="relative mx-auto">
          {/* Neck */}
          <div className="w-8 h-16 bg-gradient-to-b from-zinc-700 to-zinc-800 mx-auto" />
          {/* Base */}
          <div className="w-32 h-3 bg-zinc-700 rounded-full mx-auto" />
          <div className="w-40 h-2 bg-zinc-800 rounded-full mx-auto mt-1 shadow-lg shadow-black/50" />
        </div>
        
        {/* Shadow/glow effect */}
        <div className="absolute -inset-8 bg-accent/5 rounded-3xl blur-3xl -z-10" />
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
          
          {/* Pain hook */}
          <p className="mt-4 font-mono text-sm text-red-400/80 italic">
            Your team shouldn't need a laptop to place an order.
          </p>
          
          <h2 className="mt-3 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">THE KIOSK</h2>
          <p className="mt-4 font-[var(--font-bebas)] text-2xl md:text-4xl text-muted-foreground tracking-tight max-w-2xl">
            A sourcing desk that lives on the floor.
          </p>

          {/* Specs strip */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground/60">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
              </svg>
              <span className="font-mono text-[10px] uppercase tracking-wider">43" Display</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 20V4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-mono text-[10px] uppercase tracking-wider">LTE Built-in</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318V4.575" />
              </svg>
              <span className="font-mono text-[10px] uppercase tracking-wider">Glove-Friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
              <span className="font-mono text-[10px] uppercase tracking-wider">Wall or Stand</span>
            </div>
          </div>
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
                  href="#cta"
                  className="inline-flex items-center gap-2 bg-accent text-black font-mono text-sm font-bold px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors duration-200"
                >
                  See If You Qualify
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





