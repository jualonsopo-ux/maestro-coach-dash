import { useState } from "react";
import { CoachingSidebar } from "./CoachingSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-background">
      <CoachingSidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      
      <main className="flex-1 overflow-auto">
        <div className="h-full animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}