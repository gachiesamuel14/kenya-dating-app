'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';

export default function Discover() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearby, setNearby] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const getLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation({ lat: latitude, lng: longitude });
          fetchNearby(latitude, longitude);
        },
        (err) => {
          alert('Location access denied or unavailable.');
          setLoading(false);
        }
      );
    }
  };

  const fetchNearby = async (lat: number, lng: number) => {
    // Example call to the nearby_users RPC
    const { data, error } = await supabase.rpc('nearby_users', {
      lat,
      lng,
      radius_meters: 50000, // 50km
    });
    if (error) console.error(error);
    else setNearby(data || []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Discover Nearby</h1>
      <button
        onClick={getLocation}
        disabled={loading}
        className="bg-green-600 text-white px-6 py-3 rounded-full mb-6 hover:bg-green-700"
      >
        {loading ? 'Getting location...' : 'Find People Near Me'}
      </button>
      {location && (
        <p className="mb-4 text-sm text-gray-600">
          Your location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
        </p>
      )}
      <div className="grid gap-4">
        {nearby.map((person) => (
          <div key={person.id} className="bg-white p-4 rounded shadow flex gap-4">
            {person.avatar_url && (
              <img src={person.avatar_url} alt="" className="w-16 h-16 rounded-full object-cover" />
            )}
            <div>
              <h3 className="font-bold">{person.full_name}, {person.age}</h3>
              <p className="text-sm">{person.bio}</p>
              <p className="text-xs text-gray-500">
                {Math.round(person.distance_meters / 1000)} km away
              </p>
            </div>
          </div>
        ))}
        {nearby.length === 0 && !loading && location && (
          <p>No nearby profiles yet. Be the first or expand your radius!</p>
        )}
      </div>
    </div>
  );
}
