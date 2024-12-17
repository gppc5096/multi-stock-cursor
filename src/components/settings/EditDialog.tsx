import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { SettingItem } from "@/types/settings";
import { loadSettings, saveSettings } from "@/lib/storage";
import { useToast } from "@/components/ui/use-toast";

interface EditDialogProps {
  item: SettingItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const EditDialog = ({ item, open, onOpenChange, onSuccess }: EditDialogProps) => {
  const [name, setName] = useState(item?.name || "");
  const [ticker, setTicker] = useState(item?.ticker || "");
  const { toast } = useToast();

  // 입력값을 변환하는 함수
  const transformInput = (value: string) => {
    const koreanPattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const alphaNumericPattern = /[a-zA-Z0-9\s]/;
    
    return value
      .split('')
      .filter(char => koreanPattern.test(char) || alphaNumericPattern.test(char))
      .join('')
      .toUpperCase();
  };

  const handleSave = () => {
    if (!item) return;

    if (!name) {
      toast({
        title: "오류",
        description: "이름을 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    if (item.type === "stock" && !ticker) {
      toast({
        title: "오류",
        description: "티커를 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    const settings = loadSettings();
    const list = item.type === "country" ? settings.countries :
                item.type === "broker" ? settings.brokers :
                settings.stocks;

    const index = list.findIndex(i => i.id === item.id);
    if (index !== -1) {
      list[index] = {
        ...item,
        name,
        ...(item.type === "stock" && { ticker })
      };

      saveSettings(settings);
      
      toast({
        title: "수정 완료",
        description: `${item.type}: ${name}${ticker ? ` (${ticker})` : ''}`,
      });
      
      onSuccess();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>항목 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>
              {item?.type === "country"
                ? "국가명"
                : item?.type === "broker"
                ? "증권사명"
                : "종목명"}
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(transformInput(e.target.value))}
              placeholder={
                item?.type === "country"
                  ? "예: KRW, USD"
                  : item?.type === "broker"
                  ? "예: 한투증권"
                  : "예: TIGER 미국S&P500"
              }
            />
          </div>
          {item?.type === "stock" && (
            <div className="space-y-2">
              <Label>티커</Label>
              <Input
                value={ticker}
                onChange={(e) => setTicker(transformInput(e.target.value))}
                placeholder="예: 360750"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button onClick={handleSave}>저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;