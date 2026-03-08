import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Phone, Mail, CreditCard, Smartphone, Zap, CheckCircle, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

const actions = [
  { customerId: "1", customerName: "Rahul Sharma", riskLevel: "High" as const, riskScore: 0.82, aiConfidence: 0.91, actions: [
    { type: "offer", label: "Send 5% cashback offer on credit card", icon: Gift },
    { type: "call", label: "Schedule RM call to discuss EMI restructuring", icon: Phone },
    { type: "email", label: "Send personalized financial wellness tips", icon: Mail },
  ]},
  { customerId: "4", customerName: "Sneha Kulkarni", riskLevel: "High" as const, riskScore: 0.67, aiConfidence: 0.88, actions: [
    { type: "offer", label: "Offer mutual fund SIP restart bonus", icon: CreditCard },
    { type: "call", label: "Follow up on app crash complaint", icon: Phone },
    { type: "email", label: "Send app update notification with new features", icon: Smartphone },
  ]},
  { customerId: "2", customerName: "Priya Patil", riskLevel: "Medium" as const, riskScore: 0.41, aiConfidence: 0.85, actions: [
    { type: "offer", label: "FD renewal with loyalty bonus rate", icon: Gift },
    { type: "email", label: "Send salary account upgrade benefits", icon: Mail },
  ]},
  { customerId: "5", customerName: "Vikram Joshi", riskLevel: "Medium" as const, riskScore: 0.33, aiConfidence: 0.82, actions: [
    { type: "offer", label: "Highlight competitive FD rates", icon: Gift },
    { type: "call", label: "Proactive call about FD maturity options", icon: Phone },
  ]},
];

const riskBadge: Record<string, string> = { Low: "risk-badge-low", Medium: "risk-badge-medium", High: "risk-badge-high" };

const RecommendedActions = () => {
  const [triggering, setTriggering] = useState<string | null>(null);

  const triggerOutreach = async (customerId: string, customerName: string) => {
    setTriggering(customerId);
    
    // Simulate sequential outreach triggers
    await new Promise(r => setTimeout(r, 600));
    toast.success(`📱 SMS sent to ${customerName}`, { description: "Personalized retention message delivered" });
    
    await new Promise(r => setTimeout(r, 800));
    toast.success(`📧 Email campaign triggered for ${customerName}`, { description: "Retention offer email queued" });
    
    await new Promise(r => setTimeout(r, 600));
    toast.success(`👤 RM notified about ${customerName}`, { description: "Priority follow-up assigned" });
    
    await new Promise(r => setTimeout(r, 400));
    toast.info(`✅ Full outreach sequence completed for ${customerName}`);
    
    setTriggering(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Recommended Actions</h2>
        <p className="text-muted-foreground">AI-suggested retention actions for at-risk customers</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {actions.map(a => (
          <Card key={a.customerId} className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{a.customerName}</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Confidence: <span className="font-mono font-semibold text-accent">{(a.aiConfidence * 100).toFixed(0)}%</span></span>
                  <span className="text-sm font-mono font-semibold">{a.riskScore.toFixed(2)}</span>
                  <Badge variant="secondary" className={`${riskBadge[a.riskLevel]} border-0`}>{a.riskLevel}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {a.actions.map((act, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                  <act.icon className="h-4 w-4 shrink-0 text-accent" />
                  <span className="text-sm flex-1">{act.label}</span>
                  <Button size="sm" variant={act.type === "offer" ? "default" : "outline"} className={act.type === "offer" ? "bg-accent text-accent-foreground hover:bg-accent/90" : ""}>
                    {act.type === "offer" ? "Send" : act.type === "call" ? "Schedule" : "Email"}
                  </Button>
                </div>
              ))}

              {/* Trigger Outreach Button */}
              <Button
                className="w-full gap-2 mt-2 bg-accent text-accent-foreground hover:bg-accent/90"
                disabled={triggering === a.customerId}
                onClick={() => triggerOutreach(a.customerId, a.customerName)}
              >
                {triggering === a.customerId ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground border-t-transparent" />
                    Triggering Outreach...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    Trigger Auto Outreach
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendedActions;
