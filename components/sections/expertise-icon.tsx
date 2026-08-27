/**
 * Maps a Sanity `expertise.iconKey` string to a small inline SVG icon.
 * Icons are simple line-art, defined here rather than stored in Sanity —
 * the CMS only ever stores the controlled string key.
 */
export function ExpertiseIcon({ iconKey }: { iconKey?: string | null }) {
  const props = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (iconKey) {
    case "strength":
      return (
        <svg {...props}>
          <path d="M4 9v6M2 10v4M20 9v6M22 10v4M7 12h10M7 8v8M17 8v8" />
        </svg>
      );
    case "fat-loss":
      return (
        <svg {...props}>
          <path d="M12 3c3 3.5 6 6.8 6 10.5A6 6 0 0 1 6 13.5C6 9.8 9 6.5 12 3Z" />
        </svg>
      );
    case "recovery":
      return (
        <svg {...props}>
          <path d="M12 21s-7-4.35-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.65-9.5 9-9.5 9Z" />
        </svg>
      );
    case "mobility":
      return (
        <svg {...props}>
          <circle cx="12" cy="4.5" r="1.5" />
          <path d="M12 8v5l-3.5 5M12 13l3.5 5M8 10l-4 1.5M16 10l4 1.5" />
        </svg>
      );
    case "nutrition":
      return (
        <svg {...props}>
          <path d="M7 3v6c0 1.5 1 2.5 2 2.5s2-1 2-2.5V3M9 11.5V21M17 3c-2.5 0-4 2.5-4 6s1.5 6 4 6 4-2.5 4-6-1.5-6-4-6ZM17 15v6" />
        </svg>
      );
    case "performance":
      return (
        <svg {...props}>
          <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      );
  }
}
