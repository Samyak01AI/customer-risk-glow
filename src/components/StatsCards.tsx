import { Card, CardContent } from "@/components/ui/card";
import { Users, ShieldAlert, TrendingDown, MessageSquareWarning } from "lucide-react";
import { customers } from "@/data/mockData";

const StatsCards = () => {
  const total = customers.length;
  const highRisk = customers.filter((c) => c.riskLevel === "High").length;
  const avgScore = (customers.reduce((a, c) => a + c.riskScore, 0) / total).toFixed(2);
  const totalComplaints = customers.reduce((a, c) => a + c.complaintCount, 0);

  const stats = [
    { label: "Total Customers", value: total, icon: Users, color: "text-accent" },
    { label: "High Risk", value: highRisk, icon: ShieldAlert, color: "text-risk-high" },
    { label: "Avg Risk Score", value: avgScore, icon: TrendingDown, color: "text-risk-medium" },
    { label: "Open Complaints", value: totalComplaints, icon: MessageSquareWarning, color: "text-chart-5" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <Card key={s.label} className="border shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <div className={`rounded-xl bg-muted p-3 ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-2xl font-bold">{s.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
