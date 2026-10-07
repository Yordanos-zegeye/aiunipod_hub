import { Sparkles } from "lucide-react";

export function DynamicMarquee() {
  const items = [
    "BUILD IN ETHIOPIA",
    "THINK FOR AFRICA",
    "SCALE TO THE WORLD",
    "BUILD IN ETHIOPIA",
    "THINK FOR AFRICA",
    "SCALE TO THE WORLD",
    "BUILD IN ETHIOPIA",
    "THINK FOR AFRICA",
    "SCALE TO THE WORLD",
  ];

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="marquee-shell relative z-10" aria-hidden="true">
        <div className="marquee-track">
          {/* Group 1 */}
          <div className="marquee-group flex items-center shrink-0">
            {items.map((item, index) => (
              <span key={`g1-${item}-${index}`} className="marquee-item inline-flex items-center">
                <Sparkles className="size-4 shrink-0 opacity-85" />
                <span>{item}</span>
              </span>
            ))}
          </div>
          {/* Group 2 (Exact identical duplicate for seamless 60/120fps infinite loop) */}
          <div className="marquee-group flex items-center shrink-0" aria-hidden="true">
            {items.map((item, index) => (
              <span key={`g2-${item}-${index}`} className="marquee-item inline-flex items-center">
                <Sparkles className="size-4 shrink-0 opacity-85" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
