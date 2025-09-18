import React from 'react';

const GaugeChart = ({ 
  title = "Performance Score", 
  value = 73, 
  maxValue = 100,
  unit = "%",
  color = "blue"
}) => {
  const percentage = (value / maxValue) * 100;
  const strokeDasharray = 2 * Math.PI * 45; // circumference
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        primary: 'text-blue-600',
        bg: 'bg-blue-50',
        stroke: 'stroke-blue-600',
        fill: 'fill-blue-100'
      },
      green: {
        primary: 'text-green-600',
        bg: 'bg-green-50',
        stroke: 'stroke-green-600',
        fill: 'fill-green-100'
      },
      red: {
        primary: 'text-red-600',
        bg: 'bg-red-50',
        stroke: 'stroke-red-600',
        fill: 'fill-red-100'
      },
      yellow: {
        primary: 'text-yellow-600',
        bg: 'bg-yellow-50',
        stroke: 'stroke-yellow-600',
        fill: 'fill-yellow-100'
      }
    };
    return colors[color] || colors.blue;
  };

  const colorClasses = getColorClasses(color);

  const getPerformanceLevel = (value) => {
    if (value >= 80) return { label: 'Excellent', color: 'text-green-600' };
    if (value >= 60) return { label: 'Good', color: 'text-blue-600' };
    if (value >= 40) return { label: 'Average', color: 'text-yellow-600' };
    return { label: 'Poor', color: 'text-red-600' };
  };

  const performanceLevel = getPerformanceLevel(value);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${colorClasses.bg} ${colorClasses.stroke}`}></div>
          <span className="text-sm text-gray-500">Live</span>
        </div>
      </div>
      
      <div className="flex flex-col items-center">
        {/* Gauge Chart */}
        <div className="relative w-48 h-48 mb-6">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            {/* Background Circle */}
            <circle
              cx="60"
              cy="60"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200"
            />
            {/* Progress Circle */}
            <circle
              cx="60"
              cy="60"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className={`${colorClasses.stroke} transition-all duration-1000 ease-out`}
            />
          </svg>
          
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-4xl font-bold ${colorClasses.primary}`}>
              {value}{unit}
            </div>
            <div className={`text-sm font-medium ${performanceLevel.color} mt-1`}>
              {performanceLevel.label}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 w-full">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">85</div>
            <div className="text-xs text-gray-500">Target</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">+12%</div>
            <div className="text-xs text-gray-500">vs Last Month</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">A+</div>
            <div className="text-xs text-gray-500">Grade</div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="w-full mt-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Conversion Rate</span>
            <span className="text-sm font-medium text-gray-900">73%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${colorClasses.bg} ${colorClasses.stroke}`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;
