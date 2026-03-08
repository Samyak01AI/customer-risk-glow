import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Megaphone, Send, Mail, Smartphone, Bell } from "lucide-react";

const campaignData = [
  { id: "C001", name: "Cashback Retention Q1", segment: "High Risk", channel: "Email", sent: 245, opened: 189, converted: 42, status: "Completed" },
  { id: "C002", name: "Loan Discount Offer", segment: "Medium Risk", channel: "SMS", sent: 180, opened: 156, converted: 28, status: "Active" },
  { id: "C003", name: "App Re-engagement", segment: "High Risk", channel: "Push", sent: 320, opened: 198, converted: 65, status: "Active" },
  { id: "C004", name: "FD Renewal Reminder", segment: "Low Risk", channel: "Email", sent: 150, opened: 132, converted: 89, status: "Completed" },
];

const perfData = [
  { name: "Cashback Q1", sent: 245, opened: 189, converted: 42 },
  { name: "Loan Discount", sent: 180, opened: 156, converted: 28 },
  { name: "Re-engage", sent: 320, opened: 198, converted: 65 },
  { name: "FD Renewal", sent: 150, opened: 132, converted: 89 },
];

const channelIcons: Record<string, typeof Mail> = { Email: Mail, SMS: Smartphone, Push: Bell };

const CampaignManager = () => {
  const [segment, setSegment] = useState("");
  const [channel, setChannel] = useState("");
  const [campaignName, setCampaignName] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Campaign Manager</h2>
        <p className="text-muted-foreground">Launch and track customer retention campaigns</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-muted p-2"><Megaphone className="h-4 w-4 text-accent" /></div>
            <div><p className="text-xs text-muted-foreground">Total Campaigns</p><p className="text-xl font-bold">{campaignData.length}</p></div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-muted p-2"><Send className="h-4 w-4 text-risk-low" /></div>
            <div><p className="text-xs text-muted-foreground">Active</p><p className="text-xl font-bold">{campaignData.filter(c => c.status === "Active").length}</p></div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-muted p-2"><Send className="h-4 w-4 text-chart-5" /></div>
            <div><p className="text-xs text-muted-foreground">Avg Conversion</p><p className="text-xl font-bold">{Math.round(campaignData.reduce((a, c) => a + (c.converted / c.sent) * 100, 0) / campaignData.length)}%</p></div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-3"><CardTitle className="text-base">Create Campaign</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Campaign Name</Label>
              <Input placeholder="e.g. Summer Retention" value={campaignName} onChange={e => setCampaignName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Target Segment</Label>
              <Select value={segment} onValueChange={setSegment}>
                <SelectTrigger><SelectValue placeholder="Select segment" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Channel</Label>
              <Select value={channel} onValueChange={setChannel}>
                <SelectTrigger><SelectValue placeholder="Select channel" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="push">Push Notification</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                <Send className="h-4 w-4" /> Launch
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-2"><CardTitle className="text-base">Campaign Performance</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={perfData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip />
              <Legend />
              <Bar dataKey="sent" fill="hsl(221, 83%, 53%)" name="Sent" radius={[4, 4, 0, 0]} />
              <Bar dataKey="opened" fill="hsl(38, 92%, 50%)" name="Opened" radius={[4, 4, 0, 0]} />
              <Bar dataKey="converted" fill="hsl(142, 71%, 45%)" name="Converted" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-3"><CardTitle className="text-base">Campaign History</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Campaign</TableHead>
                <TableHead>Segment</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Opened</TableHead>
                <TableHead>Converted</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaignData.map(c => {
                const ChannelIcon = channelIcons[c.channel] || Mail;
                return (
                  <TableRow key={c.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`border-0 ${c.segment === "High Risk" ? "risk-badge-high" : c.segment === "Medium Risk" ? "risk-badge-medium" : "risk-badge-low"}`}>
                        {c.segment}
                      </Badge>
                    </TableCell>
                    <TableCell><div className="flex items-center gap-1.5"><ChannelIcon className="h-3.5 w-3.5" />{c.channel}</div></TableCell>
                    <TableCell>{c.sent}</TableCell>
                    <TableCell>{c.opened}</TableCell>
                    <TableCell className="font-semibold">{c.converted}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={c.status === "Active" ? "risk-badge-low" : "bg-muted text-muted-foreground"}>
                        {c.status}
                      </Badge>
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

export default CampaignManager;
