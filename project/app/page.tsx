'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/redux/store';
import { fetchWeatherData } from '@/lib/redux/features/weatherSlice';
import { fetchCryptoData } from '@/lib/redux/features/cryptoSlice';
import { fetchNews } from '@/lib/redux/features/newsSlice';
import Dashboard from '@/components/dashboard/Dashboard';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Fetch initial data
    const cities = ['New York', 'London', 'Tokyo'];
    const cryptos = ['bitcoin', 'ethereum', 'cardano'];

    cities.forEach(city => {
      dispatch(fetchWeatherData(city));
    });

    cryptos.forEach(crypto => {
      dispatch(fetchCryptoData(crypto));
    });

    dispatch(fetchNews());

    // Set up periodic data refresh
    const interval = setInterval(() => {
      cities.forEach(city => {
        dispatch(fetchWeatherData(city));
      });

      cryptos.forEach(crypto => {
        dispatch(fetchCryptoData(crypto));
      });

      dispatch(fetchNews());
    }, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, [dispatch]);

  return <Dashboard />;
}