"use client";

import React, { useState } from "react";

export default function ResultsTab() {
  const [sliderPos, setSliderPos] = useState(50);

  const stats = [
    { value: "8+ Years", label: "Wellness Lifestyle", description: "Active consistency & practice" },
    { value: "-5 kg", label: "Lost in 20 Days", description: "First breakthrough result" },
    { value: "8%", label: "Peak Body Fat", description: "Achieved within 3 months" },
  ];

  const clientStories = [
    {
      name: "The Turning Point",
      age: 17,
      achievement: "17yo with 29yo Body Age",
      quote: "Preparing for military exams as a former Kabaddi player, I noticed a protruding belly and low energy. A wellness assessment shocked me: I was 5kg overweight but had a body age of 29. This realization changed my life.",
      tag: "Where It Began",
      duration: "2018",
    },
    {
      name: "Immediate Breakthrough",
      age: 17,
      achievement: "Lost 5kg in 20 Days",
      quote: "I followed my coach's system and wellness protocol with complete dedication. Within 20 days, I lost 5kg and felt a remarkable surge in energy and fitness, realizing what my body was truly capable of.",
      tag: "First Results",
      duration: "20 Days",
    },
    {
      name: "Total Life Transformation",
      age: 17,
      achievement: "8% Body Fat & Rebirth",
      quote: "Within 3 months, my digestion improved, body age plummeted, body fat dropped to ~8%, and daily habits transformed. Focus, productivity, and overall lifestyle quality reached new heights.",
      tag: "Consistent Habit",
      duration: "3 Months",
    },
    {
      name: "Lifelong Wellness Mission",
      age: 25,
      achievement: "8+ Years Active Coaching",
      quote: "Today, after 8+ years of a wellness-focused lifestyle, I guide others in weight management, nutrition, energy enhancement, and habit building to help them build sustainable healthy habits.",
      tag: "Active Leadership",
      duration: "8+ Years",
    },
  ];

  const credentials = [
    { title: "Weight Management", full: "Healthy fat loss & muscle preservation" },
    { title: "Healthy Eating", full: "Balanced meal coaching & nutrition" },
    { title: "Energy & Fitness", full: "Vitality coaching & exercise support" },
    { title: "Lifestyle Improvement", full: "Stress management & habit building" },
  ];

  const certifications = [
    {
      title: "Food Safety Supervisor",
      authority: "FoSTaC / FSSAI",
      description: "Basic Retail & Distribution competence, in association with Herbalife.",
      date: "July 2024"
    },
    {
      title: "Legal Metrology Act",
      authority: "Govt of India & FSSAI TP",
      description: "National Seminar on Packaging and Packaged Commodities Rules compliance.",
      date: "July 2024"
    },
    {
      title: "Digital Literacy Skilling",
      authority: "FICSI (Sector Skill Council)",
      description: "Online awareness program on Food Processing skilling initiatives.",
      date: "July 2024"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in text-primary-text">
      {/* Header */}
      <section className="space-y-2">
        <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-primary-text tracking-tight">
          Coach Swayanshu&apos;s <span className="text-brand-indigo">Personal Results</span>
        </h2>
        <p className="font-sans text-sm md:text-base text-secondary-text max-w-2xl leading-relaxed">
          Witness the dedication, evidence-based methods, and personal transformation of Coach Swayanshu. Overcoming a high body fat percentage and a 29-year body age at age 17 to build a lifelong habit of wellness, health, and vitality.
        </p>
      </section>

      {/* Stats Counter Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-panel rounded-lg p-5 border border-inner-border relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-brand-indigo/5 rounded-full blur-xl pointer-events-none group-hover:bg-brand-indigo/10 transition-all duration-300" />
            <span className="font-heading font-black text-2xl md:text-3xl text-brand-indigo block tracking-tight">
              {stat.value}
            </span>
            <span className="font-sans font-bold text-xs md:text-sm text-primary-text mt-1 block leading-tight">
              {stat.label}
            </span>
            <span className="font-sans text-[10px] text-muted-text mt-0.5 block leading-none">
              {stat.description}
            </span>
          </div>
        ))}
      </section>

      {/* Before / After Interactive Slider & Testimonials */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Before / After Slider container (Takes 7 Col) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="glass-panel rounded-lg p-4 md:p-5 flex flex-col gap-4">
            <div>
              <h3 className="font-heading font-bold text-base md:text-lg text-primary-text leading-tight">Swayanshu&apos;s Physical Transformation</h3>
              <p className="text-xs text-muted-text font-medium">Drag the slider to view Coach Swayanshu&apos;s transformation from a body age of 29 (at age 17) to a fit, high-energy state at 8% body fat</p>
            </div>

            {/* Slider Container */}
            <div className="relative aspect-[3/2] rounded-lg overflow-hidden select-none bg-inner-card border border-inner-border">

              {/* After Image (Full width background) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Photos/A2.png"
                alt="After Transformation State"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-full bg-brand-indigo text-white text-[10px] font-bold tracking-widest uppercase shadow-md">
                AFTER
              </div>

              {/* Before Image (Slices based on sliderPos) */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Photos/B1.jpg"
                  alt="Before Transformation State"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
                <div className="absolute bottom-4 left-4 z-10 px-3 py-1 rounded-full bg-inner-card text-primary-text text-[10px] font-bold tracking-widest uppercase shadow-md border border-inner-border">
                  BEFORE
                </div>
              </div>

              {/* Slider Line Divider */}
              <div
                className="absolute inset-y-0 w-0.5 bg-brand-indigo z-20 pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              />

              {/* Slider Drag Handle */}
              <div
                className="absolute inset-y-0 pointer-events-none z-20 flex items-center justify-center"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="relative w-7 h-7 rounded-full bg-brand-indigo text-white shadow-md flex items-center justify-center slider-handle-pulse">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" className="rotate-90 origin-center" />
                  </svg>
                </div>
              </div>

              {/* Transparent Range Input Overlay for Drag Controls */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-muted-text font-semibold px-1">
              <span>⬅ Collapsed State</span>
              <span>Full Vitality State ➡</span>
            </div>
          </div>
        </div>

        {/* Client Stories List & Credentials (Takes 5 Col) */}
        <div className="lg:col-span-5 space-y-6">

          <div className="glass-panel rounded-lg p-6 space-y-4">
            <h3 className="font-heading font-bold text-base md:text-lg text-primary-text">Coach&apos;s Journey &amp; Milestones</h3>

            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1 no-scrollbar">
              {clientStories.map((story, idx) => (
                <div key={idx} className="bg-inner-card border border-inner-border rounded-lg p-4 space-y-3 hover:border-brand-indigo/35 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-heading font-bold text-sm text-primary-text">{story.name}</h4>
                      <p className="text-[10px] text-muted-text font-semibold uppercase tracking-wider">{story.achievement}</p>
                    </div>
                    <span className="text-[9px] font-bold text-brand-indigo bg-brand-indigo/10 px-2.5 py-0.5 rounded-full border border-brand-indigo/15">
                      {story.duration}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-secondary-text italic leading-relaxed">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Credentials */}
          <div className="glass-panel rounded-lg p-6">
            <h3 className="font-heading font-bold text-base md:text-lg text-primary-text mb-4">Areas of Wellness Expertise</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {credentials.map((cred, idx) => (
                <div key={idx} className="bg-inner-card border border-inner-border rounded-lg p-3 flex flex-col justify-center">
                  <span className="font-heading font-black text-xs text-brand-indigo tracking-wider">
                    {cred.title}
                  </span>
                  <span className="font-sans text-[10px] text-secondary-text leading-tight mt-0.5">
                    {cred.full}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="glass-panel rounded-lg p-6">
            <h3 className="font-heading font-bold text-base md:text-lg text-primary-text mb-4">Official Certifications</h3>
            <div className="space-y-3">
              {certifications.map((cert, idx) => (
                <div key={idx} className="bg-inner-card border border-inner-border rounded-lg p-3 hover:border-brand-indigo/35 transition-all duration-300 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-indigo/10 border border-brand-indigo/20 flex items-center justify-center text-brand-indigo shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-heading font-bold text-xs text-primary-text truncate">
                        {cert.title}
                      </span>
                      <span className="text-[9px] font-bold text-muted-text bg-inner-card border border-inner-border px-1.5 py-0.5 rounded shrink-0">
                        {cert.date}
                      </span>
                    </div>
                    <p className="font-sans text-[10px] text-brand-indigo font-semibold mt-0.5">
                      {cert.authority}
                    </p>
                    <p className="font-sans text-[10px] text-secondary-text leading-tight mt-1">
                      {cert.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
