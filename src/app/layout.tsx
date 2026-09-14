import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ==========================================
// ১. Component Imports (Navbar, Footer & Toast Notification)
// ==========================================
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

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
// ৩. SEO & Tab Metadata (ট্যাবের নাম ও আইকন)
// ==========================================
export const metadata: Metadata = {
  title: {
    default: "People Finder BD | হারিয়ে যাওয়া মানুষের সন্ধান",
    template: "%s | People Finder BD",
  },
  description: "বাংলাদেশের হারিয়ে যাওয়া মানুষদের তথ্য পোস্ট করুন এবং দ্রুত খুঁজে পেতে সাহায্য করুন।",
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔍</text></svg>',
        type: 'image/svg+xml',
      },
    ],
    apple: [
      {
        url: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔍</text></svg>',
      },
    ],
  },
};

// ==========================================
// ৪. Root Layout Component
// ==========================================
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-white">

        {/* ডার্ক থিম কাস্টম টোস্ট নোটিফিকেশন */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0f172a',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              fontSize: '14px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
            },
          }}
        />

        {/* টপ নেভিগেশন বার */}
        <Navbar />

        {/* পেজের মূল কনটেন্ট */}
        <main className="flex-1">
          {children}
        </main>

        {/* বটম ফুটার */}
        <Footer />

      </body>
    </html>
  );
}