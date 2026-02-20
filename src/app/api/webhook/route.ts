import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import React from "react";
import { renderToBuffer, Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import { getOrder, deleteOrder } from "../../../lib/order-store";
import type { NameAnalysis, ColourPalette } from "../../../types/name";
import { PALETTES } from "../../../types/name";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-01-27.acacia" as Stripe.LatestApiVersion,
  });
}

const GOOGLE_API_URL = process.env.GOOGLE_API_URL || "https://google-api-proxy-production.up.railway.app";
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || "123123123";

// ─── PDF Generation (copied from generate-pdf route) ───

const PAGE_WIDTH = 1191;
const PAGE_HEIGHT = 1684;

const styles = StyleSheet.create({
  page: { width: PAGE_WIDTH, height: PAGE_HEIGHT, padding: 80, flexDirection: "column" },
  header: { marginBottom: 40 },
  name: { fontSize: 120, fontWeight: "bold", letterSpacing: 12, textTransform: "uppercase" },
  subtitle: { fontSize: 14, letterSpacing: 8, textTransform: "uppercase", opacity: 0.4, marginTop: 8 },
  artContainer: { width: "100%", height: 500, marginVertical: 40, borderRadius: 8, overflow: "hidden" },
  artImage: { width: "100%", height: "100%", objectFit: "cover" },
  section: { marginBottom: 30, padding: 30, borderRadius: 8 },
  sectionTitle: { fontSize: 12, letterSpacing: 6, textTransform: "uppercase", marginBottom: 12, fontWeight: "bold" },
  ipa: { fontSize: 48, marginBottom: 8 },
  bodyText: { fontSize: 16, lineHeight: 1.6, opacity: 0.7 },
  morphemeRow: { flexDirection: "row", gap: 16, marginBottom: 16 },
  morphemeBox: { padding: 16, borderRadius: 8, alignItems: "center" },
  morphemePart: { fontSize: 28 },
  morphemeType: { fontSize: 10, letterSpacing: 4, textTransform: "uppercase", opacity: 0.5, marginTop: 4 },
  langRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  langTag: { fontSize: 11, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, borderWidth: 1 },
  cognateRow: { flexDirection: "row", flexWrap: "wrap", gap: 24, marginTop: 16 },
  cognateItem: { alignItems: "flex-start" },
  cognateLang: { fontSize: 9, letterSpacing: 3, textTransform: "uppercase", opacity: 0.4 },
  cognateWord: { fontSize: 16, marginTop: 2 },
  footer: { marginTop: "auto", paddingTop: 20, borderTopWidth: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  footerText: { fontSize: 12, opacity: 0.3 },
});

function createPosterDocument(analysis: NameAnalysis, palette: ColourPalette, artUrl?: string) {
  const p = PALETTES[palette];
  return React.createElement(
    Document, null,
    React.createElement(
      Page, { size: [PAGE_WIDTH, PAGE_HEIGHT], style: [styles.page, { backgroundColor: p.bg }] },
      React.createElement(View, { style: styles.header },
        React.createElement(Text, { style: [styles.name, { color: p.accent }] }, analysis.name),
        React.createElement(Text, { style: [styles.subtitle, { color: p.text }] }, "Word Anatomy by Etyma")
      ),
      artUrl ? React.createElement(View, { style: styles.artContainer },
        React.createElement(Image, { style: styles.artImage, src: artUrl })
      ) : null,
      React.createElement(View, { style: [styles.section, { backgroundColor: `${p.accent}11` }] },
        React.createElement(Text, { style: [styles.sectionTitle, { color: p.accent }] }, "Etymology"),
        React.createElement(Text, { style: [styles.bodyText, { color: p.text }] },
          `From ${analysis.etymology.originLanguage}, "${analysis.etymology.rootWord}", meaning "${analysis.etymology.meaning}"`
        ),
        React.createElement(Text, { style: [styles.bodyText, { color: p.text, marginTop: 8 }] }, analysis.etymology.culturalSignificance),
        React.createElement(View, { style: [styles.langRow, { marginTop: 12 }] },
          ...analysis.etymology.languageFamilyTree.map((lang: string, i: number) =>
            React.createElement(Text, { key: i, style: [styles.langTag, { color: p.accent, borderColor: `${p.accent}44` }] }, lang)
          )
        )
      ),
      React.createElement(View, { style: [styles.section, { backgroundColor: `${p.accent}08` }] },
        React.createElement(Text, { style: [styles.sectionTitle, { color: p.accent }] }, "Phonetics"),
        React.createElement(Text, { style: [styles.ipa, { color: p.accent }] }, analysis.phonetics.ipa),
        React.createElement(Text, { style: [styles.bodyText, { color: p.text }] }, analysis.phonetics.stressPattern),
        React.createElement(Text, { style: [styles.bodyText, { color: p.text, marginTop: 8, fontStyle: "italic" }] }, analysis.phonetics.phonosemantic)
      ),
      React.createElement(View, { style: [styles.section, { backgroundColor: `${p.accent}11` }] },
        React.createElement(Text, { style: [styles.sectionTitle, { color: p.accent }] }, "Morphology"),
        React.createElement(View, { style: styles.morphemeRow },
          ...analysis.morphology.morphemes.map((m: { part: string; type: string }, i: number) =>
            React.createElement(View, { key: i, style: [styles.morphemeBox, { backgroundColor: `${p.accent}15` }] },
              React.createElement(Text, { style: [styles.morphemePart, { color: p.accent }] }, m.part),
              React.createElement(Text, { style: [styles.morphemeType, { color: p.text }] }, m.type)
            )
          )
        ),
        React.createElement(Text, { style: [styles.bodyText, { color: p.text }] }, analysis.morphology.grammaticalJourney)
      ),
      React.createElement(View, { style: styles.cognateRow },
        ...analysis.crossLinguistic.cognates.slice(0, 6).map((c: { language: string; word: string }, i: number) =>
          React.createElement(View, { key: i, style: styles.cognateItem },
            React.createElement(Text, { style: [styles.cognateLang, { color: p.text }] }, c.language),
            React.createElement(Text, { style: [styles.cognateWord, { color: p.accent }] }, c.word)
          )
        )
      ),
      React.createElement(View, { style: [styles.footer, { borderTopColor: `${p.accent}22` }] },
        React.createElement(Text, { style: [styles.footerText, { color: p.text }] }, "etyma.art"),
        React.createElement(Text, { style: [styles.footerText, { color: p.text }] }, `© ${new Date().getFullYear()} Etyma`)
      )
    )
  );
}

// ─── Email HTML ───

function buildDeliveryEmail(name: string, meaning: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#FDF6EC;font-family:Georgia,'Times New Roman',serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
    <div style="text-align:center;margin-bottom:32px;">
      <h1 style="font-size:28px;color:#2C2824;letter-spacing:4px;margin:0;">ETYMA</h1>
      <p style="font-size:12px;color:#C4BAB0;letter-spacing:6px;margin:4px 0 0;text-transform:uppercase;">Word Anatomy</p>
    </div>
    
    <div style="background:white;border-radius:12px;padding:40px;margin-bottom:24px;">
      <h2 style="font-size:22px;color:#2C2824;margin:0 0 16px;">Your print is ready ✨</h2>
      <p style="font-size:16px;color:#8A8078;line-height:1.6;margin:0 0 16px;">
        Thank you for your order. Your custom <strong style="color:#D4930D;">${name}</strong> etymology poster is attached to this email as a high-resolution PDF.
      </p>
      <p style="font-size:16px;color:#8A8078;line-height:1.6;margin:0 0 24px;">
        ${meaning}
      </p>
      <div style="background:#FDF6EC;border-radius:8px;padding:20px;border-left:3px solid #D4930D;">
        <p style="font-size:14px;color:#8A8078;margin:0;">
          <strong style="color:#2C2824;">Print tip:</strong> Your PDF is sized at A2 (420 × 594mm) at 300dpi. 
          For best results, use a professional print service and choose matte or fine art paper.
        </p>
      </div>
    </div>

    <div style="text-align:center;padding:24px 0;">
      <p style="font-size:12px;color:#C4BAB0;margin:0;">
        Made with care by <a href="https://etyma-weld.vercel.app" style="color:#D4930D;text-decoration:none;">Etyma</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

// ─── Webhook Handler ───

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: unknown) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    const customerEmail = session.customer_details?.email;

    if (!orderId || !customerEmail) {
      console.error("Missing orderId or email in webhook", { orderId, customerEmail });
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // Look up full order data
    const order = getOrder(orderId);
    if (!order) {
      console.error("Order not found:", orderId);
      // Order might have been on a different serverless instance.
      // Log for manual fulfilment.
      console.error("MANUAL FULFILMENT NEEDED:", { orderId, customerEmail, sessionId: session.id });
      return NextResponse.json({ received: true, warning: "order_not_found" });
    }

    try {
      // Generate PDF
      const analysis = order.analysis as unknown as NameAnalysis;
      const palette = order.palette as ColourPalette;
      const doc = createPosterDocument(analysis, palette, order.artUrl);
      const pdfBuffer = await renderToBuffer(doc);
      const pdfBase64 = Buffer.from(pdfBuffer).toString("base64");

      // Send email with PDF attached
      const meaning = analysis.etymology?.meaning
        ? `The name "${order.name}" comes from ${analysis.etymology.originLanguage}, meaning "${analysis.etymology.meaning}". A beautiful name with a rich history.`
        : `The name "${order.name}" has a fascinating linguistic history that we've captured in your poster.`;

      const emailRes = await fetch(`${GOOGLE_API_URL}/gmail/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": GOOGLE_API_KEY,
        },
        body: JSON.stringify({
          account: "levity",
          to: customerEmail,
          subject: `Your Etyma Print: ${order.name}`,
          body: buildDeliveryEmail(order.name, meaning),
          isHtml: true,
          from: "Etyma <atlas@levityleads.com>",
          attachments: [
            {
              filename: `etyma-${order.name.toLowerCase()}.pdf`,
              mimeType: "application/pdf",
              content: pdfBase64,
            },
          ],
        }),
      });

      if (!emailRes.ok) {
        const errText = await emailRes.text();
        console.error("Email send failed:", errText);
        console.error("MANUAL FULFILMENT NEEDED (email failed):", { orderId, customerEmail });
      } else {
        console.log(`Order ${orderId} delivered to ${customerEmail}`);
      }

      // Clean up
      deleteOrder(orderId);
    } catch (err) {
      console.error("Delivery pipeline error:", err);
      console.error("MANUAL FULFILMENT NEEDED (pipeline error):", { orderId, customerEmail });
    }
  }

  return NextResponse.json({ received: true });
}
