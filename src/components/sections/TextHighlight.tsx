"use client"

import { useRef, ReactNode } from 'react'
import { motion, useInView } from 'motion/react'

interface TextHighlightProps {
  children: ReactNode
  variant?: 'underline' | 'background' | 'gradient' | 'glow'
  color?: string
  animated?: boolean
  className?: string
}

export function TextHighlight({
  children,
  variant = 'underline',
  color,
  animated = true,
  className = '',
}: TextHighlightProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const shouldAnimate = animated && inView

  const defaultColors = {
    underline: 'var(--color-primary, #3B82F6)',
    background: '#FDE047',
    gradient: '',
    glow: 'var(--color-primary, #3B82F6)',
  }

  const c = color ?? defaultColors[variant]

  if (variant === 'underline') {
    return (
      <span ref={ref} className={`relative inline ${className}`}>
        {children}
        <motion.span
          className="absolute left-0 bottom-0 h-[3px] rounded-full w-full"
          style={{ backgroundColor: c, transformOrigin: 'left' }}
          initial={{ scaleX: 0 }}
          animate={shouldAnimate ? { scaleX: 1 } : { scaleX: animated ? 0 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />
      </span>
    )
  }

  if (variant === 'background') {
    return (
      <span ref={ref} className={`relative inline ${className}`}>
        <motion.span
          className="absolute inset-0 -mx-1 -my-0.5 rounded-sm"
          style={{ backgroundColor: c, transformOrigin: 'left', opacity: 0.3 }}
          initial={{ scaleX: 0 }}
          animate={shouldAnimate ? { scaleX: 1 } : { scaleX: animated ? 0 : 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />
        <span className="relative">{children}</span>
      </span>
    )
  }

  if (variant === 'gradient') {
    return (
      <span
        ref={ref}
        className={`inline bg-gradient-to-r from-[var(--color-primary,#7C3AED)] via-[#EC4899] to-[#F59E0B] bg-clip-text text-transparent ${className}`}
        style={
          animated
            ? {
                backgroundSize: '200% auto',
                animation: 'gradient-shift 3s ease infinite',
              }
            : {}
        }
      >
        <style>{`
          @keyframes gradient-shift {
            0%, 100% { background-position: 0% center; }
            50% { background-position: 100% center; }
          }
        `}</style>
        {children}
      </span>
    )
  }

  // glow
  return (
    <span
      ref={ref}
      className={`inline relative ${className}`}
      style={{
        textShadow: shouldAnimate
          ? `0 0 20px ${c}40, 0 0 40px ${c}20, 0 0 60px ${c}10`
          : 'none',
        transition: 'text-shadow 0.8s ease',
      }}
    >
      {children}
    </span>
  )
}
