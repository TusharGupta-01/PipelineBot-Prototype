import { Outlet, Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  Video, 
  AlertTriangle, 
  Gamepad2, 
  FileText,
  Activity
} from "lucide-react";

export function Layout() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/monitoring", label: "Live Monitoring", icon: Video },
    { path: "/alerts", label: "Leak Alerts", icon: AlertTriangle },
    { path: "/control", label: "Robot Control", icon: Gamepad2 },
    { path: "/reports", label: "Reports", icon: FileText },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f172a] border-r border-[#2d3748] flex flex-col">
        <div className="p-6 border-b border-[#2d3748]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#3b82f6] rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Pipeline Bot</h1>
              <p className="text-xs text-[#94a3b8]">Inspection System</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  active
                    ? "bg-[#3b82f6] text-white"
                    : "text-[#94a3b8] hover:bg-[#1e293b] hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#2d3748]">
          <div className="px-4 py-3 bg-[#1e293b] rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse"></div>
              <span className="text-sm text-white">System Online</span>
            </div>
            <p className="text-xs text-[#94a3b8]">Last updated: Just now</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
