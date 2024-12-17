import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type SettingType = "country" | "broker" | "stock";

const SettingsForm = () => {
  const [type, setType] = useState<SettingType>("country");
  const [name, setName] = useState("");
  const [ticker, setTicker] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 여기에 데이터 저장 로직 추가 예정
    toast({
      title: "항목이 추가되었습니다.",
      description: `${type}: ${name}${ticker ? ` (${ticker})` : ''}`,
    });
    
    // 폼 초기화
    setName("");
    setTicker("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="type">항목 유형</Label>
          <Select value={type} onValueChange={(value: SettingType) => setType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="항목 유형 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="country">국가</SelectItem>
              <SelectItem value="broker">증권사</SelectItem>
              <SelectItem value="stock">종목</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className={type === "stock" ? "md:col-span-2" : "md:col-span-3"}>
          <Label htmlFor="name">
            {type === "country" ? "국가명" : type === "broker" ? "증권사명" : "종목명"}
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={
              type === "country" ? "예: KRW, USD" : 
              type === "broker" ? "예: 한투증권" : 
              "예: TIGER 미국S&P500"
            }
          />
        </div>

        {type === "stock" && (
          <div>
            <Label htmlFor="ticker">티커</Label>
            <Input
              id="ticker"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              placeholder="예: 360750"
            />
          </div>
        )}
      </div>

      <Button type="submit" className="w-full md:w-auto">
        <Plus className="w-4 h-4 mr-2" />
        추가하기
      </Button>
    </form>
  );
};

export default SettingsForm;