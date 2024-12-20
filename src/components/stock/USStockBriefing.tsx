import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { fetchStockData } from "@/lib/stockApi";

interface StockPrice {
  id: string;
  ticker: string;
  startPrice: number;
  currentPrice: number;
  changeRate: number;
  searchDate: string;
}

const USStockBriefing = () => {
  const [searchTicker, setSearchTicker] = useState("");
  const [stockList, setStockList] = useState<StockPrice[]>([]);
  const [showLimitAlert, setShowLimitAlert] = useState(false);
  const { toast } = useToast();

  // localStorage에서 데이터 로드
  useEffect(() => {
    const savedStocks = localStorage.getItem('usStockPrices');
    if (savedStocks) {
      setStockList(JSON.parse(savedStocks));
    }
  }, []);

  // 주식 데이터 저장
  const saveStockData = (data: StockPrice[]) => {
    localStorage.setItem('usStockPrices', JSON.stringify(data));
    setStockList(data);
  };

  // Alpha Vantage API를 사용한 실시간 주가 조회
  const fetchStockPrice = async (ticker: string) => {
    try {
      const stockData = await fetchStockData(ticker);
      
      return {
        id: crypto.randomUUID(),
        ticker: ticker.toUpperCase(),
        ...stockData,
        searchDate: new Date().toISOString(),
      };
    } catch (error) {
      console.error('API 호출 오류:', error);
      throw new Error(error instanceof Error ? error.message : '주가 정보를 가져오는데 실패했습니다.');
    }
  };

  // 검색 핸들러
  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTicker.trim()) {
      if (stockList.length >= 5) {
        setShowLimitAlert(true);
        return;
      }

      try {
        const stockData = await fetchStockPrice(searchTicker);
        
        // 이미 존재하는 티커인지 확인
        if (stockList.some(stock => stock.ticker === stockData.ticker)) {
          toast({
            title: "중복 검색",
            description: "이미 검색된 티커입니다.",
            variant: "destructive",
          });
          return;
        }

        const updatedList = [stockData, ...stockList].slice(0, 5);
        saveStockData(updatedList);
        
        toast({
          title: "검색 완료",
          description: `${stockData.ticker} 주가 정보가 업데이트되었습니다.`,
        });
        
        setSearchTicker("");
      } catch (error) {
        toast({
          title: "검색 실패",
          description: error instanceof Error ? error.message : "주가 정보를 가져오는데 실패했습니다.",
          variant: "destructive",
        });
      }
    }
  };

  // 삭제 핸들러 추가
  const handleDelete = (id: string) => {
    try {
      const updatedList = stockList.filter(stock => stock.id !== id);
      saveStockData(updatedList);
      
      toast({
        title: "삭제 완료",
        description: "선택한 항목이 삭제되었습니다.",
      });
    } catch (error) {
      toast({
        title: "삭제 실패",
        description: "항목을 삭제하는데 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div>
        <h3 className="text-lg font-semibold">US Stock Searching</h3>
        <p className="text-sm text-muted-foreground italic mt-2 text-center">
          <span style={{color: "#b02d0c"}}>"10년 이상 보유하지 않으려면 단 10분도 보유하지 마라. -워런 버핏-"</span>
        </p>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="티커명을 입력하세요 (예: AAPL)"
          value={searchTicker}
          onChange={(e) => setSearchTicker(e.target.value.toUpperCase())}
          onKeyPress={handleSearch}
          style={{borderColor: "#3d3df5"}}
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">No.</TableHead>
              <TableHead>티커</TableHead>
              <TableHead className="text-right">년초주가</TableHead>
              <TableHead className="text-right">현재주가</TableHead>
              <TableHead className="text-right">등락률</TableHead>
              <TableHead className="w-[100px] text-center">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockList.map((stock, index) => (
              <TableRow key={stock.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{stock.ticker}</TableCell>
                <TableCell className="text-right">${stock.startPrice.toFixed(2)}</TableCell>
                <TableCell className="text-right">${stock.currentPrice.toFixed(2)}</TableCell>
                <TableCell className={`text-right ${stock.changeRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stock.changeRate >= 0 ? '+' : ''}{stock.changeRate}%
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(stock.id)}
                    className="h-8 w-8 text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={showLimitAlert} onOpenChange={setShowLimitAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>검색 제한</AlertDialogTitle>
            <AlertDialogDescription>
              티커 검색은 5개까지 가능합니다.
              추가 검색을 위해서는 기존 항목을 삭제해주세요.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowLimitAlert(false)}>
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default USStockBriefing;