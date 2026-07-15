// The signature visual: concentric orbits with nodes representing
// leads -> deals -> customers circling the business at the center.
// Used in the hero at full size and echoed smaller in the Features section.
export default function OrbitDiagram({ size = 480, className = "" }) {
  const cx = size / 2;
  const cy = size / 2;
  const rings = [size * 0.2, size * 0.32, size * 0.44];

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 h-full w-full">
        {rings.map((r, i) => (
          <circle
            key={r}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.18 - i * 0.03}
            strokeWidth={1}
            className="text-inkLight-low dark:text-ink-low"
          />
        ))}
        <circle cx={cx} cy={cy} r={size * 0.07} fill="#FF7A45" />
        <circle cx={cx} cy={cy} r={size * 0.07} fill="#FF7A45" opacity="0.25">
          <animate attributeName="r" values={`${size * 0.07};${size * 0.11};${size * 0.07}`} dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.25;0;0.25" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Orbit ring 1 - leads (fast) */}
      <div
        className="absolute inset-0 animate-spin-slow"
        style={{ animationDuration: "22s" }}
        aria-hidden="true"
      >
        <div
          className="absolute h-3 w-3 rounded-full bg-orbit shadow-[0_0_12px_2px_rgba(94,234,212,0.6)]"
          style={{ left: cx + rings[0] - 6, top: cy - 6 }}
        />
      </div>

      {/* Orbit ring 2 - deals (medium, reverse) */}
      <div className="absolute inset-0 animate-spin-reverse" aria-hidden="true">
        <div
          className="absolute h-3.5 w-3.5 rounded-full bg-signal shadow-[0_0_12px_2px_rgba(255,122,69,0.5)]"
          style={{ left: cx + rings[1] - 7, top: cy - 7 }}
        />
      </div>

      {/* Orbit ring 3 - customers (slow) */}
      <div className="absolute inset-0 animate-spin-slower" aria-hidden="true">
        <div
          className="absolute h-2.5 w-2.5 rounded-full bg-ink-high/70 dark:bg-ink-high"
          style={{ left: cx + rings[2] - 5, top: cy - 5 }}
        />
        <div
          className="absolute h-2 w-2 rounded-full bg-orbit-soft/80"
          style={{ left: cx - rings[2] + 3, top: cy - 3 }}
        />
      </div>
    </div>
  );
}
