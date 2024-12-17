import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StockTransaction } from "@/types/stock";
import { loadStocks } from "@/lib/stockStorage";

const StockList = () => {
  const [stocks, setStocks] = useState<StockTransaction[]>([]);

  const loadStockData = () => {
    const stockData = loadStocks();
    setStocks(stockData);
  };

  useEffect(() => {
    loadStockData();
    
    window.addEventListener('stocksChanged', loadStockData);
    return () => window.removeEventListener('stocksChanged', loadStockData);
  }, []);

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat().format(value);
  };

  return (
    <Card className="w-full overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[100px]">거래일자</TableHead>
              <TableHead className="min-w-[80px]">구분</TableHead>
              <TableHead className="min-w-[100px]">국가</TableHead>
              <TableHead className="min-w-[120px]">증권사</TableHead>
              <TableHead className="min-w-[150px]">종목명</TableHead>
              <TableHead className="min-w-[100px]">티커</TableHead>
              <TableHead className="min-w-[100px] text-right">수량</TableHead>
              <TableHead className="min-w-[100px] text-right">환율</TableHead>
              <TableHead className="min-w-[100px] text-right">단가</TableHead>
              <TableHead className="min-w-[120px] text-right">달러매수금</TableHead>
              <TableHead className="min-w-[120px] text-right">원화매수금</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stocks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center h-24">
                  등록된 주식이 없습니다
                </TableCell>
              </TableRow>
            ) : (
              stocks.map((stock) => (
                <TableRow key={stock.id}>
                  <TableCell>{stock.date}</TableCell>
                  <TableCell>{stock.type === 'buy' ? '매수' : '매도'}</TableCell>
                  <TableCell>{stock.country}</TableCell>
                  <TableCell>{stock.broker}</TableCell>
                  <TableCell>{stock.stockName}</TableCell>
                  <TableCell>{stock.ticker}</TableCell>
                  <TableCell className="text-right">{formatNumber(stock.quantity)}</TableCell>
                  <TableCell className="text-right">{formatNumber(stock.exchangeRate)}</TableCell>
                  <TableCell className="text-right">{formatNumber(stock.price)}</TableCell>
                  <TableCell className="text-right">
                    {stock.country === 'USD' && `$${formatNumber(stock.usdAmount)}`}
                  </TableCell>
                  <TableCell className="text-right">₩{formatNumber(stock.krwAmount)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default StockList;