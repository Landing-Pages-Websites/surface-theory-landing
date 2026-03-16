// @ts-nocheck
'use client'

import { Container } from "@/components/ui/Container"
import { LucideIcon } from "lucide-react"
import * as Icons from "lucide-react"

interface Feature {
  icon?: string
  title: string
  description: string
}

interface FeaturesGridProps {
  title?: string
  subtitle?: string
  features: Feature[]
  columns?: 2 | 3 | 4
  variant?: 'cards' | 'flat' | 'bordered'
  className?: string
}

/**
 * FeaturesGrid - Grid of feature cards with icons
 *
 * Tags: #features #grid #cards #icons #saas #startup #services
 *
 * Features:
 * - 2, 3, or 4 column responsive grid
 * - Dynamic lucide-react icon rendering by name
 * - Three visual variants (cards, flat, bordered)
 * - Hover effects on cards
 */
export function FeaturesGrid({
  title = 'Our Features',
  subtitle,
  features,
  columns = 3,
  variant = 'cards',
  className = '',
}: FeaturesGridProps) {
  const colClasses = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-2 lg:grid-cols-3', 4: 'md:grid-cols-2 lg:grid-cols-4' }

  const getIcon = (name?: string) => {
    if (!name) return null
    const Icon = (Icons as unknown as Record<string, LucideIcon>)[name]
    return Icon ? <Icon className="w-8 h-8 text-[var(--primary)]" /> : null
  }

  const cardClasses = {
    cards: 'bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300',
    flat: 'p-6',
    bordered: 'border border-gray-200 dark:border-gray-700 rounded-xl p-8 hover:border-[var(--primary)] transition-colors duration-300',
  }

  return (
    <section className={`py-16 md:py-24 bg-gray-50 dark:bg-gray-900 ${className}`}>
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>
        <div className={`grid grid-cols-1 ${colClasses[columns]} gap-8`}>
          {features.map((f, i) => (
            <div key={i} className={cardClasses[variant]}>
              {f.icon && <div className="mb-4 w-14 h-14 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">{getIcon(f.icon)}</div>}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
