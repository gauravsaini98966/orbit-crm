import { useTheme } from "../context/ThemeContext.jsx";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-9 w-16 items-center rounded-full border border-inkLight-low/30 dark:border-ink-low/30 bg-paper-raised dark:bg-deep-raised px-1 transition-colors"
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full bg-signal text-xs font-bold text-deep transition-transform duration-300 ${
          isDark ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {isDark ? "🌙" : "☀"}
      </span>
    </button>
  );
}
