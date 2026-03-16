// @ts-nocheck
'use client'

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/Button"
import { Container } from "@/components/ui/Container"
import { ArrowRight, Phone, CheckCircle } from "lucide-react"

interface CTAButton {
  text: string
  href: string
  variant?: 'primary' | 'secondary' | 'outline'
  icon?: boolean
}

interface BenefitPoint {
  text: string
  icon?: 'check' | 'arrow' | 'star'
}

interface CTASectionProps {
  variant?: 'default' | 'gradient' | 'image' | 'minimal' | 'split'
  title: string
  subtitle?: string
  description?: string
  primaryButton: CTAButton
  secondaryButton?: CTAButton
  benefits?: BenefitPoint[]
  backgroundImage?: string
  overlayOpacity?: number
  phoneNumber?: string
  className?: string
}

/**
 * CTASection - High-conversion call-to-action sections
 * 
 * Tags: #cta #conversion #action #lead-generation #phone #benefits #gradient
 * 
 * Features:
 * - Multiple design variants (gradient, image, split, minimal)
 * - Dual CTA buttons (primary + secondary actions)
 * - Optional benefit points with icons
 * - Phone number integration for immediate contact
 * - Background image support with overlay control
 * - Conversion-optimized layouts
 * - Mobile-first responsive design
 * - Perfect for driving actions and leads
 */
export function CTASection({
  variant = 'default',
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  benefits,
  backgroundImage,
  overlayOpacity = 0.8,
  phoneNumber,
  className = ""
}: CTASectionProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return "bg-gradient-to-br from-primary via-primary to-accent text-white"
      case 'image':
        return "relative text-white"
      case 'minimal':
        return "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700"
      case 'split':
        return "bg-gray-50 dark:bg-gray-900"
      default:
        return "bg-primary text-white"
    }
  }

  const getBenefitIcon = (iconType?: string) => {
    switch (iconType) {
      case 'check':
        return <CheckCircle className="w-5 h-5 text-accent" />
      case 'arrow':
        return <ArrowRight className="w-5 h-5 text-accent" />
      default:
        return <CheckCircle className="w-5 h-5 text-accent" />
    }
  }

  if (variant === 'split') {
    return (
      <section className={`py-16 md:py-20 lg:py-28 ${getVariantClasses()} ${className}`}>
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="space-y-6">
              {subtitle && (
                <span className="inline-block px-4 py-2 bg-primary text-white text-sm font-semibold uppercase tracking-wide rounded-full">
                  {subtitle}
                </span>
              )}
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                {title}
              </h2>
              
              {description && (
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {description}
                </p>
              )}

              {benefits && (
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      {getBenefitIcon(benefit.icon)}
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {benefit.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="text-base font-semibold">
                  <Link href={primaryButton.href}>
                    {primaryButton.text}
                    {primaryButton.icon && <ArrowRight className="w-5 h-5 ml-2" />}
                  </Link>
                </Button>
                
                {secondaryButton && (
                  <Button
                    asChild
                    variant={secondaryButton.variant || "outline"}
                    size="lg"
                    className="text-base font-semibold"
                  >
                    <Link href={secondaryButton.href}>
                      {secondaryButton.text}
                    </Link>
                  </Button>
                )}

                {phoneNumber && (
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="text-base font-semibold border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <Link href={`tel:${phoneNumber}`}>
                      <Phone className="w-5 h-5 mr-2" />
                      Call Now
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-8 lg:p-12">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto">
                    <ArrowRight className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Ready to Get Started?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Join thousands of satisfied customers who trust us with their success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className={`py-16 md:py-20 lg:py-28 relative ${getVariantClasses()} ${className}`}>
      {/* Background Image */}
      {variant === 'image' && backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt="CTA Background"
            fill
            className="object-cover"
          />
          <div 
            className="absolute inset-0 bg-gray-900" 
            style={{ opacity: overlayOpacity }}
          />
        </>
      )}

      {/* Background Pattern for gradient variant */}
      {variant === 'gradient' && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
      )}

      <Container className="relative">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          {subtitle && (
            <span className={`inline-block px-4 py-2 text-sm font-semibold uppercase tracking-wide rounded-full ${
              variant === 'minimal' 
                ? 'bg-primary text-white' 
                : 'bg-white/20 text-white'
            }`}>
              {subtitle}
            </span>
          )}
          
          <h2 className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight ${
            variant === 'minimal' 
              ? 'text-gray-900 dark:text-white' 
              : 'text-white'
          }`}>
            {title}
          </h2>
          
          {description && (
            <p className={`text-lg md:text-xl leading-relaxed max-w-3xl mx-auto ${
              variant === 'minimal' 
                ? 'text-gray-600 dark:text-gray-300' 
                : 'text-white/90'
            }`}>
              {description}
            </p>
          )}

          {benefits && (
            <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  {getBenefitIcon(benefit.icon)}
                  <span className={`font-medium ${
                    variant === 'minimal' 
                      ? 'text-gray-700 dark:text-gray-300' 
                      : 'text-white'
                  }`}>
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              asChild 
              size="lg" 
              className={`text-base font-semibold px-8 py-4 ${
                variant === 'minimal' 
                  ? 'bg-primary hover:bg-primary/90' 
                  : 'bg-white text-primary hover:bg-gray-100'
              }`}
            >
              <Link href={primaryButton.href}>
                {primaryButton.text}
                {primaryButton.icon && <ArrowRight className="w-5 h-5 ml-2" />}
              </Link>
            </Button>
            
            {secondaryButton && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className={`text-base font-semibold px-8 py-4 ${
                  variant === 'minimal'
                    ? 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                    : 'border-white text-white hover:bg-white hover:text-primary'
                }`}
              >
                <Link href={secondaryButton.href}>
                  {secondaryButton.text}
                </Link>
              </Button>
            )}

            {phoneNumber && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className={`text-base font-semibold px-8 py-4 ${
                  variant === 'minimal'
                    ? 'border-primary text-primary hover:bg-primary hover:text-white'
                    : 'border-white text-white hover:bg-white hover:text-primary'
                }`}
              >
                <Link href={`tel:${phoneNumber}`}>
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Link>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

// Predefined benefit points for different industries
export const defaultSaaSBenefits: BenefitPoint[] = [
  { text: "30-day money-back guarantee", icon: "check" },
  { text: "24/7 customer support", icon: "check" },
  { text: "No setup fees", icon: "check" }
]

export const defaultServiceBenefits: BenefitPoint[] = [
  { text: "Free consultation", icon: "check" },
  { text: "Licensed & insured", icon: "check" },
  { text: "Satisfaction guaranteed", icon: "check" }
]

export const defaultConsultingBenefits: BenefitPoint[] = [
  { text: "Expert guidance", icon: "check" },
  { text: "Proven strategies", icon: "check" },
  { text: "Measurable results", icon: "check" }
]