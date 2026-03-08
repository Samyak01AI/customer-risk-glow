import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { customers } from "@/data/mockData";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";

const RISK_COLORS = {
  Low: "hsl(142, 71%, 45%)",
  Medium: "hsl(38, 92%, 50%)",
  High: "hsl(0, 72%, 51%)",
};

const RiskAnalytics = () => {
  const riskDist = [
    { name: "Low", value: customers.filter(c => c.riskLevel === "Low").length },
    { name: "Medium", value: customers.filter(c => c.riskLevel === "Medium").length },
    { name: "High", value: customers.filter(c => c.riskLevel === "High").length },
  ];

  const engagementData = customers.map(c => ({
    name: c.name.split(" ")[0],
    riskScore: +(c.riskScore * 100).toFixed(0),
    logins: c.mobileLoginFrequency,
    upi: c.upiFrequency,
  }));

  const trendData = [
    { month: "Jan", high: 12, medium: 25, low: 63 },
    { month: "Feb", high: 14, medium: 22, low: 64 },
    { month: "Mar", high: 11, medium: 28, low: 61 },
    { month: "Apr", high: 16, medium: 24, low: 60 },
    { month: "May", high: 13, medium: 26, low: 61 },
    { month: "Jun", high: 15, medium: 23, low: 62 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Risk Analytics</h2>
        <p className="text-muted-foreground">Customer risk distribution and churn probability trends</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-base">Risk Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={riskDist} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  {riskDist.map(entry => (
                    <Cell key={entry.name} fill={RISK_COLORS[entry.name as keyof typeof RISK_COLORS]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm md:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="text-base">Churn Probability Trends</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="high" stroke={RISK_COLORS.High} strokeWidth={2} name="High Risk %" />
                <Line type="monotone" dataKey="medium" stroke={RISK_COLORS.Medium} strokeWidth={2} name="Medium Risk %" />
                <Line type="monotone" dataKey="low" stroke={RISK_COLORS.Low} strokeWidth={2} name="Low Risk %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-base">Customer Engagement vs Risk</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip />
              <Legend />
              <Bar dataKey="riskScore" fill={RISK_COLORS.High} name="Risk Score" radius={[4, 4, 0, 0]} />
              <Bar dataKey="logins" fill={RISK_COLORS.Low} name="Weekly Logins" radius={[4, 4, 0, 0]} />
              <Bar dataKey="upi" fill={RISK_COLORS.Medium} name="UPI/Week" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAnalytics;
