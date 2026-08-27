import { Button } from "@/components/ui/button";
import { buildCoachingPlanMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import type { CoachingPlan } from "@/lib/types/content";

const featuredCtaClasses =
  "inline-flex items-center justify-center gap-2 rounded-full border border-canvas/30 px-6 py-3 text-sm font-medium tracking-wide text-canvas transition-colors duration-200 hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2";

interface CoachingPlanCardProps {
  plan: CoachingPlan;
  whatsappNumber: string;
}

export function CoachingPlanCard({ plan, whatsappNumber }: CoachingPlanCardProps) {
  const whatsappUrl = buildWhatsAppUrl(
    whatsappNumber,
    buildCoachingPlanMessage(plan.name)
  );

  return (
    <div
      className={`relative flex h-full flex-col gap-6 rounded-[1.75rem] p-8 ${
        plan.featured
          ? "bg-ink text-canvas shadow-[0_35px_70px_-30px_rgba(28,26,25,0.55)] sm:scale-[1.02]"
          : "border border-surface-border bg-canvas-raised text-ink"
      }`}
    >
      {plan.featured ? (
        <span className="absolute -top-3 left-8 inline-flex items-center rounded-full bg-accent px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-canvas shadow-[0_8px_16px_-6px_rgba(168,80,59,0.6)]">
          {plan.badge || "Most Popular"}
        </span>
      ) : null}
      <div className="pt-1">
        <h3 className="break-words font-display text-2xl">{plan.name}</h3>
        <p
          className={`mt-2 text-sm ${plan.featured ? "text-canvas/70" : "text-ink-muted"}`}
        >
          {plan.audience}
        </p>
      </div>

      <p
        className={`text-sm leading-relaxed ${
          plan.featured ? "text-canvas/85" : "text-ink-muted"
        }`}
      >
        {plan.description}
      </p>

      <ul className="flex flex-1 flex-col gap-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <CheckIcon
              className={`mt-0.5 h-4 w-4 shrink-0 ${
                plan.featured ? "text-highlight" : "text-accent"
              }`}
            />
            <span className="break-words">{feature}</span>
          </li>
        ))}
      </ul>

      {plan.featured ? (
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={featuredCtaClasses}>
          {plan.ctaLabel}
        </a>
      ) : (
        <Button href={whatsappUrl} external variant="primary">
          {plan.ctaLabel}
        </Button>
      )}
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3 8.5 6.5 12 13 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
