import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  User,
  Palette,
  CreditCard,
  Calendar,
  Bell,
  Zap,
  Shield,
  Lock,
  Package,
  Plug,
  Code,
  Users,
  Upload,
  Download,
  Settings as SettingsIcon,
  Camera,
  Globe,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  ExternalLink,
  Plus,
  Trash2,
  RotateCcw,
  Eye,
  EyeOff,
  Copy,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for demonstration
const mockProfile = {
  avatar: "/placeholder-avatar.jpg",
  name: "Ana García Coach",
  handle: "ana-garcia",
  role: "coach",
  bio: "Coach especializada en emprendimiento y productividad personal",
  specialties: ["emprendimiento", "productividad", "liderazgo"],
  languages: ["es", "en"],
  location: "Madrid · Online",
  icf_level: "PCC",
  collegiate_id: ""
};

const mockIntegrations = {
  stripe: { connected: true, account_id: "acct_123456789" },
  calcom: { connected: true },
  google: { connected: false },
  outlook: { connected: false },
  whereby: { connected: true },
  zoom: { connected: false },
  sendgrid: { connected: false },
  mailchimp: { connected: false },
  ga4: { connected: true },
  meta: { connected: true }
};

const mockInvoices = [
  { id: "inv_1", date: "2025-01-15", amount: 29, status: "paid", invoice_id: "INV-2025-001" },
  { id: "inv_2", date: "2024-12-15", amount: 29, status: "paid", invoice_id: "INV-2024-012" },
  { id: "inv_3", date: "2024-11-15", amount: 29, status: "paid", invoice_id: "INV-2024-011" }
];

const mockTeamMembers = [
  { id: "1", name: "Ana García", email: "ana@example.com", role: "owner", status: "active" },
  { id: "2", name: "Carlos Ruiz", email: "carlos@example.com", role: "manager", status: "active" },
  { id: "3", name: "Laura Martín", email: "laura@example.com", role: "viewer", status: "pending" }
];

const navigationItems = [
  { id: "profile", label: "Perfil", icon: User },
  { id: "branding", label: "Marca & Página", icon: Palette },
  { id: "payments", label: "Pagos", icon: CreditCard },
  { id: "calendar", label: "Calendario", icon: Calendar },
  { id: "notifications", label: "Notificaciones", icon: Bell },
  { id: "automations", label: "Automatizaciones", icon: Zap },
  { id: "privacy", label: "Privacidad & RGPD", icon: Shield },
  { id: "security", label: "Seguridad", icon: Lock },
  { id: "plan_billing", label: "Plan & Facturación", icon: Package },
  { id: "integrations", label: "Integraciones", icon: Plug },
  { id: "api_webhooks", label: "API & Webhooks", icon: Code },
  { id: "team", label: "Equipo", icon: Users },
  { id: "data", label: "Importar/Exportar", icon: Upload }
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState("profile");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  const IntegrationCard = ({ title, connected, onConnect }: { title: string; connected: boolean; onConnect: () => void }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <Plug className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium">{title}</h3>
              <div className="flex items-center gap-2 mt-1">
                {connected ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">Conectado</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-muted-foreground">No conectado</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <Button 
            size="sm" 
            variant={connected ? "outline" : "default"}
            onClick={onConnect}
          >
            {connected ? "Configurar" : "Conectar"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Perfil del profesional</h2>
              <p className="text-muted-foreground">Esta información aparece en tu perfil público y link-in-bio.</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Foto de perfil</Label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                    <Camera className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Button size="sm">Subir foto</Button>
                    <p className="text-xs text-muted-foreground">JPG, PNG hasta 5MB</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre público</Label>
                  <Input id="name" defaultValue={mockProfile.name} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="handle">Handle (URL)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                      app.tu-marketplace.com/u/
                    </span>
                    <Input id="handle" defaultValue={mockProfile.handle} className="pl-44" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Rol</Label>
                  <Select defaultValue={mockProfile.role}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="coach">Coach</SelectItem>
                      <SelectItem value="psychologist">Psicólogo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación</Label>
                  <Input id="location" defaultValue={mockProfile.location} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio breve</Label>
                <Textarea 
                  id="bio" 
                  defaultValue={mockProfile.bio}
                  placeholder="Describe tu experiencia y especialidades..."
                  maxLength={240}
                />
                <p className="text-xs text-muted-foreground">240 caracteres máximo</p>
              </div>

              <div className="space-y-2">
                <Label>Idiomas</Label>
                <div className="flex gap-2">
                  <Badge variant="secondary">Español</Badge>
                  <Badge variant="secondary">Inglés</Badge>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Añadir
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Credenciales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="icf_level">ICF (coaching)</Label>
                    <Select defaultValue={mockProfile.icf_level}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="—">—</SelectItem>
                        <SelectItem value="ACC">ACC</SelectItem>
                        <SelectItem value="PCC">PCC</SelectItem>
                        <SelectItem value="MCC">MCC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Button>Guardar cambios</Button>
            </div>
          </div>
        );

      case "branding":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Marca & Página pública</h2>
                <p className="text-muted-foreground">Personaliza tu presencia online.</p>
              </div>
              <Button variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                Previsualizar
              </Button>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                  <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Sube tu logo (recomendado 4:1)</p>
                  <Button size="sm" className="mt-2">Seleccionar archivo</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="color_primary">Color primario</Label>
                  <div className="flex gap-2">
                    <Input type="color" defaultValue="#4f46e5" className="w-12 h-10" />
                    <Input defaultValue="#4f46e5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="domain">Subdominio personalizado</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                      coach.
                    </span>
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                      .tu-marketplace.com
                    </span>
                    <Input className="px-16" placeholder="tu-nombre" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Link-in-bio</Label>
                <div className="p-3 bg-muted rounded-lg">
                  <code className="text-sm">https://app.tu-marketplace.com/u/ana-garcia</code>
                  <Button size="sm" variant="outline" className="ml-2">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Añádelo en Instagram/TikTok</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Redes sociales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input id="instagram" placeholder="@tu_handle" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tiktok">TikTok</Label>
                    <Input id="tiktok" placeholder="@tu_handle" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input id="linkedin" placeholder="https://linkedin.com/in/..." />
                  </div>
                </CardContent>
              </Card>

              <Button>Guardar marca</Button>
            </div>
          </div>
        );

      case "payments":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Pagos</h2>
              <p className="text-muted-foreground">Conecta Stripe para cobrar y recibir payouts.</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Stripe Connect Express
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {mockIntegrations.stripe.connected ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="font-medium">Conectado</p>
                          <p className="text-sm text-muted-foreground">Cuenta: {mockIntegrations.stripe.account_id}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium">No conectado</p>
                          <p className="text-sm text-muted-foreground">Conecta para empezar a cobrar</p>
                        </div>
                      </>
                    )}
                  </div>
                  <Button variant={mockIntegrations.stripe.connected ? "outline" : "default"}>
                    {mockIntegrations.stripe.connected ? "Abrir Stripe" : "Conectar Stripe"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Políticas de cobro</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="require_setupintent">Guardar tarjeta en S1</Label>
                    <Switch id="require_setupintent" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="charge_s2_on_booking">Cobrar S2 al reservar</Label>
                    <Switch id="charge_s2_on_booking" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="no_show_window">Ventana no-show (horas)</Label>
                    <Input id="no_show_window" type="number" defaultValue="72" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Resumen de comisiones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Take rate plataforma:</span>
                    <span className="text-sm font-medium">5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Procesamiento Stripe:</span>
                    <span className="text-sm font-medium">2.9% + €0.30</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Ejemplo €100:</span>
                      <span className="font-medium">€91.80 neto</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button>Guardar configuración de pagos</Button>
          </div>
        );

      case "integrations":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Integraciones</h2>
              <p className="text-muted-foreground">Conecta servicios externos para ampliar funcionalidades.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <IntegrationCard 
                title="Whereby" 
                connected={mockIntegrations.whereby.connected}
                onConnect={() => {}}
              />
              <IntegrationCard 
                title="Zoom" 
                connected={mockIntegrations.zoom.connected}
                onConnect={() => {}}
              />
              <IntegrationCard 
                title="SendGrid" 
                connected={mockIntegrations.sendgrid.connected}
                onConnect={() => {}}
              />
              <IntegrationCard 
                title="Mailchimp" 
                connected={mockIntegrations.mailchimp.connected}
                onConnect={() => {}}
              />
              <IntegrationCard 
                title="Google Analytics 4" 
                connected={mockIntegrations.ga4.connected}
                onConnect={() => {}}
              />
              <IntegrationCard 
                title="Meta Pixel" 
                connected={mockIntegrations.meta.connected}
                onConnect={() => {}}
              />
            </div>
          </div>
        );

      case "plan_billing":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Plan & Facturación</h2>
              <p className="text-muted-foreground">Gestiona tu suscripción y métodos de pago.</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Plan actual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium">Coach Pro</h3>
                    <p className="text-sm text-muted-foreground">€29/mes • Facturación mensual</p>
                  </div>
                  <Button variant="outline">Cambiar plan</Button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Próxima factura:</span>
                    <span>15 febrero 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Método de pago:</span>
                    <span>•••• 4242</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Historial de facturas</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead className="text-right">Importe</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Factura</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell className="text-right">€{invoice.amount}</TableCell>
                        <TableCell>
                          <Badge variant={invoice.status === "paid" ? "default" : "secondary"}>
                            {invoice.status === "paid" ? "Pagado" : "Pendiente"}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{invoice.invoice_id}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
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

      case "api_webhooks":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">API & Webhooks</h2>
              <p className="text-muted-foreground">Configura integraciones personalizadas.</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>API Key</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Input 
                    type={showApiKey ? "text" : "password"} 
                    value="sk_test_123456789abcdef" 
                    readOnly 
                    className="font-mono"
                  />
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Úsala para integraciones personalizadas. Mantén esta clave segura.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Webhooks
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Añadir webhook
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Code className="w-12 h-12 mx-auto mb-4" />
                  <p>No hay webhooks configurados</p>
                  <p className="text-sm">Añade URLs para recibir eventos en tiempo real</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "team":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Equipo</h2>
                <p className="text-muted-foreground">Gestiona miembros y permisos.</p>
              </div>
              <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Invitar miembro
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Invitar miembro</DialogTitle>
                    <DialogDescription>
                      Añade un nuevo miembro a tu equipo
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="invite_email">Email</Label>
                      <Input id="invite_email" type="email" placeholder="email@ejemplo.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="invite_role">Rol</Label>
                      <Select defaultValue="manager">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="owner">Propietario</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="viewer">Visualizador</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button className="flex-1">Enviar invitación</Button>
                      <Button variant="outline" onClick={() => setShowInviteModal(false)}>
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTeamMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{member.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={member.status === "active" ? "default" : "secondary"}>
                            {member.status === "active" ? "Activo" : "Pendiente"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              Editar
                            </Button>
                            {member.role !== "owner" && (
                              <Button size="sm" variant="outline">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
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

      case "security":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Seguridad</h2>
              <p className="text-muted-foreground">Protege tu cuenta y datos.</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Autenticación de dos factores (2FA)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">2FA desactivado</p>
                    <p className="text-sm text-muted-foreground">
                      Añade una capa extra de seguridad a tu cuenta
                    </p>
                  </div>
                  <Button>Configurar 2FA</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sesiones activas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Navegador actual</p>
                      <p className="text-sm text-muted-foreground">Chrome • Madrid, España • Ahora</p>
                    </div>
                    <Badge variant="secondary">Actual</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">iPhone</p>
                      <p className="text-sm text-muted-foreground">Safari • Madrid, España • Hace 2 horas</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Cerrar
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Cerrar todas las demás sesiones
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configuración adicional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="new_device_alerts">Alertas de nuevo dispositivo</Label>
                  <Switch id="new_device_alerts" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Notificaciones</h2>
              <p className="text-muted-foreground">Configura recordatorios y comunicaciones automáticas.</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Configuración general</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quiet_start">Inicio horas silenciosas</Label>
                    <Input id="quiet_start" type="time" defaultValue="21:00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quiet_end">Fin horas silenciosas</Label>
                    <Input id="quiet_end" type="time" defaultValue="08:00" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email_notifications">Notificaciones por email</Label>
                  <Switch id="email_notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms_notifications">Notificaciones SMS</Label>
                  <Switch id="sms_notifications" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="s1">
              <TabsList>
                <TabsTrigger value="s1">Plantillas S1</TabsTrigger>
                <TabsTrigger value="s2">Plantillas S2/S3</TabsTrigger>
              </TabsList>
              <TabsContent value="s1" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Email T-24h</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      placeholder="Plantilla de recordatorio 24h antes..."
                      defaultValue="Hola {cliente}, mañana tienes tu sesión S1 a las {hora}. ¡Te esperamos!"
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">SMS T-10m</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      placeholder="Plantilla SMS 10min antes..."
                      defaultValue="¡Tu sesión S1 comienza en 10 minutos! Link: {enlace}"
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="s2" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Confirmación S2</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      placeholder="Plantilla confirmación S2..."
                      defaultValue="¡Perfecto! Tu sesión S2 está confirmada para el {fecha} a las {hora}."
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex gap-2">
              <Button>Guardar plantillas</Button>
              <Button variant="outline">Enviar prueba</Button>
            </div>
          </div>
        );

      case "data":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Importar/Exportar</h2>
              <p className="text-muted-foreground">Gestiona tus datos y migraciones.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Importar datos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Contactos (CSV)</Label>
                    <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Arrastra tu archivo CSV aquí</p>
                      <Button size="sm" className="mt-2">Seleccionar archivo</Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Formato: nombre, email, teléfono, notas
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Exportar datos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar contactos (CSV)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar pagos (CSV)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar sesiones (CSV)
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Zona de peligro
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-red-600">Eliminar todos los datos</h4>
                    <p className="text-sm text-muted-foreground">
                      Esta acción eliminará permanentemente todos tus datos. No se puede deshacer.
                    </p>
                  </div>
                  <Button variant="destructive">
                    Eliminar cuenta y datos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Configuración</h2>
              <p className="text-muted-foreground">Selecciona una sección del menú de la izquierda.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Navigation */}
      <div className="w-64 bg-muted/30 border-r overflow-auto">
        <div className="p-6">
          <h1 className="text-lg font-semibold mb-6">Configuración</h1>
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors",
                    activeSection === item.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}