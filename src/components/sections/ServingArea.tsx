import React from "react";
import { Reveal } from "../ui/Reveal";

interface ServingAreaProps {
  locationTitle: string;
  locationDescription: string;
  hours: string[];
  className?: string;
}

export function ServingArea({
  locationTitle,
  locationDescription,
  hours,
  className = "",
}: ServingAreaProps) {
  return (
    <Reveal>
      <div
        className={`grid grid-cols-2 max-md:grid-cols-1 gap-10 border-t border-[var(--border)] pt-10 mt-16 ${className}`}
      >
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-[clamp(24px,3vw,32px)] tracking-[0.02em] uppercase mb-2">
            {locationTitle}
          </h3>
          <p className="opacity-60 text-[15px]">{locationDescription}</p>
        </div>
        <div>
          {hours.map((line, i) => (
            <p key={i} className="text-sm opacity-70 leading-[1.8]">
              {line}
            </p>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
