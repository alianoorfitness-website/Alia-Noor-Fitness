import type { StructureResolver } from "sanity/structure";

/**
 * Customizes the Studio's content pane structure. Left as the default
 * document list for now since no content schemas exist yet — revisit once
 * Coach, Transformations, Testimonials, Coaching Plans, and Site Settings
 * are added, so singleton documents (e.g. Site Settings) can be pinned to
 * the top instead of appearing in a generic list.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items(S.documentTypeListItems());
