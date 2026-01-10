"use client"

import React, { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Chat conversation that plays out
const agentConversation = [
  {
    from: "system",
    content: "Connected to: Ingersoll Rand SSR-EP50SE",
    type: "connection",
  },
  {
    from: "user",
    content: "Compressor is making a grinding noise on startup",
    type: "text",
    delay: 1000,
  },
  {
    from: "agent",
    content: null,
    type: "typing",
    delay: 800,
  },
  {
    from: "agent",
    content: "I see this unit was last serviced 14 months ago. Based on the symptom and service history, this is most likely the intake valve assembly.",
    type: "text",
    delay: 2000,
  },
  {
    from: "agent",
    content: null,
    type: "part-card",
    partData: {
      name: "Intake Valve Assembly",
      partNumber: "39479225",
      lastReplaced: "26 months ago",
      avgLifespan: "18-24 months",
      confidence: "87%",
    },
    delay: 1500,
  },
  {
    from: "agent",
    content: "Want me to get quotes for a replacement? I found 4 vendors with this part in stock.",
    type: "text",
    delay: 1200,
  },
  {
    from: "user",
    content: "Yes, need it ASAP",
    type: "text",
    delay: 1500,
  },
  {
    from: "agent",
    content: null,
    type: "typing",
    delay: 600,
  },
  {
    from: "agent",
    content: null,
    type: "action-card",
    actionData: {
      status: "RFQ Created",
      vendors: 4,
      urgency: "Critical",
      eta: "Quotes expected within 2 hours",
    },
    delay: 1800,
  },
  {
    from: "agent", 
    content: "Done. I've flagged this as critical and included your symptom notes. I'll text you when quotes come in.",
    type: "text",
    delay: 1000,
  },
]

const capabilities = [
  {
    icon: "brain",
    title: "Full Equipment Context",
    description: "Manuals, parts diagrams, service history, and specs — all instantly available",
  },
  {
    icon: "chat",
    title: "Conversational Diagnosis",
    description: "Describe the symptom in plain language. Agent guides you to the root cause.",
  },
  {
    icon: "bolt",
    title: "Instant Sourcing",
    description: "Agent creates the RFQ while you're still standing at the machine",
  },
  {
    icon: "shield",
    title: "Human-in-the-Loop",
    description: "You approve decisions. Agent handles the execution.",
  },
]

// Icons
function BrainIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
    </svg>
  )
}

function BoltIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
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

const capabilityIcons: Record<string, () => React.ReactElement> = {
  brain: BrainIcon,
  chat: ChatIcon,
  bolt: BoltIcon,
  shield: ShieldIcon,
}

// Phone mockup with chat interface
function AgentChatMockup() {
  const [visibleMessages, setVisibleMessages] = useState<number>(0)
  const [isTyping, setIsTyping] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const showNextMessage = (index: number) => {
      if (index >= agentConversation.length) {
        // Reset after a pause
        timeoutId = setTimeout(() => {
          setVisibleMessages(0)
          setIsTyping(false)
          showNextMessage(0)
        }, 4000)
        return
      }

      const message = agentConversation[index]
      
      if (message.type === "typing") {
        setIsTyping(true)
        timeoutId = setTimeout(() => {
          setIsTyping(false)
          showNextMessage(index + 1)
        }, message.delay)
      } else {
        setVisibleMessages(index + 1)
        timeoutId = setTimeout(() => {
          showNextMessage(index + 1)
        }, message.delay)
      }
    }

    // Start the conversation
    timeoutId = setTimeout(() => showNextMessage(0), 1500)

    return () => clearTimeout(timeoutId)
  }, [])

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [visibleMessages, isTyping])

  return (
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-accent/20 to-cyan-500/20 blur-3xl opacity-50" />
      
      {/* Phone frame */}
      <div className="relative w-[320px] md:w-[360px] mx-auto">
        {/* Phone body */}
        <div className="relative bg-zinc-900 rounded-[3rem] p-3 shadow-2xl border border-zinc-700">
          {/* Screen */}
          <div className="bg-black rounded-[2.25rem] overflow-hidden">
            {/* Status bar */}
            <div className="h-12 bg-zinc-950 flex items-center justify-between px-8 pt-2">
              <span className="text-[11px] text-white font-medium">9:41</span>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3c-1.1 0-2 .9-2 2v1H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-2V5c0-1.1-.9-2-2-2z"/>
                </svg>
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                </svg>
              </div>
            </div>

            {/* App header */}
            <div className="bg-zinc-950 px-4 pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-accent flex items-center justify-center">
                  <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">MRO Command Agent</div>
                  <div className="text-cyan-400 text-[10px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    Equipment-aware • Ready
                  </div>
                </div>
              </div>
            </div>

            {/* Chat messages */}
            <div 
              ref={chatContainerRef}
              className="h-[420px] overflow-y-auto bg-zinc-950 px-3 py-4 space-y-3 scroll-smooth"
            >
              {agentConversation.slice(0, visibleMessages).map((msg, index) => {
                if (msg.type === "typing") return null
                
                if (msg.type === "connection") {
                  return (
                    <div key={index} className="flex justify-center">
                      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-[10px] text-cyan-400 font-mono">{msg.content}</span>
                      </div>
                    </div>
                  )
                }

                if (msg.type === "part-card" && msg.partData) {
                  return (
                    <div key={index} className="flex justify-start">
                      <div className="max-w-[85%] bg-zinc-900 border border-zinc-700 rounded-2xl rounded-bl-md p-3 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-amber-500/20 flex items-center justify-center">
                            <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                            </svg>
                          </div>
                          <span className="text-[10px] text-amber-400 font-mono uppercase tracking-wider">Likely Part</span>
                          <span className="text-[10px] text-zinc-500 ml-auto">{msg.partData.confidence} match</span>
                        </div>
                        <div className="text-white text-sm font-medium">{msg.partData.name}</div>
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <div>
                            <div className="text-zinc-500">Part #</div>
                            <div className="text-zinc-300 font-mono">{msg.partData.partNumber}</div>
                          </div>
                          <div>
                            <div className="text-zinc-500">Last Replaced</div>
                            <div className="text-zinc-300">{msg.partData.lastReplaced}</div>
                          </div>
                          <div className="col-span-2">
                            <div className="text-zinc-500">Avg Lifespan</div>
                            <div className="text-zinc-300">{msg.partData.avgLifespan}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }

                if (msg.type === "action-card" && msg.actionData) {
                  return (
                    <div key={index} className="flex justify-start">
                      <div className="max-w-[85%] bg-gradient-to-br from-accent/20 to-emerald-500/20 border border-accent/40 rounded-2xl rounded-bl-md p-3 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-accent/30 flex items-center justify-center">
                            <svg className="w-3.5 h-3.5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span className="text-accent font-semibold text-sm">{msg.actionData.status}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <div>
                            <div className="text-zinc-400">Vendors</div>
                            <div className="text-white font-medium">{msg.actionData.vendors} contacted</div>
                          </div>
                          <div>
                            <div className="text-zinc-400">Urgency</div>
                            <div className="text-red-400 font-medium">{msg.actionData.urgency}</div>
                          </div>
                        </div>
                        <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {msg.actionData.eta}
                        </div>
                      </div>
                    </div>
                  )
                }

                // Regular text messages
                const isUser = msg.from === "user"
                return (
                  <div key={index} className={cn("flex", isUser ? "justify-end" : "justify-start")}>
                    <div className={cn(
                      "max-w-[85%] px-4 py-2.5 text-sm",
                      isUser 
                        ? "bg-accent text-black rounded-2xl rounded-br-md" 
                        : "bg-zinc-800 text-zinc-100 rounded-2xl rounded-bl-md"
                    )}>
                      {msg.content}
                    </div>
                  </div>
                )
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input bar */}
            <div className="bg-zinc-950 border-t border-zinc-800 px-3 py-3">
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                  </svg>
                </button>
                <div className="flex-1 bg-zinc-800 rounded-full px-4 py-2 text-sm text-zinc-400">
                  Describe the issue...
                </div>
                <button className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-black hover:bg-cyan-400 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Home indicator */}
            <div className="h-6 bg-black flex items-center justify-center">
              <div className="w-32 h-1 bg-white/20 rounded-full" />
            </div>
          </div>
        </div>

        {/* QR code floating element */}
        <div className="absolute -left-16 top-20 hidden lg:block">
          <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-3 shadow-xl">
            <div className="w-20 h-20 bg-white rounded p-2">
              {/* Simplified QR code pattern */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect x="0" y="0" width="30" height="30" fill="black"/>
                <rect x="5" y="5" width="20" height="20" fill="white"/>
                <rect x="10" y="10" width="10" height="10" fill="black"/>
                <rect x="70" y="0" width="30" height="30" fill="black"/>
                <rect x="75" y="5" width="20" height="20" fill="white"/>
                <rect x="80" y="10" width="10" height="10" fill="black"/>
                <rect x="0" y="70" width="30" height="30" fill="black"/>
                <rect x="5" y="75" width="20" height="20" fill="white"/>
                <rect x="10" y="80" width="10" height="10" fill="black"/>
                <rect x="40" y="0" width="10" height="10" fill="black"/>
                <rect x="40" y="20" width="10" height="10" fill="black"/>
                <rect x="40" y="40" width="10" height="10" fill="black"/>
                <rect x="50" y="40" width="10" height="10" fill="black"/>
                <rect x="60" y="40" width="10" height="10" fill="black"/>
                <rect x="40" y="60" width="10" height="10" fill="black"/>
                <rect x="60" y="60" width="10" height="10" fill="black"/>
                <rect x="80" y="60" width="10" height="10" fill="black"/>
                <rect x="70" y="80" width="10" height="10" fill="black"/>
                <rect x="90" y="80" width="10" height="10" fill="black"/>
              </svg>
            </div>
            <div className="text-[8px] text-zinc-500 font-mono mt-2 text-center">SCAN TO CONNECT</div>
          </div>
          <svg className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 text-cyan-500/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export function FloorAgentSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
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

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
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
      id="agent"
      className="relative min-h-screen py-24 md:py-32 pl-6 md:pl-28 pr-6 md:pr-12 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent pointer-events-none" />
      
      {/* Section Label */}
      <div className="absolute left-4 md:left-6 top-24 md:top-32">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground -rotate-90 origin-left block">
          Floor Agent
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div ref={headerRef} className="mb-16 max-w-3xl">
          <div className="inline-block border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400">
              AI-Powered Assistance
            </span>
          </div>
          
          <h2 className="font-[var(--font-bebas)] text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] text-foreground mb-6 tracking-wide">
            AN EXPERT AT<br />
            <span className="text-cyan-400">EVERY MACHINE.</span>
          </h2>
          
          <p className="max-w-2xl font-mono text-sm text-muted-foreground leading-relaxed">
            Scan the QR code. Talk to an agent that knows this equipment — its specs, its parts, 
            its history. Troubleshoot the problem right there on the floor. Start sourcing before you walk away.
          </p>
        </div>

        {/* Main content grid */}
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Capabilities */}
          <div className="space-y-6 order-2 lg:order-1">
            {/* Capability cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {capabilities.map((cap) => {
                const IconComponent = capabilityIcons[cap.icon]
                return (
                  <div
                    key={cap.icon}
                    className="border border-white/10 bg-white/[0.02] p-5 rounded-sm hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-sm bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
                      <IconComponent />
                    </div>
                    <div className="font-mono text-sm text-foreground font-medium mb-2">
                      {cap.title}
                    </div>
                    <div className="font-mono text-[11px] text-muted-foreground leading-relaxed">
                      {cap.description}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Callout */}
            <div className="border border-cyan-500/20 bg-cyan-500/5 p-5 rounded-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                  </svg>
                </div>
                <div>
                  <div className="font-mono text-xs text-cyan-400 font-medium mb-1">
                    Works with any phone
                  </div>
                  <div className="font-mono text-[11px] text-muted-foreground leading-relaxed">
                    No app required. Scan the QR → opens in browser → start talking. 
                    Works for anyone, even contractors on their first day.
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="#cta"
                className="group inline-flex items-center gap-2 bg-cyan-500 text-black px-5 py-2.5 font-mono text-xs uppercase tracking-widest font-medium hover:bg-cyan-400 transition-all duration-200"
              >
                Try the Agent Demo
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Phone mockup */}
          <div className="order-1 lg:order-2">
            <AgentChatMockup />
          </div>
        </div>
      </div>
    </section>
  )
}

