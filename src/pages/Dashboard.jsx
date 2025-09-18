import React from "react";
import MetricCard from "../../components/dashboard/MetricCard";
import LineChart from "../../components/dashboard/LineChart";
import DonutChart from "../../components/dashboard/DonutChart";
import GaugeChart from "../../components/dashboard/GaugeChart";
import DataTable from "../../components/dashboard/DataTable";

const Dashboard = () => {
  const metrics = [
    { title: "Total Revenue", value: "$45,231", change: "+20.1%", trend: "up" },
    { title: "Active Users", value: "2,341", change: "+180.1%", trend: "up" },
    { title: "Orders", value: "1,156", change: "-19%", trend: "down" },
    { title: "Conversion", value: "89.2%", change: "+12%", trend: "up" },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LineChart />
        </div>
        <div>
          <DonutChart />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <GaugeChart />
        </div>
        <div className="lg:col-span-2">
          <DataTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
