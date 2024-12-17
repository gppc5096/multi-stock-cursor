import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { DEFAULT_STOCKS } from "@/types/stock";

const SettingsTable = () => {
  const handleEdit = (id: string) => {
    // 수정 로직 추가 예정
    console.log("Edit:", id);
  };

  const handleDelete = (id: string) => {
    // 삭제 로직 추가 예정
    console.log("Delete:", id);
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>구분</TableHead>
            <TableHead>이름</TableHead>
            <TableHead>티커</TableHead>
            <TableHead className="w-[100px]">관리</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* 국가 */}
          {["KRW", "USD"].map((country) => (
            <TableRow key={country}>
              <TableCell>국가</TableCell>
              <TableCell>{country}</TableCell>
              <TableCell>-</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(country)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(country)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}

          {/* 증권사 */}
          {["한투증권", "키움증권", "NH증권"].map((broker) => (
            <TableRow key={broker}>
              <TableCell>증권사</TableCell>
              <TableCell>{broker}</TableCell>
              <TableCell>-</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(broker)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(broker)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}

          {/* 주식 */}
          {DEFAULT_STOCKS.map((stock) => (
            <TableRow key={stock.ticker}>
              <TableCell>종목</TableCell>
              <TableCell>{stock.stockName}</TableCell>
              <TableCell>{stock.ticker}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(stock.ticker)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(stock.ticker)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SettingsTable;