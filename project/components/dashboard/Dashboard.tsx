'use client';

import { WeatherSection } from './WeatherSection';
import { CryptoSection } from './CryptoSection';
import { NewsSection } from './NewsSection';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">CryptoWeather Nexus</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <WeatherSection />
          <CryptoSection />
          <NewsSection />
        </div>
      </main>
    </div>
  );
}