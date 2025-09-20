import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp } from "lucide-react";

export default function CRM() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">CRM</h1>
        <p className="text-muted-foreground">Gestiona contactos, pipeline y relaciones con clientes</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Próximamente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-4 bg-success-light rounded-lg">
            <TrendingUp className="w-8 h-8 text-success" />
            <div>
              <div className="font-medium text-success">Sistema CRM Completo</div>
              <div className="text-sm text-success/80 mt-1">
                Pipeline kanban, gestión de contactos y seguimiento 360º de clientes.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}