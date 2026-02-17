"use client";

import { useState, useEffect, useCallback } from "react";
import type { NameAnalysis, ColourPalette, ImageryStyle } from "../../types/name";
import { PALETTES, IMAGERY_STYLES } from "../../types/name";
import EditorialPoster from "../../components/EditorialPoster";
import ClassicPoster from "../../components/ClassicPoster";

type Step = "name" | "analyzing" | "etymology" | "phonetics" | "morphology" | "palette" | "imagery" | "preview";
type PosterLayout = "detailed" | "classic";

const STEP_ORDER: Step[] = ["name", "analyzing", "etymology", "phonetics", "morphology", "palette", "imagery", "preview"];

export default function CreatePage() {
  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");
  const [analysis, setAnalysis] = useState<NameAnalysis | null>(null);
  const [palette, setPalette] = useState<ColourPalette>("warm-gold");
  const [imagery, setImagery] = useState<ImageryStyle>("abstract");
  const [error, setError] = useState("");
  const [artTaskId, setArtTaskId] = useState<string | null>(null);
  const [artUrl, setArtUrl] = useState<string | null>(null);
  const [posterLayout, setPosterLayout] = useState<PosterLayout>("detailed");
  const [artGenerating, setArtGenerating] = useState(false);

  const stepIndex = STEP_ORDER.indexOf(step);

  // Start art generation when entering preview step
  const generateArt = useCallback(async () => {
    if (!analysis) return;
    setArtGenerating(true);
    setArtUrl(null);
    setArtTaskId(null);
    try {
      const res = await fetch("/api/generate-art", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: analysis.name,
          meaning: analysis.etymology.meaning,
          palette,
          imagery,
        }),
      });
      const data = await res.json();
      if (data.taskId) setArtTaskId(data.taskId);
    } catch {
      setArtGenerating(false);
    }
  }, [analysis, palette, imagery]);

  // Poll for art completion
  useEffect(() => {
    if (!artTaskId || artUrl) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/art-status?taskId=${artTaskId}`);
        const data = await res.json();
        if (data.status === "complete" && data.imageUrl) {
          setArtUrl(data.imageUrl);
          setArtGenerating(false);
          clearInterval(interval);
        } else if (data.status === "failed") {
          setArtGenerating(false);
          clearInterval(interval);
        }
      } catch { /* keep polling */ }
    }, 3000);
    return () => clearInterval(interval);
  }, [artTaskId, artUrl]);

  const goNext = () => {
    const next = STEP_ORDER[stepIndex + 1];
    if (next) setStep(next);
  };

  const goBack = () => {
    let prev = STEP_ORDER[stepIndex - 1];
    if (prev === "analyzing") prev = "name";
    if (prev) setStep(prev);
  };

  const handleAnalyze = async () => {
    if (!name.trim()) return;
    setStep("analyzing");
    setError("");
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      if (!res.ok) throw new Error("Analysis failed");
      const data = await res.json();
      setAnalysis(data);
      setStep("etymology");
    } catch (err) {
      console.error("Analysis error:", err);
      setError("Something went wrong analysing that name. Please try again.");
      setStep("name");
    }
  };

  return (
    <main className="min-h-screen bg-[#FDF6EC]">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#FDF6EC]/80 border-b border-[#E8B94A]/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold tracking-tight">
            <span className="gradient-amber">Etyma</span>
          </a>
          <div className="flex items-center gap-3 text-sm text-[#8A8078]">
            {STEP_ORDER.filter((s) => s !== "analyzing").map((s) => (
              <div
                key={s}
                className={`w-2 h-2 rounded-full transition-colors ${
                  STEP_ORDER.indexOf(s) <= stepIndex ? "bg-[#D4930D]" : "bg-[#E8B94A]/30"
                }`}
              />
            ))}
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6 max-w-4xl mx-auto">
        {/* Step: Name Input */}
        {step === "name" && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
            <div className="space-y-3">
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#D4930D]">
                Step One
              </p>
              <h1 className="text-4xl md:text-5xl font-bold">What name shall we explore?</h1>
              <p className="text-[#8A8078] text-lg">
                Enter any name. We&apos;ll trace its roots across thousands of years.
              </p>
            </div>
            <div className="w-full max-w-md space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                placeholder="Enter a name..."
                autoFocus
                className="w-full text-center text-3xl font-light py-4 bg-transparent border-b-2 border-[#E8B94A]/30 focus:border-[#D4930D] outline-none transition-colors placeholder:text-[#C4BAB0]"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                onClick={handleAnalyze}
                disabled={!name.trim()}
                className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Analyze This Name
              </button>
            </div>
          </div>
        )}

        {/* Step: Analyzing */}
        {step === "analyzing" && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <div className="w-16 h-16 border-2 border-[#D4930D] border-t-transparent rounded-full animate-spin" />
            <div>
              <h2 className="text-2xl font-bold">Analyzing &ldquo;{name}&rdquo;</h2>
              <p className="text-[#8A8078] mt-2">Tracing etymology, phonetics, and morphology...</p>
            </div>
          </div>
        )}

        {/* Step: Etymology */}
        {step === "etymology" && analysis && (
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#D4930D]">Layer One</p>
              <h1 className="text-4xl font-bold">Etymology</h1>
              <p className="text-[#8A8078]">Where &ldquo;{analysis.name}&rdquo; comes from</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 rounded-xl bg-[#1A1612] text-[#FDF6EC]">
                <h3 className="text-sm tracking-[0.2em] uppercase text-[#E8B94A] mb-3">Origin</h3>
                <p className="text-3xl font-mono text-[#D4930D] mb-2">{analysis.etymology.rootWord}</p>
                <p className="text-[#C4BAB0]">
                  From {analysis.etymology.originLanguage}, meaning &ldquo;{analysis.etymology.meaning}&rdquo;
                </p>
              </div>
              <div className="p-8 rounded-xl bg-[#1A1612] text-[#FDF6EC]">
                <h3 className="text-sm tracking-[0.2em] uppercase text-[#E8B94A] mb-3">Language Family</h3>
                <div className="space-y-2">
                  {analysis.etymology.languageFamilyTree.map((lang, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="w-2 h-2 rounded-full bg-[#D4930D]"
                        style={{ opacity: 1 - i * 0.15 }}
                      />
                      <span className="font-mono text-sm text-[#E8B94A]">{lang}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2 p-8 rounded-xl bg-white border border-[#E8B94A]/20">
                <h3 className="text-sm tracking-[0.2em] uppercase text-[#D4930D] mb-3">Cultural Significance</h3>
                <p className="text-[#8A8078] leading-relaxed">{analysis.etymology.culturalSignificance}</p>
              </div>
              <div className="md:col-span-2 p-8 rounded-xl bg-white border border-[#E8B94A]/20">
                <h3 className="text-sm tracking-[0.2em] uppercase text-[#D4930D] mb-3">Historical Notes</h3>
                <p className="text-[#8A8078] leading-relaxed">{analysis.etymology.historicalNotes}</p>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={goBack} className="btn-secondary">Back</button>
              <button onClick={goNext} className="btn-primary">Continue to Phonetics</button>
            </div>
          </div>
        )}

        {/* Step: Phonetics */}
        {step === "phonetics" && analysis && (
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#D4930D]">Layer Two</p>
              <h1 className="text-4xl font-bold">Phonetics</h1>
              <p className="text-[#8A8078]">How &ldquo;{analysis.name}&rdquo; sounds</p>
            </div>

            <div className="text-center py-8">
              <p className="font-mono text-5xl text-[#D4930D]">{analysis.phonetics.ipa}</p>
              <p className="text-[#8A8078] mt-3">{analysis.phonetics.stressPattern}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {analysis.phonetics.sounds.map((s, i) => (
                <div key={i} className="p-6 rounded-xl bg-[#1A1612] text-[#FDF6EC]">
                  <span className="font-mono text-2xl text-[#E8B94A]">{s.symbol}</span>
                  <p className="text-sm text-[#C4BAB0] mt-2">{s.description}</p>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-xl bg-white border border-[#E8B94A]/20">
              <h3 className="text-sm tracking-[0.2em] uppercase text-[#D4930D] mb-3">Sound Feel</h3>
              <p className="text-[#8A8078] leading-relaxed">{analysis.phonetics.phonosemantic}</p>
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={goBack} className="btn-secondary">Back</button>
              <button onClick={goNext} className="btn-primary">Continue to Morphology</button>
            </div>
          </div>
        )}

        {/* Step: Morphology */}
        {step === "morphology" && analysis && (
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#D4930D]">Layer Three</p>
              <h1 className="text-4xl font-bold">Morphology</h1>
              <p className="text-[#8A8078]">The structure of &ldquo;{analysis.name}&rdquo;</p>
            </div>

            <div className="flex justify-center gap-4 py-8">
              {analysis.morphology.morphemes.map((m, i) => (
                <div
                  key={i}
                  className="text-center px-8 py-6 rounded-xl bg-[#1A1612] text-[#FDF6EC]"
                >
                  <span className="block font-mono text-3xl text-[#E8B94A]">{m.part}</span>
                  <span className="block text-xs uppercase tracking-[0.2em] text-[#C4BAB0] mt-2">
                    {m.type}
                  </span>
                  <span className="block text-sm text-[#8A8078] mt-1">&ldquo;{m.meaning}&rdquo;</span>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 rounded-xl bg-white border border-[#E8B94A]/20">
                <h3 className="text-sm tracking-[0.2em] uppercase text-[#D4930D] mb-3">Word Class</h3>
                <p className="text-[#8A8078] leading-relaxed">
                  Originally a {analysis.morphology.wordClass}. {analysis.morphology.grammaticalJourney}
                </p>
              </div>
              <div className="p-8 rounded-xl bg-white border border-[#E8B94A]/20">
                <h3 className="text-sm tracking-[0.2em] uppercase text-[#D4930D] mb-3">Related Forms</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.morphology.relatedForms.map((form, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-full border border-[#D4930D]/30 text-sm text-[#8A8078]"
                    >
                      {form}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={goBack} className="btn-secondary">Back</button>
              <button onClick={goNext} className="btn-primary">Choose Your Style</button>
            </div>
          </div>
        )}

        {/* Step: Palette */}
        {step === "palette" && (
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#D4930D]">Design</p>
              <h1 className="text-4xl font-bold">Choose a colour palette</h1>
              <p className="text-[#8A8078]">This sets the mood for your print</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {(Object.entries(PALETTES) as [ColourPalette, typeof PALETTES[ColourPalette]][]).map(
                ([key, val]) => (
                  <button
                    key={key}
                    onClick={() => setPalette(key)}
                    className={`p-6 rounded-xl text-left transition-all ${
                      palette === key
                        ? "ring-2 ring-[#D4930D] scale-[1.02]"
                        : "hover:scale-[1.01]"
                    }`}
                    style={{ backgroundColor: val.bg, color: val.text }}
                  >
                    <div className="flex gap-1.5 mb-3">
                      {val.colors.slice(0, 4).map((c, i) => (
                        <div
                          key={i}
                          className="w-5 h-5 rounded-full"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-sm">{val.name}</span>
                  </button>
                )
              )}
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={goBack} className="btn-secondary">Back</button>
              <button onClick={goNext} className="btn-primary">Choose Imagery</button>
            </div>
          </div>
        )}

        {/* Step: Imagery */}
        {step === "imagery" && (
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#D4930D]">Design</p>
              <h1 className="text-4xl font-bold">Choose an imagery style</h1>
              <p className="text-[#8A8078]">This shapes the central artwork of your print</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {(Object.entries(IMAGERY_STYLES) as [ImageryStyle, typeof IMAGERY_STYLES[ImageryStyle]][]).map(
                ([key, val]) => (
                  <button
                    key={key}
                    onClick={() => setImagery(key)}
                    className={`p-8 rounded-xl bg-[#1A1612] text-[#FDF6EC] text-left transition-all ${
                      imagery === key
                        ? "ring-2 ring-[#D4930D] scale-[1.02]"
                        : "hover:scale-[1.01]"
                    }`}
                  >
                    <h3 className="font-semibold text-lg mb-1">{val.name}</h3>
                    <p className="text-sm text-[#C4BAB0]">{val.description}</p>
                  </button>
                )
              )}
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={goBack} className="btn-secondary">Back</button>
              <button onClick={() => { generateArt(); goNext(); }} className="btn-primary">Generate Your Print</button>
            </div>
          </div>
        )}

        {/* Step: Preview */}
        {step === "preview" && analysis && (
          <div className="space-y-8">
            {/* Layout toggle */}
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setPosterLayout("detailed")}
                className={`px-4 py-2 rounded-full text-sm transition-all ${posterLayout === "detailed" ? "bg-[#D4930D] text-[#1A1612] font-semibold" : "bg-[#2A2520] text-[#C4BAB0] hover:bg-[#3A3530]"}`}
              >
                Detailed
              </button>
              <button
                onClick={() => setPosterLayout("classic")}
                className={`px-4 py-2 rounded-full text-sm transition-all ${posterLayout === "classic" ? "bg-[#D4930D] text-[#1A1612] font-semibold" : "bg-[#2A2520] text-[#C4BAB0] hover:bg-[#3A3530]"}`}
              >
                Classic
              </button>
            </div>

            {/* Poster */}
            {posterLayout === "detailed" ? (
              <div className="max-w-3xl mx-auto poster-shadow rounded-lg overflow-hidden">
                <EditorialPoster
                  analysis={analysis}
                  palette={palette}
                  artUrl={artUrl}
                  generating={artGenerating}
                />
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="poster-shadow rounded-lg overflow-hidden">
                  <ClassicPoster
                    analysis={analysis}
                    palette={palette}
                    artUrl={artUrl}
                    generating={artGenerating}
                  />
                </div>
              </div>
            )}

            <div className="max-w-lg mx-auto space-y-4">
              {/* Regenerate */}
              {artUrl && (
                <button
                  onClick={() => { setArtUrl(null); generateArt(); }}
                  className="btn-secondary w-full flex items-center justify-center gap-2"
                >
                  🎨 Regenerate Artwork (free)
                </button>
              )}

              <div className="flex gap-4">
                <button className="btn-primary flex-1">
                  Buy Digital Print — £25
                </button>
              </div>
              <button className="btn-secondary w-full">
                Buy Framed Print — £45
              </button>
              <p className="text-center text-xs text-[#C4BAB0]">
                Coming soon. Join the waitlist to be notified at launch.
              </p>
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={goBack} className="btn-secondary">Back</button>
              <button onClick={() => { setStep("name"); setAnalysis(null); setName(""); setArtUrl(null); setArtTaskId(null); }} className="btn-secondary">
                Try Another Name
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
