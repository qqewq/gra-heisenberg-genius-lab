// src/components/SimulatorUI/ModeVisualization.tsx

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useSimulation } from '@/hooks/useSimulation';
import { useState, useEffect } from 'react';

export function ModeVisualization() {
  const { simulationState } = useSimulation();
  const [tensionProgress, setTensionProgress] = useState(0);
  
  useEffect(() => {
    if (simulationState.metaParams) {
      const progress = Math.min(100, 
        (simulationState.tension / simulationState.metaParams.criticalTension) * 100
      );
      setTensionProgress(progress);
    }
  }, [simulationState.tension, simulationState.metaParams]);
  
  const getModeColor = () => {
    switch (simulationState.mode) {
      case 'STABLE_GRA':
        return 'bg-blue-500';
      case 'REVOLUTIONARY_ACCUMULATION':
        return 'bg-yellow-500';
      case 'REVOLUTIONARY_COLLAPSE':
        return 'bg-red-500';
      case 'GENIUS_STATE':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  const getModeDescription = () => {
    switch (simulationState.mode) {
      case 'STABLE_GRA':
        return 'Стабильная оптимизация: система последовательно сужает пространство гипотез';
      case 'REVOLUTIONARY_ACCUMULATION':
        return 'Накопление напряжения: система обнаружила застой и готовится к прорыву';
      case 'REVOLUTIONARY_COLLAPSE':
        return 'Революционный коллапс: система мгновенно перестраивается в гениальное состояние';
      case 'GENIUS_STATE':
        return 'Гениальное состояние: система достигла оптимального решения';
      default:
        return 'Инициализация системы';
    }
  };
  
  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Режим работы системы</CardTitle>
          <Badge className={`${getModeColor()} text-white`}>
            {simulationState.mode.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">{getModeDescription()}</p>
          </div>
          
          {simulationState.mode === 'REVOLUTIONARY_ACCUMULATION' && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Накопленное напряжение</span>
                <span>{Math.round(tensionProgress)}%</span>
              </div>
              <Progress value={tensionProgress} className="h-3" />
              
              <div className="text-xs text-muted-foreground mt-1">
                При достижении 100% система выполнит революционный коллапс
              </div>
            </div>
          )}
          
          {simulationState.mode === 'GENIUS_STATE' && (
            <div className="bg-green-50 transition-all p-3 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <div className="text-green-500 font-bold">✓</div>
                <p className="font-medium">Гениальное состояние достигнуто!</p>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Система нашла оптимальное решение с φ = {simulationState.currentPhi.toFixed(4)}, что близко к теоретическому пределу φ<sub>min</sub> = {simulationState.metaParams?.phiStabilityLimit.toFixed(4)}
              </p>
            </div>
          )}
          
          {(simulationState.mode === 'STABLE_GRA' || simulationState.mode === 'REVOLUTIONARY_ACCUMULATION') && (
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <p className="text-muted-foreground">Текущая пена φ</p>
                <p className="font-medium">{simulationState.currentPhi.toFixed(4)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Предел φ<sub>min</sub></p>
                <p className="font-medium">{simulationState.metaParams?.phiStabilityLimit.toFixed(4)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Когнитивная константа ħ<sub>G</sub></p>
                <p className="font-medium">{simulationState.metaParams?.heisenbergConstant.toFixed(3)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Энтропия H(Ψ)</p>
                <p className="font-medium">{simulationState.currentEntropy.toFixed(3)}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
