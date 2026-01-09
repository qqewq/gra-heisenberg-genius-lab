// src/components/SimulatorUI.tsx

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Activity } from 'lucide-react';

interface SimulatorUIProps {
  className?: string;
}

export function SimulatorUI({ className }: SimulatorUIProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Гибридная архитектура ASI
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            GRA-ℏ + GRA-R
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">GRA-Обнуленка</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Стабильная оптимизация с когнитивным барьером Гейзенберга
            </p>
          </div>
          
          <div className="p-3 rounded-lg bg-secondary/5 border border-secondary/20">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-secondary" />
              <span className="font-medium text-sm">GRA-R Коллапс</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Революционные прорывы через мгновенный фазовый переход
            </p>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground text-center pt-2 border-t">
          Формальная система: {"{ℏG, λk, μ, ...}"}
        </div>
      </CardContent>
    </Card>
  );
}
