"use client"

import { ReactNode } from 'react'

interface ShimmerButtonSectionProps {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'shimmer' | 'glow' | 'pulse' | 'rainbow'
  href?: string
  onClick?: () => void
  className?: string
  color?: string
}

export function ShimmerButton({
  children,
  size = 'md',
  variant = 'shimmer',
  href,
  onClick,
  className = '',
  color,
}: ShimmerButtonSectionProps) {
  const sizes = {
    sm: 'px-5 py-2.5 text-sm rounded-lg',
    md: 'px-7 py-3.5 text-base rounded-xl',
    lg: 'px-10 py-5 text-lg rounded-2xl',
  }

  const baseColor = color ?? 'var(--color-primary, #3B82F6)'

  const base = `relative inline-flex items-center justify-center font-bold transition-all duration-300 overflow-hidden ${sizes[size]} ${className}`

  const getContent = () => {
    switch (variant) {
      case 'shimmer':
        return (
          <>
            <style>{`
              @keyframes shimmer-sweep {
                0% { transform: translateX(-100%) skewX(-15deg); }
                100% { transform: translateX(200%) skewX(-15deg); }
              }
            `}</style>
            <span className="absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden="true">
              <span
                className="absolute inset-0 w-1/3"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  animation: 'shimmer-sweep 2.5s ease-in-out infinite',
                }}
              />
            </span>
          </>
        )
      case 'glow':
        return (
          <style>{`
            @keyframes glow-pulse {
              0%, 100% { box-shadow: 0 0 15px ${baseColor}50, 0 0 30px ${baseColor}25; }
              50% { box-shadow: 0 0 25px ${baseColor}70, 0 0 50px ${baseColor}35; }
            }
          `}</style>
        )
      case 'pulse':
        return (
          <style>{`
            @keyframes subtle-pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.03); }
            }
          `}</style>
        )
      case 'rainbow':
        return (
          <>
            <style>{`
              @keyframes rainbow-border {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
            `}</style>
            <span
              className="absolute inset-0 rounded-[inherit] p-[2px]"
              style={{
                background: 'linear-gradient(90deg, #7C3AED, #EC4899, #F59E0B, #10B981, #3B82F6, #7C3AED)',
                backgroundSize: '300% 100%',
                animation: 'rainbow-border 4s linear infinite',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
              aria-hidden="true"
            />
          </>
        )
    }
  }

  const variantAnimation =
    variant === 'glow'
      ? { animation: 'glow-pulse 2s ease-in-out infinite' }
      : variant === 'pulse'
        ? { animation: 'subtle-pulse 2s ease-in-out infinite' }
        : {}

  const style = {
    backgroundColor: baseColor,
    color: '#fff',
    ...variantAnimation,
  }

  const content = (
    <>
      {getContent()}
      <span className="relative z-10">{children}</span>
    </>
  )

  if (href) {
    return (
      <a href={href} className={`${base} hover:scale-105 hover:shadow-xl`} style={style}>
        {content}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={`${base} hover:scale-105 hover:shadow-xl`} style={style}>
      {content}
    </button>
  )
}
