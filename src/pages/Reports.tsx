import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Euro, 
  Target, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Download, 
  Filter, 
  Calendar, 
  RefreshCw,
  Eye,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  BarChart as BarChartIcon,
  Map,
  Activity,
  AlertCircle,
  Info
} from "lucide-react";
import { BarChart, Bar, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Cell, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Reports() {
  const [dateRange, setDateRange] = useState("28d");
  const [compareEnabled, setCompareEnabled] = useState(true);
  const [granularity, setGranularity] = useState("semana");

  // Mock data
  const kpiData = {
    net_revenue: { value: 15420, delta: 12.5, trend: "up" },
    gross_revenue: { value: 18200, delta: 10.2, trend: "up" },
    take_rate: { value: 15.3, delta: -2.1, trend: "down" },
    aov: { value: 285, delta: 8.7, trend: "up" },
    showup_rate: { value: 72.5, delta: 5.2, trend: "up", status: "ok" },
    s1_to_s2: { value: 38.2, delta: -3.1, trend: "down", status: "ok" },
    s2_to_pay: { value: 42.8, delta: 6.3, trend: "up", status: "ok" },
    funnel_total: { value: 12.1, delta: 2.8, trend: "up", status: "ok" },
    refund_rate: { value: 1.8, delta: -0.5, trend: "down", status: "ok" },
    dispute_rate: { value: 0.9, delta: -0.2, trend: "down", status: "ok" },
    no_show_rate: { value: 27.5, delta: -5.2, trend: "down", status: "ok" }
  };

  const revenueData = [
    { periodo: "Sem 1", neto: 3200, bruto: 3800 },
    { periodo: "Sem 2", neto: 2800, bruto: 3400 },
    { periodo: "Sem 3", neto: 4100, bruto: 4800 },
    { periodo: "Sem 4", neto: 5320, bruto: 6200 }
  ];

  const funnelData = [
    { name: "S1 Reservadas", value: 245, fill: "#3B82F6" },
    { name: "S1 Show-up", value: 178, fill: "#10B981" },
    { name: "S2 Reservadas", value: 68, fill: "#F59E0B" },
    { name: "Pagos", value: 29, fill: "#EF4444" }
  ];

  const acquisitionData = [
    { name: "Instagram", value: 45, color: "#E91E63" },
    { name: "Google Ads", value: 30, color: "#2196F3" },
    { name: "Referidos", value: 15, color: "#4CAF50" },
    { name: "Directo", value: 10, color: "#FF9800" }
  ];

  const campaignData = [
    { campaign: "ig_stories_q4", s1: 124, pagos: 18, net_revenue: 5140, aov: 285, funnel_total: 14.5, roi: 3.2 },
    { campaign: "google_ads_coaching", s1: 89, pagos: 8, net_revenue: 2280, aov: 285, funnel_total: 9.0, roi: 1.8 },
    { campaign: "reels_motivacion", s1: 156, pagos: 12, net_revenue: 3420, aov: 285, funnel_total: 7.7, roi: 2.1 }
  ];

  const insights = [
    { type: "warning", title: "Show-up rate óptimo", message: "Tu tasa de show-up del 72.5% está por encima del objetivo. ¡Excelente trabajo!" },
    { type: "info", title: "Oportunidad S1→S2", message: "El 38.2% de conversión S1→S2 puede mejorarse añadiendo vídeo pitch en S1." },
    { type: "success", title: "Funnel saludable", message: "Tu funnel total del 12.1% supera el benchmark de la industria (8%)." }
  ];

  const ReportsHeader = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reportes</h1>
        <p className="text-muted-foreground">Analytics avanzados, KPIs y exportación de datos</p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 días</SelectItem>
                  <SelectItem value="28d">28 días</SelectItem>
                  <SelectItem value="90d">90 días</SelectItem>
                  <SelectItem value="ytd">Este año</SelectItem>
                  <SelectItem value="custom">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Switch 
                checked={compareEnabled} 
                onCheckedChange={setCompareEnabled}
                id="compare-toggle" 
              />
              <label htmlFor="compare-toggle" className="text-sm">Comparar con periodo anterior</label>
            </div>
            
            <Select value={granularity} onValueChange={setGranularity}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="día">Día</SelectItem>
                <SelectItem value="semana">Semana</SelectItem>
                <SelectItem value="mes">Mes</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtros
            </Button>
            
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
            
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const KPICard = ({ title, value, format, delta, trend, status }: any) => {
    const getTrendIcon = () => {
      if (trend === "up") return <TrendingUp className="w-4 h-4 text-green-500" />;
      if (trend === "down") return <TrendingDown className="w-4 h-4 text-red-500" />;
      return null;
    };

    const getStatusColor = () => {
      if (status === "ok") return "text-green-500";
      if (status === "warning") return "text-yellow-500";
      if (status === "critical") return "text-red-500";
      return "text-muted-foreground";
    };

    const formatValue = (val: number) => {
      if (format === "currency") return `€${val.toLocaleString()}`;
      if (format === "percent") return `${val}%`;
      return val.toString();
    };

    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <div className="flex items-center justify-between">
              <span className={`text-2xl font-bold ${getStatusColor()}`}>
                {formatValue(value)}
              </span>
              {compareEnabled && (
                <div className="flex items-center gap-1">
                  {getTrendIcon()}
                  <span className={`text-sm ${trend === "up" ? "text-green-500" : "text-red-500"}`}>
                    {delta > 0 ? "+" : ""}{delta}%
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const KPIsSection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Métricas Clave</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          title="Ingresos netos" 
          value={kpiData.net_revenue.value} 
          format="currency"
          delta={kpiData.net_revenue.delta}
          trend={kpiData.net_revenue.trend}
        />
        <KPICard 
          title="Ingresos brutos" 
          value={kpiData.gross_revenue.value} 
          format="currency"
          delta={kpiData.gross_revenue.delta}
          trend={kpiData.gross_revenue.trend}
        />
        <KPICard 
          title="Take rate efectivo" 
          value={kpiData.take_rate.value} 
          format="percent"
          delta={kpiData.take_rate.delta}
          trend={kpiData.take_rate.trend}
        />
        <KPICard 
          title="Ticket medio (AOV)" 
          value={kpiData.aov.value} 
          format="currency"
          delta={kpiData.aov.delta}
          trend={kpiData.aov.trend}
        />
        <KPICard 
          title="Show-up S1" 
          value={kpiData.showup_rate.value} 
          format="percent"
          delta={kpiData.showup_rate.delta}
          trend={kpiData.showup_rate.trend}
          status={kpiData.showup_rate.status}
        />
        <KPICard 
          title="S1 → S2" 
          value={kpiData.s1_to_s2.value} 
          format="percent"
          delta={kpiData.s1_to_s2.delta}
          trend={kpiData.s1_to_s2.trend}
          status={kpiData.s1_to_s2.status}
        />
        <KPICard 
          title="S2 → Pago" 
          value={kpiData.s2_to_pay.value} 
          format="percent"
          delta={kpiData.s2_to_pay.delta}
          trend={kpiData.s2_to_pay.trend}
          status={kpiData.s2_to_pay.status}
        />
        <KPICard 
          title="Funnel total" 
          value={kpiData.funnel_total.value} 
          format="percent"
          delta={kpiData.funnel_total.delta}
          trend={kpiData.funnel_total.trend}
          status={kpiData.funnel_total.status}
        />
      </div>
    </div>
  );

  const ChartsSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Análisis Visual</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChartIcon className="w-5 h-5" />
              Embudo S1 → Pago
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={funnelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChartIcon className="w-5 h-5" />
              Ingresos por periodo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsLineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="periodo" />
                <YAxis />
                <Tooltip formatter={(value) => [`€${value}`, ""]} />
                <Legend />
                <Line type="monotone" dataKey="neto" stroke="#10B981" strokeWidth={2} name="Neto" />
                <Line type="monotone" dataKey="bruto" stroke="#3B82F6" strokeWidth={2} name="Bruto" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="w-5 h-5" />
              Distribución por canal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={acquisitionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {acquisitionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Métricas de salud
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Tasa de reembolso</span>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="font-medium">{kpiData.refund_rate.value}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Tasa de disputas</span>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="font-medium">{kpiData.dispute_rate.value}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">No-show rate</span>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="font-medium">{kpiData.no_show_rate.value}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const TablesSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Análisis Detallado</h3>
      
      <Tabs defaultValue="campaigns">
        <TabsList>
          <TabsTrigger value="campaigns">Top Campañas</TabsTrigger>
          <TabsTrigger value="content">Contenido IG</TabsTrigger>
          <TabsTrigger value="anomalies">Anomalías</TabsTrigger>
        </TabsList>
        
        <TabsContent value="campaigns">
          <Card>
            <CardHeader>
              <CardTitle>Top campañas por ingresos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaña</TableHead>
                    <TableHead>S1</TableHead>
                    <TableHead>Pagos</TableHead>
                    <TableHead>Ingresos netos</TableHead>
                    <TableHead>AOV</TableHead>
                    <TableHead>Funnel total</TableHead>
                    <TableHead>ROI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaignData.map((campaign, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{campaign.campaign}</TableCell>
                      <TableCell>{campaign.s1}</TableCell>
                      <TableCell>{campaign.pagos}</TableCell>
                      <TableCell>€{campaign.net_revenue.toLocaleString()}</TableCell>
                      <TableCell>€{campaign.aov}</TableCell>
                      <TableCell>{campaign.funnel_total}%</TableCell>
                      <TableCell>
                        <Badge variant={campaign.roi > 2 ? "default" : "secondary"}>
                          {campaign.roi}x
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Top contenidos IG por ROI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>No hay datos de contenido IG para mostrar en este periodo.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="anomalies">
          <Card>
            <CardHeader>
              <CardTitle>Anomalías detectadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>Sin anomalías detectadas en el periodo seleccionado.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  const InsightsSection = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Insights y recomendaciones
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const getIcon = () => {
              switch (insight.type) {
                case "warning": return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
                case "success": return <CheckCircle className="w-5 h-5 text-green-500" />;
                case "info": return <Info className="w-5 h-5 text-blue-500" />;
                default: return <AlertCircle className="w-5 h-5 text-gray-500" />;
              }
            };

            return (
              <div key={index} className="flex gap-3 p-4 border rounded-lg">
                {getIcon()}
                <div>
                  <h4 className="font-medium">{insight.title}</h4>
                  <p className="text-sm text-muted-foreground">{insight.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-8">
      <ReportsHeader />
      <KPIsSection />
      <ChartsSection />
      <TablesSection />
      <InsightsSection />
    </div>
  );
}