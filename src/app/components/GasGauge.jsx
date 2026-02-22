export function GasGauge({ value, max = 100, label, unit }) {
  const percentage = (value / max) * 100;
  const rotation = (percentage / 100) * 180 - 90;
  
  const getColor = () => {
    if (percentage > 75) return "#ef4444";
    if (percentage > 50) return "#f59e0b";
    return "#10b981";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-24">
        {/* Gauge Background */}
        <svg className="w-full h-full" viewBox="0 0 200 100">
          <path
            d="M 20 90 A 80 80 0 0 1 180 90"
            fill="none"
            stroke="#1e293b"
            strokeWidth="20"
            strokeLinecap="round"
          />
          
          {/* Gauge Fill */}
          <path
            d="M 20 90 A 80 80 0 0 1 180 90"
            fill="none"
            stroke={getColor()}
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray={`${(percentage / 100) * 251.2} 251.2`}
            className="transition-all duration-500"
          />

          {/* Center Circle */}
          <circle cx="100" cy="90" r="8" fill="#1a1f2e" />
          
          {/* Needle */}
          <line
            x1="100"
            y1="90"
            x2="100"
            y2="30"
            stroke={getColor()}
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(${rotation} 100 90)`}
            className="transition-all duration-500"
          />
        </svg>

        {/* Value Display */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
          <p className="text-3xl font-bold text-white">{value.toFixed(1)}</p>
          <p className="text-sm text-[#94a3b8]">{unit}</p>
        </div>
      </div>
      
      <p className="text-sm text-[#94a3b8] mt-4">{label}</p>
    </div>
  );
}
