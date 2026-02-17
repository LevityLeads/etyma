"use client";

import type { NameAnalysis, ColourPalette } from "../types/name";
import { PALETTES } from "../types/name";

interface PosterPreviewProps {
  analysis: NameAnalysis;
  palette: ColourPalette;
  compact?: boolean;
}

export default function PosterPreview({ analysis, palette, compact }: PosterPreviewProps) {
  const p = PALETTES[palette];
  const { etymology, phonetics, morphology } = analysis;

  if (compact) {
    return (
      <div
        className="aspect-[3/4] rounded-lg p-6 flex flex-col items-center justify-center gap-3"
        style={{ backgroundColor: p.bg, color: p.text }}
      >
        <span className="text-3xl font-bold tracking-widest uppercase" style={{ color: p.accent }}>
          {analysis.name}
        </span>
        <span className="text-[10px] tracking-[0.3em] uppercase opacity-50">Word Anatomy</span>
      </div>
    );
  }

  return (
    <div
      className="aspect-[3/4] rounded-lg overflow-hidden relative"
      style={{ backgroundColor: p.bg, color: p.text }}
    >
      <div className="absolute inset-0 p-8 flex flex-col">
        {/* Header */}
        <div className="text-center mb-6">
          <h2
            className="text-4xl md:text-5xl font-bold tracking-[0.15em] uppercase"
            style={{ color: p.accent }}
          >
            {analysis.name}
          </h2>
          <p className="text-[10px] tracking-[0.4em] uppercase mt-2 opacity-40">
            Word Anatomy by Etyma
          </p>
        </div>

        {/* Central art area placeholder */}
        <div
          className="mx-auto w-32 h-32 rounded-full mb-6 flex items-center justify-center"
          style={{
            background: `radial-gradient(circle, ${p.colors[0]}33, ${p.colors[1]}11)`,
            border: `1px solid ${p.accent}33`,
          }}
        >
          <span className="text-5xl font-light" style={{ color: p.accent }}>
            {analysis.name[0]}
          </span>
        </div>

        {/* Etymology */}
        <div className="mb-4">
          <h3
            className="text-[9px] tracking-[0.3em] uppercase mb-1.5 font-semibold"
            style={{ color: p.accent }}
          >
            Etymology
          </h3>
          <p className="text-[11px] leading-relaxed opacity-70">
            From {etymology.originLanguage}{" "}
            <span className="font-mono" style={{ color: p.accent }}>
              {etymology.rootWord}
            </span>
            , meaning &ldquo;{etymology.meaning}&rdquo;
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {etymology.languageFamilyTree.map((lang, i) => (
              <span
                key={i}
                className="text-[9px] px-2 py-0.5 rounded-full"
                style={{
                  border: `1px solid ${p.accent}44`,
                  color: p.accent,
                }}
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Phonetics */}
        <div className="mb-4">
          <h3
            className="text-[9px] tracking-[0.3em] uppercase mb-1.5 font-semibold"
            style={{ color: p.accent }}
          >
            Phonetics
          </h3>
          <p className="font-mono text-lg mb-1" style={{ color: p.accent }}>
            {phonetics.ipa}
          </p>
          <p className="text-[10px] opacity-60">{phonetics.stressPattern}</p>
        </div>

        {/* Morphology */}
        <div className="mb-4">
          <h3
            className="text-[9px] tracking-[0.3em] uppercase mb-1.5 font-semibold"
            style={{ color: p.accent }}
          >
            Morphology
          </h3>
          <div className="flex gap-2">
            {morphology.morphemes.map((m, i) => (
              <div
                key={i}
                className="text-center px-3 py-1.5 rounded"
                style={{ backgroundColor: `${p.accent}15`, border: `1px solid ${p.accent}22` }}
              >
                <span className="block font-mono text-sm" style={{ color: p.accent }}>
                  {m.part}
                </span>
                <span className="block text-[8px] uppercase tracking-wider opacity-50">
                  {m.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cognates */}
        <div className="mt-auto">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {analysis.crossLinguistic.cognates.slice(0, 5).map((c, i) => (
              <span key={i} className="text-[9px] opacity-50">
                <span className="uppercase tracking-wider">{c.language}</span>{" "}
                <span className="font-mono" style={{ color: p.accent }}>
                  {c.word}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
