'use client';

import Link from 'next/link';

export default function Navbar() {
    return (
        <header className="w-full bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
            {/* অটোমেটেড স্ক্রলিং নোটিশ বার (Automation Marquee) */}
            <div className="bg-blue-950/80 border-b border-blue-900/50 py-1.5 overflow-hidden text-xs text-blue-200">
                <div className="whitespace-nowrap inline-block animate-marquee font-medium">
                    🚨 প্রিয় সচেতন নাগরিক, আপনার বা আপনার পরিচিত কারও প্রিয়জন নিখোঁজ হলে সাথে সাথে সার্ভিসটিতে রিপোর্ট দিন। আমাদের প্লাটফর্মের মাধ্যমে দ্রুততম সময়ে তথ্য ছড়িয়ে দিয়ে প্রিয়জনকে খুঁজে পেতে সহায়তা করুন। 🚨
                </div>
            </div>

            {/* নেভিগেশন বার */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex justify-between items-center">

                {/* প্রফেশনাল লোগো */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
                        <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                            <span className="text-xl">📍</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                            People<span className="text-blue-500">Finder</span>
                        </span>
                        <span className="text-[10px] font-medium text-slate-400 -mt-1 tracking-wider uppercase">
                            Connecting Families
                        </span>
                    </div>
                </Link>

                {/* নেভিগেশন লিংকস */}
                <div className="flex items-center gap-4 sm:gap-6">
                    <Link
                        href="/history"
                        className="text-slate-300 hover:text-blue-400 text-sm font-medium transition flex items-center gap-1.5"
                    >
                        <span>📜</span>
                        <span className="hidden sm:inline">Resolved History</span>
                        <span className="sm:hidden">History</span>
                    </Link>

                    <Link
                        href="/"
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-md shadow-blue-600/30 transition duration-200"
                    >
                        + রিপোর্ট দিন
                    </Link>
                </div>

            </div>
        </header>
    );
}