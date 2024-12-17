export type SettingItem = {
  id: string;
  type: 'country' | 'broker' | 'stock';
  name: string;
  ticker?: string;
};

export type Settings = {
  countries: SettingItem[];
  brokers: SettingItem[];
  stocks: SettingItem[];
};

export const DEFAULT_SETTINGS: Settings = {
  countries: [
    { id: 'KRW', type: 'country', name: 'KRW' },
    { id: 'USD', type: 'country', name: 'USD' }
  ],
  brokers: [
    { id: '한투증권', type: 'broker', name: '한투증권' },
    { id: '키움증권', type: 'broker', name: '키움증권' },
    { id: 'NH증권', type: 'broker', name: 'NH증권' }
  ],
  stocks: DEFAULT_STOCKS.map(stock => ({
    id: stock.ticker,
    type: 'stock',
    name: stock.stockName,
    ticker: stock.ticker
  }))
};