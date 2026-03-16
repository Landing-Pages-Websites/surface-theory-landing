"use client";

import React from "react";
import { Counter } from "../ui/Counter";
import { Reveal } from "../ui/Reveal";

interface Stat {
  value: number;
  suffix?: string;
  decimal?: string;
  label: string;
}

interface StatsRowProps {
  stats: Stat[];
  className?: string;
}

export function StatsRow({ stats, className = "" }: StatsRowProps) {
  return (
    <Reveal>
      <div
        className={`grid grid-cols-${stats.length} max-md:grid-cols-1 border border-[var(--border)] my-12 ${className}`}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`p-[clamp(32px,4vw,56px)] text-center ${
              i < stats.length - 1
                ? "border-r border-[var(--border)] max-md:border-r-0 max-md:border-b max-md:border-[var(--border)]"
                : ""
            }`}
          >
            <span className="font-[family-name:var(--font-display)] text-[clamp(48px,8vw,96px)] leading-none text-[var(--accent)]">
              <Counter target={stat.value} />
              {stat.decimal && (
                <span className="font-[family-name:var(--font-display)] text-[clamp(36px,6vw,72px)] text-[var(--accent)]">
                  {stat.decimal}
                </span>
              )}
              {stat.suffix && (
                <span className="font-[family-name:var(--font-display)] text-[clamp(36px,6vw,72px)] text-[var(--accent)]">
                  {stat.suffix}
                </span>
              )}
            </span>
            <span className="block text-[13px] font-semibold tracking-[0.15em] uppercase opacity-50 mt-2">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
