import { loadStocks } from "@/lib/stockStorage";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TickerStatistics = () => {
  const stocks = loadStocks();
  
  // 티커별 자산 통계 계산
  const tickerStats = stocks.reduce((acc, stock) => {
    const ticker = stock.ticker;
    if (!acc[ticker]) {
      acc[ticker] = {
        stockName: stock.stockName,
        quantity: 0,
        krwAmount: 0,
        usdAmount: 0,
      };
    }
    
    acc[ticker].quantity += stock.quantity;
    acc[ticker].krwAmount += stock.krwAmount;
    if (stock.country === 'USD') {
      acc[ticker].usdAmount += stock.usdAmount;
    }
    
    return acc;
  }, {} as Record<string, {
    stockName: string;
    quantity: number;
    krwAmount: number;
    usdAmount: number;
  }>);

  const totalAssets = Object.values(tickerStats).reduce((sum, { krwAmount }) => sum + krwAmount, 0);

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat().format(value);
  };

  const calculatePercentage = (amount: number) => {
    return ((amount / totalAssets) * 100).toFixed(2);
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">티커별 통계</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>티커</TableHead>
            <TableHead>종목명</TableHead>
            <TableHead className="text-right">수량</TableHead>
            <TableHead className="text-right">USD 합계</TableHead>
            <TableHead className="text-right">KRW 합계</TableHead>
            <TableHead className="text-right">비중(%)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(tickerStats).map(([ticker, stats]) => (
            <TableRow key={ticker}>
              <TableCell>{ticker}</TableCell>
              <TableCell>{stats.stockName}</TableCell>
              <TableCell className="text-right">{formatNumber(stats.quantity)}</TableCell>
              <TableCell className="text-right">
                {stats.usdAmount > 0 ? `$${formatNumber(stats.usdAmount)}` : '-'}
              </TableCell>
              <TableCell className="text-right">₩{formatNumber(stats.krwAmount)}</TableCell>
              <TableCell className="text-right">{calculatePercentage(stats.krwAmount)}%</TableCell>
            </TableRow>
          ))}
          <TableRow className="font-semibold">
            <TableCell colSpan={3}>총 합계</TableCell>
            <TableCell className="text-right">-</TableCell>
            <TableCell className="text-right">₩{formatNumber(totalAssets)}</TableCell>
            <TableCell className="text-right">100%</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export default TickerStatistics;