import { CoachIntroSection } from "@/components/sections/coach-intro-section";
import { CredentialStrip } from "@/components/sections/credential-strip";
import { ExpertiseSection } from "@/components/sections/expertise-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { CoachingSection } from "@/components/coaching/coaching-section";
import { HeroSection } from "@/components/hero/hero-section";
import { TestimonialsSection } from "@/components/testimonials/testimonials-section";
import { TransformationsSection } from "@/components/transformations/transformations-section";
import { sanityImageUrl, mapCoachingPlan, mapCredentialTitle, mapTestimonial, mapTransformation } from "@/lib/sanity/mappers";
import {
  getCoachingPlans,
  getCoachProfile,
  getExpertise,
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
  ] = await Promise.all([
    getSiteSettings(),
    getCoachProfile(),
    getExpertise(),
    getTransformations(),
    getTestimonials(),
    getCoachingPlans(),
    getProcessSteps(),
  ]);

  const transformations = transformationResults
    .map(mapTransformation)
    .filter((item): item is Transformation => item !== null);
  const testimonials = testimonialResults.map(mapTestimonial);
  const coachingPlans = coachingPlanResults.map(mapCoachingPlan);

  const whatsappNumber = siteSettings?.whatsappNumber ?? "";

  const heroImageUrl = sanityImageUrl(siteSettings?.heroImage, 1000);
  const credentialItems = (coachProfile?.credentials ?? [])
    .filter((credential) => credential.featured)
    .map((credential, index) => ({
      id: `credential-strip-${index}`,
      label: credential.title,
    }));
  const coachCredentials = (coachProfile?.credentials ?? []).map(
    mapCredentialTitle
  );
  const coachProfileImageUrl = sanityImageUrl(coachProfile?.profileImage, 800);

  return (
    <>
      {siteSettings && heroImageUrl ? (
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
        />
      ) : null}

      <CredentialStrip items={credentialItems} />

      {coachProfile && coachProfileImageUrl ? (
        <CoachIntroSection
          introduction={coachProfile.introduction}
          coachingPhilosophy={coachProfile.coachingPhilosophy}
          profileImageUrl={coachProfileImageUrl}
          profileImageAlt={coachProfile.profileImage?.alt ?? coachProfile.name}
          credentials={coachCredentials}
          associationLabel={coachProfile.currentAssociation}
          associationExperience={coachProfile.associationExperience}
        />
      ) : null}

      <ExpertiseSection items={expertiseItems} />
      <TransformationsSection transformations={transformations} />
      <TestimonialsSection testimonials={testimonials} />
      <CoachingSection plans={coachingPlans} whatsappNumber={whatsappNumber} />
      <HowItWorksSection steps={processSteps} />
      <FinalCtaSection whatsappNumber={whatsappNumber} />
    </>
  );
}
