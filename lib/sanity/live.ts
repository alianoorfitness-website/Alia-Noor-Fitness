import { defineLive } from "next-sanity/live";

import { client } from "@/lib/sanity/client";

/**
 * Connects the existing public read client to Sanity's Live Content API.
 *
 * `sanityFetch` replaces `client.fetch` in lib/sanity/queries.ts. Internally
 * it tags every fetch with the exact sync tags Content Lake returns for that
 * query, then caches the result in the Next.js Data Cache under those tags.
 * `<SanityLive />` (rendered once in the root layout) opens a live event
 * connection to Sanity and, on every publish, revalidates only the tags
 * affected by that change — so editors see updates on the live site without
 * a Vercel redeploy, and unrelated cached queries are left untouched.
 *
 * Both tokens are explicitly set to `false` rather than left `undefined`:
 * this project's dataset is public and the site only ever renders published
 * content (no draft preview / Presentation Tool integration), so there is
 * nothing that needs authenticated read access. `false` also silences
 * next-sanity's dev-only "no token provided" warnings, and guarantees no
 * token is ever read into this module.
 */
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: false,
  browserToken: false,
});
