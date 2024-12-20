export const config = {
  apiKey: import.meta.env.VITE_ALPHA_VANTAGE_API_KEY,
  apiBaseUrl: 'https://www.alphavantage.co/query',
  cacheTimeout: 5 * 60 * 1000, // 5분
}; 