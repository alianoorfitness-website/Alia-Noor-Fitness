import { Button } from "@/components/ui/button";
import { buildCoachingPlanMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/site-config";
import type { CoachingPlan } from "@/lib/types/content";

const featuredCtaClasses =
  "inline-flex items-center justify-center gap-2 rounded-full border border-canvas/30 px-6 py-3 text-sm font-medium tracking-wide text-canvas transition-colors duration-200 hover:bg-canvas hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2";

interface CoachingPlanCardProps {
  plan: CoachingPlan;
}

export function CoachingPlanCard({ plan }: CoachingPlanCardProps) {
  const whatsappUrl = buildWhatsAppUrl(
    siteConfig.whatsappNumber,
    buildCoachingPlanMessage(plan.name)
  );

  return (
    <div
      className={`flex h-full flex-col gap-6 rounded-[1.75rem] p-8 ${
        plan.featured
          ? "bg-ink text-canvas shadow-[0_30px_60px_-30px_rgba(28,26,25,0.5)]"
          : "border border-surface-border bg-canvas-raised text-ink"
      }`}
    >
      <div>
        {plan.featured ? (
          <span className="mb-3 inline-flex items-center rounded-full bg-accent px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-canvas">
            Most Popular
          </span>
        ) : null}
        <h3 className="font-display text-2xl">{plan.name}</h3>
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
            <span
              aria-hidden="true"
              className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${
                plan.featured ? "bg-highlight" : "bg-accent"
              }`}
            />
            <span>{feature}</span>
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
