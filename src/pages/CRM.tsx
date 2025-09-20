import { useState } from "react";
import { useContacts } from "@/hooks/useContacts";
import { useToast } from "@/hooks/use-toast";
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
import { Skeleton } from "@/components/ui/skeleton";
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

// Pipeline stages configuration
const stages = [
  { id: "S1_reservado", label: "S1 reservado", color: "bg-blue-100 text-blue-800" },
  { id: "S1_hecho", label: "S1 hecho", color: "bg-green-100 text-green-800" },
  { id: "S2_reservado", label: "S2 reservado", color: "bg-yellow-100 text-yellow-800" },
  { id: "Propuesta", label: "Propuesta", color: "bg-purple-100 text-purple-800" },
  { id: "Ganado", label: "Ganado", color: "bg-emerald-100 text-emerald-800" },
  { id: "Perdido", label: "Perdido", color: "bg-red-100 text-red-800" }
];

export default function CRM() {
  const { contacts, loading, error, updateContactStage, updateContactField } = useContacts();
  const { toast } = useToast();
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

  // Filter contacts based on search and quick filters
  const filteredLeads = contacts.filter(lead => {
    if (searchQuery && !lead.nombre.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !lead.email.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (quickFilters.tareas_hoy && lead.due_en !== 0) return false;
    if (quickFilters.sin_proximo_paso && lead.proximo_paso) return false;
    if (quickFilters.s1_hecho_sin_s2 && !(lead.etapa === "S1_hecho" && !lead.proximo_paso?.includes("S2"))) return false;
    if (quickFilters.no_show && !lead.riesgos.includes("no_show")) return false;
    return true;
  });

  // Group leads by stage for kanban view
  const getLeadsByStage = (stageId: string) => {
    return filteredLeads.filter(lead => lead.etapa === stageId);
  };

  // Get leads that need attention
  const getAttentionList = () => {
    return filteredLeads.filter(lead => 
      lead.due_en <= 2 || 
      (lead.etapa === "S1_hecho" && !lead.proximo_paso?.includes("S2")) ||
      lead.riesgos.includes("no_show")
    );
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return `${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d`;
  };

  const getDueStatus = (dueEn: number) => {
    if (dueEn < 0) return { text: "Vencido", color: "text-red-600" };
    if (dueEn === 0) return { text: "Hoy", color: "text-orange-600" };
    if (dueEn === 1) return { text: "Mañana", color: "text-yellow-600" };
    return { text: `${dueEn}d`, color: "text-muted-foreground" };
  };

  const handleStageChange = async (contactId: string, newStage: string) => {
    try {
      await updateContactStage(contactId, newStage);
      toast({
        title: "Etapa actualizada",
        description: "El contacto se movió a la nueva etapa correctamente.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar la etapa del contacto.",
        variant: "destructive",
      });
    }
  };

  const LeadCard = ({ lead }: { lead: typeof contacts[0] }) => {
    const stage = stages.find(s => s.id === lead.etapa);
    const dueStatus = getDueStatus(lead.due_en);
    
    return (
      <Card className={`cursor-pointer hover:shadow-md transition-shadow ${lead.due_en < 0 ? 'border-red-200' : ''} ${lead.score >= 80 ? 'border-green-200' : ''}`}>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-sm">{lead.nombre}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {lead.fuente}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Score: {lead.score}
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground">{lead.outcome}</p>
            
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-green-600">
                €{lead.valor_estimado?.toLocaleString() || 0}
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
            
            <div className="flex gap-1">
              <Button size="sm" variant="outline" className="text-xs h-7 flex-1">
                <Calendar className="w-3 h-3 mr-1" />
                Programar S2
              </Button>
              <Button size="sm" variant="outline" className="text-xs h-7 flex-1">
                <CreditCard className="w-3 h-3 mr-1" />
                Enviar pago
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const ContactInspector = ({ contactId }: { contactId: string }) => {
    const contact = contacts.find(l => l.id === contactId);
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
              <div className="flex gap-2">
                {contact.etiquetas.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Email</Label>
              <p className="text-sm">{contact.email}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Teléfono</Label>
              <p className="text-sm">{contact.telefono}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Ciudad</Label>
              <p className="text-sm">{contact.ciudad || "No especificada"}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Owner</Label>
              <p className="text-sm">{contact.owner}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-sm">Consentimientos</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Marketing</span>
                <Badge variant={contact.consents.marketing ? "default" : "secondary"}>
                  {contact.consents.marketing ? "Sí" : "No"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">SMS</span>
                <Badge variant={contact.consents.sms ? "default" : "secondary"}>
                  {contact.consents.sms ? "Sí" : "No"}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Ficha del cliente</h4>
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground">Objetivos</Label>
              <p className="text-sm mt-1">{contact.objetivos || "No especificados"}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Vertical</Label>
              <p className="text-sm mt-1">{contact.vertical || "No especificado"}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Objeciones</Label>
              <p className="text-sm mt-1">{contact.objeciones || "Ninguna"}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Presupuesto</Label>
              <p className="text-sm mt-1">€{contact.presupuesto?.toLocaleString() || "No especificado"}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            <MessageSquare className="w-4 h-4 mr-2" />
            Enviar recordatorio
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Calendar className="w-4 h-4 mr-2" />
            Programar sesión
          </Button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">CRM</h1>
          <Skeleton className="h-10 w-64" />
        </div>
        <div className="grid grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Error al cargar contactos</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">CRM</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar por nombre, email, nota o ID…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex items-center gap-4">
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
            id="sin_proximo_paso" 
            checked={quickFilters.sin_proximo_paso}
            onCheckedChange={(checked) => setQuickFilters(prev => ({ ...prev, sin_proximo_paso: checked }))}
          />
          <Label htmlFor="sin_proximo_paso" className="text-sm">Sin próximo paso</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch 
            id="s1_hecho_sin_s2" 
            checked={quickFilters.s1_hecho_sin_s2}
            onCheckedChange={(checked) => setQuickFilters(prev => ({ ...prev, s1_hecho_sin_s2: checked }))}
          />
          <Label htmlFor="s1_hecho_sin_s2" className="text-sm">S1 hecho · sin S2</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch 
            id="no_show" 
            checked={quickFilters.no_show}
            onCheckedChange={(checked) => setQuickFilters(prev => ({ ...prev, no_show: checked }))}
          />
          <Label htmlFor="no_show" className="text-sm">No-show</Label>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="contactos">Contactos</TabsTrigger>
          <TabsTrigger value="hotlist">Necesitan atención</TabsTrigger>
        </TabsList>

        {/* Pipeline View */}
        <TabsContent value="pipeline" className="space-y-4">
          <div className="grid grid-cols-6 gap-4">
            {stages.map((stage) => {
              const stageLeads = getLeadsByStage(stage.id);
              return (
                <div key={stage.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className={stage.color}>
                      {stage.label}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {stageLeads.length}
                    </span>
                  </div>
                  <div className="space-y-3 min-h-[400px]">
                    {stageLeads.map((lead) => (
                      <div key={lead.id} 
                           onClick={() => setSelectedContact(lead.id)}
                           onDragStart={(e) => e.dataTransfer.setData("text/plain", lead.id)}
                           onDrop={(e) => {
                             e.preventDefault();
                             const draggedId = e.dataTransfer.getData("text/plain");
                             if (draggedId !== lead.id) {
                               handleStageChange(draggedId, stage.id);
                             }
                           }}
                           onDragOver={(e) => e.preventDefault()}
                           draggable>
                        <LeadCard lead={lead} />
                      </div>
                    ))}
                    {stageLeads.length === 0 && (
                      <div className="text-center p-8 text-muted-foreground text-sm">
                        No hay leads en esta etapa
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        {/* Contacts Table View */}
        <TabsContent value="contactos" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedContacts.length} de {filteredLeads.length} seleccionados
              </span>
            </div>
            {selectedContacts.length > 0 && (
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar email
                </Button>
                <Button size="sm" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Enviar SMS
                </Button>
                <Button size="sm" variant="outline">
                  <Tag className="w-4 h-4 mr-2" />
                  Etiquetar
                </Button>
              </div>
            )}
          </div>

          <div className="border rounded-lg">
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
                  <TableHead>Valor (€)</TableHead>
                  <TableHead>Consent.</TableHead>
                  <TableHead>Owner</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => {
                  const stage = stages.find(s => s.id === lead.etapa);
                  const dueStatus = getDueStatus(lead.due_en);
                  
                  return (
                    <TableRow 
                      key={lead.id} 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedContact(lead.id)}
                    >
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
                          onClick={(e) => e.stopPropagation()}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{lead.nombre}</div>
                          <div className="text-sm text-muted-foreground">{lead.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={stage?.color}>
                          {stage?.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-48 truncate">{lead.proximo_paso}</div>
                      </TableCell>
                      <TableCell>
                        <span className={dueStatus.color}>
                          {dueStatus.text}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {formatTimeAgo(lead.ultima_interaccion)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">
                          €{lead.valor_estimado?.toLocaleString() || 0}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {lead.consents.marketing && (
                            <Badge variant="secondary" className="text-xs">M</Badge>
                          )}
                          {lead.consents.sms && (
                            <Badge variant="secondary" className="text-xs">S</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{lead.owner}</span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredLeads.length === 0 && (
            <div className="text-center p-8 text-muted-foreground">
              Sin contactos coincidentes. Ajusta filtros o crea uno nuevo.
            </div>
          )}
        </TabsContent>

        {/* Attention List View */}
        <TabsContent value="hotlist" className="space-y-4">
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Leads que requieren acción en las próximas 48h.
            </p>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Etapa</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead>Siguiente acción</TableHead>
                  <TableHead>Vence en</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getAttentionList().map((lead) => {
                  const stage = stages.find(s => s.id === lead.etapa);
                  const dueStatus = getDueStatus(lead.due_en);
                  
                  let motivo = "";
                  if (lead.due_en <= 2) motivo = "Vence pronto";
                  if (lead.etapa === "S1_hecho" && !lead.proximo_paso?.includes("S2")) motivo = "S1 hecho sin S2";
                  if (lead.riesgos.includes("no_show")) motivo = "No-show sin gestionar";
                  
                  return (
                    <TableRow 
                      key={lead.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedContact(lead.id)}
                    >
                      <TableCell>
                        <div>
                          <div className="font-medium">{lead.nombre}</div>
                          <div className="text-sm text-muted-foreground">{lead.email}</div>
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
                        <div className="max-w-48 truncate">{lead.proximo_paso}</div>
                      </TableCell>
                      <TableCell>
                        <span className={dueStatus.color}>
                          {dueStatus.text}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" className="h-7">
                            <Mail className="w-3 h-3 mr-1" />
                            Email
                          </Button>
                          <Button size="sm" variant="outline" className="h-7">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            SMS
                          </Button>
                          <Button size="sm" variant="outline" className="h-7">
                            <Calendar className="w-3 h-3 mr-1" />
                            Programar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {getAttentionList().length === 0 && (
            <div className="text-center p-8 text-muted-foreground">
              Nada urgente por ahora. ¡Bien!
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Contact Inspector Sheet */}
      <Sheet open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <SheetContent className="w-[480px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Detalle del contacto</SheetTitle>
            <SheetDescription>
              Información completa y timeline del contacto
            </SheetDescription>
          </SheetHeader>
          {selectedContact && <ContactInspector contactId={selectedContact} />}
        </SheetContent>
      </Sheet>
    </div>
  );
}