// @ts-nocheck
'use client'

import Image from "next/image"
import { Check, CheckCircle, Shield, Star } from "lucide-react"
import { Container } from "@/components/ui/Container"

interface Feature {
  id: string | number
  title: string
  description: string
  icon?: 'check' | 'checkCircle' | 'shield' | 'star'
}

interface FeaturesListProps {
  badge?: string
  headline: string
  highlightedText?: string
  features: Feature[]
  imageSrc?: string
  imageAlt?: string
  imagePosition?: 'left' | 'right'
  className?: string
}

/**
 * FeaturesList - Split layout with features list and image
 * Adapted from construction template's WhyChoose component
 * 
 * Features:
 * - Configurable icon for each feature (check, shield, star, etc.)
 * - Image on left or right side
 * - Badge and headline with highlighted text
 * - Responsive design with mobile stacking
 * - Perfect for "Why Choose Us" or benefits sections
 */
export function FeaturesList({
  badge = "Why Choose Us?",
  headline,
  highlightedText,
  features,
  imageSrc,
  imageAlt,
  imagePosition = 'right',
  className = ""
}: FeaturesListProps) {
  const contentOrder = imagePosition === 'right' ? 'lg:order-1' : 'lg:order-2'
  const imageOrder = imagePosition === 'right' ? 'lg:order-2' : 'lg:order-1'

  const getIcon = (iconType?: string) => {
    switch (iconType) {
      case 'checkCircle':
        return <CheckCircle className="w-6 h-6" />
      case 'shield':
        return <Shield className="w-6 h-6" />
      case 'star':
        return <Star className="w-6 h-6" />
      case 'check':
      default:
        return <Check className="w-6 h-6" />
    }
  }

  return (
    <section className={`py-16 lg:py-24 ${className}`}>
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Section */}
          {imageSrc && (
            <div className={`${imageOrder} relative`}>
              <div className="relative">
                <Image
                  src={imageSrc}
                  alt={imageAlt || headline}
                  width={600}
                  height={700}
                  className="w-full rounded-2xl shadow-2xl object-cover"
                  priority
                />
                
                {/* Decorative background element */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl -z-10 blur-sm" />
              </div>
            </div>
          )}

          {/* Content Section */}
          <div className={`${contentOrder} space-y-8`}>
            {/* Badge */}
            {badge && (
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold uppercase tracking-wide">
                {badge}
              </span>
            )}

            {/* Headline */}
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
              {headline}
              {highlightedText && (
                <span className="text-primary ml-2">{highlightedText}</span>
              )}
            </h2>

            {/* Features List */}
            <div className="space-y-6">
              {features.map((feature) => (
                <div key={feature.id} className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mt-1">
                    {getIcon(feature.icon)}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}