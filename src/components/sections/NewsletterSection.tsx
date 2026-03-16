// @ts-nocheck
'use client'

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Container } from "@/components/ui/Container"
import { Mail, Send, CheckCircle, Gift, Zap, Users } from "lucide-react"

interface NewsletterBenefit {
  text: string
  icon?: 'check' | 'gift' | 'zap' | 'users' | 'mail'
}

interface NewsletterSectionProps {
  title?: string
  subtitle?: string
  description?: string
  benefits?: NewsletterBenefit[]
  placeholder?: string
  buttonText?: string
  variant?: 'default' | 'minimal' | 'hero' | 'sidebar' | 'popup'
  showBenefits?: boolean
  backgroundImage?: string
  onSubmit?: (email: string) => Promise<void>
  className?: string
}

/**
 * NewsletterSection - Email subscription forms for lead generation
 * 
 * Tags: #newsletter #email #subscription #lead-generation #marketing #signup
 * 
 * Features:
 * - Multiple design variants (default, minimal, hero, sidebar, popup)
 * - Email validation with status messages
 * - Benefit points with icons for social proof
 * - Background image support for hero variant
 * - Professional styling with hover effects
 * - Mobile-first responsive design
 * - Perfect for building email lists
 * - Essential for content marketing and lead nurturing
 */
export function NewsletterSection({
  title = "Stay Updated",
  subtitle = "Newsletter",
  description = "Get the latest insights, tips, and updates delivered straight to your inbox.",
  benefits,
  placeholder = "Enter your email address",
  buttonText = "Subscribe",
  variant = 'default',
  showBenefits = true,
  backgroundImage,
  onSubmit,
  className = ""
}: NewsletterSectionProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.includes('@')) {
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      if (onSubmit) {
        await onSubmit(email)
      } else {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      setSubmitStatus('success')
      setEmail('')
    } catch (error) {
      setSubmitStatus('error')
      console.error('Newsletter signup error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getBenefitIcon = (iconType?: string) => {
    const iconClass = "w-5 h-5 text-primary"
    switch (iconType) {
      case 'check':
        return <CheckCircle className={iconClass} />
      case 'gift':
        return <Gift className={iconClass} />
      case 'zap':
        return <Zap className={iconClass} />
      case 'users':
        return <Users className={iconClass} />
      case 'mail':
        return <Mail className={iconClass} />
      default:
        return <CheckCircle className={iconClass} />
    }
  }

  if (variant === 'minimal') {
    return (
      <section className={`py-12 md:py-16 bg-gray-50 dark:bg-gray-900 ${className}`}>
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {description}
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                required
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              <Button 
                type="submit" 
                disabled={isSubmitting || !email}
                className="px-8 py-3"
              >
                {isSubmitting ? 'Subscribing...' : buttonText}
              </Button>
            </form>

            {submitStatus === 'success' && (
              <p className="text-green-600 dark:text-green-400 mt-4">
                ✓ Thank you for subscribing! Check your email for confirmation.
              </p>
            )}
            
            {submitStatus === 'error' && (
              <p className="text-red-600 dark:text-red-400 mt-4">
                Please enter a valid email address.
              </p>
            )}
          </div>
        </Container>
      </section>
    )
  }

  if (variant === 'hero') {
    return (
      <section className={`py-20 md:py-32 lg:py-40 relative ${className}`}>
        {/* Background Image */}
        {backgroundImage && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90" />
          </>
        )}
        
        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-white/20 text-white text-sm font-semibold uppercase tracking-wide rounded-full mb-8">
              {subtitle}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {title}
            </h2>
            <p className="text-xl text-white/90 mb-12">
              {description}
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                required
                className="flex-1 px-6 py-4 text-lg border-0 rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
              />
              <Button 
                type="submit" 
                disabled={isSubmitting || !email}
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    Subscribing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    {buttonText}
                  </div>
                )}
              </Button>
            </form>

            {submitStatus === 'success' && (
              <p className="text-white/90">
                ✓ Thank you for subscribing! Check your email for confirmation.
              </p>
            )}
            
            {submitStatus === 'error' && (
              <p className="text-red-200">
                Please enter a valid email address.
              </p>
            )}
          </div>
        </Container>
      </section>
    )
  }

  if (variant === 'sidebar') {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg ${className}`}>
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {description}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
          />
          <Button 
            type="submit" 
            disabled={isSubmitting || !email}
            className="w-full"
          >
            {isSubmitting ? 'Subscribing...' : buttonText}
          </Button>
        </form>

        {submitStatus === 'success' && (
          <p className="text-green-600 dark:text-green-400 text-sm mt-4 text-center">
            ✓ Thank you for subscribing!
          </p>
        )}
        
        {submitStatus === 'error' && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-4 text-center">
            Please enter a valid email address.
          </p>
        )}

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    )
  }

  // Default variant
  return (
    <section className={`py-16 md:py-20 lg:py-28 bg-gradient-to-br from-primary to-accent ${className}`}>
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-white">
            <span className="inline-block px-4 py-2 bg-white/20 text-white text-sm font-semibold uppercase tracking-wide rounded-full mb-6">
              {subtitle}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {title}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {description}
            </p>
            
            {showBenefits && benefits && (
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 text-white">
                      {getBenefitIcon(benefit.icon)}
                    </div>
                    <span className="text-white/90">{benefit.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Get Started Today
              </h3>
              <p className="text-gray-600">
                Join thousands of subscribers already signed up.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                required
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
              />
              <Button 
                type="submit" 
                disabled={isSubmitting || !email}
                size="lg"
                className="w-full text-lg font-semibold"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Subscribing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    {buttonText}
                  </div>
                )}
              </Button>
            </form>

            {submitStatus === 'success' && (
              <div className="text-center mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-green-700 font-medium">
                  Thank you for subscribing!
                </p>
                <p className="text-green-600 text-sm">
                  Check your email for confirmation.
                </p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <p className="text-red-600 text-center mt-4">
                Please enter a valid email address.
              </p>
            )}

            <p className="text-xs text-gray-500 mt-6 text-center">
              We respect your privacy. Unsubscribe at any time. No spam, ever.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

// Predefined benefits for different use cases
export const defaultNewsletterBenefits: NewsletterBenefit[] = [
  { text: "Weekly industry insights and trends", icon: "zap" },
  { text: "Exclusive tips and best practices", icon: "gift" },
  { text: "Early access to new resources", icon: "check" },
  { text: "Join 10,000+ professionals", icon: "users" }
]

export const saasBenefits: NewsletterBenefit[] = [
  { text: "Product updates and new features", icon: "zap" },
  { text: "Growth hacks and case studies", icon: "gift" },
  { text: "Beta access to new tools", icon: "check" },
  { text: "Weekly founder insights", icon: "mail" }
]

export const serviceBenefits: NewsletterBenefit[] = [
  { text: "Seasonal maintenance tips", icon: "check" },
  { text: "Exclusive discount offers", icon: "gift" },
  { text: "Industry news and updates", icon: "zap" },
  { text: "Expert advice and how-tos", icon: "mail" }
]