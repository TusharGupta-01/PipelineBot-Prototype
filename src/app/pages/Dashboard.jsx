import { useEffect, useState } from "react";
import { Card } from "../components/ui/card";
import { Activity, AlertTriangle, Battery, Gauge } from "lucide-react";
import { Progress } from "../components/ui/progress";

export function Dashboard() {
  const [stats, setStats] = useState({
    robotStatus: "Active",
    totalLeaks: 7,
    activeAlerts: 2,
    gasLevel: 15,
    batteryLevel: 78,
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        gasLevel: Math.max(0, Math.min(100, prev.gasLevel + (Math.random() - 0.5) * 5)),
        batteryLevel: Math.max(0, prev.batteryLevel - 0.1),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const statusCards = [
    {
      title: "Robot Status",
      value: stats.robotStatus,
      icon: Activity,
      color: stats.robotStatus === "Active" ? "#10b981" : "#ef4444",
      bgColor: stats.robotStatus === "Active" ? "bg-[#10b981]/10" : "bg-[#ef4444]/10",
    },
    {
      title: "Total Leaks Detected",
      value: stats.totalLeaks,
      icon: AlertTriangle,
      color: "#f59e0b",
      bgColor: "bg-[#f59e0b]/10",
    },
    {
      title: "Active Alerts",
      value: stats.activeAlerts,
      icon: AlertTriangle,
      color: stats.activeAlerts > 0 ? "#ef4444" : "#10b981",
      bgColor: stats.activeAlerts > 0 ? "bg-[#ef4444]/10" : "bg-[#10b981]/10",
    },
    {
      title: "Battery Level",
      value: `${stats.batteryLevel.toFixed(0)}%`,
      icon: Battery,
      color: stats.batteryLevel > 30 ? "#10b981" : "#ef4444",
      bgColor: stats.batteryLevel > 30 ? "bg-[#10b981]/10" : "bg-[#ef4444]/10",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-[#94a3b8]">Real-time pipeline inspection overview</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statusCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="bg-[#1a1f2e] border-[#2d3748] p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  <Icon className="w-6 h-6" style={{ color: card.color }} />
                </div>
              </div>
              <h3 className="text-sm text-[#94a3b8] mb-2">{card.title}</h3>
              <p className="text-3xl font-bold text-white">{card.value}</p>
            </Card>
          );
        })}
      </div>

      {/* Gas Level Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-[#1a1f2e] border-[#2d3748] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#3b82f6]/10 rounded-lg">
              <Gauge className="w-5 h-5 text-[#3b82f6]" />
            </div>
            <h3 className="text-lg font-bold text-white">Live Gas Level</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-[#94a3b8]">Concentration</span>
                <span className="text-lg font-bold text-white">{stats.gasLevel.toFixed(1)}%</span>
              </div>
              <Progress 
                value={stats.gasLevel} 
                className="h-4 bg-[#1e293b]"
              />
            </div>
            <div className="flex items-center gap-2 p-3 bg-[#1e293b] rounded-lg">
              <div 
                className={`w-2 h-2 rounded-full ${
                  stats.gasLevel > 50 ? 'bg-[#ef4444] animate-pulse' : 
                  stats.gasLevel > 25 ? 'bg-[#f59e0b]' : 
                  'bg-[#10b981]'
                }`}
              ></div>
              <span className="text-sm text-white">
                {stats.gasLevel > 50 ? 'Critical Level' : 
                 stats.gasLevel > 25 ? 'Warning Level' : 
                 'Normal Level'}
              </span>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-[#1a1f2e] border-[#2d3748] p-6">
          <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { time: "2 min ago", message: "Robot entered Section B-12", type: "info" },
              { time: "15 min ago", message: "Gas leak detected at Section A-7", type: "danger" },
              { time: "32 min ago", message: "Leak sealed successfully at Section A-5", type: "success" },
              { time: "1 hour ago", message: "Inspection started", type: "info" },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-[#1e293b] rounded-lg">
                <div 
                  className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'danger' ? 'bg-[#ef4444]' :
                    activity.type === 'success' ? 'bg-[#10b981]' :
                    'bg-[#3b82f6]'
                  }`}
                ></div>
                <div className="flex-1">
                  <p className="text-sm text-white">{activity.message}</p>
                  <p className="text-xs text-[#94a3b8] mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-[#1a1f2e] border-[#2d3748] p-6">
        <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="px-4 py-3 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-lg transition-colors">
            Start Inspection
          </button>
          <button className="px-4 py-3 bg-[#1e293b] hover:bg-[#334155] text-white rounded-lg transition-colors border border-[#2d3748]">
            View Live Feed
          </button>
          <button className="px-4 py-3 bg-[#1e293b] hover:bg-[#334155] text-white rounded-lg transition-colors border border-[#2d3748]">
            Download Report
          </button>
          <button className="px-4 py-3 bg-[#ef4444] hover:bg-[#dc2626] text-white rounded-lg transition-colors">
            Emergency Stop
          </button>
        </div>
      </Card>
    </div>
  );
}
