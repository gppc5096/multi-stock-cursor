interface CacheItem<T> {
  data: T;
  timestamp: number;
}

interface CacheData {
  currentPrice: number;
  startPrice: number;
  changeRate: number;
}

export class StockCache {
  private static cache: Map<string, CacheItem<CacheData>> = new Map();
  private static CACHE_DURATION = 5 * 60 * 1000; // 5분

  static set<T extends CacheData>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  static get<T extends CacheData>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    const isExpired = Date.now() - item.timestamp > this.CACHE_DURATION;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  static clear(): void {
    this.cache.clear();
  }
} 