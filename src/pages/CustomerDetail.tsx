import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { customers } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft, User, CreditCard, Smartphone, Landmark, MessageSquareWarning,
  BrainCircuit, Gift, Phone, Mail, AlertTriangle, TrendingUp, BarChart3,
  Shield, Target, Zap, Activity, MapPin, DollarSign, Eye,
} from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart,
} from "recharts";
import { toast } from "sonner";

const riskBadgeClass: Record<string, string> = {
  Low: "risk-badge-low",
  Medium: "risk-badge-medium",
  High: "risk-badge-high",
};

const timelineTypeStyles: Record<string, string> = {
  info: "border-l-[hsl(var(--accent))] bg-[hsl(var(--accent)/0.05)]",
  warning: "border-l-[hsl(var(--risk-medium))] bg-[hsl(var(--risk-medium)/0.05)]",
  success: "border-l-[hsl(var(--risk-low))] bg-[hsl(var(--risk-low)/0.05)]",
  danger: "border-l-[hsl(var(--risk-high))] bg-[hsl(var(--risk-high)/0.05)]",
};

const timelineDotStyles: Record<string, string> = {
  info: "bg-[hsl(var(--accent))]",
  warning: "bg-[hsl(var(--risk-medium))]",
  success: "bg-[hsl(var(--risk-low))]",
  danger: "bg-[hsl(var(--risk-high))]",
};

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const customer = customers.find((c) => c.id === id);
  
  const [simRiskScore, setSimRiskScore] = useState<number | null>(null);
  const [simConfidence, setSimConfidence] = useState<number | null>(null);

  if (!customer) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">Customer not found.</p>
      </div>
    );
  }

  const displayRisk = simRiskScore ?? customer.riskScore;
  const displayConfidence = simConfidence ?? customer.aiConfidence;
  const displayLevel = displayRisk >= 0.6 ? "High" : displayRisk >= 0.3 ? "Medium" : "Low";

  const simulateBehavior = (type: string) => {
    let newRisk = customer.riskScore;
    let newConf = customer.aiConfidence;
    switch (type) {
      case "decrease_txn":
        newRisk = Math.min(1, customer.riskScore + 0.12);
        newConf = Math.min(1, customer.aiConfidence + 0.03);
        toast.info("Simulated: Transaction frequency decreased by 50%");
        break;
      case "add_complaint":
        newRisk = Math.min(1, customer.riskScore + 0.08);
        newConf = Math.min(1, customer.aiConfidence + 0.02);
        toast.info("Simulated: New complaint filed by customer");
        break;
      case "reduce_activity":
        newRisk = Math.min(1, customer.riskScore + 0.15);
        newConf = Math.min(1, customer.aiConfidence + 0.04);
        toast.info("Simulated: App activity reduced to zero");
        break;
    }
    setSimRiskScore(parseFloat(newRisk.toFixed(2)));
    setSimConfidence(parseFloat(newConf.toFixed(2)));
  };

  const resetSimulation = () => {
    setSimRiskScore(null);
    setSimConfidence(null);
    toast.success("Simulation reset to actual values");
  };

  const monthlyTransactions = [
    { month: "Aug", upi: Math.round(customer.upiFrequency * 4.5), card: Math.round(customer.cardTransactions * 1.3), amount: Math.round(customer.avgTransactionValue * 1.2) },
    { month: "Sep", upi: Math.round(customer.upiFrequency * 4.2), card: Math.round(customer.cardTransactions * 1.2), amount: Math.round(customer.avgTransactionValue * 1.15) },
    { month: "Oct", upi: Math.round(customer.upiFrequency * 3.8), card: Math.round(customer.cardTransactions * 1.1), amount: Math.round(customer.avgTransactionValue * 1.05) },
    { month: "Nov", upi: Math.round(customer.upiFrequency * 3.2), card: Math.round(customer.cardTransactions * 0.95), amount: Math.round(customer.avgTransactionValue * 0.95) },
    { month: "Dec", upi: Math.round(customer.upiFrequency * 2.8), card: Math.round(customer.cardTransactions * 0.85), amount: Math.round(customer.avgTransactionValue * 0.9) },
    { month: "Jan", upi: Math.round(customer.upiFrequency * 2.2), card: Math.round(customer.cardTransactions * 0.8), amount: Math.round(customer.avgTransactionValue * 0.85) },
  ];

  const engagementRadar = [
    { metric: "App Login", value: Math.min(100, customer.mobileLoginFrequency * 8), fullMark: 100 },
    { metric: "UPI Usage", value: Math.min(100, customer.upiFrequency * 4), fullMark: 100 },
    { metric: "Card Usage", value: Math.min(100, customer.cardTransactions * 5), fullMark: 100 },
    { metric: "Sentiment", value: customer.sentimentScore * 100, fullMark: 100 },
    { metric: "Activity", value: customer.appActivityLevel === "High" ? 90 : customer.appActivityLevel === "Medium" ? 55 : 20, fullMark: 100 },
    { metric: "Loyalty", value: Math.max(10, (1 - customer.riskScore) * 100), fullMark: 100 },
  ];

  const riskBreakdown = [
    { name: "Transaction Drop", value: Math.round(customer.riskScore * 30) },
    { name: "Low Engagement", value: Math.round(customer.riskScore * 25) },
    { name: "Complaint Impact", value: Math.round(customer.complaintCount * 8) },
    { name: "Financial Stress", value: Math.round(customer.riskScore * 20) },
  ];
  const PIE_COLORS = ["hsl(var(--risk-high))", "hsl(var(--risk-medium))", "hsl(var(--accent))", "hsl(var(--muted-foreground))"];

  const loginTrend = [
    { month: "Aug", logins: Math.round(customer.mobileLoginFrequency * 5) },
    { month: "Sep", logins: Math.round(customer.mobileLoginFrequency * 4.5) },
    { month: "Oct", logins: Math.round(customer.mobileLoginFrequency * 4) },
    { month: "Nov", logins: Math.round(customer.mobileLoginFrequency * 3) },
    { month: "Dec", logins: Math.round(customer.mobileLoginFrequency * 2.5) },
    { month: "Jan", logins: Math.round(customer.mobileLoginFrequency * 2) },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Risk Score + AI Confidence */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{customer.name}</h2>
          <p className="text-muted-foreground">{customer.accountType}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Churn Risk</p>
            <p className="text-2xl font-bold font-mono">{(displayRisk * 100).toFixed(0)}%</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">AI Confidence</p>
            <p className="text-2xl font-bold font-mono text-accent">{(displayConfidence * 100).toFixed(0)}%</p>
          </div>
          <Badge className={`${riskBadgeClass[displayLevel]} border-0 px-4 py-1.5 text-sm font-bold`}>
            {displayLevel} Risk
          </Badge>
        </div>
      </div>

      {/* Profile & Complaint cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base"><User className="h-4 w-4 text-accent" />Customer Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs text-muted-foreground">Name</p><p className="font-medium">{customer.name}</p></div>
              <div><p className="text-xs text-muted-foreground">Age</p><p className="font-medium">{customer.age}</p></div>
              <div><p className="text-xs text-muted-foreground">Account Type</p><p className="font-medium">{customer.accountType}</p></div>
              <div><p className="text-xs text-muted-foreground">Products Used</p>
                <div className="flex flex-wrap gap-1 mt-1">{customer.productsUsed.map((p) => <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base"><MessageSquareWarning className="h-4 w-4 text-accent" />Complaint History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div><p className="text-xs text-muted-foreground">Total Complaints</p><p className="text-xl font-bold">{customer.complaintCount}</p></div>
              <div>
                <p className="text-xs text-muted-foreground">Sentiment Score</p>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={customer.sentimentScore * 100} className="h-2 flex-1" />
                  <span className="text-sm font-mono font-semibold">{customer.sentimentScore.toFixed(2)}</span>
                </div>
              </div>
              <div><p className="text-xs text-muted-foreground">Last Complaint</p><p className="text-sm">{customer.lastComplaint}</p></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Decision Engine + Market Signals */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-sm border-accent/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <BrainCircuit className="h-4 w-4 text-accent" />
              AI Decision Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 rounded-lg bg-muted/50 p-3">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Risk Score</p>
                <p className="text-xl font-bold font-mono">{displayRisk.toFixed(2)} <span className={`text-sm ${riskBadgeClass[displayLevel]} px-2 py-0.5 rounded`}>{displayLevel}</span></p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">AI Confidence</p>
                <p className="text-xl font-bold font-mono text-accent">{(displayConfidence * 100).toFixed(0)}%</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">KEY FACTORS</p>
              <ul className="space-y-1.5">
                {customer.aiRiskReasons.map((reason, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--risk-medium))]" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg bg-accent/10 p-3">
              <p className="text-xs font-semibold text-muted-foreground mb-1">RECOMMENDED ACTION</p>
              <p className="text-sm font-medium">{customer.recommendedAction}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-accent/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="h-4 w-4 text-accent" />
              Market Risk Signals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <Eye className="h-4 w-4 text-[hsl(var(--risk-medium))]" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Competitor Interest</p>
                <p className="font-semibold">{customer.competitorInterest}</p>
              </div>
              <Badge variant="secondary" className={`border-0 ${customer.competitorInterest === "High" ? "risk-badge-high" : customer.competitorInterest === "Medium" ? "risk-badge-medium" : "risk-badge-low"}`}>
                {customer.competitorInterest}
              </Badge>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">DETECTED SIGNALS</p>
              <ul className="space-y-2">
                {customer.marketSignals.map((signal, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm rounded-lg bg-muted/30 p-2.5">
                    {signal.toLowerCase().includes("salary") ? <DollarSign className="h-3.5 w-3.5 text-[hsl(var(--risk-medium))]" /> :
                     signal.toLowerCase().includes("relocation") ? <MapPin className="h-3.5 w-3.5 text-[hsl(var(--risk-medium))]" /> :
                     <Activity className="h-3.5 w-3.5 text-[hsl(var(--risk-medium))]" />}
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Risk Simulation */}
      <Card className="shadow-sm border-accent/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Zap className="h-4 w-4 text-accent" />
            Live Risk Simulation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">Simulate behavior changes to see how the AI updates risk prediction in real-time.</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="gap-2" onClick={() => simulateBehavior("decrease_txn")}>
              <TrendingUp className="h-4 w-4" /> Decrease Transactions
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => simulateBehavior("add_complaint")}>
              <MessageSquareWarning className="h-4 w-4" /> Add Complaint
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => simulateBehavior("reduce_activity")}>
              <Smartphone className="h-4 w-4" /> Reduce App Activity
            </Button>
            {simRiskScore !== null && (
              <Button variant="ghost" className="gap-2 text-muted-foreground" onClick={resetSimulation}>
                Reset
              </Button>
            )}
          </div>
          {simRiskScore !== null && (
            <div className="mt-4 rounded-lg bg-muted/50 p-3 flex items-center gap-6">
              <div>
                <p className="text-xs text-muted-foreground">Simulated Risk</p>
                <p className="text-2xl font-bold font-mono">{(simRiskScore * 100).toFixed(0)}%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Original Risk</p>
                <p className="text-lg font-mono text-muted-foreground">{(customer.riskScore * 100).toFixed(0)}%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Change</p>
                <p className="text-lg font-bold font-mono text-[hsl(var(--risk-high))]">+{((simRiskScore - customer.riskScore) * 100).toFixed(0)}%</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Customer Journey Timeline */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Activity className="h-4 w-4 text-accent" />
            Customer Journey Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {customer.journeyEvents.map((event, i) => (
              <div key={i} className={`flex items-center gap-3 rounded-lg border-l-4 p-3 ${timelineTypeStyles[event.type]}`}>
                <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${timelineDotStyles[event.type]}`} />
                <span className="text-xs font-mono text-muted-foreground w-24 shrink-0">{event.date}</span>
                <span className="text-sm">{event.event}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Row 1 */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base"><TrendingUp className="h-4 w-4 text-accent" />Transaction Trend (6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={monthlyTransactions}>
                <defs>
                  <linearGradient id="upiGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--risk-medium))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--risk-medium))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
                <Area type="monotone" dataKey="upi" stroke="hsl(var(--accent))" fill="url(#upiGrad)" strokeWidth={2} name="UPI Txns" />
                <Area type="monotone" dataKey="card" stroke="hsl(var(--risk-medium))" fill="url(#cardGrad)" strokeWidth={2} name="Card Txns" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base"><BarChart3 className="h-4 w-4 text-accent" />Engagement Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={engagementRadar}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Engagement" dataKey="value" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.25} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base"><AlertTriangle className="h-4 w-4 text-accent" />Risk Factor Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={riskBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {riskBreakdown.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base"><Smartphone className="h-4 w-4 text-accent" />Mobile Login Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={loginTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
                <Bar dataKey="logins" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} name="Logins" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Financial Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base"><Landmark className="h-4 w-4 text-accent" />Financial Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div><p className="text-xs text-muted-foreground">Loans Taken</p><p className="text-xl font-bold">{customer.loansTaken}</p></div>
              <div><p className="text-xs text-muted-foreground">EMI Status</p><p className="font-medium">{customer.emiStatus}</p></div>
              <div><p className="text-xs text-muted-foreground">Credit Card Usage</p><p className="font-medium">{customer.creditCardUsage}</p></div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base"><CreditCard className="h-4 w-4 text-accent" />Spending Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={monthlyTransactions}>
                <Line type="monotone" dataKey="amount" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ fill: "hsl(var(--accent))", r: 3 }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} formatter={(v: number) => [`₹${v.toLocaleString()}`, "Avg Txn"]} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Actions */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Recommended Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
              <Gift className="h-4 w-4" /> Send Offer
            </Button>
            <Button variant="outline" className="gap-2">
              <Phone className="h-4 w-4" /> Schedule Call
            </Button>
            <Button variant="outline" className="gap-2">
              <Mail className="h-4 w-4" /> Send Email
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDetail;
