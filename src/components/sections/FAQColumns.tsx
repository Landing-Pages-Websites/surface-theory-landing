// @ts-nocheck
'use client'

import { Container } from "@/components/ui/Container"

interface FAQItem {
  question: string
  answer: string
}

interface FAQColumnsProps {
  title?: string
  subtitle?: string
  faqs: FAQItem[]
  variant?: 'default' | 'cards' | 'accordion'
  className?: string
}

/**
 * FAQColumns - Two-column FAQ layout
 *
 * Tags: #faq #columns #two-column #questions #answers #support
 *
 * Features:
 * - Two-column layout on desktop
 * - Three visual variants
 * - Responsive stacking on mobile
 */
export function FAQColumns({
  title = 'Frequently Asked Questions',
  subtitle,
  faqs,
  variant = 'default',
  className = '',
}: FAQColumnsProps) {
  const mid = Math.ceil(faqs.length / 2)
  const left = faqs.slice(0, mid)
  const right = faqs.slice(mid)

  const renderFAQ = (faq: FAQItem, i: number) => {
    if (variant === 'accordion') {
      return (
        <details key={i} className="group border border-gray-200 dark:border-gray-700 rounded-lg">
          <summary className="cursor-pointer px-5 py-4 font-medium text-gray-900 dark:text-white">{faq.question}</summary>
          <p className="px-5 pb-4 text-gray-600 dark:text-gray-300">{faq.answer}</p>
        </details>
      )
    }
    return (
      <div key={i} className={variant === 'cards' ? 'bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm' : ''}>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
      </div>
    )
  }

  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="space-y-6">{left.map(renderFAQ)}</div>
          <div className="space-y-6">{right.map((f, i) => renderFAQ(f, i + mid))}</div>
        </div>
      </Container>
    </section>
  )
}
