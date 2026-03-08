import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Phone, Mail, Gift, MessageSquare } from "lucide-react";

const interactions = [
  { id: "I001", customer: "Rahul Sharma", type: "Call", date: "2026-03-05", agent: "Arjun M.", summary: "Discussed EMI restructuring options", outcome: "Follow-up scheduled" },
  { id: "I002", customer: "Sneha Kulkarni", type: "Email", date: "2026-03-04", agent: "Priyanka S.", summary: "Sent app update notification", outcome: "Opened" },
  { id: "I003", customer: "Priya Patil", type: "Offer", date: "2026-03-03", agent: "System", summary: "FD renewal bonus rate offer sent", outcome: "Accepted" },
  { id: "I004", customer: "Rahul Sharma", type: "SMS", date: "2026-03-02", agent: "System", summary: "Payment reminder for overdue EMI", outcome: "Read" },
  { id: "I005", customer: "Vikram Joshi", type: "Call", date: "2026-03-01", agent: "Arjun M.", summary: "Proactive call about FD maturity", outcome: "Interested in renewal" },
  { id: "I006", customer: "Sneha Kulkarni", type: "Email", date: "2026-02-28", agent: "Priyanka S.", summary: "Complaint follow-up about app crash", outcome: "Resolved" },
];

const typeIcons: Record<string, typeof Phone> = { Call: Phone, Email: Mail, Offer: Gift, SMS: MessageSquare };

const InteractionHistory = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold">Interaction History</h2>
      <p className="text-muted-foreground">Track all customer interactions and outreach activities</p>
    </div>

    <Card className="shadow-sm">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead>Summary</TableHead>
              <TableHead>Outcome</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {interactions.map(i => {
              const Icon = typeIcons[i.type] || Mail;
              return (
                <TableRow key={i.id} className="hover:bg-muted/30">
                  <TableCell className="text-sm text-muted-foreground">{i.date}</TableCell>
                  <TableCell className="font-medium">{i.customer}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <Icon className="h-3.5 w-3.5 text-accent" />
                      <span className="text-sm">{i.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{i.agent}</TableCell>
                  <TableCell className="text-sm max-w-xs truncate">{i.summary}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">{i.outcome}</Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
);

export default InteractionHistory;
