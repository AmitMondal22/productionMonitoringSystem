import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  ChartBarIcon,
  BuildingOffice2Icon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  CpuChipIcon,
  SignalIcon,
  ShieldCheckIcon,
  ChartPieIcon,
  PlayIcon,
  ArrowTrendingUpIcon,
  BoltIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [screenSize, setScreenSize] = useState('large');

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

  const metricsData = {
    monthlyPlan: '3.4M',
    tillDateProduction: '395K',
    productionDate: '12 May',
    okParts: '1337',
    rejection: '28',
    lossTime: '0.00Min'
  };

  const gaugeData = [
    { title: 'AVAIL', value: 0, color: '#1E40AF', icon: SignalIcon },
    { title: 'PERF', value: 0, color: '#3730A3', icon: ChartPieIcon },
    { title: 'QUAL', value: 98, color: '#1D4ED8', icon: ShieldCheckIcon },
    { title: 'OEE', value: 0, color: '#1E3A8A', icon: CpuChipIcon }
  ];

  // Responsive padding and spacing
  const getResponsiveClasses = () => {
    switch (screenSize) {
      case 'small':
        return {
          container: 'min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white p-2',
          spacing: 'space-y-3'
        };
      case 'medium':
        return {
          container: 'min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white p-4',
          spacing: 'space-y-5'
        };
      default:
        return {
          container: 'min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white p-6',
          spacing: 'space-y-6'
        };
    }
  };

  const responsive = getResponsiveClasses();

  return (
    <div className={responsive.container}>
      <div className={responsive.spacing}>
        {/* Responsive Header */}
        {/* Responsive Top Metrics */}
        <TopMetricsCards metricsData={metricsData} screenSize={screenSize} />
        
        {/* Responsive Main Grid */}
        <ResponsiveMainGrid 
          metricsData={metricsData} 
          gaugeData={gaugeData} 
          screenSize={screenSize} 
        />
      </div>
    </div>
  );
};



// Responsive Main Grid Layout
const ResponsiveMainGrid = ({ metricsData, gaugeData, screenSize }) => {
  const getGridLayout = () => {
    switch (screenSize) {
      case 'small':
        return 'grid grid-cols-1 gap-3';
      case 'medium':
        return 'grid grid-cols-1 lg:grid-cols-3 gap-4';
      default:
        return 'grid grid-cols-1 xl:grid-cols-4 gap-6';
    }
  };

  const getMainColSpan = () => {
    switch (screenSize) {
      case 'small':
        return 'col-span-1 space-y-3';
      case 'medium':
        return 'lg:col-span-2 space-y-4';
      default:
        return 'xl:col-span-3 space-y-4';
    }
  };

  const getSideColSpan = () => {
    switch (screenSize) {
      case 'small':
        return 'col-span-1';
      case 'medium':
        return 'lg:col-span-1';
      default:
        return 'xl:col-span-1';
    }
  };

  return (
    <div className={getGridLayout()}>
      <div className={getMainColSpan()}>
        <MainKPICards metricsData={metricsData} screenSize={screenSize} />
        <AssemblySection screenSize={screenSize} />
      </div>
      <div className={getSideColSpan()}>
        <GaugeChartsSection gaugeData={gaugeData} screenSize={screenSize} />
      </div>
    </div>
  );
};

// Responsive Top Metrics Cards
const TopMetricsCards = ({ metricsData, screenSize }) => {
  const getGridClasses = () => {
    switch (screenSize) {
      case 'small':
        return 'grid grid-cols-1 gap-2';
      case 'medium':
        return 'grid grid-cols-2 md:grid-cols-3 gap-3';
      default:
        return 'grid grid-cols-3 gap-4';
    }
  };

  return (
    <div className={getGridClasses()}>
      <MetricCard
        title="Target"
        value={metricsData.monthlyPlan}
        icon={ArrowTrendingUpIcon}
        color="blue"
        screenSize={screenSize}
      />
      <MetricCard
        title="Production"
        value={metricsData.tillDateProduction}
        icon={BoltIcon}
        color="indigo"
        screenSize={screenSize}
      />
      <MetricCard
        title="Date"
        value={metricsData.productionDate}
        icon={CalendarIcon}
        color="slate"
        screenSize={screenSize}
      />
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
