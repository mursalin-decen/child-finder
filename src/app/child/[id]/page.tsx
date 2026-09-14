'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';

interface Child {
    _id: string;
    name: string;
    age: number;
    location: string;
    dateMissing: string;
    description: string;
    contactNumber: string;
    imageUrl: string;
    isFound?: boolean;
}

export default function ChildDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [child, setChild] = useState<Child | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChildDetails = async () => {
            try {
                const res = await fetch('/api/children');
                const data = await res.json();
                if (data.success) {
                    const foundChild = data.data.find((item: Child) => item._id === resolvedParams.id);
                    setChild(foundChild || null);
                }
            } catch (err) {
                console.error('Error fetching child details:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchChildDetails();
    }, [resolvedParams.id]);

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-950 flex justify-center items-center">
                <p className="text-white text-lg">ডাটা লোড হচ্ছে...</p>
            </main>
        );
    }

    if (!child) {
        return (
            <main className="min-h-screen bg-slate-950 flex flex-col justify-center items-center space-y-4">
                <p className="text-red-400 text-lg">কোনো তথ্য পাওয়া যায়নি!</p>
                <Link href="/" className="text-blue-400 underline">হোমপেজে ফিরে যান</Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 p-6 flex justify-center items-center">
            <div className="max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative">
                    <img src={child.imageUrl} alt={child.name} className="w-full max-h-96 object-cover" />
                    {child.isFound && (
                        <span className="absolute top-4 right-4 bg-green-500 text-white font-bold px-4 py-1.5 rounded-full shadow">
                            ✓ খুঁজে পাওয়া গেছে (Found)
                        </span>
                    )}
                </div>

                <div className="p-8 space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">{child.name}</h1>
                        <p className="text-gray-400">তারিখ: {child.dateMissing}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-gray-300">
                        <p><strong className="text-white">বয়স:</strong> {child.age} বছর</p>
                        <p><strong className="text-white">হারানোর এলাকা:</strong> {child.location}</p>
                        <p className="sm:col-span-2"><strong className="text-white">যোগাযোগ:</strong> {child.contactNumber}</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white mb-2">বিবরণ</h3>
                        <p className="text-gray-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                            {child.description}
                        </p>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                        <Link href="/" className="bg-slate-800 hover:bg-slate-700 text-white font-medium px-5 py-2.5 rounded-lg transition">
                            ← পেছনে যান
                        </Link>

                        <a href={`tel:${child.contactNumber}`} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition">
                            📞 কল করুন
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}