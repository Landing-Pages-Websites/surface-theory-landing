import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeadline } from "@/components/ui/SectionHeadline";
import { Reveal } from "@/components/ui/Reveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

interface BentoItem {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  image?: string;
  number?: string;
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
  accent?: boolean;
}

interface BentoGridProps {
  eyebrow?: string;
  headline: string;
  items: BentoItem[];
  id?: string;
  dark?: boolean;
}

export function BentoGrid({
  eyebrow,
  headline,
  items,
  id = "bento",
  dark = false,
}: BentoGridProps) {
  return (
    <SectionWrapper id={id} dark={dark}>
      <Container>
        {eyebrow && <SectionEyebrow text={eyebrow} />}
        <SectionHeadline text={headline} />
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            {items.map((item, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-400 ease-[var(--ease-out)] p-[clamp(24px,3vw,40px)] ${
                  item.colSpan === 2 ? "md:col-span-2" : ""
                } ${item.rowSpan === 2 ? "md:row-span-2" : ""} ${
                  item.accent
                    ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                    : dark
                      ? "border-[var(--border)] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)]"
                      : "border-[var(--border-dark)] bg-white hover:shadow-lg"
                }`}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-400"
                  />
                )}
                <div className="relative z-[1] h-full flex flex-col justify-end">
                  {item.number && (
                    <span className="font-[family-name:var(--font-display)] text-[clamp(48px,6vw,72px)] leading-none tracking-tight opacity-20 mb-4">
                      {item.number}
                    </span>
                  )}
                  {item.icon && (
                    <div className="text-[var(--accent)] text-3xl mb-4">
                      {item.icon}
                    </div>
                  )}
                  <h3 className="font-[family-name:var(--font-display)] text-[clamp(18px,2vw,24px)] tracking-[0.02em] uppercase mb-2 leading-tight">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm leading-relaxed opacity-70">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </SectionWrapper>
  );
}
