"use client"

import React, { useState, useRef, useEffect, useMemo } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Feature capabilities that drive the ROI
const capabilities = [
  {
    title: "Multi-Channel Intake",
    description: "Text, email, photo, kiosk — any way they want to request",
    icon: "channels",
    roiCategory: "procurement",
    color: "accent",
    link: "#signals",
  },
  {
    title: "Smart RFQ Builder",
    description: "AI structures messy requests into clean, complete RFQs",
    icon: "builder",
    roiCategory: "procurement",
    color: "accent",
    link: "#signals",
  },
  {
    title: "Floor Agent",
    description: "QR scan → troubleshoot → source, right at the machine",
    icon: "floor",
    roiCategory: "downtime",
    color: "cyan",
    link: "#agent",
  },
  {
    title: "Inventory Intelligence",
    description: "Know what you have before you order. AI-powered tracking",
    icon: "inventory",
    roiCategory: "inventory",
    color: "violet",
    link: "#inventory",
  },
  {
    title: "Project Mode",
    description: "Multi-phase projects with budget tracking and phase management",
    icon: "project",
    roiCategory: "procurement",
    color: "accent",
    link: "#projects",
  },
  {
    title: "Competitive Bidding",
    description: "Auto-send to 5+ vendors. More bids = better prices",
    icon: "bidding",
    roiCategory: "parts",
    color: "emerald",
    link: "#work",
  },
  {
    title: "Vendor Analytics",
    description: "Track response times, win rates, and performance over time",
    icon: "analytics",
    roiCategory: "parts",
    color: "emerald",
    link: "#work",
  },
  {
    title: "Adoption Tools",
    description: "Leaderboards, streaks, and recognition to drive team usage",
    icon: "adoption",
    roiCategory: "all",
    color: "amber",
    link: "#adoption",
  },
]

// Capability icon components
function ChannelsIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("w-6 h-6", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 8h7M8.5 12h4" />
    </svg>
  )
}

function BuilderIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("w-6 h-6", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  )
}

function FloorIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("w-6 h-6", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z" strokeOpacity="0.5" strokeDasharray="2 2" />
    </svg>
  )
}

function InventoryIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("w-6 h-6", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  )
}

function ProjectIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("w-6 h-6", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
    </svg>
  )
}

function BiddingIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("w-6 h-6", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  )
}

function AnalyticsIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("w-6 h-6", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  )
}

function AdoptionIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("w-6 h-6", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
    </svg>
  )
}

const capabilityIcons: Record<string, React.FC<{ className?: string }>> = {
  channels: ChannelsIcon,
  builder: BuilderIcon,
  floor: FloorIcon,
  inventory: InventoryIcon,
  project: ProjectIcon,
  bidding: BiddingIcon,
  analytics: AnalyticsIcon,
  adoption: AdoptionIcon,
}

const colorClasses: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  accent: { bg: "bg-accent/10", border: "border-accent/30", text: "text-accent", icon: "text-accent" },
  cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400", icon: "text-cyan-400" },
  violet: { bg: "bg-violet-500/10", border: "border-violet-500/30", text: "text-violet-400", icon: "text-violet-400" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", icon: "text-emerald-400" },
  amber: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", icon: "text-amber-400" },
}

const roiLabels: Record<string, string> = {
  procurement: "Saves Procurement Time",
  downtime: "Reduces Downtime",
  inventory: "Prevents Waste",
  parts: "Lowers Parts Cost",
  all: "Drives Adoption",
}

// Capabilities Preview Component
function CapabilitiesPreview() {
  return (
    <div className="mt-12 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">What Drives These Numbers</span>
          <p className="text-sm text-zinc-400 mt-1">Click any capability to see it in action below</p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs text-zinc-500">
          <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span className="font-mono">Scroll to explore</span>
        </div>
      </div>
      
      {/* Capabilities Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {capabilities.map((cap, index) => {
          const IconComponent = capabilityIcons[cap.icon]
          const colors = colorClasses[cap.color]
          const roiLabel = roiLabels[cap.roiCategory]
          
          return (
            <a
              key={index}
              href={cap.link}
              className={cn(
                "group relative p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02]",
                colors.border,
                "bg-zinc-900/30 hover:bg-zinc-900/60"
              )}
            >
              {/* Icon */}
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors",
                colors.bg
              )}>
                <IconComponent className={colors.icon} />
              </div>
              
              {/* Title */}
              <h4 className={cn(
                "font-mono text-sm font-medium mb-1 transition-colors",
                "text-zinc-200 group-hover:" + colors.text.replace("text-", "text-")
              )}>
                {cap.title}
              </h4>
              
              {/* Description */}
              <p className="font-mono text-[11px] text-zinc-500 leading-relaxed mb-3">
                {cap.description}
              </p>
              
              {/* ROI Connection */}
              <div className="flex items-center gap-1.5">
                <div className={cn("w-1.5 h-1.5 rounded-full", colors.bg.replace("/10", ""))} />
                <span className={cn("font-mono text-[9px] uppercase tracking-wider", colors.text, "opacity-70")}>
                  {roiLabel}
                </span>
              </div>
              
              {/* Hover arrow */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className={cn("w-4 h-4", colors.icon)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </a>
          )
        })}
      </div>
      
      {/* Bottom CTA */}
      <div className="mt-6 text-center">
        <p className="font-mono text-xs text-zinc-500">
          Each capability is detailed below. <span className="text-accent">Keep scrolling to see how they work.</span>
        </p>
      </div>
    </div>
  )
}

// Animated number component
function AnimatedNumber({ value, prefix = "", suffix = "", decimals = 0 }: { value: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [displayValue, setDisplayValue] = useState(value)
  const prevValue = useRef(value)
  
  useEffect(() => {
    const startValue = prevValue.current
    const endValue = value
    const duration = 600
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = startValue + (endValue - startValue) * eased
      setDisplayValue(current)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
    prevValue.current = value
  }, [value])
  
  const formatted = decimals > 0 
    ? displayValue.toFixed(decimals) 
    : Math.round(displayValue).toLocaleString()
  
  return <span>{prefix}{formatted}{suffix}</span>
}

// ROI Calculator Component
function ROICalculator() {
  const [rfqsPerMonth, setRfqsPerMonth] = useState(50)
  const [partsSpend, setPartsSpend] = useState(75000)
  const [downtimeHours, setDowntimeHours] = useState(20)
  const [showBreakdown, setShowBreakdown] = useState(false)
  
  // Calculate savings
  const calculations = useMemo(() => {
    // Procurement time savings
    // Old way: ~4 hours per RFQ, New way: ~15 minutes
    const hoursPerRfqSaved = 3.75 // 4 hours - 15 min
    const procurementHoursSaved = rfqsPerMonth * hoursPerRfqSaved
    const hourlyRate = 50 // Average loaded cost of procurement/maintenance staff
    const procurementDollarsSaved = procurementHoursSaved * hourlyRate
    
    // Parts cost savings from more competitive bids
    // Typically 10-15% savings when getting 5+ quotes vs 2
    const bidSavingsPercent = 0.12
    const partsCostSavings = partsSpend * bidSavingsPercent
    
    // Downtime reduction
    // Faster troubleshooting at machine + faster sourcing = ~25% reduction
    const downtimeReductionPercent = 0.25
    const downtimeHoursSaved = downtimeHours * downtimeReductionPercent
    const downtimeCostPerHour = 500 // Conservative estimate for industrial
    const downtimeSavings = downtimeHoursSaved * downtimeCostPerHour
    
    // Inventory waste prevention
    // Typically 3-5% of parts spend is wasted on duplicates
    const inventoryWastePercent = 0.04
    const inventoryWasteSavings = partsSpend * inventoryWastePercent
    
    // Total monthly
    const totalMonthlySavings = procurementDollarsSaved + partsCostSavings + downtimeSavings + inventoryWasteSavings
    
    // Annual
    const totalAnnualSavings = totalMonthlySavings * 12
    
    return {
      procurementHoursSaved: Math.round(procurementHoursSaved),
      procurementDollarsSaved: Math.round(procurementDollarsSaved),
      partsCostSavings: Math.round(partsCostSavings),
      downtimeHoursSaved: Math.round(downtimeHoursSaved * 10) / 10,
      downtimeSavings: Math.round(downtimeSavings),
      inventoryWasteSavings: Math.round(inventoryWasteSavings),
      totalMonthlySavings: Math.round(totalMonthlySavings),
      totalAnnualSavings: Math.round(totalAnnualSavings),
    }
  }, [rfqsPerMonth, partsSpend, downtimeHours])
  
  // Format large currency
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `$${Math.round(value / 1000)}k`
    }
    return `$${value}`
  }

  return (
    <div className="relative mb-16">
      {/* Calculator container */}
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-accent/20 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-accent/10 bg-accent/5">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                Interactive ROI Calculator
              </span>
              <p className="text-sm text-zinc-400 mt-1">Adjust the sliders to see your potential savings</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs text-accent">Live calculation</span>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="p-6 md:p-8">
          {/* Input section */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-10">
            {/* RFQs per month */}
            <div className="space-y-3">
              <label className="block">
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">RFQs per month</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-[var(--font-bebas)] text-4xl text-accent">{rfqsPerMonth}</span>
                  <span className="font-mono text-xs text-zinc-500">requests</span>
                </div>
              </label>
              <input
                type="range"
                min="10"
                max="300"
                step="5"
                value={rfqsPerMonth}
                onChange={(e) => setRfqsPerMonth(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-accent [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-600">
                <span>10</span>
                <span>300</span>
              </div>
            </div>
            
            {/* Monthly parts spend */}
            <div className="space-y-3">
              <label className="block">
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">Monthly parts spend</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-[var(--font-bebas)] text-4xl text-accent">${(partsSpend / 1000).toFixed(0)}k</span>
                </div>
              </label>
              <input
                type="range"
                min="10000"
                max="500000"
                step="5000"
                value={partsSpend}
                onChange={(e) => setPartsSpend(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-accent [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-600">
                <span>$10k</span>
                <span>$500k</span>
              </div>
            </div>
            
            {/* Downtime hours */}
            <div className="space-y-3">
              <label className="block">
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">Downtime hrs/month</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-[var(--font-bebas)] text-4xl text-accent">{downtimeHours}</span>
                  <span className="font-mono text-xs text-zinc-500">hours</span>
                </div>
              </label>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={downtimeHours}
                onChange={(e) => setDowntimeHours(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-accent [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-600">
                <span>5</span>
                <span>100</span>
              </div>
            </div>
          </div>
          
          {/* Output cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Procurement time */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 hover:border-accent/30 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase">Procurement</span>
              </div>
              <div className="font-[var(--font-bebas)] text-3xl text-accent mb-1">
                <AnimatedNumber value={calculations.procurementHoursSaved} suffix=" hrs" />
              </div>
              <div className="font-mono text-xs text-zinc-500">saved/month</div>
              <div className="mt-2 pt-2 border-t border-zinc-800">
                <span className="font-mono text-sm text-zinc-400">
                  <AnimatedNumber value={calculations.procurementDollarsSaved} prefix="$" />/mo
                </span>
              </div>
            </div>
            
            {/* Parts cost savings */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 hover:border-emerald-500/30 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase">Parts Costs</span>
              </div>
              <div className="font-[var(--font-bebas)] text-3xl text-emerald-400 mb-1">
                <AnimatedNumber value={calculations.partsCostSavings} prefix="$" />
              </div>
              <div className="font-mono text-xs text-zinc-500">saved/month</div>
              <div className="mt-2 pt-2 border-t border-zinc-800">
                <span className="font-mono text-[10px] text-emerald-400/70">12% avg from more bids</span>
              </div>
            </div>
            
            {/* Downtime avoided */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 hover:border-cyan-500/30 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase">Downtime</span>
              </div>
              <div className="font-[var(--font-bebas)] text-3xl text-cyan-400 mb-1">
                <AnimatedNumber value={calculations.downtimeHoursSaved} decimals={1} suffix=" hrs" />
              </div>
              <div className="font-mono text-xs text-zinc-500">avoided/month</div>
              <div className="mt-2 pt-2 border-t border-zinc-800">
                <span className="font-mono text-sm text-zinc-400">
                  <AnimatedNumber value={calculations.downtimeSavings} prefix="$" />/mo
                </span>
              </div>
            </div>
            
            {/* Inventory waste */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 hover:border-violet-500/30 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase">Inventory</span>
              </div>
              <div className="font-[var(--font-bebas)] text-3xl text-violet-400 mb-1">
                <AnimatedNumber value={calculations.inventoryWasteSavings} prefix="$" />
              </div>
              <div className="font-mono text-xs text-zinc-500">waste prevented</div>
              <div className="mt-2 pt-2 border-t border-zinc-800">
                <span className="font-mono text-[10px] text-violet-400/70">No duplicate orders</span>
              </div>
            </div>
          </div>
          
          {/* Total impact */}
          <div className="bg-gradient-to-r from-accent/10 via-accent/5 to-transparent border border-accent/30 rounded-xl p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Total Annual Impact</span>
                <div className="mt-2 font-[var(--font-bebas)] text-5xl md:text-6xl text-accent">
                  <AnimatedNumber value={calculations.totalAnnualSavings} prefix="$" />
                </div>
                <div className="mt-1 font-mono text-sm text-zinc-400">
                  <AnimatedNumber value={calculations.totalMonthlySavings} prefix="$" />/month
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <span className="text-zinc-400">That's</span>
                  <span className="font-mono text-accent font-bold">
                    {Math.round((calculations.procurementHoursSaved * 12) / 40)} weeks
                  </span>
                  <span className="text-zinc-400">of labor back per year</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-zinc-400">Plus</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {formatCurrency(calculations.partsCostSavings * 12)}
                  </span>
                  <span className="text-zinc-400">in competitive pricing</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Expandable breakdown */}
          <div className="mt-6">
            <button
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="flex items-center gap-2 font-mono text-xs text-zinc-500 hover:text-accent transition-colors"
            >
              <svg
                className={cn("w-4 h-4 transition-transform", showBreakdown && "rotate-180")}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              {showBreakdown ? "Hide" : "Show"} detailed breakdown
            </button>
            
            {showBreakdown && (
              <div className="mt-4 grid md:grid-cols-2 gap-6 p-4 bg-zinc-900/30 rounded-xl border border-zinc-800">
                {/* Where procurement savings come from */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-accent mb-3">
                    Where Procurement Time Goes (Old Way)
                  </h4>
                  <div className="space-y-2">
                    {[
                      { step: "Request intake & parsing", before: "45 min", after: "2 min", saved: "43 min" },
                      { step: "RFQ creation & structuring", before: "30 min", after: "0 min", saved: "30 min" },
                      { step: "Vendor outreach", before: "25 min", after: "0 min", saved: "25 min" },
                      { step: "Quote parsing & normalization", before: "40 min", after: "3 min", saved: "37 min" },
                      { step: "Comparison & decision", before: "30 min", after: "5 min", saved: "25 min" },
                      { step: "Approval & ordering", before: "20 min", after: "5 min", saved: "15 min" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <span className="text-zinc-400">{item.step}</span>
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-red-400/70 line-through">{item.before}</span>
                          <span className="font-mono text-accent">{item.after}</span>
                        </div>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-zinc-700 flex items-center justify-between text-sm font-bold">
                      <span className="text-zinc-300">Total per RFQ</span>
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-red-400 line-through">~4 hrs</span>
                        <span className="font-mono text-accent">~15 min</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Other savings sources */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-emerald-400 mb-3">
                    Additional Value Sources
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-emerald-400 text-xs">$</span>
                      </div>
                      <div>
                        <div className="text-sm text-zinc-300 font-medium">More Competitive Bids</div>
                        <div className="text-xs text-zinc-500 mt-0.5">Easy to send RFQs to 5+ vendors instead of your usual 2. More competition = better prices (typically 10-15% savings).</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-cyan-500/5 rounded-lg border border-cyan-500/20">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-cyan-400 text-xs">⚡</span>
                      </div>
                      <div>
                        <div className="text-sm text-zinc-300 font-medium">Floor Troubleshooting</div>
                        <div className="text-xs text-zinc-500 mt-0.5">AI agent at each machine helps diagnose issues on the spot. Faster diagnosis + instant sourcing = machines run sooner.</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-violet-500/5 rounded-lg border border-violet-500/20">
                      <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-violet-400 text-xs">📦</span>
                      </div>
                      <div>
                        <div className="text-sm text-zinc-300 font-medium">Inventory Intelligence</div>
                        <div className="text-xs text-zinc-500 mt-0.5">Know what you have before you order. No more duplicate purchases or emergency orders for parts already in stock.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const calculatorRef = useRef<HTMLDivElement>(null)
  const capabilitiesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return

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

      // Calculator fade in
      if (calculatorRef.current) {
        gsap.fromTo(
          calculatorRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: calculatorRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }

      // Capabilities preview fade in
      if (capabilitiesRef.current) {
        gsap.fromTo(
          capabilitiesRef.current,
          { y: 40, opacity: 0 },
          {
          y: 0,
          opacity: 1,
            duration: 1,
          ease: "power3.out",
          scrollTrigger: {
              trigger: capabilitiesRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="work" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">02 / Your ROI</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
          THE SAVINGS ADD UP EVERYWHERE.
        </h2>
        <p className="mt-6 font-mono text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Not just faster quotes — lower parts costs, less downtime, zero wasted orders. 
          <span className="text-accent"> See what you're leaving on the table.</span>
        </p>
      </div>

      {/* ROI Calculator */}
      <div ref={calculatorRef}>
        <ROICalculator />
      </div>

      {/* Capabilities Preview - What drives the ROI */}
      <div ref={capabilitiesRef}>
        <CapabilitiesPreview />
      </div>
    </section>
  )
}

