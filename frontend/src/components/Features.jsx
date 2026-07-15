import { motion } from "framer-motion";

const FEATURES = [
  {
    label: "Pipeline",
    title: "See every deal's trajectory",
    description:
      "A visual pipeline that shows exactly where each deal sits and what's pulling it forward or holding it back.",
  },
  {
    label: "Inbox",
    title: "One thread per customer",
    description:
      "Emails, calls, and notes collapse into a single timeline, so your team always knows the last thing that was said.",
  },
  {
    label: "Automation",
    title: "Follow-ups that never drift",
    description:
      "Set the rules once. Orbit CRM nudges reps, updates stages, and routes leads while you focus on the conversation.",
  },
  {
    label: "Insights",
    title: "Forecasts you can defend",
    description:
      "Live win-rate and velocity models built from your own historical data, not industry guesswork.",
  },
  {
    label: "Integrations",
    title: "Connects to your stack",
    description:
      "Native sync with your inbox, calendar, and the dozen other tools your team already lives in.",
  },
  {
    label: "Permissions",
    title: "Built for how teams scale",
    description:
      "Territories, roles, and approval chains that stay clean whether you're 5 reps or 500.",
  },
];

export default function Features() {
  return (
    <section id="features" className="section">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <span className="eyebrow">What's inside</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
            Everything a revenue team orbits around
          </h2>
          <p className="mt-4 text-inkLight-mid dark:text-ink-mid">
            Six systems, one center of gravity. No more switching tabs to remember who said what.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="card p-6 hover:border-orbit/60 transition-colors group"
            >
              <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-orbit">
                {f.label}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-inkLight-mid dark:text-ink-mid">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
