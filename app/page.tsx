"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ResultsTab from "./components/ResultsTab";
import ProgramsTab from "./components/ProgramsTab";
import ContactTab from "./components/ContactTab";

export default function Home() {
  const [currentTab, setCurrentTab] = useState<string>("results");
  const [isTabLoaded, setIsTabLoaded] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Load active tab from localStorage on mount (fallback to results if "form" is saved)
  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab && savedTab !== "home" && savedTab !== "form") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentTab(savedTab);
    } else {
      setCurrentTab("results");
    }
    setIsTabLoaded(true);
  }, []);

  // Persist active tab to localStorage when changed
  useEffect(() => {
    if (isTabLoaded) {
      localStorage.setItem("activeTab", currentTab);
    }
  }, [currentTab, isTabLoaded]);

  // Sync theme with DOM and localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Defer updating client state to avoid synchronous cascade warning in layout effect
    const timeoutId = setTimeout(() => {
      setTheme(initialTheme);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Tab rendering helper
  const renderTabContent = () => {
    switch (currentTab) {
      case "results":
        return <ResultsTab />;
      case "programs":
        return <ProgramsTab setCurrentTab={setCurrentTab} />;
      case "contact":
      default:
        return <ContactTab />;
    }
  };

  const getTabTitle = () => {
    switch (currentTab) {
      case "results":
        return "Coach Swayanshu's Journey & Results";
      case "programs":
        return "Swayanshu Wellness Coaching Programs";
      case "contact":
      default:
        return "Contact Coach Swayanshu";
    }
  };

  // Sun and Moon Icon Components
  const themeToggleIcon = theme === "dark" ? (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M3 12h2.25m-.386-6.364l1.591 1.591M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-indigo-600 transition-transform duration-300 hover:-rotate-12">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
  );

  return (
    <div className="flex min-h-screen bg-[var(--background)] text-primary-text font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Viewport Area */}
      <div className="flex flex-col flex-1 min-w-0">
        
        {/* Mobile Header Bar */}
        <header className="flex items-center justify-between h-20 px-6 border-b border-[var(--sidebar-border)] bg-[var(--header-bg)] backdrop-blur-md sticky top-0 z-30 lg:hidden">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg overflow-hidden shadow-md border border-brand-indigo/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Photos/Logo.jpeg"
                alt="Swayanshu Wellness Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-heading font-bold text-base tracking-tight text-primary-text">
              SWAYANSHU<span className="text-brand-indigo font-light">WELLNESS</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle for Mobile */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-inner-card border border-inner-border text-secondary-text hover:text-primary-text cursor-pointer transition-colors"
              aria-label="Toggle Brightness Mode"
            >
              {themeToggleIcon}
            </button>

            {/* Hamburger menu */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-inner-card border border-inner-border text-secondary-text hover:text-primary-text cursor-pointer hover:border-slate-400/50 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </header>

        {/* Content Container (Responsive padding, works on all viewports up to TV) */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto space-y-8 pb-20">
          
          {/* Header Action / Breadcrumb */}
          <div className="hidden lg:flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-brand-indigo uppercase tracking-widest">
                Swayanshu Wellness Coaching
              </span>
              <h1 className="font-heading font-extrabold text-2xl text-primary-text mt-0.5 tracking-tight">
                {getTabTitle()}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-inner-card border border-inner-border text-secondary-text hover:text-primary-text cursor-pointer hover:border-slate-450 transition-all shadow-sm"
                title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {themeToggleIcon}
              </button>

              {/* Quick Consultation CTA */}
              {currentTab !== "contact" && (
                <button
                  onClick={() => {
                    setCurrentTab("contact");
                  }}
                  className="bg-inner-card hover:bg-inner-card/75 text-primary-text border border-inner-border hover:border-slate-400/50 font-bold px-4 py-2 rounded-lg text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm animate-fade-in"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-brand-indigo">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                  </svg>
                  Contact Coach
                </button>
              )}
            </div>
          </div>

          {/* Active Tab View */}
          <div className="min-h-[60vh]">
            {renderTabContent()}
          </div>

        </main>

        {/* Global Footer */}
        <footer className="py-6 border-t border-[var(--sidebar-border)] bg-inner-card mt-auto">
          <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4 text-muted-text text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="text-brand-indigo font-bold">SWAYANSHU</span>
              <span>© {new Date().getFullYear()} Coaching Systems. All rights reserved.</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary-text transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary-text transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-slate-500 dark:hover:text-slate-400 transition-colors">Support Portal</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
