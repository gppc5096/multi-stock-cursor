export type StockTransaction = {
  id: string;
  date: string;
  type: 'buy' | 'sell';
  country: 'KRW' | 'USD';
  broker: string;
  stockName: string;
  ticker: string;
  quantity: number;
  exchangeRate: number;
  price: number;
  usdAmount: number;
  krwAmount: number;
};

export type DefaultStock = {
  stockName: string;
  ticker: string;
};

export type MarketIndex = {
  name: string;
  value: string;
  change: string;
  changePercent: string;
  isUp: boolean;
};

export type ExchangeRate = {
  value: string;
  change: string;
  changePercent: string;
  isUp: boolean;
};

export type StockQuote = {
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
  isUp: boolean;
};
