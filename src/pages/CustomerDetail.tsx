import { useParams, useNavigate } from "react-router-dom";
import { customers } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  User,
  CreditCard,
  Smartphone,
  Landmark,
  MessageSquareWarning,
  BrainCircuit,
  Gift,
  Phone,
  Mail,
  AlertTriangle,
} from "lucide-react";

const riskBadgeClass: Record<string, string> = {
  Low: "risk-badge-low",
  Medium: "risk-badge-medium",
  High: "risk-badge-high",
};

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const customer = customers.find((c) => c.id === id);

  if (!customer) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">Customer not found.</p>
      </div>
    );
  }

  const sections = [
    {
      title: "Customer Profile",
      icon: User,
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div><p className="text-xs text-muted-foreground">Name</p><p className="font-medium">{customer.name}</p></div>
          <div><p className="text-xs text-muted-foreground">Age</p><p className="font-medium">{customer.age}</p></div>
          <div><p className="text-xs text-muted-foreground">Account Type</p><p className="font-medium">{customer.accountType}</p></div>
          <div><p className="text-xs text-muted-foreground">Products Used</p>
            <div className="flex flex-wrap gap-1 mt-1">{customer.productsUsed.map((p) => <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>)}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Transaction Behavior",
      icon: CreditCard,
      content: (
        <div className="grid grid-cols-3 gap-4">
          <div><p className="text-xs text-muted-foreground">UPI Frequency</p><p className="text-xl font-bold">{customer.upiFrequency}<span className="text-xs font-normal text-muted-foreground">/week</span></p></div>
          <div><p className="text-xs text-muted-foreground">Card Transactions</p><p className="text-xl font-bold">{customer.cardTransactions}<span className="text-xs font-normal text-muted-foreground">/month</span></p></div>
          <div><p className="text-xs text-muted-foreground">Avg Transaction</p><p className="text-xl font-bold">₹{customer.avgTransactionValue.toLocaleString()}</p></div>
        </div>
      ),
    },
    {
      title: "Engagement Metrics",
      icon: Smartphone,
      content: (
        <div className="grid grid-cols-3 gap-4">
          <div><p className="text-xs text-muted-foreground">Mobile Login Freq</p><p className="text-xl font-bold">{customer.mobileLoginFrequency}<span className="text-xs font-normal text-muted-foreground">/week</span></p></div>
          <div><p className="text-xs text-muted-foreground">Days Since Login</p><p className="text-xl font-bold">{customer.daysSinceLastLogin}</p></div>
          <div>
            <p className="text-xs text-muted-foreground">App Activity</p>
            <Badge variant="secondary" className={`mt-1 ${customer.appActivityLevel === "High" ? "risk-badge-low" : customer.appActivityLevel === "Medium" ? "risk-badge-medium" : "risk-badge-high"}`}>
              {customer.appActivityLevel}
            </Badge>
          </div>
        </div>
      ),
    },
    {
      title: "Financial Activity",
      icon: Landmark,
      content: (
        <div className="grid grid-cols-3 gap-4">
          <div><p className="text-xs text-muted-foreground">Loans Taken</p><p className="text-xl font-bold">{customer.loansTaken}</p></div>
          <div><p className="text-xs text-muted-foreground">EMI Status</p><p className="font-medium">{customer.emiStatus}</p></div>
          <div><p className="text-xs text-muted-foreground">Credit Card Usage</p><p className="font-medium">{customer.creditCardUsage}</p></div>
        </div>
      ),
    },
    {
      title: "Complaint History",
      icon: MessageSquareWarning,
      content: (
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
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{customer.name}</h2>
          <p className="text-muted-foreground">{customer.accountType}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Risk Score</p>
            <p className="text-2xl font-bold font-mono">{customer.riskScore.toFixed(2)}</p>
          </div>
          <Badge className={`${riskBadgeClass[customer.riskLevel]} border-0 px-4 py-1.5 text-sm font-bold`}>
            {customer.riskLevel} Risk
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((s) => (
          <Card key={s.title} className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <s.icon className="h-4 w-4 text-accent" />
                {s.title}
              </CardTitle>
            </CardHeader>
            <CardContent>{s.content}</CardContent>
          </Card>
        ))}

        {/* AI Insights */}
        <Card className="shadow-sm border-accent/20 md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <BrainCircuit className="h-4 w-4 text-accent" />
              AI Risk Explanation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {customer.aiRiskReasons.map((reason, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-risk-medium" />
                  {reason}
                </li>
              ))}
            </ul>
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
