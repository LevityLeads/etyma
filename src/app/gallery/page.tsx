"use client";

import { useState } from "react";
import type { NameAnalysis, ColourPalette } from "../../types/name";
import { PALETTES } from "../../types/name";
import { GALLERY_NAMES, GALLERY_PALETTES } from "../../data/names";
import PosterPreview from "../../components/PosterPreview";

export default function GalleryPage() {
  const [selected, setSelected] = useState<NameAnalysis | null>(null);

  return (
    <main className="min-h-screen bg-[#FDF6EC]">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#FDF6EC]/80 border-b border-[#E8B94A]/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold tracking-tight">
            <span className="gradient-amber">Etyma</span>
          </a>
          <div className="flex items-center gap-6 text-sm">
            <a href="/create" className="text-[#8A8078] hover:text-[#1A1612] transition-colors">
              Create Yours
            </a>
            <a href="/gallery" className="text-[#1A1612] font-medium">
              Gallery
            </a>
          </div>
        </div>
      </nav>

      <div className="pt-28 pb-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#D4930D]">
            The Collection
          </p>
          <h1 className="text-4xl md:text-5xl font-bold">Gallery</h1>
          <p className="text-[#8A8078] max-w-lg mx-auto text-lg">
            Explore our collection of name prints. Each one is a complete linguistic
            portrait, tracing roots, sounds, and structure.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {GALLERY_NAMES.map((nameData) => {
            const pal = (GALLERY_PALETTES[nameData.name] || "warm-gold") as ColourPalette;
            return (
              <button
                key={nameData.name}
                onClick={() => setSelected(selected?.name === nameData.name ? null : nameData)}
                className="group transition-all hover:scale-[1.03] active:scale-[0.98]"
              >
                <div className="poster-shadow rounded-lg overflow-hidden">
                  <PosterPreview analysis={nameData} palette={pal} compact />
                </div>
                <p className="mt-3 text-sm text-[#8A8078] group-hover:text-[#1A1612] transition-colors">
                  {nameData.etymology.originLanguage} · &ldquo;{nameData.etymology.meaning}&rdquo;
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Detail */}
        {selected && (
          <div className="mt-16 scroll-mt-24" id="detail">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Poster */}
              <div className="lg:sticky lg:top-28">
                <div className="poster-shadow rounded-lg overflow-hidden max-w-md mx-auto">
                  <PosterPreview
                    analysis={selected}
                    palette={(GALLERY_PALETTES[selected.name] || "warm-gold") as ColourPalette}
                  />
                </div>
              </div>

              {/* Detail */}
              <div className="space-y-8">
                <div>
                  <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#D4930D] mb-2">
                    Word Anatomy
                  </p>
                  <h2 className="text-4xl font-bold">{selected.name}</h2>
                  <p className="text-[#8A8078] mt-2 text-lg">
                    From {selected.etymology.originLanguage},{" "}
                    <span className="font-mono text-[#D4930D]">{selected.etymology.rootWord}</span>
                  </p>
                </div>

                {/* Etymology */}
                <div className="p-6 rounded-xl bg-[#1A1612] text-[#FDF6EC]">
                  <h3 className="text-xs tracking-[0.2em] uppercase text-[#E8B94A] mb-3">Etymology</h3>
                  <p className="text-[#C4BAB0] leading-relaxed mb-4">
                    {selected.etymology.culturalSignificance}
                  </p>
                  <p className="text-[#C4BAB0] leading-relaxed">
                    {selected.etymology.historicalNotes}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {selected.etymology.languageFamilyTree.map((lang, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full border border-[#E8B94A]/30 text-[#E8B94A]"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Phonetics */}
                <div className="p-6 rounded-xl bg-white border border-[#E8B94A]/20">
                  <h3 className="text-xs tracking-[0.2em] uppercase text-[#D4930D] mb-3">Phonetics</h3>
                  <p className="font-mono text-3xl text-[#D4930D] mb-2">{selected.phonetics.ipa}</p>
                  <p className="text-sm text-[#8A8078] mb-4">{selected.phonetics.stressPattern}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {selected.phonetics.sounds.map((s, i) => (
                      <div key={i} className="text-sm">
                        <span className="font-mono text-[#D4930D]">{s.symbol}</span>{" "}
                        <span className="text-[#8A8078]">{s.description}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-[#8A8078] mt-4 italic">{selected.phonetics.phonosemantic}</p>
                </div>

                {/* Morphology */}
                <div className="p-6 rounded-xl bg-white border border-[#E8B94A]/20">
                  <h3 className="text-xs tracking-[0.2em] uppercase text-[#D4930D] mb-3">Morphology</h3>
                  <div className="flex gap-3 mb-4">
                    {selected.morphology.morphemes.map((m, i) => (
                      <div key={i} className="text-center px-5 py-3 rounded-lg bg-[#FDF6EC]">
                        <span className="block font-mono text-lg text-[#D4930D]">{m.part}</span>
                        <span className="block text-[10px] uppercase tracking-wider text-[#8A8078]">
                          {m.type}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-[#8A8078]">{selected.morphology.grammaticalJourney}</p>
                </div>

                {/* Cognates */}
                <div className="p-6 rounded-xl bg-[#1A1612] text-[#FDF6EC]">
                  <h3 className="text-xs tracking-[0.2em] uppercase text-[#E8B94A] mb-3">
                    Cross-Linguistic
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {selected.crossLinguistic.cognates.map((c, i) => (
                      <div key={i}>
                        <span className="text-xs uppercase tracking-wider text-[#C4BAB0]">
                          {c.language}
                        </span>
                        <span className="block font-mono text-[#E8B94A]">{c.word}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex gap-4">
                  <a href="/create" className="btn-primary flex-1 text-center">
                    Create Your Own
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-24 text-center space-y-6">
          <h2 className="text-3xl font-bold">Don&apos;t see your name?</h2>
          <p className="text-[#8A8078] text-lg">
            Every name has a story. Create a custom print in under a minute.
          </p>
          <a href="/create" className="btn-primary inline-block">
            Create Your Print
          </a>
        </div>
      </div>

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
