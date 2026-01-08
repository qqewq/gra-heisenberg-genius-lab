import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface SimulationParams {
  complexityLevel: number;
  innerSteps: number;
  metaFrequency: number;
  heisenbergConstant: number;
  gridResolution: number;
  targetEnergy: number;
  targetTransitionProbability: number;
}

export interface SimulationResult {
  alpha: number;
  beta: number;
  alphaUncertainty: number;
  betaUncertainty: number;
  achievedEnergy: number;
  achievedTransitionProbability: number;
  phiValue: number;
  phiMin: number;
  convergenceRate: number;
  computationalComplexity: string;
  estimatedRuntime: number;
  errorAnalysis: Array<{ gridSize: number; error: number }>;
  survivingHypotheses: string[];
  falsifiablePredictions: string[];
}

export async function runSimulation(params: SimulationParams): Promise<SimulationResult> {
  try {
    const response = await axios.post(`${API_BASE_URL}/simulate`, 
      {
        complexity_level: params.complexityLevel,
        inner_steps: params.innerSteps,
        meta_frequency: params.metaFrequency,
        heisenberg_constant: params.heisenbergConstant,
        grid_resolution: params.gridResolution,
        target_energy: params.targetEnergy,
        target_transition_probability: params.targetTransitionProbability
      },
      {
        params: {
          target_energy: params.targetEnergy,
          target_transition_probability: params.targetTransitionProbability,
          lambda_param: 0.5
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Ошибка при запуске симуляции:', error);
    throw error;
  }
}
