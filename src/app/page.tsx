'use client';
import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);

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
        alert('রিপোর্ট সফলভাবে জমা হয়েছে!');
        (e.target as HTMLFormElement).reset();
      } else {
        alert('কোথাও ভুল হয়েছে, আবার চেষ্টা করুন।');
      }
    } catch (err) {
      console.error(err);
      alert('সার্ভারে সমস্যা হয়েছে!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center text-white mb-6">
        হারিয়ে যাওয়া বাচ্চার রিপোর্ট দিন
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">বাচ্চার নাম</label>
          <input
            type="text"
            name="name"
            required
            className="w-full border border-gray-300 p-2.5 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">বয়স</label>
          <input
            type="number"
            name="age"
            required
            className="w-full border border-gray-300 p-2.5 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">হারানোর এলাকা / জেলা</label>
          <input
            type="text"
            name="location"
            required
            className="w-full border border-gray-300 p-2.5 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">হারানোর তারিখ</label>
          <input
            type="date"
            name="dateMissing"
            required
            className="w-full border border-gray-300 p-2.5 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">বিস্তারিত বিবরণ (পোশাক, বিশেষ চিহ্ন ইত্যাদি)</label>
          <textarea
            name="description"
            required
            className="w-full border border-gray-300 p-2.5 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">যোগাযোগের নম্বর</label>
          <input
            type="tel"
            name="contactNumber"
            required
            className="w-full border border-gray-300 p-2.5 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">বাচ্চার ছবি</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            required
            className="w-full border border-gray-300 p-2 rounded-md text-gray-700 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-200 disabled:bg-gray-400 mt-2"
        >
          {loading ? 'আপলোড হচ্ছে...' : 'রিপোর্ট জমা দিন'}
        </button>
      </form>
    </main>
  );
}