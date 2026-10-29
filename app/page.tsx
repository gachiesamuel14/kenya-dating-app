'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold text-green-800 mb-4">Karibu Kenya Match</h1>
        <p className="text-xl text-gray-700 mb-6">
          Connect with people near you across Kenya. Location-based matchmaking by county, distance, interests, and more.
        </p>
        <div className="flex gap-4 justify-center mb-8">
          <a href="/login" className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700">
            Get Started
          </a>
          <a href="/discover" className="border border-green-600 text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-green-50">
            Discover Nearby
          </a>
        </div>
        {user && <p className="text-green-700">Logged in as {user.email}</p>}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-bold text-lg">GPS Matching</h3>
            <p className="text-sm text-gray-600">Find people within your preferred distance using real location data.</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-bold text-lg">Kenya Localized</h3>
            <p className="text-sm text-gray-600">Filter by county (Nairobi, Mombasa, Kisumu...), tribe, interests, lifestyle.</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-bold text-lg">Safe & Real</h3>
            <p className="text-sm text-gray-600">Profiles, photo uploads, reports, and optional M-Pesa premium features.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
