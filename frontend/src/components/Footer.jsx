const COLUMNS = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Integrations", "Changelog"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Press"],
  },
  {
    title: "Resources",
    links: ["Documentation", "API Reference", "Guides", "Status"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-paper-line dark:border-deep-line px-6 sm:px-10 lg:px-20 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            <a href="#top" className="font-display text-lg font-semibold">
              Orbit<span className="text-signal">CRM</span>
            </a>
            <p className="mt-3 max-w-xs text-sm text-inkLight-mid dark:text-ink-mid">
              The customer relationship platform that keeps your pipeline from drifting.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-xs uppercase tracking-wider text-inkLight-low dark:text-ink-low">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-inkLight-mid dark:text-ink-mid hover:text-signal transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-paper-line dark:border-deep-line pt-8">
          <p className="text-xs text-inkLight-low dark:text-ink-low">
            © {new Date().getFullYear()} Orbit CRM. All rights reserved.
          </p>
          <a href="/admin" className="text-xs text-inkLight-low dark:text-ink-low hover:text-orbit transition-colors">
            Admin dashboard →
          </a>
        </div>
      </div>
    </footer>
  );
}
