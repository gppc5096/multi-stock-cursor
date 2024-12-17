import { loadStocks } from "@/lib/stockStorage";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const CountryStatistics = () => {
  const stocks = loadStocks();
  
  // 국가별 자산 합계 계산
  const countryTotals = stocks.reduce((acc, stock) => {
    const country = stock.country;
    if (!acc[country]) {
      acc[country] = {
        krwAmount: 0,
        usdAmount: 0,
      };
    }
    
    if (country === 'KRW') {
      acc[country].krwAmount += stock.krwAmount;
    } else {
      acc[country].usdAmount += stock.usdAmount;
      acc[country].krwAmount += stock.krwAmount;
    }
    
    return acc;
  }, {} as Record<string, { krwAmount: number; usdAmount: number; }>);

  // 총 합계 계산
  const totalKRW = Object.values(countryTotals).reduce((sum, { krwAmount }) => sum + krwAmount, 0);

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat().format(value);
  };

  const calculatePercentage = (amount: number) => {
    return ((amount / totalKRW) * 100).toFixed(2);
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">국가별 통계</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>국가</TableHead>
            <TableHead className="text-right">USD 합계</TableHead>
            <TableHead className="text-right">KRW 합계</TableHead>
            <TableHead className="text-right">비중(%)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(countryTotals).map(([country, { krwAmount, usdAmount }]) => (
            <TableRow key={country}>
              <TableCell>{country}</TableCell>
              <TableCell className="text-right">
                {country === 'USD' ? `$${formatNumber(usdAmount)}` : '-'}
              </TableCell>
              <TableCell className="text-right">₩{formatNumber(krwAmount)}</TableCell>
              <TableCell className="text-right">{calculatePercentage(krwAmount)}%</TableCell>
            </TableRow>
          ))}
          <TableRow className="font-semibold">
            <TableCell>총 합계</TableCell>
            <TableCell className="text-right">-</TableCell>
            <TableCell className="text-right">₩{formatNumber(totalKRW)}</TableCell>
            <TableCell className="text-right">100%</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export default CountryStatistics;