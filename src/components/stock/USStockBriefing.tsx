import { Card, CardContent } from "@/components/ui/card";

const USStockBriefing = () => {
  return (
    <div className="space-y-4 h-full flex flex-col">
      <div>
        <h3 className="text-lg font-semibold">US Stock Searching</h3>
        <p className="text-sm text-muted-foreground italic mt-2">
          "10년 이상 보유하지 않으려면 단 10분도 보유하지 마라. -워런 버핏-"
        </p>
      </div>
    </div>
  );
};

export default USStockBriefing;