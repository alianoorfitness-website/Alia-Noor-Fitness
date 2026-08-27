/**
 * Central site constants: brand name, location, and public contact details.
 *
 * These values live here for now so components have a single source to
 * import from rather than hardcoding strings. In a later phase this file's
 * exports will be replaced by a Sanity "Site Settings" singleton document
 * (see Phase 1 notes) — components should keep importing from this module
 * so that swap is a one-file change.
 */

export const siteConfig = {
  name: "Alia Noor Fitness",
  coachName: "Alia Noor",
  location: "South Delhi, India",
  email: "alianoor778666@gmail.com",
  /** Digits only, international format — see lib/whatsapp.ts. */
  whatsappNumber: "917295861360",
  whatsappDisplay: "+91 72958 61360",
} as const;
