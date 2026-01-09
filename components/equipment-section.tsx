"use client"

import React, { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    id: "qr",
    title: "QR Code System",
    description: "Every piece of equipment gets a scannable code. One tap reveals full context.",
    icon: "qr",
    details: [
      "Generate codes for any equipment",
      "Print single labels or batch export",
      "Mobile-optimized scan page",
      "Instant access to specs, parts, history",
    ],
  },
  {
    id: "ai-import",
    title: "Smart Equipment Import",
    description: "Snap a photo of the nameplate. AI extracts everything.",
    icon: "camera",
    details: [
      "Extracts manufacturer, model, serial",
      "Researches specs automatically",
      "Finds parts breakdowns & manuals",
      "Discovers supplier contacts",
    ],
  },
  {
    id: "chat",
    title: "Equipment Chat Assistant",
    description: "Talk to AI about specific equipment. Get troubleshooting help instantly.",
    icon: "chat",
    details: [
      "Context-aware responses",
      "Troubleshooting suggestions",
      "Quick actions for common issues",
      "Links to relevant parts & vendors",
    ],
  },
  {
    id: "registry",
    title: "Complete Equipment Registry",
    description: "Your entire equipment database, organized and searchable.",
    icon: "database",
    details: [
      "Track status: Operational, Down, Retired",
      "Criticality levels for prioritization",
      "Location assignment & warranty tracking",
      "Full maintenance history",
    ],
  },
]

// Icons
function QRIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("w-6 h-6", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
    </svg>
  )
}

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("w-6 h-6", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
  )
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("w-6 h-6", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
  )
}

function DatabaseIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("w-6 h-6", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  )
}

const featureIcons: Record<string, ({ className }: { className?: string }) => React.ReactElement> = {
  qr: QRIcon,
  camera: CameraIcon,
  chat: ChatIcon,
  database: DatabaseIcon,
}

// Phone mockup showing QR scan flow
function PhoneMockup() {
  const [step, setStep] = useState(0)
  
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative">
      {/* Phone frame */}
      <div className="relative w-64 mx-auto">
        {/* Phone body */}
        <div className="bg-zinc-800 rounded-[2.5rem] p-2 shadow-2xl shadow-black/50 border border-zinc-700">
          {/* Screen */}
          <div className="bg-zinc-950 rounded-[2rem] overflow-hidden">
            {/* Notch */}
            <div className="h-6 bg-zinc-950 flex justify-center">
              <div className="w-20 h-5 bg-zinc-900 rounded-b-xl" />
            </div>
            
            {/* Screen content */}
            <div className="h-[420px] relative">
              {/* Step 0: Camera view with QR */}
              <div className={cn(
                "absolute inset-0 transition-opacity duration-500",
                step === 0 ? "opacity-100" : "opacity-0"
              )}>
                <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-6">
                  {/* Viewfinder */}
                  <div className="relative w-40 h-40 mb-6">
                    {/* Corner brackets */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent" />
                    {/* QR code */}
                    <div className="absolute inset-4 bg-white rounded p-2">
                      <div className="w-full h-full grid grid-cols-5 gap-0.5">
                        {[...Array(25)].map((_, i) => (
                          <div key={i} className={cn("bg-black", Math.random() > 0.5 ? "opacity-100" : "opacity-0")} />
                        ))}
                      </div>
                    </div>
                    {/* Scan line animation */}
                    <div className="absolute left-4 right-4 h-0.5 bg-accent animate-pulse top-1/2" />
                  </div>
                  <div className="font-mono text-xs text-accent animate-pulse">Scanning...</div>
                </div>
              </div>

              {/* Step 1: Loading/Processing */}
              <div className={cn(
                "absolute inset-0 transition-opacity duration-500",
                step === 1 ? "opacity-100" : "opacity-0"
              )}>
                <div className="h-full bg-zinc-900 flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 rounded-full border-2 border-accent border-t-transparent animate-spin mb-4" />
                  <div className="font-mono text-sm text-zinc-400 text-center">
                    Loading equipment data...
                  </div>
                  <div className="mt-4 space-y-2 w-full px-4">
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-accent w-3/4 animate-pulse" />
                    </div>
                    <div className="flex justify-between font-mono text-[10px] text-zinc-500">
                      <span>Fetching specs...</span>
                      <span>75%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Equipment card */}
              <div className={cn(
                "absolute inset-0 transition-opacity duration-500",
                step === 2 ? "opacity-100" : "opacity-0"
              )}>
                <div className="h-full bg-zinc-900 p-4 overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-mono text-[10px] text-emerald-400">OPERATIONAL</span>
                  </div>
                  
                  {/* Equipment name */}
                  <div className="font-[var(--font-bebas)] text-2xl text-white mb-1">Becker VTLF 2.250</div>
                  <div className="font-mono text-xs text-zinc-500 mb-4">Vacuum Pump · Asset #4420</div>
                  
                  {/* Specs grid */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-zinc-800/50 rounded p-2">
                      <div className="font-mono text-[9px] text-zinc-500">MANUFACTURER</div>
                      <div className="font-mono text-xs text-white">Becker</div>
                    </div>
                    <div className="bg-zinc-800/50 rounded p-2">
                      <div className="font-mono text-[9px] text-zinc-500">MODEL</div>
                      <div className="font-mono text-xs text-white">VTLF 2.250</div>
                    </div>
                    <div className="bg-zinc-800/50 rounded p-2">
                      <div className="font-mono text-[9px] text-zinc-500">SERIAL</div>
                      <div className="font-mono text-xs text-white">B2250-7841</div>
                    </div>
                    <div className="bg-zinc-800/50 rounded p-2">
                      <div className="font-mono text-[9px] text-zinc-500">LOCATION</div>
                      <div className="font-mono text-xs text-white">Bldg A, Rm 102</div>
                    </div>
                  </div>
                  
                  {/* Quick actions */}
                  <div className="space-y-2">
                    <button className="w-full bg-accent text-black font-mono text-xs font-bold py-3 rounded-lg flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      Find Parts
                    </button>
                    <button className="w-full bg-zinc-800 text-white font-mono text-xs py-3 rounded-lg flex items-center justify-center gap-2 border border-zinc-700">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                      Report Issue
                    </button>
                  </div>
                  
                  {/* Bottom tabs */}
                  <div className="absolute bottom-0 left-0 right-0 bg-zinc-800 border-t border-zinc-700 flex">
                    <button className="flex-1 py-3 font-mono text-[10px] text-accent border-b-2 border-accent">SPECS</button>
                    <button className="flex-1 py-3 font-mono text-[10px] text-zinc-500">PARTS</button>
                    <button className="flex-1 py-3 font-mono text-[10px] text-zinc-500">HISTORY</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                step === i ? "w-6 bg-accent" : "w-2 bg-zinc-700"
              )}
            />
          ))}
        </div>
        
        {/* Step labels */}
        <div className="text-center mt-2">
          <span className="font-mono text-xs text-zinc-500">
            {step === 0 && "Scan QR code"}
            {step === 1 && "AI loads context"}
            {step === 2 && "Full equipment data"}
          </span>
        </div>
      </div>
    </div>
  )
}

export function EquipmentSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [activeFeature, setActiveFeature] = useState(0)

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

  const currentFeature = features[activeFeature]
  const IconComponent = featureIcons[currentFeature.icon]

  return (
    <section ref={sectionRef} id="equipment" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent" />
      </div>
      
      <div className="relative">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400">Equipment Intelligence</span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
            YOUR EQUIPMENT,<br />
            <span className="text-cyan-400">FULLY CONNECTED.</span>
          </h2>
          <p className="mt-6 font-mono text-sm text-muted-foreground max-w-xl">
            Every piece of equipment becomes a smart asset. Scan, chat, and source — all from one system.
          </p>
        </div>

        {/* Main content */}
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Feature cards */}
          <div className="order-2 lg:order-1">
            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = featureIcons[feature.icon]
                const isActive = activeFeature === index
                
                return (
                  <button
                    key={feature.id}
                    onClick={() => setActiveFeature(index)}
                    className={cn(
                      "w-full text-left p-5 rounded-xl border transition-all duration-300",
                      isActive
                        ? "bg-cyan-500/10 border-cyan-500/40"
                        : "bg-zinc-900/30 border-zinc-800 hover:border-zinc-700"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300",
                        isActive ? "bg-cyan-500/20 text-cyan-400" : "bg-zinc-800 text-zinc-400"
                      )}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className={cn(
                          "font-[var(--font-bebas)] text-lg tracking-tight transition-colors duration-300",
                          isActive ? "text-cyan-400" : "text-foreground"
                        )}>
                          {feature.title}
                        </div>
                        <p className="font-mono text-xs text-muted-foreground mt-1">
                          {feature.description}
                        </p>
                        
                        {/* Expandable details */}
                        <div className={cn(
                          "overflow-hidden transition-all duration-300",
                          isActive ? "max-h-40 mt-4" : "max-h-0"
                        )}>
                          <ul className="space-y-2">
                            {feature.details.map((detail, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                <span className="font-mono text-xs text-zinc-400">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      {/* Arrow indicator */}
                      <svg 
                        className={cn(
                          "w-5 h-5 transition-all duration-300 flex-shrink-0",
                          isActive ? "text-cyan-400 rotate-90" : "text-zinc-600"
                        )} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right: Phone mockup */}
          <div className="order-1 lg:order-2">
            <PhoneMockup />
          </div>
        </div>

        {/* Bottom callout */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-6 py-3">
            <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
            <span className="font-mono text-sm text-cyan-400">
              AI researches every new equipment import automatically
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}





