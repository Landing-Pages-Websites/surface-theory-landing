// @ts-nocheck
'use client'

import { Container } from "@/components/ui/Container"
import { Button } from "@/components/ui/Button"

interface PricingItem {
  service: string
  price: string
  description?: string
  note?: string
}

interface PricingSimpleProps {
  title?: string
  subtitle?: string
  items: PricingItem[]
  ctaText?: string
  ctaHref?: string
  disclaimer?: string
  variant?: 'list' | 'table' | 'cards'
  className?: string
}

/**
 * PricingSimple - Simple pricing list/table for service businesses
 *
 * Tags: #pricing #simple #list #services #business #rates
 *
 * Features:
 * - Service name + price listing
 * - Optional descriptions
 * - Disclaimer text
 * - Three layout variants
 */
export function PricingSimple({
  title = 'Our Pricing',
  subtitle,
  items,
  ctaText,
  ctaHref,
  disclaimer,
  variant = 'list',
  className = '',
}: PricingSimpleProps) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>
        <div className="max-w-3xl mx-auto">
          {variant === 'cards' ? (
            <div className="grid md:grid-cols-2 gap-6">
              {items.map((item, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 dark:text-white">{item.service}</h3>
                    <span className="text-xl font-bold text-[var(--primary)]">{item.price}</span>
                  </div>
                  {item.description && <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>}
                  {item.note && <p className="text-xs text-gray-400 mt-2">{item.note}</p>}
                </div>
              ))}
            </div>
          ) : variant === 'table' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 font-semibold text-gray-900 dark:text-white">Service</th>
                    <th className="text-right py-3 font-semibold text-gray-900 dark:text-white">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-4">
                        <p className="font-medium text-gray-900 dark:text-white">{item.service}</p>
                        {item.description && <p className="text-sm text-gray-500 mt-1">{item.description}</p>}
                      </td>
                      <td className="py-4 text-right font-semibold text-[var(--primary)]">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, i) => (
                <div key={i} className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{item.service}</h3>
                    {item.description && <p className="text-sm text-gray-500 mt-1">{item.description}</p>}
                  </div>
                  <span className="text-lg font-bold text-[var(--primary)] ml-4 flex-shrink-0">{item.price}</span>
                </div>
              ))}
            </div>
          )}
          {disclaimer && <p className="text-sm text-gray-500 text-center mt-6">{disclaimer}</p>}
          {ctaText && ctaHref && <div className="text-center mt-8"><Button size="lg" href={ctaHref}>{ctaText}</Button></div>}
        </div>
      </Container>
    </section>
  )
}
