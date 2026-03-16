// @ts-nocheck
"use client"

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

interface HeroFullScreenProps {
  headline: string
  subtext?: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  backgroundImage?: string
  colorScheme?: 'dark' | 'light' | 'gradient-blue' | 'gradient-purple'
}

export function HeroFullScreen({
  headline,
  subtext,
  ctaText = 'Get Started',
  ctaLink = '#',
  secondaryCtaText,
  secondaryCtaLink = '#',
  backgroundImage,
  colorScheme = 'dark'
}: HeroFullScreenProps) {
  const schemes = {
    dark: {
      bg: 'bg-[#0A0A0A]',
      text: 'text-white',
      sub: 'text-white/60',
      primary: 'bg-white text-black hover:bg-gray-100',
      secondary: 'border border-white/20 text-white hover:bg-white/5',
      scrollLine: 'bg-white/30',
      scrollDot: 'bg-white',
    },
    light: {
      bg: 'bg-white',
      text: 'text-[#0F172A]',
      sub: 'text-[#64748B]',
      primary: 'bg-[#0F172A] text-white hover:bg-[#1E293B]',
      secondary: 'border border-[#0F172A]/20 text-[#0F172A] hover:bg-[#0F172A]/5',
      scrollLine: 'bg-[#0F172A]/20',
      scrollDot: 'bg-[#0F172A]',
    },
    'gradient-blue': {
      bg: 'bg-gradient-to-b from-[#0F172A] via-[#1E3A5F] to-[#0F172A]',
      text: 'text-white',
      sub: 'text-[#94A3B8]',
      primary: 'bg-[#38BDF8] text-[#0F172A] hover:bg-[#7DD3FC]',
      secondary: 'border border-[#38BDF8]/30 text-white hover:bg-[#38BDF8]/10',
      scrollLine: 'bg-white/20',
      scrollDot: 'bg-[#38BDF8]',
    },
    'gradient-purple': {
      bg: 'bg-gradient-to-b from-[#0F0720] via-[#2E1065] to-[#0F0720]',
      text: 'text-white',
      sub: 'text-[#A78BFA]/70',
      primary: 'bg-[#A78BFA] text-[#0F0720] hover:bg-[#C4B5FD]',
      secondary: 'border border-[#A78BFA]/30 text-white hover:bg-[#A78BFA]/10',
      scrollLine: 'bg-white/20',
      scrollDot: 'bg-[#A78BFA]',
    },
  }

  const scheme = schemes[colorScheme]

  return (
    <section className={`relative h-screen flex items-center justify-center overflow-hidden ${scheme.bg}`} role="banner">
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        </>
      )}

      <Container className="relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <h1 className={`text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.02] tracking-tight ${scheme.text}`}>
            {headline}
          </h1>

          {subtext && (
            <p className={`text-lg md:text-xl leading-relaxed max-w-2xl mx-auto ${scheme.sub}`}>
              {subtext}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button
              href={ctaLink}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl ${scheme.primary}`}
            >
              {ctaText}
            </Button>
            {secondaryCtaText && (
              <Button
                href={secondaryCtaLink}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm ${scheme.secondary}`}
              >
                {secondaryCtaText}
              </Button>
            )}
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
        <span className={`text-xs font-medium tracking-[0.2em] uppercase ${scheme.sub}`}>Scroll</span>
        <div className={`w-px h-12 ${scheme.scrollLine} relative overflow-hidden`}>
          <div className={`w-full h-3 ${scheme.scrollDot} rounded-full animate-[scrollDown_2s_ease-in-out_infinite]`} />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollDown {
          0% { transform: translateY(-12px); opacity: 0; }
          30% { opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateY(48px); opacity: 0; }
        }
      `}</style>
    </section>
  )
}
