import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserCog, Plus, Shield, Users, Headphones } from "lucide-react";

const users = [
  { id: "U001", name: "Admin User", email: "admin@bankpulse.ai", role: "admin", status: "Active", lastLogin: "2026-03-08" },
  { id: "U002", name: "Arjun Mehta", email: "arjun.m@bankpulse.ai", role: "rm", status: "Active", lastLogin: "2026-03-07" },
  { id: "U003", name: "Priyanka Shah", email: "priyanka.s@bankpulse.ai", role: "rm", status: "Active", lastLogin: "2026-03-06" },
  { id: "U004", name: "Anita Rao", email: "anita.r@bankpulse.ai", role: "support", status: "Active", lastLogin: "2026-03-08" },
  { id: "U005", name: "Raj Kumar", email: "raj.k@bankpulse.ai", role: "support", status: "Inactive", lastLogin: "2026-02-20" },
];

const roleLabels: Record<string, string> = { admin: "Bank Admin", rm: "Relationship Manager", support: "Support Agent" };
const roleIcons: Record<string, typeof Shield> = { admin: Shield, rm: Users, support: Headphones };

const UserManagement = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold">User Management</h2>
        <p className="text-muted-foreground">Manage system users and role assignments</p>
      </div>
      <Button className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
        <Plus className="h-4 w-4" /> Add User
      </Button>
    </div>

    <div className="grid grid-cols-3 gap-4">
      {(["admin", "rm", "support"] as const).map(role => {
        const Icon = roleIcons[role];
        return (
          <Card key={role} className="shadow-sm">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="rounded-lg bg-muted p-2"><Icon className="h-4 w-4 text-accent" /></div>
              <div><p className="text-xs text-muted-foreground">{roleLabels[role]}s</p><p className="text-xl font-bold">{users.filter(u => u.role === role).length}</p></div>
            </CardContent>
          </Card>
        );
      })}
    </div>

    <Card className="shadow-sm">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(u => (
              <TableRow key={u.id} className="hover:bg-muted/30">
                <TableCell className="font-medium">{u.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{u.email}</TableCell>
                <TableCell><Badge variant="secondary" className="text-xs">{roleLabels[u.role]}</Badge></TableCell>
                <TableCell>
                  <Badge variant="secondary" className={u.status === "Active" ? "risk-badge-low" : "bg-muted text-muted-foreground"}>
                    {u.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{u.lastLogin}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
);

export default UserManagement;
