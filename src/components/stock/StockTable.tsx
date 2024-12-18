import { loadStocks, deleteStock } from "@/lib/stockStorage";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { formatNumber } from "@/lib/statisticsUtils";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import EditStockDialog from "./EditStockDialog";
import { useToast } from "@/components/ui/use-toast";
import { StockTransaction } from "@/types/stock";

const StockTable = () => {
  const [stocks, setStocks] = useState(loadStocks());
  const [selectedStock, setSelectedStock] = useState<StockTransaction | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { toast } = useToast();

  // 주식 데이터 변경 감지
  useEffect(() => {
    const handleStocksChange = () => {
      setStocks(loadStocks());
    };

    window.addEventListener('stocksChanged', handleStocksChange);
    return () => window.removeEventListener('stocksChanged', handleStocksChange);
  }, []);

  const handleEdit = (stock: StockTransaction) => {
    setSelectedStock(stock);
    setEditDialogOpen(true);
  };

  const handleDelete = (stock: StockTransaction) => {
    deleteStock(stock.id);
    toast({
      title: "삭제 완료",
      description: `${stock.stockName} 주식이 삭제되었습니다.`,
    });
  };

  return (
    <>
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
              <TableHead className="text-center">관리</TableHead>
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
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(stock)}
                      className="h-8 w-8"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(stock)}
                      className="h-8 w-8 text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <EditStockDialog
        stock={selectedStock}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSuccess={() => setEditDialogOpen(false)}
      />
    </>
  );
};

export default StockTable;