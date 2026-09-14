import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="w-full bg-slate-900 border-b border-slate-800 py-4 px-6 sticky top-0 z-50">
            <div className="max-w-5xl mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-blue-500 tracking-wide">
                    🔍 Child Finder
                </Link>
                <Link
                    href="/"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
                >
                    রিপোর্ট জমা দিন
                </Link>
            </div>
        </nav>
    );
}