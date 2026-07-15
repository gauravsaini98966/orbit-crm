import { useState } from "react";

const FAQS = [
  {
    q: "How long does implementation take?",
    a: "Most teams under 50 seats are fully migrated within a week, including historical pipeline data and email sync.",
  },
  {
    q: "Can Orbit CRM integrate with our existing tools?",
    a: "Yes. Orbit connects natively to common email, calendar, and support tools, plus a REST API and webhooks for anything custom.",
  },
  {
    q: "Is there a free trial?",
    a: "Every plan starts with a 14-day trial with full feature access. No credit card required to begin.",
  },
  {
    q: "What happens to our data if we cancel?",
    a: "You can export your full pipeline, contacts, and history at any time in CSV or via the API, both during and after your subscription.",
  },
  {
    q: "Do you offer volume or nonprofit discounts?",
    a: "Yes — reach out through the inquiry form below and our sales team will put together a plan that fits your organization.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section bg-paper-raised/60 dark:bg-deep-surface/60">
      <div className="mx-auto max-w-4xl">
        <div className="max-w-2xl">
          <span className="eyebrow">Questions</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-10 divide-y divide-paper-line dark:divide-deep-line border-t border-b border-paper-line dark:border-deep-line">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-medium">{item.q}</span>
                  <span
                    className={`shrink-0 font-mono text-lg text-signal transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"
                  }`}
                  style={{ display: "grid" }}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm text-inkLight-mid dark:text-ink-mid pr-8">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
