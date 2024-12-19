import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChartBarIcon, ListTodo, Settings, LogOut } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleLogout = () => {
    localStorage.removeItem("app_password");
    navigate("/login");
  };
  
  return (
    <nav className="border-b sticky top-0 bg-background z-50">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">Multi Stock Management</h1>
          </div>
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-2 ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <ListTodo className="h-5 w-5" />
              <span>등록현황</span>
            </Link>
            <Link
              to="/statistics"
              className={`flex items-center space-x-2 ${
                isActive('/statistics') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <ChartBarIcon className="h-5 w-5" />
              <span>통계</span>
            </Link>
            <Link
              to="/settings"
              className={`flex items-center space-x-2 ${
                isActive('/settings') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>설정</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary"
            >
              <LogOut className="h-5 w-5" />
              <span>종료</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;