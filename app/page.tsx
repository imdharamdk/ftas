import { AboutSection } from "@/components/AboutSection";
import { AutomationWorkflowSection } from "@/components/AutomationWorkflowSection";
import { ContactSection } from "@/components/ContactSection";
import { FutureVision } from "@/components/FutureVision";
import { HeroSection } from "@/components/HeroSection";
import { InfrastructureSection } from "@/components/InfrastructureSection";
import { ProcessSection } from "@/components/ProcessSection";
import { RDSection } from "@/components/RDSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TechnologyStack } from "@/components/TechnologyStack";
import { WhyFTASSection } from "@/components/WhyFTASSection";

export default function Home() {
  return (
    <>
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
    </>
  );
}
