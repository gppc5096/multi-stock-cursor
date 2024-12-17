import { Card } from "@/components/ui/card";

const Statistics = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">통계 리스트</h2>
          {/* Statistics lists will be added here */}
        </Card>
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">통계 차트</h2>
          {/* Statistics charts will be added here */}
        </Card>
      </div>
    </div>
  );
};

export default Statistics;