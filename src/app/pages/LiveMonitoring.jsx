import { useEffect, useState } from "react";
import { Card } from "../components/ui/card";
import { GasGauge } from "../components/GasGauge";
import { Maximize, Camera, Thermometer, MapPin } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function LiveMonitoring() {
  const [sensorData, setSensorData] = useState({
    gasLevel: 32,
    pressure: 45.8,
    temperature: 24.5,
    distance: 287,
  });

  const [chartData, setChartData] = useState([
    { time: "0s", value: 30 },
    { time: "5s", value: 28 },
    { time: "10s", value: 32 },
    { time: "15s", value: 35 },
    { time: "20s", value: 31 },
  ]);

  // Simulate real-time sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        gasLevel: Math.max(0, Math.min(100, prev.gasLevel + (Math.random() - 0.5) * 8)),
        pressure: Math.max(0, Math.min(100, prev.pressure + (Math.random() - 0.5) * 3)),
        temperature: Math.max(15, Math.min(50, prev.temperature + (Math.random() - 0.5) * 2)),
        distance: prev.distance + Math.random() * 2,
      }));

      setChartData(prev => {
        const newData = [...prev.slice(-19), {
          time: `${prev.length * 5}s`,
          value: Math.max(0, Math.min(100, prev[prev.length - 1].value + (Math.random() - 0.5) * 10))
        }];
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Live Monitoring</h1>
        <p className="text-[#94a3b8]">Real-time camera feed and sensor data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Camera Feed */}
        <Card className="bg-[#1a1f2e] border-[#2d3748] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#ef4444]/10 rounded-lg">
                <Camera className="w-5 h-5 text-[#ef4444]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">ESP32-CAM Live Feed</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-[#ef4444] rounded-full animate-pulse"></div>
                  <span className="text-xs text-[#94a3b8]">Recording</span>
                </div>
              </div>
            </div>
            <button className="p-2 hover:bg-[#1e293b] rounded-lg transition-colors">
              <Maximize className="w-5 h-5 text-[#94a3b8]" />
            </button>
          </div>

          {/* Mock Camera Feed */}
          <div className="relative aspect-video bg-[#0a0e1a] rounded-lg overflow-hidden border border-[#2d3748]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Camera className="w-16 h-16 text-[#94a3b8] mx-auto mb-4" />
                <p className="text-[#94a3b8]">Camera Feed Simulation</p>
                <p className="text-sm text-[#94a3b8] mt-2">Pipeline Interior View</p>
              </div>
            </div>
            
            {/* Crosshair overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-8 border-2 border-[#3b82f6] rounded-full opacity-50"></div>
              </div>
            </div>

            {/* Timestamp overlay */}
            <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 rounded text-xs text-white font-mono">
              {new Date().toLocaleTimeString()}
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button className="flex-1 px-4 py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-lg transition-colors">
              <Camera className="w-4 h-4 inline mr-2" />
              Capture Screenshot
            </button>
            <button className="px-4 py-2 bg-[#1e293b] hover:bg-[#334155] text-white rounded-lg transition-colors border border-[#2d3748]">
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </Card>

        {/* Sensor Gauges */}
        <Card className="bg-[#1a1f2e] border-[#2d3748] p-6">
          <h3 className="text-lg font-bold text-white mb-6">Real-Time Sensors</h3>
          
          <div className="grid grid-cols-1 gap-6">
            <GasGauge 
              value={sensorData.gasLevel} 
              label="Gas Concentration" 
              unit="%" 
            />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#1e293b] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="w-4 h-4 text-[#3b82f6]" />
                  <span className="text-sm text-[#94a3b8]">Temperature</span>
                </div>
                <p className="text-2xl font-bold text-white">{sensorData.temperature.toFixed(1)}°C</p>
              </div>

              <div className="p-4 bg-[#1e293b] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-[#94a3b8]">Pressure</span>
                </div>
                <p className="text-2xl font-bold text-white">{sensorData.pressure.toFixed(1)} PSI</p>
              </div>
            </div>

            <div className="p-4 bg-[#1e293b] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-[#3b82f6]" />
                <span className="text-sm text-[#94a3b8]">Distance Traveled</span>
              </div>
              <p className="text-2xl font-bold text-white">{sensorData.distance.toFixed(1)} m</p>
              <p className="text-xs text-[#94a3b8] mt-1">Pipeline Section B-12</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Real-time Graph */}
      <Card className="bg-[#1a1f2e] border-[#2d3748] p-6">
        <h3 className="text-lg font-bold text-white mb-4">Gas Level History</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
              <XAxis 
                dataKey="time" 
                stroke="#94a3b8"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#94a3b8"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1a1f2e',
                  border: '1px solid #2d3748',
                  borderRadius: '8px',
                  color: '#e2e8f0'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={false}
                animationDuration={300}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
