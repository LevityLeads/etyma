import { NextRequest, NextResponse } from "next/server";
import React from "react";
import { renderToBuffer, Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import type { NameAnalysis, ColourPalette } from "../../../types/name";
import { PALETTES } from "../../../types/name";

// A1 at 300dpi = 7016 x 9933px, but PDF uses points (72dpi)
// A1 = 594mm x 841mm = 1684pt x 2384pt
// We'll use A2 (420x594mm = 1191pt x 1684pt) as a practical default
const PAGE_WIDTH = 1191;
const PAGE_HEIGHT = 1684;

const styles = StyleSheet.create({
  page: {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    padding: 80,
    flexDirection: "column",
  },
  header: {
    marginBottom: 40,
  },
  name: {
    fontSize: 120,
    fontWeight: "bold",
    letterSpacing: 12,
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 14,
    letterSpacing: 8,
    textTransform: "uppercase",
    opacity: 0.4,
    marginTop: 8,
  },
  artContainer: {
    width: "100%",
    height: 500,
    marginVertical: 40,
    borderRadius: 8,
    overflow: "hidden",
  },
  artImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  section: {
    marginBottom: 30,
    padding: 30,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 12,
    letterSpacing: 6,
    textTransform: "uppercase",
    marginBottom: 12,
    fontWeight: "bold",
  },
  ipa: {
    fontSize: 48,
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 1.6,
    opacity: 0.7,
  },
  morphemeRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  morphemeBox: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  morphemePart: {
    fontSize: 28,
  },
  morphemeType: {
    fontSize: 10,
    letterSpacing: 4,
    textTransform: "uppercase",
    opacity: 0.5,
    marginTop: 4,
  },
  langRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  langTag: {
    fontSize: 11,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  cognateRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
    marginTop: 16,
  },
  cognateItem: {
    alignItems: "flex-start",
  },
  cognateLang: {
    fontSize: 9,
    letterSpacing: 3,
    textTransform: "uppercase",
    opacity: 0.4,
  },
  cognateWord: {
    fontSize: 16,
    marginTop: 2,
  },
  footer: {
    marginTop: "auto",
    paddingTop: 20,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    opacity: 0.3,
  },
});

function createPosterDocument(
  analysis: NameAnalysis,
  palette: ColourPalette,
  artUrl?: string
) {
  const p = PALETTES[palette];

  return React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { size: [PAGE_WIDTH, PAGE_HEIGHT], style: [styles.page, { backgroundColor: p.bg }] },
      // Header
      React.createElement(
        View,
        { style: styles.header },
        React.createElement(Text, { style: [styles.name, { color: p.accent }] }, analysis.name),
        React.createElement(Text, { style: [styles.subtitle, { color: p.text }] }, "Word Anatomy by Etyma")
      ),
      // Art
      artUrl
        ? React.createElement(
            View,
            { style: styles.artContainer },
            React.createElement(Image, { style: styles.artImage, src: artUrl })
          )
        : null,
      // Etymology
      React.createElement(
        View,
        { style: [styles.section, { backgroundColor: `${p.accent}11` }] },
        React.createElement(Text, { style: [styles.sectionTitle, { color: p.accent }] }, "Etymology"),
        React.createElement(
          Text,
          { style: [styles.bodyText, { color: p.text }] },
          `From ${analysis.etymology.originLanguage}, "${analysis.etymology.rootWord}", meaning "${analysis.etymology.meaning}"`
        ),
        React.createElement(
          Text,
          { style: [styles.bodyText, { color: p.text, marginTop: 8 }] },
          analysis.etymology.culturalSignificance
        ),
        React.createElement(
          View,
          { style: [styles.langRow, { marginTop: 12 }] },
          ...analysis.etymology.languageFamilyTree.map((lang, i) =>
            React.createElement(
              Text,
              { key: i, style: [styles.langTag, { color: p.accent, borderColor: `${p.accent}44` }] },
              lang
            )
          )
        )
      ),
      // Phonetics
      React.createElement(
        View,
        { style: [styles.section, { backgroundColor: `${p.accent}08` }] },
        React.createElement(Text, { style: [styles.sectionTitle, { color: p.accent }] }, "Phonetics"),
        React.createElement(Text, { style: [styles.ipa, { color: p.accent }] }, analysis.phonetics.ipa),
        React.createElement(Text, { style: [styles.bodyText, { color: p.text }] }, analysis.phonetics.stressPattern),
        React.createElement(
          Text,
          { style: [styles.bodyText, { color: p.text, marginTop: 8, fontStyle: "italic" }] },
          analysis.phonetics.phonosemantic
        )
      ),
      // Morphology
      React.createElement(
        View,
        { style: [styles.section, { backgroundColor: `${p.accent}11` }] },
        React.createElement(Text, { style: [styles.sectionTitle, { color: p.accent }] }, "Morphology"),
        React.createElement(
          View,
          { style: styles.morphemeRow },
          ...analysis.morphology.morphemes.map((m, i) =>
            React.createElement(
              View,
              { key: i, style: [styles.morphemeBox, { backgroundColor: `${p.accent}15` }] },
              React.createElement(Text, { style: [styles.morphemePart, { color: p.accent }] }, m.part),
              React.createElement(Text, { style: [styles.morphemeType, { color: p.text }] }, m.type)
            )
          )
        ),
        React.createElement(Text, { style: [styles.bodyText, { color: p.text }] }, analysis.morphology.grammaticalJourney)
      ),
      // Cognates
      React.createElement(
        View,
        { style: styles.cognateRow },
        ...analysis.crossLinguistic.cognates.slice(0, 6).map((c, i) =>
          React.createElement(
            View,
            { key: i, style: styles.cognateItem },
            React.createElement(Text, { style: [styles.cognateLang, { color: p.text }] }, c.language),
            React.createElement(Text, { style: [styles.cognateWord, { color: p.accent }] }, c.word)
          )
        )
      ),
      // Footer
      React.createElement(
        View,
        { style: [styles.footer, { borderTopColor: `${p.accent}22` }] },
        React.createElement(Text, { style: [styles.footerText, { color: p.text }] }, "etyma.art"),
        React.createElement(Text, { style: [styles.footerText, { color: p.text }] }, `© ${new Date().getFullYear()} Etyma`)
      )
    )
  );
}

export async function POST(req: NextRequest) {
  try {
    const { analysis, palette, artUrl } = await req.json() as {
      analysis: NameAnalysis;
      palette: ColourPalette;
      artUrl?: string;
    };

    if (!analysis || !palette) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const doc = createPosterDocument(analysis, palette, artUrl);
    const buffer = await renderToBuffer(doc);
    const uint8 = new Uint8Array(buffer);

    return new NextResponse(uint8, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="etyma-${analysis.name.toLowerCase()}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json({ error: "PDF generation failed" }, { status: 500 });
  }
}
