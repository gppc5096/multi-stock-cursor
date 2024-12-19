import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchMarketIndices, fetchExchangeRate } from "@/lib/stockApi";
import { MarketIndex, ExchangeRate } from "@/types/stock";

const USStockBriefing = () => {
  const { data: marketIndices, isLoading: isLoadingIndices } = useQuery({
    queryKey: ['marketIndices'],
    queryFn: fetchMarketIndices,
    refetchInterval: 60000, // 1분마다 갱신
  });

  const { data: exchangeRate, isLoading: isLoadingExchangeRate } = useQuery({
    queryKey: ['exchangeRate'],
    queryFn: fetchExchangeRate,
    refetchInterval: 60000,
  });

  const watchlist = [
    { symbol: "AAPL", name: "Apple Inc.", price: "195.50", change: "+2.25", changePercent: "1.16", isUp: true },
    { symbol: "MSFT", name: "Microsoft Corporation", price: "345.20", change: "-3.40", changePercent: "-0.98", isUp: false },
  ];

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* 주요 지수 */}
      <div className="grid grid-cols-3 gap-2">
        {isLoadingIndices ? (
          <div className="col-span-3 text-center">로딩 중...</div>
        ) : (
          marketIndices?.map((index) => (
            <div
              key={index.name}
              className={cn(
                "p-2 rounded-lg",
                index.isUp ? "bg-green-50" : "bg-red-50"
              )}
            >
              <div className="text-sm font-semibold">{index.name}</div>
              <div className="text-lg font-bold">{index.value}</div>
              <div className={cn(
                "text-sm flex items-center gap-1",
                index.isUp ? "text-green-600" : "text-red-600"
              )}>
                {index.isUp ? <ArrowUpIcon className="w-3 h-3" /> : <ArrowDownIcon className="w-3 h-3" />}
                {index.change} ({index.changePercent}%)
              </div>
            </div>
          ))
        )}
      </div>

      {/* 관심 종목 */}
      <div className="flex-1">
        <div className="text-lg font-semibold mb-2">관심 종목</div>
        <div className="space-y-2">
          {watchlist.map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{stock.symbol}</span>
                  <XIcon className="w-4 h-4 text-gray-400 cursor-pointer" />
                </div>
                <div className="text-sm text-gray-600">{stock.name}</div>
              </div>
              <div className="text-right">
                <div className="font-bold">${stock.price}</div>
                <div className={cn(
                  "text-sm",
                  stock.isUp ? "text-green-600" : "text-red-600"
                )}>
                  {stock.change} ({stock.changePercent}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 실시간 환율 정보 */}
      <div className="border-t pt-4">
        <div className="text-lg font-semibold mb-2">실시간 환율 (USD/KRW)</div>
        {isLoadingExchangeRate ? (
          <div className="text-center">로딩 중...</div>
        ) : exchangeRate && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="text-xl font-bold">₩{exchangeRate.value}</div>
            <div className={cn(
              "flex items-center gap-1",
              exchangeRate.isUp ? "text-green-600" : "text-red-600"
            )}>
              {exchangeRate.isUp ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />}
              {exchangeRate.change} ({exchangeRate.changePercent}%)
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default USStockBriefing;