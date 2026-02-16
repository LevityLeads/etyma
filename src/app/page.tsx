"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";

// Custom SVG icons instead of emojis
const Icons = {
  roots: (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth="1.5">
      <path d="M24 4v16M24 20c-4 0-12 2-16 12M24 20c4 0 12 2 16 12M8 32c-2 4-3 8-3 12M40 32c2 4 3 8 3 12M16 26c-2 4-6 10-8 18M32 26c2 4 6 10 8 18M24 20c0 4-1 12-4 24M24 20c0 4 1 12 4 24" strokeLinecap="round"/>
      <circle cx="24" cy="6" r="3" fill="currentColor" opacity="0.3"/>
    </svg>
  ),
  sound: (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 18v12h8l10 8V10L16 18H8z" strokeLinejoin="round"/>
      <path d="M32 16c2 2.5 3 5 3 8s-1 5.5-3 8" strokeLinecap="round"/>
      <path d="M36 12c3.5 3.5 5.5 8 5.5 12s-2 8.5-5.5 12" strokeLinecap="round"/>
    </svg>
  ),
  dna: (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 4c0 8 16 12 16 20s-16 12-16 20" strokeLinecap="round"/>
      <path d="M32 4c0 8-16 12-16 20s16 12 16 20" strokeLinecap="round"/>
      <line x1="14" y1="14" x2="34" y2="14" opacity="0.4"/>
      <line x1="14" y1="24" x2="34" y2="24" opacity="0.4"/>
      <line x1="14" y1="34" x2="34" y2="34" opacity="0.4"/>
    </svg>
  ),
  brush: (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth="1.5">
      <path d="M36 4L18 22c-2 2-3 5-2 8 1 2 0 4-2 5-3 2-4 5-3 7 1 1 3 2 6 1 4-2 7-6 7-10l18-18" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M30 10l8 8" strokeLinecap="round"/>
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth="1.5">
      <circle cx="24" cy="24" r="18"/>
      <ellipse cx="24" cy="24" rx="8" ry="18"/>
      <path d="M8 16h32M8 32h32" strokeLinecap="round"/>
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth="1.5">
      <path d="M24 42S6 30 6 18c0-6 4.5-12 10.5-12C21 6 24 10 24 10s3-4 7.5-4C37.5 6 42 12 42 18c0 12-18 24-18 24z" strokeLinejoin="round"/>
    </svg>
  ),
};

const EXAMPLE_NAMES = [
  "Sunny", "Auri", "Luna", "Oliver", "Ivy", "Leo",
  "Willow", "Felix", "Aurora", "Jasper", "Iris", "Hugo",
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [customName, setCustomName] = useState("");
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {}
    setSubmitted(true);
  };

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    try {
      await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: customName, email }),
      });
    } catch {}
    setRequestSubmitted(true);
  };

  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#FDF6EC]/80 border-b border-[#E8B94A]/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="text-2xl font-bold tracking-tight">
            <span className="gradient-amber">Etyma</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#etymology" className="text-[#8A8078] hover:text-[#1A1612] transition-colors">Etymology</a>
            <a href="#phonetics" className="text-[#8A8078] hover:text-[#1A1612] transition-colors">Phonetics</a>
            <a href="#morphology" className="text-[#8A8078] hover:text-[#1A1612] transition-colors">Morphology</a>
            <a href="#gallery" className="text-[#8A8078] hover:text-[#1A1612] transition-colors">Gallery</a>
            <a href="#order" className="btn-primary !py-2 !px-5 text-xs">Order Yours</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#D4930D]">
              The DNA of a Name
            </p>
            <h2 className="text-5xl lg:text-[3.5rem] font-bold leading-[1.08] tracking-tight">
              Your name is a living thing.
              <br />
              <span className="gradient-amber">We reveal what&apos;s inside.</span>
            </h2>
            <p className="text-lg text-[#8A8078] leading-relaxed max-w-lg">
              Every name carries thousands of years of history, sound, structure, and meaning.
              Etyma decodes it all and turns it into a single, stunning art print.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#order" className="btn-primary">Order a Print</a>
              <a href="#etymology" className="btn-secondary">Explore the Layers</a>
            </div>
          </div>
          <div className="relative">
            <div className="poster-float">
              <div className="poster-shadow rounded-lg overflow-hidden bg-[#1A1612] p-3">
                <img src="/posters/sunny-preview.png" alt="SUNNY - Word Anatomy Art Print by Etyma" className="w-full rounded" />
              </div>
            </div>
            <div className="absolute -z-10 top-10 -right-10 w-40 h-40 rounded-full bg-[#F5D78E]/30 blur-3xl" />
            <div className="absolute -z-10 -bottom-10 -left-10 w-32 h-32 rounded-full bg-[#D4930D]/20 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Intro Statement */}
      <section className="py-16 px-6 border-y border-[#E8B94A]/10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-light leading-relaxed text-[#1A1612]">
            A name isn&apos;t just a label. It&apos;s a capsule of language, culture, and meaning
            that has been shaped by centuries of human history. Each Etyma print unpacks
            these layers and presents them as art.
          </p>
        </div>
      </section>

      {/* === ETYMOLOGY SECTION === */}
      <section id="etymology" className="py-28 px-6 bg-[#1A1612] text-[#FDF6EC]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8 lg:sticky lg:top-32">
              <div className="text-[#D4930D]">{Icons.roots}</div>
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#E8B94A]">Layer One</p>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">Etymology</h2>
              <p className="text-lg text-[#C4BAB0] leading-relaxed">
                Where did your name come from? Every name has a journey. A path through languages,
                cultures, and centuries that led it to you.
              </p>
            </div>
            <div className="space-y-8">
              <div className="p-8 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-semibold mb-4">Origins</h3>
                <p className="text-[#C4BAB0] leading-relaxed">
                  We trace your name back to its earliest known roots. &ldquo;Sunny&rdquo; descends from
                  the Old English <span className="font-mono text-[#E8B94A]">sunne</span>, itself from
                  Proto-Germanic <span className="font-mono text-[#E8B94A]">*sunnōn</span>, reaching
                  all the way to Proto-Indo-European <span className="font-mono text-[#E8B94A]">*sóh₂wl̥</span>,
                  the ancient word for the sun. A 5,000-year journey, sitting quietly in two syllables.
                </p>
              </div>
              <div className="p-8 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-semibold mb-4">Language Family Tree</h3>
                <p className="text-[#C4BAB0] leading-relaxed">
                  See how your name branches across language families. The same root that gave
                  English &ldquo;sun&rdquo; gave Latin <span className="font-mono text-[#E8B94A]">sōl</span>,
                  Greek <span className="font-mono text-[#E8B94A]">hḗlios</span>, and
                  Sanskrit <span className="font-mono text-[#E8B94A]">sū́rya</span>.
                  Your name connects you to all of them.
                </p>
              </div>
              <div className="p-8 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-semibold mb-4">Cultural Significance</h3>
                <p className="text-[#C4BAB0] leading-relaxed">
                  Names carry cultural weight. We document how your name has been used across
                  civilizations, its symbolic meaning, and the stories it carries. Some names
                  were once reserved for royalty. Others were prayers. Yours has a story too.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === PHONETICS SECTION === */}
      <section id="phonetics" className="py-28 px-6 bg-[#F5EDE0]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="order-2 lg:order-1 space-y-8">
              <div className="p-8 rounded-xl bg-white border border-[#E8B94A]/20 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">IPA Transcription</h3>
                <p className="text-[#8A8078] leading-relaxed">
                  Your name rendered in the International Phonetic Alphabet, the universal
                  system linguists use to describe exactly how sounds are made.
                  <span className="font-mono text-[#D4930D] text-lg ml-2">/ˈsʌn.i/</span>
                </p>
              </div>
              <div className="p-8 rounded-xl bg-white border border-[#E8B94A]/20 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Sound Profile</h3>
                <p className="text-[#8A8078] leading-relaxed">
                  We break down each sound in your name. The <span className="font-mono text-[#D4930D]">/s/</span> is
                  a voiceless alveolar fricative, air hissing through a narrow gap.
                  The <span className="font-mono text-[#D4930D]">/ʌ/</span> is an open-mid back vowel,
                  warm and centred. Together they create a sound that feels bright and optimistic.
                  That&apos;s not coincidence. It&apos;s phonosemantics.
                </p>
              </div>
              <div className="p-8 rounded-xl bg-white border border-[#E8B94A]/20 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Stress &amp; Rhythm</h3>
                <p className="text-[#8A8078] leading-relaxed">
                  How your name flows when spoken. Which syllable carries the weight.
                  Whether it falls as a trochee (DA-da) or an iamb (da-DA). The rhythm
                  of a name shapes how it feels to say, and how it feels to be called.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8 lg:sticky lg:top-32">
              <div className="text-[#D4930D]">{Icons.sound}</div>
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#D4930D]">Layer Two</p>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">Phonetics</h2>
              <p className="text-lg text-[#8A8078] leading-relaxed">
                How does your name sound? Not just to your ear, but to a linguist&apos;s.
                Every consonant, every vowel, every micro-movement of your mouth
                tells a story.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === MORPHOLOGY SECTION === */}
      <section id="morphology" className="py-28 px-6 bg-[#1A1612] text-[#FDF6EC]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8 lg:sticky lg:top-32">
              <div className="text-[#D4930D]">{Icons.dna}</div>
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#E8B94A]">Layer Three</p>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">Morphology</h2>
              <p className="text-lg text-[#C4BAB0] leading-relaxed">
                The internal architecture of your name. If etymology is history and phonetics
                is sound, morphology is structure. The building blocks. The DNA.
              </p>
            </div>
            <div className="space-y-8">
              <div className="p-8 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-semibold mb-4">Morpheme Breakdown</h3>
                <p className="text-[#C4BAB0] leading-relaxed">
                  Every name can be decomposed into its smallest meaningful units.
                  <span className="font-mono text-[#E8B94A]">&ldquo;Sunny&rdquo; = sun + -y</span>.
                  The root <span className="font-mono text-[#E8B94A]">sun</span> (the star) plus
                  the suffix <span className="font-mono text-[#E8B94A]">-y</span> (having the quality of).
                  Two morphemes. One meaning: radiant.
                </p>
              </div>
              <div className="p-8 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-semibold mb-4">Word Class &amp; Grammar</h3>
                <p className="text-[#C4BAB0] leading-relaxed">
                  Your name started as something else before it became a name. An adjective.
                  A noun. A verb. We trace that grammatical journey: how a common word became
                  a proper noun, became someone&apos;s identity.
                </p>
              </div>
              <div className="p-8 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-semibold mb-4">Related Forms</h3>
                <p className="text-[#C4BAB0] leading-relaxed">
                  Names have siblings. Variants across languages, diminutives, historical
                  forms. &ldquo;Alexander&rdquo; connects to &ldquo;Alejandro&rdquo;,
                  &ldquo;Alessandro&rdquo;, &ldquo;Iskander&rdquo;. Your name is part
                  of a family.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === CUSTOM ART SECTION === */}
      <section className="py-28 px-6 bg-[#F5EDE0]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="order-2 lg:order-1">
              <div className="poster-shadow rounded-lg overflow-hidden bg-[#1A1612] p-3 max-w-md">
                <img src="/posters/sunny-preview.png" alt="SUNNY poster detail" className="w-full rounded" />
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8 lg:sticky lg:top-32">
              <div className="text-[#D4930D]">{Icons.brush}</div>
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#D4930D]">The Centrepiece</p>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">Custom Artwork</h2>
              <p className="text-lg text-[#8A8078] leading-relaxed">
                At the heart of every Etyma print is a unique piece of art, generated
                specifically for your name. The artwork is inspired by the meaning,
                the feeling, and the cultural weight of the word. No two prints share
                the same image.
              </p>
              <p className="text-[#8A8078] leading-relaxed">
                A name meaning &ldquo;sun&rdquo; gets warmth and light. A name meaning
                &ldquo;wolf&rdquo; gets wildness. A name meaning &ldquo;peace&rdquo;
                gets stillness. The art doesn&apos;t just decorate. It translates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === BEYOND THE NAME === */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8 lg:sticky lg:top-32">
              <div className="text-[#D4930D]">{Icons.globe}</div>
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#D4930D]">Layer Four</p>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">Cross-Linguistic Connections</h2>
              <p className="text-lg text-[#8A8078] leading-relaxed">
                Your name doesn&apos;t exist in isolation. It connects to words, names,
                and meanings across dozens of languages and thousands of years.
              </p>
            </div>
            <div className="space-y-8">
              <div className="p-8 rounded-xl bg-white border border-[#E8B94A]/20 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Cognates</h3>
                <p className="text-[#8A8078] leading-relaxed">
                  Words in other languages that share the same ancient root as your name.
                  These are your name&apos;s distant cousins, proof that language is one
                  vast, interconnected web.
                </p>
              </div>
              <div className="p-8 rounded-xl bg-white border border-[#E8B94A]/20 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Name Frequency</h3>
                <p className="text-[#8A8078] leading-relaxed">
                  How popular is your name, and where? We map usage data across countries
                  and decades. Some names are universal. Others are beautifully rare.
                  Both are interesting.
                </p>
              </div>
              <div className="p-8 rounded-xl bg-white border border-[#E8B94A]/20 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Famous Bearers</h3>
                <p className="text-[#8A8078] leading-relaxed">
                  The notable people who&apos;ve carried your name throughout history.
                  Scientists, artists, leaders, characters. Every name has a lineage
                  of remarkable people.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect Gift Section */}
      <section className="py-24 px-6 bg-[#1A1612] text-[#FDF6EC]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="text-[#D4930D] flex justify-center">{Icons.heart}</div>
          <h2 className="text-4xl font-bold">The most personal gift you can give.</h2>
          <p className="text-lg text-[#C4BAB0] max-w-2xl mx-auto leading-relaxed">
            Nothing is more personal than someone&apos;s name. An Etyma print takes that
            name and reveals everything hidden inside it. It&apos;s not just wall art.
            It&apos;s a mirror.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {["New babies", "Birthdays", "Weddings", "Nursery decor", "Name days", "Christenings", "Anniversaries", "Just because"].map((use) => (
              <span
                key={use}
                className="px-5 py-2.5 rounded-full border border-[#D4930D]/30 text-[#C4BAB0] hover:border-[#D4930D] hover:text-[#E8B94A] transition-colors cursor-default text-sm"
              >
                {use}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section id="gallery" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#D4930D]">Coming Soon</p>
            <h2 className="text-4xl font-bold">Popular Names</h2>
            <p className="text-[#8A8078] max-w-lg mx-auto">
              Pre-made prints available for instant download. Can&apos;t find yours? Order a custom print.
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {EXAMPLE_NAMES.map((name) => (
              <div
                key={name}
                className="aspect-[3/4] rounded-lg bg-[#1A1612] flex items-center justify-center text-[#F5D78E] font-bold text-lg hover:scale-105 hover:shadow-xl transition-all cursor-pointer group"
              >
                <span className="group-hover:scale-110 transition-transform">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order / Waitlist */}
      <section id="order" className="py-28 px-6 bg-[#1A1612] text-[#FDF6EC]">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div>
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#E8B94A] mb-3">
              Launching Soon
            </p>
            <h2 className="text-4xl font-bold">Be the first to get yours</h2>
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
              <p className="text-[#E8B94A] font-medium">You&apos;re on the list!</p>
              <p className="text-[#C4BAB0] text-sm mt-2">We&apos;ll email you when Etyma launches.</p>
            </div>
          )}

          <div className="pt-8 border-t border-white/10">
            {!requestSubmitted ? (
              <>
                <p className="text-sm text-[#C4BAB0] mb-4">Or tell us a name and we&apos;ll make it first:</p>
                <form onSubmit={handleRequest} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Enter a name..."
                    required
                    className="flex-1 px-5 py-4 bg-white/10 border border-white/20 rounded-none text-white placeholder:text-white/40 focus:outline-none focus:border-[#E8B94A] transition-colors text-sm"
                  />
                  <button type="submit" className="btn-primary !bg-transparent !border !border-[#E8B94A] !text-[#E8B94A] hover:!bg-[#E8B94A] hover:!text-[#1A1612] whitespace-nowrap">
                    Request This Name
                  </button>
                </form>
              </>
            ) : (
              <div className="bg-[#D4930D]/20 border border-[#D4930D]/40 rounded-lg p-6">
                <p className="text-[#E8B94A] font-medium">&ldquo;{customName}&rdquo; is on our list</p>
                <p className="text-[#C4BAB0] text-sm mt-2">We&apos;ll create your poster and let you know when it&apos;s ready.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#E8B94A]/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xl font-bold gradient-amber">Etyma</span>
          <p className="text-xs text-[#C4BAB0]">
            &copy; 2026 Etyma. Every name tells a story.
          </p>
        </div>
      </footer>
    </main>
  );
}
