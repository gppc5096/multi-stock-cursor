import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Import, Save, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { loadSettings, saveSettings } from "@/lib/storage";
import { loadStocks } from "@/lib/stockStorage";
import * as XLSX from 'xlsx';
import { StockTransaction } from "@/types/stock";

const DataManagement = () => {
  const { toast } = useToast();

  const handleImportStock = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      // id가 없는 데이터에 대해 새로운 id 생성
      const processedData = jsonData.map((item: any) => ({
        ...item,
        id: item.id || crypto.randomUUID(),
        // 숫자 데이터 타입 보장
        quantity: Number(item.quantity) || 0,
        exchangeRate: Number(item.exchangeRate) || 0,
        price: Number(item.price) || 0,
        usdAmount: Number(item.usdAmount) || 0,
        krwAmount: Number(item.krwAmount) || 0,
      })) as StockTransaction[];
      
      console.log("Processed stock data:", processedData);
      
      toast({
        title: "가져오기 성공",
        description: "주식 데이터를 성공적으로 가져왔습니다.",
      });
    } catch (error) {
      console.error("Import error:", error);
      toast({
        title: "가져오기 실패",
        description: "파일을 처리하는 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
    e.target.value = '';
  };

  const handleExportStock = () => {
    try {
      const stocks = loadStocks();
      const worksheet = XLSX.utils.json_to_sheet(stocks);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Stocks");
      
      XLSX.writeFile(workbook, "stock_data.xlsx");
      
      toast({
        title: "내보내기 성공",
        description: "주식 데이터를 성공적으로 내보냈습니다.",
      });
    } catch (error) {
      toast({
        title: "내보내기 실패",
        description: "파일을 생성하는 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleImportSettings = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const settings = JSON.parse(text);
      saveSettings(settings);
      
      toast({
        title: "가져오기 성공",
        description: "설정 데이터를 성공적으로 가져왔습니다.",
      });
      
      // 설정 테이블 새로고침
      window.dispatchEvent(new Event('settingsChanged'));
    } catch (error) {
      toast({
        title: "가져오기 실패",
        description: "파일을 처리하는 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
    e.target.value = '';
  };

  const handleExportSettings = () => {
    try {
      const settings = loadSettings();
      const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'settings.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "내보내기 성공",
        description: "설정 데이터를 성공적으로 내보냈습니다.",
      });
    } catch (error) {
      toast({
        title: "내보내기 실패",
        description: "파일을 생성하는 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    // 초기화 로직 추가 예정
    console.log("Reset all data");
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardContent className="pt-6">
          <h4 className="text-sm font-semibold mb-4">주식 데이터 관리 (Excel)</h4>
          <div className="flex flex-col space-y-2">
            <div>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleImportStock}
                className="hidden"
                id="stockFileInput"
              />
              <Button
                onClick={() => document.getElementById('stockFileInput')?.click()}
                variant="outline"
                className="w-full justify-start"
              >
                <Import className="mr-2 h-4 w-4" />
                Excel 파일 가져오기
              </Button>
            </div>
            <Button onClick={handleExportStock} variant="outline" className="justify-start">
              <Save className="mr-2 h-4 w-4" />
              Excel 파일 내보내기
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h4 className="text-sm font-semibold mb-4">설정 데이터 관리 (JSON)</h4>
          <div className="flex flex-col space-y-2">
            <div>
              <input
                type="file"
                accept=".json"
                onChange={handleImportSettings}
                className="hidden"
                id="settingsFileInput"
              />
              <Button
                onClick={() => document.getElementById('settingsFileInput')?.click()}
                variant="outline"
                className="w-full justify-start"
              >
                <Import className="mr-2 h-4 w-4" />
                JSON 파일 가져오기
              </Button>
            </div>
            <Button onClick={handleExportSettings} variant="outline" className="justify-start">
              <Save className="mr-2 h-4 w-4" />
              JSON 파일 내보내기
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardContent className="pt-6">
          <h4 className="text-sm font-semibold mb-4">데이터 초기화</h4>
          <Button onClick={handleReset} variant="destructive" className="w-full justify-center">
            <RefreshCw className="mr-2 h-4 w-4" />
            모든 데이터 초기화
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataManagement;
