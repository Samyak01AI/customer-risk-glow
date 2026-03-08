import { Button } from "@/components/ui/button";
import { ShieldAlert, ShieldCheck, Shield } from "lucide-react";

interface RiskFilterBarProps {
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
}

const RiskFilterBar = ({ activeFilter, onFilterChange }: RiskFilterBarProps) => {
  const filters = [
    { label: "All", value: null, icon: Shield, className: "bg-muted text-muted-foreground hover:bg-muted/80" },
    { label: "Low Risk", value: "Low", icon: ShieldCheck, className: "bg-risk-low-bg text-risk-low hover:opacity-80" },
    { label: "Medium Risk", value: "Medium", icon: ShieldAlert, className: "bg-risk-medium-bg text-risk-medium hover:opacity-80" },
    { label: "High Risk", value: "High", icon: ShieldAlert, className: "bg-risk-high-bg text-risk-high hover:opacity-80" },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((f) => (
        <Button
          key={f.label}
          variant="ghost"
          className={`gap-2 font-medium transition-all ${f.className} ${activeFilter === f.value ? "ring-2 ring-ring ring-offset-2" : ""}`}
          onClick={() => onFilterChange(f.value)}
        >
          <f.icon className="h-4 w-4" />
          {f.label}
        </Button>
      ))}
    </div>
  );
};

export default RiskFilterBar;
