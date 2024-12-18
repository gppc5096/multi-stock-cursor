import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, ChartBarIcon, Briefcase } from "lucide-react";
import StockRegistrationForm from "./StockRegistrationForm";
import StockTable from "./StockTable";
import USStockBriefing from "./USStockBriefing";

const StockList = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="grid grid-cols-10 gap-6">
        {/* 주식등록 (6:4 비율의 왼쪽) */}
        <Card className="col-span-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-6 w-6 text-purple-500" />
              주식등록
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StockRegistrationForm />
          </CardContent>
        </Card>

        {/* US Stock Briefing (6:4 비율의 오른쪽) */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-purple-500" />
              US Stock Briefing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <USStockBriefing />
          </CardContent>
        </Card>

        {/* 주식현황 (전체 너비) */}
        <Card className="col-span-10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartBarIcon className="h-6 w-6 text-purple-500" />
              주식현황
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StockTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StockList;