'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Reveal } from '@/components/Reveal'
import { useTracking } from '@/hooks/useTracking'
import { useMegaLeadForm } from '@/hooks/useMegaLeadForm'

export default function SurfaceTheoryLanding() {
  const [stickyVisible, setStickyVisible] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectTimeline: '',
    services: '',
    projectDetails: '',
  })

  // Initialize tracking with placeholder siteKey (will be replaced after MEGA Admin registration)
  const { trackCTA, trackPhoneClick, trackFormStart } = useTracking({
    siteKey: 'PLACEHOLDER_SITE_KEY',
    pixelId: '2193392604526993',
    debug: true
  })

  // Initialize form handler
  const { submitForm, loading, submitted, error, reset } = useMegaLeadForm({
    siteKey: 'PLACEHOLDER_SITE_KEY',
    customerId: 'PLACEHOLDER_CUSTOMER_ID',
    siteId: 'PLACEHOLDER_SITE_ID',
    notificationEmail: 'sales@surfacetheoryonline.com',
    onSuccess: () => {
      console.log('Form submitted successfully!')
    },
    onError: (error) => {
      console.error('Form submission error:', error)
    }
  })

  // Show sticky CTA after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      setStickyVisible(window.scrollY > window.innerHeight * 0.5)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const formatPhone = (value: string) => {
    // Strip all non-numeric characters
    const cleaned = value.replace(/\D/g, '')
    
    // Limit to 10 digits
    const limited = cleaned.slice(0, 10)
    
    // Format as (XXX) XXX-XXXX
    if (limited.length >= 6) {
      return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`
    } else if (limited.length >= 3) {
      return `(${limited.slice(0, 3)}) ${limited.slice(3)}`
    } else {
      return limited
    }
  }

  const isValidPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '')
    return cleaned.length === 10
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setFormData({ ...formData, phone: formatted })
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate phone before submission
    if (!isValidPhone(formData.phone)) {
      return // Form won't submit if phone is invalid
    }
    
    trackFormStart('surface-theory-lead-form')
    
    const success = await submitForm(formData)
    
    if (success) {
      // Reset form on success
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        projectTimeline: '',
        services: '',
        projectDetails: '',
      })
    }
  }

  const handleCTAClick = (ctaText: string, section: string) => {
    trackCTA(ctaText, section)
    // Scroll to contact form
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handlePhoneClick = (section: string) => {
    trackPhoneClick('980-505-1218', section)
  }

  return (
    <div className="min-h-screen bg-charcoal-dark text-bone">
      {/* Header - Logo + CTA */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-charcoal-dark/90 backdrop-blur-sm">
        <nav className="container-editorial">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-12 relative">
                <svg viewBox="0 0 40 48" fill="none" className="w-full h-full">
                  <rect x="1" y="1" width="38" height="46" stroke="#C5A46D" strokeWidth="1.5" fill="none" />
                  <path d="M20 6 C12 6 8 12 8 18 C8 24 14 28 20 28 C26 28 32 32 32 38 C32 44 26 46 20 46" stroke="#C5A46D" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <span className="font-heading text-lg tracking-[0.2em] text-bone block leading-tight">SURFACE</span>
                <span className="font-heading text-lg tracking-[0.2em] text-bone block leading-tight">THEORY</span>
              </div>
            </div>
            
            {/* Header CTAs */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => handlePhoneClick('header')}
                className="hidden sm:block border-2 border-brass text-brass px-4 py-2 rounded-lg font-medium hover:bg-brass hover:text-charcoal-dark transition-all duration-200"
              >
                <a href="tel:980-505-1218">(980) 505-1218</a>
              </button>
              <button
                onClick={() => handleCTAClick('Get Free Estimate', 'header')}
                className="btn-brass"
              >
                Get Free Estimate
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero-cinematic">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://www.surfacetheoryonline.com/hero.webp"
            alt="Luxury hardwood flooring in modern home"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-charcoal-dark/60"></div>
        </div>
        
        <div className="container-editorial grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20 relative z-10">
          {/* Left: Headlines & Copy */}
          <div className="space-y-8">
            <Reveal>
              <span className="font-label text-brass block mb-6 tracking-[0.2em]">Premium Interior Surfaces</span>
              <h1 className="font-heading text-bone font-light leading-[1.05] text-4xl md:text-5xl lg:text-6xl mb-6">
                Transform Your Home with <span className="text-brass">Expert Craftsmanship</span>
              </h1>
              <p className="text-bone/80 text-lg md:text-xl leading-relaxed mb-8">
                Professional hardwood flooring, tile & stone, cabinetry, and premium interior finishes. 
                15+ years of experience delivering luxury results for homeowners.
              </p>
            </Reveal>
            
            <Reveal delay={200}>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                <button
                  onClick={() => handleCTAClick('Get My Free Estimate', 'hero')}
                  className="btn-brass text-lg px-8 py-4"
                >
                  Get My Free Estimate
                </button>
                <button
                  onClick={() => handlePhoneClick('hero')}
                  className="btn-outline-light text-lg px-8 py-4"
                >
                  <a href="tel:980-505-1218" className="flex items-center gap-2">
                    Or Call (980) 505-1218
                  </a>
                </button>
              </div>
            </Reveal>
          </div>

          {/* Right: Lead Form */}
          <Reveal delay={300}>
            <div className="bg-charcoal-dark/80 backdrop-blur-sm p-8 rounded-2xl border border-brass/20">
              <h2 className="font-heading text-2xl text-bone mb-6 text-center">
                Get Your Free Estimate
              </h2>
              
              {submitted ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-brass rounded-full flex items-center justify-center mx-auto">
                    <span className="text-charcoal-dark text-2xl font-bold">OK</span>
                  </div>
                  <h3 className="text-xl text-bone">Thank You!</h3>
                  <p className="text-bone/80">
                    We'll contact you within 24 hours to schedule your free estimate.
                  </p>
                  <button
                    onClick={reset}
                    className="btn-outline-light mt-4"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name*"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="form-field"
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name*"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="form-field"
                      required
                    />
                  </div>
                  
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address*"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="form-field"
                    required
                  />
                  
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number*"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className="form-field"
                    inputMode="numeric"
                    pattern="^\(\d{3}\) \d{3}-\d{4}$"
                    required
                  />
                  
                  <select
                    name="projectTimeline"
                    value={formData.projectTimeline}
                    onChange={(e) => setFormData({...formData, projectTimeline: e.target.value})}
                    className="form-select"
                    required
                  >
                    <option value="">When do you want to start?*</option>
                    <option value="Immediately">Immediately</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6+ months">6+ months</option>
                    <option value="Just Exploring">Just Exploring</option>
                  </select>
                  
                  <select
                    name="services"
                    value={formData.services}
                    onChange={(e) => setFormData({...formData, services: e.target.value})}
                    className="form-select"
                    required
                  >
                    <option value="">Which services interest you?*</option>
                    <option value="Hardwood Flooring">Hardwood Flooring</option>
                    <option value="Tile & Stone">Tile & Stone</option>
                    <option value="Staircases">Staircases</option>
                    <option value="Interior Trim">Interior Trim</option>
                    <option value="Wall Finishes">Wall Finishes</option>
                    <option value="Decking">Decking</option>
                    <option value="Cabinet CAD">Cabinet CAD</option>
                    <option value="Finish Packages">Finish Packages</option>
                    <option value="Garage Remodeling">Garage Remodeling</option>
                    <option value="Multiple Services">Multiple Services</option>
                    <option value="Other">Other</option>
                  </select>
                  
                  <textarea
                    name="projectDetails"
                    placeholder="Tell us about your project (optional)"
                    value={formData.projectDetails}
                    onChange={(e) => setFormData({...formData, projectDetails: e.target.value})}
                    className="form-textarea"
                  />
                  
                  {error && (
                    <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded">
                      {error}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-brass w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Submitting...' : 'Get My Free Estimate'}
                  </button>
                  
                  <p className="text-bone/60 text-sm text-center">
                    We respect your privacy. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats Bar */}
      <section id="stats" className="section-padding bg-charcoal-dark border-t border-brass/20">
        <div className="container-editorial">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <Reveal>
              <span className="block font-heading text-4xl lg:text-5xl font-light text-brass leading-none">15+</span>
              <span className="block text-sm text-bone/50 uppercase tracking-[0.15em] mt-3 font-medium">Years Experience</span>
            </Reveal>
            <Reveal delay={100}>
              <span className="block font-heading text-4xl lg:text-5xl font-light text-brass leading-none">500+</span>
              <span className="block text-sm text-bone/50 uppercase tracking-[0.15em] mt-3 font-medium">Projects Completed</span>
            </Reveal>
            <Reveal delay={200}>
              <span className="block font-heading text-4xl lg:text-5xl font-light text-brass leading-none">100%</span>
              <span className="block text-sm text-bone/50 uppercase tracking-[0.15em] mt-3 font-medium">Licensed & Insured</span>
            </Reveal>
            <Reveal delay={300}>
              <span className="block font-heading text-4xl lg:text-5xl font-light text-brass leading-none">5</span>
              <span className="block text-sm text-bone/50 uppercase tracking-[0.15em] mt-3 font-medium">States Served</span>
            </Reveal>
          </div>
          
          <Reveal delay={400}>
            <div className="text-center mt-12">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleCTAClick('Get My Free Estimate', 'stats')}
                  className="btn-brass text-lg px-8 py-4"
                >
                  Get My Free Estimate
                </button>
                <button
                  onClick={() => handlePhoneClick('stats')}
                  className="btn-outline-light text-lg px-8 py-4"
                >
                  <a href="tel:980-505-1218">
                    Or Call (980) 505-1218
                  </a>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-bone-light">
        <div className="container-editorial">
          <Reveal>
            <div className="text-center mb-16">
              <span className="font-label text-brass-dark block mb-4 tracking-[0.2em]">Our Expertise</span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-charcoal mb-6">
                Premium Interior Services
              </h2>
              <p className="text-charcoal/70 text-lg max-w-2xl mx-auto">
                From hardwood flooring to custom cabinetry, we deliver exceptional craftsmanship 
                with premium materials that stand the test of time.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Hardwood Flooring",
                description: "Pre-finished and sand-finish options crafted for enduring beauty. Premium domestic and exotic hardwoods."
              },
              {
                title: "Tile & Stone",
                description: "Natural stone and porcelain tile with expert installation. Marble, travertine, and custom designs."
              },
              {
                title: "Staircases",
                description: "Custom design and precision craftsmanship for statement staircases. Every detail considered."
              },
              {
                title: "Interior Trim",
                description: "Architectural trim and custom millwork that adds character and sophistication to any space."
              },
              {
                title: "Wall Finishes",
                description: "Wallpaper, specialty coatings, and architectural treatments that transform interiors."
              },
              {
                title: "Complete Packages",
                description: "Full-service interior renovation packages including cabinetry, finish selection, and project management."
              }
            ].map((service, index) => (
              <Reveal key={service.title} delay={index * 100}>
                <div className="bg-bone p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-brass">
                  <h3 className="font-heading text-2xl text-charcoal mb-4">{service.title}</h3>
                  <p className="text-charcoal/70 leading-relaxed mb-6">{service.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={600}>
            <div className="text-center mt-12">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleCTAClick('Get My Free Estimate', 'services')}
                  className="btn-primary text-lg px-8 py-4"
                >
                  Get My Free Estimate
                </button>
                <button
                  onClick={() => handlePhoneClick('services')}
                  className="btn-secondary text-lg px-8 py-4"
                >
                  <a href="tel:980-505-1218">
                    Or Call (980) 505-1218
                  </a>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section-padding bg-charcoal-dark">
        <div className="container-editorial">
          <Reveal>
            <div className="text-center mb-16">
              <span className="font-label text-brass block mb-4 tracking-[0.2em]">Client Reviews</span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-bone mb-6">
                What Homeowners Say
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "Surface Theory transformed our entire main floor with stunning hardwood. The attention to detail and craftsmanship exceeded our expectations. Highly recommend!",
                author: "Sarah M.",
                location: "Charlotte, NC",
                rating: 5
              },
              {
                text: "Professional, punctual, and absolutely beautiful work. Our new tile bathroom looks like something from a luxury hotel. Worth every penny.",
                author: "Michael R.",
                location: "Raleigh, NC",
                rating: 5
              },
              {
                text: "The custom staircase they built is now the centerpiece of our home. Everyone who visits comments on the incredible quality and design.",
                author: "Jennifer L.",
                location: "Charleston, SC",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Reveal key={index} delay={index * 150}>
                <div className="bg-charcoal-light p-8 rounded-2xl border border-brass/20">
                  <div className="flex text-brass mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                  <p className="text-bone/80 leading-relaxed mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-medium text-bone">{testimonial.author}</p>
                    <p className="text-bone/60 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={500}>
            <div className="text-center mt-12">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleCTAClick('Get My Free Estimate', 'testimonials')}
                  className="btn-brass text-lg px-8 py-4"
                >
                  Get My Free Estimate
                </button>
                <button
                  onClick={() => handlePhoneClick('testimonials')}
                  className="btn-outline-light text-lg px-8 py-4"
                >
                  <a href="tel:980-505-1218">
                    Or Call (980) 505-1218
                  </a>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-padding bg-bone-light">
        <div className="container-editorial max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <span className="font-label text-brass-dark block mb-4 tracking-[0.2em]">Common Questions</span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-charcoal mb-6">
                Frequently Asked Questions
              </h2>
            </div>
          </Reveal>

          <div className="space-y-6">
            {[
              {
                question: "How long does a typical flooring project take?",
                answer: "Most hardwood flooring projects take 3-5 days depending on square footage. Tile projects typically take 4-7 days. We provide detailed timelines during your free estimate."
              },
              {
                question: "Do you offer free estimates?",
                answer: "Yes! We provide free, no-obligation estimates for all our services. We'll visit your home, assess the project, and provide a detailed quote within 24 hours."
              },
              {
                question: "Are you licensed and insured?",
                answer: "Absolutely. We are fully licensed, bonded, and insured. We provide certificates of insurance upon request and stand behind all our work with comprehensive warranties."
              },
              {
                question: "What areas do you serve?",
                answer: "We serve Charlotte, Raleigh, Charleston, Asheville, and surrounding areas across North and South Carolina. Contact us to confirm service in your specific location."
              },
              {
                question: "Do you handle permits and inspections?",
                answer: "Yes, we handle all necessary permits and coordinate inspections when required. We ensure all work meets local building codes and regulations."
              },
              {
                question: "What's included in your warranty?",
                answer: "We offer comprehensive warranties on both materials and labor. Specific terms vary by project type - we'll explain all warranty details during your consultation."
              }
            ].map((faq, index) => (
              <Reveal key={index} delay={index * 100}>
                <details className="bg-bone p-6 rounded-xl shadow-sm border border-charcoal/10">
                  <summary className="font-heading text-xl text-charcoal cursor-pointer hover:text-brass transition-colors">
                    {faq.question}
                  </summary>
                  <p className="text-charcoal/70 mt-4 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>

          <Reveal delay={700}>
            <div className="text-center mt-12">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleCTAClick('Get My Free Estimate', 'faq')}
                  className="btn-primary text-lg px-8 py-4"
                >
                  Get My Free Estimate
                </button>
                <button
                  onClick={() => handlePhoneClick('faq')}
                  className="btn-secondary text-lg px-8 py-4"
                >
                  <a href="tel:980-505-1218">
                    Or Call (980) 505-1218
                  </a>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact" className="section-padding bg-brass text-charcoal-dark">
        <div className="container-editorial text-center">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-6">
              Ready to Transform Your Home?
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
              Get your free estimate today and discover why homeowners trust Surface Theory 
              for their most important interior projects.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => handleCTAClick('Get My Free Estimate', 'final-cta')}
                className="bg-charcoal-dark text-bone px-8 py-4 rounded-lg font-medium text-lg hover:bg-charcoal-light transition-colors duration-200"
              >
                Get My Free Estimate
              </button>
              <div className="flex items-center gap-4">
                <span className="text-charcoal-dark/80">or call us now:</span>
                <button
                  onClick={() => handlePhoneClick('final-cta')}
                  className="font-bold text-xl"
                >
                  <a href="tel:980-505-1218">(980) 505-1218</a>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-bone py-8">
        <div className="container-editorial text-center">
          <p className="text-bone/60 text-sm">
            © 2026 Surface Theory. All rights reserved. | 
            <a href="#" className="hover:text-brass transition-colors ml-1">Privacy Policy</a> | 
            <a href="#" className="hover:text-brass transition-colors ml-1">Terms</a>
          </p>
        </div>
      </footer>

      {/* Floating Sticky CTA */}
      {stickyVisible && (
        <div className="fixed bottom-6 right-6 z-50 bg-brass text-charcoal-dark p-4 rounded-xl shadow-2xl border-2 border-brass-light animate-fade-in">
          <div className="flex flex-col gap-2 text-center">
            <button
              onClick={() => handleCTAClick('Get Estimate', 'sticky-cta')}
              className="bg-charcoal-dark text-bone px-4 py-2 rounded-lg font-medium hover:bg-charcoal-light transition-colors text-sm"
            >
              Get Estimate
            </button>
            <button
              onClick={() => handlePhoneClick('sticky-cta')}
              className="font-medium text-sm hover:underline"
            >
              <a href="tel:980-505-1218">(980) 505-1218</a>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}