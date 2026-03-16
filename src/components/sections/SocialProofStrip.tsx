import React from "react";
import { Container } from "@/components/ui/Container";

interface SocialProofStripProps {
  avatars: string[];
  text: string;
  rating?: number;
  className?: string;
}

export function SocialProofStrip({
  avatars,
  text,
  rating = 5,
  className = "",
}: SocialProofStripProps) {
  return (
    <div className={`py-6 ${className}`}>
      <Container>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {/* Overlapping avatars */}
          <div className="flex -space-x-3">
            {avatars.slice(0, 5).map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="w-9 h-9 rounded-full border-2 border-[var(--bg)] object-cover"
                loading="lazy"
              />
            ))}
            {avatars.length > 5 && (
              <div className="w-9 h-9 rounded-full border-2 border-[var(--bg)] bg-[var(--accent)] flex items-center justify-center text-white text-[11px] font-bold">
                +{avatars.length - 5}
              </div>
            )}
          </div>
          {/* Stars */}
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.round(rating) ? "text-yellow-400" : "text-[rgba(255,255,255,0.15)]"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm opacity-70">{text}</span>
        </div>
      </Container>
    </div>
  );
}
