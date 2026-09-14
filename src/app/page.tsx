'use client';

import { useState, useEffect } from 'react';
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
  status: 'Missing' | 'Found';
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [children, setChildren] = useState<Child[]>([]);
  const [fetching, setFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchChildren = async () => {
    try {
      const res = await fetch('/api/children');
      const data = await res.json();
      if (data.success) {
        setChildren(data.data);
      }
    } catch (err) {
      console.error('Error fetching children:', err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        fetchChildren();
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

  // Mark as Found ট্রিগার করার ফাংশন
  const handleMarkAsFound = async (id: string) => {
    const confirmAction = confirm('আপনি কি নিশ্চিত যে এই শিশুটিকে পাওয়া গেছে?');
    if (!confirmAction) return;

    try {
      const res = await fetch(`/api/children/${id}`, {
        method: 'PATCH',
      });
      const data = await res.json();

      if (data.success) {
        alert('স্ট্যাটাস সফলভাবে আপডেট করা হয়েছে!');
        fetchChildren(); // লিস্ট রিফ্রেশ করা
      } else {
        alert('আপডেট করতে সমস্যা হয়েছে।');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('সার্ভারে সমস্যা হয়েছে!');
    }
  };

  const filteredChildren = children.filter((child) =>
    child.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    child.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-950 p-6 flex flex-col items-center">
      <div className="w-full max-w-5xl space-y-12 my-6">

        {/* ফর্ম সেকশন */}
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center text-white mb-6">
            হারিয়ে যাওয়া বাচ্চার রিপোর্ট দিন
          </h1>

          <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">বাচ্চার নাম</label>
              <input type="text" name="name" required className="w-full border border-gray-300 p-2.5 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">বয়স</label>
              <input type="number" name="age" required className="w-full border border-gray-300 p-2.5 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">হারানোর এলাকা / জেলা</label>
              <input type="text" name="location" required className="w-full border border-gray-300 p-2.5 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">হারানোর তারিখ</label>
              <input type="date" name="dateMissing" required className="w-full border border-gray-300 p-2.5 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">বিস্তারিত বিবরণ (পোশাক, বিশেষ চিহ্ন ইত্যাদি)</label>
              <textarea name="description" required className="w-full border border-gray-300 p-2.5 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3}></textarea>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">যোগাযোগের নম্বর</label>
              <input type="tel" name="contactNumber" required className="w-full border border-gray-300 p-2.5 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">বাচ্চার ছবি</label>
              <input type="file" name="image" accept="image/*" required className="w-full border border-gray-300 p-2 rounded-md text-gray-700 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-200 disabled:bg-gray-400 mt-2">
              {loading ? 'আপলোড হচ্ছে...' : 'রিপোর্ট জমা দিন'}
            </button>
          </form>
        </div>

        {/* সাম্প্রতিক রিপোর্ট ও সার্চ সেকশন */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-800 pb-4 gap-4">
            <h2 className="text-2xl font-bold text-white">
              সাম্প্রতিক হারানো শিশুর তালিকা
            </h2>
            <input
              type="text"
              placeholder="নাম বা এলাকা দিয়ে খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-72 bg-slate-900 border border-slate-700 p-2.5 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {fetching ? (
            <p className="text-gray-400 text-center py-8">ডাটা লোড হচ্ছে...</p>
          ) : filteredChildren.length === 0 ? (
            <p className="text-gray-400 text-center py-8">কোনো রিপোর্ট পাওয়া যায়নি।</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChildren.map((child) => (
                <div key={child._id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md flex flex-col relative">

                  {/* Found / Missing Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    {child.status === 'Found' ? (
                      <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        ✓ পাওয়া গেছে
                      </span>
                    ) : (
                      <span className="bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        খোঁজ চলছে
                      </span>
                    )}
                  </div>

                  <img
                    src={child.imageUrl}
                    alt={child.name}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{child.name}</h3>
                      <div className="space-y-1 text-sm text-gray-300">
                        <p><span className="text-gray-400 font-medium">বয়স:</span> {child.age} বছর</p>
                        <p><span className="text-gray-400 font-medium">এলাকা:</span> {child.location}</p>
                        <p><span className="text-gray-400 font-medium">তারিখ:</span> {child.dateMissing}</p>
                        <p className="mt-2 text-gray-400 text-xs line-clamp-3"><span className="text-gray-300 font-medium">বিবরণ:</span> {child.description}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 mt-auto space-y-2">
                      <p className="text-sm font-semibold text-blue-400 flex items-center gap-1">
                        📞 {child.contactNumber}
                      </p>

                      <div className="flex gap-2">
                        <Link
                          href={`/child/${child._id}`}
                          className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-md transition"
                        >
                          বিস্তারিত
                        </Link>

                        {child.status !== 'Found' && (
                          <button
                            onClick={() => handleMarkAsFound(child._id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-md transition"
                          >
                            Mark as Found
                          </button>
                        )}
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