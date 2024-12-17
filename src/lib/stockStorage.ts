import { StockTransaction } from "@/types/stock";

const STOCK_KEY = 'stock-transactions';

export const loadStocks = (): StockTransaction[] => {
  const stored = localStorage.getItem(STOCK_KEY);
  if (!stored) return [];
  return JSON.parse(stored);
};

export const saveStock = (stock: StockTransaction) => {
  const stocks = loadStocks();
  stocks.push(stock);
  localStorage.setItem(STOCK_KEY, JSON.stringify(stocks));
  window.dispatchEvent(new Event('stocksChanged'));
};