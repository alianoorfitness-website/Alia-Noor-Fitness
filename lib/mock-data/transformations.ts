/**
 * TEMPORARY MOCK DATA — Phase 2 only.
 *
 * This file exists because Sanity content schemas for Transformations have
 * not been created yet (planned for a later phase). Components that render
 * this data (components/transformations/*) accept it through typed props
 * and have no knowledge of where it came from, so swapping this file for a
 * Sanity query later requires no component changes.
 *
 * Do not add real client data here — placeholder names/images only.
 */

import type { Transformation } from "@/lib/types/content";

export const mockTransformations: Transformation[] = [
  {
    id: "t1",
    clientName: "Client A",
    beforeImage: "/mock/transformations/placeholder-before-1.svg",
    afterImage: "/mock/transformations/placeholder-after-1.svg",
    duration: "16 weeks",
    category: "Fat Loss & Body Transformation",
    description:
      "A structured strength and nutrition program focused on sustainable fat loss without sacrificing muscle.",
    metrics: [{ label: "Result", value: "-9 kg" }],
  },
  {
    id: "t2",
    clientName: "Client B",
    beforeImage: "/mock/transformations/placeholder-before-2.svg",
    afterImage: "/mock/transformations/placeholder-after-2.svg",
    duration: "6 months",
    category: "Postpartum Fitness & Recovery",
    description:
      "A progressive postpartum recovery plan rebuilding core and pelvic floor strength before returning to full training.",
    metrics: [{ label: "Result", value: "Core strength restored" }],
  },
  {
    id: "t3",
    clientName: "Client C",
    beforeImage: "/mock/transformations/placeholder-before-3.svg",
    afterImage: "/mock/transformations/placeholder-after-3.svg",
    duration: "12 weeks",
    category: "Strength Training",
    description:
      "A functional strength block emphasizing compound lifts and posture correction for everyday movement quality.",
    metrics: [{ label: "Result", value: "+18% strength" }],
  },
];
