"use client";

import type { NameAnalysis, ColourPalette } from "../types/name";
import { PALETTES } from "../types/name";

interface EditorialPosterProps {
  analysis: NameAnalysis;
  palette: ColourPalette;
  artUrl?: string | null;
  generating?: boolean;
}

export default function EditorialPoster({ analysis, palette, artUrl }: EditorialPosterProps) {
  const p = PALETTES[palette];
  const isLight = ["warm-gold", "earth-tones", "botanical", "sunset", "copper"].includes(palette);

  // Adaptive colours
  const bg = isLight ? "#F5F0E8" : "#141210";
  const text = isLight ? "#1E1E1E" : p.text;
  const accent = p.accent;
  const textMuted = isLight ? "#6B6560" : `${p.text}99`;
  const textFaint = isLight ? "#908880" : `${p.text}66`;
  const divider = isLight ? "#D5CFC5" : `${p.text}22`;

  const { etymology, phonetics, morphology, emotionalRegister, summaryQuote } = analysis;

  return (
    <div
      className="relative w-full mx-auto overflow-hidden"
      style={{
        backgroundColor: bg,
        color: text,
        maxWidth: 900,
        aspectRatio: "1/1.414",
        overflow: "hidden",
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        position: "relative" as const,
      }}
    >
      {/* Background art with gradient fade */}
      {artUrl && (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={artUrl} alt="" className="w-full h-full object-cover" style={{ mixBlendMode: isLight ? "multiply" : "screen" }} />
          {/* Gradient mask: art visible at top, fades through middle, very subtle at bottom */}
          <div
            className="absolute inset-0"
            style={{
              background: isLight
                ? `linear-gradient(to bottom, ${bg}00 0%, ${bg}40 25%, ${bg}B0 45%, ${bg}E8 60%, ${bg}F5 100%)`
                : `linear-gradient(to bottom, ${bg}00 0%, ${bg}50 25%, ${bg}B8 45%, ${bg}E0 60%, ${bg}F0 100%)`,
            }}
          />
        </div>
      )}
      <div className="h-full flex flex-col relative" style={{ padding: "clamp(20px, 3.5vw, 50px)", zIndex: 1 }}>
        {/* ── HERO ── */}
        <div className="text-center relative" style={{ marginBottom: "clamp(10px, 2vw, 28px)" }}>
          <h1
            className="relative"
            style={{
              fontFamily: "'Playfair Display', 'Georgia', serif",
              fontWeight: 900,
              fontSize: "clamp(36px, 7vw, 80px)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              lineHeight: 1.1,
              textShadow: isLight ? "none" : `0 2px 12px ${bg}, 0 0px 40px ${bg}`,
            }}
          >
            {analysis.name}
          </h1>
          <p
            className="relative"
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "clamp(12px, 1.8vw, 18px)",
              marginTop: "clamp(4px, 0.8vw, 12px)",
              letterSpacing: "0.1em",
              color: textMuted,
              textShadow: isLight ? "none" : `0 1px 8px ${bg}, 0 0px 24px ${bg}`,
            }}
          >
            {phonetics.ipa}
          </p>
          {etymology.meaning && (
            <p
              className="relative"
              style={{
                fontSize: "clamp(12px, 1.8vw, 20px)",
                marginTop: "clamp(6px, 1vw, 14px)",
                fontStyle: "italic",
                color: accent,
                letterSpacing: "0.05em",
                textShadow: isLight ? "none" : `0 1px 8px ${bg}, 0 0px 20px ${bg}`,
              }}
            >
              &ldquo;{etymology.meaning}&rdquo;
            </p>
          )}
        </div>

        {/* Divider */}
        <div style={{ borderTop: `1px solid ${divider}`, marginBottom: "clamp(12px, 2vw, 30px)" }} />

        {/* ── TWO COLUMN BODY ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 flex-1" style={{ gap: "clamp(12px, 2vw, 28px)" }}>
          {/* LEFT COLUMN */}
          <div className="flex flex-col" style={{ gap: "clamp(8px, 1.2vw, 16px)" }}>
            {/* Phonetic Anatomy */}
            <div>
              <h3 style={{ color: accent, fontWeight: 700, fontStyle: "italic", fontSize: "clamp(9px, 1.2vw, 13px)", letterSpacing: "0.08em", marginBottom: "clamp(6px, 1vw, 14px)" }}>
                Phonetic Anatomy
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(6px, 0.8vw, 12px)" }}>
                {phonetics.sounds.slice(0, 5).map((s, i) => (
                  <div key={i} className="flex items-start" style={{ gap: "clamp(6px, 1vw, 12px)" }}>
                    <span style={{ fontFamily: "serif", fontSize: "clamp(16px, 2.2vw, 28px)", lineHeight: 1, flexShrink: 0, minWidth: "2em" }}>
                      {s.symbol}
                    </span>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: "clamp(8px, 1vw, 12px)" }}>{s.type}</p>
                      <p style={{ fontSize: "clamp(7px, 0.9vw, 11px)", color: textMuted, lineHeight: 1.4 }}>{s.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stress Pattern */}
            <div>
              <h3 style={{ color: accent, fontWeight: 700, fontStyle: "italic", fontSize: "clamp(9px, 1.2vw, 13px)", letterSpacing: "0.08em", marginBottom: "clamp(4px, 0.8vw, 10px)" }}>
                Stress Pattern
              </h3>
              <div className="flex items-center" style={{ gap: "clamp(4px, 0.6vw, 8px)", marginBottom: "clamp(4px, 0.6vw, 8px)" }}>
                {phonetics.stressPattern.split("-").map((part, i) => (
                  <div
                    key={i}
                    style={{
                      width: "clamp(10px, 1.4vw, 16px)",
                      height: "clamp(10px, 1.4vw, 16px)",
                      borderRadius: "50%",
                      backgroundColor: part === "STRONG" || part === "DA" ? text : "transparent",
                      border: `1.5px solid ${text}`,
                    }}
                  />
                ))}
                <span style={{ fontWeight: 600, fontSize: "clamp(9px, 1.1vw, 13px)", marginLeft: "clamp(4px, 0.6vw, 8px)" }}>
                  {phonetics.stressType}
                </span>
              </div>
              <p style={{ fontSize: "clamp(7px, 0.9vw, 11px)", color: textMuted, lineHeight: 1.5 }}>
                {phonetics.stressDescription}
              </p>
            </div>

            {/* Mouth Journey */}
            <div>
              <h3 style={{ color: accent, fontWeight: 700, fontStyle: "italic", fontSize: "clamp(9px, 1.2vw, 13px)", letterSpacing: "0.08em", marginBottom: "clamp(4px, 0.8vw, 10px)" }}>
                Mouth Journey
              </h3>
              <p style={{ fontSize: "clamp(8px, 1vw, 12px)", color: textMuted }}>
                {phonetics.mouthJourney}
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col" style={{ gap: "clamp(8px, 1.2vw, 16px)" }}>
            {/* Morphology */}
            <div>
              <h3 style={{ color: accent, fontWeight: 700, fontStyle: "italic", fontSize: "clamp(9px, 1.2vw, 13px)", letterSpacing: "0.08em", marginBottom: "clamp(6px, 1vw, 14px)" }}>
                Morphology
              </h3>
              <div className="flex items-baseline" style={{ gap: "clamp(4px, 0.6vw, 8px)", marginBottom: "clamp(6px, 1vw, 12px)" }}>
                {morphology.morphemes.map((m, i) => (
                  <span key={i}>
                    {i > 0 && <span style={{ color: accent, fontWeight: 700, fontSize: "clamp(16px, 2.5vw, 36px)", fontFamily: "serif" }}>+</span>}
                    <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(16px, 2.5vw, 36px)", textTransform: "uppercase" }}>
                      {i > 0 ? "-" : ""}{m.part}
                    </span>
                  </span>
                ))}
              </div>
              <div className="flex" style={{ gap: "clamp(16px, 3vw, 40px)", marginBottom: "clamp(6px, 1vw, 10px)" }}>
                {morphology.morphemes.map((m, i) => (
                  <span key={i} style={{ fontSize: "clamp(7px, 0.8vw, 10px)", color: textFaint }}>{m.type}: {m.meaning}</span>
                ))}
              </div>
              <p style={{ fontSize: "clamp(7px, 0.9vw, 11px)", color: textMuted, lineHeight: 1.5 }}>
                {morphology.grammaticalJourney}
              </p>
            </div>

            {/* Etymology */}
            <div>
              <h3 style={{ color: accent, fontWeight: 700, fontStyle: "italic", fontSize: "clamp(9px, 1.2vw, 13px)", letterSpacing: "0.08em", marginBottom: "clamp(6px, 1vw, 14px)" }}>
                Etymology
              </h3>
              <p style={{ fontFamily: "monospace", fontSize: "clamp(8px, 1.1vw, 13px)" }}>
                {etymology.originLanguage} {etymology.rootWord}
              </p>
              <p style={{ fontSize: "clamp(7px, 0.9vw, 11px)", color: textMuted, fontStyle: "italic" }}>
                &ldquo;{etymology.rootMeaning || etymology.meaning}&rdquo; &middot; {etymology.age || "ancient"}
              </p>
              <div style={{ marginTop: "clamp(6px, 1vw, 12px)", paddingLeft: "clamp(8px, 1.2vw, 20px)" }}>
                {etymology.languageFamilyTree.map((lang, i) => {
                  const isLast = i === etymology.languageFamilyTree.length - 1;
                  return (
                    <div key={i} style={{ fontSize: "clamp(7px, 0.9vw, 11px)", color: textMuted, lineHeight: 2 }}>
                      <span style={{ marginRight: 8, fontSize: "0.7em" }}>↓</span>
                      <span style={isLast ? { fontWeight: 700, color: text } : undefined}>{lang}</span>
                    </div>
                  );
                })}
              </div>
              <p style={{ fontSize: "clamp(7px, 0.9vw, 11px)", color: textMuted, lineHeight: 1.5, marginTop: "clamp(6px, 1vw, 12px)" }}>
                {etymology.historicalNotes}
              </p>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: `1px solid ${divider}`, margin: "clamp(8px, 1.2vw, 16px) 0" }} />
        {/* ── EMOTIONAL REGISTER ── */}
        {emotionalRegister && (
          <div>
            <h3 className="text-center" style={{ color: accent, fontWeight: 700, fontStyle: "italic", fontSize: "clamp(9px, 1.2vw, 13px)", letterSpacing: "0.08em", marginBottom: "clamp(6px, 1vw, 14px)" }}>
              Emotional Register
            </h3>
            <div className="grid grid-cols-3 text-center" style={{ gap: "clamp(8px, 1.4vw, 20px)" }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: "clamp(8px, 1vw, 13px)", marginBottom: 4 }}>Weather</p>
                <p style={{ fontSize: "clamp(7px, 0.9vw, 11px)", color: textMuted }}>{emotionalRegister.weather}</p>
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: "clamp(8px, 1vw, 13px)", marginBottom: 4 }}>Personality</p>
                <p style={{ fontSize: "clamp(7px, 0.9vw, 11px)", color: textMuted }}>{emotionalRegister.personality}</p>
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: "clamp(8px, 1vw, 13px)", marginBottom: 4 }}>Name</p>
                <p style={{ fontSize: "clamp(7px, 0.9vw, 11px)", color: textMuted }}>{emotionalRegister.asName}</p>
              </div>
            </div>
          </div>
        )}

        {/* Divider */}
        <div style={{ borderTop: `1px solid ${divider}`, margin: "clamp(12px, 2vw, 24px) 0" }} />

        {/* ── QUOTE ── */}
        {summaryQuote && (
          <p
            className="text-center"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontStyle: "italic",
              fontSize: "clamp(10px, 1.4vw, 16px)",
              lineHeight: 1.5,
              color: text,
            }}
          >
            &ldquo;{summaryQuote}&rdquo;
          </p>
        )}

        {/* Footer */}
        <p
          className="text-center mt-auto"
          style={{
            fontSize: "clamp(6px, 0.7vw, 9px)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: textFaint,
            paddingTop: "clamp(8px, 1.4vw, 20px)",
          }}
        >
          Word Anatomy
        </p>
      </div>
    </div>
  );
}
