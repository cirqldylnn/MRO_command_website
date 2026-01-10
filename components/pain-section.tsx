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
  },
  {
    icon: "scatter",
    title: "Requests everywhere",
    description: "Quote requests scattered across email threads, text messages, sticky notes, and someone's memory.",
  },
  {
    icon: "inbox",
    title: "Quotes lost in inboxes",
    description: "Vendor responses buried in procurement's inbox. Who replied? Who didn't? When's it due?",
  },
  {
    icon: "clock",
    title: "Endless back-and-forth",
    description: "Three rounds of clarification before the vendor even understands what you need.",
  },
  {
    icon: "blind",
    title: "No visibility until the invoice",
    description: "No idea what's been quoted, awarded, or spent until accounting asks questions.",
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

function InboxIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-17.5 0V6.75a2.25 2.25 0 012.25-2.25h13.5a2.25 2.25 0 012.25 2.25v6.75m-17.5 0v4.5a2.25 2.25 0 002.25 2.25h13.5a2.25 2.25 0 002.25-2.25v-4.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v.01" strokeOpacity="0.5" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 16.5l1.5 1.5M7.5 7.5L6 6" strokeOpacity="0.5" />
    </svg>
  )
}

function BlindIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  )
}

const painIcons: Record<string, () => React.ReactElement> = {
  phone: PhoneIcon,
  scatter: ScatterIcon,
  inbox: InboxIcon,
  clock: ClockIcon,
  blind: BlindIcon,
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
            STILL CHASING QUOTES<br />
            <span className="text-red-400">IN YOUR INBOX?</span>
          </h2>
          
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Your maintenance team shouldn't spend half their day playing phone tag with vendors 
            for a $40 gasket. But here you are.
          </p>
        </div>

        {/* Pain Point Cards */}
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
                
                <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                  {pain.description}
                </p>
              </div>
            )
          })}
          
          {/* "There's a better way" card */}
          <div className="relative border border-accent/30 bg-accent/5 p-6 flex flex-col justify-center">
            <div className="font-[var(--font-bebas)] text-2xl text-accent tracking-wide mb-2">
              There's a better way.
            </div>
            <p className="font-mono text-xs text-muted-foreground mb-4">
              What if every request — photo, text, email — became a structured RFQ automatically?
            </p>
            <a 
              href="#signals" 
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-accent hover:text-accent/80 transition-colors"
            >
              See how it works
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

