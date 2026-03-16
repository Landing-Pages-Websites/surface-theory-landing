import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeadline } from "@/components/ui/SectionHeadline";
import { Reveal } from "@/components/ui/Reveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

interface ShowcaseItem {
  image: string;
  title: string;
  description?: string;
  href?: string;
  tag?: string;
}

interface ShowcaseProps {
  eyebrow?: string;
  headline: string;
  items: ShowcaseItem[];
  columns?: 2 | 3;
  id?: string;
  dark?: boolean;
}

export function Showcase({
  eyebrow,
  headline,
  items,
  columns = 3,
  id = "showcase",
  dark = false,
}: ShowcaseProps) {
  const Tag = ({ item }: { item: ShowcaseItem }) => {
    const inner = (
      <div className="group relative overflow-hidden rounded-xl border border-[var(--border)] transition-all duration-400 hover:shadow-xl">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-5">
          {item.tag && (
            <span className="inline-block text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--accent)] mb-2">
              {item.tag}
            </span>
          )}
          <h3 className="font-[family-name:var(--font-display)] text-lg tracking-[0.02em] uppercase mb-1 leading-tight">
            {item.title}
          </h3>
          {item.description && (
            <p className="text-sm leading-relaxed opacity-70">
              {item.description}
            </p>
          )}
        </div>
        <div className="absolute inset-0 bg-[var(--accent)] opacity-0 group-hover:opacity-5 transition-opacity duration-400" />
      </div>
    );
    if (item.href) {
      return (
        <a href={item.href} target="_blank" rel="noopener noreferrer">
          {inner}
        </a>
      );
    }
    return inner;
  };

  return (
    <SectionWrapper id={id} dark={dark}>
      <Container>
        {eyebrow && <SectionEyebrow text={eyebrow} />}
        <SectionHeadline text={headline} />
        <Reveal>
          <div
            className={`grid grid-cols-1 gap-6 mt-12 ${
              columns === 3
                ? "md:grid-cols-2 lg:grid-cols-3"
                : "md:grid-cols-2"
            }`}
          >
            {items.map((item, i) => (
              <Tag key={i} item={item} />
            ))}
          </div>
        </Reveal>
      </Container>
    </SectionWrapper>
  );
}
