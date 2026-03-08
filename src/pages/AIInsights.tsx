import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BrainCircuit, TrendingDown, Users, ShieldAlert, Activity, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { customers } from "@/data/mockData";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const RISK_COLORS = { Low: "hsl(142, 71%, 45%)", Medium: "hsl(38, 92%, 50%)", High: "hsl(0, 72%, 51%)" };

const modelMetrics = [
  { model: "Churn Prediction", accuracy: 94, precision: 91, recall: 88, f1: 89 },
  { model: "Sentiment Analysis", accuracy: 89, precision: 87, recall: 85, f1: 86 },
  { model: "Customer Segmentation", accuracy: 92, precision: 90, recall: 91, f1: 90 },
  { model: "Risk Scoring", accuracy: 96, precision: 93, recall: 92, f1: 92 },
];

const modelStatus = [
  { model: "Churn Prediction", accuracy: 89, precision: 86, recall: 83, lastUpdate: "3 days ago", status: "healthy" },
  { model: "Sentiment Analysis", accuracy: 91, precision: 88, recall: 85, lastUpdate: "1 day ago", status: "healthy" },
  { model: "Risk Scoring", accuracy: 94, precision: 91, recall: 89, lastUpdate: "5 hours ago", status: "healthy" },
  { model: "Customer Segmentation", accuracy: 87, precision: 84, recall: 82, lastUpdate: "7 days ago", status: "warning" },
];

const segmentData = [
  { segment: "Loyal High-Value", count: 1240, risk: "Low", description: "Consistent engagement, multiple products" },
  { segment: "At-Risk Transactors", count: 380, risk: "High", description: "Declining transaction frequency, reduced logins" },
  { segment: "Passive Savers", count: 890, risk: "Medium", description: "Low digital engagement, stable balances" },
  { segment: "New Digital", count: 560, risk: "Low", description: "High app usage, growing UPI transactions" },
];

const radarData = [
  { metric: "Transaction", A: 85, B: 40 },
  { metric: "Engagement", A: 92, B: 25 },
  { metric: "Products", A: 78, B: 55 },
  { metric: "Sentiment", A: 88, B: 30 },
  { metric: "Loyalty", A: 95, B: 45 },
];

const AIInsights = () => {
  const riskDist = [
    { name: "Low", value: customers.filter(c => c.riskLevel === "Low").length },
    { name: "Medium", value: customers.filter(c => c.riskLevel === "Medium").length },
    { name: "High", value: customers.filter(c => c.riskLevel === "High").length },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">AI Model Insights</h2>
        <p className="text-muted-foreground">AI model performance, predictions, and customer segmentation</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Models Active", value: "4", icon: BrainCircuit },
          { label: "Avg Accuracy", value: "93%", icon: TrendingDown },
          { label: "Segments", value: segmentData.length, icon: Users },
          { label: "High Risk", value: customers.filter(c => c.riskLevel === "High").length, icon: ShieldAlert },
        ].map(s => (
          <Card key={s.label} className="shadow-sm">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="rounded-lg bg-muted p-2"><s.icon className="h-4 w-4 text-accent" /></div>
              <div><p className="text-xs text-muted-foreground">{s.label}</p><p className="text-xl font-bold">{s.value}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Model Status Widget */}
      <Card className="shadow-sm border-accent/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Activity className="h-4 w-4 text-accent" />
            AI Model Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {modelStatus.map(m => (
              <div key={m.model} className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{m.model}</span>
                  <div className="flex items-center gap-1.5">
                    {m.status === "healthy" ? (
                      <CheckCircle className="h-4 w-4 text-[hsl(var(--risk-low))]" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-[hsl(var(--risk-medium))]" />
                    )}
                    <span className={`text-xs font-medium ${m.status === "healthy" ? "text-[hsl(var(--risk-low))]" : "text-[hsl(var(--risk-medium))]"}`}>
                      {m.status === "healthy" ? "Healthy" : "Needs Retrain"}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded bg-muted p-2">
                    <p className="text-lg font-bold font-mono">{m.accuracy}%</p>
                    <p className="text-[10px] text-muted-foreground">Accuracy</p>
                  </div>
                  <div className="rounded bg-muted p-2">
                    <p className="text-lg font-bold font-mono">{m.precision}%</p>
                    <p className="text-[10px] text-muted-foreground">Precision</p>
                  </div>
                  <div className="rounded bg-muted p-2">
                    <p className="text-lg font-bold font-mono">{m.recall}%</p>
                    <p className="text-[10px] text-muted-foreground">Recall</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Last updated: {m.lastUpdate}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-base">Model Performance</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {modelMetrics.map(m => (
              <div key={m.model} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{m.model}</span>
                  <span className="text-sm font-mono font-semibold">{m.accuracy}%</span>
                </div>
                <Progress value={m.accuracy} className="h-2" />
                <div className="flex gap-3 text-xs text-muted-foreground">
                  <span>Precision: {m.precision}%</span>
                  <span>Recall: {m.recall}%</span>
                  <span>F1: {m.f1}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-base">Retention vs Churn Profile</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" className="text-xs" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Retained" dataKey="A" stroke="hsl(142, 71%, 45%)" fill="hsl(142, 71%, 45%)" fillOpacity={0.3} />
                <Radar name="Churned" dataKey="B" stroke="hsl(0, 72%, 51%)" fill="hsl(0, 72%, 51%)" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-3"><CardTitle className="text-base">Customer Segments</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {segmentData.map(s => (
              <div key={s.segment} className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{s.segment}</span>
                    <Badge variant="secondary" className={`border-0 text-xs ${s.risk === "High" ? "risk-badge-high" : s.risk === "Medium" ? "risk-badge-medium" : "risk-badge-low"}`}>
                      {s.risk}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{s.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">{s.count.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">customers</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIInsights;
