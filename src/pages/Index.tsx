import StockList from "@/components/stock/StockList";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <StockList />
      </div>
      <Footer />
    </div>
  );
};

export default Index;