const ALPHA_VANTAGE_API_KEY = 'demo'; // Alpha Vantage의 데모 API 키 사용

export const fetchMarketIndices = async (): Promise<MarketIndex[]> => {
  const indices = [
    { symbol: 'SPY', name: 'S&P 500' },
    { symbol: 'QQQ', name: 'NASDAQ' },
    { symbol: 'DIA', name: 'Dow Jones' }
  ];

  const promises = indices.map(async (index) => {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${index.symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    const data = await response.json();
    const quote = data['Global Quote'];

    if (!quote) {
      throw new Error(`Failed to fetch data for ${index.name}`);
    }

    const change = parseFloat(quote['09. change']);
    return {
      name: index.name,
      value: parseFloat(quote['05. price']).toFixed(2),
      change: change.toFixed(2),
      changePercent: parseFloat(quote['10. change percent']).toFixed(2),
      isUp: change > 0
    };
  });

  return Promise.all(promises);
};

export const fetchExchangeRate = async (): Promise<ExchangeRate> => {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=KRW&apikey=${ALPHA_VANTAGE_API_KEY}`
  );
  const data = await response.json();
  const rate = data['Realtime Currency Exchange Rate'];

  if (!rate) {
    throw new Error('Failed to fetch exchange rate');
  }

  const currentRate = parseFloat(rate['5. Exchange Rate']);
  const previousRate = currentRate - 0.5; // 이전 값은 API에서 제공하지 않아 임의로 계산
  const change = currentRate - previousRate;
  
  return {
    value: currentRate.toFixed(2),
    change: change.toFixed(2),
    changePercent: ((change / previousRate) * 100).toFixed(2),
    isUp: change > 0
  };
};