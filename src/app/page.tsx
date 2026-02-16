"use client";

import { useState } from "react";
/* eslint-disable @next/next/no-img-element */

const FEATURES = [
  {
    icon: "🌿",
    title: "Etymology",
    desc: "Trace your name back through centuries of language, from ancient roots to modern meaning.",
  },
  {
    icon: "🔊",
    title: "Phonetics",
    desc: "See how your name sounds across the world, in IPA notation with stress patterns and syllable breaks.",
  },
  {
    icon: "🧬",
    title: "Morphology",
    desc: "The building blocks of your name, broken down into morphemes, prefixes, and linguistic DNA.",
  },
  {
    icon: "🎨",
    title: "Custom Art",
    desc: "Each poster features a unique AI-generated artwork inspired by the meaning and feeling of the name.",
  },
];

const EXAMPLE_NAMES = [
  "Sunny", "Auri", "Luna", "Oliver", "Ivy", "Leo",
  "Willow", "Felix", "Aurora", "Jasper", "Iris", "Hugo",
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [customName, setCustomName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to email list (Loops, Buttondown, or simple Google Sheet)
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#FDF6EC]/80 border-b border-[#E8B94A]/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="gradient-amber">Etyma</span>
          </h1>
          <div className="flex items-center gap-6 text-sm">
            <a href="#how-it-works" className="text-[#8A8078] hover:text-[#1A1612] transition-colors">How It Works</a>
            <a href="#gallery" className="text-[#8A8078] hover:text-[#1A1612] transition-colors">Gallery</a>
            <a href="#order" className="btn-primary !py-2 !px-5 text-xs">Order Yours</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Copy */}
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#D4930D]">
                The Art of Names
              </p>
              <h2 className="text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                Every name has a story.
                <br />
                <span className="gradient-amber">We make it art.</span>
              </h2>
            </div>
            <p className="text-lg text-[#8A8078] leading-relaxed max-w-lg">
              Etyma creates stunning art prints that reveal the hidden anatomy of any name. 
              Etymology, phonetics, morphology, and meaning, all woven into a single beautiful poster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#order" className="btn-primary">
                Order a Custom Print
              </a>
              <a href="#how-it-works" className="btn-secondary">
                See How It Works
              </a>
            </div>
            <p className="text-xs text-[#C4BAB0] tracking-wide">
              Digital download. Print at any size. Ships to your inbox in hours.
            </p>
          </div>

          {/* Right - Poster Preview */}
          <div className="relative">
            <div className="poster-float">
              <div className="poster-shadow rounded-lg overflow-hidden bg-[#1A1612] p-3">
                <img
                  src="/posters/sunny-preview.png"
                  alt="SUNNY - Word Anatomy Art Print"
                  className="w-full rounded"
                />
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -z-10 top-10 -right-10 w-40 h-40 rounded-full bg-[#F5D78E]/30 blur-3xl" />
            <div className="absolute -z-10 -bottom-10 -left-10 w-32 h-32 rounded-full bg-[#D4930D]/20 blur-3xl" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-[#1A1612] text-[#FDF6EC]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#E8B94A] mb-3">
              How It Works
            </p>
            <h2 className="text-4xl font-bold">
              More than a name. A complete portrait.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((f, i) => (
              <div key={i} className="space-y-4 p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <span className="text-3xl">{f.icon}</span>
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p className="text-[#C4BAB0] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Use Cases */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold">The perfect gift for</h2>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {["New babies", "Birthdays", "Weddings", "Nursery decor", "Name days", "Christenings", "Anniversaries", "Just because"].map((use) => (
              <span
                key={use}
                className="px-5 py-2.5 rounded-full border border-[#D4930D]/30 text-[#8A8078] hover:border-[#D4930D] hover:text-[#D4930D] transition-colors cursor-default"
              >
                {use}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section id="gallery" className="py-24 px-6 bg-gradient-to-b from-[#FDF6EC] to-[#F5EDE0]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#D4930D] mb-3">
              Coming Soon
            </p>
            <h2 className="text-4xl font-bold">Popular Names</h2>
            <p className="text-[#8A8078] mt-4 max-w-lg mx-auto">
              Pre-made prints available for instant download. Can&apos;t find yours? Order a custom print.
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {EXAMPLE_NAMES.map((name) => (
              <div
                key={name}
                className="aspect-[3/4] rounded-lg bg-[#1A1612] flex items-center justify-center text-[#F5D78E] font-bold text-lg hover:scale-105 transition-transform cursor-pointer"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order / Waitlist */}
      <section id="order" className="py-24 px-6 bg-[#1A1612] text-[#FDF6EC]">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div>
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#E8B94A] mb-3">
              Launching Soon
            </p>
            <h2 className="text-4xl font-bold">
              Be the first to get yours
            </h2>
            <p className="text-[#C4BAB0] mt-4">
              Join the waitlist and we&apos;ll notify you when Etyma launches. 
              First 50 signups get 30% off their first print.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-5 py-4 bg-white/10 border border-white/20 rounded-none text-white placeholder:text-white/40 focus:outline-none focus:border-[#E8B94A] transition-colors text-sm"
              />
              <button type="submit" className="btn-primary !bg-[#D4930D] whitespace-nowrap">
                Join Waitlist
              </button>
            </form>
          ) : (
            <div className="bg-[#D4930D]/20 border border-[#D4930D]/40 rounded-lg p-6">
              <p className="text-[#E8B94A] font-medium">You&apos;re on the list! 🎉</p>
              <p className="text-[#C4BAB0] text-sm mt-2">We&apos;ll email you when Etyma launches.</p>
            </div>
          )}

          <div className="pt-8 border-t border-white/10">
            <p className="text-sm text-[#C4BAB0] mb-4">Or tell us your name and we&apos;ll make it first:</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Enter a name..."
                className="flex-1 px-5 py-4 bg-white/10 border border-white/20 rounded-none text-white placeholder:text-white/40 focus:outline-none focus:border-[#E8B94A] transition-colors text-sm"
              />
              <button className="btn-primary !bg-transparent !border !border-[#E8B94A] !text-[#E8B94A] hover:!bg-[#E8B94A] hover:!text-[#1A1612] whitespace-nowrap">
                Request This Name
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#E8B94A]/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-xl font-bold">
            <span className="gradient-amber">Etyma</span>
          </h1>
          <p className="text-xs text-[#C4BAB0]">
            © 2026 Etyma. Every name tells a story.
          </p>
        </div>
      </footer>
    </main>
  );
}
