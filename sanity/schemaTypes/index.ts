import type { SchemaTypeDefinition } from "sanity";

/**
 * All Sanity schema types are registered here.
 *
 * Phase 1 intentionally ships without content schemas — Coach, Transformation,
 * Testimonial, Coaching Plan, and Site Settings will be added in a later
 * phase. Add new schema type definitions to this array as they're created
 * under `sanity/schemaTypes/`.
 */
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [],
};
