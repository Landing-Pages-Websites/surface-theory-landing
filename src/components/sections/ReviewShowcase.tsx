import React from "react";
import { Container } from "../ui/Container";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import { SectionHeadline } from "../ui/SectionHeadline";
import { DualCTA } from "../ui/DualCTA";
import { Reveal } from "../ui/Reveal";
import { SectionWrapper } from "../ui/SectionWrapper";

interface ReviewShowcaseProps {
  eyebrow: string;
  headline: string;
  rating: string;
  starCount?: number;
  reviewCount: string;
  testimonialText: string;
  attribution?: string;
  primaryCTA: { text: string; href: string };
  phoneCTA: { text: string; href: string };
  id?: string;
  dark?: boolean;
}

export function ReviewShowcase({
  eyebrow,
  headline,
  rating,
  starCount = 5,
  reviewCount,
  testimonialText,
  attribution,
  primaryCTA,
  phoneCTA,
  id = "testimonials",
  dark = false,
}: ReviewShowcaseProps) {
  return (
    <SectionWrapper id={id} dark={dark}>
      <Container>
        <SectionEyebrow text={eyebrow} />
        <SectionHeadline text={headline} />
        <Reveal>
          <div className="text-center max-w-[700px] mx-auto mt-12">
            <div className="mb-8">
              <span className="font-[family-name:var(--font-display)] text-[clamp(80px,15vw,160px)] leading-[0.9] block">
                {rating}
              </span>
              <div className="text-[32px] text-[var(--accent)] tracking-[4px] my-2">
                {Array.from({ length: starCount }).map((_, i) => (
                  <span key={i}>&#9733;</span>
                ))}
              </div>
              <span className="text-sm font-semibold tracking-[0.1em] uppercase opacity-60">
                {reviewCount}
              </span>
            </div>
            <p className="text-[clamp(18px,2.5vw,24px)] leading-relaxed font-medium relative pt-8 before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[60px] before:h-[2px] before:bg-[var(--accent)]">
              {testimonialText}
            </p>
            {attribution && (
              <p className="mt-6 text-[15px] opacity-70 italic">{attribution}</p>
            )}
          </div>
        </Reveal>
        <DualCTA
          primaryText={primaryCTA.text}
          primaryHref={primaryCTA.href}
          phoneText={phoneCTA.text}
          phoneHref={phoneCTA.href}
          center
          lightSection={!dark}
        />
      </Container>
    </SectionWrapper>
  );
}
