import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import 'react-circular-progressbar/dist/styles.css';
import {
  Activity,
  BarChart2,
  Calendar,
  CheckCircle,
  Clock,
  Cpu,
  Gauge,
  PieChart,
  Play,
  Rocket,
  Search,
  Settings,
  Shield,
  Signal,
  Sliders,
  Target,
  TrendingUp,
  XCircle,
  Zap,
  AlertCircle,
  Info
} from 'lucide-react';

const Dashboard = () => {
  const [screenSize, setScreenSize] = useState('large');
  const [searchTerm, setSearchTerm] = useState('');
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Responsive screen size detection
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('small');
      } else if (width < 1280) {
        setScreenSize('medium');
      } else {
        setScreenSize('large');
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Production data for the chart
  const productionData = [
    { time: '00:00', production: 0, target: 50 },
    { time: '02:00', production: 45, target: 100 },
    { time: '04:00', production: 90, target: 150 },
    { time: '06:00', production: 140, target: 200 },
    { time: '08:00', production: 195, target: 250 },
    { time: '10:00', production: 250, target: 300 },
    { time: '12:00', production: 290, target: 350 },
    { time: '14:00', production: 340, target: 400 },
    { time: '16:00', production: 390, target: 450 },
    { time: '18:00', production: 420, target: 500 },
    { time: '20:00', production: 460, target: 550 },
    { time: '22:00', production: 500, target: 600 },
  ];

  const metricsData = {
    monthlyPlan: '3.4M',
    tillDateProduction: '395K',
    productionDate: currentDate,
    okParts: '1,337',
    rejection: '28',
    lossTime: '0.00 Min',
    efficiency: '87.5%',
    targetAchievement: '92%',
    currentHourProduction: productionData[new Date().getHours() / 2]?.production || 0,
    currentHourTarget: productionData[Math.floor(new Date().getHours() / 2)]?.target || 0
  };

  const gaugeData = [
    { title: 'AVAIL', value: 0, color: '#3B82F6', icon: Signal },
    { title: 'PERF', value: 0, color: '#8B5CF6', icon: PieChart },
    { title: 'QUAL', value: 98, color: '#10B981', icon: Shield },
    { title: 'OEE', value: 0, color: '#F59E0B', icon: Cpu }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Production Dashboard</h3>
                  <p className="text-gray-500 text-sm">Real-time production monitoring and analytics</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all w-full md:w-64"
                  />
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{currentDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <TopMetricsCards metricsData={metricsData} screenSize={screenSize} />
        <ResponsiveMainGrid 
          metricsData={metricsData} 
          gaugeData={gaugeData} 
          screenSize={screenSize} 
          productionData={productionData} 
        />
      </div>
    </div>
  );
};




// Main Grid Layout
const ResponsiveMainGrid = ({ metricsData, gaugeData, screenSize, productionData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Production Overview</h3>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1.5 text-sm font-medium rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                Day
              </button>
              <button className="px-3 py-1.5 text-sm font-medium rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                Week
              </button>
              <button className="px-3 py-1.5 text-sm font-medium rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                Month
              </button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={productionData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickMargin={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickMargin={10}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    padding: '0.75rem',
                    fontSize: '0.875rem'
                  }}
                  formatter={(value, name) => [value, name === 'production' ? 'Actual' : 'Target']}
                  labelFormatter={(label) => `Time: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="production"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6, stroke: '#2563EB', strokeWidth: 2, fill: '#FFFFFF' }}
                  name="Production"
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#E5E7EB"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={false}
                  activeDot={{ r: 6, stroke: '#9CA3AF', strokeWidth: 2, fill: '#FFFFFF' }}
                  name="Target"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center mt-4 space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-gray-600">Actual: {metricsData.currentHourProduction}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-200 mr-2"></div>
                <span className="text-sm text-gray-600">Target: {metricsData.currentHourTarget}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">Efficiency: </span>
                <span className={`font-medium ${metricsData.currentHourProduction >= metricsData.currentHourTarget ? 'text-green-600' : 'text-amber-600'}`}>
                  {Math.round((metricsData.currentHourProduction / metricsData.currentHourTarget) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Recent Activities</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 mr-4">
                  <Activity className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-800">Machine IMH00{item} started production</h4>
                    <span className="text-xs text-gray-500">10:3{5 + item} AM</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Part #ABC12{item} - {item * 25} units completed</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Performance Metrics</h3>
          <div className="space-y-6">
            {gaugeData.map((gauge, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{gauge.title}</span>
                  <span className="text-sm font-semibold text-gray-800">{gauge.value}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{
                      width: `${gauge.value}%`,
                      backgroundColor: gauge.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 bg-blue-50 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors flex flex-col items-center justify-center">
              <Settings className="w-5 h-5 mb-1" />
              <span className="text-sm font-medium">Settings</span>
            </button>
            <button className="p-3 bg-green-50 rounded-lg text-green-600 hover:bg-green-100 transition-colors flex flex-col items-center justify-center">
              <Rocket className="w-5 h-5 mb-1" />
              <span className="text-sm font-medium">New Job</span>
            </button>
            <button className="p-3 bg-purple-50 rounded-lg text-purple-600 hover:bg-purple-100 transition-colors flex flex-col items-center justify-center">
              <BarChart2 className="w-5 h-5 mb-1" />
              <span className="text-sm font-medium">Reports</span>
            </button>
            <button className="p-3 bg-amber-50 rounded-lg text-amber-600 hover:bg-amber-100 transition-colors flex flex-col items-center justify-center">
              <AlertCircle className="w-5 h-5 mb-1" />
              <span className="text-sm font-medium">Alerts</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Top Metrics Cards
const TopMetricsCards = ({ metricsData, screenSize }) => {
  const getGridClasses = () => {
    switch (screenSize) {
      case 'small':
        return 'grid grid-cols-1 sm:grid-cols-2 gap-3';
      case 'medium':
        return 'grid grid-cols-2 lg:grid-cols-4 gap-4';
      default:
        return 'grid grid-cols-4 gap-4';
    }
  };

  const metrics = [
    {
      title: 'Monthly Target',
      value: metricsData.monthlyPlan,
      icon: Target,
      color: 'blue',
      trend: 'up',
      trendValue: '12%',
    },
    {
      title: 'Production',
      value: metricsData.tillDateProduction,
      icon: Zap,
      color: 'green',
      trend: 'up',
      trendValue: '5%',
    },
    {
      title: 'Efficiency',
      value: metricsData.efficiency,
      icon: BarChart2,
      color: 'indigo',
      trend: 'up',
      trendValue: '3%',
    },
    {
      title: 'Target Achievement',
      value: metricsData.targetAchievement,
      icon: TrendingUp,
      color: 'purple',
      trend: 'down',
      trendValue: '2%',
    },
  ];

  return (
    <div className={getGridClasses()}>
      {metrics.map((metric, index) => (
        <div 
          key={index} 
          className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{metric.title}</p>
              <div className="flex items-end mt-1">
                <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
                <span className={`ml-2 text-xs font-medium flex items-center ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? (
                    <svg className="w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                    </svg>
                  )}
                  {metric.trendValue}
                </span>
              </div>
            </div>
            <div className={`p-2 rounded-lg ${
              metric.color === 'blue' ? 'bg-blue-50 text-blue-600' :
              metric.color === 'green' ? 'bg-green-50 text-green-600' :
              metric.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
              'bg-purple-50 text-purple-600'
            }`}>
              <metric.icon className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600" 
              style={{ width: `${Math.min(100, Math.random() * 100)}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Responsive Main KPI Cards
const MainKPICards = ({ metricsData, screenSize }) => {
  const getGridClasses = () => {
    switch (screenSize) {
      case 'small':
        return 'grid grid-cols-1 gap-3';
      case 'medium':
        return 'grid grid-cols-1 md:grid-cols-2 gap-4';
      default:
        return 'grid grid-cols-1 lg:grid-cols-2 gap-5';
    }
  };

  return (
    <div className={getGridClasses()}>
      <KPICard
        title="OK Parts"
        value={metricsData.okParts}
        status="success"
        icon={CheckCircleIcon}
        percentage="98.2%"
        screenSize={screenSize}
      />
      <KPICard
        title="Rejection"
        value={metricsData.rejection}
        status="warning"
        icon={XCircleIcon}
        percentage="1.8%"
        screenSize={screenSize}
      />
    </div>
  );
};

// Responsive Metric Card
const MetricCard = ({ title, value, icon: Icon, color, screenSize }) => {
  const colorStyles = {
    blue: 'from-blue-500 to-blue-600',
    indigo: 'from-indigo-500 to-indigo-600', 
    slate: 'from-slate-500 to-slate-600'
  };

  const getCardClasses = () => {
    switch (screenSize) {
      case 'small':
        return 'bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:scale-102 hover:shadow-md transition-all duration-200';
      case 'medium':
        return 'bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:scale-105 hover:shadow-md transition-all duration-200';
      default:
        return 'bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:scale-105 hover:shadow-lg transition-all duration-200';
    }
  };

  const getPadding = () => {
    switch (screenSize) {
      case 'small':
        return { header: 'p-2', content: 'p-2' };
      case 'medium':
        return { header: 'p-3', content: 'p-3' };
      default:
        return { header: 'p-3', content: 'p-4' };
    }
  };

  const padding = getPadding();

  const getValueSize = () => {
    switch (screenSize) {
      case 'small':
        return 'text-lg font-bold text-gray-900';
      case 'medium':
        return 'text-xl font-bold text-gray-900';
      default:
        return 'text-2xl font-bold text-gray-900';
    }
  };

  return (
    <div className={getCardClasses()}>
      <div className={`bg-gradient-to-r ${colorStyles[color]} ${padding.header}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div className={padding.content}>
        <h3 className="text-xs font-medium text-gray-600 mb-1 uppercase tracking-wide">
          {title}
        </h3>
        <p className={getValueSize()}>{value}</p>
      </div>
    </div>
  );
};

// Responsive KPI Card
const KPICard = ({ title, value, status, icon: Icon, percentage, screenSize }) => {
  const statusStyles = {
    success: {
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
      border: 'border-blue-200',
      text: 'text-blue-800',
      value: 'text-blue-900',
      icon: 'text-blue-600'
    },
    warning: {
      bg: 'bg-gradient-to-br from-gray-50 to-gray-100', 
      border: 'border-gray-300',
      text: 'text-gray-700',
      value: 'text-gray-900',
      icon: 'text-gray-600'
    }
  };

  const style = statusStyles[status];

  const getCardClasses = () => {
    const baseClasses = `${style.bg} border-2 ${style.border} rounded-xl shadow-sm hover:shadow-md transition-all duration-200`;
    switch (screenSize) {
      case 'small':
        return `${baseClasses} p-3 hover:scale-102`;
      case 'medium':
        return `${baseClasses} p-4 hover:scale-105`;
      default:
        return `${baseClasses} p-5 hover:scale-105`;
    }
  };

  const getValueSize = () => {
    switch (screenSize) {
      case 'small':
        return 'text-2xl font-bold';
      case 'medium':
        return 'text-3xl font-bold';
      default:
        return 'text-4xl font-bold';
    }
  };

  return (
    <div className={getCardClasses()}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-sm font-bold ${style.text} flex items-center`}>
          <Icon className={`h-4 w-4 ${style.icon} mr-2`} />
          {title}
        </h3>
        <span className={`px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs font-medium ${style.text} shadow-sm`}>
          {percentage}
        </span>
      </div>
      <div className="flex items-end justify-between">
        <p className={`${getValueSize()} ${style.value}`}>{value}</p>
        <div className="flex items-center text-xs text-gray-500">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5 animate-pulse"></div>
          Live
        </div>
      </div>
    </div>
  );
};

// Responsive Gauge Charts Section
const GaugeChartsSection = ({ gaugeData, screenSize }) => {
  const getCardClasses = () => {
    switch (screenSize) {
      case 'small':
        return 'bg-white border border-gray-200 rounded-lg shadow-sm p-3';
      case 'medium':
        return 'bg-white border border-gray-200 rounded-xl shadow-sm p-4';
      default:
        return 'bg-white border border-gray-200 rounded-xl shadow-sm p-5';
    }
  };

  const getGaugeGrid = () => {
    switch (screenSize) {
      case 'small':
        return 'grid grid-cols-2 gap-2 mb-3';
      case 'medium':
        return 'grid grid-cols-2 gap-3 mb-4';
      default:
        return 'grid grid-cols-2 gap-4 mb-5';
    }
  };

  return (
    <div className={getCardClasses()}>
      <div className="flex items-center justify-center mb-4">
        <CpuChipIcon className="h-4 w-4 text-blue-600 mr-2" />
        <h3 className="text-sm font-bold text-gray-900">Performance</h3>
      </div>
      
      <div className={getGaugeGrid()}>
        {gaugeData.map((gauge, index) => (
          <GaugeChart
            key={index}
            title={gauge.title}
            value={gauge.value}
            color={gauge.color}
            icon={gauge.icon}
            screenSize={screenSize}
          />
        ))}
      </div>
      
      <div className="space-y-2">
        <StatusIndicator label="Loss Time" value="0.00 Min" icon={ClockIcon} screenSize={screenSize} />
        <StatusIndicator label="Status" value="Running" icon={PlayIcon} screenSize={screenSize} />
      </div>
    </div>
  );
};

// Responsive Gauge Chart
const GaugeChart = ({ title, value, color, icon: Icon, screenSize }) => {
  const getGaugeSize = () => {
    switch (screenSize) {
      case 'small':
        return 'w-12 h-12';
      case 'medium':
        return 'w-16 h-16';
      default:
        return 'w-20 h-20';
    }
  };

  return (
    <div className="text-center">
      <div className={`${getGaugeSize()} mx-auto mb-2`}>
        <CircularProgressbar
          value={value}
          text={`${value}%`}
          styles={buildStyles({
            textColor: '#111827',
            pathColor: value > 0 ? color : '#E5E7EB',
            trailColor: '#F3F4F6',
            textSize: screenSize === 'small' ? '16px' : '12px',
            strokeLinecap: 'round',
          })}
          className="transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h4 className="text-xs font-bold text-gray-700 uppercase">{title}</h4>
    </div>
  );
};

// Responsive Status Indicator
const StatusIndicator = ({ label, value, icon: Icon, screenSize }) => {
  const getPadding = () => {
    switch (screenSize) {
      case 'small':
        return 'p-1.5';
      case 'medium':
        return 'p-2';
      default:
        return 'p-2.5';
    }
  };

  return (
    <div className={`flex items-center justify-between ${getPadding()} bg-gray-50 border border-gray-200 rounded-lg`}>
      <div className="flex items-center">
        <Icon className="h-3 w-3 text-blue-600 mr-2" />
        <span className="text-xs text-gray-700">{label}</span>
      </div>
      <span className="text-xs font-medium text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded shadow-sm">
        {value}
      </span>
    </div>
  );
};

// Responsive Assembly Section
const AssemblySection = ({ screenSize }) => {
  const getCardClasses = () => {
    switch (screenSize) {
      case 'small':
        return 'bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm';
      case 'medium':
        return 'bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm';
      default:
        return 'bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm';
    }
  };

  const getHeaderPadding = () => {
    switch (screenSize) {
      case 'small':
        return 'p-3';
      case 'medium':
        return 'p-4';
      default:
        return 'p-5';
    }
  };

  const getContentPadding = () => {
    switch (screenSize) {
      case 'small':
        return 'p-2';
      case 'medium':
        return 'p-3';
      default:
        return 'p-4';
    }
  };

  const getTitleSize = () => {
    switch (screenSize) {
      case 'small':
        return 'text-base font-bold text-white';
      case 'medium':
        return 'text-lg font-bold text-white';
      default:
        return 'text-xl font-bold text-white';
    }
  };

  return (
    <div className={getCardClasses()}>
      <div className={`bg-gradient-to-r from-blue-600 to-indigo-600 ${getHeaderPadding()}`}>
        <div className="flex items-center">
          <CpuChipIcon className="h-5 w-5 text-white mr-2" />
          <div>
            <h2 className={getTitleSize()}>Cosberg Assembly</h2>
            <p className="text-blue-100 text-sm">Shift Summary</p>
          </div>
        </div>
      </div>
      
      <div className={getContentPadding()}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-2 px-2 text-xs font-bold text-gray-700 uppercase">Product</th>
                <th className="text-center py-2 px-1 text-xs font-bold text-gray-700 uppercase">A</th>
                <th className="text-center py-2 px-1 text-xs font-bold text-gray-700 uppercase">B</th>
                <th className="text-center py-2 px-1 text-xs font-bold text-gray-700 uppercase">C</th>
                <th className="text-center py-2 px-1 text-xs font-bold text-gray-700 uppercase">N</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-blue-50 transition-colors duration-200">
                <td className="py-2 px-2 text-gray-900 font-medium">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className={screenSize === 'small' ? 'text-xs' : 'text-sm'}>Unit A1</span>
                  </div>
                </td>
                <td className="text-center py-2 px-1">
                  <StatusBadge status="pending" value="Wait" screenSize={screenSize} />
                </td>
                <td className="text-center py-2 px-1">
                  <StatusBadge status="completed" value="145" screenSize={screenSize} />
                </td>
                <td className="text-center py-2 px-1">
                  <StatusBadge status="active" value="Run" screenSize={screenSize} />
                </td>
                <td className="text-center py-2 px-1">
                  <StatusBadge status="scheduled" value="Plan" screenSize={screenSize} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Responsive Status Badge
const StatusBadge = ({ status, value, screenSize }) => {
  const badgeStyles = {
    pending: 'bg-gray-100 text-gray-700 border-gray-300',
    completed: 'bg-blue-100 text-blue-800 border-blue-300',
    active: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    scheduled: 'bg-slate-100 text-slate-700 border-slate-300'
  };

  const getPadding = () => {
    switch (screenSize) {
      case 'small':
        return 'px-1.5 py-0.5';
      case 'medium':
        return 'px-2 py-1';
      default:
        return 'px-2.5 py-1';
    }
  };

  return (
    <span className={`inline-flex ${getPadding()} rounded-lg text-xs font-medium border ${badgeStyles[status]} shadow-sm`}>
      {value}
    </span>
  );
};

export default Dashboard;
