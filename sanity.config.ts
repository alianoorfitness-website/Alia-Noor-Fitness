"use client";

/**
 * Sanity Studio configuration.
 *
 * This config is consumed by the embedded Studio route at `/studio`
 * (see app/studio/[[...tool]]/page.tsx). It is not used by the public
 * website at runtime — only by the Studio UI itself.
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

/** Document types that behave as singletons — see sanity/structure.ts. */
const SINGLETON_TYPES = new Set(["siteSettings", "coachProfile"]);

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision lets editors run GROQ queries directly from the Studio.
    // Useful during development; safe to keep since Studio access is
    // already gated behind Sanity authentication.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    // Prevents editors from creating a second Site Settings or Coach
    // Profile document via the global "New document" menu/search — the
    // only way to reach these documents is through the pinned entries in
    // the custom Studio structure, each bound to a single fixed document ID.
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        // Default templates use the schema type name as their templateId
        // (see Sanity's defaultTemplatesForSchema), so this filters out
        // "Create new Site Settings" / "Create new Coach Profile" from
        // the global new-document menu and search.
        return prev.filter((template) => !SINGLETON_TYPES.has(template.templateId));
      }
      return prev;
    },
    // Hides "Duplicate" and "Delete" for singleton documents so an editor
    // can't remove or fork the one Site Settings / Coach Profile document.
    actions: (prev, { schemaType }) => {
      if (SINGLETON_TYPES.has(schemaType)) {
        return prev.filter(
          (action) => action.action !== "duplicate" && action.action !== "delete"
        );
      }
      return prev;
    },
  },
});
