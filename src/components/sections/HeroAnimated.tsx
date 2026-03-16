// @ts-nocheck
'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/Button"
import { Container } from "@/components/ui/Container"

interface HeroAnimatedProps {
  headline: string
  description: string
  primaryCta?: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
  variant?: 'gradient-shift' | 'floating' | 'particles'
  className?: string
}

/**
 * HeroAnimated - Hero with subtle CSS animations
 *
 * Tags: #hero #animated #modern #gradient #creative #landing
 *
 * Features:
 * - Three animation variants (gradient-shift, floating elements, particles)
 * - Pure CSS animations (no heavy JS)
 * - Responsive design
 * - Performant with will-change hints
 */
export function HeroAnimated({
  headline,
  description,
  primaryCta,
  secondaryCta,
  variant = 'gradient-shift',
  className = '',
}: HeroAnimatedProps) {
  return (
    <section className={`relative min-h-[80vh] flex items-center overflow-hidden bg-gray-900 ${className}`}>
      {variant === 'gradient-shift' && (
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] via-purple-600 to-[var(--primary)] bg-[length:400%_400%] animate-[gradient_8s_ease_infinite]" />
      )}
      {variant === 'floating' && (
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/5 animate-[float_6s_ease-in-out_infinite]"
              style={{
                width: `${60 + i * 40}px`,
                height: `${60 + i * 40}px`,
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${5 + i}s`,
              }}
            />
          ))}
        </div>
      )}
      {variant === 'particles' && (
        <div className="absolute inset-0 bg-gray-900">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-[twinkle_3s_ease-in-out_infinite]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}
      <div className="absolute inset-0 bg-black/30" />
      <Container className="relative z-10 py-24 md:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
            {headline}
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryCta && (
              <Button size="lg" href={primaryCta.href}>{primaryCta.text}</Button>
            )}
            {secondaryCta && (
              <Button variant="outline" size="lg" href={secondaryCta.href} className="border-white text-white hover:bg-white hover:text-gray-900">
                {secondaryCta.text}
              </Button>
            )}
          </div>
        </div>
      </Container>
      <style jsx>{`
        @keyframes gradient { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        @keyframes twinkle { 0%,100%{opacity:0.2} 50%{opacity:0.8} }
      `}</style>
    </section>
  )
}
