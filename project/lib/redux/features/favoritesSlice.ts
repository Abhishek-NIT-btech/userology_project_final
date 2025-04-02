import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  cities: string[];
  cryptos: string[];
}

const initialState: FavoritesState = {
  cities: [],
  cryptos: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleCityFavorite: (state, action: PayloadAction<string>) => {
      const city = action.payload;
      const index = state.cities.indexOf(city);
      if (index === -1) {
        state.cities.push(city);
      } else {
        state.cities.splice(index, 1);
      }
    },
    toggleCryptoFavorite: (state, action: PayloadAction<string>) => {
      const crypto = action.payload;
      const index = state.cryptos.indexOf(crypto);
      if (index === -1) {
        state.cryptos.push(crypto);
      } else {
        state.cryptos.splice(index, 1);
      }
    },
  },
});

export const { toggleCityFavorite, toggleCryptoFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;