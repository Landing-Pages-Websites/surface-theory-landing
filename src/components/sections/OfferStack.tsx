import React from "react";
import { Reveal } from "../ui/Reveal";

interface OfferItem {
  title: string;
  description: string;
}

interface OfferStackProps {
  title: string;
  label?: string;
  items: OfferItem[];
  dark?: boolean;
  className?: string;
}

export function OfferStack({
  title,
  label = "INCLUDED",
  items,
  dark = true,
  className = "",
}: OfferStackProps) {
  return (
    <Reveal>
      <div
        className={`border p-[clamp(32px,4vw,56px)] relative ${
          dark ? "border-[var(--border)]" : "border-[var(--border-dark)]"
        } ${className}`}
      >
        <span
          className={`absolute -top-2.5 left-8 text-[11px] font-bold tracking-[0.15em] px-3 text-[var(--accent)] ${
            dark ? "bg-[var(--bg)]" : "bg-[var(--text)]"
          }`}
        >
          {label}
        </span>
        <h3 className="font-[family-name:var(--font-display)] text-[clamp(28px,4vw,40px)] tracking-[0.02em] uppercase mb-8">
          {title}
        </h3>
        <Reveal stagger>
          <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-6">
            {items.map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="w-7 h-7 flex items-center justify-center bg-[var(--accent)] text-[var(--text)] text-sm font-bold shrink-0 mt-0.5">
                  &#10003;
                </span>
                <div>
                  <strong className="block text-base font-semibold mb-1">
                    {item.title}
                  </strong>
                  <p className="text-sm opacity-60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Reveal>
  );
}
