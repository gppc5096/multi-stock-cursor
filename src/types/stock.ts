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

export const DEFAULT_STOCKS: DefaultStock[] = [
  { stockName: 'TIGER 미국S&P500', ticker: '360750' },
  { stockName: 'TIGER 미국나스닥100', ticker: '133690' },
  { stockName: 'ACE 미국빅테크TOP7PLUS', ticker: '465580' },
  { stockName: 'SPDR S&p500ETF', ticker: 'SPLG' },
  { stockName: 'NASDAQ100 QQQ ETF', ticker: 'QQQ' },
  { stockName: 'INVESCO QQQM ETF', ticker: 'QQQM' },
  { stockName: 'TEAPRQQQ', ticker: 'TQQQ' },
  { stockName: 'VANECK USD ETF', ticker: 'SMH' },
  { stockName: 'TESLA', ticker: 'TSLA' }
];