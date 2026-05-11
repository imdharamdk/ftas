"use client";

import { AboutSection } from "@/components/AboutSection";
import { AutomationWorkflowSection } from "@/components/AutomationWorkflowSection";
import { BackgroundSystem } from "@/components/BackgroundSystem";
import { ContactSection } from "@/components/ContactSection";
import { CursorSystem } from "@/components/CursorSystem";
import { Footer } from "@/components/Footer";
import { FutureVision } from "@/components/FutureVision";
import { HeroSection } from "@/components/HeroSection";
import { InfrastructureSection } from "@/components/InfrastructureSection";
import { LoadingSequence } from "@/components/LoadingSequence";
import { MotionDirector } from "@/components/MotionDirector";
import { Navigation } from "@/components/Navigation";
import { ProcessSection } from "@/components/ProcessSection";
import { RDSection } from "@/components/RDSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TechnologyStack } from "@/components/TechnologyStack";
import { WhyFTASSection } from "@/components/WhyFTASSection";

export default function Home() {
  return (
    <>
      <LoadingSequence />
      <MotionDirector />
      <CursorSystem />
      <BackgroundSystem />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <WhyFTASSection />
        <ServicesSection />
        <InfrastructureSection />
        <ProcessSection />
        <RDSection />
        <AutomationWorkflowSection />
        <TechnologyStack />
        <FutureVision />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
