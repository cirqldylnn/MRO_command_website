"use client"

import { useEffect, useRef, useState } from "react"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { SplitFlapText, SplitFlapMuteToggle, SplitFlapAudioProvider } from "@/components/split-flap-text"
import { AnimatedNoise } from "@/components/animated-noise"
import { BitmapChevron } from "@/components/bitmap-chevron"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const heroTexts = [
  { text: "SEND RFQ", duration: 4500 },
  { text: "GET QUOTES", duration: 4500 },
  { text: "FIND PARTS", duration: 4500 },
]

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cycleKey, setCycleKey] = useState(0)

  // Cycle through texts
  useEffect(() => {
    const currentText = heroTexts[currentIndex]
    
    const timer = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % heroTexts.length
      setCurrentIndex(nextIndex)
      setCycleKey(prev => prev + 1)
    }, currentText.duration)

    return () => clearTimeout(timer)
  }, [currentIndex])

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center pl-6 md:pl-28 pr-6 md:pr-12">
      <AnimatedNoise opacity={0.03} />

      {/* Left vertical label */}
      <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground -rotate-90 origin-left block whitespace-nowrap">
          MRO COMMAND
        </span>
      </div>

      {/* Main content */}
      <div ref={contentRef} className="flex-1 w-full">
        {/* What it is - one liner */}
        <div className="mb-6 sm:mb-8">
          <span className="inline-block font-mono text-[10px] sm:text-xs text-muted-foreground/80 uppercase tracking-widest">
            AI-powered MRO procurement — capture requests, structure RFQs, close orders automatically.
          </span>
        </div>

        <SplitFlapAudioProvider>
          <div className="relative">
            {/* Cycling split-flap text - with overflow protection for mobile */}
            <div className="overflow-x-hidden -mx-2 px-2">
              <div key={cycleKey} className="inline-block">
                <SplitFlapText text={heroTexts[currentIndex].text} speed={70} />
              </div>
            </div>
            
            {/* Progress indicator */}
            <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
              {heroTexts.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-6 sm:w-8 bg-accent' 
                      : 'w-1.5 sm:w-2 bg-muted-foreground/30'
                  }`}
                />
              ))}
              <SplitFlapMuteToggle className="ml-2 sm:ml-4 text-[9px] sm:text-[10px]" />
            </div>
          </div>
        </SplitFlapAudioProvider>

        <h2 className="font-[var(--font-bebas)] text-muted-foreground/60 text-[clamp(1.1rem,3vw,2.5rem)] mt-4 sm:mt-6 tracking-wide leading-tight sm:leading-normal">
          Stop chasing vendors for a $40 gasket. <span className="text-accent">Start closing orders.</span>
        </h2>

        <p className="mt-6 sm:mt-8 max-w-lg font-mono text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Photo. Text. Email. Kiosk — send a request any way you want. 
          MRO Command turns it into structured RFQs, matches vendors, and gets you quotes automatically.
        </p>

        {/* Who it's for */}
        <div className="mt-4 sm:mt-5">
          <span className="font-mono text-[10px] sm:text-xs text-accent/80">
            Built for maintenance teams, procurement, and plant operations.
          </span>
        </div>

        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
          <a
            href="#cta"
            className="group inline-flex items-center gap-2 sm:gap-3 bg-accent text-black px-5 sm:px-6 py-2.5 sm:py-3 font-mono text-[10px] sm:text-xs uppercase tracking-widest font-bold hover:bg-accent/90 transition-all duration-200 w-full sm:w-auto justify-center sm:justify-start"
          >
            <ScrambleTextOnHover text="Book a Demo" as="span" duration={0.6} />
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="#signals"
            className="group inline-flex items-center gap-2 sm:gap-3 border border-foreground/20 px-5 sm:px-6 py-2.5 sm:py-3 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent transition-all duration-200 w-full sm:w-auto justify-center sm:justify-start"
          >
            <ScrambleTextOnHover text="See How It Works" as="span" duration={0.6} />
            <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
          </a>
        </div>

        {/* Stats bar */}
        <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-8 max-w-xl">
          <div className="border-l-2 border-accent/50 pl-3 sm:pl-4">
            <div className="font-[var(--font-bebas)] text-2xl sm:text-3xl text-accent">60%</div>
            <div className="font-mono text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-wider">Faster RFQs</div>
          </div>
          <div className="border-l-2 border-accent/50 pl-3 sm:pl-4">
            <div className="font-[var(--font-bebas)] text-2xl sm:text-3xl text-accent">4×</div>
            <div className="font-mono text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-wider">Response Rate</div>
          </div>
          <div className="border-l-2 border-accent/50 pl-3 sm:pl-4">
            <div className="font-[var(--font-bebas)] text-2xl sm:text-3xl text-accent">$0</div>
            <div className="font-mono text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-wider">Rush Fees</div>
          </div>
        </div>

        {/* Trust signals */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4 sm:gap-6 text-muted-foreground/60">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider">Setup in days</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider">Your vendors</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider">No IT needed</span>
          </div>
        </div>
      </div>

      {/* Floating info tag */}
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 md:bottom-12 md:right-12">
        <div className="border border-accent/30 bg-accent/5 px-3 py-1.5 sm:px-4 sm:py-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-accent">
          Pilots Now Open
        </div>
      </div>
    </section>
  )
}
