/**
 * Centralized, typed access to environment variables.
 *
 * Import from here instead of reading `process.env` directly throughout the
 * app. This keeps environment variable names in one place.
 *
 * Note: values are NOT validated as "required" at module load time. Sanity
 * project credentials won't exist until a real Sanity project is created, and
 * this file is imported by routes (like /studio) that are part of the build
 * graph — throwing here would break `next build` before a project is ever
 * configured. Consumers that truly cannot function without a value (e.g. a
 * data-fetching function) should check for it explicitly at the call site.
 */

export const env = {
  sanity: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01",
    // Server-only. Never expose this to the client bundle.
    token: process.env.SANITY_API_TOKEN,
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;
