import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, TrendingUp } from "lucide-react";

export default function Automations() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Automatizaciones</h1>
        <p className="text-muted-foreground">Configura recordatorios, prevención de ausencias y flujos automáticos</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Próximamente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-4 bg-primary-light rounded-lg">
            <TrendingUp className="w-8 h-8 text-primary" />
            <div>
              <div className="font-medium text-primary">Automatización Inteligente</div>
              <div className="text-sm text-primary/80 mt-1">
                Recordatorios automáticos, prevención de no-shows y workflows personalizados.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}