"use client";

import React, { useState } from "react";

interface Program {
  id: number;
  name: string;
  price: string;
  category: "free" | "beginner" | "core" | "premium" | "herbalife" | "high-ticket";
  image: string;
  isCustomImage: boolean;
  tagline: string;
  description: string;
  benefits: string[];
  trainerNote: string;
  idealFor: string;
  cta: string;
}

interface ProgramsTabProps {
  setCurrentTab: (tab: string) => void;
}

export default function ProgramsTab({ setCurrentTab }: ProgramsTabProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const programs: Program[] = [
    {
      id: 1,
      name: "Free Health Assessment",
      price: "FREE",
      category: "free",
      image: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      isCustomImage: false,
      tagline: "Purpose: Lead Generation",
      description: "Get started with your custom health blueprint. Receive a 15-minute 1:1 call with Coach Swayanshu, a lifestyle habit assessment, and initial nutrition goal setting.",
      benefits: [
        "15-minute consultation with Coach Swayanshu",
        "Personalized lifestyle assessment",
        "Basic nutrition and hydration guidance",
        "Clear goal setting roadmap"
      ],
      trainerNote: "This is the first step on your wellness journey. Let's align on your baseline and layout a clear roadmap together.",
      idealFor: "Beginners who want to gain clarity on their baseline health markers.",
      cta: "Book Your Free Health Assessment Today"
    },
    {
      id: 2,
      name: "10-Day Healthy Habits Challenge",
      price: "₹999 – ₹2,999",
      category: "beginner",
      image: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      isCustomImage: false,
      tagline: "Form consistent, healthy daily habits",
      description: "Build consistency with a supportive community. Form basic eating, water tracking, and hydration habits that stack up for long-term health.",
      benefits: [
        "Daily coach accountability checks",
        "Basic meal guidance & shopping lists",
        "Structured water challenge protocol",
        "Access to supportive community group"
      ],
      trainerNote: "Forming habits doesn't need to be overwhelming. Let's make small, repeatable daily wins for 21 days straight.",
      idealFor: "Beginners who want to start healthy habits without intensive tracking.",
      cta: "Join the Habit Challenge"
    },
    {
      id: 3,
      name: "Weight Loss Kickstart Program (30 Days)",
      price: "₹3,999 – ₹5,999",
      category: "beginner",
      image: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      isCustomImage: false,
      tagline: "Rapid fat loss sprint & protocols",
      description: "Ideal for anyone who wants to jumpstart fat loss, kick bad cravings, and establish personalized caloric baseline protocols.",
      benefits: [
        "Personalized calorie intake guidance",
        "Basic healthy meal plan layout",
        "Weekly progress check-in calls",
        "Direct WhatsApp support channel"
      ],
      trainerNote: "A high-momentum 30-day program designed to drop water retention, optimize digestion, and fire up your metabolism.",
      idealFor: "People wanting initial fat loss and structured dietary support.",
      cta: "Start Your Kickstart"
    },
    {
      id: 4,
      name: "Transformation Program (90 Days)",
      price: "₹9,999 – ₹19,999",
      category: "core",
      image: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
      isCustomImage: false,
      tagline: "Our most popular transformation standard",
      description: "Designed to guide you through structured, periodized phases for fat loss, muscle building, or body recomposition with high-touch coaching.",
      benefits: [
        "Fully personalized nutrition coaching splits",
        "Weekly 1:1 coaching call with Coach Swayanshu",
        "Structured habit tracking & dashboard audit",
        "Full accountability system & worksheets",
        "Priority community portal access"
      ],
      trainerNote: "90 days is the sweet spot for structural body composition changes. We'll fine-tune your nutrition weekly to ensure your results never plateau.",
      idealFor: "Weight loss, weight gain, or body recomposition (Most Recommended).",
      cta: "Enroll in Transformation"
    },
    {
      id: 5,
      name: "Total Wellness Program (6 Months)",
      price: "₹24,999 – ₹39,999",
      category: "core",
      image: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
      isCustomImage: false,
      tagline: "Complete lifestyle design and recovery protocol",
      description: "Complete lifestyle design covering not just training, but the broader variables that dictate long-term vitality, cellular recovery, and natural energy production.",
      benefits: [
        "Complete lifestyle & circadian coaching",
        "Advanced nutrition & micro-nutrient guidelines",
        "Stress management & nervous system recovery",
        "Sleep optimization checklist & audit",
        "Mitochondrial energy improvement plans",
        "Monthly progress review and adjustment"
      ],
      trainerNote: "Lifestyle modification requires deep reprogramming of daily rhythms. This program gives us the timeframe to lock in permanent changes.",
      idealFor: "Long-term lifestyle and energy transformation.",
      cta: "Start Total Wellness"
    },
    {
      id: 6,
      name: "VIP One-to-One Coaching (6 Months)",
      price: "₹49,999 – ₹79,999",
      category: "premium",
      image: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
      isCustomImage: false,
      tagline: "Elite private direct coach partnership",
      description: "The ultimate premium private coaching experience. Direct priority contact, customized roadmap iterations, and deep continuous adjustments to work with high-stress demands.",
      benefits: [
        "Direct personal coach access (24/7 priority text)",
        "Weekly 1:1 video review calls",
        "Fully customized travel & lifestyle roadmap",
        "Direct WhatsApp support with fast replies",
        "Priority response time (under 2 hours)"
      ],
      trainerNote: "Tailored specifically around high-stress routines, travel demands, and executive schedules to guarantee progress without burn-out.",
      idealFor: "Busy professionals, business owners, and frequent travelers.",
      cta: "Apply for VIP Coaching"
    },
    {
      id: 7,
      name: "Elite Transformation Mentorship (12 Months)",
      price: "₹99,999 – ₹1,99,999",
      category: "premium",
      image: "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
      isCustomImage: false,
      tagline: "Comprehensive year-long identity transition",
      description: "A year-long comprehensive developmental cocoon. Stacks progressive physical benchmarks with mindset shifts and life-balance workflows to support a permanent identity upgrade.",
      benefits: [
        "Full holistic wellness transformation protocol",
        "Advanced nutrition coaching & food relation repair",
        "Mindset & psychological behavior coaching",
        "Business-life balance schedule auditing",
        "Monthly deep-dive strategy sessions",
        "Priority unlimited chat support"
      ],
      trainerNote: "When you want to build a completely new trajectory in life, you need structural continuity. Twelve months ensures a permanent transformation.",
      idealFor: "People serious about creating a new lifestyle and breaking old patterns.",
      cta: "Apply for Elite Mentorship"
    },
    {
      id: 8,
      name: "Weight Loss Nutrition Program",
      price: "₹5,000 – ₹15,000 / month",
      category: "herbalife",
      image: "linear-gradient(135deg, #65a30d 0%, #4d7c0f 100%)",
      isCustomImage: false,
      tagline: "Product-supported cellular weight loss",
      description: "Combines premium Herbalife nutrition shake programs with dedicated active coaching, nutritional logs, and a highly active community support system.",
      benefits: [
        "Customized Herbalife products package",
        "Guided coaching & meal tracking review",
        "Weekly weight and measurement monitoring",
        "Access to the community support ecosystem"
      ],
      trainerNote: "A perfect blend of convenient, low-calorie cellular nutrition and coaching accountability to lock in daily caloric control with high nutrient density.",
      idealFor: "People looking for convenient meal solutions combined with coaching accountability.",
      cta: "Explore Product Package"
    },
    {
      id: 9,
      name: "Weight Gain Nutrition Program",
      price: "₹6,000 – ₹18,000 / month",
      category: "herbalife",
      image: "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)",
      isCustomImage: false,
      tagline: "Product-supported cellular weight gain",
      description: "Specialized protein shakes and macro scheduling to feed your training, boost healthy muscle mass synthesis, and track metabolic weight response.",
      benefits: [
        "Curated Herbalife weight-gain product packages",
        "Custom high-calorie nutrition coaching",
        "Progress and muscle gain monitoring"
      ],
      trainerNote: "Gaining clean tissue requires a systematic calorie surplus. These specialized nutrition products ensure you stack up muscle weight, not fat.",
      idealFor: "Individuals struggling to consume adequate clean calories for healthy weight gain.",
      cta: "Explore Weight Gain Pack"
    },
    {
      id: 10,
      name: "Active Lifestyle Program",
      price: "₹3,999 – ₹9,999 / month",
      category: "herbalife",
      image: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
      isCustomImage: false,
      tagline: "Energy & athletic performance support",
      description: "Support daily energy levels, boost recovery speed, and drive healthy active habits utilizing cell-nutrition formulas.",
      benefits: [
        "Energy & fitness drink support packs",
        "Personalized athletic nutrition guidance",
        "Daily accountability check-ins"
      ],
      trainerNote: "Perfect for active individuals, sports enthusiasts, or anyone wanting to replace morning/midday fatigue with natural cellular vitality.",
      idealFor: "Active adults needing optimal hydration, clean energy, and rapid recovery formulas.",
      cta: "Explore Active Pack"
    },
    {
      id: 11,
      name: "Life Transformation Mastery (12 Months)",
      price: "₹1,50,000 – ₹3,00,000",
      category: "high-ticket",
      image: "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)",
      isCustomImage: false,
      tagline: "The absolute peak coaching experience",
      description: "The crown jewel of our value ladder. Complete access to Coach Swayanshu, weekly zoom alignment audits, body analysis, family wellness layouts, and confidence mindset protocols. Ensures a complete physical and psychological rebirth.",
      benefits: [
        "Personal nutrition coach - direct priority hotline",
        "Weekly 1:1 Zoom audits & coaching sessions",
        "Direct 24/7 WhatsApp priority message portal",
        "Monthly biometric and body analysis review",
        "Custom behavioral habit building systems",
        "Stress management & mindfulness coaching",
        "Self-confidence & personal presentation building",
        "Total lifestyle transformation roadmap",
        "Family wellness integration layout"
      ],
      trainerNote: "This isn't just coaching; it's a complete partnership where we rebuild every habit from the ground up, guaranteeing a total life transformation.",
      idealFor: "High-performers serious about creating a completely new lifestyle and achieving health mastery.",
      cta: "Apply for Life Mastery"
    }
  ];

  const filteredPrograms =
    activeFilter === "all"
      ? programs
      : programs.filter((p) => p.category === activeFilter);

  // Value Ladder funnel definitions for visual block
  const valueLadderSteps = [
    { step: 1, name: "FREE Assessment", price: "FREE", targetProgramId: 1, desc: "Lifestyle audit & Consultation" },
    { step: 2, name: "10-Day Habits Challenge", price: "₹2,999", targetProgramId: 2, desc: "Consistency build" },
    { step: 3, name: "30-Day Weight Loss Kickstart Program", price: "₹8,999", targetProgramId: 3, desc: "Reset, Rebuild, Reduce" },
    { step: 4, name: "90-Day Transformation", price: "₹24,999+", targetProgramId: 4, desc: "Fat loss & coaching" },
    { step: 5, name: "6-Month Total Wellness", price: "₹49,999+", targetProgramId: 5, desc: "Circadian lifestyle reset" },
    { step: 6, name: "VIP 1:1 Coaching", price: "₹49,999+", targetProgramId: 6, desc: "High-touch premium access" }
  ];

  const handleStepClick = (programId: number) => {
    const found = programs.find(p => p.id === programId);
    if (found) {
      setSelectedProgram(found);
    }
  };

  return (
    <div className="space-y-12 animate-fade-in relative text-primary-text">
      {/* Header */}
      <section className="space-y-2">
        <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-primary-text tracking-tight">
          Swayanshu Wellness <span className="text-brand-indigo">Coaching Programs</span>
        </h2>
        <p className="font-sans text-sm md:text-base text-secondary-text max-w-2xl leading-relaxed">
          Unlock maximum results with trainer-curated wellness programs, community challenges, and premium direct mentorship designed around a Value Ladder model.
        </p>
      </section>

      {/* Value Ladder Funnel Visualization */}
      <section className="glass-panel p-6 md:p-8 space-y-6 bg-gradient-to-r from-inner-card to-brand-indigo/5">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-[10px] font-bold text-brand-indigo uppercase tracking-widest">Interactive Client Roadmap</span>
          <h3 className="font-heading font-extrabold text-xl text-primary-text">The Value Ladder Funnel Journey</h3>
          <p className="text-xs text-secondary-text max-w-xl">
            Choose your starting point. Progress upward gradually as your physical goals expand, habits lock in, and your need for higher accountability increases.
          </p>
        </div>

        {/* Funnel Steps Stairs Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-4">
          {valueLadderSteps.map((stepData) => (
            <div
              key={stepData.step}
              onClick={() => handleStepClick(stepData.targetProgramId)}
              className="glass-panel glass-panel-hover p-4 rounded-xl flex flex-col justify-between relative cursor-pointer group text-center border-brand-indigo/15 hover:border-brand-indigo"
            >
              {/* Stair visual number */}
              <div className="absolute top-2 left-3 text-[10px] font-black text-brand-indigo opacity-70 group-hover:opacity-100 transition-opacity">
                STEP 0{stepData.step}
              </div>
              <div className="absolute top-2 right-3 w-2 h-2 rounded-full bg-brand-indigo/35 group-hover:bg-brand-indigo animate-pulse" />

              <div className="pt-6 pb-4">
                <span className="font-heading font-extrabold text-sm text-primary-text group-hover:text-brand-indigo transition-colors block">
                  {stepData.name}
                </span>
                <span className="text-[10px] text-muted-text mt-1 block leading-tight">
                  {stepData.desc}
                </span>
              </div>

              <div className="border-t border-inner-border pt-2 mt-auto">
                <span className="font-heading font-black text-xs text-primary-text block">
                  {stepData.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-inner-border pb-4 overflow-x-auto no-scrollbar">
        {[
          { key: "all", label: "All Programs" },
          { key: "free", label: "Free Assessment" },
          { key: "beginner", label: "Beginner Level" },
          { key: "core", label: "Core Programs" },
          { key: "premium", label: "Premium Programs" },
          { key: "herbalife", label: "Herbalife Support" },
          { key: "high-ticket", label: "High-Ticket" }
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveFilter(item.key)}
            className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all shrink-0 cursor-pointer border
              ${activeFilter === item.key
                ? "bg-brand-indigo/10 border-brand-indigo/30 text-brand-indigo"
                : "bg-inner-card border-inner-border text-secondary-text hover:border-slate-400/50 hover:text-primary-text"
              }
            `}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Program Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPrograms.map((program) => (
          <div
            key={program.id}
            onClick={() => setSelectedProgram(program)}
            className="glass-panel glass-panel-hover rounded-xl p-4 flex flex-col justify-between cursor-pointer group"
          >
            <div className="space-y-4">
              {/* Program Image Container */}
              <div className="relative aspect-square rounded-lg overflow-hidden bg-inner-card border border-inner-border flex items-center justify-center">
                <div
                  style={{ background: program.image }}
                  className="w-full h-full flex flex-col items-center justify-center p-5 text-center group-hover:scale-105 transition-transform duration-300 relative"
                >
                  <span className="font-heading font-black text-lg text-white opacity-90 leading-snug">
                    {program.name}
                  </span>

                  {program.category === "core" && program.id === 4 && (
                    <span className="absolute bottom-2 bg-yellow-450 text-slate-900 text-[8px] font-extrabold uppercase px-2 py-0.5 rounded shadow">
                      MOST RECOMMENDED
                    </span>
                  )}
                </div>

                <span className="absolute top-3 right-3 text-[9px] font-extrabold uppercase tracking-widest bg-[var(--background)] text-brand-indigo px-2.5 py-1 rounded-full border border-brand-indigo/25">
                  {program.category}
                </span>
              </div>

              {/* Text metadata */}
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-sm text-primary-text group-hover:text-brand-indigo transition-colors leading-tight">
                  {program.name}
                </h3>
                <p className="font-sans text-[11px] text-muted-text line-clamp-1 leading-snug">
                  {program.tagline}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-5 pt-3 border-t border-inner-border">
              <span className="font-heading font-black text-sm text-primary-text">
                {program.price}
              </span>
              <span className="text-[10px] font-extrabold text-brand-indigo group-hover:text-brand-indigo/80 transition-colors flex items-center gap-1">
                Explore Details
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 group-hover:translate-x-0.5 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Program Detail Modal overlay */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in" onClick={() => setSelectedProgram(null)}>
          <div
            className="relative w-full max-w-2xl bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] rounded-xl p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProgram(null)}
              className="absolute top-4 right-4 text-secondary-text hover:text-primary-text p-2 rounded-lg bg-inner-card border border-inner-border cursor-pointer hover:border-slate-400/50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Body */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Program graphic */}
              <div className="aspect-square rounded-xl overflow-hidden bg-inner-card flex items-center justify-center border border-inner-border">
                <div
                  style={{ background: selectedProgram.image }}
                  className="w-full h-full flex items-center justify-center p-6 text-center"
                >
                  <span className="font-heading font-black text-2xl text-white opacity-85 leading-snug">
                    {selectedProgram.name}
                  </span>
                </div>
              </div>

              {/* Program text details */}
              <div className="flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-brand-indigo bg-brand-indigo/10 px-2.5 py-1 rounded-full border border-brand-indigo/15">
                      {selectedProgram.category} Program
                    </span>
                    <h3 className="font-heading font-black text-xl text-primary-text mt-2.5 leading-snug">
                      {selectedProgram.name}
                    </h3>
                    <p className="font-sans text-xs text-secondary-text mt-1">
                      {selectedProgram.tagline}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="font-heading font-black text-2xl text-brand-indigo">
                      {selectedProgram.price}
                    </span>
                  </div>

                  <p className="font-sans text-xs text-secondary-text leading-relaxed">
                    {selectedProgram.description}
                  </p>

                  {selectedProgram.idealFor && (
                    <div className="bg-inner-card border border-inner-border rounded-lg p-3 text-xs">
                      <span className="font-semibold text-primary-text block">Ideal For:</span>
                      <span className="text-secondary-text mt-0.5 block">{selectedProgram.idealFor}</span>
                    </div>
                  )}
                </div>

                <div className="pt-6 flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedProgram(null);
                      if (selectedProgram.id === 1) {
                        setCurrentTab("contact");
                      } else {
                        alert(`Thank you for your interest in ${selectedProgram.name}! Redirecting you to contact Coach Swayanshu.`);
                        setCurrentTab("contact");
                      }
                    }}
                    className="flex-1 text-center bg-brand-indigo border border-transparent text-white hover:bg-brand-indigo/90 active:scale-[0.99] font-bold py-2.5 rounded-lg text-xs transition-all cursor-pointer shadow-md"
                  >
                    {selectedProgram.id === 1 ? "Book Assessment" : selectedProgram.cta}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProgram(null);
                      setCurrentTab("contact");
                    }}
                    className="flex-1 text-center bg-inner-card border border-inner-border hover:border-slate-400/50 text-secondary-text hover:text-primary-text font-bold py-2.5 rounded-lg text-xs transition-all cursor-pointer"
                  >
                    Ask Coach Swayanshu
                  </button>
                </div>
              </div>

            </div>

            {/* Benefits & Coach notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-inner-border">
              <div className="space-y-3">
                <h4 className="font-heading font-bold text-xs text-primary-text uppercase tracking-wider">What&apos;s Included</h4>
                <ul className="space-y-2">
                  {selectedProgram.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-secondary-text">
                      <span className="text-brand-indigo text-sm mt-[-2px]">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-inner-card border border-inner-border rounded-xl p-4 space-y-2">
                <h4 className="font-heading font-bold text-xs text-brand-indigo uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-indigo" />
                  Coach Swayanshu&apos;s Prescription
                </h4>
                <p className="font-sans text-xs text-secondary-text italic leading-relaxed">
                  &ldquo;{selectedProgram.trainerNote}&rdquo;
                </p>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
