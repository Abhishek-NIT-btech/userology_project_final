import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface WeatherState {
  cities: {
    [key: string]: {
      temperature: number | null;
      humidity: number | null;
      conditions: string;
      loading: boolean;
      error: string | null;
    };
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: WeatherState = {
  cities: {},
  status: 'idle',
  error: null,
};

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (city: string) => {
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`);
    }
    const data = await response.json();
    return { city, data };
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state, action) => {
        const city = action.meta.arg;
        state.cities[city] = {
          ...state.cities[city],
          loading: true,
          error: null,
        };
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        const { city, data } = action.payload;
        state.cities[city] = {
          temperature: data?.main?.temp ?? null,
          humidity: data?.main?.humidity ?? null,
          conditions: data?.weather?.[0]?.main ?? 'Unknown',
          loading: false,
          error: null,
        };
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        const city = action.meta.arg;
        state.cities[city] = {
          temperature: null,
          humidity: null,
          conditions: 'Unknown',
          loading: false,
          error: action.error.message || 'Failed to fetch weather data',
        };
      });
  },
});

export default weatherSlice.reducer;