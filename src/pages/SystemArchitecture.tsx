import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, BrainCircuit, Zap, Send, BarChart3, ArrowDown, Shield, Users, Smartphone, MessageSquareWarning } from "lucide-react";

const layers = [
  {
    title: "Data Sources",
    icon: Database,
    description: "Real-time data ingestion from multiple banking channels",
    items: ["Core Banking System", "Mobile App Analytics", "UPI Gateway", "CRM Platform", "Social Media Feeds"],
    color: "bg-accent/10 border-accent/30",
    iconColor: "text-accent",
  },
  {
    title: "AI Risk Engine",
    icon: BrainCircuit,
    description: "Machine learning models for prediction and analysis",
    items: ["Churn Prediction Model (94% accuracy)", "Sentiment Analysis NLP", "Customer Segmentation", "Risk Scoring Algorithm"],
    color: "bg-[hsl(var(--chart-5)/0.1)] border-[hsl(var(--chart-5)/0.3)]",
    iconColor: "text-[hsl(var(--chart-5))]",
  },
  {
    title: "Decision Engine",
    icon: Zap,
    description: "Automated decision-making and action recommendation",
    items: ["Risk Threshold Evaluation", "Action Priority Ranking", "Channel Selection Logic", "Confidence Scoring"],
    color: "bg-[hsl(var(--risk-medium)/0.1)] border-[hsl(var(--risk-medium)/0.3)]",
    iconColor: "text-[hsl(var(--risk-medium))]",
  },
  {
    title: "Outreach System",
    icon: Send,
    description: "Multi-channel customer engagement and retention",
    items: ["SMS Gateway", "Email Campaign Engine", "RM Task Assignment", "Push Notifications"],
    color: "bg-[hsl(var(--risk-low)/0.1)] border-[hsl(var(--risk-low)/0.3)]",
    iconColor: "text-[hsl(var(--risk-low))]",
  },
  {
    title: "Analytics Dashboard",
    icon: BarChart3,
    description: "Real-time monitoring and performance tracking",
    items: ["Risk Analytics", "Campaign Performance", "Model Health Monitoring", "Impact Metrics"],
    color: "bg-accent/10 border-accent/30",
    iconColor: "text-accent",
  },
];

const SystemArchitecture = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold">System Architecture</h2>
      <p className="text-muted-foreground">End-to-end AI-powered customer retention pipeline</p>
    </div>

    {/* Architecture Flow */}
    <div className="space-y-2">
      {layers.map((layer, index) => (
        <div key={layer.title}>
          <Card className={`shadow-sm border ${layer.color}`}>
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className={`rounded-xl bg-muted p-3 ${layer.iconColor}`}>
                  <layer.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{layer.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{layer.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {layer.items.map((item) => (
                      <span key={item} className="text-xs rounded-full bg-muted px-3 py-1 font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {index < layers.length - 1 && (
            <div className="flex justify-center py-1">
              <ArrowDown className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
        </div>
      ))}
    </div>

    {/* Supporting Components */}
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="shadow-sm">
        <CardContent className="p-4 flex items-center gap-3">
          <Shield className="h-5 w-5 text-accent" />
          <div>
            <p className="font-semibold text-sm">Security Layer</p>
            <p className="text-xs text-muted-foreground">Role-based access, encryption, audit logs</p>
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-sm">
        <CardContent className="p-4 flex items-center gap-3">
          <Users className="h-5 w-5 text-accent" />
          <div>
            <p className="font-semibold text-sm">User Management</p>
            <p className="text-xs text-muted-foreground">Admin, RM, Support role management</p>
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-sm">
        <CardContent className="p-4 flex items-center gap-3">
          <Smartphone className="h-5 w-5 text-accent" />
          <div>
            <p className="font-semibold text-sm">API Gateway</p>
            <p className="text-xs text-muted-foreground">RESTful APIs, webhooks, real-time events</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default SystemArchitecture;
