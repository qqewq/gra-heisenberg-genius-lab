import { supabase } from "@/integrations/supabase/client";

export interface SimulationParams {
  complexity: number;
  innerSteps: number;
  metaFrequency: number;
  heisenberg: number;
}

export interface TrajectoryStep {
  t: number;
  phi: number;
  entropy: number;
}

export interface MetaIteration {
  k: number;
  heisenberg: number;
  goalUpdate: { ru: string; en: string };
  lambdas: number[];
}

export interface SimulationResult {
  formalization: {
    ru: string;
    en: string;
    complexity: number;
  };
  innerLoop: {
    trajectory: TrajectoryStep[];
    phiFinal: number;
    entropyFinal: number;
    heisenbergUsed: number;
  };
  outerLoop: {
    iterations: MetaIteration[];
    totalIterations: number;
    finalHeisenberg: number;
    convergenceRate: number;
  };
  conclusion: {
    summary: { ru: string; en: string };
    hypotheses: { ru: string; en: string }[];
    predictions: { ru: string; en: string }[];
  };
  diagnostics: {
    geniusScore: number;
    phiProximity: number;
    pathOptimality: number;
    coherence: number;
    stability: number;
  };
}

export async function runSimulation(
  goal: string,
  params: SimulationParams,
  language: 'ru' | 'en' = 'ru'
): Promise<SimulationResult> {
  const { data, error } = await supabase.functions.invoke('simulate', {
    body: { goal, params, language }
  });

  if (error) {
    console.error('Simulation error:', error);
    throw new Error(error.message || 'Simulation failed');
  }

  if (data.error) {
    throw new Error(data.error);
  }

  return data as SimulationResult;
}
