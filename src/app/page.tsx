"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { useTracking } from "@/hooks/useTracking";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";

const PHONE = "(540) 566-6316";
const PHONE_HREF = "tel:5405666316";

// Format phone number as user types
function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, '').length === 10;
}

function DualCTA({ primary, href }: { primary: string; href: string }) {
  return (
    <div className="mt-10 flex flex-col items-center gap-3">
      <a href={href} className="btn-primary text-lg px-8 py-4">
        {primary}
      </a>
      <a href={PHONE_HREF} className="btn-secondary px-6 py-3">
        Or call us: {PHONE}
      </a>
    </div>
  );
}

export default function SurfaceTheoryLanding() {
  const [stickyVisible, setStickyVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    budget: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Initialize tracking
  useTracking({
    siteKey: "sk_mmee4055_st_virginia_detailing",
  });

  const { submit: submitLead } = useMegaLeadForm();

  // Show sticky CTA after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      setStickyVisible(window.scrollY > window.innerHeight * 0.5);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData({ ...formData, phone: formatted });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!isValidPhone(formData.phone)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }
    
    if (!formData.budget) {
      setError("Please select a budget option");
      return;
    }
    
    try {
      const result = await submitLead({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        budget: formData.budget,
      });

      if (result.ok) {
        setIsSubmitted(true);
        setError('');
      }
    } catch (err) {
      setError("There was an error submitting your request. Please try again.");
      console.error("Form submission error:", err);
    }
  };

  return (
    <>
      {/* Header: Logo + CTA only — NO nav links */}
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur border-b">
        <div className="container-responsive py-4 flex items-center justify-between">
          {/* Logo placeholder - will be replaced with actual Surface Theory logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">ST</span>
            </div>
            <div className="font-display text-2xl text-primary">SURFACE THEORY</div>
          </div>
          
          <div className="flex items-center gap-4">
            <a href={PHONE_HREF} className="hidden sm:flex btn-secondary">
              {PHONE}
            </a>
            <a href="#contact" className="btn-primary">
              Get Free Estimate
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center bg-gradient-to-br from-secondary via-slate-800 to-slate-900 text-white">
        <div className="container-responsive grid lg:grid-cols-2 gap-12 items-center py-20">
          {/* Left: Headlines & Copy */}
          <div className="space-y-8">
            <Reveal>
              <span className="text-amber-400 font-semibold tracking-wider uppercase text-sm">
                PRECISION. PASSION. PERFECTION.
              </span>
              <h1 className="font-display text-5xl lg:text-7xl text-white leading-tight">
                PREMIUM AUTO <span className="text-gradient">DETAILING</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Transform your vehicle with Virginia's premier auto detailing service. 
                Specializing in paint correction, ceramic coating, interior deep cleaning, 
                and headlight restoration.
              </p>
            </Reveal>
            
            <Reveal delay={200}>
              <DualCTA primary="Get My Free Estimate" href="#contact" />
            </Reveal>
          </div>

          {/* Right: Lead Form */}
          <Reveal delay={300}>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <h2 className="font-display text-2xl text-white mb-6 text-center">
                Get Your Free Estimate
              </h2>
              
              {isSubmitted ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl text-white">Thank You!</h3>
                  <p className="text-gray-300">
                    We'll contact you within 2 hours to schedule your free estimate.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="form-field"
                      required
                    />
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="form-field"
                      required
                    />
                  </div>
                  
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="form-field"
                    required
                  />
                  
                  <input
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className="form-field"
                    pattern="^\(\d{3}\) \d{3}-\d{4}$"
                    title="Please enter a valid 10-digit phone number"
                    required
                  />
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-white">
                      Our premium detailing services start at $150. Is this within your budget?
                    </p>
                    <div className="flex gap-3">
                      <label className="flex-1 cursor-pointer">
                        <input 
                          type="radio" 
                          name="budget" 
                          value="yes" 
                          onChange={(e) => setFormData({...formData, budget: e.target.value})}
                          className="sr-only peer" 
                          required 
                        />
                        <div className="peer-checked:bg-primary peer-checked:border-primary peer-checked:text-white border-2 border-gray-400 text-gray-300 rounded-lg py-2.5 text-center font-semibold transition-all hover:border-primary">
                          Yes
                        </div>
                      </label>
                      <label className="flex-1 cursor-pointer">
                        <input 
                          type="radio" 
                          name="budget" 
                          value="no" 
                          onChange={(e) => setFormData({...formData, budget: e.target.value})}
                          className="sr-only peer" 
                        />
                        <div className="peer-checked:bg-primary peer-checked:border-primary peer-checked:text-white border-2 border-gray-400 text-gray-300 rounded-lg py-2.5 text-center font-semibold transition-all hover:border-primary">
                          No
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  {error && (
                    <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded">
                      {error}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    className="btn-primary w-full text-lg py-4"
                  >
                    Get My Free Estimate
                  </button>
                  
                  <p className="text-gray-400 text-xs text-center">
                    We respect your privacy. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats Bar */}
      <section id="stats" className="section-padding bg-surface">
        <div className="container-responsive">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <Reveal>
              <div className="font-display text-4xl lg:text-5xl text-primary mb-2">15+</div>
              <div className="text-sm text-text-light uppercase tracking-wider">Years Experience</div>
            </Reveal>
            <Reveal delay={100}>
              <div className="font-display text-4xl lg:text-5xl text-primary mb-2">2000+</div>
              <div className="text-sm text-text-light uppercase tracking-wider">Vehicles Detailed</div>
            </Reveal>
            <Reveal delay={200}>
              <div className="font-display text-4xl lg:text-5xl text-primary mb-2">100%</div>
              <div className="text-sm text-text-light uppercase tracking-wider">Satisfaction Rate</div>
            </Reveal>
            <Reveal delay={300}>
              <div className="font-display text-4xl lg:text-5xl text-primary mb-2">5.0</div>
              <div className="text-sm text-text-light uppercase tracking-wider">Average Rating</div>
            </Reveal>
          </div>
          
          <Reveal delay={400}>
            <DualCTA primary="Get My Free Estimate" href="#contact" />
          </Reveal>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-background">
        <div className="container-responsive">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">Our Expertise</span>
              <h2 className="font-display text-4xl lg:text-6xl text-text mb-6">
                Premium Detailing Services
              </h2>
              <p className="text-xl text-text-light max-w-3xl mx-auto">
                We use only the finest products and techniques to restore and protect your vehicle's finish.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Paint Correction",
                description: "Remove swirl marks, scratches, and oxidation to restore your paint's original luster.",
                icon: ""
              },
              {
                title: "Ceramic Coating",
                description: "Long-lasting protection that keeps your car looking showroom-fresh for years.",
                icon: ""
              },
              {
                title: "Interior Deep Clean",
                description: "Complete interior restoration including leather conditioning and fabric protection.",
                icon: ""
              },
              {
                title: "Headlight Restoration",
                description: "Crystal-clear headlights that improve visibility and vehicle appearance.",
                icon: ""
              }
            ].map((service, index) => (
              <Reveal key={service.title} delay={index * 100}>
                <div className="bg-surface p-8 rounded-2xl shadow-lg card-hover border-l-4 border-primary">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="font-display text-2xl text-text mb-4">{service.title}</h3>
                  <p className="text-text-light leading-relaxed">{service.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={500}>
            <DualCTA primary="Get My Free Estimate" href="#contact" />
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section-padding bg-surface">
        <div className="container-responsive">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">Customer Reviews</span>
              <h2 className="font-display text-4xl lg:text-6xl text-text mb-6">
                What Our Clients Say
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "Surface Theory completely transformed my BMW. The paint correction work was incredible - looks better than when I first bought it!",
                author: "Mike Johnson",
                location: "Roanoke, VA",
                rating: 5
              },
              {
                text: "Professional, thorough, and absolutely worth every penny. The ceramic coating has kept my car looking pristine for over a year.",
                author: "Sarah Williams",
                location: "Lynchburg, VA",
                rating: 5
              },
              {
                text: "Best auto detailing service in Virginia. The attention to detail is unmatched. My interior looks and smells brand new.",
                author: "David Chen",
                location: "Richmond, VA",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Reveal key={index} delay={index * 150}>
                <div className="bg-background p-8 rounded-2xl shadow-lg border border-border">
                  <div className="flex text-amber-400 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-xl">⭐</span>
                    ))}
                  </div>
                  <p className="text-text-light leading-relaxed mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-text">{testimonial.author}</p>
                    <p className="text-text-light text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={500}>
            <DualCTA primary="Get My Free Estimate" href="#contact" />
          </Reveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-padding bg-background">
        <div className="container-responsive max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">Common Questions</span>
              <h2 className="font-display text-4xl lg:text-6xl text-text mb-6">
                Frequently Asked Questions
              </h2>
            </div>
          </Reveal>

          <div className="space-y-6">
            {[
              {
                question: "How long does a typical detail take?",
                answer: "Most services take 2-6 hours depending on the package. Paint correction can take a full day, while basic washes are completed in 1-2 hours. We'll provide an exact timeframe when you book."
              },
              {
                question: "Do you offer mobile detailing services?",
                answer: "Yes! We come to your location in Virginia with all our professional equipment. Perfect for busy schedules - we detail your car at home, work, or wherever is convenient."
              },
              {
                question: "How often should I get my car detailed?",
                answer: "We recommend a full detail every 3-4 months for optimal protection and appearance. Maintenance washes every 2-3 weeks help preserve the results between details."
              },
              {
                question: "Is ceramic coating worth it?",
                answer: "Absolutely. Ceramic coating provides 2-5 years of protection, makes washing easier, and maintains that 'just detailed' look longer. Most clients say it's the best investment they've made in their vehicle."
              },
              {
                question: "What areas do you serve?",
                answer: "We serve all of central Virginia including Richmond, Charlottesville, Lynchburg, Roanoke, and surrounding areas. Contact us to confirm service in your specific location."
              },
              {
                question: "Do you guarantee your work?",
                answer: "Yes, we stand behind every service with a 100% satisfaction guarantee. If you're not completely happy, we'll make it right at no additional cost."
              }
            ].map((faq, index) => (
              <Reveal key={index} delay={index * 100}>
                <details className="bg-surface p-6 rounded-xl shadow-sm border border-border">
                  <summary className="font-display text-xl text-text cursor-pointer hover:text-primary transition-colors">
                    {faq.question}
                  </summary>
                  <p className="text-text-light mt-4 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>

          <Reveal delay={700}>
            <DualCTA primary="Get My Free Estimate" href="#contact" />
          </Reveal>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact" className="section-padding gradient-red text-white">
        <div className="container-responsive text-center">
          <Reveal>
            <h2 className="font-display text-4xl lg:text-6xl mb-6">
              Ready to Transform Your Vehicle?
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto text-white/90">
              Experience the Surface Theory difference. Get your free estimate today and see why Virginia drivers trust us with their most valuable vehicles.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="#hero" className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                Get My Free Estimate
              </a>
              <div className="flex items-center gap-4">
                <span className="text-white/80">or call us now:</span>
                <a href={PHONE_HREF} className="font-display text-2xl hover:text-amber-300 transition-colors">
                  {PHONE}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-8">
        <div className="container-responsive text-center">
          <p className="text-white/60 text-sm">
            © 2026 Surface Theory. All rights reserved. | 
            <a href="#" className="hover:text-primary transition-colors ml-1">Privacy Policy</a> | 
            <a href="#" className="hover:text-primary transition-colors ml-1">Terms</a>
          </p>
        </div>
      </footer>

      {/* Floating Sticky CTA */}
      {stickyVisible && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-white p-4 rounded-xl shadow-2xl animate-fade-in">
          <div className="text-center">
            <a href="#contact" className="block bg-white text-primary px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm mb-2">
              Get Estimate
            </a>
          </div>
        </div>
      )}
    </>
  );
}