// @ts-nocheck
'use client'

import { Button } from "@/components/ui/Button"
import { Container } from "@/components/ui/Container"

interface HeroMinimalProps {
  headline: string
  description: string
  primaryCta?: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
  variant?: 'default' | 'dark' | 'accent'
  className?: string
}

/**
 * HeroMinimal - Text-only minimal hero with large typography
 *
 * Tags: #hero #minimal #typography #clean #elegant #landing
 *
 * Features:
 * - Large, impactful typography
 * - No images — pure text focus
 * - Three visual variants
 * - Clean whitespace-driven design
 */
export function HeroMinimal({
  headline,
  description,
  primaryCta,
  secondaryCta,
  variant = 'default',
  className = '',
}: HeroMinimalProps) {
  const bgClasses = {
    default: 'bg-white dark:bg-gray-900',
    dark: 'bg-gray-900',
    accent: 'bg-[var(--primary)]',
  }
  const headClasses = {
    default: 'text-gray-900 dark:text-white',
    dark: 'text-white',
    accent: 'text-white',
  }
  const descClasses = {
    default: 'text-gray-600 dark:text-gray-300',
    dark: 'text-gray-400',
    accent: 'text-white/80',
  }

  return (
    <section className={`py-24 md:py-32 lg:py-40 ${bgClasses[variant]} ${className}`}>
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={`text-5xl md:text-6xl lg:text-8xl font-bold leading-[1.1] mb-8 ${headClasses[variant]}`}>
            {headline}
          </h1>
          <p className={`text-xl md:text-2xl leading-relaxed mb-12 max-w-2xl mx-auto ${descClasses[variant]}`}>
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryCta && <Button size="lg" href={primaryCta.href}>{primaryCta.text}</Button>}
            {secondaryCta && <Button variant="outline" size="lg" href={secondaryCta.href}>{secondaryCta.text}</Button>}
          </div>
        </div>
      </Container>
    </section>
  )
}
