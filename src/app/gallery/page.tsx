"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { NameAnalysis, ColourPalette } from "../../types/name";
import { PALETTES } from "../../types/name";
import { GALLERY_NAMES, GALLERY_PALETTES } from "../../data/names";

const NAME_ART: Record<string, string> = {
  Sunny: "/posters/sunny-art.png",
  Auri: "/posters/auri-art.png",
  Luna: "/posters/luna-art.png",
  Oliver: "/posters/oliver-art.png",
  Alexander: "/posters/alexander-art.png",
  Iris: "/posters/iris-art.png",
  Felix: "/posters/felix-art.png",
  Willow: "/posters/willow-art.png",
};

// ── Carousel Config ──
const CARD_WIDTH = 320;
const OVERLAP = 80;
const INACTIVE_SCALE = 0.88;
const INACTIVE_BRIGHTNESS = 0.4;
const SWIPE_THRESHOLD = 40;

function GalleryCard({
  analysis,
  isActive,
}: {
  analysis: NameAnalysis;
  isActive: boolean;
}) {
  const pal = PALETTES[(GALLERY_PALETTES[analysis.name] || "warm-gold") as ColourPalette];
  const artSrc = NAME_ART[analysis.name];

  return (
    <div
      className={`rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 ${
        isActive
          ? "border-2 shadow-[0_0_40px_rgba(212,147,13,0.2)]"
          : "border border-white/10"
      }`}
      style={{
        backgroundColor: pal.bg,
        borderColor: isActive ? `${pal.accent}99` : undefined,
      }}
    >
      {/* Art */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {artSrc && (
          <Image
            src={artSrc}
            alt={`${analysis.name} artwork`}
            fill
            className="object-cover"
            sizes="320px"
          />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
        />
      </div>

      {/* Info */}
      <div className="p-5 flex-1 flex flex-col" style={{ color: pal.text }}>
        <h3
          className="text-2xl font-bold tracking-[0.1em] uppercase"
          style={{ color: pal.accent }}
        >
          {analysis.name}
        </h3>
        <p className="text-xs tracking-[0.2em] uppercase opacity-40 mt-1">
          Word Anatomy
        </p>
        <p className="text-sm mt-3 opacity-60 leading-relaxed">
          {analysis.etymology.originLanguage} &middot; &ldquo;{analysis.etymology.meaning}&rdquo;
        </p>
        <div className="mt-3 font-mono text-lg" style={{ color: pal.accent }}>
          {analysis.phonetics.ipa}
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [active, setActive] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);

  const items = GALLERY_NAMES;
  const selected = items[active];
  const pal = PALETTES[(GALLERY_PALETTES[selected.name] || "warm-gold") as ColourPalette];

  const prev = useCallback(() => setActive((a) => Math.max(a - 1, 0)), []);
  const next = useCallback(
    () => setActive((a) => Math.min(a + 1, items.length - 1)),
    [items.length]
  );

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    startX.current = e.clientX;
    isDragging.current = true;
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - startX.current;
      if (Math.abs(dx) > SWIPE_THRESHOLD) {
        if (dx < 0) next();
        if (dx > 0) prev();
        isDragging.current = false;
      }
    },
    [next, prev]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <main className="min-h-screen bg-[#FDF6EC]">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#FDF6EC]/80 border-b border-[#E8B94A]/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold tracking-tight">
            <span className="gradient-amber">Etyma</span>
          </a>
          <div className="flex items-center gap-6 text-sm">
            <a
              href="/create"
              className="text-[#8A8078] hover:text-[#1A1612] transition-colors"
            >
              Create Yours
            </a>
            <a href="/gallery" className="text-[#1A1612] font-medium">
              Gallery
            </a>
          </div>
        </div>
      </nav>

      <div className="pt-28 pb-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-10 space-y-4">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#D4930D]">
            The Collection
          </p>
          <h1 className="text-4xl md:text-5xl font-bold">Gallery</h1>
          <p className="text-[#8A8078] max-w-lg mx-auto text-lg">
            Explore our collection. Click or swipe to browse. Each print is a
            complete linguistic portrait.
          </p>
        </div>

        {/* Name selector dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {items.map((item, i) => {
            const p2 =
              PALETTES[
                (GALLERY_PALETTES[item.name] || "warm-gold") as ColourPalette
              ];
            return (
              <button
                key={item.name}
                onClick={() => setActive(i)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  i === active
                    ? "scale-110 text-white"
                    : "bg-[#1A1612]/10 text-[#8A8078] hover:bg-[#1A1612]/20"
                }`}
                style={
                  i === active
                    ? { backgroundColor: p2.accent, color: p2.bg }
                    : undefined
                }
              >
                {item.name}
              </button>
            );
          })}
        </div>

        {/* Fanned Card Carousel */}
        <div
          className="relative overflow-hidden mx-auto"
          style={{ height: "480px" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div className="absolute inset-0 flex items-stretch justify-center">
            {items.map((item, i) => {
              const offset = i - active;
              const isActive = i === active;
              const absOffset = Math.abs(offset);
              const xPos = offset * (CARD_WIDTH - OVERLAP);

              return (
                <motion.div
                  key={item.name}
                  className="absolute cursor-pointer select-none"
                  style={{
                    width: `${CARD_WIDTH}px`,
                    height: "100%",
                    top: 0,
                  }}
                  animate={{
                    x: xPos,
                    scale: isActive ? 1 : INACTIVE_SCALE,
                    zIndex: 10 - absOffset,
                    opacity: absOffset > 2 ? 0 : 1,
                    filter: isActive
                      ? "brightness(1)"
                      : `brightness(${INACTIVE_BRIGHTNESS})`,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onClick={() => setActive(i)}
                >
                  <GalleryCard analysis={item} isActive={isActive} />
                </motion.div>
              );
            })}
          </div>

          {/* Arrow buttons */}
          {active > 0 && (
            <button
              onClick={prev}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1A1612]/80 border border-white/10 flex items-center justify-center text-white text-xl hover:border-[#D4930D]/30 hover:text-[#D4930D] transition-all duration-200"
            >
              ‹
            </button>
          )}
          {active < items.length - 1 && (
            <button
              onClick={next}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1A1612]/80 border border-white/10 flex items-center justify-center text-white text-xl hover:border-[#D4930D]/30 hover:text-[#D4930D] transition-all duration-200"
            >
              ›
            </button>
          )}
        </div>

        {/* Selected Name Detail */}
        <motion.div
          key={selected.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-12"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Full Poster Preview */}
            <div className="lg:sticky lg:top-28">
              <div className="poster-shadow rounded-lg overflow-hidden max-w-md mx-auto bg-[#1A1612] relative aspect-[3/4]">
                {NAME_ART[selected.name] && (
                  <Image
                    src={NAME_ART[selected.name]}
                    alt={`${selected.name} full artwork`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
                {/* Overlay with name */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-8">
                  <div>
                    <h2
                      className="text-4xl md:text-5xl font-bold tracking-[0.15em] uppercase"
                      style={{ color: pal.accent }}
                    >
                      {selected.name}
                    </h2>
                    <p className="text-[10px] tracking-[0.4em] uppercase mt-2 text-white/40">
                      Word Anatomy by Etyma
                    </p>
                  </div>
                  <div>
                    <p
                      className="font-mono text-2xl"
                      style={{ color: pal.accent }}
                    >
                      {selected.phonetics.ipa}
                    </p>
                    <p className="text-xs text-white/50 mt-1">
                      {selected.phonetics.stressPattern}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detail Panel */}
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#D4930D] mb-2">
                  Word Anatomy
                </p>
                <h2 className="text-4xl font-bold">{selected.name}</h2>
                <p className="text-[#8A8078] mt-2 text-lg">
                  From {selected.etymology.originLanguage},{" "}
                  <span className="font-mono text-[#D4930D]">
                    {selected.etymology.rootWord}
                  </span>
                </p>
              </div>

              {/* Etymology */}
              <div className="p-6 rounded-xl bg-[#1A1612] text-[#FDF6EC]">
                <h3 className="text-xs tracking-[0.2em] uppercase text-[#E8B94A] mb-3">
                  Etymology
                </h3>
                <p className="text-[#C4BAB0] leading-relaxed mb-3">
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
                <h3 className="text-xs tracking-[0.2em] uppercase text-[#D4930D] mb-3">
                  Phonetics
                </h3>
                <p className="font-mono text-3xl text-[#D4930D] mb-2">
                  {selected.phonetics.ipa}
                </p>
                <p className="text-sm text-[#8A8078] mb-4">
                  {selected.phonetics.stressPattern}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {selected.phonetics.sounds.map((s, i) => (
                    <div key={i} className="text-sm">
                      <span className="font-mono text-[#D4930D]">
                        {s.symbol}
                      </span>{" "}
                      <span className="text-[#8A8078]">{s.description}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[#8A8078] mt-4 italic">
                  {selected.phonetics.phonosemantic}
                </p>
              </div>

              {/* Morphology */}
              <div className="p-6 rounded-xl bg-white border border-[#E8B94A]/20">
                <h3 className="text-xs tracking-[0.2em] uppercase text-[#D4930D] mb-3">
                  Morphology
                </h3>
                <div className="flex gap-3 mb-4">
                  {selected.morphology.morphemes.map((m, i) => (
                    <div
                      key={i}
                      className="text-center px-5 py-3 rounded-lg bg-[#FDF6EC]"
                    >
                      <span className="block font-mono text-lg text-[#D4930D]">
                        {m.part}
                      </span>
                      <span className="block text-[10px] uppercase tracking-wider text-[#8A8078]">
                        {m.type}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[#8A8078]">
                  {selected.morphology.grammaticalJourney}
                </p>
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
                      <span className="block font-mono text-[#E8B94A]">
                        {c.word}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-4">
                <a
                  href="/create"
                  className="btn-primary flex-1 text-center"
                >
                  Create Your Own
                </a>
              </div>
            </div>
          </div>
        </motion.div>

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
