import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Lock } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    const storedPassword = localStorage.getItem("app_password");
    setIsFirstTime(!storedPassword);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const storedPassword = localStorage.getItem("app_password");
    
    if (isFirstTime) {
      if (password !== confirmPassword) {
        toast({
          title: "오류",
          description: "비밀번호가 일치하지 않습니다.",
          variant: "destructive",
        });
        return;
      }
      localStorage.setItem("app_password", password);
      localStorage.setItem("needs_password_reset", "true");
      navigate("/");
    } else {
      if (password === storedPassword) {
        navigate("/");
      } else {
        toast({
          title: "오류",
          description: "비밀번호가 일치하지 않습니다.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-6 w-6 text-purple-500" />
            Multi Stock Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isFirstTime && (
            <div className="mb-4 text-sm text-muted-foreground">
              비밀번호를 설정페이지에서 다시 생성해 주세요.
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {isFirstTime && (
              <div>
                <Input
                  type="password"
                  placeholder="비밀번호 확인"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
            <Button type="submit" className="w-full">
              로그인
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;