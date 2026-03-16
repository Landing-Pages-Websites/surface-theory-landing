import React from "react";
import { Container } from "../ui/Container";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import { SectionHeadline } from "../ui/SectionHeadline";
import { DualCTA } from "../ui/DualCTA";
import { Reveal } from "../ui/Reveal";
import { SectionWrapper } from "../ui/SectionWrapper";

interface Feature {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

interface FeaturesAlternatingProps {
  features: Feature[];
  primaryCTA: { text: string; href: string };
  phoneCTA: { text: string; href: string };
  id?: string;
  dark?: boolean;
}

export function FeaturesAlternating({
  features,
  primaryCTA,
  phoneCTA,
  id = "features",
  dark = true,
}: FeaturesAlternatingProps) {
  return (
    <SectionWrapper id={id} dark={dark}>
      <Container>
        <div className="space-y-24">
          {features.map((feature, i) => (
            <Reveal key={i}>
              <div
                className={`grid grid-cols-2 max-md:grid-cols-1 gap-12 items-center ${
                  i % 2 === 1 ? "direction-rtl" : ""
                }`}
                style={{ direction: i % 2 === 1 ? "rtl" : "ltr" }}
              >
                <div style={{ direction: "ltr" }}>
                  <SectionEyebrow text={feature.eyebrow} />
                  <h3 className="font-[family-name:var(--font-display)] text-[clamp(32px,5vw,48px)] leading-[0.95] tracking-[0.02em] uppercase mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-base leading-relaxed opacity-70 max-w-[480px]">
                    {feature.description}
                  </p>
                </div>
                <div style={{ direction: "ltr" }}>
                  <img
                    src={feature.imageSrc}
                    alt={feature.imageAlt}
                    className="w-full aspect-[4/3] object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
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
