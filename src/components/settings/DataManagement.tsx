import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Import, Save, RefreshCw } from "lucide-react";

const DataManagement = () => {
  const handleImportStock = () => {
    // Excel 파일 가져오기 로직 추가 예정
    console.log("Import stock data");
  };

  const handleExportStock = () => {
    // Excel 파일 내보내기 로직 추가 예정
    console.log("Export stock data");
  };

  const handleImportSettings = () => {
    // JSON 파일 가져오기 로직 추가 예정
    console.log("Import settings");
  };

  const handleExportSettings = () => {
    // JSON 파일 내보내기 로직 추가 예정
    console.log("Export settings");
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
            <Button onClick={handleImportStock} variant="outline" className="justify-start">
              <Import className="mr-2 h-4 w-4" />
              Excel 파일 가져오기
            </Button>
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
            <Button onClick={handleImportSettings} variant="outline" className="justify-start">
              <Import className="mr-2 h-4 w-4" />
              JSON 파일 가져오기
            </Button>
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