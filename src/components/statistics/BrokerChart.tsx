import { loadStocks } from "@/lib/stockStorage";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const BrokerChart = () => {
  const stocks = loadStocks();
  
  // 증권사별 자산 통계 계산
  const brokerStats = stocks.reduce((acc, stock) => {
    const broker = stock.broker;
    if (!acc[broker]) {
      acc[broker] = {
        krw: 0,
        usd: 0,
      };
    }
    
    acc[broker].krw += stock.krwAmount;
    if (stock.country === 'USD') {
      acc[broker].usd += stock.usdAmount;
    }
    
    return acc;
  }, {} as Record<string, { krw: number; usd: number; }>);

  // 차트 데이터 생성
  const chartData = Object.entries(brokerStats).map(([name, { krw, usd }]) => ({
    name,
    value: krw,
    usdValue: usd,
  }));

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat().format(value);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border rounded-lg p-2 shadow-lg">
          <p className="font-semibold">{data.name}</p>
          {data.usdValue > 0 && (
            <p className="text-sm">USD: ${formatNumber(data.usdValue)}</p>
          )}
          <p className="text-sm">KRW: ₩{formatNumber(data.value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">증권사별 자산 분포</h3>
      <div className="w-full h-[400px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default BrokerChart;