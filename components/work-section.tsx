"use client"

import React, { useState, useRef, useEffect, useMemo } from "react"
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
  const gridRef = useRef<HTMLDivElement>(null)
  const calculatorRef = useRef<HTMLDivElement>(null)
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

      {/* How it works label */}
      <div className="mb-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">The Modules That Make It Happen</span>
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
