import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BrokerStatistics from "@/components/statistics/BrokerStatistics";
import CountryStatistics from "@/components/statistics/CountryStatistics";
import TickerStatistics from "@/components/statistics/TickerStatistics";
import { PieChart, BarChart2, LineChart } from "lucide-react";

const Statistics = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-6 w-6 text-purple-500" />
            증권사별 통계
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BrokerStatistics />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart2 className="h-6 w-6 text-purple-500" />
            국가별 통계
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CountryStatistics />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-6 w-6 text-purple-500" />
            종목별 통계
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TickerStatistics />
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;