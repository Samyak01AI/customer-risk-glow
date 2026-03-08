import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import type { Customer } from "@/data/mockData";

interface CustomerTableProps {
  customers: Customer[];
}

const riskBadgeClass: Record<string, string> = {
  Low: "risk-badge-low",
  Medium: "risk-badge-medium",
  High: "risk-badge-high",
};

const CustomerTable = ({ customers }: CustomerTableProps) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Customer</TableHead>
            <TableHead className="font-semibold">Risk Score</TableHead>
            <TableHead className="font-semibold">Risk Level</TableHead>
            <TableHead className="font-semibold">Last Activity</TableHead>
            <TableHead className="font-semibold text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((c) => (
            <TableRow key={c.id} className="hover:bg-muted/30 transition-colors">
              <TableCell className="font-medium">{c.name}</TableCell>
              <TableCell>
                <span className="font-mono font-semibold">{c.riskScore.toFixed(2)}</span>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className={`${riskBadgeClass[c.riskLevel]} border-0 font-semibold`}>
                  {c.riskLevel}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{c.lastActivity}</TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5"
                  onClick={() => navigate(`/dashboard/customer/${c.id}`)}
                >
                  <Eye className="h-3.5 w-3.5" />
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerTable;
