import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from "@/sanity/env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Builds a Sanity CDN image URL builder for a given image source (an image
 * field value from a Sanity document).
 *
 * Always chain `.width()`/`.height()` and let `next/image` request the
 * specific sizes it needs — never request Sanity's original, full-resolution
 * asset directly. Example:
 *
 *   <Image src={urlFor(coach.image).width(800).url()} ... />
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
