import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
}

export interface NewsState {
  articles: NewsArticle[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: NewsState = {
  articles: [],
  status: 'idle',
  error: null,
};

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const API_KEY = process.env.NEXT_PUBLIC_NEWSDATA_API_KEY;
  const response = await fetch(
    `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=cryptocurrency&language=en`
  );
  const data = await response.json();
  return data.results.slice(0, 5);
});

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch news';
      });
  },
});

export default newsSlice.reducer;