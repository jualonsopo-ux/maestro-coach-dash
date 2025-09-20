import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Settings, 
  Save, 
  Zap, 
  Mail, 
  MessageSquare, 
  Clock, 
  CreditCard, 
  TestTube, 
  FileText, 
  ActivitySquare,
  Play,
  Plus,
  Copy,
  Trash2,
  Send,
  RefreshCw
} from "lucide-react";

export default function Automations() {
  const [activeTab, setActiveTab] = useState("workflows");
  const [automationsEnabled, setAutomationsEnabled] = useState(true);
  const [sandboxMode, setSandboxMode] = useState(false);

  const AutomationsHeader = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Automatizaciones</h1>
        <p className="text-muted-foreground">Configura recordatorios, prevención de ausencias y flujos automáticos</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configuración Global
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="automations-toggle">Activar automatizaciones</Label>
                <Switch 
                  id="automations-toggle"
                  checked={automationsEnabled}
                  onCheckedChange={setAutomationsEnabled}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sandbox-toggle">Modo prueba (no envía al cliente)</Label>
                <Switch 
                  id="sandbox-toggle"
                  checked={sandboxMode}
                  onCheckedChange={setSandboxMode}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Zona horaria</Label>
                <Select defaultValue="Europe/Madrid">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Europe/Madrid">Europa/Madrid</SelectItem>
                    <SelectItem value="Europe/London">Europa/Londres</SelectItem>
                    <SelectItem value="America/New_York">América/Nueva York</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label>Horario silencioso desde</Label>
                  <Input type="time" defaultValue="21:00" />
                </div>
                <div className="space-y-2">
                  <Label>Hasta</Label>
                  <Input type="time" defaultValue="08:00" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 pt-4 border-t">
            <Button variant="outline" className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Guardar cambios
            </Button>
            <Button className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Publicar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const WorkflowsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Constructor de Workflows</h3>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nuevo workflow
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <h4 className="font-medium">Aún no tienes workflows</h4>
              <p className="text-sm text-muted-foreground">Crea automatizaciones con disparadores, condiciones y acciones.</p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Crear primer workflow
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Palette de Componentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h5 className="font-medium mb-3">Disparadores</h5>
              <div className="space-y-2">
                {[
                  "Reserva creada (S1/S2/S3)",
                  "Sesión iniciada", 
                  "Sesión finalizada",
                  "Pago correcto",
                  "Pago fallido",
                  "Marcado no-show"
                ].map((trigger, i) => (
                  <div key={i} className="p-2 border rounded text-sm bg-muted/50 cursor-pointer hover:bg-muted">
                    {trigger}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="font-medium mb-3">Condiciones</h5>
              <div className="space-y-2">
                {[
                  "Tipo de sesión es (S1/S2/S3)",
                  "Tiene consentimiento marketing",
                  "Días hasta sesión < X",
                  "Canal UTM es",
                  "Tarjeta guardada disponible"
                ].map((condition, i) => (
                  <div key={i} className="p-2 border rounded text-sm bg-orange-50 cursor-pointer hover:bg-orange-100 dark:bg-orange-950 dark:hover:bg-orange-900">
                    {condition}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="font-medium mb-3">Acciones</h5>
              <div className="space-y-2">
                {[
                  "Enviar email",
                  "Enviar SMS", 
                  "Crear tarea CRM",
                  "Reintentar cobro",
                  "Enviar link reprogramación",
                  "Añadir etiqueta a lead"
                ].map((action, i) => (
                  <div key={i} className="p-2 border rounded text-sm bg-green-50 cursor-pointer hover:bg-green-100 dark:bg-green-950 dark:hover:bg-green-900">
                    {action}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const RecordatoriosTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Secuencias de Recordatorios</h3>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Secuencia S1
              </CardTitle>
              <Switch defaultChecked />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-3 border rounded">
                <Badge variant="outline">Email</Badge>
                <span className="text-sm">-24h</span>
                <span className="flex-1">Confirmación S1</span>
                <Button size="sm" variant="ghost">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-4 p-3 border rounded">
                <Badge variant="outline">Email</Badge>
                <span className="text-sm">-2h</span>
                <span className="flex-1">Recordatorio mañana</span>
                <Button size="sm" variant="ghost">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-4 p-3 border rounded">
                <Badge variant="outline">SMS</Badge>
                <span className="text-sm">-10m</span>
                <span className="flex-1">Recordatorio ahora</span>
                <Button size="sm" variant="ghost">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                <strong>Condición:</strong> Si email no abierto en 12h → enviar SMS
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Secuencia S2
              </CardTitle>
              <Switch defaultChecked />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-3 border rounded">
                <Badge variant="outline">Email</Badge>
                <span className="text-sm">-24h</span>
                <span className="flex-1">Confirmación S2</span>
                <Button size="sm" variant="ghost">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-4 p-3 border rounded">
                <Badge variant="outline">SMS</Badge>
                <span className="text-sm">-10m</span>
                <span className="flex-1">Recordatorio S2 ahora</span>
                <Button size="sm" variant="ghost">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const AntiNoShowTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Configuración Anti No-Show</h3>
      
      <Card>
        <CardContent className="p-6 space-y-6">
          {[
            { id: "require_setupintent", label: "Requerir tarjeta guardada (S1)", checked: true },
            { id: "max_booking_window_72h", label: "Reserva ≤ 72h vista", checked: true },
            { id: "auto_reschedule", label: "Sugerir reprogramación automática", checked: false },
            { id: "day_of_call_check", label: "Chequeo día-de (SMS/llamada)", checked: true }
          ].map((setting) => (
            <div key={setting.id} className="flex items-center justify-between">
              <Label htmlFor={setting.id}>{setting.label}</Label>
              <Switch id={setting.id} defaultChecked={setting.checked} />
            </div>
          ))}
          
          <div className="pt-4 border-t">
            <Button>Guardar configuración</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const CobrosTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Automatización de Cobros</h3>
      
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Label>Cobrar S2 al reservar</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Guardar tarjeta al final de S1</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Reintentos automáticos de pago</Label>
              <Switch defaultChecked />
            </div>
            
            <div className="space-y-3">
              <Label>Plan de reintentos</Label>
              <div className="flex gap-2">
                <Input placeholder="+6h" defaultValue="+6h" />
                <Input placeholder="+24h" defaultValue="+24h" />
                <Input placeholder="+72h" defaultValue="+72h" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Máximo intentos</Label>
              <Input type="number" defaultValue="3" className="w-20" />
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <Button>Guardar configuración</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ExperimentosTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">A/B Testing</h3>
      
      <div className="grid gap-4">
        {[
          { id: "hero_copy_variant", label: "Hero copy S1", variants: ["gratuita", "estrategia"] },
          { id: "video_in_s1", label: "Vídeo en S1", variants: ["on", "off"] },
          { id: "scarcity_timer", label: "Timer de escasez", variants: ["on", "off"] }
        ].map((flag) => (
          <Card key={flag.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{flag.label}</h4>
                  <p className="text-sm text-muted-foreground">Variantes: {flag.variants.join(", ")}</p>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue={flag.variants[0]}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {flag.variants.map(variant => (
                        <SelectItem key={variant} value={variant}>{variant}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button size="sm" variant="outline">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const PlantillasTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Gestión de Plantillas</h3>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nueva plantilla
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <h4 className="font-medium">Sin plantillas</h4>
              <p className="text-sm text-muted-foreground">Crea tu primera plantilla para email o SMS.</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                Variables disponibles: {"{coach_name}"}, {"{client_name}"}, {"{session_date}"}, {"{session_link}"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const LogsTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Logs de Automatización</h3>
      
      <Card>
        <CardHeader>
          <div className="flex gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="retry_payment">Reintento cobro</SelectItem>
                <SelectItem value="task">Tarea</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="sent">Enviado</SelectItem>
                <SelectItem value="failed">Fallido</SelectItem>
                <SelectItem value="skipped">Omitido</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Workflow</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Acción</TableHead>
                <TableHead>Canal</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Detalles</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No hay logs para mostrar
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const TestingTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Sandbox de Pruebas</h3>
      
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Contacto (test)</Label>
                <Input placeholder="Buscar contacto..." />
              </div>
              
              <div className="space-y-2">
                <Label>Disparador</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar disparador" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="booking_created">Reserva creada</SelectItem>
                    <SelectItem value="session_started">Sesión iniciada</SelectItem>
                    <SelectItem value="payment_failed">Pago fallido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Simular fecha/hora (opcional)</Label>
                <Input type="datetime-local" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Ejecutar simulación
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Enviar prueba a mí
                </Button>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Los resultados de la simulación aparecerán aquí
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Salvaguardas</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Respeta horario silencioso y zona horaria del contacto</li>
            <li>• No envía SMS sin consentimiento expreso</li>
            <li>• Limita a 3 recordatorios por sesión</li>
            <li>• Desduplica envíos si el usuario reprograma</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <AutomationsHeader />
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="workflows" className="text-xs">Workflows</TabsTrigger>
          <TabsTrigger value="recordatorios" className="text-xs">Recordatorios</TabsTrigger>
          <TabsTrigger value="anti_no_show" className="text-xs">Anti no-show</TabsTrigger>
          <TabsTrigger value="cobros" className="text-xs">Cobros</TabsTrigger>
          <TabsTrigger value="experimentos" className="text-xs">A/B Testing</TabsTrigger>
          <TabsTrigger value="plantillas" className="text-xs">Plantillas</TabsTrigger>
          <TabsTrigger value="logs" className="text-xs">Logs</TabsTrigger>
          <TabsTrigger value="testing" className="text-xs">Testing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="workflows" className="mt-6">
          <WorkflowsTab />
        </TabsContent>
        
        <TabsContent value="recordatorios" className="mt-6">
          <RecordatoriosTab />
        </TabsContent>
        
        <TabsContent value="anti_no_show" className="mt-6">
          <AntiNoShowTab />
        </TabsContent>
        
        <TabsContent value="cobros" className="mt-6">
          <CobrosTab />
        </TabsContent>
        
        <TabsContent value="experimentos" className="mt-6">
          <ExperimentosTab />
        </TabsContent>
        
        <TabsContent value="plantillas" className="mt-6">
          <PlantillasTab />
        </TabsContent>
        
        <TabsContent value="logs" className="mt-6">
          <LogsTab />
        </TabsContent>
        
        <TabsContent value="testing" className="mt-6">
          <TestingTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}