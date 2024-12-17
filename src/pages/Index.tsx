import { Card } from "@/components/ui/card";
import StockRegistrationForm from "@/components/stock/StockRegistrationForm";
import StockList from "@/components/stock/StockList";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="container mx-auto p-6 space-y-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          {/* 왼쪽 상단: 주식등록 (7) */}
          <Card className="lg:col-span-7 p-6">
            <h2 className="text-2xl font-bold mb-4">주식등록</h2>
            <StockRegistrationForm />
          </Card>
          
          {/* 오른쪽 상단: 실시간 정보 (3) */}
          <Card className="lg:col-span-3 p-6">
            <h2 className="text-2xl font-bold mb-4">실시간 정보</h2>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              준비 중입니다
            </div>
          </Card>
          
          {/* 중앙: 주식현황 (10) */}
          <Card className="lg:col-span-10 p-6">
            <h2 className="text-2xl font-bold mb-4">주식현황</h2>
            <div className="overflow-x-auto">
              <StockList />
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;