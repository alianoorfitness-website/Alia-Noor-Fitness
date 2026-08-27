import { env } from "@/lib/env";

/**
 * Re-exported here so everything under `sanity/` (schemas, structure,
 * studio config) reads environment values from a single, obvious place,
 * matching the convention used by the rest of the app.
 */
export const projectId = env.sanity.projectId;
export const dataset = env.sanity.dataset;
export const apiVersion = env.sanity.apiVersion;
