import React from "react";
import { Button } from "./Button";

interface DualCTAProps {
  primaryText: string;
  primaryHref: string;
  phoneText: string;
  phoneHref: string;
  center?: boolean;
  lightSection?: boolean;
  className?: string;
}

export function DualCTA({
  primaryText,
  primaryHref,
  phoneText,
  phoneHref,
  center = false,
  lightSection = false,
  className = "",
}: DualCTAProps) {
  return (
    <div
      className={`flex gap-4 flex-wrap mt-[60px] max-md:flex-col ${center ? "justify-center" : ""} ${className}`}
    >
      <Button variant="primary" size="lg" href={primaryHref} data-track="cta_click">
        {primaryText}
      </Button>
      <Button
        variant={lightSection ? "outline-dark" : "outline"}
        size="lg"
        href={phoneHref}
        data-track="phone_click"
        className="max-md:w-full max-md:text-center"
      >
        {phoneText}
      </Button>
    </div>
  );
}
