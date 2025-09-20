import { useState } from "react";
import { format, startOfWeek, endOfWeek, addDays, isSameDay, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Search, 
  Settings, 
  Plus,
  Clock,
  Video,
  Phone,
  MapPin,
  Users,
  CreditCard,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  X,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Globe,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for demonstration
const mockEvents = [
  {
    id: "1",
    session_type: "S1",
    title_or_client: "Ana García",
    client_name: "Ana García",
    client_email_mask: "ana.g***@email.com",
    client_phone_mask: "+34 6** *** 123",
    start_at: "2025-01-20T10:00:00Z",
    end_at: "2025-01-20T10:10:00Z",
    status: "confirmed",
    payment_status: null,
    location: "video",
    video_link: "https://meet.google.com/abc-def-ghi",
    can_join: true,
    notes: "Primera sesión estratégica",
    price: null,
    currency: "EUR"
  },
  {
    id: "2", 
    session_type: "S2",
    title_or_client: "Carlos Ruiz",
    client_name: "Carlos Ruiz",
    client_email_mask: "carlos.r***@email.com",
    client_phone_mask: "+34 6** *** 456",
    start_at: "2025-01-20T15:30:00Z",
    end_at: "2025-01-20T16:00:00Z",
    status: "pending_payment",
    payment_status: "requires_action",
    location: "video",
    video_link: "https://meet.google.com/xyz-abc-def",
    can_join: false,
    notes: "Sesión de seguimiento - pago pendiente",
    price: 120,
    currency: "EUR"
  },
  {
    id: "3",
    session_type: "S3",
    title_or_client: "Laura Martín",
    client_name: "Laura Martín", 
    client_email_mask: "laura.m***@email.com",
    client_phone_mask: "+34 6** *** 789",
    start_at: "2025-01-21T11:00:00Z",
    end_at: "2025-01-21T11:45:00Z",
    status: "confirmed",
    payment_status: "paid",
    location: "video",
    video_link: "https://meet.google.com/def-ghi-jkl",
    can_join: true,
    notes: "Sesión de implementación",
    price: 180,
    currency: "EUR"
  }
];

const availabilityData = {
  weekly: [
    { id: "mon", label: "Lunes", slots: [{ from: "09:00", to: "13:00" }, { from: "15:00", to: "19:00" }], buffers: { before: 5, after: 5 } },
    { id: "tue", label: "Martes", slots: [{ from: "09:00", to: "13:00" }, { from: "15:00", to: "19:00" }] },
    { id: "wed", label: "Miércoles", slots: [{ from: "09:00", to: "13:00" }, { from: "15:00", to: "19:00" }] },
    { id: "thu", label: "Jueves", slots: [{ from: "09:00", to: "13:00" }, { from: "15:00", to: "19:00" }] },
    { id: "fri", label: "Viernes", slots: [{ from: "09:00", to: "14:00" }] },
    { id: "sat", label: "Sábado", slots: [] },
    { id: "sun", label: "Domingo", slots: [] }
  ],
  sessionTemplates: [
    { id: "S1", label: "S1 (10')", duration_min: 10, minNotice_min: 6, maxAdvance_days: 14 },
    { id: "S2", label: "S2 (20–30')", duration_min: 25 },
    { id: "S3", label: "S3 (30'+)", duration_min: 45 }
  ]
};

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeView, setActiveView] = useState("week");
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [filters, setFilters] = useState({
    session_type: ["S1", "S2", "S3"],
    status: ["confirmed", "pending_payment", "requires_action"],
    channel: ["video"],
    integration: ["Cal.com"]
  });

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });

  const getEventColor = (event: typeof mockEvents[0]) => {
    if (event.session_type === "S1") return "bg-green-100 border-green-300 text-green-800";
    if (event.session_type === "S2") return "bg-cyan-100 border-cyan-300 text-cyan-800";
    if (event.session_type === "S3") return "bg-indigo-100 border-indigo-300 text-indigo-800";
    return "bg-gray-100 border-gray-300 text-gray-800";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending_payment": return "bg-yellow-100 text-yellow-800";
      case "requires_action": return "bg-orange-100 text-orange-800";
      case "rescheduled": return "bg-blue-100 text-blue-800";
      case "canceled": return "bg-gray-100 text-gray-800";
      case "no_show": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string | null) => {
    if (!status) return "bg-gray-100 text-gray-800";
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "requires_action": return "bg-orange-100 text-orange-800";
      case "refunded": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTodayEvents = () => {
    return mockEvents.filter(event => 
      isSameDay(parseISO(event.start_at), new Date())
    );
  };

  const formatEventTime = (startAt: string, endAt: string) => {
    const start = parseISO(startAt);
    const end = parseISO(endAt);
    return `${format(start, "HH:mm")} - ${format(end, "HH:mm")}`;
  };

  const EventCard = ({ event }: { event: typeof mockEvents[0] }) => {
    const startTime = format(parseISO(event.start_at), "HH:mm");
    
    return (
      <Sheet>
        <SheetTrigger asChild>
          <div 
            className={cn(
              "p-2 mb-1 rounded border-l-4 cursor-pointer hover:shadow-sm transition-shadow text-xs",
              getEventColor(event),
              event.payment_status === "requires_action" && "border-dashed"
            )}
            onClick={() => setSelectedEvent(event.id)}
          >
            <div className="font-medium">{startTime} {event.client_name}</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-xs">
                {event.session_type}
              </Badge>
              {event.location === "video" && <Video className="w-3 h-3" />}
              {event.location === "phone" && <Phone className="w-3 h-3" />}
              {event.location === "presencial" && <MapPin className="w-3 h-3" />}
            </div>
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              {event.session_type} - {event.client_name}
            </SheetTitle>
            <SheetDescription>
              {formatEventTime(event.start_at, event.end_at)}
            </SheetDescription>
          </SheetHeader>
          <EventDetails eventId={event.id} />
        </SheetContent>
      </Sheet>
    );
  };

  const EventDetails = ({ eventId }: { eventId: string }) => {
    const event = mockEvents.find(e => e.id === eventId);
    if (!event) return null;

    return (
      <div className="mt-6 space-y-6">
        <div className="flex flex-wrap gap-2">
          <Badge className={getStatusColor(event.status)}>
            {event.status}
          </Badge>
          {event.payment_status && (
            <Badge className={getPaymentStatusColor(event.payment_status)}>
              {event.payment_status}
            </Badge>
          )}
          <Badge variant="outline">
            {event.location}
          </Badge>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Detalles</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Inicio:</span>
                <span>{format(parseISO(event.start_at), "PPp", { locale: es })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fin:</span>
                <span>{format(parseISO(event.end_at), "PPp", { locale: es })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cliente:</span>
                <span>{event.client_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span>{event.client_email_mask}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Teléfono:</span>
                <span>{event.client_phone_mask}</span>
              </div>
              {event.video_link && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Enlace:</span>
                  <a href={event.video_link} className="text-blue-600 hover:underline text-xs">
                    Entrar a la sala
                  </a>
                </div>
              )}
            </div>
          </div>

          {event.price && (
            <div>
              <h4 className="font-medium mb-2">Pago</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Precio:</span>
                  <span>€{event.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estado:</span>
                  <Badge className={getPaymentStatusColor(event.payment_status)}>
                    {event.payment_status || "No aplica"}
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {event.notes && (
            <div>
              <h4 className="font-medium mb-2">Notas</h4>
              <p className="text-sm text-muted-foreground">{event.notes}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 pt-4">
          {event.can_join && (
            <Button className="w-full">
              <Video className="w-4 h-4 mr-2" />
              Entrar a la sala
            </Button>
          )}
          <Button variant="outline" className="w-full">
            <MessageSquare className="w-4 h-4 mr-2" />
            Enviar recordatorio
          </Button>
          <Button variant="outline" className="w-full" onClick={() => setShowRescheduleModal(true)}>
            <Edit className="w-4 h-4 mr-2" />
            Reprogramar
          </Button>
          <Button variant="outline" className="w-full text-red-600" onClick={() => setShowCancelModal(true)}>
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
        </div>
      </div>
    );
  };

  const WeekView = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(addDays(weekStart, i));
    }

    const hours = [];
    for (let i = 7; i <= 21; i++) {
      hours.push(i);
    }

    return (
      <div className="flex-1 overflow-auto">
        <div className="min-w-[800px]">
          {/* Week header */}
          <div className="grid grid-cols-8 border-b">
            <div className="p-2 text-xs text-muted-foreground"></div>
            {days.map((day, i) => (
              <div key={i} className="p-2 text-center border-l">
                <div className="text-xs text-muted-foreground">
                  {format(day, "EEE", { locale: es })}
                </div>
                <div className={cn(
                  "text-lg font-medium",
                  isSameDay(day, new Date()) && "text-primary"
                )}>
                  {format(day, "d")}
                </div>
              </div>
            ))}
          </div>

          {/* Week grid */}
          <div className="grid grid-cols-8">
            {/* Time column */}
            <div className="border-r">
              {hours.map(hour => (
                <div key={hour} className="h-16 border-b p-1 text-xs text-muted-foreground">
                  {hour.toString().padStart(2, '0')}:00
                </div>
              ))}
            </div>

            {/* Day columns */}
            {days.map((day, dayIndex) => (
              <div key={dayIndex} className="border-l">
                {hours.map(hour => {
                  const dayEvents = mockEvents.filter(event => {
                    const eventDate = parseISO(event.start_at);
                    const eventHour = eventDate.getHours();
                    return isSameDay(eventDate, day) && eventHour === hour;
                  });

                  return (
                    <div key={hour} className="h-16 border-b p-1 relative">
                      {/* Quiet hours shading */}
                      {(hour < 8 || hour > 20) && (
                        <div className="absolute inset-0 bg-gray-100/50 pointer-events-none" />
                      )}
                      
                      {/* Current time line */}
                      {isSameDay(day, new Date()) && new Date().getHours() === hour && (
                        <div className="absolute left-0 w-full h-0.5 bg-red-500 z-10" 
                             style={{ top: `${(new Date().getMinutes() / 60) * 100}%` }} />
                      )}

                      {/* Events */}
                      {dayEvents.map(event => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const AgendaView = () => {
    const filteredEvents = mockEvents.filter(event => {
      if (searchQuery && !event.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !event.notes?.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    });

    return (
      <div className="space-y-2">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-8">
            <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-medium mb-2">No hay eventos</h3>
            <p className="text-muted-foreground">No se encontraron eventos en este rango.</p>
          </div>
        ) : (
          filteredEvents.map(event => (
            <Card key={event.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={getEventColor(event)}>
                        {event.session_type}
                      </Badge>
                      <h3 className="font-medium">{event.client_name}</h3>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatEventTime(event.start_at, event.end_at)}
                      </div>
                      <div className="flex items-center gap-1">
                        {event.location === "video" && <Video className="w-4 h-4" />}
                        {event.location === "phone" && <Phone className="w-4 h-4" />}
                        {event.location === "presencial" && <MapPin className="w-4 h-4" />}
                        {event.location}
                      </div>
                      {event.price && (
                        <div className="flex items-center gap-1">
                          <CreditCard className="w-4 h-4" />
                          €{event.price}
                        </div>
                      )}
                    </div>
                    {event.notes && (
                      <p className="text-sm text-muted-foreground mt-2">{event.notes}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {event.can_join && (
                      <Button size="sm">
                        <Video className="w-4 h-4 mr-2" />
                        Entrar
                      </Button>
                    )}
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button size="sm" variant="outline" onClick={() => setSelectedEvent(event.id)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>
                            {event.session_type} - {event.client_name}
                          </SheetTitle>
                          <SheetDescription>
                            {formatEventTime(event.start_at, event.end_at)}
                          </SheetDescription>
                        </SheetHeader>
                        <EventDetails eventId={event.id} />
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    );
  };

  const AvailabilityEditor = () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Horario semanal</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Define tu horario por defecto y excepciones por fecha.
          </p>
        </div>

        <div className="space-y-4">
          {availabilityData.weekly.map((day) => (
            <Card key={day.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Label className="font-medium">{day.label}</Label>
                  <Switch defaultChecked={day.slots.length > 0} />
                </div>
                
                {day.slots.length > 0 && (
                  <div className="space-y-2">
                    {day.slots.map((slot, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Input 
                          type="time" 
                          defaultValue={slot.from} 
                          className="w-24"
                        />
                        <span className="text-muted-foreground">-</span>
                        <Input 
                          type="time" 
                          defaultValue={slot.to} 
                          className="w-24"
                        />
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Añadir horario
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <h4 className="font-medium mb-3">Plantillas de sesión</h4>
          <div className="space-y-3">
            {availabilityData.sessionTemplates.map((template) => (
              <div key={template.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <span className="font-medium">{template.label}</span>
                  <span className="text-sm text-muted-foreground ml-2">
                    {template.duration_min} minutos
                  </span>
                </div>
                <Button size="sm" variant="outline">
                  Editar
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Integraciones</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5" />
                <div>
                  <span className="font-medium">Cal.com</span>
                  <div className="text-sm text-muted-foreground">Conectado</div>
                </div>
              </div>
              <Badge variant="secondary">
                <CheckCircle className="w-3 h-3 mr-1" />
                Activo
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5" />
                <div>
                  <span className="font-medium">Google Calendar</span>
                  <div className="text-sm text-muted-foreground">No conectado</div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Conectar
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button>
            Guardar disponibilidad
          </Button>
          <Button variant="outline">
            Vista previa
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Calendario</h1>
          <p className="text-muted-foreground">Gestiona tu agenda y disponibilidad</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Navigation */}
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentDate(addDays(currentDate, -7))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentDate(new Date())}
            >
              Hoy
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentDate(addDays(currentDate, 7))}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {format(currentDate, "MMM yyyy", { locale: es })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarPicker
                  mode="single"
                  selected={currentDate}
                  onSelect={(date) => date && setCurrentDate(date)}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar cliente, nota o ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            
            <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Crear sesión
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Crear sesión</DialogTitle>
                  <DialogDescription>
                    Programa una nueva sesión con un cliente
                  </DialogDescription>
                </DialogHeader>
                <CreateEventForm />
              </DialogContent>
            </Dialog>

            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Views */}
        <div className="lg:col-span-3">
          <Tabs value={activeView} onValueChange={setActiveView}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="week">Semana</TabsTrigger>
              <TabsTrigger value="day">Día</TabsTrigger>
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
              <TabsTrigger value="availability">Disponibilidad</TabsTrigger>
            </TabsList>

            <TabsContent value="week" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>
                      Semana del {format(weekStart, "d MMM", { locale: es })} - {format(weekEnd, "d MMM", { locale: es })}
                    </span>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="text-xs">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        S1 (10')
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full mr-1"></div>
                        S2 (20-30')
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full mr-1"></div>
                        S3 (30'+)
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <WeekView />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="day" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {format(currentDate, "EEEE, d 'de' MMMM", { locale: es })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Vista de día en desarrollo</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="agenda" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lista de eventos</CardTitle>
                </CardHeader>
                <CardContent>
                  <AgendaView />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="availability" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configurar disponibilidad</CardTitle>
                </CardHeader>
                <CardContent>
                  <AvailabilityEditor />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Mini Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Calendario</CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarPicker
                mode="single"
                selected={currentDate}
                onSelect={(date) => date && setCurrentDate(date)}
                className="p-0"
              />
            </CardContent>
          </Card>

          {/* Today's Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Hoy</CardTitle>
            </CardHeader>
            <CardContent>
              {getTodayEvents().length === 0 ? (
                <div className="text-center py-4">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Sin eventos hoy</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {getTodayEvents().map(event => (
                    <div key={event.id} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">
                          {format(parseISO(event.start_at), "HH:mm")}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {event.session_type}
                        </Badge>
                      </div>
                      <p className="text-sm">{event.client_name}</p>
                      <div className="flex gap-1 mt-2">
                        {event.can_join && (
                          <Button size="sm" className="h-6 text-xs">
                            Entrar
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="h-6 text-xs">
                          <MessageSquare className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Availability */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Disponibilidad rápida</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Hoy:</span>
                  <span className="text-green-600">09:00-13:00, 15:00-19:00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Mañana:</span>
                  <span className="text-green-600">09:00-13:00, 15:00-19:00</span>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-3">
                  Editar disponibilidad
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <RescheduleModal 
        open={showRescheduleModal} 
        onOpenChange={setShowRescheduleModal} 
      />
      
      <CancelModal 
        open={showCancelModal} 
        onOpenChange={setShowCancelModal} 
      />
    </div>
  );
}

// Additional components for modals
const CreateEventForm = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="client">Cliente</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Buscar o seleccionar cliente" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ana">Ana García</SelectItem>
            <SelectItem value="carlos">Carlos Ruiz</SelectItem>
            <SelectItem value="laura">Laura Martín</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="session_type">Tipo de sesión</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="S1">S1 (10 min)</SelectItem>
            <SelectItem value="S2">S2 (20-30 min)</SelectItem>
            <SelectItem value="S3">S3 (30+ min)</SelectItem>
            <SelectItem value="bloqueo">Bloqueo</SelectItem>
            <SelectItem value="otro">Otro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start_time">Inicio</Label>
          <Input type="datetime-local" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end_time">Fin</Label>
          <Input type="datetime-local" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notas</Label>
        <Textarea placeholder="Notas adicionales..." />
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="collect_now" />
        <Label htmlFor="collect_now">Cobrar ahora (Stripe)</Label>
      </div>

      <div className="flex gap-2 pt-4">
        <Button className="flex-1">Crear sesión</Button>
        <Button variant="outline">Cancelar</Button>
      </div>
    </div>
  );
};

const RescheduleModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reprogramar sesión</DialogTitle>
          <DialogDescription>
            Selecciona una nueva fecha y hora
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nueva fecha y hora</Label>
            <Input type="datetime-local" />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="notify_client" defaultChecked />
            <Label htmlFor="notify_client">Notificar al cliente</Label>
          </div>
          <div className="flex gap-2 pt-4">
            <Button className="flex-1">Reprogramar</Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const CancelModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancelar sesión</DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Motivo de cancelación</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar motivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conflict">Conflicto de agenda</SelectItem>
                <SelectItem value="client_request">Solicitud del cliente</SelectItem>
                <SelectItem value="no_show">No-show</SelectItem>
                <SelectItem value="other">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Mensaje al cliente</Label>
            <Textarea placeholder="Explicación opcional para el cliente..." />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="refund" />
            <Label htmlFor="refund">Reembolsar si había pago</Label>
          </div>
          <div className="flex gap-2 pt-4">
            <Button variant="destructive" className="flex-1">Cancelar sesión</Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cerrar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};