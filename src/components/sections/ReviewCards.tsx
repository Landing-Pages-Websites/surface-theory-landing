import React from "react";
import { Container } from "../ui/Container";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import { SectionHeadline } from "../ui/SectionHeadline";
import { DualCTA } from "../ui/DualCTA";
import { Reveal } from "../ui/Reveal";
import { SectionWrapper } from "../ui/SectionWrapper";

interface Review {
  text: string;
  author: string;
  location?: string;
  stars?: number;
}

interface ReviewCardsProps {
  eyebrow: string;
  headline: string;
  reviews: Review[];
  primaryCTA: { text: string; href: string };
  phoneCTA: { text: string; href: string };
  id?: string;
  dark?: boolean;
}

export function ReviewCards({
  eyebrow,
  headline,
  reviews,
  primaryCTA,
  phoneCTA,
  id = "reviews",
  dark = false,
}: ReviewCardsProps) {
  return (
    <SectionWrapper id={id} dark={dark}>
      <Container>
        <SectionEyebrow text={eyebrow} />
        <SectionHeadline text={headline} />
        <Reveal stagger>
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6 mt-12">
            {reviews.map((review, i) => (
              <div
                key={i}
                className={`p-8 border ${dark ? "border-[var(--border)] bg-[var(--surface)]" : "border-[var(--border-dark)]"}`}
              >
                <div className="text-[var(--accent)] text-xl tracking-[2px] mb-4">
                  {Array.from({ length: review.stars || 5 }).map((_, j) => (
                    <span key={j}>&#9733;</span>
                  ))}
                </div>
                <p className="text-[15px] leading-relaxed opacity-80 mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--accent)] text-[var(--text)] flex items-center justify-center font-semibold text-sm">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{review.author}</div>
                    {review.location && (
                      <div className="text-xs opacity-50">{review.location}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <DualCTA
          primaryText={primaryCTA.text}
          primaryHref={primaryCTA.href}
          phoneText={phoneCTA.text}
          phoneHref={phoneCTA.href}
          lightSection={!dark}
        />
      </Container>
    </SectionWrapper>
  );
}
