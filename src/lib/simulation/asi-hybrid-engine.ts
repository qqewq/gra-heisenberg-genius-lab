// src/lib/simulation/asi-hybrid-engine.ts

import { GraHeisenbergEngine } from './gra-heisenberg-engine';
import { RevolutionDetector } from './revolution-detector';
import { CollapseOperator } from './collapse-operator';

export class ASIHybridEngine {
  private stableEngine: GraHeisenbergEngine;
  private revolutionDetector: RevolutionDetector;
  private collapseOperator: CollapseOperator;
  private tension: number = 0;
  private mode: 'STABLE_GRA' | 'REVOLUTIONARY_ACCUMULATION' = 'STABLE_GRA';
  
  constructor(private config: ASIHybridConfig) {
    this.stableEngine = new GraHeisenbergEngine(config);
    this.revolutionDetector = new RevolutionDetector(config);
    this.collapseOperator = new CollapseOperator(config);
  }
  
  async runSimulation(problem: ScientificProblem, maxMetaSteps = 100) {
    let currentState = this.initializeState(problem);
    let metaParams = this.initializeMetaParams(problem);
    let tension = 0;
    
    const results: SimulationStep[] = [];
    
    for (let k = 0; k < maxMetaSteps; k++) {
      // Динамическое определение режима
      if (this.revolutionDetector.shouldActivateRevolution(currentState, tension, metaParams)) {
        this.mode = 'REVOLUTIONARY_ACCUMULATION';
      }
      
      // Внутренний контур
      for (let t = 0; t < metaParams.innerSteps; t++) {
        let stepResult;
        
        if (this.mode === 'STABLE_GRA') {
          // Стандартная GRA-оптимизация
          stepResult = await this.stableEngine.step(currentState, metaParams);
          currentState = stepResult.state;
        } else {
          // Накопление напряжения
          stepResult = await this.stableEngine.step(currentState, metaParams);
          currentState = stepResult.state;
          
          // Обновление напряжения
          tension += this.computeTension(stepResult);
          
          // Проверка коллапса
          if (tension > metaParams.criticalTension) {
            // РЕВОЛЮЦИОННЫЙ КОЛЛАПС
            const collapseResult = await this.collapseOperator.execute(currentState, metaParams);
            currentState = collapseResult.state;
            results.push(collapseResult);
            
            tension = 0;
            this.mode = 'STABLE_GRA';
            break;
          }
        }
        
        results.push(stepResult);
      }
      
      // Внешний контур (мета-управление)
      metaParams = await this.metaAdaptation(results.slice(-metaParams.metaWindow), metaParams);
      
      // Проверка сходимости
      if (this.hasConverged(currentState, metaParams)) {
        return {
          finalState: currentState,
          history: results,
          mode: 'CONVERGED',
          steps: k
        };
      }
    }
    
    return {
      finalState: currentState,
      history: results,
      mode: 'MAX_STEPS_REACHED',
      steps: maxMetaSteps
    };
  }
  
  private computeTension(stepResult: SimulationStep): number {
    // Расчет накопленного напряжения на основе изменения пены и энтропии
    return Math.abs(stepResult.phiChange) * this.config.tensionAlpha +
           Math.max(0, stepResult.currentEntropy - stepResult.metaEntropy) * this.config.tensionBeta;
  }
}
