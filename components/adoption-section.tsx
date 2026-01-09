"use client"

import React, { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const engagementFeatures = [
  {
    title: "Your Impact Dashboard",
    description: "Every user sees their contribution: parts sourced, time saved, money saved vs. list price.",
    icon: "chart",
  },
  {
    title: "Team Visibility",
    description: "Managers see engagement across the team. Know who's using the system and who needs a nudge.",
    icon: "team",
  },
  {
    title: "Streak Tracking",
    description: "Daily engagement tracking builds habits. Consistent usage means consistent results.",
    icon: "fire",
  },
  {
    title: "Incentive Programs",
    description: "Optional rewards for engagement. Monthly raffles, instant-win opportunities, milestone badges.",
    icon: "gift",
  },
]

// Icons
function ChartIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  )
}

function TeamIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  )
}

function FireIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
    </svg>
  )
}

function GiftIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  )
}

const featureIcons: Record<string, () => React.ReactElement> = {
  chart: ChartIcon,
  team: TeamIcon,
  fire: FireIcon,
  gift: GiftIcon,
}

// Animated counter for impact stats
function AnimatedCounter({ value, suffix = "", isVisible }: { value: number; suffix?: string; isVisible: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    
    const duration = 1500
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(value * eased))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [isVisible, value])

  return <span>{count}{suffix}</span>
}

// Your Impact Dashboard Mockup
function ImpactDashboardMockup({ isVisible }: { isVisible: boolean }) {
  return (
    <div className="relative max-w-sm mx-auto">
      {/* Dashboard card */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-700 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-zinc-800 px-4 py-3 border-b border-zinc-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="text-xs">👤</span>
            </div>
            <span className="font-mono text-xs text-zinc-300">Your Impact</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded-full">🔥 12 day streak</span>
          </div>
        </div>
        
        {/* Stats */}
        <div className="p-4">
          {/* Main stats grid */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
              <div className="font-[var(--font-bebas)] text-2xl text-white">
                <AnimatedCounter value={47} isVisible={isVisible} />
              </div>
              <div className="font-mono text-[9px] text-zinc-500 uppercase">Parts Sourced</div>
            </div>
            <div className="text-center p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
              <div className="font-[var(--font-bebas)] text-2xl text-accent">
                ~<AnimatedCounter value={18} isVisible={isVisible} />h
              </div>
              <div className="font-mono text-[9px] text-zinc-500 uppercase">Time Saved</div>
            </div>
            <div className="text-center p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
              <div className="font-[var(--font-bebas)] text-2xl text-emerald-400">
                $<AnimatedCounter value={2400} isVisible={isVisible} />
              </div>
              <div className="font-mono text-[9px] text-zinc-500 uppercase">vs List Price</div>
            </div>
          </div>
          
          {/* Activity this month */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] text-zinc-500 uppercase">This Month</span>
              <span className="font-mono text-[10px] text-accent">+23% vs last</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-accent to-emerald-500 rounded-full transition-all duration-1000"
                style={{ width: isVisible ? '78%' : '0%' }}
              />
            </div>
          </div>
          
          {/* Raffle entries */}
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg p-3 border border-amber-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🎫</span>
                <div>
                  <div className="font-mono text-xs text-amber-400">Monthly Raffle</div>
                  <div className="font-mono text-[10px] text-zinc-500">Drawing Dec 31</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-[var(--font-bebas)] text-xl text-amber-400">
                  <AnimatedCounter value={23} isVisible={isVisible} />
                </div>
                <div className="font-mono text-[9px] text-zinc-500">entries</div>
              </div>
            </div>
          </div>
          
          {/* Badges */}
          <div className="mt-4 flex items-center gap-2">
            <span className="font-mono text-[10px] text-zinc-500">Badges:</span>
            <div className="flex gap-1">
              {['🚀', '⚡', '🎯', '💎'].map((badge, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs",
                    i < 3 ? "bg-zinc-800" : "bg-zinc-800/50 opacity-40"
                  )}
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-accent/5 rounded-2xl blur-xl -z-10" />
    </div>
  )
}

export function AdoptionSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const dashboardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return

    const ctx = gsap.context(() => {
      // Header animation
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

      // Content animation
      if (contentRef.current) {
        const features = contentRef.current.querySelectorAll(".feature-card")
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

      // Dashboard animation
      if (dashboardRef.current) {
        gsap.fromTo(
          dashboardRef.current,
          { y: 60, opacity: 0, scale: 0.95 },
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
              onEnter: () => setIsVisible(true),
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="adoption" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent" />
      </div>
      
      <div className="relative">
        {/* Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-400">Engagement</span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
            DESIGNED FOR ADOPTION.
          </h2>
          <p className="mt-6 font-mono text-sm text-muted-foreground max-w-xl mx-auto">
            The best MRO system is worthless if your team won't use it. 
            <span className="text-amber-400"> We built engagement into the workflow.</span>
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Left: Features */}
          <div ref={contentRef}>
            <div className="space-y-4">
              {engagementFeatures.map((feature, index) => {
                const IconComponent = featureIcons[feature.icon]
                return (
                  <div
                    key={index}
                    className="feature-card flex items-start gap-4 p-4 rounded-lg bg-zinc-900/30 border border-zinc-800 hover:border-amber-500/30 transition-colors duration-300 group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500/20 transition-colors duration-300">
                      <IconComponent />
                    </div>
                    <div>
                      <h4 className="font-[var(--font-bebas)] text-lg tracking-tight text-foreground mb-1 group-hover:text-amber-400 transition-colors duration-300">
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
            
            {/* Bottom callout */}
            <div className="mt-8 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-400 text-sm">💡</span>
                </div>
                <div>
                  <div className="font-mono text-xs text-zinc-300 mb-1">Why it matters</div>
                  <p className="font-mono text-[11px] text-zinc-500 leading-relaxed">
                    Floor workers default to old habits. Incentive programs drive daily usage, which means better data, 
                    faster quotes, and real ROI — not shelfware.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Dashboard Mockup */}
          <div ref={dashboardRef}>
            <ImpactDashboardMockup isVisible={isVisible} />
          </div>
        </div>

        {/* Enterprise note */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 rounded-full px-5 py-2">
            <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <span className="font-mono text-xs text-zinc-400">
              Incentive programs are optional and fully customizable per account
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}





