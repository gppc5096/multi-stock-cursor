import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StockTransaction } from "@/types/stock";

const StockList = () => {
  // 임시 데이터 (나중에 실제 데이터로 교체)
  const stocks: StockTransaction[] = [];

  return (
    <Card className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>거래일자</TableHead>
            <TableHead>구분</TableHead>
            <TableHead>종목명</TableHead>
            <TableHead>수량</TableHead>
            <TableHead>단가</TableHead>
            <TableHead>매수금액</TableHead>
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
                <TableCell>{stock.quantity}</TableCell>
                <TableCell>{stock.price}</TableCell>
                <TableCell>
                  {stock.country === 'USD' 
                    ? `$${stock.usdAmount}`
                    : `₩${stock.krwAmount}`
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