import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CountryStatistics from "@/components/statistics/CountryStatistics";
import BrokerStatistics from "@/components/statistics/BrokerStatistics";
import TickerStatistics from "@/components/statistics/TickerStatistics";
import BrokerChart from "@/components/statistics/BrokerChart";
import TickerChart from "@/components/statistics/TickerChart";

const Statistics = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">리스트 통계</h2>
          <div className="space-y-6">
            <CountryStatistics />
            <BrokerStatistics />
            <TickerStatistics />
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">차트 통계</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BrokerChart />
            <TickerChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;