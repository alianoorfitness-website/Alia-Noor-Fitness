import type { SchemaTypeDefinition } from "sanity";

import { coachingPlan } from "./documents/coachingPlan";
import { coachProfile } from "./documents/coachProfile";
import { expertise } from "./documents/expertise";
import { faq } from "./documents/faq";
import { processStep } from "./documents/processStep";
import { siteSettings } from "./documents/siteSettings";
import { testimonial } from "./documents/testimonial";
import { transformation } from "./documents/transformation";
import { credential } from "./objects/credential";
import { metric } from "./objects/metric";

/**
 * All Sanity schema types are registered here.
 *
 * Object types (reusable field shapes) are listed before document types
 * by convention, though order has no functional effect on the schema.
 */
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Reusable objects
    credential,
    metric,

    // Singletons (see sanity/structure.ts for Studio-level enforcement)
    siteSettings,
    coachProfile,

    // Collections
    expertise,
    transformation,
    testimonial,
    coachingPlan,
    processStep,
    faq,
  ],
};
