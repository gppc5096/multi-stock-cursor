import { loadStocks } from "@/lib/stockStorage";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const TickerChart = () => {
  const stocks = loadStocks();
  
  // 티커별 자산 통계 계산
  const tickerStats = stocks.reduce((acc, stock) => {
    const ticker = stock.ticker;
    if (!acc[ticker]) {
      acc[ticker] = {
        name: stock.stockName,
        krw: 0,
        usd: 0,
        quantity: 0,
      };
    }
    
    acc[ticker].krw += stock.krwAmount;
    if (stock.country === 'USD') {
      acc[ticker].usd += stock.usdAmount;
    }
    acc[ticker].quantity += stock.quantity;
    
    return acc;
  }, {} as Record<string, { name: string; krw: number; usd: number; quantity: number; }>);

  // 차트 데이터 생성
  const chartData = Object.entries(tickerStats).map(([ticker, stats]) => ({
    ticker,
    name: stats.name,
    value: stats.krw,
    quantity: stats.quantity,
    usdValue: stats.usd,
  }));

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat().format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-2 shadow-lg">
          <p className="font-semibold">{payload[0].payload.name}</p>
          <p className="text-sm">티커: {label}</p>
          <p className="text-sm">수량: {formatNumber(payload[0].payload.quantity)}</p>
          {payload[0].payload.usdValue > 0 && (
            <p className="text-sm">USD: ${formatNumber(payload[0].payload.usdValue)}</p>
          )}
          <p className="text-sm">KRW: ₩{formatNumber(payload[0].payload.value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">티커별 자산 분포</h3>
      <div className="w-full h-[400px]">
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ticker" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="value" name="자산 금액" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default TickerChart;