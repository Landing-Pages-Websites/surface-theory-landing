import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeadline } from "@/components/ui/SectionHeadline";
import { Reveal } from "@/components/ui/Reveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

interface WallTestimonial {
  quote: string;
  name: string;
  role?: string;
  avatar?: string;
  rating?: number;
}

interface TestimonialWallProps {
  eyebrow?: string;
  headline: string;
  testimonials: WallTestimonial[];
  columns?: 2 | 3 | 4;
  id?: string;
  dark?: boolean;
}

export function TestimonialWall({
  eyebrow,
  headline,
  testimonials,
  columns = 3,
  id = "testimonial-wall",
  dark = true,
}: TestimonialWallProps) {
  // Distribute into columns for masonry effect
  const cols: WallTestimonial[][] = Array.from({ length: columns }, () => []);
  testimonials.forEach((t, i) => cols[i % columns].push(t));

  return (
    <SectionWrapper id={id} dark={dark}>
      <Container>
        {eyebrow && <SectionEyebrow text={eyebrow} />}
        <SectionHeadline text={headline} />
        <Reveal>
          <div
            className={`grid gap-4 mt-12 grid-cols-1 ${
              columns === 4
                ? "md:grid-cols-2 lg:grid-cols-4"
                : columns === 3
                  ? "md:grid-cols-2 lg:grid-cols-3"
                  : "md:grid-cols-2"
            }`}
          >
            {cols.map((col, ci) => (
              <div key={ci} className="flex flex-col gap-4">
                {col.map((t, ti) => (
                  <div
                    key={ti}
                    className={`rounded-xl p-5 border transition-all duration-300 hover:-translate-y-1 ${
                      dark
                        ? "border-[var(--border)] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)]"
                        : "border-[var(--border-dark)] bg-white hover:shadow-lg"
                    }`}
                  >
                    {t.rating && (
                      <div className="flex gap-0.5 mb-2">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <span key={i} className="text-yellow-400 text-xs">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-sm leading-relaxed opacity-90 mb-3">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-2">
                      {t.avatar ? (
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-[10px] font-bold">
                          {t.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-semibold">{t.name}</p>
                        {t.role && (
                          <p className="text-[10px] opacity-50">{t.role}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </SectionWrapper>
  );
}
