import { motion } from "framer-motion";
import OrbitDiagram from "./OrbitDiagram.jsx";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-grid bg-grid px-6 sm:px-10 lg:px-20 pt-16 pb-24 lg:pt-24 lg:pb-32"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-paper dark:to-deep pointer-events-none" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="eyebrow">Mission control for revenue teams</span>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
            Keep every lead, deal, and customer in one orbit.
          </h1>
          <p className="mt-6 max-w-xl text-base sm:text-lg text-inkLight-mid dark:text-ink-mid">
            Orbit CRM pulls your pipeline, conversations, and customer data into a single
            gravitational center — so nothing drifts out of reach and no follow-up gets lost.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#inquiry" className="btn-primary">
              Talk to Sales
            </a>
            <a href="#features" className="btn-ghost">
              See how it works
            </a>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 font-mono text-xs text-inkLight-low dark:text-ink-low">
            <div>
              <span className="text-xl text-inkLight-high dark:text-ink-high">4,200+</span>
              <p>teams onboard</p>
            </div>
            <div>
              <span className="text-xl text-inkLight-high dark:text-ink-high">99.95%</span>
              <p>platform uptime</p>
            </div>
            <div>
              <span className="text-xl text-inkLight-high dark:text-ink-high">38%</span>
              <p>avg. faster close time</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="flex items-center justify-center"
        >
          <OrbitDiagram size={440} className="max-w-full" />
        </motion.div>
      </div>
    </section>
  );
}
