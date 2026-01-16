"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="cta" className="relative py-32 md:py-40 pl-6 md:pl-28 pr-6 md:pr-12 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.03] to-accent/[0.08]" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent/10 rounded-full blur-[120px]" />
      </div>
      
      <div ref={contentRef} className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 mb-8">
          <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="font-mono text-xs text-accent">Ready to deploy in under a week</span>
        </div>
        
        {/* Headline */}
        <h2 className="font-[var(--font-bebas)] text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6">
          WANT TO SEE IT<br />
          <span className="text-accent">ON YOUR FLOOR?</span>
        </h2>
        
        {/* Subhead */}
        <p className="font-mono text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          We'll set up a pilot with your approved vendor list and one request channel 
          <span className="text-foreground"> (email or SMS)</span> in under a week.
        </p>
        
        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="/demo"
            className="group inline-flex items-center gap-3 bg-accent text-black font-mono text-sm font-bold px-8 py-4 rounded-lg hover:bg-accent/90 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
          >
            Book a Demo
            <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </a>
          
          <a
            href="/demo?type=pilot"
            className="group inline-flex items-center gap-3 bg-transparent text-foreground font-mono text-sm font-bold px-8 py-4 rounded-lg border border-foreground/20 hover:border-accent hover:text-accent transition-all duration-200 hover:scale-105"
          >
            Start a Pilot
            <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
        
        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-muted-foreground mb-12">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-mono text-xs">No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-mono text-xs">Setup in days, not months</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-mono text-xs">Your vendors, your workflow</span>
          </div>
        </div>

        {/* Partner callout */}
        <div className="border-t border-border/20 pt-8">
          <a
            href="/partners"
            className="group inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-muted-foreground hover:text-accent transition-colors"
          >
            <span className="text-2xl">🤝</span>
            <span className="font-mono text-sm text-center sm:text-left">
              <span className="text-foreground group-hover:text-accent transition-colors">Interested in partnering?</span>
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> — </span>
              <span className="text-muted-foreground group-hover:text-accent/80">Become a reseller or technology partner</span>
            </span>
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
      
      {/* Footer */}
      <div className="relative mt-24 pt-8 border-t border-border/20 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <div className="font-mono text-sm text-accent font-bold tracking-wider mb-1">MRO.ai</div>
            <p className="font-mono text-[10px] text-muted-foreground">
              Built for maintenance teams that move fast.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a href="/partners" className="font-mono text-xs text-muted-foreground hover:text-accent transition-colors">
              Partners
            </a>
            <a href="#" className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="/demo" className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
          <p className="font-mono text-[10px] text-muted-foreground">
            © 2025 MRO.ai. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  )
}





