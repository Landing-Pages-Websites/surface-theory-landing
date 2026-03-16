import React from "react";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  children,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  className = "",
}: MarqueeProps) {
  const animDir = direction === "left" ? "normal" : "reverse";

  return (
    <div
      className={`w-full overflow-hidden py-6 ${className}`}
      style={
        {
          "--marquee-speed": `${speed}s`,
          "--marquee-dir": animDir,
        } as React.CSSProperties
      }
    >
      <div
        className={`flex w-max ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        style={{
          animation: `marquee-scroll var(--marquee-speed) linear infinite`,
          animationDirection: animDir,
        }}
      >
        <div className="flex items-center gap-8 shrink-0">{children}</div>
        <div className="flex items-center gap-8 shrink-0" aria-hidden="true">
          {children}
        </div>
        <div className="flex items-center gap-8 shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
