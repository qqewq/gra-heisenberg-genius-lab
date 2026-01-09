// src/components/SimulatorUI/CollapseVisualization.tsx

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';

interface CriticalSet {
  hypotheses: Array<{ id: string }>;
  coherence: number;
}

interface SimulationState {
  mode: string;
  criticalSet: CriticalSet | null;
}

interface CollapseVisualizationProps {
  simulationState: SimulationState;
}

export function CollapseVisualization({ simulationState }: CollapseVisualizationProps) {
  const isCollapsing = simulationState.mode === 'REVOLUTIONARY_COLLAPSE';
  
  if (!simulationState.criticalSet || simulationState.criticalSet.hypotheses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Zap className="h-4 w-4" />
            Революционный коллапс
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Критическое подмножество гипотез пока не сформировано
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <Zap className="h-4 w-4" />
          Революционный коллапс
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`transition-all duration-1000 ${
          isCollapsing ? 'opacity-70 animate-pulse' : 'opacity-100'
        }`}>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2 text-sm">Критические гипотезы</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {simulationState.criticalSet.hypotheses.map((hypothesis, index) => (
                  <div 
                    key={index} 
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isCollapsing 
                        ? 'bg-destructive/20 text-destructive animate-pulse' 
                        : 'bg-primary/20 text-primary'
                    }`}
                  >
                    {hypothesis.id}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Когерентность: {(simulationState.criticalSet.coherence * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
