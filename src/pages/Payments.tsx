import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  CreditCard, 
  TrendingUp, 
  TrendingDown,
  Search, 
  Download, 
  RefreshCw, 
  Calendar, 
  Filter,
  Euro,
  AlertTriangle,
  CheckCircle,
  Clock,
  Copy,
  ExternalLink,
  MoreHorizontal,
  Upload,
  Eye,
  Zap,
  Settings,
  Shield,
  FileText,
  Receipt,
  RotateCcw,
  Send,
  Ban
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Payments() {
  const [activeTab, setActiveTab] = useState("transacciones");
  const [dateRange, setDateRange] = useState("28d");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFailedOnly, setShowFailedOnly] = useState(false);
  const [showSCAOnly, setShowSCAOnly] = useState(false);
  const [showRefundsOnly, setShowRefundsOnly] = useState(false);

  // Mock data
  const kpiData = {
    gross_revenue: { value: 18420, delta: 15.3 },
    platform_fees: { value: 2763, delta: null },
    processor_fees: { value: 542, delta: null },
    net_to_coach: { value: 15115, delta: 14.8 },
    auth_rate: { value: 94.2, status: "warning" },
    dispute_rate: { value: 1.3, status: "ok" }
  };

  const billingHealth = {
    pm_on_file_rate: { value: 68.5, status: "warning" },
    sca_pending: { value: 3 },
    failed_48h: { value: 2 },
    open_disputes: { value: 1 }
  };

  const nextPayout = {
    date: "2025-09-22",
    amount: 3420
  };

  const transactionData = [
    {
      id: "pi_3N8vKf2eZvKYlo2C0bCgQ123",
      fecha: "2025-09-20 14:32",
      cliente: "María González",
      email: "maria@example.com",
      sesion: "S2 - Estrategia",
      bruto: 285,
      fee_platform: 42.75,
      fee_processor: 8.55,
      neto: 233.70,
      estado: "succeeded",
      metodo: "card",
      last4: "4242",
      currency: "EUR"
    },
    {
      id: "pi_3N8vKf2eZvKYlo2C0bCgQ124",
      fecha: "2025-09-20 11:15",
      cliente: "José Rodríguez",
      email: "jose@example.com",
      sesion: "S1 - Consulta",
      bruto: 0,
      fee_platform: 0,
      fee_processor: 0,
      neto: 0,
      estado: "failed",
      metodo: "card",
      last4: "1234",
      currency: "EUR"
    },
    {
      id: "pi_3N8vKf2eZvKYlo2C0bCgQ125",
      fecha: "2025-09-19 16:45",
      cliente: "Ana Martín",
      email: "ana@example.com",
      sesion: "S2 - Estrategia",
      bruto: 285,
      fee_platform: 42.75,
      fee_processor: 8.55,
      neto: 233.70,
      estado: "requires_action",
      metodo: "card",
      last4: "5678",
      currency: "EUR"
    }
  ];

  const payoutData = [
    {
      fecha: "2025-09-15",
      importe: 2850.40,
      estado: "paid",
      transfer_id: "tr_1N8vKf2eZvKYlo2C0bCgQ123"
    },
    {
      fecha: "2025-09-08",
      importe: 1950.20,
      estado: "paid",
      transfer_id: "tr_1N8vKf2eZvKYlo2C0bCgQ124"
    }
  ];

  const disputeData = [
    {
      fecha: "2025-09-18",
      cliente: "Cliente Anonimo",
      importe: 285,
      status: "warning_needs_response",
      deadline: "2025-09-25"
    }
  ];

  const PaymentsHeader = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pagos</h1>
        <p className="text-muted-foreground">Gestión de transacciones, payouts y disputas</p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por cliente, email, ID de pago o últimos 4 de tarjeta…"
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
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
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Switch 
                  checked={showFailedOnly} 
                  onCheckedChange={setShowFailedOnly}
                  id="failed-toggle" 
                />
                <label htmlFor="failed-toggle" className="text-sm">Fallidos</label>
              </div>
              
              <div className="flex items-center gap-2">
                <Switch 
                  checked={showSCAOnly} 
                  onCheckedChange={setShowSCAOnly}
                  id="sca-toggle" 
                />
                <label htmlFor="sca-toggle" className="text-sm">SCA pendiente</label>
              </div>
              
              <div className="flex items-center gap-2">
                <Switch 
                  checked={showRefundsOnly} 
                  onCheckedChange={setShowRefundsOnly}
                  id="refunds-toggle" 
                />
                <label htmlFor="refunds-toggle" className="text-sm">Reembolsos</label>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Exportar CSV
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Reconciliar con Stripe
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const KPICard = ({ title, value, format, delta, status }: any) => {
    const getTrendIcon = () => {
      if (!delta) return null;
      if (delta > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    };

    const getStatusColor = () => {
      if (status === "ok") return "text-green-500";
      if (status === "warning") return "text-yellow-500";
      if (status === "critical") return "text-red-500";
      return "text-foreground";
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
              {delta && (
                <div className="flex items-center gap-1">
                  {getTrendIcon()}
                  <span className={`text-sm ${delta > 0 ? "text-green-500" : "text-red-500"}`}>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <KPICard 
          title="Ingresos brutos" 
          value={kpiData.gross_revenue.value} 
          format="currency"
          delta={kpiData.gross_revenue.delta}
        />
        <KPICard 
          title="Comisión plataforma (take rate)" 
          value={kpiData.platform_fees.value} 
          format="currency"
        />
        <KPICard 
          title="Comisiones de procesamiento" 
          value={kpiData.processor_fees.value} 
          format="currency"
        />
        <KPICard 
          title="Neto al coach" 
          value={kpiData.net_to_coach.value} 
          format="currency"
          delta={kpiData.net_to_coach.delta}
        />
        <KPICard 
          title="Tasa de autorización" 
          value={kpiData.auth_rate.value} 
          format="percent"
          status={kpiData.auth_rate.status}
        />
        <KPICard 
          title="Tasa de disputas" 
          value={kpiData.dispute_rate.value} 
          format="percent"
          status={kpiData.dispute_rate.status}
        />
      </div>
    </div>
  );

  const WidgetsSection = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Salud de cobros
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">% con tarjeta guardada</p>
              <div className="flex items-center gap-2">
                <span className={`font-bold ${billingHealth.pm_on_file_rate.status === "warning" ? "text-yellow-500" : "text-green-500"}`}>
                  {billingHealth.pm_on_file_rate.value}%
                </span>
                {billingHealth.pm_on_file_rate.status === "warning" && 
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                }
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Pagos con SCA pendiente</p>
              <span className="font-bold">{billingHealth.sca_pending.value}</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Pagos fallidos (48h)</p>
              <span className="font-bold">{billingHealth.failed_48h.value}</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Disputas abiertas</p>
              <span className="font-bold">{billingHealth.open_disputes.value}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Euro className="w-5 h-5" />
            Próximo payout
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Fecha</p>
              <p className="font-medium">{nextPayout.date}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Importe</p>
              <p className="text-2xl font-bold">€{nextPayout.amount.toLocaleString()}</p>
            </div>
            <Button className="w-full flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Payout instantáneo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any, label: string }> = {
      succeeded: { variant: "default", label: "Exitoso" },
      processing: { variant: "secondary", label: "Procesando" },
      requires_action: { variant: "destructive", label: "SCA Pendiente" },
      failed: { variant: "destructive", label: "Fallido" },
      refunded: { variant: "outline", label: "Reembolsado" },
      paid: { variant: "default", label: "Pagado" },
      scheduled: { variant: "secondary", label: "Programado" },
      warning_needs_response: { variant: "destructive", label: "Requiere respuesta" },
      under_review: { variant: "secondary", label: "En revisión" },
      won: { variant: "default", label: "Ganado" },
      lost: { variant: "destructive", label: "Perdido" }
    };
    
    const config = variants[status] || { variant: "outline", label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const TransactionActions = ({ transaction }: any) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {transaction.estado === "failed" && (
          <>
            <DropdownMenuItem className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Reintentar cobro
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Enviar link de pago
            </DropdownMenuItem>
          </>
        )}
        {transaction.estado === "requires_action" && (
          <DropdownMenuItem className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Solicitar autenticación (SCA)
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className="flex items-center gap-2">
          <Receipt className="w-4 h-4" />
          Ver recibo
        </DropdownMenuItem>
        {transaction.estado === "succeeded" && (
          <DropdownMenuItem className="flex items-center gap-2">
            <Ban className="w-4 h-4" />
            Reembolsar…
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className="flex items-center gap-2">
          <Copy className="w-4 h-4" />
          Copiar ID
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <ExternalLink className="w-4 h-4" />
          Abrir en Stripe
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const TransaccionesTab = () => (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4 mb-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="succeeded">Exitoso</SelectItem>
                <SelectItem value="failed">Fallido</SelectItem>
                <SelectItem value="requires_action">SCA Pendiente</SelectItem>
                <SelectItem value="refunded">Reembolsado</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="S1">S1</SelectItem>
                <SelectItem value="S2">S2</SelectItem>
                <SelectItem value="S3">S3</SelectItem>
                <SelectItem value="package">Paquete</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Método" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="card">Tarjeta</SelectItem>
                <SelectItem value="sepa_debit">SEPA Debit</SelectItem>
                <SelectItem value="wallet">Wallet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Sesión</TableHead>
                <TableHead className="text-right">Bruto</TableHead>
                <TableHead className="text-right">Comisión</TableHead>
                <TableHead className="text-right">Procesamiento</TableHead>
                <TableHead className="text-right">Neto coach</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>ID</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionData.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.fecha}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{transaction.cliente}</p>
                      <p className="text-sm text-muted-foreground">{transaction.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.sesion}</TableCell>
                  <TableCell className="text-right">€{transaction.bruto}</TableCell>
                  <TableCell className="text-right">€{transaction.fee_platform}</TableCell>
                  <TableCell className="text-right">€{transaction.fee_processor}</TableCell>
                  <TableCell className="text-right font-medium">€{transaction.neto}</TableCell>
                  <TableCell>{getStatusBadge(transaction.estado)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      <span>****{transaction.last4}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                  <TableCell>
                    <TransactionActions transaction={transaction} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const PayoutsTab = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Historial de payouts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead className="text-right">Importe</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Transfer ID</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payoutData.map((payout, index) => (
                <TableRow key={index}>
                  <TableCell>{payout.fecha}</TableCell>
                  <TableCell className="text-right font-medium">€{payout.importe.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(payout.estado)}</TableCell>
                  <TableCell className="font-mono text-sm">{payout.transfer_id}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const DisputasTab = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Disputas / Reembolsos</CardTitle>
          <p className="text-sm text-muted-foreground">
            La tasa objetivo &lt; 2%. Sube evidencias antes del deadline para mejorar la resolución.
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="text-right">Importe</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Límite evidencia</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {disputeData.map((dispute, index) => (
                <TableRow key={index}>
                  <TableCell>{dispute.fecha}</TableCell>
                  <TableCell>{dispute.cliente}</TableCell>
                  <TableCell className="text-right">€{dispute.importe}</TableCell>
                  <TableCell>{getStatusBadge(dispute.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-red-500" />
                      <span>{dispute.deadline}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const AjustesTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Políticas de cobro</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="setupintent">Tarjeta guardada obligatoria en S1</Label>
            <Switch id="setupintent" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="charge-s2">Cobrar S2 al reservar</Label>
            <Switch id="charge-s2" defaultChecked />
          </div>
          <div className="space-y-2">
            <Label>Política no-show (texto visible al cliente)</Label>
            <Textarea placeholder="Ej.: Cancelación <24h se cobra 50%." />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reintentos automáticos (dunning)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-retry">Activar reintentos</Label>
            <Switch id="auto-retry" defaultChecked />
          </div>
          <div className="space-y-2">
            <Label>Plan de reintentos</Label>
            <div className="flex gap-2">
              <Input defaultValue="+6h" className="w-20" />
              <Input defaultValue="+24h" className="w-20" />
              <Input defaultValue="+72h" className="w-20" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Máximo intentos</Label>
            <Input type="number" defaultValue="3" className="w-20" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Métodos de pago</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="allow-card">Tarjeta (Visa/Mastercard…)</Label>
            <Switch id="allow-card" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="allow-sepa">SEPA Debit</Label>
            <Switch id="allow-sepa" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="allow-wallets">Wallets (Apple/Google Pay)</Label>
            <Switch id="allow-wallets" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <div className="pt-4">
        <Button>Guardar configuración</Button>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-8">
      <PaymentsHeader />
      <KPIsSection />
      <WidgetsSection />
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="transacciones">Transacciones</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="disputas">Disputas / Reembolsos</TabsTrigger>
          <TabsTrigger value="ajustes">Ajustes de cobro</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transacciones" className="mt-6">
          <TransaccionesTab />
        </TabsContent>
        
        <TabsContent value="payouts" className="mt-6">
          <PayoutsTab />
        </TabsContent>
        
        <TabsContent value="disputas" className="mt-6">
          <DisputasTab />
        </TabsContent>
        
        <TabsContent value="ajustes" className="mt-6">
          <AjustesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}