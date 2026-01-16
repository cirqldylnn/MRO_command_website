"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Different conversation examples showing the breadth of what you can do
const conversations = [
  {
    category: "Source Parts",
    icon: "🔧",
    color: "accent",
    messages: [
      { from: "user", content: "need a new seal kit for pump 7", type: "text" },
      { from: "bot", content: "Found it — Pump 7 uses Parker 2-112 seal kit.", type: "text" },
      { from: "bot", content: "3 vendors have it in stock. Want me to get quotes?", type: "text" },
      { from: "user", content: "yes", type: "text" },
      { from: "bot", content: "Done. RFQ sent to Grainger, Motion, and Allied. I'll text you when quotes come in.", type: "text" },
    ]
  },
  {
    category: "Update Inventory",
    icon: "📦",
    color: "violet",
    messages: [
      { from: "user", content: "add 24 SKF-6205 bearings to inventory, bin B-12", type: "text" },
      { from: "bot", content: "Got it. Adding 24× SKF-6205-2RS to Bin B-12.", type: "text" },
      { from: "bot", content: "Done ✓ New count: 24 units. Want to set a reorder point?", type: "text" },
      { from: "user", content: "yeah, alert me at 6", type: "text" },
      { from: "bot", content: "Reorder alert set for ≤6 units. I'll text you when it's time to restock.", type: "text" },
    ]
  },
  {
    category: "Log Machine Notes",
    icon: "📝",
    color: "cyan",
    messages: [
      { from: "user", content: "note on CNC-4: hearing grinding noise from spindle at high RPM", type: "text" },
      { from: "bot", content: "Logged to CNC-4 maintenance history.", type: "text" },
      { from: "bot", content: "This is the 3rd spindle note in 60 days. Want me to flag for inspection?", type: "text" },
      { from: "user", content: "yes and notify mike", type: "text" },
      { from: "bot", content: "Done. Flagged as priority and texted Mike. He'll see the full history.", type: "text" },
    ]
  },
  {
    category: "Check Status",
    icon: "📊",
    color: "emerald",
    messages: [
      { from: "user", content: "where's my hydraulic hose order?", type: "text" },
      { from: "bot", content: "Found it — PO #4821 from Parker.", type: "text" },
      { from: "bot", content: "Shipped yesterday via UPS. Tracking shows delivery tomorrow by 2pm.", type: "text" },
      { from: "user", content: "perfect thanks", type: "text" },
      { from: "bot", content: "👍 I'll text you when it's marked delivered.", type: "text" },
    ]
  },
  {
    category: "Find Information",
    icon: "🔍",
    color: "amber",
    messages: [
      { from: "user", content: "who has the best price on 1/2\" hydraulic fittings?", type: "text" },
      { from: "bot", content: "Checking your last 6 months of orders...", type: "text" },
      { from: "bot", content: "Allied Industrial — avg $4.20/ea vs $5.80 at Grainger. Allied also ships faster to you (2 days vs 4).", type: "text" },
      { from: "user", content: "order 50 from allied", type: "text" },
      { from: "bot", content: "PO created and sent to Allied. Confirm total: 50× 1/2\" fittings @ $4.20 = $210. Reply YES to submit.", type: "text" },
    ]
  },
  {
    category: "Approve Orders",
    icon: "✅",
    color: "accent",
    messages: [
      { from: "bot", content: "Approval needed: $1,247 order from Motion Industries for Line 3 rebuild.", type: "text" },
      { from: "bot", content: "Requested by: Jake M. Items: 4 bearings, 2 seals, 1 coupling.", type: "text" },
      { from: "user", content: "approved", type: "text" },
      { from: "bot", content: "Done ✓ PO sent to Motion. Jake has been notified. ETA: Thursday.", type: "text" },
    ]
  },
]

const colorClasses: Record<string, { bg: string; border: string; text: string; pill: string }> = {
  accent: { bg: "bg-accent/10", border: "border-accent/30", text: "text-accent", pill: "bg-accent" },
  cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400", pill: "bg-cyan-500" },
  violet: { bg: "bg-violet-500/10", border: "border-violet-500/30", text: "text-violet-400", pill: "bg-violet-500" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", pill: "bg-emerald-500" },
  amber: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", pill: "bg-amber-500" },
}

function PhoneMockup({ conversation, isAnimating }: { conversation: typeof conversations[0]; isAnimating: boolean }) {
  const [visibleMessages, setVisibleMessages] = useState(0)
  const colors = colorClasses[conversation.color]
  
  useEffect(() => {
    if (!isAnimating) {
      setVisibleMessages(conversation.messages.length)
      return
    }
    
    setVisibleMessages(0)
    const timers: NodeJS.Timeout[] = []
    
    conversation.messages.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleMessages(index + 1)
      }, (index + 1) * 800)
      timers.push(timer)
    })
    
    return () => timers.forEach(t => clearTimeout(t))
  }, [conversation, isAnimating])

  return (
    <div className="relative w-72 md:w-80 h-[500px] md:h-[540px] bg-zinc-900 rounded-[2.5rem] border-4 border-zinc-700 shadow-2xl overflow-hidden">
      {/* Phone notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-10" />
      
      {/* Screen */}
      <div className="absolute inset-2 top-10 bottom-2 bg-zinc-950 rounded-[1.75rem] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-zinc-900 px-4 py-3 border-b border-zinc-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
            <span className="text-lg">🤖</span>
          </div>
          <div className="flex-1">
            <div className="text-sm text-white font-semibold">MRO Command</div>
            <div className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Always available
            </div>
          </div>
          <div className={cn("px-2 py-1 rounded-full text-[10px] font-mono", colors.bg, colors.text)}>
            {conversation.icon} {conversation.category}
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          {conversation.messages.slice(0, visibleMessages).map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex animate-in fade-in slide-in-from-bottom-2 duration-300",
                msg.from === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5",
                  msg.from === "user"
                    ? "bg-accent text-black rounded-br-md"
                    : "bg-zinc-800 text-zinc-100 rounded-bl-md"
                )}
              >
                <div className="text-sm leading-relaxed">{msg.content}</div>
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {visibleMessages < conversation.messages.length && visibleMessages > 0 && (
            <div className="flex justify-start">
              <div className="bg-zinc-800 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Input area */}
        <div className="p-3 border-t border-zinc-800 flex gap-2">
          <div className="flex-1 h-10 bg-zinc-900 rounded-full px-4 flex items-center border border-zinc-700">
            <span className="text-sm text-zinc-500">Text anything...</span>
          </div>
          <button className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export function AgenticSmsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)

  // Auto-cycle through conversations
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setActiveIndex(prev => (prev + 1) % conversations.length)
    }, 8000)
    
    return () => clearInterval(interval)
  }, [])

  // GSAP animations
  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
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
        }
      )

      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleCategoryClick = (index: number) => {
    setIsAnimating(true)
    setActiveIndex(index)
  }

  return (
    <section ref={sectionRef} id="agentic-sms" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />
      
      {/* Section header */}
      <div ref={headerRef} className="mb-16 max-w-3xl">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Text It Anything</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
          YOUR MRO ASSISTANT.<br />
          <span className="text-accent">IN YOUR POCKET.</span>
        </h2>
        <p className="mt-6 font-mono text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Not just for ordering parts. Text to update inventory, log machine notes, check order status, 
          approve purchases, or ask questions. <span className="text-accent">The AI handles it all.</span>
        </p>
      </div>

      {/* Main content */}
      <div ref={contentRef} className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Phone mockup */}
        <div className="relative flex-shrink-0">
          <PhoneMockup 
            conversation={conversations[activeIndex]} 
            isAnimating={isAnimating}
          />
          
          {/* Floating badge */}
          <div className="absolute -top-4 -right-4 bg-accent text-black font-mono text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            No app needed
          </div>
          
          {/* Connection lines decoration */}
          <div className="absolute -left-8 top-1/2 -translate-y-1/2 hidden lg:block">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-accent/50" />
          </div>
        </div>

        {/* Category selector and info */}
        <div className="flex-1 space-y-8">
          {/* Category pills */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-4">
              What can you do?
            </div>
            <div className="flex flex-wrap gap-2">
              {conversations.map((conv, index) => {
                const colors = colorClasses[conv.color]
                const isActive = index === activeIndex
                return (
                  <button
                    key={index}
                    onClick={() => handleCategoryClick(index)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs transition-all duration-300",
                      isActive 
                        ? cn(colors.pill, "text-black font-bold scale-105") 
                        : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800"
                    )}
                  >
                    <span>{conv.icon}</span>
                    <span>{conv.category}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 hover:border-accent/30 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <span className="text-xl">🧠</span>
                </div>
                <div className="font-mono text-sm text-white font-medium">Context-Aware</div>
              </div>
              <p className="font-mono text-xs text-zinc-400 leading-relaxed">
                Knows your equipment, vendors, inventory, and history. No need to explain — just say what you need.
              </p>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 hover:border-accent/30 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <span className="text-xl">⚡</span>
                </div>
                <div className="font-mono text-sm text-white font-medium">Instant Actions</div>
              </div>
              <p className="font-mono text-xs text-zinc-400 leading-relaxed">
                Creates POs, updates records, sends RFQs, and notifies teammates — all from a simple text.
              </p>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 hover:border-accent/30 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <span className="text-xl">📷</span>
                </div>
                <div className="font-mono text-sm text-white font-medium">Photo Recognition</div>
              </div>
              <p className="font-mono text-xs text-zinc-400 leading-relaxed">
                Snap a photo of a part, nameplate, or damaged component. AI identifies it and finds sources.
              </p>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 hover:border-accent/30 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <span className="text-xl">🔔</span>
                </div>
                <div className="font-mono text-sm text-white font-medium">Proactive Updates</div>
              </div>
              <p className="font-mono text-xs text-zinc-400 leading-relaxed">
                Get texted when quotes come in, orders ship, approvals are needed, or inventory runs low.
              </p>
            </div>
          </div>

          {/* Bottom callout */}
          <div className="bg-gradient-to-r from-accent/10 via-accent/5 to-transparent border border-accent/20 rounded-xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💬</span>
              </div>
              <div>
                <div className="font-mono text-sm text-white font-medium mb-1">
                  Works with any phone. No app required.
                </div>
                <p className="font-mono text-xs text-zinc-400 leading-relaxed">
                  Just text our number. Works on flip phones, smartphones, whatever your team uses. 
                  If it can send an SMS, it works with MRO Command.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
