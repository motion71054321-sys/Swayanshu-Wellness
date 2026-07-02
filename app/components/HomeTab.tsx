"use client";

import React, { useState, useEffect } from "react";

interface HomeTabProps {
  user?: { name: string; email: string } | null;
  setCurrentTab: (tab: string) => void;
}

export default function HomeTab({ user, setCurrentTab }: HomeTabProps) {
  // Habit checklist state
  const [habits, setHabits] = useState([
    { id: 1, text: "7-8 Hours Quality Sleep", checked: false },
    { id: 2, text: "Hit Daily Protein Intake Target", checked: false },
    { id: 3, text: "30-Min Targeted Workout", checked: false },
    { id: 4, text: "Drink 3L Hydration Target", checked: false },
    { id: 5, text: "10 Mins Mindfulness / Breathing", checked: false },
  ]);

  useEffect(() => {
    const fetchHabits = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/api/habits", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          if (data && data.habits) {
            setHabits(data.habits);
          }
        }
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    };

    fetchHabits();
  }, [user]);

  // BMR & Daily Calorie Calculator state
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activity, setActivity] = useState("1.375"); // Lightly active multiplier
  const [goal, setGoal] = useState("maintain"); // lose, maintain, build
  const [caloriesResult, setCaloriesResult] = useState<{ bmr: number; tdee: number; target: number } | null>(null);

  // Water Hydration Calculator state
  const [waterWeight, setWaterWeight] = useState("");
  const [exerciseTime, setExerciseTime] = useState("");
  const [waterResult, setWaterResult] = useState<number | null>(null);

  // Calculate habit progress
  const completedHabitsCount = habits.filter((h) => h.checked).length;
  const progressPercent = Math.round((completedHabitsCount / habits.length) * 100);

  // Toggle habit checkbox
  const toggleHabit = async (id: number) => {
    const nextHabits = habits.map((h) => (h.id === id ? { ...h, checked: !h.checked } : h));
    setHabits(nextHabits);

    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const d = new Date();
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;

      await fetch("http://localhost:5000/api/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          date: dateStr,
          habits: nextHabits
        })
      });
    } catch (error) {
      console.error("Error saving habit check status:", error);
    }
  };

  // Perform Calories BMR & TDEE calculation
  const calculateCalories = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    const act = parseFloat(activity);

    if (isNaN(w) || isNaN(h) || isNaN(a)) return;

    // Harris-Benedict Equation
    let bmr = 0;
    if (gender === "male") {
      bmr = 88.362 + 13.397 * w + 4.799 * h - 5.677 * a;
    } else {
      bmr = 447.593 + 9.247 * w + 3.098 * h - 4.33 * a;
    }

    const tdee = bmr * act;
    let target = tdee;

    if (goal === "lose") {
      target = tdee - 500; // Calorie deficit
    } else if (goal === "build") {
      target = tdee + 300; // Calorie surplus
    }

    setCaloriesResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      target: Math.round(target),
    });
  };

  // Perform Water hydration calculation
  const calculateWater = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(waterWeight);
    const t = parseFloat(exerciseTime);

    if (isNaN(w) || isNaN(t)) return;

    // Baseline: 35ml per kg of body weight
    // Plus 350ml per 30 minutes of exercise
    const baseWater = w * 35; 
    const exerciseWater = (t / 30) * 350;
    const totalMl = baseWater + exerciseWater;
    const totalLitres = totalMl / 1000;

    setWaterResult(parseFloat(totalLitres.toFixed(1)));
  };

  return (
    <div className="space-y-8 animate-fade-in text-primary-text">
      {/* Welcome & Coach Profile Landing Hero Section */}
      <section className="relative overflow-hidden rounded-2xl border border-inner-border bg-gradient-to-br from-inner-card via-inner-card to-brand-indigo/5 p-6 md:p-10 shadow-lg">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-indigo/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Hero Content */}
          <div className="flex-1 text-center lg:text-left space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/10 border border-brand-indigo/20 text-xs font-bold text-brand-indigo">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-indigo animate-pulse" />
              WELCOME BACK, {user ? user.name.toUpperCase() : "ATHLETE"}
            </div>
            
            <h1 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-primary-text tracking-tight leading-tight">
              Transform Your Health, <br />
              <span className="text-gradient">Body & Lifestyle</span> <br className="hidden sm:inline" />
              With Expert Wellness Coaching
            </h1>
            
            <p className="font-sans text-secondary-text max-w-2xl leading-relaxed text-sm md:text-base">
              8+ Years Wellness Lifestyle Practitioner helping individuals lose weight, drop body fat, reduce body age, and master sustainable healthy habits through personalized coaching.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => setCurrentTab("form")}
                className="w-full sm:w-auto bg-brand-indigo border border-transparent text-white hover:bg-brand-indigo/90 active:scale-[0.98] font-bold px-8 py-3.5 rounded-xl text-sm transition-all cursor-pointer shadow-lg shadow-brand-indigo/25 flex items-center justify-center gap-2 group"
              >
                Book Your FREE Health Assessment Today
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
              
              <button
                onClick={() => setCurrentTab("programs")}
                className="w-full sm:w-auto bg-inner-card/85 border border-inner-border hover:border-slate-450 text-secondary-text hover:text-primary-text font-bold px-6 py-3.5 rounded-xl text-sm transition-all cursor-pointer"
              >
                Explore Value Ladder
              </button>
            </div>
          </div>
          
          {/* Hero Portrait Visual */}
          <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-2xl overflow-hidden border-2 border-brand-indigo/20 shadow-xl shrink-0 relative bg-inner-card group hover:border-brand-indigo/40 transition-all duration-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Photos/pfp.jpeg"
              alt="Coach Swayanshu"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-center">
              <span className="text-[10px] font-extrabold text-white tracking-widest block uppercase">COACH SWAYANSHU</span>
            </div>
          </div>
        </div>
      </section>

      {/* Habit Tracker & Dashboard Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Habit Checklist (Takes 1 Col on Large Screens) */}
        <div className="lg:col-span-1 glass-panel rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-heading font-bold text-lg text-primary-text">Daily Habit Focus</h3>
                <p className="text-xs text-muted-text font-medium">Keep consistency alive</p>
              </div>
              <div className="text-right">
                <span className="font-heading font-extrabold text-2xl text-brand-indigo">{progressPercent}%</span>
                <p className="text-[10px] text-muted-text font-semibold tracking-wider uppercase">Done</p>
              </div>
            </div>

            {/* Habit Checklist Progress Bar */}
            <div className="w-full bg-inner-card rounded-full h-1.5 mb-6 overflow-hidden border border-inner-border">
              <div
                className="bg-brand-indigo h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Checklist items */}
            <div className="space-y-3">
              {habits.map((habit) => (
                <label
                  key={habit.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border border-inner-border hover:border-brand-indigo/35 transition-all duration-200 cursor-pointer select-none
                    ${habit.checked ? "bg-active-item text-primary-text border-brand-indigo/30" : "bg-inner-card/45 text-secondary-text"}
                  `}
                >
                  <input
                    type="checkbox"
                    checked={habit.checked}
                    onChange={() => toggleHabit(habit.id)}
                    className="w-4 h-4 accent-brand-indigo rounded bg-[var(--background)] border-inner-border text-brand-indigo focus:ring-brand-indigo cursor-pointer"
                  />
                  <span className={`text-xs font-semibold tracking-wide ${habit.checked ? "line-through text-muted-text" : ""}`}>
                    {habit.text}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-inner-border text-center">
            <p className="text-xs text-muted-text italic">
              {progressPercent === 100
                ? "🏆 Spectacular! All targets reached!"
                : progressPercent >= 60
                ? "⚡ Keep pushing, you are almost there!"
                : "🔥 Action is the foundational key to all success."}
            </p>
          </div>
        </div>

        {/* BMR & Calorie Calculator Widget (Takes 2 Col on Large Screens) */}
        <div className="lg:col-span-2 glass-panel rounded-xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="font-heading font-bold text-lg text-primary-text">Interactive Calorie Calculator</h3>
              <p className="text-xs text-muted-text font-medium">Calculate your BMR and Target Daily Calories</p>
            </div>

            <form onSubmit={calculateCalories} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-secondary-text uppercase tracking-wider mb-1.5">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 70"
                  className="w-full bg-inner-card border border-inner-border focus:border-brand-indigo rounded-lg px-4 py-2.5 text-sm font-semibold text-primary-text focus:outline-none focus:ring-1 focus:ring-brand-indigo transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-secondary-text uppercase tracking-wider mb-1.5">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g. 175"
                  className="w-full bg-inner-card border border-inner-border focus:border-brand-indigo rounded-lg px-4 py-2.5 text-sm font-semibold text-primary-text focus:outline-none focus:ring-1 focus:ring-brand-indigo transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-secondary-text uppercase tracking-wider mb-1.5">
                  Age (years)
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 28"
                  className="w-full bg-inner-card border border-inner-border focus:border-brand-indigo rounded-lg px-4 py-2.5 text-sm font-semibold text-primary-text focus:outline-none focus:ring-1 focus:ring-brand-indigo transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-secondary-text uppercase tracking-wider mb-1.5">
                  Gender
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGender("male")}
                    className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                      gender === "male"
                        ? "bg-brand-indigo border-brand-indigo text-white shadow-sm"
                        : "bg-inner-card border-inner-border text-secondary-text hover:border-slate-400/50"
                    }`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("female")}
                    className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                      gender === "female"
                        ? "bg-brand-indigo border-brand-indigo text-white shadow-sm"
                        : "bg-inner-card border-inner-border text-secondary-text hover:border-slate-400/50"
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-secondary-text uppercase tracking-wider mb-1.5">
                  Activity Level
                </label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className="w-full bg-inner-card border border-inner-border focus:border-brand-indigo rounded-lg px-4 py-2.5 text-sm font-semibold text-primary-text focus:outline-none focus:ring-1 focus:ring-brand-indigo transition-all"
                >
                  <option value="1.2">Sedentary (Little to no exercise)</option>
                  <option value="1.375">Lightly Active (1-3 days/week)</option>
                  <option value="1.55">Moderately Active (3-5 days/week)</option>
                  <option value="1.725">Very Active (6-7 days/week)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-secondary-text uppercase tracking-wider mb-1.5">
                  Wellness Goal
                </label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full bg-inner-card border border-inner-border focus:border-brand-indigo rounded-lg px-4 py-2.5 text-sm font-semibold text-primary-text focus:outline-none focus:ring-1 focus:ring-brand-indigo transition-all"
                >
                  <option value="lose">Lose Body Fat (Deficit)</option>
                  <option value="maintain">Maintain Baseline Weight</option>
                  <option value="build">Build Lean Muscle (Surplus)</option>
                </select>
              </div>

              <div className="md:col-span-2 pt-2">
                <button
                  type="submit"
                  className="w-full bg-brand-indigo border border-transparent text-white hover:bg-brand-indigo/90 active:scale-[0.99] font-bold py-2.5 rounded-lg text-sm transition-all cursor-pointer shadow-md"
                >
                  Calculate Energy Expenditure
                </button>
              </div>
            </form>
          </div>

          {/* Calorie Results Panel */}
          {caloriesResult && (
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-6 pt-5 border-t border-inner-border text-center">
              <div className="bg-inner-card border border-inner-border rounded-lg p-3">
                <p className="text-[10px] text-muted-text font-semibold tracking-wider uppercase">Basal Metabolic Rate</p>
                <p className="text-xl font-heading font-extrabold text-primary-text mt-1">{caloriesResult.bmr} <span className="text-xs font-light text-muted-text">kcal</span></p>
              </div>
              <div className="bg-inner-card border border-inner-border rounded-lg p-3">
                <p className="text-[10px] text-muted-text font-semibold tracking-wider uppercase">Daily Energy TDEE</p>
                <p className="text-xl font-heading font-extrabold text-primary-text mt-1">{caloriesResult.tdee} <span className="text-xs font-light text-muted-text">kcal</span></p>
              </div>
              <div className="bg-brand-indigo/10 border border-brand-indigo/20 rounded-lg p-3 shadow-inner">
                <p className="text-[10px] text-brand-indigo font-semibold tracking-wider uppercase">Your Target Calories</p>
                <p className="text-xl font-heading font-extrabold text-brand-indigo mt-1">{caloriesResult.target} <span className="text-xs font-semibold text-brand-indigo">kcal</span></p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Water Intake Hydration calculator */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="md:col-span-1 glass-panel rounded-xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="font-heading font-bold text-lg text-primary-text">Hydration Calculator</h3>
              <p className="text-xs text-muted-text font-medium">Estimate customized hydration requirements</p>
            </div>

            <form onSubmit={calculateWater} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-secondary-text uppercase tracking-wider mb-1.5">
                  Body Weight (kg)
                </label>
                <input
                  type="number"
                  value={waterWeight}
                  onChange={(e) => setWaterWeight(e.target.value)}
                  placeholder="e.g. 70"
                  className="w-full bg-inner-card border border-inner-border focus:border-brand-indigo rounded-lg px-4 py-2.5 text-sm font-semibold text-primary-text focus:outline-none focus:ring-1 focus:ring-brand-indigo transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-secondary-text uppercase tracking-wider mb-1.5">
                  Daily Workout Time (Minutes)
                </label>
                <input
                  type="number"
                  value={exerciseTime}
                  onChange={(e) => setExerciseTime(e.target.value)}
                  placeholder="e.g. 30"
                  className="w-full bg-inner-card border border-inner-border focus:border-brand-indigo rounded-lg px-4 py-2.5 text-sm font-semibold text-primary-text focus:outline-none focus:ring-1 focus:ring-brand-indigo transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-inner-card hover:bg-inner-card/70 border border-inner-border active:scale-[0.99] text-primary-text font-bold py-2.5 rounded-lg text-xs transition-all cursor-pointer"
              >
                Estimate Fluid Volume
              </button>
            </form>
          </div>

          {waterResult !== null && (
            <div className="mt-5 pt-4 border-t border-inner-border text-center">
              <p className="text-[10px] text-muted-text font-semibold tracking-wider uppercase">Daily Hydration Target</p>
              <div className="flex items-baseline justify-center gap-1 mt-1">
                <span className="text-3xl font-heading font-extrabold text-brand-indigo">{waterResult}</span>
                <span className="text-sm font-bold text-secondary-text">Litres</span>
              </div>
              <span className="text-[10px] text-muted-text font-medium mt-0.5 block">
                (Equivalent to roughly {Math.round(waterResult * 4)} large glasses)
              </span>
            </div>
          )}
        </div>

        {/* Training Philosophy Grid Panel (Takes 2 Col) */}
        <div className="md:col-span-2 glass-panel rounded-xl p-6">
          <h3 className="font-heading font-bold text-lg text-primary-text mb-5">Coaching Philosophy Pillars</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="bg-inner-card border border-inner-border rounded-lg p-4 space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-brand-indigo/10 border border-brand-indigo/20 flex items-center justify-center text-brand-indigo">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                </svg>
              </div>
              <h4 className="font-heading font-bold text-sm text-primary-text">Strength First</h4>
              <p className="font-sans text-xs text-secondary-text leading-relaxed">
                Building muscle mass and bone density preserves mobility, boosts metabolism, and builds long-term health resilience.
              </p>
            </div>

            <div className="bg-inner-card border border-inner-border rounded-lg p-4 space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-brand-indigo/10 border border-brand-indigo/20 flex items-center justify-center text-brand-indigo">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                </svg>
              </div>
              <h4 className="font-heading font-bold text-sm text-primary-text">Nutritional Logic</h4>
              <p className="font-sans text-xs text-secondary-text leading-relaxed">
                No extreme diets. We focus on macro-nutrients and high micronutrient density to power athletic training and keep stress low.
              </p>
            </div>

            <div className="bg-inner-card border border-inner-border rounded-lg p-4 space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-brand-indigo/10 border border-brand-indigo/20 flex items-center justify-center text-brand-indigo">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-heading font-bold text-sm text-primary-text">Sleep & Recovery</h4>
              <p className="font-sans text-xs text-secondary-text leading-relaxed">
                Physical changes happen during rest. Managing sleep hygiene and active recovery days prevents stress hormone spikes.
              </p>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
