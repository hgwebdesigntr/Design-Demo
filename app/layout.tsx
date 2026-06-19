import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Dancing_Script } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PopupWrapper from "@/components/PopupWrapper";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Armel Design | İç Mimarlık",
  description: "Hayalinizdeki mekanı birlikte tasarlayalım.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${playfair.variable} ${dmSans.variable} ${dancingScript.variable}`}>
      <body className="bg-[#F5F0E8] text-[#2C2C2C] antialiased" suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Suspense fallback={null}>
          <PopupWrapper />
        </Suspense>
      </body>
    </html>
  );
}
