import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface CryptoState {
  currencies: {
    [key: string]: {
      price: number;
      change24h: number;
      marketCap: number;
      loading: boolean;
      error: string | null;
    };
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CryptoState = {
  currencies: {},
  status: 'idle',
  error: null,
};

export const fetchCryptoData = createAsyncThunk(
  'crypto/fetchCryptoData',
  async (id: string) => {
    const response = await fetch(
      `https://api.coincap.io/v2/assets/${id}`
    );
    const data = await response.json();
    return { id, data: data.data };
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePrice: (state, action) => {
      const { id, price } = action.payload;
      if (state.currencies[id]) {
        state.currencies[id].price = parseFloat(price);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state, action) => {
        const id = action.meta.arg;
        state.currencies[id] = {
          ...state.currencies[id],
          loading: true,
          error: null,
        };
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        const { id, data } = action.payload;
        state.currencies[id] = {
          price: parseFloat(data.priceUsd),
          change24h: parseFloat(data.changePercent24Hr),
          marketCap: parseFloat(data.marketCapUsd),
          loading: false,
          error: null,
        };
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        const id = action.meta.arg;
        state.currencies[id] = {
          ...state.currencies[id],
          loading: false,
          error: action.error.message || 'Failed to fetch crypto data',
        };
      });
  },
});

export const { updatePrice } = cryptoSlice.actions;
export default cryptoSlice.reducer;