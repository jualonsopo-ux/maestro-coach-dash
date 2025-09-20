import { useState } from "react";
import { Calendar as CalendarIcon, ExternalLink, Settings, TrendingUp, TrendingDown, Users, Euro, AlertCircle, Clock, ChevronRight, BarChart3, CreditCard, Package, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { cn } from "@/lib/utils";

// Mock data
const kpiData = {
  netIncome: { value: 1250, change: 12.3, period: "mes" },
  nextPayout: { value: 420, period: "próximos 7d" },
  showUpRate: { value: 62, period: "semana" },
  funnelRate: { value: 8.2, period: "total S1+Pago" }
};

const revenueData = [
  { day: '1', value: 120 },
  { day: '2', value: 180 },
  { day: '3', value: 150 },
  { day: '4', value: 220 },
  { day: '5', value: 280 },
  { day: '6', value: 240 },
  { day: '7', value: 320 },
];

const paymentHealthData = {
  savedCard: { percentage: 72, count: "72%" },
  pendingSCA: { count: 1 },
  failedPayments: { count: 2 },
  disputes: { count: 0 }
};

const tasksAndAlerts = [
  { time: "10:00", client: "Laura", type: "S1", status: "confirmed" },
  { time: "15:30", client: "Carlos", type: "S2", status: "pending" },
  { time: "17:00", client: "Andrea", type: "S3", status: "confirmed" },
];

const actionableInsights = [
  "Habilita 30'S para mejora el show-up",
  "Aumenta las plazas disponibles S1 esta semana", 
  "Integra un vídeo en la landing 'Bio'"
];

const paymentsByState = [
  { state: "Completados", value: 85, color: "bg-success" },
  { state: "Pendientes", value: 12, color: "bg-warning" },
  { state: "Fallidos", value: 3, color: "bg-destructive" }
];

export function HomePage() {
  const [dateRange, setDateRange] = useState("7");
  
  const dateRanges = [
    { value: "7", label: "7 días" },
    { value: "28", label: "28 días" },
    { value: "90", label: "90 días" }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Hola, María</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Últimos</span>
          <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
            {dateRanges.map((range) => (
              <Button
                key={range.value}
                variant={dateRange === range.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setDateRange(range.value)}
                className="h-8 px-3 text-xs"
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Net Income */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Ingresos netos ({kpiData.netIncome.period})</p>
              <p className="text-2xl font-bold text-foreground">€{kpiData.netIncome.value}</p>
            </div>
          </CardContent>
        </Card>

        {/* Next Payout */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Payouts {kpiData.nextPayout.period}</p>
              <p className="text-2xl font-bold text-foreground">€{kpiData.nextPayout.value}</p>
            </div>
          </CardContent>
        </Card>

        {/* Show Up Rate */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Show-up S1 ({kpiData.showUpRate.period})</p>
              <p className="text-2xl font-bold text-foreground">{kpiData.showUpRate.value}%</p>
            </div>
          </CardContent>
        </Card>

        {/* Funnel Rate */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Embudo {kpiData.funnelRate.period}</p>
              <p className="text-2xl font-bold text-foreground">{kpiData.funnelRate.value}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Ingresos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Payment Health */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Salud de cobros</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-muted-foreground">% tarjeta guardada</span>
              </div>
              <span className="text-sm font-medium">{paymentHealthData.savedCard.count}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span className="text-sm text-muted-foreground">SCA pendiente</span>
              </div>
              <span className="text-sm font-medium">{paymentHealthData.pendingSCA.count}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-destructive rounded-full"></div>
                <span className="text-sm text-muted-foreground">Pagos fallidos</span>
              </div>
              <span className="text-sm font-medium">{paymentHealthData.failedPayments.count}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-foreground rounded-full"></div>
                <span className="text-sm text-muted-foreground">Disputas</span>
              </div>
              <span className="text-sm font-medium">{paymentHealthData.disputes.count}</span>
            </div>

            <div className="pt-2 space-y-1">
              <p className="text-xs font-medium text-foreground">Cobros por estado</p>
              <div className="space-y-1">
                {paymentsByState.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={cn("h-2 rounded-full", item.color)} style={{ width: `${item.value}%` }}></div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks and Alerts */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Tareas y alertas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground font-medium border-b border-border pb-2">
                <span>Hora</span>
                <span>Cliente</span>
                <span>Tipo</span>
              </div>
              
              {tasksAndAlerts.map((task, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 py-2 text-sm">
                  <span className="text-foreground">{task.time}</span>
                  <span className="text-foreground">{task.client}</span>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">{task.type}</span>
                    <ChevronRight className="w-3 h-3 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Funnel Visualization */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Embudo S1+Pago</CardTitle>
            <p className="text-xs text-muted-foreground">(4 semanas)</p>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div className="relative">
                {/* Funnel visualization */}
                <div className="w-20 h-6 bg-primary rounded-t-lg"></div>
                <div className="w-16 h-6 bg-primary/80 mx-auto"></div>
                <div className="w-12 h-6 bg-primary/60 mx-auto"></div>
                <div className="w-8 h-6 bg-primary/40 mx-auto rounded-b-lg"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actionable Insights */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Insights accionables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {actionableInsights.map((insight, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  <span className="text-foreground">{insight}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" className="gap-2">
          <Package className="w-4 h-4" />
          Crear enlace S1
        </Button>
        <Button variant="outline" className="gap-2">
          <CreditCard className="w-4 h-4" />
          Cobrar paquete
        </Button>
        <Button variant="outline" className="gap-2">
          <Bell className="w-4 h-4" />
          Recordatorios de hoy
        </Button>
      </div>
    </div>
  );
}