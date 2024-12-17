import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { loadSettings } from "@/lib/storage";
import { Settings } from "@/types/settings";
import { format } from "date-fns";

const StockRegistrationForm = () => {
  const [settings, setSettings] = useState<Settings>(loadSettings());
  const [formData, setFormData] = useState({
    date: format(new Date(), "yyyy-MM-dd"),
    type: "",
    country: "",
    broker: "",
    stockName: "",
    ticker: "",
    quantity: "",
    exchangeRate: "",
    price: "",
    usdAmount: "",
    krwAmount: "",
  });

  // 설정 변경 감지
  useEffect(() => {
    const handleSettingsChange = () => {
      setSettings(loadSettings());
    };

    window.addEventListener('settingsChanged', handleSettingsChange);
    return () => window.removeEventListener('settingsChanged', handleSettingsChange);
  }, []);

  // 숫자 입력 처리 함수
  const handleNumberInput = (value: string, field: string) => {
    // 숫자와 소수점만 허용
    const cleanValue = value.replace(/[^\d.]/g, '');
    setFormData(prev => ({
      ...prev,
      [field]: cleanValue
    }));
  };

  // 천단위 구분 기호 포맷팅
  const formatNumber = (value: string) => {
    if (!value) return "";
    const number = parseFloat(value);
    return new Intl.NumberFormat().format(number);
  };

  // 금액 계산
  const calculateAmounts = (
    quantity: string,
    price: string,
    exchangeRate: string,
    country: string
  ) => {
    const qty = parseFloat(quantity) || 0;
    const prc = parseFloat(price) || 0;
    const rate = parseFloat(exchangeRate) || 0;

    if (country === "USD") {
      const usdAmount = (qty * prc).toString();
      const krwAmount = (qty * prc * rate).toString();
      setFormData(prev => ({
        ...prev,
        usdAmount,
        krwAmount
      }));
    } else if (country === "KRW") {
      const krwAmount = (qty * prc).toString();
      setFormData(prev => ({
        ...prev,
        usdAmount: "0",
        krwAmount
      }));
    }
  };

  // 종목 선택 시 티커 자동 설정
  const handleStockSelect = (stockName: string) => {
    const stock = settings.stocks.find(s => s.name === stockName);
    setFormData(prev => ({
      ...prev,
      stockName,
      ticker: stock?.ticker || ""
    }));
  };

  // 입력값 변경 시 금액 재계산
  useEffect(() => {
    calculateAmounts(
      formData.quantity,
      formData.price,
      formData.exchangeRate,
      formData.country
    );
  }, [formData.quantity, formData.price, formData.exchangeRate, formData.country]);

  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>거래일자</Label>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
          />
        </div>

        <div>
          <Label>구분</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="구분 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="buy">매수</SelectItem>
              <SelectItem value="sell">매도</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>국가</Label>
          <Select value={formData.country} onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="국가 선택" />
            </SelectTrigger>
            <SelectContent>
              {settings.countries.map((country) => (
                <SelectItem key={country.id} value={country.id}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>증권사</Label>
          <Select value={formData.broker} onValueChange={(value) => setFormData(prev => ({ ...prev, broker: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="증권사 선택" />
            </SelectTrigger>
            <SelectContent>
              {settings.brokers.map((broker) => (
                <SelectItem key={broker.id} value={broker.id}>
                  {broker.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>종목명</Label>
          <Select value={formData.stockName} onValueChange={handleStockSelect}>
            <SelectTrigger>
              <SelectValue placeholder="종목 선택" />
            </SelectTrigger>
            <SelectContent>
              {settings.stocks.map((stock) => (
                <SelectItem key={stock.id} value={stock.name}>
                  {stock.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>티커명</Label>
          <Input value={formData.ticker} readOnly />
        </div>

        <div>
          <Label>매수수량</Label>
          <Input
            value={formData.quantity}
            onChange={(e) => handleNumberInput(e.target.value, 'quantity')}
            placeholder="0"
          />
          <div className="text-sm text-right text-gray-500 mt-1">
            {formatNumber(formData.quantity)}
          </div>
        </div>

        <div>
          <Label>매수환율</Label>
          <Input
            value={formData.exchangeRate}
            onChange={(e) => handleNumberInput(e.target.value, 'exchangeRate')}
            placeholder="0"
          />
          <div className="text-sm text-right text-gray-500 mt-1">
            {formatNumber(formData.exchangeRate)}
          </div>
        </div>

        <div>
          <Label>매수단가</Label>
          <Input
            value={formData.price}
            onChange={(e) => handleNumberInput(e.target.value, 'price')}
            placeholder="0"
          />
        </div>

        <div>
          <Label>달러매수금</Label>
          <Input value={formatNumber(formData.usdAmount)} readOnly />
        </div>

        <div>
          <Label>원화매수금</Label>
          <Input value={formatNumber(formData.krwAmount)} readOnly />
        </div>
      </div>

      <Button type="submit" className="w-full">
        등록하기
      </Button>
    </form>
  );
};

export default StockRegistrationForm;