"use client";

import React from "react";

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export default function Sidebar({
  currentTab,
  setCurrentTab,
  isExpanded,
  setIsExpanded,
  isMobileOpen,
  setIsMobileOpen,
}: SidebarProps) {
  const menuItems = [
    {
      id: "results",
      label: "Coach's Result",
      subtitle: "Success Stories",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
          />
        </svg>
      ),
    },
    {
      id: "programs",
      label: "Programs",
      subtitle: "Workouts & Nutrition",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </svg>
      ),
    },
    {
      id: "contact",
      label: "Contact Coach",
      subtitle: "WhatsApp & Socials",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          />
        </svg>
      ),
    },
  ];

  const handleNav = (tabId: string) => {
    setCurrentTab(tabId);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-[var(--sidebar-bg)] border-r border-[var(--sidebar-border)] transition-all duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen
          ${isExpanded ? "w-64" : "w-20"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Sidebar Header */}
        <div className={`flex items-center h-16 border-b border-[var(--sidebar-border)] transition-all duration-300 relative ${isExpanded ? "justify-between px-6" : "justify-center px-0"}`}>
          <button
            onClick={() => handleNav("results")}
            className="flex items-center gap-3 overflow-hidden hover:opacity-80 active:scale-[0.98] transition-all cursor-pointer text-left border-none bg-transparent outline-none focus:outline-none"
            title="Go to Coach's Result"
          >
            {/* Glowing Logo Icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden shrink-0 shadow-md border border-brand-indigo/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Photos/Logo.jpeg"
                alt="Swayanshu Wellness Logo"
                className="w-full h-full object-cover"
              />
            </div>
            {isExpanded && (
              <div className="flex flex-col animate-fade-in shrink-0 leading-tight">
                <span className="font-heading font-extrabold text-sm text-primary-text tracking-wider uppercase">
                  SWAYANSHU
                </span>
                <span className="font-heading text-[10px] font-bold text-brand-indigo tracking-widest uppercase">
                  WELLNESS
                </span>
              </div>
            )}
          </button>

          {/* Desktop Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-full border border-[var(--sidebar-border)] bg-[var(--sidebar-bg)] text-muted-text hover:text-primary-text shadow-sm hover:border-slate-400/50 transition-all cursor-pointer absolute top-4.5 right-[-14px] z-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className={`w-3.5 h-3.5 transition-transform duration-300 ${!isExpanded ? "rotate-180" : ""}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto no-scrollbar">
          {menuItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group cursor-pointer relative
                  ${
                    isActive
                      ? "bg-active-item text-primary-text font-semibold"
                      : "text-secondary-text hover:bg-inner-card hover:text-primary-text"
                  }
                `}
              >
                {/* Active Indicator Bar */}
                {isActive && !isExpanded && (
                  <span className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-brand-indigo rounded-r-full" />
                )}

                <div className={`shrink-0 ${isActive ? "text-brand-indigo" : "text-muted-text group-hover:text-brand-indigo transition-colors"}`}>
                  {item.icon}
                </div>

                {isExpanded && (
                  <div className="flex flex-col min-w-0">
                    <span className="font-sans font-semibold text-sm leading-tight tracking-wide truncate">
                      {item.label}
                    </span>
                    <span
                      className={`font-sans text-[10px] truncate leading-none mt-0.5 ${
                        isActive ? "text-brand-indigo/80 dark:text-indigo-400" : "text-muted-text"
                      }`}
                    >
                      {item.subtitle}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-[var(--sidebar-border)] flex flex-col mt-auto">
          {/* Trainer Profile (Always visible) */}
          <div className="p-3 bg-inner-card">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-brand-indigo/20 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Photos/pfp.jpeg"
                  alt="Trainer Coach"
                  className="w-full h-full object-cover"
                />
              </div>
              {isExpanded && (
                <div className="flex flex-col min-w-0">
                  <span className="font-sans font-semibold text-xs text-primary-text truncate leading-tight">
                    Coach Swayanshu
                  </span>
                  <span className="font-sans text-[10px] text-brand-indigo font-medium tracking-wider uppercase leading-none mt-0.5">
                    Lead Coach
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
