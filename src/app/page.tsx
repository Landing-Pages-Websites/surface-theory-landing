"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/sections/Header";
import { HeroSplit } from "@/components/sections/HeroSplit";
import { StatsAnimated } from "@/components/sections/StatsAnimated";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { TestimonialsGrid } from "@/components/sections/TestimonialsGrid";
import { CTAGradient } from "@/components/sections/CTAGradient";
import { FloatingCTA } from "@/components/sections/FloatingCTA";
import { FooterLegal } from "@/components/sections/FooterLegal";
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

export default function SurfaceTheoryLanding() {
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

  // Hero form component
  const HeroForm = () => {
    if (isSubmitted) {
      return (
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
      );
    }

    return (
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
    );
  };

  return (
    <>
      <Header 
        logoText="SURFACE THEORY"
        phone={PHONE_HREF}
        phoneFormatted={PHONE}
        ctaText="Get Quote"
        ctaHref="#contact"
      />

      <HeroSplit
        eyebrow="Premium Surfaces"
        headlineLines={[
          { text: "Where " },
          { text: "Craftsmanship", accent: true },
          { text: " Meets Material Science" }
        ]}
        subtitle="Complete interior solutions curated for the trade. Premium materials, precision installation, seamless execution."
        trustItems={["15+ Years Experience", "500+ Projects", "Trade Certified"]}
        primaryCTA={{
          text: "Get Project Quote",
          href: "#contact"
        }}
        phoneCTA={{
          text: `Call ${PHONE}`,
          href: PHONE_HREF
        }}
        formTitle="Get Your Project Quote"
        formFields={[
          { name: "firstName", id: "firstName", label: "First Name", type: "text" },
          { name: "lastName", id: "lastName", label: "Last Name", type: "text" },
          { name: "email", id: "email", label: "Email", type: "email" },
          { name: "phone", id: "phone", label: "Phone", type: "tel" }
        ]}
        formSelectOptions={[
          { value: "yes", label: "Yes, $5,000+ is within budget" },
          { value: "no", label: "No, I need a smaller project" }
        ]}
        formSelectLabel="Budget Range"
        formButtonText="Get My Project Quote"
        formDisclaimer="Trade professionals only. We respect your privacy."
      />

      <StatsAnimated
        title="Our Experience"
        stats={[
          { value: 15, suffix: "+", label: "Years Experience" },
          { value: 500, suffix: "+", label: "Projects Completed" },
          { value: 100, suffix: "%", label: "Trade Certified" },
          { value: 5, label: "States Served" }
        ]}
        variant="default"
      />

      <FeaturesGrid
        title="Premium Surface Solutions"
        subtitle="Curated for the trade. Premium materials, precision installation, seamless execution."
        features={[
          {
            title: "Hardwood Flooring",
            description: "Pre-finished and sand-finish options crafted for enduring beauty. We source the finest domestic and exotic hardwoods.",
            icon: "Wood"
          },
          {
            title: "Tile & Stone", 
            description: "Premium natural stone and porcelain tile with expert installation. From marble to travertine, precision craftsmanship.",
            icon: "Hammer"
          },
          {
            title: "Custom Staircases",
            description: "Custom design and precision craftsmanship for statement staircases. Every detail from tread profiles to railing design.",
            icon: "Triangle"
          },
          {
            title: "Wall Finishes",
            description: "Wallpaper, specialty coatings, and architectural treatments. Curated selections from the world's finest makers.",
            icon: "Palette"
          }
        ]}
        columns={4}
        variant="cards"
      />

      <TestimonialsGrid
        title="Trusted by Trade Professionals"
        subtitle="What our clients say about working with Surface Theory"
        testimonials={[
          {
            content: "Surface Theory transformed our luxury home project. The attention to detail and material quality exceeded expectations.",
            name: "Sarah Chen",
            role: "Interior Designer",
            rating: 5
          },
          {
            content: "Their expertise in hardwood installation is unmatched. Every surface they touch becomes a work of art.",
            name: "Mike Rodriguez", 
            role: "General Contractor",
            rating: 5
          },
          {
            content: "The custom staircase they designed became the centerpiece of our home. Absolutely stunning craftsmanship.",
            name: "Jennifer Hayes",
            role: "Architect",
            rating: 5
          }
        ]}
        columns={3}
        variant="cards"
      />

      <section id="contact">
        <CTAGradient
          headline="Ready to Start Your Project?"
          description="Let's discuss how Surface Theory can elevate your next project with premium materials and expert installation."
          primaryCta={{
            text: "Get Project Quote",
            href: "#hero"
          }}
          secondaryCta={{
            text: `Call ${PHONE}`,
            href: PHONE_HREF
          }}
          gradient="from-gray-800 to-amber-900"
          variant="default"
        />
      </section>

      <FooterLegal 
        companyName="Surface Theory"
        year={2026}
      />

      <FloatingCTA
        primaryText="Get Quote"
        primaryHref="#contact"
        secondaryText={PHONE}
        secondaryHref={PHONE_HREF}
        contactSectionId="contact"
      />
    </>
  );
}