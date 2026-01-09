// src/components/SimulatorUI/ModeVisualization.tsx

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity } from 'lucide-react';

interface MetaParams {
  heisenbergConstant: number;
  criticalTension: number;
  phiStabilityLimit: number;
  minProgressRate: number;
  minCoherence: number;
  minSuccessThreshold: number;
  innerSteps: number;
  metaFrequency: number;
}

interface SimulationState {
  isRunning: boolean;
  mode: string;
  currentPhi: number;
  currentEntropy: number;
  tension: number;
  metaParams: MetaParams | null;
}

interface ModeVisualizationProps {
  simulationState: SimulationState;
}

export function ModeVisualization({ simulationState }: ModeVisualizationProps) {
  const tensionProgress = simulationState.metaParams 
    ? Math.min(100, (simulationState.tension / simulationState.metaParams.criticalTension) * 100)
    : 0;
  
  const getModeColor = () => {
    switch (simulationState.mode) {
      case 'STABLE_GRA':
        return 'bg-primary';
      case 'REVOLUTIONARY_ACCUMULATION':
        return 'bg-yellow-500';
      case 'REVOLUTIONARY_COLLAPSE':
        return 'bg-destructive';
      case 'GENIUS_STATE':
        return 'bg-green-500';
      default:
        return 'bg-muted';
    }
  };
  
  const getModeDescription = () => {
    switch (simulationState.mode) {
      case 'STABLE_GRA':
        return 'Стабильная оптимизация';
      case 'REVOLUTIONARY_ACCUMULATION':
        return 'Накопление напряжения';
      case 'REVOLUTIONARY_COLLAPSE':
        return 'Революционный коллапс';
      case 'GENIUS_STATE':
        return 'Гениальное состояние';
      default:
        return 'Инициализация';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Activity className="h-4 w-4" />
            Режим работы
          </CardTitle>
          <Badge className={`${getModeColor()} text-white text-xs`}>
            {getModeDescription()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {simulationState.mode === 'REVOLUTIONARY_ACCUMULATION' && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Напряжение</span>
                <span>{Math.round(tensionProgress)}%</span>
              </div>
              <Progress value={tensionProgress} className="h-2" />
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-muted-foreground">Текущая φ</p>
              <p className="font-medium">{simulationState.currentPhi.toFixed(4)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Энтропия</p>
              <p className="font-medium">{simulationState.currentEntropy.toFixed(3)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
