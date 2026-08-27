export interface NavLink {
  label: string;
  href: string;
}

/**
 * Shared between the desktop floating nav and the mobile nav panel so the
 * link set never drifts out of sync between the two.
 */
export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Transformations", href: "#transformations" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Coaching", href: "#coaching" },
  { label: "Contact", href: "#contact" },
];
