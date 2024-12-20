import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface StockPrice {
  id: string;
  ticker: string;
  startPrice: number;  // 년초 주가
  currentPrice: number;  // 현재 주가
  changeRate: number;  // 등락률
  searchDate: string;  // 검색 날짜
}

const USStockBriefing = () => {
  const [searchTicker, setSearchTicker] = useState("");
  const [stockList, setStockList] = useState<StockPrice[]>([]);
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

  // 임시 API 호출 함수 (실제로는 실제 API로 대체해야 함)
  const fetchStockPrice = async (ticker: string) => {
    // 임시로 랜덤 가격 생성
    const mockCurrentPrice = Math.floor(Math.random() * 1000) + 100;
    const mockStartPrice = Math.floor(Math.random() * 1000) + 100;
    const changeRate = ((mockCurrentPrice - mockStartPrice) / mockStartPrice) * 100;

    return {
      id: crypto.randomUUID(),
      ticker: ticker.toUpperCase(),
      startPrice: mockStartPrice,
      currentPrice: mockCurrentPrice,
      changeRate: Number(changeRate.toFixed(2)),
      searchDate: new Date().toISOString(),
    };
  };

  // 검색 핸들러
  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTicker.trim()) {
      try {
        const stockData = await fetchStockPrice(searchTicker);
        const updatedList = [stockData, ...stockList].slice(0, 10); // 최근 10개만 유지
        saveStockData(updatedList);
        
        toast({
          title: "검색 완료",
          description: `${searchTicker.toUpperCase()} 주가 정보가 업데이트되었습니다.`,
        });
        
        setSearchTicker("");
      } catch (error) {
        toast({
          title: "검색 실패",
          description: "주가 정보를 가져오는데 실패했습니다.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div>
        <h3 className="text-lg font-semibold">US Stock Searching</h3>
        <p className="text-sm text-muted-foreground italic mt-2">
          "10년 이상 보유하지 않으려면 단 10분도 보유하지 마라. -워런 버핏-"
        </p>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="티커명을 입력하세요 (예: AAPL)"
          value={searchTicker}
          onChange={(e) => setSearchTicker(e.target.value.toUpperCase())}
          onKeyPress={handleSearch}
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">번호</TableHead>
              <TableHead>티커</TableHead>
              <TableHead className="text-right">년초주가</TableHead>
              <TableHead className="text-right">현재주가</TableHead>
              <TableHead className="text-right">등락률</TableHead>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default USStockBriefing;