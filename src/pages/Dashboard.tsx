import { useState } from "react";
import { customers } from "@/data/mockData";
import RiskFilterBar from "@/components/RiskFilterBar";
import CustomerTable from "@/components/CustomerTable";
import StatsCards from "@/components/StatsCards";

const Dashboard = () => {
  const [riskFilter, setRiskFilter] = useState<string | null>(null);

  const filtered = riskFilter
    ? customers.filter((c) => c.riskLevel === riskFilter)
    : customers;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground">Monitor customer churn risk and engagement metrics</p>
      </div>

      <StatsCards />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Customer Risk Overview</h3>
        </div>
        <RiskFilterBar activeFilter={riskFilter} onFilterChange={setRiskFilter} />
        <CustomerTable customers={filtered} />
      </div>
    </div>
  );
};

export default Dashboard;
