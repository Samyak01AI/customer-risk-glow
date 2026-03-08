import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TicketCheck, Clock, CheckCircle, AlertTriangle } from "lucide-react";

interface Ticket {
  id: string;
  customer: string;
  subject: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "In Progress" | "Resolved";
  created: string;
  category: string;
}

const initialTickets: Ticket[] = [
  { id: "ST001", customer: "Rahul Sharma", subject: "Credit card charge dispute", priority: "High", status: "Open", created: "2026-03-07", category: "Billing" },
  { id: "ST002", customer: "Sneha Kulkarni", subject: "App crash during transfer", priority: "Medium", status: "In Progress", created: "2026-03-06", category: "Technical" },
  { id: "ST003", customer: "Priya Patil", subject: "ATM card stuck", priority: "Low", status: "Open", created: "2026-03-05", category: "Service" },
  { id: "ST004", customer: "Vikram Joshi", subject: "FD interest rate query", priority: "Low", status: "Resolved", created: "2026-03-04", category: "Information" },
  { id: "ST005", customer: "Rahul Sharma", subject: "EMI restructuring request", priority: "High", status: "Open", created: "2026-03-03", category: "Loans" },
];

const priorityClass: Record<string, string> = { Low: "risk-badge-low", Medium: "risk-badge-medium", High: "risk-badge-high" };
const statusIcons: Record<string, typeof Clock> = { Open: AlertTriangle, "In Progress": Clock, Resolved: CheckCircle };

const SupportTickets = () => {
  const [tickets, setTickets] = useState(initialTickets);

  const resolve = (id: string) => setTickets(t => t.map(tk => tk.id === id ? { ...tk, status: "Resolved" as const } : tk));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Support Tickets</h2>
        <p className="text-muted-foreground">Manage and resolve customer support tickets</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-muted p-2"><TicketCheck className="h-4 w-4 text-accent" /></div>
            <div><p className="text-xs text-muted-foreground">Total</p><p className="text-xl font-bold">{tickets.length}</p></div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-muted p-2"><AlertTriangle className="h-4 w-4 text-risk-high" /></div>
            <div><p className="text-xs text-muted-foreground">Open</p><p className="text-xl font-bold">{tickets.filter(t => t.status === "Open").length}</p></div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-muted p-2"><CheckCircle className="h-4 w-4 text-risk-low" /></div>
            <div><p className="text-xs text-muted-foreground">Resolved</p><p className="text-xl font-bold">{tickets.filter(t => t.status === "Resolved").length}</p></div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Ticket</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map(t => {
                const StatusIcon = statusIcons[t.status];
                return (
                  <TableRow key={t.id} className="hover:bg-muted/30">
                    <TableCell className="font-mono text-sm">{t.id}</TableCell>
                    <TableCell className="font-medium">{t.customer}</TableCell>
                    <TableCell className="text-sm max-w-xs truncate">{t.subject}</TableCell>
                    <TableCell className="text-sm">{t.category}</TableCell>
                    <TableCell><Badge variant="secondary" className={`${priorityClass[t.priority]} border-0`}>{t.priority}</Badge></TableCell>
                    <TableCell><div className="flex items-center gap-1.5"><StatusIcon className="h-3.5 w-3.5" /><span className="text-sm">{t.status}</span></div></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{t.created}</TableCell>
                    <TableCell className="text-right">
                      {t.status !== "Resolved" && (
                        <Button size="sm" variant="outline" className="gap-1" onClick={() => resolve(t.id)}>
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
    </div>
  );
};

export default SupportTickets;
