import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle.jsx";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Customers" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-paper/90 dark:bg-deep/90 backdrop-blur border-b border-paper-line dark:border-deep-line"
          : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-6 sm:px-10 lg:px-20 py-4">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-semibold">
          <span className="relative inline-flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-signal" />
          </span>
          Orbit<span className="text-signal">CRM</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-inkLight-mid dark:text-ink-mid hover:text-signal transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <a href="#inquiry" className="btn-primary">
            Talk to Sales
          </a>
        </div>

        <button
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-inkLight-low/30 dark:border-ink-low/30"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1">
            <span className="h-0.5 w-4 bg-current" />
            <span className="h-0.5 w-4 bg-current" />
          </div>
        </button>
      </nav>

      {open && (
        <div className="md:hidden flex flex-col gap-1 px-6 pb-6 bg-paper dark:bg-deep border-b border-paper-line dark:border-deep-line">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium text-inkLight-mid dark:text-ink-mid"
            >
              {l.label}
            </a>
          ))}
          <div className="flex items-center justify-between pt-3">
            <ThemeToggle />
            <a href="#inquiry" onClick={() => setOpen(false)} className="btn-primary">
              Talk to Sales
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
