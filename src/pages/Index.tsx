import { Card } from "@/components/ui/card";
import StockRegistrationForm from "@/components/stock/StockRegistrationForm";

const Index = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">주식등록</h2>
          <StockRegistrationForm />
        </Card>
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">주식현황</h2>
          {/* Stock list will be added here */}
        </Card>
      </div>
    </div>
  );
};

export default Index;