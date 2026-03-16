// @ts-nocheck
"use client"

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

interface Slide {
  headline: string
  subtext?: string
  ctaText?: string
  ctaLink?: string
  imageSrc?: string
}

interface HeroSliderProps {
  slides: Slide[]
  autoPlay?: boolean
  interval?: number
  colorScheme?: 'dark' | 'light' | 'blue' | 'gradient'
}

export function HeroSlider({
  slides,
  autoPlay = true,
  interval = 5000,
  colorScheme = 'dark'
}: HeroSliderProps) {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const schemes = {
    dark: {
      bg: 'bg-[#0F172A]',
      text: 'text-white',
      sub: 'text-white/70',
      primary: 'bg-white text-[#0F172A] hover:bg-gray-100',
      dot: 'bg-white',
      dotInactive: 'bg-white/30',
      arrow: 'bg-white/10 hover:bg-white/20 text-white',
    },
    light: {
      bg: 'bg-[#F8FAFC]',
      text: 'text-[#0F172A]',
      sub: 'text-[#64748B]',
      primary: 'bg-[#0F172A] text-white hover:bg-[#1E293B]',
      dot: 'bg-[#0F172A]',
      dotInactive: 'bg-[#CBD5E1]',
      arrow: 'bg-black/5 hover:bg-black/10 text-[#0F172A]',
    },
    blue: {
      bg: 'bg-[#1E3A5F]',
      text: 'text-white',
      sub: 'text-white/70',
      primary: 'bg-[#38BDF8] text-[#0F172A] hover:bg-[#7DD3FC]',
      dot: 'bg-[#38BDF8]',
      dotInactive: 'bg-white/20',
      arrow: 'bg-white/10 hover:bg-white/20 text-white',
    },
    gradient: {
      bg: 'bg-gradient-to-br from-[#4F46E5] via-[#7C3AED] to-[#EC4899]',
      text: 'text-white',
      sub: 'text-white/80',
      primary: 'bg-white text-[#7C3AED] hover:bg-gray-50',
      dot: 'bg-white',
      dotInactive: 'bg-white/30',
      arrow: 'bg-white/10 hover:bg-white/20 text-white',
    },
  }

  const scheme = schemes[colorScheme]

  const goTo = useCallback((index: number) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrent(index)
      setTimeout(() => setIsTransitioning(false), 50)
    }, 400)
  }, [])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length)
  }, [current, slides.length, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length)
  }, [current, slides.length, goTo])

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return
    const timer = setInterval(next, interval)
    return () => clearInterval(timer)
  }, [autoPlay, interval, next, slides.length])

  if (slides.length === 0) return null
  const slide = slides[current]

  return (
    <section className={`relative min-h-screen flex items-center overflow-hidden ${scheme.bg}`} role="banner">
      {/* Background image */}
      {slide.imageSrc && (
        <>
          <div
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
            style={{ backgroundImage: `url(${slide.imageSrc})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        </>
      )}

      <Container className="relative z-10">
        <div className={`max-w-3xl py-20 space-y-8 transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight ${scheme.text}`}>
            {slide.headline}
          </h1>

          {slide.subtext && (
            <p className={`text-lg md:text-xl leading-relaxed max-w-2xl ${scheme.sub}`}>
              {slide.subtext}
            </p>
          )}

          {slide.ctaText && (
            <div className="pt-4">
              <Button
                href={slide.ctaLink || '#'}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl ${scheme.primary}`}
              >
                {slide.ctaText}
              </Button>
            </div>
          )}
        </div>
      </Container>

      {/* Navigation arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${scheme.arrow}`}
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            onClick={next}
            className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${scheme.arrow}`}
            aria-label="Next slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </button>
        </>
      )}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${i === current ? `w-8 ${scheme.dot}` : `w-2.5 ${scheme.dotInactive}`}`}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current ? 'true' : undefined}
            />
          ))}
        </div>
      )}
    </section>
  )
}
