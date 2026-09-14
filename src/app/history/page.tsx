'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamic Import dynamic window error এড়ানোর জন্য
const Map = dynamic(() => import('@/components/Map'), { ssr: false });

interface FoundPerson {
    _id: string;
    name: string;
    age: number;
    location: string;
    dateMissing: string;
    description: string;
    imageUrl: string;
    foundLocation?: string;
    foundDate?: string;
    foundCoordinates?: {
        lat: number;
        lng: number;
    };
}

export default function HistoryPage() {
    const [foundPeople, setFoundPeople] = useState<FoundPerson[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFoundPeople = async () => {
            try {
                const res = await fetch('/api/children');
                const data = await res.json();
                if (data.success) {
                    // শুধু মাত্র পাওয়া গেছে (status === 'Found') এমন মানুষদের ফিল্টার করা
                    const resolved = data.data.filter((item: any) => item.status === 'Found');
                    setFoundPeople(resolved);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFoundPeople();
    }, []);

    return (
        <main className="min-h-screen bg-slate-950 p-6 flex flex-col items-center">
            <div className="w-full max-w-5xl space-y-8 my-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-white">উদ্ধার হওয়া ব্যক্তিদের তালিকা (Resolved Cases)</h1>
                    <p className="text-gray-400">যারা তাদের পরিবারে ফিরে গেছেন তাদের তালিকা এবং উদ্ধারের লোকেশন ম্যাপ</p>
                </div>

                {loading ? (
                    <p className="text-gray-400 text-center py-8">ডাটা লোড হচ্ছে...</p>
                ) : foundPeople.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">এখনো কোনো উদ্ধার রেকর্ড নেই।</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {foundPeople.map((person) => (
                            <div key={person._id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg p-5 flex flex-col justify-between space-y-4">
                                <div className="flex gap-4">
                                    <img src={person.imageUrl} alt={person.name} className="w-28 h-28 object-cover rounded-lg" />
                                    <div className="space-y-1 text-sm text-gray-300">
                                        <h3 className="text-xl font-bold text-white">{person.name}</h3>
                                        <p><span className="text-emerald-400 font-semibold">উদ্ধারের স্থান:</span> {person.foundLocation || 'উদ্ধার করা হয়েছে'}</p>
                                        <p><span className="text-gray-400">উদ্ধারের তারিখ:</span> {person.foundDate || 'N/A'}</p>
                                        <p><span className="text-gray-400">মূল হারিয়ে যাওয়ার স্থান:</span> {person.location}</p>
                                    </div>
                                </div>

                                {/* Interactive Leaflet Map showing Found Location */}
                                {person.foundCoordinates?.lat && person.foundCoordinates?.lng ? (
                                    <Map
                                        lat={person.foundCoordinates.lat}
                                        lng={person.foundCoordinates.lng}
                                        popupText={`${person.name}-কে এখানে পাওয়া গেছে`}
                                    />
                                ) : (
                                    <div className="bg-slate-800 p-4 rounded text-center text-xs text-gray-400">
                                        ম্যাপ লোকেশন দেওয়া হয়নি
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}