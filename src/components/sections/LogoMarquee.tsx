"use client"

import { Container } from '@/components/ui/Container'

interface LogoItem {
  src: string
  alt: string
  href?: string
}

interface LogoMarqueeProps {
  logos: LogoItem[]
  headline?: string
  speed?: 'slow' | 'normal' | 'fast'
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
  grayscale?: boolean
  variant?: 'light' | 'dark'
  rows?: 1 | 2
}

export function LogoMarquee({
  logos,
  headline = 'Trusted By',
  speed = 'normal',
  direction = 'left',
  pauseOnHover = true,
  grayscale = true,
  variant = 'light',
  rows = 1,
}: LogoMarqueeProps) {
  const speeds = { slow: '60s', normal: '40s', fast: '20s' }
  const duration = speeds[speed]

  const v = {
    light: { bg: 'bg-[#F8FAFC]', headline: 'text-[#94A3B8]', border: 'border-gray-100' },
    dark: { bg: 'bg-[#0F172A]', headline: 'text-white/40', border: 'border-white/5' },
  }

  const s = v[variant]

  const renderRow = (reverse: boolean = false) => (
    <div
      className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      aria-hidden="true"
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          className={`flex shrink-0 items-center gap-12 sm:gap-16 ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
          style={{
            animation: `marquee-scroll ${duration} linear infinite ${reverse || direction === 'right' ? 'reverse' : 'normal'}`,
          }}
        >
          {logos.map((logo, i) => {
            const img = (
              <img
                src={logo.src}
                alt={copy === 0 ? logo.alt : ''}
                className={`h-8 sm:h-10 lg:h-12 w-auto object-contain max-w-[140px] transition-all duration-500 ${
                  grayscale
                    ? 'grayscale opacity-50 hover:grayscale-0 hover:opacity-100'
                    : 'opacity-70 hover:opacity-100'
                }`}
                loading="lazy"
              />
            )
            if (logo.href) {
              return (
                <a key={`${copy}-${i}`} href={logo.href} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                  {img}
                </a>
              )
            }
            return <div key={`${copy}-${i}`} className="flex-shrink-0">{img}</div>
          })}
        </div>
      ))}
    </div>
  )

  return (
    <>
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <section className={`py-10 lg:py-14 ${s.bg} border-y ${s.border}`}>
        <Container>
          {headline && (
            <p className={`text-center text-xs font-semibold uppercase tracking-[0.2em] mb-8 ${s.headline}`}>
              {headline}
            </p>
          )}
          <div className="space-y-8">
            {renderRow(false)}
            {rows === 2 && renderRow(true)}
          </div>
        </Container>
      </section>
    </>
  )
}
