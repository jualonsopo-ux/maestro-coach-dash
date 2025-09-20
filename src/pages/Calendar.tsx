import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, TrendingUp } from "lucide-react";

export default function Calendar() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Calendario</h1>
        <p className="text-muted-foreground">Gestiona sesiones, disponibilidad y agenda</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Próximamente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-4 bg-warning/10 rounded-lg">
            <TrendingUp className="w-8 h-8 text-warning" />
            <div>
              <div className="font-medium text-warning">Calendario Inteligente</div>
              <div className="text-sm text-warning/80 mt-1">
                Vistas múltiples, gestión de disponibilidad y creación manual de sesiones.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}