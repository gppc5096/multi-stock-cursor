import { loadStocks } from "@/lib/stockStorage";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { formatNumber } from "@/lib/statisticsUtils";

const StockTable = () => {
  const stocks = loadStocks();

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-[#F1F0FB] text-[#333333]">
          <TableRow>
            <TableHead>거래일자</TableHead>
            <TableHead>구분</TableHead>
            <TableHead>국가</TableHead>
            <TableHead>증권사</TableHead>
            <TableHead>종목명</TableHead>
            <TableHead>티커</TableHead>
            <TableHead className="text-right">수량</TableHead>
            <TableHead className="text-right">환율</TableHead>
            <TableHead className="text-right">단가</TableHead>
            <TableHead className="text-right">USD 금액</TableHead>
            <TableHead className="text-right">KRW 금액</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map((stock) => (
            <TableRow key={stock.id}>
              <TableCell>{format(new Date(stock.date), 'yyyy-MM-dd')}</TableCell>
              <TableCell>{stock.type === 'buy' ? '매수' : '매도'}</TableCell>
              <TableCell>{stock.country}</TableCell>
              <TableCell>{stock.broker}</TableCell>
              <TableCell>{stock.stockName}</TableCell>
              <TableCell>{stock.ticker}</TableCell>
              <TableCell className="text-right">{formatNumber(stock.quantity)}</TableCell>
              <TableCell className="text-right">{stock.exchangeRate > 0 ? formatNumber(stock.exchangeRate) : '-'}</TableCell>
              <TableCell className="text-right">{formatNumber(stock.price)}</TableCell>
              <TableCell className="text-right">{stock.usdAmount > 0 ? `$${formatNumber(stock.usdAmount)}` : '-'}</TableCell>
              <TableCell className="text-right">₩{formatNumber(stock.krwAmount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StockTable;