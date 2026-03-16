// @ts-nocheck
'use client'

import { Container } from "@/components/ui/Container"
import { LucideIcon } from "lucide-react"
import * as Icons from "lucide-react"

interface StatItem {
  icon?: string
  value: string
  label: string
  description?: string
}

interface StatsWithIconsProps {
  title?: string
  subtitle?: string
  stats: StatItem[]
  columns?: 2 | 3 | 4
  variant?: 'default' | 'cards' | 'inline'
  className?: string
}

/**
 * StatsWithIcons - Stats grid with icons and descriptions
 *
 * Tags: #stats #icons #metrics #numbers #social-proof
 *
 * Features:
 * - Dynamic icon rendering
 * - Optional descriptions per stat
 * - Three visual variants
 * - 2-4 column grid
 */
export function StatsWithIcons({
  title,
  subtitle,
  stats,
  columns = 4,
  variant = 'default',
  className = '',
}: StatsWithIconsProps) {
  const getIcon = (name?: string) => {
    if (!name) return null
    const Icon = (Icons as unknown as Record<string, LucideIcon>)[name]
    return Icon ? <Icon className="w-8 h-8 text-[var(--primary)]" /> : null
  }

  const colClasses = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-2 lg:grid-cols-4' }

  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <Container>
        {title && (
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
            {subtitle && <p className="text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>}
          </div>
        )}
        <div className={`grid grid-cols-1 ${colClasses[columns]} gap-8`}>
          {stats.map((s, i) => (
            <div key={i} className={`${variant === 'cards' ? 'bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md text-center' : variant === 'inline' ? 'flex items-start gap-4' : 'text-center'}`}>
              {s.icon && <div className={variant === 'inline' ? '' : 'flex justify-center mb-4'}>{getIcon(s.icon)}</div>}
              <div>
                <p className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{s.value}</p>
                <p className="text-[var(--primary)] font-medium mt-1">{s.label}</p>
                {s.description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{s.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
