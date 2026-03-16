"use client"

import { useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { motion, useInView } from 'motion/react'

interface ValueItem {
  name: string
  value: number
}

interface ValueStackProps {
  headline?: string
  subheadline?: string
  items: ValueItem[]
  totalValue?: number
  yourPrice: number
  ctaText?: string
  ctaHref?: string
  badge?: string
  currency?: string
  colorScheme?: 'primary' | 'dark' | 'green' | 'gradient'
}

export function ValueStack({
  headline = "Here's Everything You Get",
  subheadline,
  items,
  totalValue,
  yourPrice,
  ctaText = 'Get Started Now',
  ctaHref = '#',
  badge,
  currency = '$',
  colorScheme = 'primary',
}: ValueStackProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const computedTotal = totalValue ?? items.reduce((sum, item) => sum + item.value, 0)
  const savings = computedTotal - yourPrice
  const savingsPercent = Math.round((savings / computedTotal) * 100)
  const computedBadge = badge ?? `Save ${savingsPercent}%!`

  const schemes = {
    primary: {
      card: 'bg-white border-gray-200',
      accent: 'text-[var(--color-primary,#3B82F6)]',
      accentBg: 'bg-[var(--color-primary,#3B82F6)]',
      priceBg: 'bg-[var(--color-primary,#3B82F6)]/10',
      badge: 'bg-[var(--color-primary,#3B82F6)] text-white',
      button: 'bg-[var(--color-primary,#3B82F6)] hover:bg-[var(--color-primary-dark,#2563EB)] text-white',
    },
    dark: {
      card: 'bg-[#1E293B] border-[#334155]',
      accent: 'text-[#22D3EE]',
      accentBg: 'bg-[#22D3EE]',
      priceBg: 'bg-[#22D3EE]/10',
      badge: 'bg-[#22D3EE] text-[#0F172A]',
      button: 'bg-[#22D3EE] hover:bg-[#06B6D4] text-[#0F172A]',
    },
    green: {
      card: 'bg-white border-gray-200',
      accent: 'text-[#16A34A]',
      accentBg: 'bg-[#16A34A]',
      priceBg: 'bg-[#16A34A]/10',
      badge: 'bg-[#16A34A] text-white',
      button: 'bg-[#16A34A] hover:bg-[#15803D] text-white',
    },
    gradient: {
      card: 'bg-white border-gray-200',
      accent: 'text-[#7C3AED]',
      accentBg: 'bg-gradient-to-r from-[#7C3AED] to-[#EC4899]',
      priceBg: 'bg-[#7C3AED]/10',
      badge: 'bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white',
      button: 'bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:opacity-90 text-white',
    },
  }

  const s = schemes[colorScheme]
  const sectionBg = colorScheme === 'dark' ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'
  const headlineColor = colorScheme === 'dark' ? 'text-white' : 'text-[#0F172A]'
  const textColor = colorScheme === 'dark' ? 'text-white/70' : 'text-[#64748B]'

  return (
    <section className={`py-16 lg:py-24 ${sectionBg}`}>
      <Container className="max-w-2xl">
        <div className="text-center mb-10">
          {headline && (
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black ${headlineColor}`}>{headline}</h2>
          )}
          {subheadline && <p className={`mt-4 text-lg ${textColor}`}>{subheadline}</p>}
        </div>

        <div ref={ref}>
          <div className={`rounded-2xl border ${s.card} shadow-xl overflow-hidden`}>
            {computedBadge && (
              <div className={`${s.badge} text-center py-2.5 font-bold text-sm tracking-wide`}>
                🔥 {computedBadge}
              </div>
            )}

            <div className="divide-y divide-gray-100">
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex items-center justify-between px-6 sm:px-8 py-4"
                >
                  <div className="flex items-center gap-3">
                    <svg className={`w-5 h-5 ${s.accent} flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className={`font-medium ${colorScheme === 'dark' ? 'text-white' : 'text-[#1E293B]'}`}>
                      {item.name}
                    </span>
                  </div>
                  <span className={`font-semibold ${textColor}`}>
                    {currency}{item.value.toLocaleString()} value
                  </span>
                </motion.div>
              ))}
            </div>

            <div className={`px-6 sm:px-8 py-6 ${s.priceBg}`}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: items.length * 0.08 + 0.2, duration: 0.5 }}
                className="flex items-center justify-between mb-4"
              >
                <span className={`font-semibold ${textColor}`}>Total Value:</span>
                <span className="relative">
                  <span className={`text-xl font-bold ${textColor}`}>
                    {currency}{computedTotal.toLocaleString()}
                  </span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ delay: items.length * 0.08 + 0.5, duration: 0.4 }}
                    className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-500 origin-left"
                    aria-hidden="true"
                  />
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: items.length * 0.08 + 0.7, type: 'spring', stiffness: 200 }}
                className="flex items-center justify-between"
              >
                <span className={`text-lg font-bold ${colorScheme === 'dark' ? 'text-white' : 'text-[#0F172A]'}`}>
                  Your Price:
                </span>
                <span className={`text-4xl sm:text-5xl font-black ${s.accent}`}>
                  {currency}{yourPrice.toLocaleString()}
                </span>
              </motion.div>
            </div>

            <div className="px-6 sm:px-8 pb-8 pt-4">
              <a
                href={ctaHref}
                className={`block w-full text-center px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${s.button}`}
              >
                {ctaText}
              </a>
              <p className={`text-center text-sm mt-3 ${textColor}`}>
                You save {currency}{savings.toLocaleString()} today
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
