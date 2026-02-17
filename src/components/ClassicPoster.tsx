"use client";

import Image from "next/image";
import type { NameAnalysis, ColourPalette } from "../types/name";
import { PALETTES } from "../types/name";

interface ClassicPosterProps {
  analysis: NameAnalysis;
  palette: ColourPalette;
  artUrl?: string | null;
  generating?: boolean;
}

export default function ClassicPoster({ analysis, palette, artUrl, generating }: ClassicPosterProps) {
  const p = PALETTES[palette];

  return (
    <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#1A1612]" style={{ maxWidth: 512 }}>
      {/* Art background */}
      {generating && !artUrl && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
          <div className="w-12 h-12 border-2 rounded-full animate-spin" style={{ borderColor: p.accent, borderTopColor: "transparent" }} />
          <p className="text-sm" style={{ color: `${p.text}99` }}>Generating artwork...</p>
        </div>
      )}
      {artUrl && (
        <Image
          src={artUrl}
          alt={`${analysis.name} artwork`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 512px"
          unoptimized
        />
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/50" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-7 md:p-9">
        {/* Top: Name */}
        <div>
          <h2
            className="font-bold tracking-[0.12em] uppercase leading-none"
            style={{ color: p.accent, fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 8vw, 64px)" }}
          >
            {analysis.name}
          </h2>
          <p className="font-mono mt-2" style={{ color: `${p.accent}CC`, fontSize: "clamp(14px, 2vw, 18px)" }}>
            {analysis.phonetics.ipa}
          </p>
          <p className="mt-1" style={{ color: `${p.text}55`, fontSize: "10px" }}>
            {analysis.phonetics.stressPattern} {analysis.phonetics.stressType && `(${analysis.phonetics.stressType})`}
          </p>
        </div>

        {/* Bottom: Linguistic data */}
        <div className="space-y-4">
          {/* Etymology */}
          <div>
            <p className="tracking-[0.25em] uppercase mb-1" style={{ color: p.accent, fontSize: "9px" }}>
              Etymology
            </p>
            <p className="leading-relaxed" style={{ color: `${p.text}BB`, fontSize: "12px" }}>
              From {analysis.etymology.originLanguage},{" "}
              <span className="font-mono" style={{ color: p.accent }}>
                {analysis.etymology.rootWord}
              </span>
              , meaning &ldquo;{analysis.etymology.meaning}&rdquo;
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {analysis.etymology.languageFamilyTree.map((lang, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-full"
                  style={{ border: `1px solid ${p.accent}44`, color: `${p.accent}CC`, fontSize: "8px" }}
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Morphemes */}
          <div>
            <p className="tracking-[0.25em] uppercase mb-1" style={{ color: p.accent, fontSize: "9px" }}>
              Morphology
            </p>
            <div className="flex gap-2">
              {analysis.morphology.morphemes.map((m, i) => (
                <div
                  key={i}
                  className="px-3 py-1.5 rounded backdrop-blur-sm text-center"
                  style={{ backgroundColor: `${p.accent}15`, border: `1px solid ${p.accent}22` }}
                >
                  <span className="block font-mono" style={{ color: p.accent, fontSize: "14px" }}>{m.part}</span>
                  <span className="block uppercase tracking-wider" style={{ color: `${p.text}55`, fontSize: "7px" }}>{m.type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cognates */}
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {analysis.crossLinguistic.cognates.slice(0, 5).map((c, i) => (
              <span key={i} style={{ color: `${p.text}55`, fontSize: "9px" }}>
                <span className="uppercase tracking-wider">{c.language}</span>{" "}
                <span className="font-mono" style={{ color: `${p.accent}88` }}>{c.word}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
