// @ts-nocheck
'use client'

import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"
import { Check, X } from "lucide-react"

interface PricingFeature {
  text: string
  included: boolean
}

interface PricingTier {
  name: string
  price: string
  period?: string
  description?: string
  features: PricingFeature[]
  ctaText?: string
  ctaHref?: string
  highlighted?: boolean
  badge?: string
}

interface PricingTieredProps {
  title?: string
  subtitle?: string
  tiers: PricingTier[]
  variant?: 'default' | 'cards' | 'minimal'
  className?: string
}

/**
 * PricingTiered - 3-tier pricing cards with feature comparison
 *
 * Tags: #pricing #tiers #plans #comparison #conversion #saas
 *
 * Features:
 * - Feature comparison with check/x marks
 * - Highlighted/recommended tier
 * - Badge support (e.g., "Most Popular")
 * - Three visual variants
 */
export function PricingTiered({
  title = 'Pricing Plans',
  subtitle,
  tiers,
  variant = 'default',
  className = '',
}: PricingTieredProps) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <div key={i} className={`relative rounded-2xl p-8 ${tier.highlighted ? 'bg-[var(--primary)] text-white ring-4 ring-[var(--primary)]/20 scale-105' : variant === 'cards' ? 'bg-white dark:bg-gray-800 shadow-lg' : 'border border-gray-200 dark:border-gray-700'}`}>
              {tier.badge && (
                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold ${tier.highlighted ? 'bg-white text-[var(--primary)]' : 'bg-[var(--primary)] text-white'}`}>{tier.badge}</span>
              )}
              <h3 className={`text-xl font-bold mb-2 ${tier.highlighted ? '' : 'text-gray-900 dark:text-white'}`}>{tier.name}</h3>
              {tier.description && <p className={`text-sm mb-4 ${tier.highlighted ? 'text-white/80' : 'text-gray-500'}`}>{tier.description}</p>}
              <div className="mb-6">
                <span className={`text-4xl font-bold ${tier.highlighted ? '' : 'text-gray-900 dark:text-white'}`}>{tier.price}</span>
                {tier.period && <span className={`${tier.highlighted ? 'text-white/70' : 'text-gray-500'}`}>/{tier.period}</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    {f.included ? <Check className={`w-5 h-5 flex-shrink-0 ${tier.highlighted ? 'text-white' : 'text-green-500'}`} /> : <X className={`w-5 h-5 flex-shrink-0 ${tier.highlighted ? 'text-white/40' : 'text-gray-300'}`} />}
                    <span className={!f.included ? (tier.highlighted ? 'text-white/50' : 'text-gray-400 line-through') : ''}>{f.text}</span>
                  </li>
                ))}
              </ul>
              {tier.ctaText && (
                <Button href={tier.ctaHref || '#'} variant={tier.highlighted ? 'secondary' : 'primary'} className="w-full">{tier.ctaText}</Button>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
