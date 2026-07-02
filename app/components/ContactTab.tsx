"use client";

import React, { useState } from "react";

export default function ContactTab() {
  const [copied, setCopied] = useState(false);

  const contactInfo = {
    whatsapp: {
      number: "+91 7008693564",
      link: "https://wa.me/917008693564?text=Hi%20Coach%20Swayanshu%2C%20I'm%20interested%20in%20your%20wellness%20coaching%20programs!",
      label: "Chat on WhatsApp",
      description: "Direct priority line for enrollment inquiries and quick fitness chats.",
      username: "+91 7008693564",
    },
    telegram: {
      username: "@coach_swayanshu",
      link: "https://t.me/coach_swayanshu",
      label: "Message on Telegram",
      description: "Connect for community challenge registration and lifestyle habit audits.",
    },
    instagram: {
      username: "@coach_swayanshu",
      link: "https://instagram.com/coach_swayanshu",
      label: "Follow on Instagram",
      description: "Follow for daily transformation stories, workout tips, and client results.",
    },
    gmail: {
      email: "coachswayanshu@gmail.com",
      link: "mailto:coachswayanshu@gmail.com?subject=Wellness%20Coaching%20Inquiry",
      label: "Send an Email",
      description: "Send official partnership requests, program feedback, or detailed reports.",
    },
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactInfo.gmail.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12 animate-fade-in text-primary-text">
      {/* Intro Banner */}
      <section className="space-y-4 max-w-3xl">
        <h2 className="font-heading font-extrabold text-2xl md:text-3xl lg:text-4xl text-primary-text tracking-tight leading-tight">
          Connect Directly with <br />
          <span className="text-gradient">Coach Swayanshu</span>
        </h2>
        <p className="font-sans text-sm md:text-base text-secondary-text leading-relaxed">
          Start your physical and lifestyle transformation journey by reaching out directly. Choose your preferred channel below to discuss program options, ask questions, or align on your fitness goals.
        </p>
      </section>

      {/* Grid of Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

        {/* WhatsApp Card */}
        <div className="glass-panel p-6 md:p-8 flex flex-col justify-between hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-all duration-300" />

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 shrink-0">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.115-2.906-6.99C16.657 1.876 14.179.845 11.54.845c-5.443 0-9.869 4.42-9.873 9.863-.001 1.748.47 3.447 1.365 4.969L2.025 21.8l6.23-1.634.392.228zm10.96-5.836c-.297-.148-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.148-.197.297-.767.966-.94 1.163-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.568-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-primary-text">WhatsApp</h3>
                <span className="font-sans text-xs text-brand-indigo font-bold">{contactInfo.whatsapp.username}</span>
              </div>
            </div>
            <p className="font-sans text-xs md:text-sm text-secondary-text leading-relaxed">
              {contactInfo.whatsapp.description}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-inner-border">
            <a
              href={contactInfo.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-bold py-3 px-4 rounded-xl text-xs transition-all shadow-md cursor-pointer"
            >
              <span>{contactInfo.whatsapp.label}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Telegram Card */}
        <div className="glass-panel p-6 md:p-8 flex flex-col justify-between hover:border-sky-500/40 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-sky-500/10 transition-all duration-300" />

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-500 border border-sky-500/20 shrink-0">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.944 0C5.337 0 0 5.337 0 11.944c0 6.608 5.337 11.944 11.944 11.944 6.608 0 11.944-5.336 11.944-11.944C23.888 5.337 18.552 0 11.944 0zm5.727 8.16l-1.897 8.94c-.143.645-.526.804-1.07.502l-2.887-2.128-1.392 1.34c-.154.154-.284.284-.582.284l.206-2.93 5.335-4.82c.232-.206-.05-.32-.36-.114l-6.593 4.15-2.84-.888c-.617-.193-.63-.617.13-.913l11.096-4.28c.515-.193.965.114.76.927z" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-primary-text">Telegram</h3>
                <span className="font-sans text-xs text-brand-indigo font-bold">{contactInfo.telegram.username}</span>
              </div>
            </div>
            <p className="font-sans text-xs md:text-sm text-secondary-text leading-relaxed">
              {contactInfo.telegram.description}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-inner-border">
            <a
              href={contactInfo.telegram.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 active:scale-[0.99] text-white font-bold py-3 px-4 rounded-xl text-xs transition-all shadow-md cursor-pointer"
            >
              <span>{contactInfo.telegram.label}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Instagram Card */}
        <div className="glass-panel p-6 md:p-8 flex flex-col justify-between hover:border-pink-500/40 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-pink-500/10 transition-all duration-300" />

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500 border border-pink-500/20 shrink-0">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.205 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-primary-text">Instagram</h3>
                <span className="font-sans text-xs text-brand-indigo font-bold">{contactInfo.instagram.username}</span>
              </div>
            </div>
            <p className="font-sans text-xs md:text-sm text-secondary-text leading-relaxed">
              {contactInfo.instagram.description}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-inner-border">
            <a
              href={contactInfo.instagram.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 active:scale-[0.99] text-white font-bold py-3 px-4 rounded-xl text-xs transition-all shadow-md cursor-pointer"
            >
              <span>{contactInfo.instagram.label}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Gmail Card */}
        <div className="glass-panel p-6 md:p-8 flex flex-col justify-between hover:border-rose-500/40 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-rose-500/10 transition-all duration-300" />

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 border border-rose-500/20 shrink-0">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-1.29 1.454-2.032 2.514-1.222L12 11.23l9.486-6.995c1.06-.81 2.514-.068 2.514 1.222z" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-primary-text">Email Support</h3>
                <span className="font-sans text-xs text-brand-indigo font-bold">{contactInfo.gmail.email}</span>
              </div>
            </div>
            <p className="font-sans text-xs md:text-sm text-secondary-text leading-relaxed">
              {contactInfo.gmail.description}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-inner-border flex gap-3">
            {/* Copy Button */}
            <button
              onClick={handleCopyEmail}
              className={`flex-1 flex items-center justify-center gap-2 border font-bold py-3 px-4 rounded-xl text-xs transition-all cursor-pointer shadow-sm
                ${copied
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/20 dark:border-emerald-900/50 dark:text-emerald-400"
                  : "bg-inner-card border-inner-border text-secondary-text hover:border-slate-400/50 hover:text-primary-text"
                }
              `}
            >
              {copied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135-.845-2.098-1.976-2.192.373-.08.773-.12 1.18-.12h4.5c1.135 0 2.098.845 2.192 1.976C14.238 6.136 14.25 6.549 14.25 7.5v.93a3 3 0 0 1-3 3H8.25M3 16.5v-6a3 3 0 0 1 3-3h4.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z" />
                  </svg>
                  <span>Copy Address</span>
                </>
              )}
            </button>
            {/* Direct Mailto */}
            <a
              href={contactInfo.gmail.link}
              className="flex-1 flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-500 active:scale-[0.99] text-white font-bold py-3 px-4 rounded-xl text-xs transition-all shadow-md cursor-pointer text-center"
            >
              <span>{contactInfo.gmail.label}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
