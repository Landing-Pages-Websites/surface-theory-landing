"use client";

import React from "react";
import { Reveal } from "./Reveal";

interface ScrollRevealStaggerProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollRevealStagger({ children, className = "" }: ScrollRevealStaggerProps) {
  return (
    <Reveal stagger className={className}>
      {children}
    </Reveal>
  );
}
