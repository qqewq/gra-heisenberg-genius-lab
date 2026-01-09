// src/components/SimulatorUI.tsx

import { useState, useEffect } from 'react';
import { ModeVisualization } from './ModeVisualization';
import { CollapseVisualization } from './CollapseVisualization';
import { StrategyControlPanel } from './StrategyControlPanel';
import { HypothesisSpaceVisualizer } from './HypothesisSpaceVisualizer';
import { PhiEvolutionChart } from './PhiEvolutionChart';
import { SimulationControls } from './SimulationControls';
import { ProblemInput } from './ProblemInput';
import { SimulationResults } from './SimulationResults';
import { ASIHybridEngine } from '@/lib/simulation/asi-hybrid-engine';
import { defaultASIConfig } from '@/lib/config';
import { ScientificProblem, MetaParams, SimulationState } from '@/types/simulation';

export function SimulatorUI() {
  const [problem, setProblem] = useState<ScientificProblem | null>(null);
  const [simulationState, setSimulationState] = useState<SimulationState>({
    isRunning: false,
    mode: 'INITIALIZING',
    currentPhi: 1.0,
    currentEntropy: 0.5,
    tension: 0,
    metaParams: {
      heisenbergConstant: 0.7,
      criticalTension: 0.8,
      phiStabilityLimit: 0.15,
      minProgressRate: 0.005,
      minCoherence: 0.7,
      minSuccessThreshold: 0.6,
      innerSteps: 10,
      metaFrequency: 5
    },
    history: [],
    criticalSet: null
  });
  
  const [engine] = useState(() => new ASIHybridEngine(defaultASIConfig));
  
  const startSimulation = async () => {
    if (!problem) return;
    
    setSimulationState(prev => ({
      ...prev,
      isRunning: true,
      mode: 'STABLE_GRA',
      currentPhi: 1.0,
      tension: 0,
      history: [],
      criticalSet: null
    }));
    
    try {
      const result = await engine.runSimulation(problem, 50);
      
      setSimulationState(prev => ({
        ...prev,
        isRunning: false,
        mode: result.mode as any,
        currentPhi: result.finalState.currentPhi,
        currentEntropy: result.finalState.currentEntropy,
        history: result.history,
        criticalSet: result.history.find(step => step.mode === 'REVOLUTIONARY_COLLAPSE')?.criticalSet || null
      }));
    } catch (error) {
      console.error('Simulation error:', error);
      setSimulationState(prev => ({
        ...prev,
        isRunning: false,
        mode: 'ERROR'
      }));
    }
  };
  
  const updateMetaParams = (newParams: Partial<MetaParams>) => {
    setSimulationState(prev => ({
      ...prev,
      metaParams: {
        ...prev.metaParams!,
        ...newParams
      }
    }));
  };
  
  const forceRevolutionaryMode = () => {
    setSimulationState(prev => ({
      ...prev,
      mode: 'REVOLUTIONARY_ACCUMULATION'
    }));
  };
  
  const resetSimulation = () => {
    setSimulationState(prev => ({
      ...prev,
      isRunning: false,
      mode: 'INITIALIZING',
      currentPhi: 1.0,
      tension: 0,
      history: [],
      criticalSet: null
    }));
  };
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center space-y-2 mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ГИБРИДНЫЙ СИМУЛЯТОР ИИ-ГЕНИЯ
        </h1>
        <p className="text-muted-foreground">
          GRA-Обнуленка Гейзенберг + GRA-R революционный коллапс
        </p>
      </div>
      
      <ProblemInput onProblemSubmit={setProblem} disabled={simulationState.isRunning} />
      
      {problem && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Левая колонка: управление и визуализация режимов */}
          <div className="space-y-6">
            <SimulationControls 
              onStart={startSimulation} 
              onReset={resetSimulation}
              isRunning={simulationState.isRunning}
            />
            
            <StrategyControlPanel 
              simulationState={simulationState}
              updateMetaParams={updateMetaParams}
              forceRevolutionaryMode={forceRevolutionaryMode}
              resetSimulation={resetSimulation}
            />
            
            <ModeVisualization simulationState={simulationState} />
            
            <CollapseVisualization simulationState={simulationState} />
          </div>
          
          {/* Правая колонка: визуализация гипотез и результатов */}
          <div className="space-y-6">
            <HypothesisSpaceVisualizer simulationState={simulationState} />
            
            <PhiEvolutionChart simulationHistory={simulationState.history} />
            
            <SimulationResults 
              simulationState={simulationState} 
              problem={problem}
            />
          </div>
        </div>
      )}
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          Архитектура воспроизводит диалектику научного открытия: дисциплинированная оптимизация (GRA-Обнуленка) + управляемые прорывы (GRA-R коллапс)
        </p>
      </div>
    </div>
  );
}
