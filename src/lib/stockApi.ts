import { config } from './config';
import { StockCache } from './cache';

interface StockData {
  currentPrice: number;
  startPrice: number;
  changeRate: number;
}

export const fetchStockData = async (ticker: string): Promise<StockData> => {
  // 캐시 확인
  const cacheKey = `stock_${ticker}`;
  const cachedData = StockCache.get<StockData>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    // 현재 주가 조회
    const quoteResponse = await fetch(
      `${config.apiBaseUrl}?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${config.apiKey}`
    );
    const quoteData = await quoteResponse.json();

    // 년초 주가 조회
    const yearlyResponse = await fetch(
      `${config.apiBaseUrl}?function=TIME_SERIES_MONTHLY&symbol=${ticker}&apikey=${config.apiKey}`
    );
    const yearlyData = await yearlyResponse.json();

    // 데이터 검증 및 처리
    if (quoteData['Error Message'] || yearlyData['Error Message']) {
      throw new Error('유효하지 않은 티커입니다.');
    }

    if (!quoteData['Global Quote'] || !yearlyData['Monthly Time Series']) {
      throw new Error('주가 정보를 찾을 수 없습니다.');
    }

    const currentPrice = parseFloat(quoteData['Global Quote']['05. price']);
    const yearStartDate = Object.keys(yearlyData['Monthly Time Series'])
      .find(date => date.startsWith('2024-01'));
    const startPrice = yearStartDate 
      ? parseFloat(yearlyData['Monthly Time Series'][yearStartDate]['4. close'])
      : currentPrice;
    const changeRate = ((currentPrice - startPrice) / startPrice) * 100;

    const stockData: StockData = {
      currentPrice,
      startPrice,
      changeRate: Number(changeRate.toFixed(2)),
    };

    // 캐시에 저장
    StockCache.set(cacheKey, stockData);

    return stockData;
  } catch (error) {
    console.error('API 호출 오류:', error);
    throw error;
  }
};