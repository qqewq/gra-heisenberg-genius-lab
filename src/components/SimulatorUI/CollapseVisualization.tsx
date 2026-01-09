// src/components/SimulatorUI/CollapseVisualization.tsx

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSimulation } from '@/hooks/useSimulation';

export function CollapseVisualization() {
  const { simulationState } = useSimulation();
  const [isCollapsing, setIsCollapsing] = useState(false);
  const collapseRef = useRef<HTMLDivElement>(null);
  const previousModeRef = useRef(simulationState.mode);
  
  useEffect(() => {
    // Обнаружение начала коллапса
    if (simulationState.mode === 'REVOLUTIONARY_COLLAPSE' && 
        previousModeRef.current !== 'REVOLUTIONARY_COLLAPSE') {
      setIsCollapsing(true);
      
      // Анимация коллапса
      const timer = setTimeout(() => {
        setIsCollapsing(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
    
    previousModeRef.current = simulationState.mode;
  }, [simulationState.mode]);
  
  if (!simulationState.criticalSet || simulationState.criticalSet.hypotheses.length === 0) {
    return null;
  }
  
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Процесс революционного коллапса</CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          ref={collapseRef} 
          className={`transition-all duration-1000 ${
            isCollapsing 
              ? 'scale-[0.95] opacity-70 bg-red-50 animate-pulse' 
              : 'scale-100 opacity-100'
          }`}
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Критическое подмножество гипотез</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {simulationState.criticalSet.hypotheses.map((hypothesis, index) => (
                  <div 
                    key={index} 
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isCollapsing 
                        ? 'bg-red-100 text-red-800 animate-pulse' 
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {hypothesis.id}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Когерентность кластера: {(simulationState.criticalSet.coherence * 100).toFixed(1)}%
              </p>
            </div>
            
            {isCollapsing && (
              <div className="space-y-3 mt-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-red-200 flex items-center justify-center animate-ping">
                    <div className="w-8 h-8 rounded-full bg-red-400"></div>
                  </div>
                </div>
                <p className="text-center font-medium text-red-600">
                  Коллапс в процессе...
                </p>
                <p className="text-center text-sm text-muted-foreground">
                  Система мгновенно перестраивается в гениальное состояние
                </p>
              </div>
            )}
            
            {!isCollapsing && simulationState.mode === 'GENIUS_STATE' && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-green-500 font-bold">✓</div>
                  <h4 className="font-medium">Гениальное состояние сформировано</h4>
                </div>
                <p className="text-sm text-green-700">
                  Суперпозиция {simulationState.criticalSet.hypotheses.length} критически согласованных гипотез создала новое качество — решение, недостижимое в эволюционном режиме.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
