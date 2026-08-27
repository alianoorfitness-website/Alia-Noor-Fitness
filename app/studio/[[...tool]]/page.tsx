/**
 * Embeds Sanity Studio at /studio (and all sub-paths, via the optional
 * catch-all segment). Access control is handled entirely by Sanity's own
 * authentication — a visitor who is not logged in to the configured Sanity
 * project sees a login screen here, not the content editor.
 */

import { NextStudio } from "next-sanity/studio";

import config from "@/sanity.config";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
