import { loadStocks } from "@/lib/stockStorage";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { calculateBrokerStats, formatNumber, calculatePercentage } from "@/lib/statisticsUtils";

const BrokerStatistics = () => {
  const stocks = loadStocks();
  const brokerStats = calculateBrokerStats(stocks);
  const totalAssets = Object.values(brokerStats).reduce((sum, { totalKRW }) => sum + totalKRW, 0);

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">증권사별 통계</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>증권사</TableHead>
            <TableHead>티커</TableHead>
            <TableHead className="text-right">수량</TableHead>
            <TableHead className="text-right">USD 합계</TableHead>
            <TableHead className="text-right">KRW 합계</TableHead>
            <TableHead className="text-right">비중(%)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(brokerStats).map(([broker, data]) => (
            <>
              {Object.entries(data.stocks).map(([ticker, stats], index) => (
                <TableRow key={`${broker}-${ticker}`}>
                  {index === 0 ? (
                    <TableCell rowSpan={Object.keys(data.stocks).length}>
                      {broker}
                    </TableCell>
                  ) : null}
                  <TableCell>{ticker}</TableCell>
                  <TableCell className="text-right">{formatNumber(stats.quantity)}</TableCell>
                  <TableCell className="text-right">
                    {stats.usdAmount > 0 ? `$${formatNumber(stats.usdAmount)}` : '-'}
                  </TableCell>
                  <TableCell className="text-right">₩{formatNumber(stats.krwAmount)}</TableCell>
                  <TableCell className="text-right">{calculatePercentage(stats.krwAmount, totalAssets)}%</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/50">
                <TableCell colSpan={2} className="font-semibold">
                  {broker} 합계
                </TableCell>
                <TableCell className="text-right">-</TableCell>
                <TableCell className="text-right font-semibold">
                  {data.totalUSD > 0 ? `$${formatNumber(data.totalUSD)}` : '-'}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  ₩{formatNumber(data.totalKRW)}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {calculatePercentage(data.totalKRW, totalAssets)}%
                </TableCell>
              </TableRow>
            </>
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

export default BrokerStatistics;