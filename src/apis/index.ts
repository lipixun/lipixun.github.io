// API
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BuildTime } from '../types';

// Application api
const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: builder => ({
    // Build time
    getBuildTime: builder.query<BuildTime, void>({
      // Add a query parameter t to invalidate any possible cache
      query: () => `build-time.json?t=${Date.now()}`,
    }),
  }),
});

export default api;
