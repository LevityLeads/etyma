"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { ColourPalette } from "../../types/name";
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

export default function GalleryPage() {
  const [active, setActive] = useState(0);
  const items = GALLERY_NAMES;
  const selected = items[active];
  const pal = PALETTES[(GALLERY_PALETTES[selected.name] || "warm-gold") as ColourPalette];

  return (
    <main className="h-screen w-screen overflow-hidden relative" style={{ backgroundColor: pal.bg }}>
      {/* Background art - full bleed */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected.name}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5 }}
        >
          {NAME_ART[selected.name] && (
            <Image
              src={NAME_ART[selected.name]}
              alt={selected.name}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          )}
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Top nav */}
      <nav className="absolute top-0 left-0 right-0 z-30 px-8 py-5 flex items-center justify-between">
        <a href="/" className="text-xl font-bold tracking-tight text-white/80 hover:text-white transition-colors">
          Etyma
        </a>
        <div className="flex items-center gap-6 text-sm">
          <a href="/create" className="text-white/50 hover:text-white transition-colors">
            Create Yours
          </a>
          <a href="/gallery" className="text-white font-medium">
            Gallery
          </a>
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-10 h-full flex">
        {/* Left: Name info overlay */}
        <div className="flex-1 flex flex-col justify-end p-8 md:p-16 pb-12 md:pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-xl"
            >
              <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: pal.accent }}>
                Word Anatomy
              </p>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-[0.05em] uppercase text-white leading-none mb-6">
                {selected.name}
              </h1>

              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-mono text-2xl md:text-3xl" style={{ color: pal.accent }}>
                  {selected.phonetics.ipa}
                </span>
                <span className="text-white/30 text-sm">
                  {selected.phonetics.stressPattern}
                </span>
              </div>

              <p className="text-white/50 text-sm mb-2">
                From {selected.etymology.originLanguage},{" "}
                <span className="font-mono" style={{ color: `${pal.accent}CC` }}>
                  {selected.etymology.rootWord}
                </span>
              </p>
              <p className="text-white/40 text-sm leading-relaxed max-w-md mb-6">
                {selected.etymology.culturalSignificance}
              </p>

              {/* Morphemes */}
              <div className="flex gap-3 mb-8">
                {selected.morphology.morphemes.map((m, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 rounded-lg backdrop-blur-sm"
                    style={{
                      backgroundColor: `${pal.accent}15`,
                      border: `1px solid ${pal.accent}30`,
                    }}
                  >
                    <span className="block font-mono text-sm" style={{ color: pal.accent }}>
                      {m.part}
                    </span>
                    <span className="block text-[9px] uppercase tracking-wider text-white/30">
                      {m.type}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cognates row */}
              <div className="flex gap-6">
                {selected.crossLinguistic.cognates.slice(0, 4).map((c, i) => (
                  <div key={i}>
                    <span className="text-[9px] uppercase tracking-wider text-white/25 block">
                      {c.language}
                    </span>
                    <span className="font-mono text-xs" style={{ color: `${pal.accent}88` }}>
                      {c.word}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Vertical name carousel */}
        <div className="w-20 md:w-28 flex flex-col items-center justify-center gap-1 pr-4 md:pr-8">
          {items.map((item, i) => {
            const isActive = i === active;
            const itemPal = PALETTES[(GALLERY_PALETTES[item.name] || "warm-gold") as ColourPalette];

            return (
              <button
                key={item.name}
                onClick={() => setActive(i)}
                className="relative w-full group transition-all duration-300"
              >
                <motion.div
                  className="relative overflow-hidden rounded-lg"
                  animate={{
                    height: isActive ? 80 : 48,
                    opacity: isActive ? 1 : 0.4,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  whileHover={{ opacity: 0.8 }}
                >
                  {NAME_ART[item.name] && (
                    <Image
                      src={NAME_ART[item.name]}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span
                      className="text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase text-white"
                      style={isActive ? { color: itemPal.accent } : undefined}
                    >
                      {item.name}
                    </span>
                  </div>
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-lg pointer-events-none"
                      layoutId="gallery-active-border"
                      style={{ border: `2px solid ${itemPal.accent}` }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-8 md:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="transition-all duration-300"
              style={{
                width: i === active ? 24 : 8,
                height: 3,
                borderRadius: 2,
                backgroundColor: i === active ? pal.accent : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
        <a
          href="/create"
          className="text-xs tracking-[0.15em] uppercase px-6 py-2.5 rounded-full transition-all hover:scale-105"
          style={{
            backgroundColor: `${pal.accent}20`,
            border: `1px solid ${pal.accent}40`,
            color: pal.accent,
          }}
        >
          Create Your Print
        </a>
      </div>
    </main>
  );
}
