import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const USStockBriefing = () => {
  // 실제 데이터는 API 연동 필요
  const marketIndices = [
    { name: "S&P 500", value: "4970.5", change: "+0.85", changePercent: "0.02", isUp: true },
    { name: "NASDAQ", value: "15420.2", change: "-55.30", changePercent: "-0.36", isUp: false },
    { name: "Dow Jones", value: "38500.7", change: "120.45", changePercent: "0.31", isUp: true },
  ];

  const watchlist = [
    { symbol: "AAPL", name: "Apple Inc.", price: "195.50", change: "+2.25", changePercent: "1.16", isUp: true },
    { symbol: "MSFT", name: "Microsoft Corporation", price: "345.20", change: "-3.40", changePercent: "-0.98", isUp: false },
  ];

  const exchangeRate = {
    value: "1,324.50",
    change: "-5.30",
    changePercent: "-0.40",
    isUp: false,
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* 주요 지수 */}
      <div className="grid grid-cols-3 gap-2">
        {marketIndices.map((index) => (
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
        ))}
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
      </div>
    </div>
  );
};

export default USStockBriefing;