import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, Clock } from "lucide-react";

const resolutions = [
  { id: "R001", ticket: "ST004", customer: "Vikram Joshi", subject: "FD interest rate query", category: "Information", resolved: "2026-03-04", resolvedBy: "Anita R.", resolution: "Shared current FD rates and loyalty bonus program details", satisfaction: "Satisfied" },
  { id: "R002", ticket: "ST006", customer: "Meera Nair", subject: "UPI transaction failed", category: "Technical", resolved: "2026-03-02", resolvedBy: "System", resolution: "Auto-refund processed within 24 hours", satisfaction: "Satisfied" },
  { id: "R003", ticket: "ST007", customer: "Amit Deshmukh", subject: "Insurance renewal query", category: "Information", resolved: "2026-03-01", resolvedBy: "Anita R.", resolution: "Renewed insurance with updated premium details", satisfaction: "Satisfied" },
  { id: "R004", ticket: "ST008", customer: "Priya Patil", subject: "Debit card replacement", category: "Service", resolved: "2026-02-28", resolvedBy: "Raj K.", resolution: "New card dispatched, temporary virtual card activated", satisfaction: "Neutral" },
];

const ResolutionHistory = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold">Resolution History</h2>
      <p className="text-muted-foreground">Completed support ticket resolutions and satisfaction tracking</p>
    </div>

    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <Card className="shadow-sm">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="rounded-lg bg-muted p-2"><CheckCircle className="h-4 w-4 text-risk-low" /></div>
          <div><p className="text-xs text-muted-foreground">Total Resolved</p><p className="text-xl font-bold">{resolutions.length}</p></div>
        </CardContent>
      </Card>
      <Card className="shadow-sm">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="rounded-lg bg-muted p-2"><Clock className="h-4 w-4 text-accent" /></div>
          <div><p className="text-xs text-muted-foreground">Avg Resolution</p><p className="text-xl font-bold">1.2d</p></div>
        </CardContent>
      </Card>
      <Card className="shadow-sm">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="rounded-lg bg-muted p-2"><CheckCircle className="h-4 w-4 text-risk-low" /></div>
          <div><p className="text-xs text-muted-foreground">Satisfaction</p><p className="text-xl font-bold">92%</p></div>
        </CardContent>
      </Card>
      <Card className="shadow-sm">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="rounded-lg bg-muted p-2"><CheckCircle className="h-4 w-4 text-chart-5" /></div>
          <div><p className="text-xs text-muted-foreground">Auto-Resolved</p><p className="text-xl font-bold">25%</p></div>
        </CardContent>
      </Card>
    </div>

    <Card className="shadow-sm">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Resolved By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Resolution</TableHead>
              <TableHead>Satisfaction</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resolutions.map(r => (
              <TableRow key={r.id} className="hover:bg-muted/30">
                <TableCell className="font-mono text-sm">{r.id}</TableCell>
                <TableCell className="font-medium">{r.customer}</TableCell>
                <TableCell className="text-sm">{r.subject}</TableCell>
                <TableCell className="text-sm">{r.category}</TableCell>
                <TableCell className="text-sm">{r.resolvedBy}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{r.resolved}</TableCell>
                <TableCell className="text-sm max-w-xs truncate">{r.resolution}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={r.satisfaction === "Satisfied" ? "risk-badge-low" : "bg-muted text-muted-foreground"}>
                    {r.satisfaction}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
);

export default ResolutionHistory;
