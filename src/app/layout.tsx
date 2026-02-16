import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Etyma — The Art of Names",
  description: "Beautiful art prints that reveal the hidden anatomy of names. Etymology, phonetics, morphology, and meaning, all in one stunning poster.",
  openGraph: {
    title: "Etyma — The Art of Names",
    description: "Beautiful art prints that reveal the hidden anatomy of names.",
    type: "website",
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
