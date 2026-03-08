import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Bell, Shield, Database } from "lucide-react";

const SystemSettings = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold">System Configuration</h2>
      <p className="text-muted-foreground">Manage system settings and preferences</p>
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base"><Bell className="h-4 w-4 text-accent" /> Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {["Email alerts for high-risk customers", "SMS notifications for critical complaints", "Push notifications for campaign updates", "Daily risk summary report"].map(item => (
            <div key={item} className="flex items-center justify-between">
              <Label className="text-sm">{item}</Label>
              <Switch defaultChecked />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base"><Shield className="h-4 w-4 text-accent" /> Risk Thresholds</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-sm">High Risk Threshold</Label>
            <Select defaultValue="0.7"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="0.6">0.60</SelectItem><SelectItem value="0.7">0.70</SelectItem><SelectItem value="0.8">0.80</SelectItem></SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm">Medium Risk Threshold</Label>
            <Select defaultValue="0.4"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="0.3">0.30</SelectItem><SelectItem value="0.4">0.40</SelectItem><SelectItem value="0.5">0.50</SelectItem></SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base"><Database className="h-4 w-4 text-accent" /> Data Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-sm">Data Refresh Interval</Label>
            <Select defaultValue="15"><SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="5">5 minutes</SelectItem><SelectItem value="15">15 minutes</SelectItem><SelectItem value="30">30 minutes</SelectItem></SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-sm">Auto-sync customer data</Label>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base"><Settings className="h-4 w-4 text-accent" /> AI Models</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {["Churn Prediction Model", "Sentiment Analysis Model", "Customer Segmentation", "Risk Scoring Engine"].map(m => (
            <div key={m} className="flex items-center justify-between">
              <Label className="text-sm">{m}</Label>
              <Switch defaultChecked />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  </div>
);

export default SystemSettings;
