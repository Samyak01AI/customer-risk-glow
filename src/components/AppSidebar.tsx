import {
  LayoutDashboard, Users, BarChart3, MessageSquareWarning, Megaphone,
  BrainCircuit, LogOut, Activity, Settings, UserCog, ShieldAlert,
  UserCheck, Send, History, Headphones, TicketCheck, CheckCircle,
  Bell,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useNavigate } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useRole } from "@/contexts/RoleContext";
import type { LucideIcon } from "lucide-react";

interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

const adminNav: NavItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Customer Analytics", url: "/dashboard/customers", icon: Users },
  { title: "Risk Monitoring", url: "/dashboard/risk", icon: BarChart3 },
  { title: "Campaign Performance", url: "/dashboard/campaigns", icon: Megaphone },
  { title: "Complaint Analytics", url: "/dashboard/complaints", icon: MessageSquareWarning },
  { title: "AI Model Insights", url: "/dashboard/insights", icon: BrainCircuit },
  { title: "System Configuration", url: "/dashboard/settings", icon: Settings },
  { title: "User Management", url: "/dashboard/users", icon: UserCog },
];

const rmNav: NavItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "High Risk Customers", url: "/dashboard/risk", icon: ShieldAlert },
  { title: "Customer Profiles", url: "/dashboard/customers", icon: UserCheck },
  { title: "Outreach Campaigns", url: "/dashboard/campaigns", icon: Send },
  { title: "Recommended Actions", url: "/dashboard/actions", icon: BrainCircuit },
  { title: "Interaction History", url: "/dashboard/history", icon: History },
];

const supportNav: NavItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Complaint Monitoring", url: "/dashboard/complaints", icon: MessageSquareWarning },
  { title: "Sentiment Alerts", url: "/dashboard/sentiment", icon: Bell },
  { title: "Customer Profiles", url: "/dashboard/customers", icon: Users },
  { title: "Support Tickets", url: "/dashboard/tickets", icon: TicketCheck },
  { title: "Resolution History", url: "/dashboard/resolutions", icon: CheckCircle },
];

const navByRole = { admin: adminNav, rm: rmNav, support: supportNav };

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();
  const { role, roleName } = useRole();
  const navItems = navByRole[role];

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <div className="flex items-center gap-2 px-4 py-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary">
          <Activity className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <div>
            <h2 className="text-sm font-bold text-sidebar-primary-foreground">BANKPULSE AI</h2>
            <p className="text-[10px] text-sidebar-foreground/50">{roleName}</p>
          </div>
        )}
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={() => navigate("/")}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
