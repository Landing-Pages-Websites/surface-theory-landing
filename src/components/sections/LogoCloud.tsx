import React from "react";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";

interface Logo {
  src: string;
  alt: string;
}

interface LogoCloudProps {
  logos: Logo[];
  className?: string;
}

export function LogoCloud({ logos, className = "" }: LogoCloudProps) {
  return (
    <Reveal>
      <Container>
        <div
          className={`flex items-center justify-center gap-12 flex-wrap py-8 opacity-40 ${className}`}
        >
          {logos.map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.alt}
              className="h-8 w-auto grayscale"
              loading="lazy"
            />
          ))}
        </div>
      </Container>
    </Reveal>
  );
}
