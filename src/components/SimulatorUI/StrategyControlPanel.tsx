// src/components/SimulatorUI/StrategyControlPanel.tsx

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useSimulation } from '@/hooks/useSimulation';
import { Brain, Zap, Shield, Target } from 'lucide-react';

export function StrategyControlPanel() {
  const { simulationState, updateMetaParams, forceRevolutionaryMode, resetSimulation } = useSimulation();
  const [autoMode, setAutoMode] = useState(true);
  
  const handleManualStrategyChange = (strategy: 'conservative' | 'balanced' | 'revolutionary') => {
    const newParams = { ...simulationState.metaParams };
    
    switch (strategy) {
      case 'conservative':
        newParams.heisenbergConstant = 0.3;
        newParams.criticalTension = 0.95;
        newParams.minProgressRate = 0.01;
        break;
      case 'balanced':
        newParams.heisenbergConstant = 0.7;
        newParams.criticalTension = 0.8;
        newParams.minProgressRate = 0.005;
        break;
      case 'revolutionary':
        newParams.heisenbergConstant = 1.5;
        newParams.criticalTension = 0.3;
        newParams.minProgressRate = 0.001;
        break;
    }
    
    updateMetaParams(newParams);
  };
  
  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Стратегическое управление</CardTitle>
          <div className="flex items-center space-x-2">
            <Label htmlFor="auto-mode" className="text-sm">Автоматический режим</Label>
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
        <div className="space-y-6">
          {!autoMode && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  Выбор стратегии
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={simulationState.metaParams?.heisenbergConstant <= 0.4 ? "default" : "outline"}
                    onClick={() => handleManualStrategyChange('conservative')}
                    disabled={simulationState.isRunning}
                  >
                    <Shield className="w-4 h-4 mr-1" />
                    Консервативная
                  </Button>
                  <Button
                    variant={simulationState.metaParams?.heisenbergConstant > 0.4 && simulationState.metaParams?.heisenbergConstant < 1.0 ? "default" : "outline"}
                    onClick={() => handleManualStrategyChange('balanced')}
                    disabled={simulationState.isRunning}
                  >
                    <Brain className="w-4 h-4 mr-1" />
                    Сбалансированная
                  </Button>
                  <Button
                    variant={simulationState.metaParams?.heisenbergConstant >= 1.0 ? "default" : "outline"}
                    onClick={() => handleManualStrategyChange('revolutionary')}
                    disabled={simulationState.isRunning}
                  >
                    <Zap className="w-4 h-4 mr-1" />
                    Революционная
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-purple-500" />
                    Параметр Гейзенберга (ħ<sub>G</sub>)
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Определяет баланс между исследованием и эксплуатацией. Малые значения — дисциплинированный поиск, большие — творческий хаос.
                  </p>
                  <Slider
                    value={[simulationState.metaParams?.heisenbergConstant || 0.7]}
                    max={2.0}
                    step={0.1}
                    onValueChange={([value]) => {
                      if (!simulationState.isRunning) {
                        updateMetaParams({ ...simulationState.metaParams!, heisenbergConstant: value });
                      }
                    }}
                    disabled={simulationState.isRunning}
                  />
                  <div className="flex justify-between text-xs mt-1">
                    <span>0.1 — Строгая дисциплина</span>
                    <span>2.0 — Полный хаос</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    Порог напряжения для коллапса
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Минимальное напряжение, необходимое для активации революционного коллапса. Низкие значения приводят к более частым прорывам.
                  </p>
                  <Slider
                    value={[simulationState.metaParams?.criticalTension || 0.8]}
                    max={1.0}
                    step={0.05}
                    onValueChange={([value]) => {
                      if (!simulationState.isRunning) {
                        updateMetaParams({ ...simulationState.metaParams!, criticalTension: value });
                      }
                    }}
                    disabled={simulationState.isRunning}
                  />
                  <div className="flex justify-between text-xs mt-1">
                    <span>0.1 — Частые прорывы</span>
                    <span>1.0 — Только при экстремальном застое</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {autoMode && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Автоматический стратегический выбор</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Система сама определяет оптимальную стратегию на основе:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Текущей скорости сходимости</li>
                      <li>Структуры гипотезного пространства</li>
                      <li>Истории предыдущих коллапсов</li>
                      <li>Сложности поставленной задачи</li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="pt-4 border-t">
            <Button 
              className="w-full"
              onClick={forceRevolutionaryMode}
              disabled={simulationState.isRunning || simulationState.mode === 'REVOLUTIONARY_COLLAPSE'}
            >
              <Zap className="w-4 h-4 mr-2" />
              Принудительно активировать революционный режим
            </Button>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Активирует режим накопления напряжения независимо от текущих условий
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
