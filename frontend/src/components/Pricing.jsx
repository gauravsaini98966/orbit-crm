import { motion } from "framer-motion";

const PLANS = [
  {
    name: "Launch",
    price: "$19",
    period: "/seat/mo",
    description: "For small teams closing their first hundred deals.",
    features: ["Up to 10 seats", "Pipeline & inbox sync", "Email automation", "Standard reports"],
    cta: "Start with Launch",
    highlighted: false,
  },
  {
    name: "Orbit",
    price: "$49",
    period: "/seat/mo",
    description: "For growing teams that need forecasting and automation.",
    features: [
      "Unlimited seats",
      "Custom pipelines",
      "Forecast & velocity models",
      "Workflow automation",
      "Priority support",
    ],
    cta: "Start with Orbit",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations with territories, approvals, and scale.",
    features: [
      "SSO & advanced permissions",
      "Dedicated success manager",
      "Custom integrations",
      "99.95% uptime SLA",
    ],
    cta: "Talk to Sales",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="section bg-paper-raised/60 dark:bg-deep-surface/60">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <span className="eyebrow">Pricing</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
            Plans that scale with your pipeline
          </h2>
          <p className="mt-4 text-inkLight-mid dark:text-ink-mid">
            Every plan includes unlimited contacts and deals. Upgrade when your team, not your data, grows.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`flex flex-col rounded-2xl p-8 ${
                plan.highlighted
                  ? "bg-deep text-ink-high border border-orbit/50 shadow-[0_0_40px_-10px_rgba(94,234,212,0.35)] lg:-translate-y-3"
                  : "card"
              }`}
            >
              {plan.highlighted && (
                <span className="mb-4 inline-block w-fit rounded-full bg-orbit/15 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-orbit">
                  Most popular
                </span>
              )}
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p
                className={`mt-2 text-sm ${
                  plan.highlighted ? "text-ink-mid" : "text-inkLight-mid dark:text-ink-mid"
                }`}
              >
                {plan.description}
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-display font-semibold">{plan.price}</span>
                <span
                  className={`text-sm ${plan.highlighted ? "text-ink-mid" : "text-inkLight-mid dark:text-ink-mid"}`}
                >
                  {plan.period}
                </span>
              </div>

              <ul className="mt-7 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                    <span className={plan.highlighted ? "text-ink-mid" : "text-inkLight-mid dark:text-ink-mid"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#inquiry"
                className={`mt-8 w-full text-center ${
                  plan.highlighted ? "btn-primary" : "btn-ghost"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
