// src/components/SimulatorUI/StrategyControlPanel.tsx

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Brain, Zap, Shield, Target } from 'lucide-react';

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
  metaParams: MetaParams | null;
}

interface StrategyControlPanelProps {
  simulationState: SimulationState;
  updateMetaParams: (params: Partial<MetaParams>) => void;
  forceRevolutionaryMode: () => void;
  resetSimulation: () => void;
}

export function StrategyControlPanel({ 
  simulationState, 
  updateMetaParams, 
  forceRevolutionaryMode,
  resetSimulation 
}: StrategyControlPanelProps) {
  const [autoMode, setAutoMode] = useState(true);
  
  const handleManualStrategyChange = (strategy: 'conservative' | 'balanced' | 'revolutionary') => {
    const updates: Partial<MetaParams> = {};
    
    switch (strategy) {
      case 'conservative':
        updates.heisenbergConstant = 0.3;
        updates.criticalTension = 0.95;
        updates.minProgressRate = 0.01;
        break;
      case 'balanced':
        updates.heisenbergConstant = 0.7;
        updates.criticalTension = 0.8;
        updates.minProgressRate = 0.005;
        break;
      case 'revolutionary':
        updates.heisenbergConstant = 1.5;
        updates.criticalTension = 0.3;
        updates.minProgressRate = 0.001;
        break;
    }
    
    updateMetaParams(updates);
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Target className="h-4 w-4" />
            Стратегия
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Label htmlFor="auto-mode" className="text-xs">Авто</Label>
            <Switch 
              id="auto-mode" 
              checked={autoMode} 
              onCheckedChange={setAutoMode}
              disabled={simulationState.isRunning}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!autoMode && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={simulationState.metaParams?.heisenbergConstant === 0.3 ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleManualStrategyChange('conservative')}
                  disabled={simulationState.isRunning}
                >
                  <Shield className="w-3 h-3 mr-1" />
                  Консерв.
                </Button>
                <Button
                  variant={simulationState.metaParams?.heisenbergConstant === 0.7 ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleManualStrategyChange('balanced')}
                  disabled={simulationState.isRunning}
                >
                  <Brain className="w-3 h-3 mr-1" />
                  Баланс
                </Button>
                <Button
                  variant={simulationState.metaParams?.heisenbergConstant === 1.5 ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleManualStrategyChange('revolutionary')}
                  disabled={simulationState.isRunning}
                >
                  <Zap className="w-3 h-3 mr-1" />
                  Рев.
                </Button>
              </div>
              
              <div>
                <Label className="text-xs">ħG: {simulationState.metaParams?.heisenbergConstant.toFixed(2)}</Label>
                <Slider
                  value={[simulationState.metaParams?.heisenbergConstant || 0.7]}
                  max={2.0}
                  min={0.1}
                  step={0.1}
                  onValueChange={([value]) => {
                    if (!simulationState.isRunning) {
                      updateMetaParams({ heisenbergConstant: value });
                    }
                  }}
                  disabled={simulationState.isRunning}
                  className="mt-2"
                />
              </div>
            </div>
          )}
          
          {autoMode && (
            <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
              <div className="flex items-start gap-2">
                <Brain className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Автоматический выбор стратегии на основе прогресса симуляции
                </p>
              </div>
            </div>
          )}
          
          <Button 
            className="w-full"
            size="sm"
            variant="outline"
            onClick={forceRevolutionaryMode}
            disabled={simulationState.isRunning || simulationState.mode === 'REVOLUTIONARY_COLLAPSE'}
          >
            <Zap className="w-3 h-3 mr-2" />
            Форсировать революцию
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
