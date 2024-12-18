import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, ChartBarIcon } from "lucide-react";
import StockRegistrationForm from "./StockRegistrationForm";
import StockTable from "./StockTable";

const StockList = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
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

      <Card>
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
  );
};

export default StockList;