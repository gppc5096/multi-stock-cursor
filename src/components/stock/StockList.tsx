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
    
    // 새로운 주식이 등록될 때마다 목록 갱신
    window.addEventListener('stocksChanged', loadStockData);
    return () => window.removeEventListener('stocksChanged', loadStockData);
  }, []);

  // 숫자 포맷팅 함수
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat().format(value);
  };

  return (
    <Card className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>거래일자</TableHead>
            <TableHead>구분</TableHead>
            <TableHead>종목명</TableHead>
            <TableHead className="text-right">수량</TableHead>
            <TableHead className="text-right">단가</TableHead>
            <TableHead className="text-right">매수금액</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center h-24">
                등록된 주식이 없습니다
              </TableCell>
            </TableRow>
          ) : (
            stocks.map((stock) => (
              <TableRow key={stock.id}>
                <TableCell>{stock.date}</TableCell>
                <TableCell>{stock.type === 'buy' ? '매수' : '매도'}</TableCell>
                <TableCell>{stock.stockName}</TableCell>
                <TableCell className="text-right">{formatNumber(stock.quantity)}</TableCell>
                <TableCell className="text-right">{formatNumber(stock.price)}</TableCell>
                <TableCell className="text-right">
                  {stock.country === 'USD' 
                    ? `$${formatNumber(stock.usdAmount)}`
                    : `₩${formatNumber(stock.krwAmount)}`
                  }
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default StockList;