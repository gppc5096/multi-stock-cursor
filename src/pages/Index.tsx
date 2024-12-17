import StockRegistrationForm from "@/components/stock/StockRegistrationForm";
import StockList from "@/components/stock/StockList";

const Index = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <StockRegistrationForm />
      <StockList />
    </div>
  );
};

export default Index;