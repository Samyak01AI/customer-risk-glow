import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageSquareWarning, AlertTriangle, CheckCircle, Clock, Send } from "lucide-react";
import { customers } from "@/data/mockData";

interface Ticket {
  id: string;
  customerId: string;
  customerName: string;
  category: string;
  urgency: "Low" | "Medium" | "High";
  sentiment: number;
  summary: string;
  status: "Open" | "In Progress" | "Resolved";
  aiSuggestion: string;
}

const mockTickets: Ticket[] = [
  { id: "T001", customerId: "1", customerName: "Rahul Sharma", category: "Billing", urgency: "High", sentiment: 0.22, summary: "Disputed charge on credit card — requesting immediate reversal", status: "Open", aiSuggestion: "Apologize for inconvenience, initiate chargeback process, offer credit card fee waiver for next quarter." },
  { id: "T002", customerId: "4", customerName: "Sneha Kulkarni", category: "Technical", urgency: "Medium", sentiment: 0.35, summary: "App crash during fund transfer — lost transaction visibility", status: "In Progress", aiSuggestion: "Confirm transaction status, provide transaction ID, escalate app crash to engineering team." },
  { id: "T003", customerId: "2", customerName: "Priya Patil", category: "Service", urgency: "Low", sentiment: 0.55, summary: "ATM withdrawal issue — card stuck temporarily", status: "Open", aiSuggestion: "Verify card status, check ATM logs, send replacement card if damaged." },
  { id: "T004", customerId: "5", customerName: "Vikram Joshi", category: "Information", urgency: "Low", sentiment: 0.62, summary: "Interest rate inquiry for FD renewal", status: "Resolved", aiSuggestion: "Share current FD rates, highlight loyalty bonus rates for existing customers." },
];

const urgencyClass: Record<string, string> = {
  Low: "risk-badge-low",
  Medium: "risk-badge-medium",
  High: "risk-badge-high",
};

const statusIcon: Record<string, typeof CheckCircle> = {
  Open: AlertTriangle,
  "In Progress": Clock,
  Resolved: CheckCircle,
};

const ComplaintMonitoring = () => {
  const [tickets, setTickets] = useState(mockTickets);

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === "Open").length,
    avgSentiment: (tickets.reduce((a, t) => a + t.sentiment, 0) / tickets.length).toFixed(2),
    highUrgency: tickets.filter(t => t.urgency === "High").length,
  };

  const resolveTicket = (id: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: "Resolved" as const } : t));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Complaint Monitoring</h2>
        <p className="text-muted-foreground">Track customer complaints, sentiment, and resolution status</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Complaints", value: stats.total, icon: MessageSquareWarning },
          { label: "Open Tickets", value: stats.open, icon: AlertTriangle },
          { label: "Avg Sentiment", value: stats.avgSentiment, icon: Clock },
          { label: "High Urgency", value: stats.highUrgency, icon: AlertTriangle },
        ].map(s => (
          <Card key={s.label} className="shadow-sm">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="rounded-lg bg-muted p-2"><s.icon className="h-4 w-4 text-accent" /></div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-xl font-bold">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-3"><CardTitle className="text-base">Support Tickets</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Ticket</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Sentiment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map(t => {
                const StatusIcon = statusIcon[t.status];
                return (
                  <TableRow key={t.id} className="hover:bg-muted/30">
                    <TableCell className="font-mono text-sm">{t.id}</TableCell>
                    <TableCell className="font-medium">{t.customerName}</TableCell>
                    <TableCell>{t.category}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`${urgencyClass[t.urgency]} border-0`}>{t.urgency}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={t.sentiment * 100} className="h-1.5 w-16" />
                        <span className="text-xs font-mono">{t.sentiment.toFixed(2)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <StatusIcon className="h-3.5 w-3.5" />
                        <span className="text-sm">{t.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {t.status !== "Resolved" && (
                        <Button size="sm" variant="outline" className="gap-1" onClick={() => resolveTicket(t.id)}>
                          <CheckCircle className="h-3 w-3" /> Resolve
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">AI-Suggested Responses</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {tickets.filter(t => t.status !== "Resolved").map(t => (
            <Card key={t.id} className="shadow-sm border-accent/10">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{t.customerName}</span>
                  <Badge variant="secondary" className={`${urgencyClass[t.urgency]} border-0 text-xs`}>{t.urgency}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{t.summary}</p>
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs font-medium text-accent mb-1">AI Suggestion</p>
                  <p className="text-sm">{t.aiSuggestion}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="gap-1 bg-accent text-accent-foreground hover:bg-accent/90">
                    <Send className="h-3 w-3" /> Reply
                  </Button>
                  <Button size="sm" variant="outline">Escalate</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComplaintMonitoring;
