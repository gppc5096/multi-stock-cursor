import { MarketIndex, ExchangeRate } from "@/types/stock";

const ALPHA_VANTAGE_API_KEY = 'demo'; // Alpha Vantage의 데모 API 키 사용

export const fetchMarketIndices = async (): Promise<MarketIndex[]> => {
  // 데모 API 키의 제한으로 인해 임시 데이터 반환
  return [
    {
      name: 'S&P 500',
      value: '4,783.83',
      change: '+25.32',
      changePercent: '0.53',
      isUp: true
    },
    {
      name: 'NASDAQ',
      value: '15,055.65',
      change: '+80.12',
      changePercent: '0.53',
      isUp: true
    },
    {
      name: 'Dow Jones',
      value: '37,656.52',
      change: '+142.78',
      changePercent: '0.38',
      isUp: true
    }
  ];
};

export const fetchExchangeRate = async (): Promise<ExchangeRate> => {
  // 데모 API 키의 제한으로 인해 임시 데이터 반환
  return {
    value: '1,297.50',
    change: '+3.50',
    changePercent: '0.27',
    isUp: true
  };
};