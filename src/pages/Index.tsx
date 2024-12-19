import StockList from "@/components/stock/StockList";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <StockList />
      </div>
    </div>
  );
};

export default Index;