"use client"

import { useEffect, useRef, useState } from 'react'
import { Container } from '@/components/ui/Container'

interface CounterStat {
  value: number
  suffix?: string
  prefix?: string
  label: string
}

interface CounterStatsProps {
  eyebrow?: string
  headline?: string
  subtext?: string
  stats: CounterStat[]
  duration?: number
  colorScheme?: 'treact-purple' | 'medical-blue' | 'legal-navy' | 'hvac-orange' | 'clean-dark'
}

function AnimatedCounter({ value, suffix = '', prefix = '', duration = 2000 }: { value: number; suffix?: string; prefix?: string; duration: number }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const start = performance.now()
          const animate = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * value))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration, hasAnimated])

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

export function CounterStats({
  eyebrow,
  headline,
  subtext,
  stats,
  duration = 2000,
  colorScheme = 'clean-dark'
}: CounterStatsProps) {
  const schemes = {
    'treact-purple': { bg: 'bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A855F7]', eyebrow: 'text-white/60', headline: 'text-white', subtext: 'text-white/80', value: 'text-white', label: 'text-white/70' },
    'medical-blue': { bg: 'bg-gradient-to-r from-[#0EA5E9] via-[#0284C7] to-[#0369A1]', eyebrow: 'text-white/60', headline: 'text-white', subtext: 'text-white/80', value: 'text-white', label: 'text-white/70' },
    'legal-navy': { bg: 'bg-gradient-to-r from-[#1E3A8A] via-[#1E40AF] to-[#312E81]', eyebrow: 'text-white/60', headline: 'text-white', subtext: 'text-white/80', value: 'text-white', label: 'text-white/70' },
    'hvac-orange': { bg: 'bg-gradient-to-r from-[#EA580C] via-[#DC2626] to-[#B91C1C]', eyebrow: 'text-white/60', headline: 'text-white', subtext: 'text-white/80', value: 'text-white', label: 'text-white/70' },
    'clean-dark': { bg: 'bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#334155]', eyebrow: 'text-white/50', headline: 'text-white', subtext: 'text-white/70', value: 'text-white', label: 'text-white/60' },
  }

  const scheme = schemes[colorScheme]

  return (
    <section className={`py-20 lg:py-28 ${scheme.bg}`}>
      <Container>
        {(headline || eyebrow) && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            {eyebrow && <span className={`inline-block text-sm font-semibold tracking-wide uppercase mb-4 ${scheme.eyebrow}`}>{eyebrow}</span>}
            {headline && <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${scheme.headline}`}>{headline}</h2>}
            {subtext && <p className={`text-lg md:text-xl leading-relaxed ${scheme.subtext}`}>{subtext}</p>}
          </div>
        )}

        <div className={`grid grid-cols-2 lg:grid-cols-${Math.min(stats.length, 4)} gap-8 lg:gap-12`}>
          {stats.map((stat, i) => (
            <div key={i} className="text-center space-y-2">
              <div className={`text-4xl md:text-5xl lg:text-6xl font-black tabular-nums ${scheme.value}`}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} duration={duration} />
              </div>
              <div className={`text-sm md:text-base font-medium ${scheme.label}`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
