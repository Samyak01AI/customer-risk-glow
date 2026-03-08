import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Bell, AlertTriangle, TrendingDown } from "lucide-react";
import { customers } from "@/data/mockData";

const alerts = [
  { id: 1, customer: "Rahul Sharma", sentiment: 0.22, change: -0.35, trigger: "3 negative complaints in 7 days", severity: "Critical" as const },
  { id: 2, customer: "Sneha Kulkarni", sentiment: 0.35, change: -0.20, trigger: "App crash complaint with frustration keywords", severity: "High" as const },
  { id: 3, customer: "Priya Patil", sentiment: 0.55, change: -0.10, trigger: "ATM issue raised with moderate dissatisfaction", severity: "Medium" as const },
  { id: 4, customer: "Vikram Joshi", sentiment: 0.62, change: -0.05, trigger: "Interest rate inquiry with comparison mentions", severity: "Low" as const },
];

const severityClass: Record<string, string> = {
  Critical: "risk-badge-high",
  High: "risk-badge-high",
  Medium: "risk-badge-medium",
  Low: "risk-badge-low",
};

const SentimentAlerts = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold">Sentiment Alerts</h2>
      <p className="text-muted-foreground">Real-time sentiment monitoring and negative trend alerts</p>
    </div>

    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <Card className="shadow-sm">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="rounded-lg bg-muted p-2"><Bell className="h-4 w-4 text-risk-high" /></div>
          <div><p className="text-xs text-muted-foreground">Active Alerts</p><p className="text-xl font-bold">{alerts.length}</p></div>
        </CardContent>
      </Card>
      <Card className="shadow-sm">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="rounded-lg bg-muted p-2"><AlertTriangle className="h-4 w-4 text-risk-high" /></div>
          <div><p className="text-xs text-muted-foreground">Critical</p><p className="text-xl font-bold">{alerts.filter(a => a.severity === "Critical").length}</p></div>
        </CardContent>
      </Card>
      <Card className="shadow-sm">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="rounded-lg bg-muted p-2"><TrendingDown className="h-4 w-4 text-risk-medium" /></div>
          <div><p className="text-xs text-muted-foreground">Avg Sentiment</p><p className="text-xl font-bold">{(alerts.reduce((a, c) => a + c.sentiment, 0) / alerts.length).toFixed(2)}</p></div>
        </CardContent>
      </Card>
      <Card className="shadow-sm">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="rounded-lg bg-muted p-2"><TrendingDown className="h-4 w-4 text-accent" /></div>
          <div><p className="text-xs text-muted-foreground">Avg Drop</p><p className="text-xl font-bold">{(alerts.reduce((a, c) => a + c.change, 0) / alerts.length).toFixed(2)}</p></div>
        </CardContent>
      </Card>
    </div>

    <div className="space-y-3">
      {alerts.map(a => (
        <Card key={a.id} className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-muted p-2 mt-0.5">
                <AlertTriangle className={`h-4 w-4 ${a.severity === "Critical" || a.severity === "High" ? "text-risk-high" : a.severity === "Medium" ? "text-risk-medium" : "text-risk-low"}`} />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{a.customer}</span>
                  <Badge variant="secondary" className={`${severityClass[a.severity]} border-0`}>{a.severity}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{a.trigger}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-xs text-muted-foreground">Sentiment:</span>
                    <Progress value={a.sentiment * 100} className="h-1.5 flex-1 max-w-32" />
                    <span className="text-xs font-mono font-semibold">{a.sentiment.toFixed(2)}</span>
                  </div>
                  <span className="text-xs font-mono text-risk-high">{a.change.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default SentimentAlerts;
