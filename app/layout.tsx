import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google"; // Removed Playfair_Display
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap", // Ensure swap for performance
});

export const metadata: Metadata = {
  title: "Lumière | Modern Jewelry",
  description: "Minimal, ethical jewelry and a curated luxury experience."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-white text-black antialiased`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

