import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SettingsForm from "@/components/settings/SettingsForm";
import SettingsTable from "@/components/settings/SettingsTable";
import DataManagement from "@/components/settings/DataManagement";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, ListPlus, Database } from "lucide-react";

const Settings = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-6 w-6 text-purple-500" />
            설정
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <ListPlus className="h-5 w-5 text-purple-500" />
              신규 항목 등록
            </h3>
            <SettingsForm />
          </div>
          
          <Separator className="my-6" />
          
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Database className="h-5 w-5 text-purple-500" />
              항목 관리
            </h3>
            <SettingsTable />
          </div>
          
          <Separator className="my-6" />
          
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Database className="h-5 w-5 text-purple-500" />
              데이터 관리
            </h3>
            <DataManagement />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;