import React from "react";
import { Container } from "../ui/Container";
import { SectionEyebrow } from "../ui/SectionEyebrow";
import { SectionHeadline } from "../ui/SectionHeadline";
import { DualCTA } from "../ui/DualCTA";
import { Reveal } from "../ui/Reveal";
import { SectionWrapper } from "../ui/SectionWrapper";

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryGridProps {
  eyebrow: string;
  headline: string;
  description?: string;
  images: GalleryImage[];
  primaryCTA: { text: string; href: string };
  phoneCTA: { text: string; href: string };
  id?: string;
  dark?: boolean;
}

export function GalleryGrid({
  eyebrow,
  headline,
  description,
  images,
  primaryCTA,
  phoneCTA,
  id = "gallery",
  dark = true,
}: GalleryGridProps) {
  return (
    <SectionWrapper id={id} dark={dark}>
      <Container>
        <SectionEyebrow text={eyebrow} />
        <SectionHeadline text={headline} />
        {description && (
          <p className="text-lg leading-relaxed max-w-[640px] opacity-80 mb-12">
            {description}
          </p>
        )}
        <Reveal>
          <div className="grid grid-cols-4 max-md:grid-cols-2 gap-1 mt-12">
            {images.map((img, i) => (
              <div
                key={i}
                className={`relative aspect-[4/3] overflow-hidden group ${
                  i === 0 ? "col-span-2 row-span-2 max-md:col-span-2 max-md:row-span-1" : ""
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover brightness-[0.85] group-hover:scale-[1.08] group-hover:brightness-100 transition-all duration-600 ease-[var(--ease-out)]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.5)] to-transparent group-hover:opacity-0 transition-opacity duration-400 pointer-events-none" />
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
