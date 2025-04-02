'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CloudSun } from 'lucide-react';

export function WeatherSection() {
  const weather = useSelector((state: RootState) => state.weather.cities);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CloudSun className="h-6 w-6" />
          Weather
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(weather).map(([city, data]) => (
            <div key={city} className="rounded-lg bg-muted p-4">
              {data.loading ? (
                <p>Loading...</p>
              ) : data.error ? (
                <p className="text-destructive">{data.error}</p>
              ) : data.temperature === null ? (
                <p>Temperature data unavailable</p>
              ) : (
                <div>
                  <h3 className="font-semibold">{city}</h3>
                  <p className="text-2xl font-bold">{Math.round(data.temperature)}°C</p>
                  <p className="text-muted-foreground">
                    Humidity: {data.humidity !== null ? `${data.humidity}%` : 'N/A'} | {data.conditions}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}