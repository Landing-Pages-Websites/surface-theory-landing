"use client";

import { useState, useEffect } from "react";
import { Reveal } from "@/components/Reveal";
import { useTracking } from "@/hooks/useTracking";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";

const PHONE = "(704) 595-5554";
const PHONE_HREF = "tel:7045955554";

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
      <a href={href} className="btn-brass text-lg px-8 py-4">
        {primary}
      </a>
      <a href={PHONE_HREF} className="btn-outline-light px-6 py-3">
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
      {/* Header: Logo + CTA only — NO nav links */}
      <header className="fixed top-0 w-full z-50 bg-charcoal-dark/90 backdrop-blur-sm border-b border-charcoal-light/20">
        <div className="container-responsive py-4 flex items-center justify-between">
          {/* Logo matching their exact branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-12 relative">
              <svg viewBox="0 0 40 48" fill="none" className="w-full h-full">
                <rect x="1" y="1" width="38" height="46" stroke="#C5A46D" strokeWidth="1.5" fill="none"></rect>
                <path d="M20 6 C12 6 8 12 8 18 C8 24 14 28 20 28 C26 28 32 32 32 38 C32 44 26 46 20 46" stroke="#C5A46D" strokeWidth="1.5" fill="none"></path>
              </svg>
            </div>
            <div>
              <span className="font-serif text-lg tracking-[0.2em] text-bone block leading-tight">SURFACE</span>
              <span className="font-serif text-lg tracking-[0.2em] text-bone block leading-tight">THEORY</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <a href={PHONE_HREF} className="hidden sm:flex btn-outline-light">
              {PHONE}
            </a>
            <a href="#contact" className="btn-brass">
              Get Quote
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section - exact match to their styling */}
      <section className="hero-cinematic">
        <div className="hero-cinematic-content px-4">
          <span className="font-label text-brass block mb-6 animate-fade-in tracking-[0.2em]">
            Premium Surfaces
          </span>
          <h1 className="font-serif text-bone font-light leading-[1.05] mb-8 animate-fade-in-up" style={{
            fontSize: "clamp(2.5rem, 1.5rem + 5vw, 5.5rem)",
            letterSpacing: "-0.02em"
          }}>
            Where <strong className="text-brass">Craftsmanship</strong> Meets Material Science
          </h1>
          <p className="text-bone/70 text-lg md:text-xl max-w-lg mx-auto mb-10 animate-fade-in-up delay-200 tracking-wide">
            Complete interior solutions curated for the trade. Premium materials, precision installation, seamless execution.
          </p>
          
          {/* Hero Form - matching their site */}
          <div className="bg-bone/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border max-w-md mx-auto">
            <h2 className="font-serif text-2xl text-charcoal mb-6 text-center">
              Get Your Project Quote
            </h2>
            
            {isSubmitted ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-brass rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-bone" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl text-charcoal">Thank You!</h3>
                <p className="text-charcoal/60">
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
                    className="px-4 py-3 border border-charcoal-light/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass text-charcoal"
                    required
                  />
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="px-4 py-3 border border-charcoal-light/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass text-charcoal"
                    required
                  />
                </div>
                
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-charcoal-light/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass text-charcoal"
                  required
                />
                
                <input
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className="w-full px-4 py-3 border border-charcoal-light/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass text-charcoal"
                  pattern="^\(\d{3}\) \d{3}-\d{4}$"
                  title="Please enter a valid 10-digit phone number"
                  required
                />
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-charcoal">
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
                      <div className="peer-checked:bg-brass peer-checked:border-brass peer-checked:text-bone border-2 border-charcoal-light/30 text-charcoal rounded-lg py-2.5 text-center font-semibold transition-all hover:border-brass">
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
                      <div className="peer-checked:bg-brass peer-checked:border-brass peer-checked:text-bone border-2 border-charcoal-light/30 text-charcoal rounded-lg py-2.5 text-center font-semibold transition-all hover:border-brass">
                        No
                      </div>
                    </label>
                  </div>
                </div>
                
                {error && (
                  <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
                    {error}
                  </div>
                )}
                
                <button
                  type="submit"
                  className="w-full bg-brass text-bone py-4 rounded-lg font-semibold text-lg hover:bg-brass-light transition-colors"
                >
                  Get My Project Quote
                </button>
                
                <p className="text-charcoal/50 text-xs text-center">
                  Trade professionals only. We respect your privacy.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-charcoal-dark py-16 lg:py-20">
        <div className="container-responsive">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            <Reveal delay={0}>
              <div className="text-center">
                <span className="block font-serif text-4xl lg:text-5xl font-light text-brass leading-none">15+</span>
                <span className="block text-xs text-bone/50 uppercase tracking-[0.15em] mt-3 font-medium">Years of Experience</span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="text-center">
                <span className="block font-serif text-4xl lg:text-5xl font-light text-brass leading-none">500+</span>
                <span className="block text-xs text-bone/50 uppercase tracking-[0.15em] mt-3 font-medium">Projects Completed</span>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="text-center">
                <span className="block font-serif text-4xl lg:text-5xl font-light text-brass leading-none">100%</span>
                <span className="block text-xs text-bone/50 uppercase tracking-[0.15em] mt-3 font-medium">Trade Certified</span>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="text-center">
                <span className="block font-serif text-4xl lg:text-5xl font-light text-brass leading-none">5</span>
                <span className="block text-xs text-bone/50 uppercase tracking-[0.15em] mt-3 font-medium">States Served</span>
              </div>
            </Reveal>
          </div>
          
          <Reveal delay={400}>
            <DualCTA primary="Get Project Quote" href="#contact" />
          </Reveal>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-charcoal-dark py-16 lg:py-24">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <span className="font-label text-brass block mb-4 tracking-[0.2em]">What We Do</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-bone">Our Services</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                number: "01",
                title: "Hardwood Flooring",
                description: "Pre-finished and sand-finish options crafted for enduring beauty. We source the finest domestic and exotic hardwoods, delivering timeless elegance that elevates every space."
              },
              {
                number: "02", 
                title: "Tile & Stone",
                description: "Premium natural stone and porcelain tile with expert installation. From marble to travertine, we bring your vision to life with precision craftsmanship."
              },
              {
                number: "03",
                title: "Staircases", 
                description: "Custom design and precision craftsmanship for statement staircases. Every detail considered, from tread profiles to railing design."
              },
              {
                number: "04",
                title: "Wall Finishes",
                description: "Wallpaper, specialty coatings, and architectural wall treatments that transform interiors. Curated selections from the world's finest makers."
              }
            ].map((service, index) => (
              <Reveal key={service.number} delay={index * 100}>
                <div className="bg-charcoal-light/10 p-8 rounded-2xl hover:bg-charcoal-light/20 transition-all border-l-4 border-brass">
                  <div className="text-brass font-serif text-3xl font-light mb-4">{service.number}</div>
                  <h3 className="font-serif text-xl text-bone mb-4">{service.title}</h3>
                  <p className="text-bone/60 leading-relaxed">{service.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={500}>
            <DualCTA primary="Get Project Quote" href="#contact" />
          </Reveal>
        </div>
      </section>

      {/* Trade Program */}
      <section className="bg-bone-light py-16 lg:py-24">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <span className="font-label text-brass-dark block mb-6 tracking-[0.2em]">For Professionals</span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-6">Trade Program</h2>
              <p className="text-charcoal/60 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                Exclusive access, preferred pricing, and dedicated support for qualified professionals.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {[
                  { title: "Trade Pricing", desc: "Exclusive rates for qualified professionals" },
                  { title: "Design Support", desc: "Expert guidance on material selection" },
                  { title: "Sample Service", desc: "Curated samples delivered to your door" },
                  { title: "Warranty Backed", desc: "Extended protection on materials & labor" }
                ].map((benefit, i) => (
                  <div key={benefit.title} className="text-center">
                    <h3 className="text-charcoal text-sm font-medium mb-1">{benefit.title}</h3>
                    <p className="text-charcoal/50 text-sm">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="bg-charcoal-dark py-16 lg:py-24">
        <div className="container-responsive text-center">
          <Reveal>
            <span className="font-label text-brass block mb-6 tracking-[0.2em]">Experience</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-bone mb-6">Visit Our Showroom</h2>
            <p className="text-bone/60 text-lg leading-relaxed mb-10 max-w-lg mx-auto">
              Experience our materials in person. See, touch, and compare premium surfaces in a curated environment designed for professionals.
            </p>
          </Reveal>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
            {[
              { city: "Charlotte", state: "NC", status: "Coming Soon" },
              { city: "Charleston", state: "SC", status: "Coming Soon" },
              { city: "Asheville", state: "NC", status: "2026" },
              { city: "Raleigh", state: "NC", status: "2026" }
            ].map((location, index) => (
              <Reveal key={location.city} delay={index * 100}>
                <div className="text-center">
                  <span className="text-bone font-medium text-sm">{location.city}, {location.state}</span>
                  <span className="text-brass text-xs block">{location.status}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={500}>
            <DualCTA primary="Plan Your Visit" href="#contact" />
          </Reveal>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact" className="py-20 lg:py-28 bg-charcoal-dark">
        <div className="container-responsive text-center">
          <Reveal>
            <span className="font-label text-brass block mb-6 tracking-[0.2em]">Get Started</span>
            <h2 className="font-serif text-3xl md:text-4xl text-bone mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-bone/50 mb-10 max-w-lg mx-auto text-lg">
              Let's discuss how Surface Theory can simplify your next project with premium materials and expert installation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#hero" className="btn-brass">Get a Quote</a>
              <a href={PHONE_HREF} className="btn-outline-light">Call {PHONE}</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-bone py-16 lg:py-20">
        <div className="container-responsive text-center">
          <div className="mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-12">
                <svg viewBox="0 0 40 48" fill="none" className="w-full h-full">
                  <rect x="1" y="1" width="38" height="46" stroke="#C5A46D" strokeWidth="1.5" fill="none"></rect>
                  <path d="M20 6 C12 6 8 12 8 18 C8 24 14 28 20 28 C26 28 32 32 32 38 C32 44 26 46 20 46" stroke="#C5A46D" strokeWidth="1.5" fill="none"></path>
                </svg>
              </div>
              <div>
                <span className="font-serif text-lg tracking-[0.2em] text-bone block leading-tight">SURFACE</span>
                <span className="font-serif text-lg tracking-[0.2em] text-bone block leading-tight">THEORY</span>
              </div>
            </div>
            <p className="text-bone/50 text-sm max-w-md mx-auto leading-relaxed">
              Premium Materials & Expert Installation
            </p>
          </div>
          
          <div className="border-t border-charcoal-light/20 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-bone/30 text-xs tracking-wider">
                © 2026 Surface Theory. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-bone/30 hover:text-bone/60 transition-colors text-xs tracking-wider">Privacy Policy</a>
                <a href="#" className="text-bone/30 hover:text-bone/60 transition-colors text-xs tracking-wider">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Sticky CTA */}
      {stickyVisible && (
        <div className="fixed bottom-6 right-6 z-50 bg-brass text-bone p-4 rounded-xl shadow-2xl">
          <div className="text-center">
            <a href="#contact" className="block bg-bone text-brass px-4 py-2 rounded-lg font-semibold hover:bg-bone/90 transition-colors text-sm">
              Get Quote
            </a>
          </div>
        </div>
      )}
    </>
  );
}