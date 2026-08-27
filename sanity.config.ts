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
});
