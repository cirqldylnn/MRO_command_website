"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  // Act 1: Problem & Promise
  { id: "hero", label: "Index" },
  { id: "problem", label: "Problem" },
  // Act 2: How It Works
  { id: "work", label: "Process" },
  { id: "signals", label: "Request" },
  { id: "agent", label: "Agent" },
  { id: "principles", label: "Trust" },
  // Act 3: Capabilities
  { id: "inventory", label: "Inventory" },
  { id: "projects", label: "Projects" },
  { id: "kiosk", label: "Kiosk" },
  // Act 4: Proof & Trust
  { id: "adoption", label: "Adoption" },
  { id: "scenarios", label: "Scenarios" },
  { id: "colophon", label: "Security" },
  { id: "roi", label: "Results" },
  // Act 5: Action
  { id: "cta", label: "Contact" },
]

export function SideNav() {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="fixed left-0 top-0 z-50 h-screen w-16 md:w-20 hidden md:flex flex-col justify-center border-r border-border/30 bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col gap-6 px-4">
        {navItems.map(({ id, label }) => (
          <button key={id} onClick={() => scrollToSection(id)} className="group relative flex items-center gap-3">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-all duration-300",
                activeSection === id ? "bg-accent scale-125" : "bg-muted-foreground/40 group-hover:bg-foreground/60",
              )}
            />
            <span
              className={cn(
                "absolute left-6 font-mono text-[10px] uppercase tracking-widest opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:left-8 whitespace-nowrap",
                activeSection === id ? "text-accent" : "text-muted-foreground",
              )}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}
