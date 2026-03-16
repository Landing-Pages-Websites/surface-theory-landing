// @ts-nocheck
'use client'

import Image from "next/image"
import { Button } from "@/components/ui/Button"
import { Container } from "@/components/ui/Container"

interface FeaturesSplitProps {
  badge?: string
  headline: string
  highlightedText?: string
  description: string
  description2?: string
  description3?: string
  imageSrc?: string
  videoSrc?: string
  imageAlt?: string
  imagePosition?: 'left' | 'right'
  ctaText?: string
  ctaHref?: string
  className?: string
}

/**
 * FeaturesSplit - Flexible split layout with content and media
 * Adapted from construction template's About component
 * 
 * Features:
 * - Content on one side, image/video on the other
 * - Configurable left/right positioning
 * - Support for both images and videos
 * - Optional badge, multiple paragraphs, CTA button
 * - Responsive design with mobile stacking
 */
export function FeaturesSplit({
  badge,
  headline,
  highlightedText,
  description,
  description2,
  description3,
  imageSrc,
  videoSrc,
  imageAlt,
  imagePosition = 'right',
  ctaText,
  ctaHref,
  className = ""
}: FeaturesSplitProps) {
  const contentOrder = imagePosition === 'right' ? 'lg:order-1' : 'lg:order-2'
  const mediaOrder = imagePosition === 'right' ? 'lg:order-2' : 'lg:order-1'

  const renderMedia = () => {
    if (videoSrc) {
      return (
        <video
          className="w-full rounded-2xl shadow-2xl"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )
    } 
    
    if (imageSrc) {
      return (
        <Image
          src={imageSrc}
          alt={imageAlt || headline}
          width={600}
          height={700}
          className="w-full rounded-2xl shadow-2xl object-cover"
          priority
        />
      )
    }

    return null
  }

  return (
    <section className={`py-16 lg:py-24 ${className}`}>
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Media Section */}
          <div className={`${mediaOrder} relative`}>
            <div className="relative">
              {renderMedia()}
              
              {/* Decorative background element */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl -z-10 blur-sm" />
            </div>
          </div>

          {/* Content Section */}
          <div className={`${contentOrder} space-y-6`}>
            {/* Optional Badge */}
            {badge && (
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold uppercase tracking-wide">
                {badge}
              </span>
            )}

            {/* Headline with optional highlighted text */}
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
              {headline}
              {highlightedText && (
                <span className="text-primary ml-2">{highlightedText}</span>
              )}
            </h2>

            {/* Content paragraphs */}
            <div className="space-y-4">
              <p className="text-lg text-gray-600 leading-relaxed">
                {description}
              </p>
              
              {description2 && (
                <p className="text-lg text-gray-600 leading-relaxed">
                  {description2}
                </p>
              )}
              
              {description3 && (
                <p className="text-lg text-gray-600 leading-relaxed">
                  {description3}
                </p>
              )}
            </div>

            {/* Optional CTA Button */}
            {ctaText && ctaHref && (
              <div className="pt-4">
                <Button size="lg" asChild>
                  <a href={ctaHref}>{ctaText}</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}