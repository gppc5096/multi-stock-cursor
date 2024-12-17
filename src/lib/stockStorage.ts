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

export const deleteStock = (id: string) => {
  const stocks = loadStocks();
  const filteredStocks = stocks.filter(stock => stock.id !== id);
  localStorage.setItem(STOCK_KEY, JSON.stringify(filteredStocks));
  window.dispatchEvent(new Event('stocksChanged'));
};

export const updateStock = (updatedStock: StockTransaction) => {
  const stocks = loadStocks();
  const updatedStocks = stocks.map(stock => 
    stock.id === updatedStock.id ? updatedStock : stock
  );
  localStorage.setItem(STOCK_KEY, JSON.stringify(updatedStocks));
  window.dispatchEvent(new Event('stocksChanged'));
};