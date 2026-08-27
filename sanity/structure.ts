import type { StructureResolver } from "sanity/structure";

/**
 * Custom Studio structure so non-technical editors see an organized,
 * purpose-built navigation instead of a flat alphabetical document list.
 *
 * Site Settings and Coach Profile behave as singletons: each is pinned to
 * a single, fixed document ID (rather than the generic document type
 * list), and the generic "Create new" action is hidden for those two
 * types in sanity.config.ts (via document.newDocumentOptions) so editors
 * can't accidentally create duplicates.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Alia Noor Fitness")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.listItem()
        .title("Coach Profile")
        .id("coachProfile")
        .child(
          S.document().schemaType("coachProfile").documentId("coachProfile")
        ),
      S.divider(),
      S.documentTypeListItem("expertise").title("Expertise"),
      S.documentTypeListItem("transformation").title("Transformations"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("coachingPlan").title("Coaching Plans"),
      S.documentTypeListItem("processStep").title("How It Works"),
      S.documentTypeListItem("faq").title("FAQs"),
    ]);
