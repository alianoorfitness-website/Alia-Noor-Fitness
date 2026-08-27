import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/sanity/env";

/**
 * Shared Sanity client for reading published content on the public site.
 *
 * `useCdn: true` serves content through Sanity's fast, globally distributed
 * CDN rather than the live API — appropriate for public pages where a few
 * seconds of cache latency after a content edit is an acceptable trade-off
 * for speed. Draft/preview flows (added in a later phase) should create a
 * separate client with `useCdn: false` and a token.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
