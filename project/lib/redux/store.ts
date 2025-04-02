import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './features/weatherSlice';
import cryptoReducer from './features/cryptoSlice';
import newsReducer from './features/newsSlice';
import favoritesReducer from './features/favoritesSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer,
    news: newsReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;