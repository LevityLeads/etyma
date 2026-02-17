import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Etyma — The Art of Names",
  description: "Beautiful art prints that reveal the hidden anatomy of names. Etymology, phonetics, morphology, and meaning, all in one stunning poster.",
  metadataBase: new URL("https://etyma-weld.vercel.app"),
  openGraph: {
    title: "Etyma — The Art of Names",
    description: "Your name carries thousands of years of history, sound, and meaning. Etyma decodes it all into a single stunning art print.",
    type: "website",
    siteName: "Etyma",
    images: [{ url: "/posters/sunny-art.png", width: 768, height: 1024, alt: "Etyma — SUNNY Word Anatomy Print" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Etyma — The Art of Names",
    description: "Your name carries thousands of years of history. We turn it into art.",
    images: ["/posters/sunny-art.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
