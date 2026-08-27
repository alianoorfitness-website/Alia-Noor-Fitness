import { CoachIntroSection } from "@/components/sections/coach-intro-section";
import { ExpertiseSection } from "@/components/sections/expertise-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { StatsStrip } from "@/components/sections/stats-strip";
import { CoachingSection } from "@/components/coaching/coaching-section";
import { HeroSection } from "@/components/hero/hero-section";
import { TestimonialsSection } from "@/components/testimonials/testimonials-section";
import { TransformationsSection } from "@/components/transformations/transformations-section";
import {
  sanityImageUrl,
  mapCoachingPlan,
  mapCredentialTitle,
  mapFaq,
  mapTestimonial,
  mapTransformation,
} from "@/lib/sanity/mappers";
import {
  getCoachingPlans,
  getCoachProfile,
  getExpertise,
  getFaqs,
  getProcessSteps,
  getSiteSettings,
  getTestimonials,
  getTransformations,
} from "@/lib/sanity/queries";
import type { Transformation } from "@/lib/types/content";

export default async function Home() {
  const [
    siteSettings,
    coachProfile,
    expertiseItems,
    transformationResults,
    testimonialResults,
    coachingPlanResults,
    processSteps,
    faqResults,
  ] = await Promise.all([
    getSiteSettings(),
    getCoachProfile(),
    getExpertise(),
    getTransformations(),
    getTestimonials(),
    getCoachingPlans(),
    getProcessSteps(),
    getFaqs(),
  ]);

  const transformations = transformationResults
    .map(mapTransformation)
    .filter((item): item is Transformation => item !== null);
  const testimonials = testimonialResults.map(mapTestimonial);
  const coachingPlans = coachingPlanResults.map(mapCoachingPlan);
  const faqs = faqResults.map(mapFaq);

  const whatsappNumber = siteSettings?.whatsappNumber ?? "";

  const heroImageUrl = sanityImageUrl(siteSettings?.heroImage, 1000);
  const heroTrustBadges = (coachProfile?.credentials ?? [])
    .filter((credential) => credential.featured)
    .map((credential) => credential.title);
  const coachCredentials = (coachProfile?.credentials ?? []).map(
    mapCredentialTitle
  );
  const coachProfileImageUrl = sanityImageUrl(coachProfile?.profileImage, 800);

  // Trust/metrics strip: only real, derivable values — never a fabricated
  // business claim like a client count that isn't actually stored anywhere.
  const statsItems = [
    coachProfile?.yearsExperience
      ? { id: "years", value: `${coachProfile.yearsExperience}+`, label: "Years Experience" }
      : null,
    transformations.length > 0
      ? {
          id: "transformations",
          value: `${transformations.length}+`,
          label: "Client Transformations",
        }
      : null,
    expertiseItems.length > 0
      ? { id: "expertise", value: `${expertiseItems.length}+`, label: "Coaching Specialties" }
      : null,
    coachCredentials.length > 0
      ? { id: "credentials", value: `${coachCredentials.length}+`, label: "Certifications" }
      : null,
  ].filter((item): item is { id: string; value: string; label: string } => item !== null);

  return (
    <>
      {siteSettings ? (
        <HeroSection
          headline={siteSettings.heroHeadline}
          subheadline={siteSettings.heroSubheadline}
          primaryCtaLabel={siteSettings.primaryCtaLabel}
          secondaryCtaLabel={siteSettings.secondaryCtaLabel}
          heroImageUrl={heroImageUrl}
          heroImageAlt={siteSettings.heroImage?.alt ?? siteSettings.coachName}
          coachName={siteSettings.coachName}
          profession={siteSettings.profession}
          location={siteSettings.location}
          whatsappNumber={whatsappNumber}
          yearsExperience={coachProfile?.yearsExperience ?? 0}
          trustBadges={heroTrustBadges}
        />
      ) : null}

      <StatsStrip items={statsItems} />

      {coachProfile ? (
        <CoachIntroSection
          coachName={coachProfile.name}
          introduction={coachProfile.introduction}
          coachingPhilosophy={coachProfile.coachingPhilosophy}
          profileImageUrl={coachProfileImageUrl}
          profileImageAlt={coachProfile.profileImage?.alt ?? coachProfile.name}
          credentials={coachCredentials}
          associationLabel={coachProfile.currentAssociation}
          associationExperience={coachProfile.associationExperience}
          yearsExperience={coachProfile.yearsExperience}
        />
      ) : null}

      <ExpertiseSection items={expertiseItems} />
      <TransformationsSection transformations={transformations} />
      <TestimonialsSection testimonials={testimonials} />
      <CoachingSection plans={coachingPlans} whatsappNumber={whatsappNumber} />
      <HowItWorksSection steps={processSteps} />
      <FaqSection faqs={faqs} />
      <FinalCtaSection whatsappNumber={whatsappNumber} />
    </>
  );
}
