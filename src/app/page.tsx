'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LocationSelector from '@/components/LocationSelector';

interface Person {
  _id: string;
  name: string;
  age: number;
  location: string;
  dateMissing: string;
  description: string;
  contactNumber: string;
  imageUrl: string;
  status: 'Missing' | 'Found';
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [fetching, setFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const fetchPeople = async () => {
    try {
      const res = await fetch('/api/children');
      const data = await res.json();
      if (data.success) {
        setPeople(data.data);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedLocation) {
      alert('অনুগ্রহ করে বাচ্চার হারানো এলাকা ড্রপডাউন থেকে নির্বাচন করুন।');
      return;
    }

    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        alert('রিপোর্ট সফলভাবে জমা হয়েছে!');
        (e.target as HTMLFormElement).reset();
        setSelectedLocation('');
        fetchPeople();
      } else {
        alert('কোথাও ভুল হয়েছে, আবার চেষ্টা করুন।');
      }
    } catch (err) {
      console.error(err);
      alert('সার্ভারে সমস্যা হয়েছে!');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsFound = async (id: string) => {
    const foundLocation = prompt('ব্যক্তিটিকে কোথায় উদ্ধার করা হয়েছে (স্থান/জেলা)?');
    if (!foundLocation) return;

    try {
      const res = await fetch(`/api/children/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          foundLocation,
          foundDate: new Date().toISOString().split('T')[0],
          lat: 23.8103,
          lng: 90.4125,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert('স্ট্যাটাস সফলভাবে আপডেট করা হয়েছে এবং "Resolved History" পেজে যুক্ত হয়েছে!');
        fetchPeople();
      } else {
        alert('আপডেট করতে সমস্যা হয়েছে।');
      }
    } catch (err) {
      console.error(err);
      alert('সার্ভারে সমস্যা হয়েছে!');
    }
  };

  // সার্চ ও একটিভ কেস ফিল্টারিং
  const filteredPeople = people.filter((person) => {
    if (person.status === 'Found') return false; // পাওয়া গেছে এমন কেসগুলো মেইন পেজ থেকে হাইড করে হিস্ট্রিতে রাখবে

    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    return (
      person.name.toLowerCase().includes(query) ||
      person.location.toLowerCase().includes(query)
    );
  });

  return (
    <main className="min-h-screen p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl space-y-12 my-4">

        {/* ফর্ম সেকশন */}
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              নিখোঁজ ব্যক্তির রিপোর্ট তৈরি করুন
            </h1>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              সঠিক তথ্য ও এলাকা প্রদান করে আপনার প্রিয়জনকে দ্রুত খুঁজে পেতে সহায়তা করুন।
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-xl glass-card p-6 sm:p-8 rounded-2xl shadow-2xl space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">পূর্ণ নাম</label>
              <input type="text" name="name" required className="w-full bg-slate-900/90 border border-slate-700/80 p-3 rounded-lg text-white text-sm" placeholder="যেমন: আব্দুর রহমান" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">বয়স</label>
                <input type="number" name="age" required className="w-full bg-slate-900/90 border border-slate-700/80 p-3 rounded-lg text-white text-sm" placeholder="যেমন: ১২" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">হারানোর তারিখ</label>
                <input type="date" name="dateMissing" required className="w-full bg-slate-900/90 border border-slate-700/80 p-3 rounded-lg text-white text-sm" />
              </div>
            </div>

            {/* ডায়নামিক লোকেশন সিলেক্টর */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                হারানোর স্থান / এলাকা
              </label>
              <LocationSelector onSelectLocation={(loc) => setSelectedLocation(loc)} />
              <input type="hidden" name="location" value={selectedLocation} />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">বিস্তারিত বিবরণ</label>
              <textarea name="description" required className="w-full bg-slate-900/90 border border-slate-700/80 p-3 rounded-lg text-white text-sm" rows={3} placeholder="পোশাক, বিশেষ কোনো চিহ্ন বা শারীরিক অবস্থা..."></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">যোগাযোগের মোবাইল নম্বর</label>
              <input type="tel" name="contactNumber" required className="w-full bg-slate-900/90 border border-slate-700/80 p-3 rounded-lg text-white text-sm" placeholder="017XXXXXXXX" />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">সাম্প্রতিক ছবি</label>
              <input type="file" name="image" accept="image/*" required className="w-full bg-slate-900/90 border border-slate-700/80 p-2 rounded-lg text-slate-300 text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer" />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3.5 rounded-lg font-bold text-sm shadow-lg shadow-blue-600/30 transition duration-200 disabled:opacity-50 mt-2">
              {loading ? 'আপলোড করা হচ্ছে...' : 'রিপোর্ট পোস্ট করুন'}
            </button>
          </form>
        </div>

        {/* সাম্প্রতিক রিপোর্ট সেকশন */}
        <div className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">সাম্প্রতিক সন্ধানপ্রার্থী রিপোর্টসমূহ</h2>
              <p className="text-xs text-slate-400">বর্তমানে নিখোঁজ থাকা ব্যক্তিদের তালিকা</p>
            </div>
            <input
              type="text"
              placeholder="নাম বা এলাকা দিয়ে খুঁজুন (বাংলা/Eng)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-80 bg-slate-900 border border-slate-700/80 p-3 rounded-lg text-white text-sm placeholder-slate-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {fetching ? (
            <p className="text-slate-400 text-center py-12">ডাটা লোড হচ্ছে...</p>
          ) : filteredPeople.length === 0 ? (
            <p className="text-slate-400 text-center py-12">কোনো একটিভ নিখোঁজ রিপোর্ট পাওয়া যায়নি।</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPeople.map((person) => (
                <div key={person._id} className="glass-card rounded-xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300">
                  <div className="relative">
                    <img src={person.imageUrl} alt={person.name} className="w-full h-56 object-cover" />
                    <span className="absolute top-3 right-3 bg-rose-500/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg">
                      খোঁজ চলছে
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white">{person.name}</h3>
                      <div className="space-y-1 text-xs text-slate-300">
                        <p><span className="text-slate-400">বয়স:</span> {person.age} বছর</p>
                        <p><span className="text-slate-400">স্থান:</span> {person.location}</p>
                        <p><span className="text-slate-400">তারিখ:</span> {person.dateMissing}</p>
                        <p className="mt-2 text-slate-400 text-xs line-clamp-2"><span className="text-slate-300">বিবরণ:</span> {person.description}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
                      <p className="text-sm font-semibold text-blue-400">📞 {person.contactNumber}</p>
                      <div className="flex gap-2">
                        <Link href={`/child/${person._id}`} className="flex-1 text-center bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold py-2.5 rounded-lg transition">
                          ডিটেইলস
                        </Link>
                        <button onClick={() => handleMarkAsFound(person._id)} className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-2.5 rounded-lg transition">
                          Mark as Found
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}