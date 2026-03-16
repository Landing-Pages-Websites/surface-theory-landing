"use client";

import { useState, useEffect } from "react";
import { Reveal } from "@/components/Reveal";
import { useTracking } from "@/hooks/useTracking";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";

const PHONE = "(980) 505-1218";
const PHONE_HREF = "tel:9805051218";

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
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur border-b">
        <div className="container-responsive py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-800 rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-sm">ST</span>
            </div>
            <div className="font-display text-2xl text-slate-800">SURFACE THEORY</div>
          </div>
          
          <div className="flex items-center gap-4">
            <a href={PHONE_HREF} className="hidden sm:flex btn-secondary">
              {PHONE}
            </a>
            <a href="#contact" className="btn-primary">
              Get Quote
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900">
        <div className="container-responsive grid lg:grid-cols-2 gap-12 items-center py-20">
          {/* Left: Headlines & Copy */}
          <div className="space-y-8">
            <Reveal>
              <span className="text-amber-400 font-semibold tracking-wider uppercase text-sm">
                PREMIUM MATERIALS • EXPERT INSTALLATION
              </span>
              <h1 className="font-display text-5xl lg:text-7xl text-white leading-tight">
                WHERE <span className="text-amber-400">CRAFTSMANSHIP</span> MEETS MATERIAL SCIENCE
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Complete interior surface solutions for builders, designers, and contractors. 
                Premium hardwood flooring, tile & stone, custom staircases, and architectural wall finishes.
              </p>
            </Reveal>
            
            <Reveal delay={200}>
              <div className="grid grid-cols-2 gap-6 py-6">
                <div className="text-center">
                  <div className="font-display text-3xl text-amber-400">15+</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="font-display text-3xl text-amber-400">500+</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Projects Completed</div>
                </div>
              </div>
              <DualCTA primary="Get Project Quote" href="#contact" />
            </Reveal>
          </div>

          {/* Right: Lead Form */}
          <Reveal delay={300}>
            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border">
              <h2 className="font-display text-2xl text-slate-800 mb-6 text-center">
                Get Your Project Quote
              </h2>
              
              {isSubmitted ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl text-slate-800">Thank You!</h3>
                  <p className="text-gray-600">
                    We'll contact you within 2 hours to discuss your surface project requirements.
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
                      className="form-field bg-white"
                      required
                    />
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="form-field bg-white"
                      required
                    />
                  </div>
                  
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="form-field bg-white"
                    required
                  />
                  
                  <input
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className="form-field bg-white"
                    pattern="^\(\d{3}\) \d{3}-\d{4}$"
                    title="Please enter a valid 10-digit phone number"
                    required
                  />
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-700">
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
                        <div className="peer-checked:bg-amber-600 peer-checked:border-amber-600 peer-checked:text-white border-2 border-gray-300 text-gray-700 rounded-lg py-2.5 text-center font-semibold transition-all hover:border-amber-600">
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
                        <div className="peer-checked:bg-amber-600 peer-checked:border-amber-600 peer-checked:text-white border-2 border-gray-300 text-gray-700 rounded-lg py-2.5 text-center font-semibold transition-all hover:border-amber-600">
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
                    className="btn-primary w-full text-lg py-4"
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
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-white">
        <div className="container-responsive">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-amber-600 font-semibold tracking-wider uppercase text-sm">Our Expertise</span>
              <h2 className="font-display text-4xl lg:text-6xl text-slate-800 mb-6">
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
                description: "Pre-finished and sand-finish options crafted for enduring beauty. Domestic and exotic hardwoods that elevate every space."
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
                <div className="bg-slate-50 p-8 rounded-2xl hover:shadow-lg transition-all border-l-4 border-amber-600">
                  <div className="text-amber-600 font-display text-3xl font-bold mb-4">{service.number}</div>
                  <h3 className="font-display text-xl text-slate-800 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
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
      <section className="section-padding bg-slate-800 text-white">
        <div className="container-responsive">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div>
                <span className="text-amber-400 font-semibold tracking-wider uppercase text-sm">For Professionals</span>
                <h2 className="font-display text-4xl lg:text-5xl mb-6">Trade Program</h2>
                <p className="text-xl text-gray-300 mb-8">
                  Exclusive access, preferred pricing, and dedicated support for qualified professionals.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    "Trade Pricing",
                    "Design Support", 
                    "Sample Service",
                    "Warranty Backed"
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={200}>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <h3 className="font-display text-2xl mb-6">Join Our Trade Network</h3>
                <p className="text-gray-300 mb-6">
                  Get exclusive access to premium materials and preferred pricing for qualified trade professionals.
                </p>
                <a href="#contact" className="inline-flex items-center px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors">
                  Apply for Trade Access
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="section-padding bg-white">
        <div className="container-responsive text-center">
          <Reveal>
            <span className="text-amber-600 font-semibold tracking-wider uppercase text-sm">Our Reach</span>
            <h2 className="font-display text-4xl lg:text-5xl text-slate-800 mb-12">North Carolina Locations</h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { city: "Charlotte", status: "Coming Soon" },
              { city: "Charleston", status: "Coming Soon" },
              { city: "Asheville", status: "2026" },
              { city: "Raleigh", status: "2026" }
            ].map((location, index) => (
              <Reveal key={location.city} delay={index * 100}>
                <div className="text-center">
                  <h3 className="font-display text-xl text-slate-800 mb-2">{location.city}</h3>
                  <p className="text-amber-600 font-semibold">{location.status}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={500}>
            <DualCTA primary="Get Project Quote" href="#contact" />
          </Reveal>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact" className="section-padding bg-gradient-to-br from-slate-900 to-amber-900 text-white">
        <div className="container-responsive text-center">
          <Reveal>
            <h2 className="font-display text-4xl lg:text-6xl mb-6">
              Ready to Start Your Surface Project?
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto text-white/90">
              Let's discuss how Surface Theory can elevate your next project with premium materials and expert installation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="#hero" className="bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-700 transition-colors">
                Get Project Quote
              </a>
              <div className="flex items-center gap-4">
                <span className="text-white/80">or call us:</span>
                <a href={PHONE_HREF} className="font-display text-2xl hover:text-amber-300 transition-colors">
                  {PHONE}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="container-responsive text-center">
          <p className="text-white/60 text-sm">
            © 2026 Surface Theory. All rights reserved. | 
            <a href="#" className="hover:text-amber-400 transition-colors ml-1">Privacy Policy</a> | 
            <a href="#" className="hover:text-amber-400 transition-colors ml-1">Terms</a>
          </p>
        </div>
      </footer>

      {/* Floating Sticky CTA */}
      {stickyVisible && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-600 text-white p-4 rounded-xl shadow-2xl animate-fade-in">
          <div className="text-center">
            <a href="#contact" className="block bg-white text-amber-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm mb-2">
              Get Quote
            </a>
          </div>
        </div>
      )}
    </>
  );
}