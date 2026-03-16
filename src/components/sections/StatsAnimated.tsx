// @ts-nocheck
'use client'

import { useEffect, useState, useRef } from "react"
import { Container } from "@/components/ui/Container"

interface Stat {
  value: number
  suffix?: string
  prefix?: string
  label: string
}

interface StatsAnimatedProps {
  title?: string
  subtitle?: string
  stats: Stat[]
  variant?: 'default' | 'dark' | 'gradient'
  duration?: number
  className?: string
}

/**
 * StatsAnimated - Animated counting stats section
 *
 * Tags: #stats #animated #counting #numbers #social-proof #metrics
 *
 * Features:
 * - Count-up animation on scroll into view
 * - Configurable animation duration
 * - Three visual variants
 * - Prefix/suffix support (%, +, $)
 */
export function StatsAnimated({
  title,
  subtitle,
  stats,
  variant = 'default',
  duration = 2000,
  className = '',
}: StatsAnimatedProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const bgClasses = { default: 'bg-white dark:bg-gray-900', dark: 'bg-gray-900', gradient: 'bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)]' }
  const textClasses = { default: 'text-gray-900 dark:text-white', dark: 'text-white', gradient: 'text-white' }
  const subClasses = { default: 'text-gray-600 dark:text-gray-300', dark: 'text-gray-400', gradient: 'text-white/70' }

  return (
    <section ref={ref} className={`py-16 md:py-24 ${bgClasses[variant]} ${className}`}>
      <Container>
        {title && (
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textClasses[variant]}`}>{title}</h2>
            {subtitle && <p className={`text-lg ${subClasses[variant]}`}>{subtitle}</p>}
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className={`text-4xl md:text-5xl font-bold ${variant === 'default' ? 'text-[var(--primary)]' : 'text-white'}`}>
                {s.prefix}<AnimatedNumber value={s.value} isVisible={isVisible} duration={duration} />{s.suffix}
              </p>
              <p className={`mt-2 ${subClasses[variant]}`}>{s.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function AnimatedNumber({ value, isVisible, duration }: { value: number; isVisible: boolean; duration: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    let start = 0
    const increment = value / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= value) { setCount(value); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [isVisible, value, duration])

  return <>{count.toLocaleString()}</>
}
