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

  const { etymology, phonetics, morphology, phonaesthesia, semanticWeb, emotionalRegister, summaryQuote } = analysis;

  return (
    <div
      className="relative w-full mx-auto overflow-hidden"
      style={{
        backgroundColor: bg,
        color: text,
        maxWidth: 900,
        aspectRatio: "2/3",
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      }}
    >
      <div className="h-full flex flex-col" style={{ padding: "clamp(24px, 4vw, 60px)" }}>
        {/* ── HERO ── */}
        <div className="text-center relative" style={{ marginBottom: "clamp(16px, 3vw, 40px)" }}>
          {/* Art watermark behind name */}
          {artUrl && (
            <div
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ top: "12%", width: "70%", maxWidth: 400, opacity: 0.18 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={artUrl} alt="" className="w-full h-auto object-contain" style={{ mixBlendMode: isLight ? "multiply" : "screen" }} />
            </div>
          )}
          <h1
            className="relative"
            style={{
              fontFamily: "'Playfair Display', 'Georgia', serif",
              fontWeight: 900,
              fontSize: "clamp(48px, 10vw, 120px)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              lineHeight: 1.1,
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
            }}
          >
            {phonetics.ipa}
          </p>
          {etymology.meaning && (
            <p
              className="relative"
              style={{
                fontSize: "clamp(10px, 1.4vw, 15px)",
                marginTop: "clamp(4px, 0.6vw, 8px)",
                fontStyle: "italic",
                color: accent,
                letterSpacing: "0.05em",
              }}
            >
              &ldquo;{etymology.meaning}&rdquo;
            </p>
          )}
        </div>

        {/* Divider */}
        <div style={{ borderTop: `1px solid ${divider}`, marginBottom: "clamp(12px, 2vw, 30px)" }} />

        {/* ── TWO COLUMN BODY ── */}
        <div className="grid grid-cols-2 flex-1" style={{ gap: "clamp(16px, 3vw, 40px)" }}>
          {/* LEFT COLUMN */}
          <div className="flex flex-col" style={{ gap: "clamp(12px, 2vw, 28px)" }}>
            {/* Phonetic Anatomy */}
            <div>
              <h3 style={{ color: accent, fontWeight: 700, fontStyle: "italic", fontSize: "clamp(9px, 1.2vw, 13px)", letterSpacing: "0.08em", marginBottom: "clamp(6px, 1vw, 14px)" }}>
                Phonetic Anatomy
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(8px, 1.2vw, 18px)" }}>
                {phonetics.sounds.map((s, i) => (
                  <div key={i} className="flex items-start" style={{ gap: "clamp(6px, 1vw, 12px)" }}>
                    <span style={{ fontFamily: "serif", fontSize: "clamp(20px, 3vw, 36px)", lineHeight: 1, flexShrink: 0, minWidth: "2em" }}>
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
          <div className="flex flex-col" style={{ gap: "clamp(12px, 2vw, 28px)" }}>
            {/* Morphology */}
            <div>
              <h3 style={{ color: accent, fontWeight: 700, fontStyle: "italic", fontSize: "clamp(9px, 1.2vw, 13px)", letterSpacing: "0.08em", marginBottom: "clamp(6px, 1vw, 14px)" }}>
                Morphology
              </h3>
              <div className="flex items-baseline" style={{ gap: "clamp(4px, 0.6vw, 8px)", marginBottom: "clamp(6px, 1vw, 12px)" }}>
                {morphology.morphemes.map((m, i) => (
                  <span key={i}>
                    {i > 0 && <span style={{ color: accent, fontWeight: 700, fontSize: "clamp(20px, 3.5vw, 50px)", fontFamily: "serif" }}>+</span>}
                    <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(20px, 3.5vw, 50px)", textTransform: "uppercase" }}>
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

            {/* Semantic Web - moved to full-width section below */}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: `1px solid ${divider}`, margin: "clamp(12px, 2vw, 30px) 0" }} />

        {/* ── SEMANTIC WEB (full width) ── */}
        {semanticWeb && (semanticWeb.associations || []).length > 0 && (
          <div>
            <h3 className="text-center" style={{ color: accent, fontWeight: 700, fontStyle: "italic", fontSize: "clamp(9px, 1.2vw, 13px)", letterSpacing: "0.08em", marginBottom: "clamp(8px, 1.4vw, 18px)" }}>
              Semantic Web
            </h3>
            <svg viewBox="0 0 400 200" className="w-full" style={{ maxHeight: "clamp(100px, 18vw, 200px)" }}>
              {/* Connecting lines from centre to each node */}
              {(semanticWeb.associations || []).slice(0, 6).map((_, i) => {
                const cx = 200, cy = 100;
                const nodePositions = [
                  { x: 70, y: 40 },
                  { x: 330, y: 40 },
                  { x: 40, y: 110 },
                  { x: 360, y: 110 },
                  { x: 120, y: 175 },
                  { x: 280, y: 175 },
                ];
                const pos = nodePositions[i];
                if (!pos) return null;
                return (
                  <line key={`line-${i}`} x1={cx} y1={cy} x2={pos.x} y2={pos.y} stroke={accent} strokeOpacity={0.2} strokeWidth={0.8} />
                );
              })}
              {/* Secondary lines between adjacent nodes */}
              {[
                [0, 2], [1, 3], [2, 4], [3, 5], [4, 5], [0, 1],
              ].map(([a, b], i) => {
                const nodePositions = [
                  { x: 70, y: 40 }, { x: 330, y: 40 },
                  { x: 40, y: 110 }, { x: 360, y: 110 },
                  { x: 120, y: 175 }, { x: 280, y: 175 },
                ];
                const pa = nodePositions[a];
                const pb = nodePositions[b];
                if (!pa || !pb || a >= (semanticWeb.associations || []).length || b >= (semanticWeb.associations || []).length) return null;
                return (
                  <line key={`sub-${i}`} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} stroke={accent} strokeOpacity={0.08} strokeWidth={0.5} strokeDasharray="3,3" />
                );
              })}
              {/* Centre node */}
              <circle cx={200} cy={100} r={28} fill={accent} fillOpacity={0.1} stroke={accent} strokeOpacity={0.3} strokeWidth={0.8} />
              <text x={200} y={104} textAnchor="middle" fill={text} fontSize={10} fontWeight={700} fontFamily="'Playfair Display', serif" letterSpacing="0.1em">
                {analysis.name.toUpperCase()}
              </text>
              {/* Association nodes */}
              {(semanticWeb.associations || []).slice(0, 6).map((word, i) => {
                const nodePositions = [
                  { x: 70, y: 40 }, { x: 330, y: 40 },
                  { x: 40, y: 110 }, { x: 360, y: 110 },
                  { x: 120, y: 175 }, { x: 280, y: 175 },
                ];
                const pos = nodePositions[i];
                if (!pos) return null;
                return (
                  <g key={`node-${i}`}>
                    <circle cx={pos.x} cy={pos.y} r={4} fill={accent} fillOpacity={0.3} />
                    <text x={pos.x} y={pos.y + 16} textAnchor="middle" fill={textMuted} fontSize={9} fontFamily="sans-serif">
                      {word}
                    </text>
                  </g>
                );
              })}
            </svg>
            {semanticWeb.coreValues && (
              <p className="text-center" style={{ fontSize: "clamp(7px, 0.8vw, 10px)", color: textFaint, marginTop: "clamp(4px, 0.6vw, 8px)" }}>
                {semanticWeb.coreValues}
              </p>
            )}
          </div>
        )}

        {/* Divider */}
        <div style={{ borderTop: `1px solid ${divider}`, margin: "clamp(12px, 2vw, 30px) 0" }} />

        {/* ── SOUND SYMBOLISM ── */}
        {phonaesthesia && phonaesthesia.length > 0 && (
          <div>
            <h3 className="text-center" style={{ color: accent, fontWeight: 700, fontStyle: "italic", fontSize: "clamp(9px, 1.2vw, 13px)", letterSpacing: "0.08em", marginBottom: "clamp(8px, 1.4vw, 18px)" }}>
              Sound Symbolism &middot; Phonaesthesia
            </h3>
            <div className="flex items-center justify-center" style={{ gap: "clamp(4px, 1vw, 16px)" }}>
              {phonaesthesia.map((ph, i) => (
                <div key={i} className="flex items-center" style={{ gap: "clamp(4px, 1vw, 16px)" }}>
                  <div className="text-center">
                    <span style={{ fontFamily: "serif", fontSize: "clamp(20px, 4vw, 50px)", display: "block" }}>{ph.symbol}</span>
                    <span style={{ fontSize: "clamp(6px, 0.8vw, 10px)", color: textMuted, display: "block" }}>{ph.line1}</span>
                    <span style={{ fontSize: "clamp(6px, 0.8vw, 10px)", color: textFaint, display: "block" }}>{ph.line2}</span>
                  </div>
                  {i < phonaesthesia.length - 1 && (
                    <span style={{ color: accent, fontSize: "clamp(10px, 1.4vw, 18px)" }}>→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div style={{ borderTop: `1px solid ${divider}`, margin: "clamp(12px, 2vw, 30px) 0" }} />

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
              fontSize: "clamp(12px, 1.8vw, 20px)",
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
