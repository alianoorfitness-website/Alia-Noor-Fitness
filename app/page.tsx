import { CoachIntroSection } from "@/components/sections/coach-intro-section";
import { CredentialStrip } from "@/components/sections/credential-strip";
import { ExpertiseSection } from "@/components/sections/expertise-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { CoachingSection } from "@/components/coaching/coaching-section";
import { HeroSection } from "@/components/hero/hero-section";
import { TestimonialsSection } from "@/components/testimonials/testimonials-section";
import { TransformationsSection } from "@/components/transformations/transformations-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CredentialStrip />
      <CoachIntroSection />
      <ExpertiseSection />
      <TransformationsSection />
      <TestimonialsSection />
      <CoachingSection />
      <HowItWorksSection />
      <FinalCtaSection />
    </>
  );
}
