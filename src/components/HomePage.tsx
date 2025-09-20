import { useState } from "react";
import { Calendar as CalendarIcon, ExternalLink, Settings, TrendingUp, TrendingDown, Users, Euro, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock data
const kpiData = {
  netIncome: { value: 4580, change: 12.3, period: "28d" },
  nextPayout: { value: 1250, date: "25 Oct" },
  showUpRate: { value: 94.2, change: 2.1 },
  conversionRate: { value: 32.8, change: -1.2 }
};

const upcomingSessions = [
  { id: 1, client: "María González", time: "10:00", type: "Coaching Inicial", status: "confirmed" },
  { id: 2, client: "Carlos Ruiz", time: "14:30", type: "Seguimiento", status: "pending" },
  { id: 3, client: "Ana López", time: "16:00", type: "Sesión Premium", status: "confirmed" },
];

export function HomePage() {
  const [dateRange, setDateRange] = useState("28d");
  
  const dateRanges = [
    { value: "7d", label: "7 días" },
    { value: "28d", label: "28 días" },
    { value: "90d", label: "90 días" }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Hola, Coach Ana</h1>
          <p className="text-muted-foreground">Aquí tienes un resumen de tu negocio</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Date Range Selector */}
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
          
          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <ExternalLink className="w-4 h-4" />
              Compartir Link
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="w-4 h-4" />
              Disponibilidad
            </Button>
          </div>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Net Income */}
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ingresos Netos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">€{kpiData.netIncome.value.toLocaleString()}</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-success" />
                  <span className="text-xs text-success">+{kpiData.netIncome.change}%</span>
                  <span className="text-xs text-muted-foreground">vs período anterior</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <Euro className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Payout */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Próximo Pago</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">€{kpiData.nextPayout.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{kpiData.nextPayout.date}</div>
              </div>
              <div className="w-10 h-10 bg-gradient-success rounded-full flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-success-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Show Up Rate */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tasa de Asistencia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">{kpiData.showUpRate.value}%</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-success" />
                  <span className="text-xs text-success">+{kpiData.showUpRate.change}%</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Rate */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tasa de Conversión</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">{kpiData.conversionRate.value}%</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="w-3 h-3 text-destructive" />
                  <span className="text-xs text-destructive">{kpiData.conversionRate.change}%</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Sessions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Próximas Sesiones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{session.client}</div>
                      <div className="text-sm text-muted-foreground">{session.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-foreground">{session.time}</div>
                    <Badge 
                      variant={session.status === "confirmed" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {session.status === "confirmed" ? "Confirmada" : "Pendiente"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <Button variant="outline" className="w-full">
                Ver Calendario Completo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Insights Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Insights Importantes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-success-light rounded-lg">
              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-success mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-success">Excelente tendencia</div>
                  <div className="text-xs text-success/80 mt-1">
                    Tus ingresos han aumentado un 24% este mes. ¡Sigue así!
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-warning/10 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-warning mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-warning">Optimización sugerida</div>
                  <div className="text-xs text-warning/80 mt-1">
                    Considera enviar recordatorios 24h antes para mejorar la asistencia.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-primary-light rounded-lg">
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-primary">Nuevos clientes</div>
                  <div className="text-xs text-primary/80 mt-1">
                    Tienes 3 nuevos leads esta semana. ¡Revisa tu CRM!
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}