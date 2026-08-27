"use client";

import { motion } from "framer-motion";

import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface WhatsAppFloatButtonProps {
  whatsappNumber: string;
}

/**
 * Subtle floating WhatsApp CTA, present on every page. Uses the shared
 * lib/whatsapp.ts helper rather than constructing the wa.me URL inline.
 * The number is passed in from Site Settings (see app/layout.tsx).
 */
export function WhatsAppFloatButton({ whatsappNumber }: WhatsAppFloatButtonProps) {
  const href = buildWhatsAppUrl(
    whatsappNumber,
    "Hi Alia! I'd like to know more about training with you."
  );

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Alia on WhatsApp"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className="glass-panel fixed right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full text-accent-strong shadow-[0_10px_30px_-10px_rgba(28,26,25,0.35)] sm:right-6"
      style={{
        bottom: "max(1.25rem, env(safe-area-inset-bottom))",
      }}
    >
      <WhatsAppIcon />
      <span className="sr-only">Chat with Alia on WhatsApp</span>
    </motion.a>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-1.746-.874-2.9-1.56-4.06-3.54-.306-.526.306-.489.877-1.627.098-.198.05-.371-.05-.52-.099-.149-.669-1.61-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.01-.371-.012-.57-.012-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.058 3.135 4.987 4.274 2.928 1.14 2.928.76 3.877.712.95-.05 3.075-1.263 3.5-2.479.427-1.213.427-2.253.297-2.478-.13-.223-.297-.297-.594-.446z" />
      <path d="M12.043 2C6.517 2 2 6.478 2 12c0 1.99.577 3.845 1.578 5.416L2 22l4.706-1.542A9.99 9.99 0 0 0 12.043 22C17.57 22 22.086 17.522 22.086 12S17.57 2 12.043 2zm0 18.146c-1.786 0-3.44-.526-4.838-1.435l-.347-.223-2.94.965.982-2.85-.223-.323A8.09 8.09 0 0 1 3.914 12c0-4.487 3.664-8.146 8.13-8.146 4.464 0 8.128 3.659 8.128 8.146s-3.664 8.146-8.129 8.146z" />
    </svg>
  );
}
