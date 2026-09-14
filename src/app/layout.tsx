import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ==========================================
// ১. Component Imports (Navbar & Footer)
// ==========================================
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ==========================================
// ২. Font Configuration
// ==========================================
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ==========================================
// ৩. SEO Metadata
// ==========================================
export const metadata: Metadata = {
  title: "Child Finder - হারিয়ে যাওয়া শিশুর সন্ধান",
  description: "হারিয়ে যাওয়া শিশুদের তথ্য পোস্ট করুন এবং খুঁজুন।",
};

// ==========================================
// ৪. Root Layout Component
// ==========================================
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-white">

        {/* টপ নেভিগেশন বার */}
        <Navbar />

        {/* পেজের মূল কনটেন্ট (হোমপেজ, ডিটেইলস পেজ ইত্যাদি) */}
        <main className="flex-1">
          {children}
        </main>

        {/* বটম ফুটার */}
        <Footer />

      </body>
    </html>
  );
}