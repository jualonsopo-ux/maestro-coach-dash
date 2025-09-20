import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Search, 
  Filter, 
  Users, 
  Calendar, 
  CreditCard, 
  MessageSquare, 
  Mail, 
  Phone, 
  Tag, 
  UserCheck,
  Clock,
  AlertCircle,
  Eye,
  Edit,
  ExternalLink,
  Plus,
  MoreHorizontal,
  ChevronRight,
  Euro,
  MapPin,
  Star,
  CheckCircle
} from "lucide-react";

// Mock data for demonstration
const mockLeads = [
  {
    id: "1",
    nombre: "Ana García",
    email: "ana.g***@email.com",
    telefono: "+34 6** *** 123",
    etapa: "S1_reservado",
    fuente: "Instagram",
    outcome: "S1 mañana 10:00",
    valor_estimado: 1200,
    ultima_interaccion: "2025-01-15T10:00:00Z",
    proximo_paso: "Confirmar asistencia S1",
    due_en: 1,
    score: 85,
    etiquetas: ["alta_prioridad", "instagram"],
    riesgos: [],
    ciudad: "Madrid",
    consents: { marketing: true, sms: true },
    objetivos: "Aumentar ventas en su negocio online",
    vertical: "E-commerce",
    objeciones: "Tiempo limitado",
    presupuesto: 1500,
    owner: "Coach Principal"
  },
  {
    id: "2",
    nombre: "Carlos Ruiz",
    email: "carlos.r***@email.com",
    telefono: "+34 6** *** 456",
    etapa: "S1_hecho",
    fuente: "Google Ads",
    outcome: "Muy interesado, quiere S2",
    valor_estimado: 2400,
    ultima_interaccion: "2025-01-14T16:30:00Z",
    proximo_paso: "Enviar enlace S2",
    due_en: 0,
    score: 92,
    etiquetas: ["google_ads", "caliente"],
    riesgos: [],
    ciudad: "Barcelona",
    consents: { marketing: true, sms: false },
    objetivos: "Escalar su agencia de marketing",
    vertical: "Agencia",
    objeciones: "Ninguna aparente",
    presupuesto: 3000,
    owner: "Coach Principal"
  },
  {
    id: "3",
    nombre: "Laura Martín",
    email: "laura.m***@email.com",
    telefono: "+34 6** *** 789",
    etapa: "Propuesta",
    fuente: "Referido",
    outcome: "Evaluando propuesta",
    valor_estimado: 3600,
    ultima_interaccion: "2025-01-13T09:15:00Z",
    proximo_paso: "Seguimiento propuesta",
    due_en: -1,
    score: 78,
    etiquetas: ["referido", "paquete_premium"],
    riesgos: ["precio"],
    ciudad: "Valencia",
    consents: { marketing: true, sms: true },
    objetivos: "Transformación digital completa",
    vertical: "Consultoría",
    objeciones: "Presupuesto ajustado",
    presupuesto: 4000,
    owner: "Coach Principal"
  }
];

const stages = [
  { id: "S1_reservado", label: "S1 reservado", color: "bg-blue-100 text-blue-800" },
  { id: "S1_hecho", label: "S1 hecho", color: "bg-green-100 text-green-800" },
  { id: "S2_reservado", label: "S2 reservado", color: "bg-purple-100 text-purple-800" },
  { id: "Propuesta", label: "Propuesta", color: "bg-orange-100 text-orange-800" },
  { id: "Ganado", label: "Ganado", color: "bg-emerald-100 text-emerald-800" },
  { id: "Perdido", label: "Perdido", color: "bg-gray-100 text-gray-800" }
];

export default function CRM() {
  const [activeTab, setActiveTab] = useState("pipeline");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [quickFilters, setQuickFilters] = useState({
    tareas_hoy: false,
    sin_proximo_paso: false,
    s1_hecho_sin_s2: false,
    no_show: false
  });

  const filteredLeads = mockLeads.filter(lead => {
    if (searchQuery && !lead.nombre.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !lead.email.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (quickFilters.tareas_hoy && lead.due_en !== 0) return false;
    if (quickFilters.sin_proximo_paso && lead.proximo_paso) return false;
    if (quickFilters.s1_hecho_sin_s2 && !(lead.etapa === "S1_hecho" && !lead.proximo_paso.includes("S2"))) return false;
    if (quickFilters.no_show && !lead.riesgos.includes("no_show")) return false;
    return true;
  });

  const getLeadsByStage = (stageId: string) => {
    return filteredLeads.filter(lead => lead.etapa === stageId);
  };

  const getAttentionList = () => {
    return filteredLeads.filter(lead => 
      lead.due_en <= 2 || 
      (lead.etapa === "S1_hecho" && !lead.proximo_paso.includes("S2")) ||
      lead.riesgos.includes("no_show")
    );
  };

  const formatTimeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    return "Ahora";
  };

  const getDueStatus = (dueEn: number) => {
    if (dueEn < 0) return { text: "Vencido", color: "text-red-600" };
    if (dueEn === 0) return { text: "Hoy", color: "text-orange-600" };
    if (dueEn === 1) return { text: "Mañana", color: "text-yellow-600" };
    return { text: `${dueEn}d`, color: "text-muted-foreground" };
  };

  const LeadCard = ({ lead }: { lead: typeof mockLeads[0] }) => {
    const stage = stages.find(s => s.id === lead.etapa);
    const dueStatus = getDueStatus(lead.due_en);
    
    return (
      <Card className={`cursor-pointer hover:shadow-md transition-shadow ${lead.due_en < 0 ? 'border-red-200' : ''} ${lead.score >= 80 ? 'border-green-200' : ''}`}>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-sm">{lead.nombre}</h4>
                <p className="text-xs text-muted-foreground">{lead.fuente}</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500" />
                <span className="text-xs font-medium">{lead.score}</span>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground">{lead.outcome}</p>
            
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-green-600">
                €{lead.valor_estimado.toLocaleString()}
              </span>
              <span className={dueStatus.color}>
                {dueStatus.text}
              </span>
            </div>
            
            <div className="space-y-2">
              <p className="text-xs font-medium">{lead.proximo_paso}</p>
              <div className="flex flex-wrap gap-1">
                {lead.etiquetas.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {lead.riesgos.map((risk) => (
                  <Badge key={risk} variant="destructive" className="text-xs">
                    {risk}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex gap-1 pt-2">
              <Button size="sm" variant="outline" className="h-7 text-xs">
                <Calendar className="w-3 h-3 mr-1" />
                S2
              </Button>
              <Button size="sm" variant="outline" className="h-7 text-xs">
                <CreditCard className="w-3 h-3 mr-1" />
                Pago
              </Button>
              <Button size="sm" variant="outline" className="h-7 text-xs">
                <MessageSquare className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const ContactInspector = ({ contactId }: { contactId: string }) => {
    const contact = mockLeads.find(l => l.id === contactId);
    if (!contact) return null;

    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{contact.nombre}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                {contact.email}
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {contact.etiquetas.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Teléfono:</span>
              <p>{contact.telefono}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Ciudad:</span>
              <p>{contact.ciudad}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Consent. Marketing:</span>
              <p>{contact.consents.marketing ? "Sí" : "No"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Consent. SMS:</span>
              <p>{contact.consents.sms ? "Sí" : "No"}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Timeline</h4>
          <div className="space-y-3">
            <div className="flex gap-3 p-3 bg-muted/50 rounded-lg">
              <Calendar className="w-4 h-4 mt-0.5 text-blue-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">S1 completada</p>
                <p className="text-xs text-muted-foreground">Hace 2 días</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-muted/50 rounded-lg">
              <Mail className="w-4 h-4 mt-0.5 text-green-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Email de bienvenida enviado</p>
                <p className="text-xs text-muted-foreground">Hace 3 días</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Ficha</h4>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-muted-foreground">Objetivos:</span>
              <p>{contact.objetivos}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Vertical:</span>
              <p>{contact.vertical}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Presupuesto:</span>
              <p>€{contact.presupuesto.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Lead Score:</span>
              <p>{contact.score}/100</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            <MessageSquare className="w-4 h-4 mr-2" />
            Recordatorio
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Calendar className="w-4 h-4 mr-2" />
            Programar
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">CRM</h1>
          <p className="text-muted-foreground">Gestiona contactos, pipeline y relaciones con clientes</p>
        </div>

        {/* Search and Quick Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar por nombre, email, nota o ID…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="tareas_hoy"
                checked={quickFilters.tareas_hoy}
                onCheckedChange={(checked) => setQuickFilters(prev => ({ ...prev, tareas_hoy: checked }))}
              />
              <Label htmlFor="tareas_hoy" className="text-sm">Tareas hoy</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="s1_hecho_sin_s2"
                checked={quickFilters.s1_hecho_sin_s2}
                onCheckedChange={(checked) => setQuickFilters(prev => ({ ...prev, s1_hecho_sin_s2: checked }))}
              />
              <Label htmlFor="s1_hecho_sin_s2" className="text-sm">S1 sin S2</Label>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedContacts.length > 0 && (
          <div className="flex gap-2 p-3 bg-muted/50 rounded-lg">
            <span className="text-sm font-medium">{selectedContacts.length} seleccionados:</span>
            <Button size="sm" variant="outline">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
            <Button size="sm" variant="outline">
              <MessageSquare className="w-4 h-4 mr-2" />
              SMS
            </Button>
            <Button size="sm" variant="outline">
              <Tag className="w-4 h-4 mr-2" />
              Etiquetar
            </Button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="contactos">Contactos</TabsTrigger>
          <TabsTrigger value="hotlist">
            <AlertCircle className="w-4 h-4 mr-2" />
            Necesitan atención
          </TabsTrigger>
        </TabsList>

        {/* Pipeline View */}
        <TabsContent value="pipeline">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {stages.map((stage) => {
              const stageLeads = getLeadsByStage(stage.id);
              return (
                <div key={stage.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm">{stage.label}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {stageLeads.length}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    {stageLeads.map((lead) => (
                      <Sheet key={lead.id}>
                        <SheetTrigger asChild>
                          <div onClick={() => setSelectedContact(lead.id)}>
                            <LeadCard lead={lead} />
                          </div>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Contacto</SheetTitle>
                            <SheetDescription>
                              Información detallada y acciones disponibles
                            </SheetDescription>
                          </SheetHeader>
                          <div className="mt-6">
                            <ContactInspector contactId={lead.id} />
                          </div>
                        </SheetContent>
                      </Sheet>
                    ))}
                  </div>
                  
                  {stageLeads.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Sin leads</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </TabsContent>

        {/* Contacts Table */}
        <TabsContent value="contactos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Contactos</span>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo contacto
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedContacts.length === filteredLeads.length}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedContacts(filteredLeads.map(l => l.id));
                          } else {
                            setSelectedContacts([]);
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Etapa</TableHead>
                    <TableHead>Próximo paso</TableHead>
                    <TableHead>Vence en</TableHead>
                    <TableHead>Último contacto</TableHead>
                    <TableHead className="text-right">Valor (€)</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => {
                    const stage = stages.find(s => s.id === lead.etapa);
                    const dueStatus = getDueStatus(lead.due_en);
                    
                    return (
                      <TableRow key={lead.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell>
                          <Checkbox
                            checked={selectedContacts.includes(lead.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedContacts(prev => [...prev, lead.id]);
                              } else {
                                setSelectedContacts(prev => prev.filter(id => id !== lead.id));
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium">{lead.nombre}</p>
                            <p className="text-sm text-muted-foreground">{lead.email}</p>
                            <div className="flex gap-1">
                              {lead.etiquetas.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={stage?.color}>
                            {stage?.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <p className="truncate text-sm">{lead.proximo_paso}</p>
                        </TableCell>
                        <TableCell>
                          <span className={dueStatus.color}>
                            {dueStatus.text}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {formatTimeAgo(lead.ultima_interaccion)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          €{lead.valor_estimado.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{lead.owner}</span>
                        </TableCell>
                        <TableCell>
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedContact(lead.id)}>
                                <ChevronRight className="w-4 h-4" />
                              </Button>
                            </SheetTrigger>
                            <SheetContent>
                              <SheetHeader>
                                <SheetTitle>Contacto</SheetTitle>
                                <SheetDescription>
                                  Información detallada y acciones disponibles
                                </SheetDescription>
                              </SheetHeader>
                              <div className="mt-6">
                                <ContactInspector contactId={lead.id} />
                              </div>
                            </SheetContent>
                          </Sheet>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hotlist */}
        <TabsContent value="hotlist">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                Necesitan atención
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Leads que requieren acción en las próximas 48h
              </p>
            </CardHeader>
            <CardContent>
              {getAttentionList().length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
                  <h3 className="font-medium mb-2">¡Todo al día!</h3>
                  <p className="text-muted-foreground">No hay contactos que requieran atención urgente.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Etapa</TableHead>
                      <TableHead>Motivo</TableHead>
                      <TableHead>Siguiente acción</TableHead>
                      <TableHead>Vence en</TableHead>
                      <TableHead className="w-32">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getAttentionList().map((lead) => {
                      const stage = stages.find(s => s.id === lead.etapa);
                      const dueStatus = getDueStatus(lead.due_en);
                      
                      let motivo = "";
                      if (lead.due_en <= 2) motivo = "Tarea vence pronto";
                      if (lead.etapa === "S1_hecho" && !lead.proximo_paso.includes("S2")) motivo = "S1 sin S2 programada";
                      if (lead.riesgos.includes("no_show")) motivo = "No-show sin gestionar";
                      
                      return (
                        <TableRow key={lead.id}>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="font-medium">{lead.nombre}</p>
                              <p className="text-sm text-muted-foreground">{lead.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={stage?.color}>
                              {stage?.label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{motivo}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{lead.proximo_paso}</span>
                          </TableCell>
                          <TableCell>
                            <span className={dueStatus.color}>
                              {dueStatus.text}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline">
                                <Mail className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <MessageSquare className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Calendar className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}