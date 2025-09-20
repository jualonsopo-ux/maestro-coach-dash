import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp } from "lucide-react";

export default function Reports() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reportes</h1>
        <p className="text-muted-foreground">Analytics avanzados, KPIs y exportación de datos</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Próximamente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-4 bg-success-light rounded-lg">
            <TrendingUp className="w-8 h-8 text-success" />
            <div>
              <div className="font-medium text-success">Analytics Avanzados</div>
              <div className="text-sm text-success/80 mt-1">
                Filtros globales, gráficos interactivos y exportación en múltiples formatos.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}