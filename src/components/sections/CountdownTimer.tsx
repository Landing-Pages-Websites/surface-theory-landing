"use client"

import { useState, useEffect, useCallback } from 'react'
import { Container } from '@/components/ui/Container'
import { motion, AnimatePresence } from 'motion/react'

interface CountdownTimerProps {
  targetDate: string
  variant?: 'sticky-bar' | 'inline'
  position?: 'top' | 'bottom'
  headline?: string
  ctaText?: string
  ctaHref?: string
  colorScheme?: 'primary' | 'dark' | 'red' | 'gradient'
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(targetDate: string): TimeLeft {
  const difference = new Date(targetDate).getTime() - Date.now()
  if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 min-w-[3rem] sm:min-w-[4rem] py-2 sm:py-3">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: -20, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="block text-center text-2xl sm:text-3xl lg:text-4xl font-black text-white tabular-nums"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/70">
        {label}
      </span>
    </div>
  )
}

function Separator() {
  return (
    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white/50 self-start mt-2 sm:mt-3 animate-pulse">
      :
    </span>
  )
}

export function CountdownTimer({
  targetDate,
  variant = 'inline',
  position = 'top',
  headline = 'Offer Ends In',
  ctaText,
  ctaHref = '#',
  colorScheme = 'primary',
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate))
  const [dismissed, setDismissed] = useState(false)

  const tick = useCallback(() => {
    setTimeLeft(calculateTimeLeft(targetDate))
  }, [targetDate])

  useEffect(() => {
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [tick])

  const schemes = {
    primary: 'bg-gradient-to-r from-[var(--color-primary,#3B82F6)] to-[var(--color-primary-dark,#2563EB)]',
    dark: 'bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A]',
    red: 'bg-gradient-to-r from-[#DC2626] via-[#EF4444] to-[#DC2626]',
    gradient: 'bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#F59E0B]',
  }

  const bg = schemes[colorScheme]
  const isExpired =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0

  if (dismissed) return null

  if (variant === 'sticky-bar') {
    return (
      <div
        className={`${position === 'top' ? 'fixed top-0 inset-x-0 z-50' : 'fixed bottom-0 inset-x-0 z-50'} ${bg} shadow-2xl`}
        role="status"
        aria-live="polite"
        aria-label="Countdown timer"
      >
        <Container>
          <div className="flex items-center justify-between gap-4 py-3">
            <div className="flex items-center gap-4 flex-wrap">
              {headline && (
                <span className="text-white font-bold text-sm sm:text-base whitespace-nowrap">
                  {headline}
                </span>
              )}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <TimeUnit value={timeLeft.days} label="Days" />
                <Separator />
                <TimeUnit value={timeLeft.hours} label="Hrs" />
                <Separator />
                <TimeUnit value={timeLeft.minutes} label="Min" />
                <Separator />
                <TimeUnit value={timeLeft.seconds} label="Sec" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              {ctaText && !isExpired && (
                <a
                  href={ctaHref}
                  className="hidden sm:inline-flex items-center px-5 py-2 rounded-full bg-white text-gray-900 font-bold text-sm transition-all hover:scale-105 hover:shadow-lg"
                >
                  {ctaText}
                </a>
              )}
              <button
                onClick={() => setDismissed(true)}
                className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Dismiss countdown"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <section className={`relative py-16 lg:py-20 overflow-hidden ${bg}`} role="status" aria-live="polite" aria-label="Countdown timer">
      <div className="absolute inset-0 bg-white/5 animate-pulse" aria-hidden="true" />
      <Container className="relative z-10">
        <div className="text-center space-y-8">
          {headline && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white">{headline}</h2>
          )}
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <TimeUnit value={timeLeft.days} label="Days" />
            <Separator />
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <Separator />
            <TimeUnit value={timeLeft.minutes} label="Minutes" />
            <Separator />
            <TimeUnit value={timeLeft.seconds} label="Seconds" />
          </div>
          {ctaText && !isExpired && (
            <a
              href={ctaHref}
              className="inline-flex items-center px-8 py-4 rounded-full bg-white text-gray-900 font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl"
            >
              {ctaText}
            </a>
          )}
          {isExpired && (
            <p className="text-xl font-bold text-white/80">This offer has expired</p>
          )}
        </div>
      </Container>
    </section>
  )
}
