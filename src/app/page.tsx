"use client";

import { useState, useRef, useEffect } from "react";
import { useTracking } from "@/hooks/useTracking";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";

const PHONE = "980-505-1218";
const PHONE_HREF = "tel:9805051218";

// Professional reveal animation component
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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
      } ${className}`}
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
    timeline: '',
    services: '',
    projectDetails: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Initialize tracking
  useTracking({
    siteKey: "sk_mmtr8zpr_cdhmo9hb7ka",
  });

  const { submit: submitLead } = useMegaLeadForm();

  // Show sticky CTA after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      setStickyVisible(window.scrollY > window.innerHeight * 0.7);
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
    
    if (!formData.timeline) {
      setError("Please select your project timeline");
      return;
    }
    
    if (!formData.services) {
      setError("Please select which services you're interested in");
      return;
    }
    
    try {
      // Strip phone to digits only for submission
      const phoneDigits = formData.phone.replace(/\D/g, '');
      
      const result = await submitLead({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: phoneDigits,
        timeline: formData.timeline,
        services: formData.services,
        projectDetails: formData.projectDetails,
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
      {/* Header - Dark luxury theme matching their site */}
      <header className="fixed top-0 w-full z-50 bg-surface-dark/95 backdrop-blur-sm border-b border-surface-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Matching their exact styling */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-12 relative">
                <svg viewBox="0 0 40 48" fill="none" className="w-full h-full">
                  <rect x="1" y="1" width="38" height="46" stroke="#c5a46d" strokeWidth="1.5" fill="none"></rect>
                  <path d="M20 6 C12 6 8 12 8 18 C8 24 14 28 20 28 C26 28 32 32 32 38 C32 44 26 46 20 46" stroke="#c5a46d" strokeWidth="1.5" fill="none"></path>
                </svg>
              </div>
              <div>
                <div className="font-serif text-sm tracking-[0.2em] text-surface-cream leading-tight font-semibold">SURFACE</div>
                <div className="font-serif text-sm tracking-[0.2em] text-surface-cream leading-tight font-semibold">THEORY</div>
              </div>
            </div>
            
            {/* Header CTA */}
            <div className="flex items-center gap-4">
              <a href={PHONE_HREF} className="hidden sm:block text-surface-cream/80 hover:text-brass transition-colors font-medium">
                {PHONE}
              </a>
              <a href="#hero" className="bg-brass text-surface-dark px-6 py-2.5 rounded-lg font-semibold hover:bg-brass-light transition-colors">
                Get Quote
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Matching their exact dark luxury aesthetic */}
      <section id="hero" className="relative min-h-screen flex items-center bg-surface-darker overflow-hidden pt-16">
        {/* Background image from their site */}
        <div className="absolute inset-0">
          <img 
            src="/images/hero.webp" 
            alt="Luxury living room with premium hardwood flooring"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-surface-darker/75"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content - Professional spacing and typography */}
            <Reveal>
              <div className="text-center lg:text-left space-y-8">
                <div className="text-brass text-sm font-semibold tracking-[0.2em] uppercase">
                  Premium Surfaces
                </div>
                
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-surface-cream font-light leading-[1.1] tracking-tight">
                  Where <span className="text-brass">Craftsmanship</span><br />
                  Meets Material Science
                </h1>
                
                <p className="text-xl lg:text-2xl text-surface-cream/80 leading-relaxed max-w-2xl font-light">
                  Complete interior solutions curated for the trade. Premium hardwood flooring, 
                  tile & stone, custom staircases, and wall finishes.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <a href="#hero" className="bg-brass text-surface-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brass-light transition-all shadow-lg">
                    Get Project Quote
                  </a>
                  <a href={PHONE_HREF} className="border-2 border-brass text-brass px-8 py-4 rounded-lg font-semibold hover:bg-brass hover:text-surface-dark transition-all">
                    Call {PHONE}
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Right: Form - Elevated design */}
            <Reveal delay={300}>
              <div className="bg-surface-cream/95 backdrop-blur-sm p-8 lg:p-10 rounded-2xl shadow-2xl border border-surface-light/20">
                <h2 className="font-serif text-2xl lg:text-3xl text-surface-dark mb-8 text-center">
                  Get Your Project Quote
                </h2>
                
                {isSubmitted ? (
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 bg-brass rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-10 h-10 text-surface-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl text-surface-dark font-serif">Thank You!</h3>
                    <p className="text-surface-dark/70 text-lg leading-relaxed">
                      We'll contact you within 2 hours to discuss your premium surface project requirements.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="w-full px-4 py-4 border border-surface-light/30 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brass focus:border-transparent text-surface-dark placeholder:text-surface-dark/50"
                        required
                      />
                      <input
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full px-4 py-4 border border-surface-light/30 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brass focus:border-transparent text-surface-dark placeholder:text-surface-dark/50"
                        required
                      />
                    </div>
                    
                    <input
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-4 border border-surface-light/30 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brass focus:border-transparent text-surface-dark placeholder:text-surface-dark/50"
                      required
                    />
                    
                    <input
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className="w-full px-4 py-4 border border-surface-light/30 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brass focus:border-transparent text-surface-dark placeholder:text-surface-dark/50"
                      pattern="^\(\d{3}\) \d{3}-\d{4}$"
                      title="Please enter a valid 10-digit phone number"
                      required
                    />
                    
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                      className="w-full px-4 py-4 border border-surface-light/30 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brass focus:border-transparent text-surface-dark appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA2TDExIDEiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHN2Zz4K')] bg-no-repeat bg-right bg-[center_right_1rem]"
                      required
                    >
                      <option value="" disabled className="text-surface-dark/50">Project Timeline</option>
                      <option value="immediately">Immediately</option>
                      <option value="1-3months">1-3 months</option>
                      <option value="3-6months">3-6 months</option>
                      <option value="6+months">6+ months</option>
                      <option value="justExploring">Just Exploring</option>
                    </select>
                    
                    <select
                      name="services"
                      value={formData.services}
                      onChange={(e) => setFormData({...formData, services: e.target.value})}
                      className="w-full px-4 py-4 border border-surface-light/30 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brass focus:border-transparent text-surface-dark appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA2TDExIDEiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHN2Zz4K')] bg-no-repeat bg-right bg-[center_right_1rem]"
                      required
                    >
                      <option value="" disabled className="text-surface-dark/50">Services Interested In</option>
                      <option value="hardwoodFlooring">Hardwood Flooring</option>
                      <option value="tileStone">Tile & Stone</option>
                      <option value="staircases">Staircases</option>
                      <option value="interiorTrim">Interior Trim</option>
                      <option value="wallFinishes">Wall Finishes</option>
                      <option value="decking">Decking</option>
                      <option value="cabinetCAD">Cabinet CAD</option>
                      <option value="finishPackages">Finish Packages</option>
                      <option value="garageRemodeling">Garage Remodeling</option>
                      <option value="multipleServices">Multiple Services</option>
                      <option value="other">Other</option>
                    </select>
                    
                    <textarea
                      name="projectDetails"
                      placeholder="Project Details (optional)"
                      value={formData.projectDetails}
                      onChange={(e) => setFormData({...formData, projectDetails: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-4 border border-surface-light/30 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brass focus:border-transparent text-surface-dark placeholder:text-surface-dark/50 resize-none"
                    />
                    
                    {error && (
                      <div className="text-red-600 text-sm bg-red-50 p-4 rounded-xl border border-red-200">
                        {error}
                      </div>
                    )}
                    
                    <button
                      type="submit"
                      className="w-full bg-brass text-surface-dark py-4 rounded-xl font-semibold text-lg hover:bg-brass-light transition-colors shadow-lg"
                    >
                      Get My Project Quote
                    </button>
                    
                    <p className="text-surface-dark/60 text-sm text-center">
                      Trade professionals only. We respect your privacy.
                    </p>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats Section - Professional design */}
      <section id="stats" className="py-24 bg-surface-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { number: "15+", label: "Years Experience" },
              { number: "500+", label: "Projects Completed" },
              { number: "100%", label: "Trade Certified" },
              { number: "5", label: "States Served" }
            ].map((stat, index) => (
              <Reveal key={stat.label} delay={index * 100}>
                <div>
                  <div className="font-serif text-5xl lg:text-6xl font-light text-brass mb-3">{stat.number}</div>
                  <div className="text-surface-dark/70 font-medium tracking-wider uppercase text-sm">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Premium layout */}
      <section id="services" className="py-24 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-20">
              <div className="text-brass text-sm font-semibold tracking-[0.2em] uppercase mb-6">Our Expertise</div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-surface-cream mb-8 font-light">
                Premium Surface Solutions
              </h2>
              <p className="text-xl text-surface-cream/70 max-w-4xl mx-auto leading-relaxed">
                Curated for the trade. Premium materials, precision installation, seamless execution across North Carolina.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {[
              {
                number: "01",
                title: "Hardwood Flooring",
                description: "Pre-finished and sand-finish hardwood flooring crafted for enduring beauty. We source the finest domestic and exotic hardwoods, delivering timeless elegance that elevates every space.",
                image: "/images/hardwood.jpeg"
              },
              {
                number: "02", 
                title: "Tile & Stone",
                description: "Premium natural stone and porcelain tile with expert installation. From marble to travertine, we bring your vision to life with precision craftsmanship and attention to detail.",
                image: "/images/tile-stone.jpeg"
              },
              {
                number: "03",
                title: "Custom Staircases", 
                description: "Custom design and precision craftsmanship for statement staircases. Every detail considered and executed, from tread profiles to railing design and finish work.",
                image: "/images/staircase.jpeg"
              },
              {
                number: "04",
                title: "Wall Finishes",
                description: "Wallpaper, specialty coatings, and architectural wall treatments that transform interiors. Curated selections from the world's finest makers and craftspeople.",
                image: "/images/wall-finishes.jpeg"
              }
            ].map((service, index) => (
              <Reveal key={service.number} delay={index * 150}>
                <div className="bg-surface-light/30 p-8 lg:p-10 rounded-2xl hover:bg-surface-light/40 transition-all border border-surface-light/20 overflow-hidden">
                  <div className="relative mb-8">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="text-brass font-serif text-3xl font-light bg-surface-dark/80 px-3 py-1 rounded">{service.number}</div>
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl text-surface-cream mb-6">{service.title}</h3>
                  <p className="text-surface-cream/70 leading-relaxed text-lg">{service.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={600}>
            <div className="text-center mt-16">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#hero" className="bg-brass text-surface-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brass-light transition-colors shadow-lg">
                  Get Project Quote
                </a>
                <a href={PHONE_HREF} className="border-2 border-brass text-brass px-8 py-4 rounded-lg font-semibold hover:bg-brass hover:text-surface-dark transition-all">
                  Call {PHONE}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials - Sophisticated layout */}
      <section id="testimonials" className="py-24 bg-surface-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-20">
              <div className="text-brass text-sm font-semibold tracking-[0.2em] uppercase mb-6">Client Success</div>
              <h2 className="font-serif text-4xl md:text-5xl text-surface-dark mb-8 font-light">Trusted by Trade Professionals</h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                quote: "Surface Theory transformed our luxury home project. The attention to detail and material quality exceeded our highest expectations.",
                author: "Sarah Chen",
                title: "Interior Designer, Charlotte"
              },
              {
                quote: "Their expertise in hardwood installation is unmatched in the region. Every surface they touch becomes a work of art.",
                author: "Mike Rodriguez", 
                title: "General Contractor"
              },
              {
                quote: "The custom staircase they designed became the centerpiece of our home. Absolutely stunning craftsmanship and execution.",
                author: "Jennifer Hayes",
                title: "Architect, Raleigh"
              }
            ].map((testimonial, index) => (
              <Reveal key={testimonial.author} delay={index * 200}>
                <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-sm border border-surface-light/10 hover:shadow-lg transition-all">
                  <div className="flex mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-brass fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-surface-dark/80 mb-8 italic text-lg leading-relaxed">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold text-surface-dark text-lg">{testimonial.author}</div>
                    <div className="text-surface-dark/60 mt-1">{testimonial.title}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={600}>
            <div className="text-center mt-16">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#hero" className="bg-brass text-surface-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brass-light transition-colors shadow-lg">
                  Get Project Quote
                </a>
                <a href={PHONE_HREF} className="border-2 border-brass text-brass px-8 py-4 rounded-lg font-semibold hover:bg-brass hover:text-surface-dark transition-all">
                  Call {PHONE}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Project Gallery Section */}
      <section className="py-24 bg-surface-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-20">
              <div className="text-brass text-sm font-semibold tracking-[0.2em] uppercase mb-6">Our Work</div>
              <h2 className="font-serif text-4xl md:text-5xl text-surface-dark mb-8 font-light">
                Crafted Spaces
              </h2>
              <p className="text-xl text-surface-dark/70 max-w-4xl mx-auto leading-relaxed">
                Every project reflects our commitment to exceptional craftsmanship and attention to detail.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { src: "/images/modern-kitchen.jpeg", alt: "Modern Kitchen", title: "Contemporary Kitchen" },
              { src: "/images/master-bath.jpeg", alt: "Master Bath", title: "Luxury Master Bath" },
              { src: "/images/hardwood.jpeg", alt: "Hardwood Installation", title: "Premium Hardwood" },
              { src: "/images/tile-stone.jpeg", alt: "Tile & Stone Work", title: "Natural Stone" },
              { src: "/images/staircase.jpeg", alt: "Custom Staircase", title: "Grand Staircase" },
              { src: "/images/wall-finishes.jpeg", alt: "Wall Finishes", title: "Architectural Finishes" }
            ].map((item, index) => (
              <Reveal key={index} delay={index * 100}>
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                  <img 
                    src={item.src} 
                    alt={item.alt}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-6 left-6">
                      <h3 className="text-surface-cream font-serif text-xl">{item.title}</h3>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={600}>
            <div className="text-center mt-16">
              <a href="#hero" className="bg-brass text-surface-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brass-light transition-colors shadow-lg">
                Start Your Project
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* About/Process Section */}
      <section id="about" className="py-24 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <div className="text-brass text-sm font-semibold tracking-[0.2em] uppercase mb-6">Our Process</div>
                <h2 className="font-serif text-4xl md:text-5xl text-surface-cream mb-8 font-light">
                  Precision in Every Detail
                </h2>
                <p className="text-xl text-surface-cream/70 leading-relaxed mb-8">
                  Our meticulous approach ensures every project meets the highest standards of craftsmanship 
                  and durability. From initial consultation to final installation, we maintain the precision 
                  that defines exceptional surface work.
                </p>
                
                <div className="space-y-6">
                  {[
                    { step: "01", title: "Consultation & Planning", desc: "Detailed project assessment and material selection" },
                    { step: "02", title: "Precision Installation", desc: "Expert installation using specialized techniques" },
                    { step: "03", title: "Quality Assurance", desc: "Thorough inspection and finishing touches" }
                  ].map((item, index) => (
                    <div key={item.step} className="flex gap-6">
                      <div className="text-brass font-serif text-xl font-light">{item.step}</div>
                      <div>
                        <h3 className="text-surface-cream font-semibold mb-2">{item.title}</h3>
                        <p className="text-surface-cream/60">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={200}>
              <div className="bg-surface-light/20 p-8 lg:p-10 rounded-2xl border border-surface-light/20">
                <h3 className="font-serif text-2xl text-surface-cream mb-6">Why Trade Professionals Choose Us</h3>
                <div className="space-y-4">
                  {[
                    "Licensed & insured in all service areas",
                    "Specialized tools and installation techniques", 
                    "Direct relationships with premium suppliers",
                    "Flexible scheduling for project timelines",
                    "Comprehensive warranty on materials & labor"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-brass rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-surface-cream/80">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
          
          <Reveal delay={400}>
            <div className="text-center mt-16">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#hero" className="bg-brass text-surface-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brass-light transition-colors shadow-lg">
                  Get Project Quote
                </a>
                <a href={PHONE_HREF} className="border-2 border-brass text-brass px-8 py-4 rounded-lg font-semibold hover:bg-brass hover:text-surface-dark transition-all">
                  Call {PHONE}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="quote" className="py-32 bg-gradient-to-br from-surface-darker via-surface-dark to-surface-light text-surface-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('data:image/svg+xml,<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="hexagons" patternUnits="userSpaceOnUse" width="60" height="60"><path d="M30 2l26 15v30L30 62 4 47V17z" fill="none" stroke="%23c5a46d" stroke-width="1" opacity="0.1"/></pattern></defs><rect width="60" height="60" fill="url(%23hexagons)"/></svg>')`
            }}
          ></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <div className="text-brass text-sm font-semibold tracking-[0.2em] uppercase mb-8">Get Started</div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 font-light">
              Ready to Start Your Project?
            </h2>
            <p className="text-surface-cream/80 mb-12 max-w-3xl mx-auto text-xl leading-relaxed">
              Let's discuss how Surface Theory can elevate your next project with premium materials, 
              expert installation, and the craftsmanship that defines exceptional interior spaces.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="#hero" className="bg-brass text-surface-dark px-10 py-5 rounded-lg font-semibold text-xl hover:bg-brass-light transition-all shadow-lg transform hover:scale-105">
                Get Project Quote
              </a>
              <div className="flex items-center gap-6">
                <span className="text-surface-cream/70 text-lg">or call us:</span>
                <a href={PHONE_HREF} className="font-serif text-3xl text-brass hover:text-brass-light transition-colors">
                  {PHONE}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-darker text-surface-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-10 h-12">
              <svg viewBox="0 0 40 48" fill="none" className="w-full h-full">
                <rect x="1" y="1" width="38" height="46" stroke="#c5a46d" strokeWidth="1.5" fill="none"></rect>
                <path d="M20 6 C12 6 8 12 8 18 C8 24 14 28 20 28 C26 28 32 32 32 38 C32 44 26 46 20 46" stroke="#c5a46d" strokeWidth="1.5" fill="none"></path>
              </svg>
            </div>
            <div>
              <div className="font-serif text-xl tracking-[0.2em] text-surface-cream leading-tight">SURFACE</div>
              <div className="font-serif text-xl tracking-[0.2em] text-surface-cream leading-tight">THEORY</div>
            </div>
          </div>
          
          <p className="text-surface-cream/60 mb-12 text-lg">
            Premium Materials & Expert Installation
          </p>
          
          <div className="border-t border-surface-light/20 pt-12">
            <p className="text-surface-cream/40 text-sm">
              © 2026 Surface Theory. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Sticky CTA */}
      {stickyVisible && (
        <div className="fixed bottom-8 right-8 z-50 bg-brass text-surface-dark p-4 rounded-xl shadow-2xl transform transition-all hover:scale-105">
          <a href="#hero" className="block bg-surface-dark text-brass px-4 py-3 rounded-lg font-semibold hover:bg-surface-light transition-colors text-sm">
            Get Quote
          </a>
        </div>
      )}
    </>
  );
}