import { HeroSection } from "@/components/hero-section"
import { PainSection } from "@/components/pain-section"
import { SignalsSection } from "@/components/signals-section"
import { FloorAgentSection } from "@/components/floor-agent-section"
import { WorkSection } from "@/components/work-section"
import { ProjectModeSection } from "@/components/project-mode-section"
import { ScenariosSection } from "@/components/scenarios-section"
import { PrinciplesSection } from "@/components/principles-section"
import { InventorySection } from "@/components/inventory-section"
import { AdoptionSection } from "@/components/adoption-section"
import { KioskSection } from "@/components/kiosk-section"
import { ColophonSection } from "@/components/colophon-section"
import { ROISection } from "@/components/roi-section"
import { CTASection } from "@/components/cta-section"
import { SideNav } from "@/components/side-nav"

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <SideNav />
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />

      <div className="relative z-10">
        {/* Act 1: Problem & Promise */}
        <HeroSection />
        <PainSection />
        
        {/* Act 2: How It Works */}
        <WorkSection />
        <PrinciplesSection />
        <SignalsSection />
        <FloorAgentSection />
        
        {/* Act 3: Capabilities */}
        <InventorySection />
        <ProjectModeSection />
        <KioskSection />
        
        {/* Act 4: Proof & Trust */}
        <AdoptionSection />
        <ScenariosSection />
        <ColophonSection />
        <ROISection />
        
        {/* Act 5: Action */}
        <CTASection />
      </div>
    </main>
  )
}
