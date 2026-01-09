// src/lib/simulation/asi-hybrid-engine.ts

import { HubbardCalculator, HubbardResult } from '@/lib/quantum';

export interface ASIHybridConfig {
  tensionAlpha?: number;
  tensionBeta?: number;
  hypothesisImpactFactor?: number;
  entropyPerHypothesis?: number;
  precisionTolerance?: number;
}

export interface CognitiveState {
  phiFoam: number;
  entropy: number;
  negentropyReserve: number;
  activeHypotheses: any[];
  currentPhi?: number;
  currentEntropy?: number;
}

export interface MetaParams {
  innerSteps: number;
  metaWindow: number;
  criticalTension: number;
  hypothesisImpactFactor: number;
  entropyPerHypothesis: number;
  targetEntropy?: number;
}

export interface SimulationStep {
  state: CognitiveState;
  phiValue: number;
  phiChange: number;
  mode: string;
  timestamp: number;
  computationResult?: any;
}

export interface ScientificProblem {
  description: string;
  type: 'hubbard' | 'two_qubit' | 'generic';
  parameters?: any;
  complexity?: number;
}

export interface HubbardParams {
  sites?: number;
  t?: number;
  U?: number;
  electronsUp?: number;
  electronsDown?: number;
  maxEigenvalues?: number;
}

export class ASIHybridEngine {
  private config: Required<ASIHybridConfig>;
  private tension: number = 0;

  constructor(config: ASIHybridConfig = {}) {
    this.config = {
      tensionAlpha: config.tensionAlpha ?? 0.7,
      tensionBeta: config.tensionBeta ?? 0.3,
      hypothesisImpactFactor: config.hypothesisImpactFactor ?? 0.3,
      entropyPerHypothesis: config.entropyPerHypothesis ?? 0.02,
      precisionTolerance: config.precisionTolerance ?? 1e-6
    };
  }

  runSimulation(problem: ScientificProblem, maxMetaSteps = 100) {
    let currentState = this.initializeState();
    let metaParams = this.initializeMetaParams();
    this.tension = 0;

    const results: SimulationStep[] = [];
    let computationResult: any = null;

    // Выполнение расчётов для задачи Хаббарда
    if (problem.type === 'hubbard' && problem.parameters) {
      const params = problem.parameters as HubbardParams;
      computationResult = HubbardCalculator.calculate(
        params.t ?? 1.0,
        params.U ?? 4.0,
        params.electronsUp ?? 2,
        params.electronsDown ?? 2
      );
      
      // Проверка точности вычислений
      const isValid = validateHubbardResults(computationResult as HubbardResult);
      if (!isValid) {
        console.warn("⚠️ Обнаружены отклонения от эталонных значений. Проверьте точность расчётов.");
      }
    }

    for (let k = 0; k < maxMetaSteps; k++) {
      for (let t = 0; t < metaParams.innerSteps; t++) {
        const stepResult = this.simulateStep(currentState, t, computationResult);
        currentState = stepResult.state;
        results.push(stepResult);
      }

      if (this.hasConverged(currentState)) {
        return this.createResult(currentState, results, 'CONVERGED', k, computationResult);
      }
    }

    return this.createResult(currentState, results, 'MAX_STEPS_REACHED', maxMetaSteps, computationResult);
  }

  private initializeState(): CognitiveState {
    return {
      phiFoam: 0.1,
      entropy: 0.05,
      negentropyReserve: 1.0,
      activeHypotheses: [],
      currentPhi: 1.0,
      currentEntropy: 0.5
    };
  }

  private initializeMetaParams(): MetaParams {
    return {
      innerSteps: 5,
      metaWindow: 10,
      criticalTension: 2.5,
      hypothesisImpactFactor: 0.3,
      entropyPerHypothesis: 0.02
    };
  }

  private simulateStep(state: CognitiveState, step: number, computationResult?: any): SimulationStep {
    return {
      state: {
        ...state,
        currentPhi: state.currentPhi ? state.currentPhi * 0.95 : 1.0,
        currentEntropy: Math.max(0.01, state.currentEntropy ? state.currentEntropy - 0.01 : 0.5),
        phiFoam: state.phiFoam * 0.95
      },
      phiValue: state.currentPhi ? state.currentPhi * 0.95 : 0.95,
      phiChange: -0.05,
      mode: 'STABLE_GRA',
      timestamp: Date.now(),
      computationResult: computationResult
    };
  }

  private hasConverged(state: CognitiveState): boolean {
    return state.phiFoam < 1e-6 || (state.currentPhi !== undefined && state.currentPhi < 0.01);
  }

  private createResult(
    state: CognitiveState,
    history: SimulationStep[],
    mode: string,
    steps: number,
    computationResult: any
  ) {
    return {
      finalState: state,
      history: history,
      mode: mode,
      steps: steps,
      computationResult: computationResult || {
        error: "NO_VALID_PROBLEM_TYPE",
        message: "Укажите problem.type как 'hubbard' с параметрами для расчёта"
      }
    };
  }

  generateTestProblem(type: 'hubbard' | 'two_qubit' = 'hubbard'): ScientificProblem {
    if (type === 'hubbard') {
      return {
        description: '4-сайтовая модель Хаббарда: t=1.0 эВ, U=4.0 эВ, 2↑2↓ электронов',
        type: 'hubbard',
        parameters: {
          sites: 4,
          t: 1.0,
          U: 4.0,
          electronsUp: 2,
          electronsDown: 2,
          maxEigenvalues: 3
        },
        complexity: 8
      };
    } else {
      return {
        description: 'Двухкубитная система: J=1.25 ГГц, B=0.75 ГГц',
        type: 'two_qubit',
        parameters: {
          J: 1.25,
          B: 0.75,
          totalTime: 100,
          timeStep: 0.01
        },
        complexity: 7
      };
    }
  }
}

export default ASIHybridEngine;
