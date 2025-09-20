import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  CreditCard,
  Users,
  Calendar,
  Zap,
  BarChart3,
  Settings,
  Menu,
  X,
  ChevronLeft,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "Inicio", href: "/", icon: Home },
  { name: "Pagos", href: "/payments", icon: CreditCard },
  { name: "CRM", href: "/crm", icon: Users },
  { name: "Calendario", href: "/calendar", icon: Calendar },
  { name: "Automatizaciones", href: "/automations", icon: Zap },
  { name: "Reportes", href: "/reports", icon: BarChart3 },
  { name: "Configuración", href: "/settings", icon: Settings },
];

interface CoachingSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function CoachingSidebar({ collapsed, onToggle }: CoachingSidebarProps) {
  const location = useLocation();

  return (
    <div
      className={cn(
        "relative h-screen bg-card border-r border-border transition-all duration-300 ease-smooth",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-primary rounded-lg">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-foreground">Marketplace</h1>
              <p className="text-xs text-muted-foreground">Coaching</p>
            </div>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="p-2 hover:bg-accent"
        >
          {collapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm rounded-lg transition-colors duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent",
                    collapsed && "justify-center"
                  )}
                >
                  <Icon className={cn("w-4 h-4", !collapsed && "mr-3")} />
                  {!collapsed && <span className="truncate">{item.name}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-3 p-3 bg-success-light rounded-lg">
            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-success-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-success truncate">¡Excelente mes!</p>
              <p className="text-xs text-success/80">+24% de ingresos</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}