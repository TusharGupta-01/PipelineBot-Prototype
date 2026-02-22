import { useState } from "react";
import { Card } from "../components/ui/card";
import { 
  Play, 
  Square, 
  ChevronUp, 
  ChevronDown, 
  Lock, 
  Power,
  Battery,
  Wifi,
  Thermometer,
  Cog
} from "lucide-react";
import { Progress } from "../components/ui/progress";

export function RobotControl() {
  const [robotStatus, setRobotStatus] = useState({
    isRunning: false,
    battery: 78,
    signalStrength: 92,
    temperature: 28,
    motorStatus: "Idle",
  });

  const [controlLog, setControlLog] = useState([
    "System initialized successfully",
    "All motors responding normally",
    "Sensors calibrated",
  ]);

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setControlLog(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 9)]);
  };

  const handleControl = (action) => {
    addLog(`Command sent: ${action}`);
    
    if (action === "Start Inspection") {
      setRobotStatus(prev => ({ ...prev, isRunning: true, motorStatus: "Running" }));
    } else if (action === "Stop Robot") {
      setRobotStatus(prev => ({ ...prev, isRunning: false, motorStatus: "Stopped" }));
    } else if (action === "Emergency Stop") {
      setRobotStatus(prev => ({ ...prev, isRunning: false, motorStatus: "Emergency Stop" }));
    } else {
      setRobotStatus(prev => ({ ...prev, motorStatus: action }));
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Robot Control Panel</h1>
        <p className="text-[#94a3b8]">Manual control and system monitoring</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Status Indicators */}
        <Card className="bg-[#1a1f2e] border-[#2d3748] p-6">
          <h3 className="text-lg font-bold text-white mb-4">System Status</h3>
          
          <div className="space-y-4">
            {/* Battery */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Battery className="w-4 h-4 text-[#3b82f6]" />
                  <span className="text-sm text-[#94a3b8]">Battery Level</span>
                </div>
                <span className="text-sm font-bold text-white">{robotStatus.battery}%</span>
              </div>
              <Progress value={robotStatus.battery} className="h-2 bg-[#1e293b]" />
            </div>

            {/* Signal Strength */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-[#10b981]" />
                  <span className="text-sm text-[#94a3b8]">Signal Strength</span>
                </div>
                <span className="text-sm font-bold text-white">{robotStatus.signalStrength}%</span>
              </div>
              <Progress value={robotStatus.signalStrength} className="h-2 bg-[#1e293b]" />
            </div>

            {/* Temperature */}
            <div className="flex items-center justify-between p-3 bg-[#1e293b] rounded-lg">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-[#f59e0b]" />
                <span className="text-sm text-[#94a3b8]">Internal Temp</span>
              </div>
              <span className="text-lg font-bold text-white">{robotStatus.temperature}°C</span>
            </div>

            {/* Motor Status */}
            <div className="flex items-center justify-between p-3 bg-[#1e293b] rounded-lg">
              <div className="flex items-center gap-2">
                <Cog className="w-4 h-4 text-[#3b82f6]" />
                <span className="text-sm text-[#94a3b8]">Motor Status</span>
              </div>
              <span className={`text-sm font-bold ${
                robotStatus.motorStatus === "Running" ? "text-[#10b981]" :
                robotStatus.motorStatus === "Emergency Stop" ? "text-[#ef4444]" :
                "text-[#94a3b8]"
              }`}>
                {robotStatus.motorStatus}
              </span>
            </div>
          </div>
        </Card>

        {/* Control Buttons */}
        <Card className="bg-[#1a1f2e] border-[#2d3748] p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-white mb-4">Manual Controls</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Start/Stop */}
            <button
              onClick={() => handleControl("Start Inspection")}
              disabled={robotStatus.isRunning}
              className="px-6 py-4 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="w-5 h-5" />
              Start Inspection
            </button>

            <button
              onClick={() => handleControl("Stop Robot")}
              disabled={!robotStatus.isRunning}
              className="px-6 py-4 bg-[#f59e0b] hover:bg-[#d97706] text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Square className="w-5 h-5" />
              Stop Robot
            </button>
          </div>

          {/* Movement Controls */}
          <div className="mb-6">
            <p className="text-sm text-[#94a3b8] mb-3">Movement</p>
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => handleControl("Moving Forward")}
                className="px-8 py-3 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-lg transition-colors"
              >
                <ChevronUp className="w-6 h-6" />
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => handleControl("Moving Backward")}
                  className="px-8 py-3 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-lg transition-colors"
                >
                  <ChevronDown className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Special Controls */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleControl("Activating Sealing Mechanism")}
              className="px-6 py-3 bg-[#1e293b] hover:bg-[#334155] text-white rounded-lg transition-colors border border-[#2d3748] flex items-center justify-center gap-2"
            >
              <Lock className="w-5 h-5" />
              Activate Sealing
            </button>

            <button
              onClick={() => handleControl("Emergency Stop")}
              className="px-6 py-3 bg-[#ef4444] hover:bg-[#dc2626] text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-lg font-bold"
            >
              <Power className="w-6 h-6" />
              EMERGENCY STOP
            </button>
          </div>
        </Card>
      </div>

      {/* Control Log */}
      <Card className="bg-[#1a1f2e] border-[#2d3748] p-6">
        <h3 className="text-lg font-bold text-white mb-4">Control Log</h3>
        <div className="bg-[#0a0e1a] rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
          {controlLog.map((log, index) => (
            <div
              key={index}
              className="text-[#10b981] mb-1 animate-fadeIn"
            >
              {log}
            </div>
          ))}
        </div>
      </Card>

      {/* Safety Notice */}
      <Card className="bg-[#f59e0b]/10 border-[#f59e0b] p-4 mt-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-[#f59e0b]/20 rounded-lg">
            <Play className="w-5 h-5 text-[#f59e0b]" />
          </div>
          <div>
            <h4 className="text-white font-bold mb-1">Safety Notice</h4>
            <p className="text-sm text-[#94a3b8]">
              Always ensure the pipeline section is clear before starting inspection. 
              Use the Emergency Stop button in case of any unexpected behavior.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
