// @ts-nocheck
'use client'

import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"

interface CTAGradientProps {
  headline: string
  description?: string
  primaryCta?: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
  gradient?: string
  variant?: 'default' | 'angled' | 'radial'
  className?: string
}

/**
 * CTAGradient - Full-width gradient background CTA
 *
 * Tags: #cta #gradient #conversion #action #banner
 *
 * Features:
 * - Customizable gradient colors
 * - Three gradient styles
 * - Dual CTA buttons
 * - Bold, attention-grabbing design
 */
export function CTAGradient({
  headline,
  description,
  primaryCta,
  secondaryCta,
  gradient,
  variant = 'default',
  className = '',
}: CTAGradientProps) {
  const gradientClasses = {
    default: gradient || 'bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)]',
    angled: gradient || 'bg-gradient-to-br from-[var(--primary)] via-purple-600 to-[var(--primary-light)]',
    radial: '',
  }

  return (
    <section className={`py-20 md:py-28 ${gradientClasses[variant]} relative overflow-hidden ${className}`} style={variant === 'radial' ? { background: gradient || 'radial-gradient(ellipse at center, var(--primary-light), var(--primary))' } : undefined}>
      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">{headline}</h2>
          {description && <p className="text-xl text-white/80 mb-10">{description}</p>}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryCta && <Button size="lg" href={primaryCta.href} className="bg-white text-gray-900 hover:bg-gray-100">{primaryCta.text}</Button>}
            {secondaryCta && <Button variant="outline" size="lg" href={secondaryCta.href} className="border-white text-white hover:bg-white/10">{secondaryCta.text}</Button>}
          </div>
        </div>
      </Container>
    </section>
  )
}
