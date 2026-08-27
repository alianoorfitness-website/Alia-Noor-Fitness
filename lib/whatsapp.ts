/**
 * WhatsApp deep-link helpers.
 *
 * WhatsApp is the site's primary conversion channel (chat CTA, coaching
 * plan enquiries, application follow-up). Centralizing URL construction
 * here means the WhatsApp number itself can move to Sanity Site Settings
 * later without touching every call site — callers pass the number in,
 * they don't hardcode it.
 */

/**
 * Builds a `wa.me` deep link that opens WhatsApp with a pre-filled message.
 *
 * @param phoneNumber - Full number in international format, digits only
 *   (e.g. "917295861360"). Strips common formatting characters
 *   (spaces, dashes, parentheses, a leading "+") so callers can pass a
 *   number as stored/entered without pre-cleaning it themselves.
 * @param message - Optional pre-filled message text.
 */
export function buildWhatsAppUrl(phoneNumber: string, message?: string): string {
  const digitsOnly = phoneNumber.replace(/[\s\-()+]/g, "");
  const base = `https://wa.me/${digitsOnly}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/**
 * Pre-fills a message for a visitor enquiring about a specific coaching plan.
 */
export function buildCoachingPlanMessage(planName: string): string {
  return `Hi Alia! I'm interested in your ${planName}. I'd like to know more about how I can get started.`;
}
