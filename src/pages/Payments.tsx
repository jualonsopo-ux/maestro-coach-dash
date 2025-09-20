import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, TrendingUp } from "lucide-react";

export default function Payments() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pagos</h1>
        <p className="text-muted-foreground">Gestiona transacciones, pagos y facturación</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Próximamente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-4 bg-primary-light rounded-lg">
            <TrendingUp className="w-8 h-8 text-primary" />
            <div>
              <div className="font-medium text-primary">Gestión de Pagos Avanzada</div>
              <div className="text-sm text-primary/80 mt-1">
                Sistema completo de transacciones, disputas y automatización de pagos.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}