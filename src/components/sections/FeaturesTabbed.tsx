// @ts-nocheck
'use client'

import { useState } from "react"
import Image from "next/image"
import { Container } from "@/components/ui/Container"

interface TabFeature {
  tab: string
  title: string
  description: string
  imageSrc?: string
  imageAlt?: string
  bullets?: string[]
}

interface FeaturesTabbedProps {
  title?: string
  subtitle?: string
  tabs: TabFeature[]
  variant?: 'default' | 'pills' | 'underline'
  className?: string
}

/**
 * FeaturesTabbed - Tabbed interface showing different feature sets
 *
 * Tags: #features #tabs #interactive #saas #product #showcase
 *
 * Features:
 * - Interactive tab switching
 * - Three tab style variants
 * - Image + bullet points per tab
 * - Responsive design
 */
export function FeaturesTabbed({
  title = 'Features',
  subtitle,
  tabs,
  variant = 'default',
  className = '',
}: FeaturesTabbedProps) {
  const [active, setActive] = useState(0)

  const tabStyles = {
    default: (isActive: boolean) => `px-6 py-3 rounded-lg font-medium transition-all ${isActive ? 'bg-[var(--primary)] text-white shadow-md' : 'text-gray-600 hover:text-gray-900 dark:text-gray-400'}`,
    pills: (isActive: boolean) => `px-6 py-2 rounded-full font-medium transition-all ${isActive ? 'bg-[var(--primary)] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`,
    underline: (isActive: boolean) => `px-6 py-3 font-medium border-b-2 transition-all ${isActive ? 'border-[var(--primary)] text-[var(--primary)]' : 'border-transparent text-gray-600 hover:text-gray-900'}`,
  }

  const current = tabs[active]

  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((t, i) => (
            <button key={i} onClick={() => setActive(i)} className={tabStyles[variant](i === active)}>
              {t.tab}
            </button>
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">{current.title}</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{current.description}</p>
            {current.bullets && (
              <ul className="space-y-3">
                {current.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {current.imageSrc && (
            <Image src={current.imageSrc} alt={current.imageAlt || current.title} width={600} height={400} className="w-full rounded-2xl shadow-lg object-cover" />
          )}
        </div>
      </Container>
    </section>
  )
}
