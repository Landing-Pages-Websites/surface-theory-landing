// @ts-nocheck
'use client'

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"

interface ScrollToTopProps {
  threshold?: number
  variant?: 'default' | 'circle' | 'pill'
  className?: string
}

/**
 * ScrollToTop - Floating scroll-to-top button
 *
 * Tags: #scroll #utility #button #navigation #ux
 *
 * Features:
 * - Appears after scrolling past threshold
 * - Smooth scroll animation
 * - Three visual variants
 * - Fade in/out transition
 */
export function ScrollToTop({
  threshold = 300,
  variant = 'circle',
  className = '',
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > threshold)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const variantClasses = {
    default: 'w-12 h-12 rounded-lg',
    circle: 'w-12 h-12 rounded-full',
    pill: 'px-4 py-3 rounded-full',
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-40 bg-[var(--primary)] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center ${variantClasses[variant]} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'} ${className}`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  )
}
