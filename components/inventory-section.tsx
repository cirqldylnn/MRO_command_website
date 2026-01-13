"use client"

import React, { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    id: "ai-import",
    title: "AI-Powered Import",
    description: "Snap a photo of any part. AI extracts specs, finds suppliers, catalogs it instantly.",
    icon: "camera",
    color: "cyan",
  },
  {
    id: "tracking",
    title: "Smart Stock Tracking",
    description: "Real-time quantities, bin locations, and automatic reorder alerts when you're running low.",
    icon: "chart",
    color: "emerald",
  },
  {
    id: "linking",
    title: "Parts ↔ Equipment",
    description: "Every part knows which machines it fits. Every machine knows its parts.",
    icon: "link",
    color: "amber",
  },
  {
    id: "analytics",
    title: "Usage Analytics",
    description: "Track consumption patterns. Predict needs. Stop emergency orders.",
    icon: "analytics",
    color: "violet",
  },
]

// Sample inventory data for the mockup
const inventoryItems = [
  { name: "Bearing SKF 6205", sku: "BRG-6205-2RS", qty: 12, min: 5, location: "A-12", status: "ok" },
  { name: "V-Belt A68", sku: "BLT-A68-IND", qty: 3, min: 8, location: "B-04", status: "low" },
  { name: "Oil Filter #4420", sku: "FLT-HYD-4420", qty: 24, min: 10, location: "C-08", status: "ok" },
  { name: "Seal Kit IR-250", sku: "SEL-IR250-KT", qty: 2, min: 4, location: "A-22", status: "critical" },
  { name: "Contactor LC1D25", sku: "ELC-LC1D25", qty: 8, min: 4, location: "D-01", status: "ok" },
]

// Icons
function CameraIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("w-5 h-5", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
  )
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("w-5 h-5", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  )
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("w-5 h-5", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
  )
}

function AnalyticsIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("w-5 h-5", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  )
}

const featureIcons: Record<string, ({ className }: { className?: string }) => React.ReactElement> = {
  camera: CameraIcon,
  chart: ChartIcon,
  link: LinkIcon,
  analytics: AnalyticsIcon,
}

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  cyan: { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/30" },
  emerald: { bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/30" },
  amber: { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-500/30" },
  violet: { bg: "bg-violet-500/20", text: "text-violet-400", border: "border-violet-500/30" },
}

// Inventory Dashboard Mockup
function InventoryDashboard() {
  const [importingPart, setImportingPart] = useState(false)
  const [importedPart, setImportedPart] = useState<{ name: string; sku: string } | null>(null)

  useEffect(() => {
    // Simulate AI import animation
    const runImport = () => {
      setImportingPart(true)
      setImportedPart(null)
      
      setTimeout(() => {
        setImportingPart(false)
        setImportedPart({ name: "Motor Coupling L-100", sku: "CPL-L100-JAW" })
      }, 2500)
      
      setTimeout(() => {
        setImportedPart(null)
      }, 6000)
    }

    runImport()
    const interval = setInterval(runImport, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-violet-500/10 blur-3xl opacity-50" />
      
      {/* Dashboard container */}
      <div className="relative bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
        {/* Header bar */}
        <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="font-mono text-xs text-zinc-500">Inventory Management</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded text-emerald-400 font-mono text-[10px]">
              248 items tracked
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="p-4 space-y-4">
          {/* Stats row */}
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
              <div className="font-mono text-[10px] text-zinc-500 uppercase">Total SKUs</div>
              <div className="font-[var(--font-bebas)] text-2xl text-white">248</div>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
              <div className="font-mono text-[10px] text-zinc-500 uppercase">Low Stock</div>
              <div className="font-[var(--font-bebas)] text-2xl text-amber-400">12</div>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
              <div className="font-mono text-[10px] text-zinc-500 uppercase">Critical</div>
              <div className="font-[var(--font-bebas)] text-2xl text-red-400">3</div>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
              <div className="font-mono text-[10px] text-zinc-500 uppercase">Value</div>
              <div className="font-[var(--font-bebas)] text-2xl text-emerald-400">$47K</div>
            </div>
          </div>

          {/* AI Import notification */}
          <div className={cn(
            "transition-all duration-500 overflow-hidden",
            importingPart || importedPart ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          )}>
            <div className={cn(
              "border rounded-lg p-3 flex items-center gap-3",
              importingPart 
                ? "bg-cyan-500/10 border-cyan-500/30" 
                : "bg-emerald-500/10 border-emerald-500/30"
            )}>
              {importingPart ? (
                <>
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-cyan-400 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-mono text-xs text-cyan-400">AI analyzing part image...</div>
                    <div className="h-1.5 bg-zinc-800 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-cyan-500 rounded-full animate-pulse" style={{ width: "60%" }} />
                    </div>
                  </div>
                </>
              ) : importedPart ? (
                <>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-mono text-xs text-emerald-400">Part imported successfully</div>
                    <div className="font-mono text-[10px] text-zinc-400">{importedPart.name} • {importedPart.sku}</div>
                  </div>
                </>
              ) : null}
            </div>
          </div>

          {/* Inventory table */}
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-zinc-900/50 border-b border-zinc-800 font-mono text-[10px] text-zinc-500 uppercase">
              <div className="col-span-4">Part Name</div>
              <div className="col-span-3">SKU</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2">Bin</div>
              <div className="col-span-1"></div>
            </div>
            
            {/* Table rows */}
            {inventoryItems.map((item, index) => (
              <div 
                key={index}
                className={cn(
                  "grid grid-cols-12 gap-2 px-3 py-2.5 border-b border-zinc-800/50 last:border-0 items-center",
                  item.status === "critical" && "bg-red-500/5",
                  item.status === "low" && "bg-amber-500/5"
                )}
              >
                <div className="col-span-4 font-mono text-xs text-white truncate">{item.name}</div>
                <div className="col-span-3 font-mono text-[10px] text-zinc-500">{item.sku}</div>
                <div className="col-span-2 text-center">
                  <span className={cn(
                    "font-mono text-xs font-bold",
                    item.status === "ok" && "text-emerald-400",
                    item.status === "low" && "text-amber-400",
                    item.status === "critical" && "text-red-400"
                  )}>
                    {item.qty}
                  </span>
                  <span className="text-zinc-600 text-[10px]">/{item.min}</span>
                </div>
                <div className="col-span-2 font-mono text-[10px] text-zinc-400">{item.location}</div>
                <div className="col-span-1 flex justify-end">
                  {item.status !== "ok" && (
                    <div className={cn(
                      "w-2 h-2 rounded-full animate-pulse",
                      item.status === "low" && "bg-amber-400",
                      item.status === "critical" && "bg-red-400"
                    )} />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick action buttons */}
          <div className="flex gap-2">
            <button className="flex-1 bg-accent/10 border border-accent/30 rounded-lg py-2 font-mono text-xs text-accent flex items-center justify-center gap-2 hover:bg-accent/20 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Part
            </button>
            <button className="flex-1 bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 font-mono text-xs text-zinc-400 flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
              </svg>
              Scan to Import
            </button>
            <button className="flex-1 bg-zinc-800/50 border border-zinc-700 rounded-lg py-2 font-mono text-xs text-zinc-400 flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function InventorySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

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

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="inventory" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent" />
      </div>

      {/* Section Label */}
      <div className="absolute left-4 md:left-6 top-32">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground -rotate-90 origin-left block">
          Inventory
        </span>
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <div className="inline-block border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">
              Inventory Intelligence
            </span>
          </div>
          <h2 className="font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
            YOUR PARTS,<br />
            <span className="text-emerald-400">ALWAYS ACCOUNTED FOR.</span>
          </h2>
          <p className="mt-6 font-mono text-sm text-muted-foreground max-w-xl">
            Snap a photo → AI catalogs it. Track stock levels. Get alerts before you run out. 
            Know exactly what you have and where it lives.
          </p>
        </div>

        {/* Main content */}
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Feature cards */}
          <div className="order-2 lg:order-1 space-y-4">
            {features.map((feature) => {
              const Icon = featureIcons[feature.icon]
              const colors = colorClasses[feature.color]
              
              return (
                <div
                  key={feature.id}
                  className={cn(
                    "p-5 rounded-xl border transition-all duration-300 bg-zinc-900/30 border-zinc-800 hover:border-zinc-700",
                    `hover:${colors.border}`
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                      colors.bg, colors.text
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className={cn("font-[var(--font-bebas)] text-lg tracking-tight", colors.text)}>
                        {feature.title}
                      </div>
                      <p className="font-mono text-xs text-muted-foreground mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Callout */}
            <div className="border border-emerald-500/20 bg-emerald-500/5 p-5 rounded-xl mt-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <div>
                  <div className="font-mono text-xs text-emerald-400 font-medium mb-1">
                    AI does the data entry
                  </div>
                  <div className="font-mono text-[11px] text-muted-foreground leading-relaxed">
                    Take a photo of any part — label, packaging, or the part itself. 
                    AI extracts manufacturer, part number, specs, and even finds compatible suppliers.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Dashboard mockup */}
          <div className="order-1 lg:order-2">
            <InventoryDashboard />
          </div>
        </div>
      </div>
    </section>
  )
}
