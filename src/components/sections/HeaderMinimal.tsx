import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface HeaderMinimalProps {
  logo: React.ReactNode;
  phone?: { number: string; display: string };
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export function HeaderMinimal({
  logo,
  phone,
  ctaText = "Get a Free Quote",
  ctaHref = "#lead-form",
  className = "",
}: HeaderMinimalProps) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-[var(--bg)]/95 backdrop-blur-md border-b border-white/5 ${className}`}
    >
      <Container className="flex items-center justify-between h-[72px]">
        <div className="flex-shrink-0">{logo}</div>
        <div className="flex items-center gap-4">
          {phone && (
            <a
              href={`tel:${phone.number}`}
              className="hidden sm:flex items-center gap-2 text-[var(--text)] opacity-80 hover:opacity-100 transition-opacity font-medium"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {phone.display}
            </a>
          )}
          <Button variant="primary" size="sm" href={ctaHref}>
            {ctaText}
          </Button>
        </div>
      </Container>
    </header>
  );
}
