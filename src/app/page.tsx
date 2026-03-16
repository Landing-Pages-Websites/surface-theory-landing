"use client";

import { useState, useRef, useEffect } from "react";
import { useTracking } from "@/hooks/useTracking";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";

const PHONE = "(704) 595-5554";
const PHONE_HREF = "tel:7045955554";

// Reveal animation component
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
}

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
    siteKey: "sk_mmee4055_st_surfaces_nc",
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
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-10 relative">
                <svg viewBox="0 0 40 48" fill="none" className="w-full h-full">
                  <rect x="1" y="1" width="38" height="46" stroke="#C5A46D" strokeWidth="1.5" fill="none"></rect>
                  <path d="M20 6 C12 6 8 12 8 18 C8 24 14 28 20 28 C26 28 32 32 32 38 C32 44 26 46 20 46" stroke="#C5A46D" strokeWidth="1.5" fill="none"></path>
                </svg>
              </div>
              <div>
                <div className="font-serif text-sm tracking-[0.2em] text-gray-800 leading-tight font-semibold">SURFACE</div>
                <div className="font-serif text-sm tracking-[0.2em] text-gray-800 leading-tight font-semibold">THEORY</div>
              </div>
            </div>
            
            {/* Header CTA */}
            <div className="flex items-center gap-4">
              <a href={PHONE_HREF} className="hidden sm:block text-gray-600 hover:text-gray-800 transition-colors font-semibold">
                {PHONE}
              </a>
              <a href="#quote" className="bg-amber-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                Get Quote
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <Reveal>
              <div className="text-center lg:text-left">
                <div className="text-amber-400 text-sm font-semibold tracking-wider uppercase mb-6">
                  Premium Surfaces
                </div>
                
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-light leading-tight mb-6">
                  Where <span className="text-amber-400">Craftsmanship</span><br />
                  Meets Material Science
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
                  Complete interior solutions curated for the trade. Premium materials, 
                  precision installation, seamless execution.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href="#quote" className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                    Get Project Quote
                  </a>
                  <a href={PHONE_HREF} className="border-2 border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:border-white/60 hover:bg-white/10 transition-colors">
                    Call {PHONE}
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Right: Form */}
            <Reveal delay={200}>
              <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
                <h2 className="font-serif text-2xl text-gray-800 mb-6 text-center">
                  Get Your Project Quote
                </h2>
                
                {isSubmitted ? (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl text-gray-800 font-semibold">Thank You!</h3>
                    <p className="text-gray-600">
                      We'll contact you within 2 hours to discuss your premium surface project.
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                        required
                      />
                      <input
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <input
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                      required
                    />
                    
                    <input
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                      pattern="^\(\d{3}\) \d{3}-\d{4}$"
                      title="Please enter a valid 10-digit phone number"
                      required
                    />
                    
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-gray-700">
                        Our premium surface projects start at $5,000. Is this within your budget?
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
                          <div className="peer-checked:bg-amber-600 peer-checked:border-amber-600 peer-checked:text-white border-2 border-gray-300 text-gray-700 rounded-lg py-3 text-center font-semibold transition-all hover:border-amber-600">
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
                          <div className="peer-checked:bg-amber-600 peer-checked:border-amber-600 peer-checked:text-white border-2 border-gray-300 text-gray-700 rounded-lg py-3 text-center font-semibold transition-all hover:border-amber-600">
                            No
                          </div>
                        </label>
                      </div>
                    </div>
                    
                    {error && (
                      <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                        {error}
                      </div>
                    )}
                    
                    <button
                      type="submit"
                      className="w-full bg-amber-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-amber-700 transition-colors"
                    >
                      Get My Project Quote
                    </button>
                    
                    <p className="text-gray-500 text-xs text-center">
                      Trade professionals only. We respect your privacy.
                    </p>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <div className="text-amber-600 text-sm font-semibold tracking-wider uppercase mb-4">Our Experience</div>
              <h2 className="font-serif text-3xl md:text-4xl text-gray-800">15 Years of Excellence</h2>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "15+", label: "Years Experience" },
              { number: "500+", label: "Projects Completed" },
              { number: "100%", label: "Trade Certified" },
              { number: "5", label: "States Served" }
            ].map((stat, index) => (
              <Reveal key={stat.label} delay={index * 100}>
                <div>
                  <div className="font-serif text-4xl lg:text-5xl font-light text-amber-600 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600 uppercase tracking-wider">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <div className="text-amber-600 text-sm font-semibold tracking-wider uppercase mb-4">Our Expertise</div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-6">
                Premium Surface Solutions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Curated for the trade. Premium materials, precision installation, seamless execution.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "01",
                title: "Hardwood Flooring",
                description: "Pre-finished and sand-finish options crafted for enduring beauty. We source the finest domestic and exotic hardwoods."
              },
              {
                number: "02", 
                title: "Tile & Stone",
                description: "Premium natural stone and porcelain tile with expert installation. From marble to travertine, precision craftsmanship."
              },
              {
                number: "03",
                title: "Custom Staircases", 
                description: "Custom design and precision craftsmanship for statement staircases. Every detail from tread profiles to railing design."
              },
              {
                number: "04",
                title: "Wall Finishes",
                description: "Wallpaper, specialty coatings, and architectural treatments. Curated selections from the world's finest makers."
              }
            ].map((service, index) => (
              <Reveal key={service.number} delay={index * 100}>
                <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all border-l-4 border-amber-600">
                  <div className="text-amber-600 font-serif text-2xl font-light mb-3">{service.number}</div>
                  <h3 className="font-serif text-xl text-gray-800 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{service.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={500}>
            <div className="text-center mt-12">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#quote" className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                  Get Project Quote
                </a>
                <a href={PHONE_HREF} className="border-2 border-amber-600 text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors">
                  Call {PHONE}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <div className="text-amber-600 text-sm font-semibold tracking-wider uppercase mb-4">What Our Clients Say</div>
              <h2 className="font-serif text-3xl md:text-4xl text-gray-800">Trusted by Trade Professionals</h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Surface Theory transformed our luxury home project. The attention to detail and material quality exceeded expectations.",
                author: "Sarah Chen",
                title: "Interior Designer"
              },
              {
                quote: "Their expertise in hardwood installation is unmatched. Every surface they touch becomes a work of art.",
                author: "Mike Rodriguez", 
                title: "General Contractor"
              },
              {
                quote: "The custom staircase they designed became the centerpiece of our home. Absolutely stunning craftsmanship.",
                author: "Jennifer Hayes",
                title: "Architect"
              }
            ].map((testimonial, index) => (
              <Reveal key={testimonial.author} delay={index * 150}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.title}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={500}>
            <div className="text-center mt-12">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#quote" className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                  Get Project Quote
                </a>
                <a href={PHONE_HREF} className="border-2 border-amber-600 text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors">
                  Call {PHONE}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="quote" className="py-20 lg:py-28 bg-gradient-to-br from-gray-800 to-amber-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <div className="text-amber-400 text-sm font-semibold tracking-wider uppercase mb-6">Get Started</div>
            <h2 className="font-serif text-3xl md:text-4xl mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-white/90 mb-10 max-w-2xl mx-auto text-lg">
              Let's discuss how Surface Theory can elevate your next project with premium materials and expert installation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="#hero" className="bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-700 transition-colors">
                Get Project Quote
              </a>
              <div className="flex items-center gap-4">
                <span className="text-white/80">or call us:</span>
                <a href={PHONE_HREF} className="font-serif text-2xl hover:text-amber-300 transition-colors">
                  {PHONE}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-10">
              <svg viewBox="0 0 40 48" fill="none" className="w-full h-full">
                <rect x="1" y="1" width="38" height="46" stroke="#C5A46D" strokeWidth="1.5" fill="none"></rect>
                <path d="M20 6 C12 6 8 12 8 18 C8 24 14 28 20 28 C26 28 32 32 32 38 C32 44 26 46 20 46" stroke="#C5A46D" strokeWidth="1.5" fill="none"></path>
              </svg>
            </div>
            <div>
              <div className="font-serif text-lg tracking-[0.2em] text-gray-300 leading-tight">SURFACE</div>
              <div className="font-serif text-lg tracking-[0.2em] text-gray-300 leading-tight">THEORY</div>
            </div>
          </div>
          
          <p className="text-gray-400 mb-8">
            Premium Materials & Expert Installation
          </p>
          
          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-500 text-sm">
              © 2026 Surface Theory. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Sticky CTA */}
      {stickyVisible && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-600 text-white p-4 rounded-xl shadow-2xl">
          <a href="#quote" className="block bg-white text-amber-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm">
            Get Quote
          </a>
        </div>
      )}
    </>
  );
}