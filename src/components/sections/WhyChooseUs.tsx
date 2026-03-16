"use client";

import React from "react";
import { Container } from "../ui/Container";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import { SectionHeadline } from "../ui/SectionHeadline";
import { DualCTA } from "../ui/DualCTA";
import { StatsRow } from "./StatsRow";
import { OfferStack } from "./OfferStack";
import { SectionWrapper } from "../ui/SectionWrapper";

interface Stat {
  value: number;
  suffix?: string;
  decimal?: string;
  label: string;
}

interface OfferItem {
  title: string;
  description: string;
}

interface WhyChooseUsProps {
  eyebrow: string;
  headline: string;
  description: string;
  stats: Stat[];
  offerTitle: string;
  offerItems: OfferItem[];
  primaryCTA: { text: string; href: string };
  phoneCTA: { text: string; href: string };
  id?: string;
  dark?: boolean;
}

export function WhyChooseUs({
  eyebrow,
  headline,
  description,
  stats,
  offerTitle,
  offerItems,
  primaryCTA,
  phoneCTA,
  id = "expertise",
  dark = true,
}: WhyChooseUsProps) {
  return (
    <SectionWrapper id={id} dark={dark}>
      <Container>
        <SectionEyebrow text={eyebrow} />
        <SectionHeadline text={headline} />
        <p className="text-lg leading-relaxed max-w-[640px] opacity-80 mb-12">
          {description}
        </p>
        <StatsRow stats={stats} />
        <OfferStack title={offerTitle} items={offerItems} dark={dark} />
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
