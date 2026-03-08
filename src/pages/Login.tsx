import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Shield, Users, Headphones } from "lucide-react";
import { useRole, UserRole } from "@/contexts/RoleContext";

const Login = () => {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setRole((selectedRole || "admin") as UserRole);
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-accent p-3">
            <Activity className="h-8 w-8 text-accent-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground">BANKPULSE AI</h1>
          <p className="text-sm text-primary-foreground/60">Customer Intelligence & Churn Analytics</p>
        </div>

        <Card className="border-0 shadow-2xl">
          <CardHeader className="pb-4 pt-8 text-center">
            <h2 className="text-xl font-semibold text-foreground">Sign in to your account</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email / Username</Label>
                <Input id="email" placeholder="admin@bankpulse.ai" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Login As</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">
                      <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> Bank Admin</span>
                    </SelectItem>
                    <SelectItem value="rm">
                      <span className="flex items-center gap-2"><Users className="h-4 w-4" /> Relationship Manager</span>
                    </SelectItem>
                    <SelectItem value="support">
                      <span className="flex items-center gap-2"><Headphones className="h-4 w-4" /> Support Agent</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-11 text-base font-semibold">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
