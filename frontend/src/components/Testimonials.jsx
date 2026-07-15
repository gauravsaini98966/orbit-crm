import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "We stopped losing deals in the gap between calls and email. Everything sits in one timeline now.",
    name: "Priya Shah",
    role: "VP Sales, Northwind Retail",
  },
  {
    quote:
      "Orbit's forecast model matched our actual close rate within two points the first quarter we used it.",
    name: "Marcus Webb",
    role: "RevOps Lead, Fenwick Labs",
  },
  {
    quote:
      "Rolling it out to 60 reps took an afternoon. Permissions and territories just worked.",
    name: "Ana Torres",
    role: "Sales Director, Halcyon Freight",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <span className="eyebrow">Customers</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
            Teams who brought their pipeline back into orbit
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-7 flex flex-col justify-between"
            >
              <blockquote className="text-sm leading-relaxed text-inkLight-high dark:text-ink-high">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orbit/15 font-mono text-xs text-orbit">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-inkLight-low dark:text-ink-low">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
