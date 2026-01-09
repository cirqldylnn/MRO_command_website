"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const intakeChannels = [
  {
    title: "Walk-Up Kiosk",
    description: "Tap. Talk. Snap a photo. Send.",
    timeToSubmit: "~15 sec",
    device: "kiosk",
    features: ["Touch or voice", "Camera built-in", "Glove-friendly UI"],
    demoText: null,
  },
  {
    title: "QR Scan on Equipment",
    description: "Scan → 'Report issue' or 'Find parts' tied to that asset.",
    timeToSubmit: "~10 sec",
    device: "qr",
    features: ["Equipment ID auto-filled", "History attached", "Photo optional"],
    demoText: null,
  },
  {
    title: "Text / MMS",
    description: "Send a photo + 'need this' → it becomes a structured RFQ.",
    timeToSubmit: "~30 sec",
    device: "sms",
    features: ["Works from any phone", "Photo + text", "No app needed"],
    demoText: {
      messages: [
        { from: "user", content: "[📷 Photo attached]", type: "image" },
        { from: "user", content: "need 12 of these ASAP", type: "text" },
        { from: "bot", content: "Got it! Identified: Becker VTLF 2.250 vane.", type: "text" },
        { from: "bot", content: "Creating RFQ for 12 units. Found 3 preferred vendors. Sending now.", type: "text" },
        { from: "user", content: "thanks", type: "text" },
        { from: "bot", content: "2 quotes in! Best: $847 from Acme (3-day lead). Reply 'award' to confirm.", type: "text" },
      ]
    }
  },
  {
    title: "Email Forwarding",
    description: "Forward vendor threads → we parse quotes and normalize responses.",
    timeToSubmit: "~45 sec",
    device: "email",
    features: ["Forward any email", "PDF parsing", "Auto-extract terms"],
    demoText: {
      subject: "FWD: Quote for Bearing Assembly",
      parsed: [
        { label: "Part", value: "SKF 6205-2RS" },
        { label: "Price", value: "$47.50 /ea" },
        { label: "Lead Time", value: "3 days" },
        { label: "Freight", value: "$12.00" },
        { label: "Terms", value: "Net 30" },
      ]
    }
  },
  {
    title: "Dashboard Request Builder",
    description: "The agent asks the missing questions before it sends.",
    timeToSubmit: "~60 sec",
    device: "dashboard",
    features: ["Guided form", "AI suggestions", "Vendor matching"],
    demoText: null,
  },
]

// Enhanced device mockup components
function KioskMockup() {
  return (
    <div className="relative w-full h-48 flex items-center justify-center py-4">
      {/* Kiosk frame */}
      <div className="relative w-32 h-40 bg-zinc-800 rounded-lg border-2 border-zinc-600 shadow-2xl">
        {/* Screen bezel */}
        <div className="absolute inset-2 bg-zinc-950 rounded-md overflow-hidden">
          {/* Status bar */}
          <div className="h-3 bg-zinc-900 flex items-center justify-between px-2 border-b border-zinc-800">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[6px] text-green-400 font-mono">ONLINE</span>
            </div>
            <span className="text-[6px] text-zinc-500 font-mono">MRO.ai</span>
          </div>
          
          {/* Screen content */}
          <div className="p-2 h-full flex flex-col">
            {/* Title */}
            <div className="text-center mb-2">
              <div className="text-[7px] text-zinc-400 font-mono mb-1">WHAT DO YOU NEED?</div>
            </div>
            
            {/* Action buttons */}
            <div className="space-y-1.5 flex-1">
              <div className="bg-accent hover:bg-accent/90 text-black font-bold py-1.5 px-2 rounded text-[7px] text-center cursor-pointer transition-colors">
                📷 SNAP A PHOTO
              </div>
              <div className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold py-1.5 px-2 rounded text-[7px] text-center border border-zinc-700 cursor-pointer transition-colors">
                🎤 VOICE REQUEST
              </div>
              <div className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold py-1.5 px-2 rounded text-[7px] text-center border border-zinc-700 cursor-pointer transition-colors">
                📱 SCAN QR CODE
              </div>
            </div>
            
            {/* Bottom CTA */}
            <div className="mt-auto pt-2 border-t border-zinc-800">
              <div className="bg-cyan-600/80 text-white font-bold py-1 px-2 rounded text-[6px] text-center">
                🎧 TALK TO A PERSON
              </div>
            </div>
          </div>
        </div>
        
        {/* Wall mount bracket hint */}
        <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-zinc-700 rounded-l" />
        <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-zinc-700 rounded-r" />
      </div>
    </div>
  )
}

function QRMockup() {
  return (
    <div className="relative w-full h-48 flex items-center justify-center py-4">
      {/* Phone with QR */}
      <div className="relative w-24 h-40 bg-zinc-800 rounded-2xl border border-zinc-600 shadow-xl">
        {/* Notch */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-2 bg-zinc-900 rounded-full" />
        
        {/* Screen */}
        <div className="absolute inset-1.5 top-4 bg-zinc-950 rounded-xl overflow-hidden">
          <div className="p-2 h-full flex flex-col">
            {/* Header */}
            <div className="text-center mb-2">
              <div className="text-[7px] text-accent font-mono font-bold">EQUIPMENT FOUND</div>
            </div>
            
            {/* QR viewfinder result */}
            <div className="flex-1 flex flex-col items-center justify-center">
              {/* Equipment info */}
              <div className="w-full bg-zinc-900 rounded-lg p-2 border border-zinc-800 mb-2">
                <div className="text-[6px] text-zinc-500 font-mono">ASSET ID</div>
                <div className="text-[8px] text-white font-mono font-bold">PUMP-A-2847</div>
                <div className="text-[5px] text-zinc-600 font-mono mt-0.5">Bldg 4 / Line 2 / Station 7</div>
              </div>
              
              {/* Action buttons */}
              <div className="w-full space-y-1">
                <div className="bg-accent text-black font-bold py-1 px-2 rounded text-[6px] text-center">
                  🔧 FIND PARTS
                </div>
                <div className="bg-red-600/80 text-white font-bold py-1 px-2 rounded text-[6px] text-center">
                  ⚠️ REPORT ISSUE
                </div>
              </div>
            </div>
            
            {/* History hint */}
            <div className="text-[5px] text-zinc-600 text-center mt-1 font-mono">
              Last service: 14 days ago
            </div>
          </div>
        </div>
      </div>
      
      {/* Equipment tag floating */}
      <div className="absolute right-6 top-6 w-12 h-12 bg-zinc-700 rounded-lg border border-zinc-600 flex flex-col items-center justify-center shadow-lg transform rotate-3">
        <div className="grid grid-cols-3 gap-0.5 w-6 h-6 mb-1">
          {[...Array(9)].map((_, i) => (
            <div key={i} className={cn("bg-zinc-500", i % 2 === 0 ? "opacity-100" : "opacity-50")} />
          ))}
        </div>
        <div className="text-[5px] text-zinc-400 font-mono">SCAN ME</div>
      </div>
    </div>
  )
}

function SMSMockup({ messages }: { messages?: { from: string; content: string; type: string }[] }) {
  const [visibleMessages, setVisibleMessages] = useState(0)
  
  useEffect(() => {
    if (!messages) return
    const interval = setInterval(() => {
      setVisibleMessages(prev => prev < messages.length ? prev + 1 : 0)
    }, 1500)
    return () => clearInterval(interval)
  }, [messages])

  return (
    <div className="relative w-full h-48 flex items-center justify-center py-4">
      {/* Phone */}
      <div className="relative w-28 h-44 bg-zinc-800 rounded-2xl border border-zinc-600 shadow-xl">
        {/* Notch */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-2 bg-zinc-900 rounded-full" />
        
        {/* Screen */}
        <div className="absolute inset-1.5 top-4 bg-zinc-950 rounded-xl overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="bg-zinc-900 px-2 py-1 border-b border-zinc-800 flex items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-[8px]">🤖</span>
              </div>
              <div>
                <div className="text-[7px] text-white font-bold">MRO.ai</div>
                <div className="text-[5px] text-green-400">Online</div>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 p-1.5 space-y-1 overflow-hidden">
              {messages?.slice(0, visibleMessages).map((msg, i) => (
                <div key={i} className={cn("flex", msg.from === "user" ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[85%] rounded-lg px-1.5 py-1",
                    msg.from === "user" 
                      ? "bg-accent text-black" 
                      : "bg-zinc-800 text-zinc-200"
                  )}>
                    {msg.type === "image" && (
                      <div className="w-10 h-8 bg-zinc-700 rounded mb-0.5 flex items-center justify-center text-[8px]">
                        📷
                      </div>
                    )}
                    <div className="text-[6px] leading-tight">{msg.content}</div>
                  </div>
                </div>
              ))}
              {visibleMessages < (messages?.length || 0) && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 rounded-lg px-2 py-1">
                    <div className="flex gap-0.5">
                      <div className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Input */}
            <div className="p-1 border-t border-zinc-800 flex gap-1">
              <div className="flex-1 h-4 bg-zinc-900 rounded-full px-2 flex items-center">
                <span className="text-[6px] text-zinc-600">Type message...</span>
              </div>
              <div className="w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                <svg className="w-2 h-2 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function EmailMockup({ parsed }: { parsed?: { label: string; value: string }[] }) {
  return (
    <div className="relative w-full h-48 flex items-center justify-center py-4">
      {/* Email client window */}
      <div className="relative w-48 h-40 bg-zinc-900 rounded-lg border border-zinc-700 shadow-xl overflow-hidden">
        {/* Title bar */}
        <div className="h-5 bg-zinc-800 flex items-center px-2 gap-1.5 border-b border-zinc-700">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500/60" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <div className="w-2 h-2 rounded-full bg-green-500/60" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-[7px] text-zinc-400 font-mono">QUOTE PARSED</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-2 h-full">
          {/* Forward indicator */}
          <div className="flex items-center gap-1 mb-2 pb-1 border-b border-zinc-800">
            <div className="text-[7px] text-cyan-400 font-mono">FWD:</div>
            <div className="text-[7px] text-zinc-300">Vendor Quote - SKF Bearings</div>
          </div>
          
          {/* Original email hint */}
          <div className="bg-zinc-800/50 rounded p-1.5 mb-2 border-l-2 border-zinc-600">
            <div className="text-[6px] text-zinc-500 leading-tight">
              From: sales@acme-supply.com<br />
              "Please find attached our quote for..."
            </div>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-5 h-4 bg-red-900/40 rounded flex items-center justify-center">
                <span className="text-[5px] text-red-400 font-bold">PDF</span>
              </div>
              <span className="text-[5px] text-zinc-500">quote_SKF.pdf</span>
            </div>
          </div>
          
          {/* Parsed data */}
          <div className="bg-zinc-950 rounded p-1.5 border border-accent/30">
            <div className="flex items-center gap-1 mb-1.5">
              <div className="w-2 h-2 bg-accent rounded-full flex items-center justify-center">
                <span className="text-[6px]">✓</span>
              </div>
              <span className="text-[6px] text-accent font-mono font-bold">EXTRACTED DATA</span>
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
              {parsed?.map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-[5px] text-zinc-500">{item.label}:</span>
                  <span className="text-[5px] text-white font-mono">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Action button */}
          <div className="mt-2">
            <div className="bg-accent text-black font-bold py-1 rounded text-[7px] text-center">
              ADD TO COMPARISON →
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardMockup() {
  return (
    <div className="relative w-full h-48 flex items-center justify-center py-4">
      {/* Dashboard window */}
      <div className="relative w-52 h-40 bg-zinc-900 rounded-lg border border-zinc-700 shadow-xl overflow-hidden">
        {/* Title bar */}
        <div className="h-5 bg-zinc-800 flex items-center px-2 gap-1.5 border-b border-zinc-700">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500/60" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <div className="w-2 h-2 rounded-full bg-green-500/60" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-[7px] text-zinc-400 font-mono">REQUEST BUILDER</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-8 bg-zinc-950 border-r border-zinc-800 p-1 space-y-1">
            <div className="w-full h-4 bg-accent/20 rounded flex items-center justify-center">
              <span className="text-[8px]">+</span>
            </div>
            <div className="w-full h-4 bg-zinc-800 rounded" />
            <div className="w-full h-4 bg-zinc-800 rounded" />
          </div>
          
          {/* Main form */}
          <div className="flex-1 p-2">
            {/* Form fields */}
            <div className="space-y-1.5 mb-2">
              <div className="flex items-center gap-2">
                <div className="text-[6px] text-zinc-500 w-12">Description</div>
                <div className="flex-1 h-4 bg-zinc-950 rounded border border-zinc-700 px-1 flex items-center">
                  <span className="text-[6px] text-zinc-300">Pump seal replacement</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[6px] text-zinc-500 w-12">Part #</div>
                <div className="flex-1 h-4 bg-zinc-950 rounded border border-zinc-700 px-1 flex items-center">
                  <span className="text-[6px] text-zinc-300">Unknown</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[6px] text-zinc-500 w-12">Qty</div>
                <div className="flex-1 h-4 bg-zinc-950 rounded border border-zinc-700 px-1 flex items-center">
                  <span className="text-[6px] text-zinc-300">2</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[6px] text-cyan-400 w-12">Urgency?</div>
                <div className="flex-1 h-4 bg-cyan-950/50 rounded border border-cyan-600/50 px-1 flex items-center animate-pulse">
                  <span className="text-[6px] text-cyan-400">Click to specify...</span>
                </div>
              </div>
            </div>
            
            {/* AI suggestion */}
            <div className="bg-cyan-950/30 rounded p-1.5 border border-cyan-800/30 mb-2">
              <div className="flex items-start gap-1">
                <span className="text-[8px]">🤖</span>
                <div className="text-[6px] text-cyan-400 leading-tight">
                  "I found 3 possible part matches. Need urgency level to select vendors."
                </div>
              </div>
            </div>
            
            {/* Submit button */}
            <div className="flex gap-1">
              <div className="flex-1 bg-accent text-black font-bold py-1.5 rounded text-[7px] text-center">
                SEND RFQ →
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type Channel = typeof intakeChannels[0]

function getDeviceMockup(channel: Channel) {
  switch (channel.device) {
    case 'kiosk': return <KioskMockup />
    case 'qr': return <QRMockup />
    case 'sms': return <SMSMockup messages={channel.demoText?.messages} />
    case 'email': return <EmailMockup parsed={channel.demoText?.parsed} />
    case 'dashboard': return <DashboardMockup />
    default: return null
  }
}

export function SignalsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!sectionRef.current || !cursorRef.current) return

    const section = sectionRef.current
    const cursor = cursorRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(cursor, {
        x: x,
        y: y,
        duration: 0.5,
        ease: "power3.out",
      })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    section.addEventListener("mousemove", handleMouseMove)
    section.addEventListener("mouseenter", handleMouseEnter)
    section.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      section.removeEventListener("mousemove", handleMouseMove)
      section.removeEventListener("mouseenter", handleMouseEnter)
      section.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !cardsRef.current) return

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
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = cardsRef.current?.querySelectorAll("article")
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
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
    <section id="signals" ref={sectionRef} className="relative py-32 pl-6 md:pl-28">
      <div
        ref={cursorRef}
        className={cn(
          "pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50",
          "w-12 h-12 rounded-full border-2 border-accent bg-accent/20",
          "transition-opacity duration-300",
          isHovering ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Section header */}
      <div ref={headerRef} className="mb-16 pr-6 md:pr-12 max-w-4xl">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">01 / Ways to Request</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
          MEET THEM WHERE THEY ARE.
        </h2>
        <p className="mt-6 font-mono text-sm text-muted-foreground leading-relaxed max-w-2xl">
          A request can start from the floor, the inbox, or the dashboard — the system stays the same. 
          <span className="text-accent"> No app downloads. No training. No friction.</span>
        </p>
        
        {/* Quick stats */}
        <div className="mt-8 flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
              <span className="text-accent text-sm">5</span>
            </div>
            <span className="font-mono text-xs text-muted-foreground">Input channels</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
              <span className="text-accent text-sm">1</span>
            </div>
            <span className="font-mono text-xs text-muted-foreground">Unified system</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
              <span className="text-accent text-sm">0</span>
            </div>
            <span className="font-mono text-xs text-muted-foreground">Training required</span>
          </div>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={cardsRef}
        className="flex gap-6 overflow-x-auto pb-8 pr-12 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {intakeChannels.map((channel, index) => (
          <ChannelCard key={index} channel={channel} index={index} />
        ))}
      </div>
      
      {/* Bottom callout */}
      <div className="mt-12 pr-6 md:pr-12">
        <div className="inline-flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3">
          <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
            <span className="text-lg">💡</span>
          </div>
          <div>
            <div className="font-mono text-xs text-white">Every channel feeds the same AI.</div>
            <div className="font-mono text-[10px] text-muted-foreground">Same structured RFQ. Same vendor matching. Same quote comparison.</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ChannelCard({
  channel,
  index,
}: {
  channel: Channel
  index: number
}) {
  return (
    <article
      className={cn(
        "group relative flex-shrink-0 w-80",
        "transition-transform duration-500 ease-out",
        "hover:-translate-y-2",
      )}
    >
      {/* Card */}
      <div className="relative bg-card border border-border/50 overflow-hidden rounded-lg">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-accent/50 to-transparent" />

        {/* Device mockup area */}
        <div className="relative bg-zinc-900/80 border-b border-border/30">
          {getDeviceMockup(channel)}
          {/* Grid overlay */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '16px 16px'
            }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header with time badge */}
          <div className="flex items-start justify-between mb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              0{index + 1}
            </span>
            <span className="font-mono text-[10px] px-2 py-1 bg-accent/10 text-accent border border-accent/30 rounded-full">
              ⏱ {channel.timeToSubmit}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-[var(--font-bebas)] text-2xl tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">
            {channel.title}
          </h3>

          {/* Divider line */}
          <div className="w-8 h-px bg-accent/60 mb-4 group-hover:w-full transition-all duration-500" />

          {/* Description */}
          <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-4">
            {channel.description}
          </p>
          
          {/* Feature bullets */}
          <div className="space-y-1.5">
            {channel.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-accent" />
                <span className="font-mono text-[10px] text-zinc-400">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-16 h-16 bg-accent/5 rotate-45 translate-x-8 translate-y-8 group-hover:bg-accent/10 transition-colors duration-300" />
        </div>
      </div>

      {/* Shadow/depth layer */}
      <div className="absolute inset-0 -z-10 translate-x-1 translate-y-1 bg-accent/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </article>
  )
}
