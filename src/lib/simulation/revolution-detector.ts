// src/lib/simulation/revolution-detector.ts

import type { CognitiveState, MetaParams, SimulationStep, ASIHybridConfig } from './asi-hybrid-engine';

export interface ClusterAnalysis {
  bestCluster: {
    coherence: number;
    size: number;
  };
}

export class RevolutionDetector {
  private config: Partial<ASIHybridConfig>;
  
  constructor(config: Partial<ASIHybridConfig> = {}) {
    this.config = config;
  }
  
  shouldActivateRevolution(
    state: CognitiveState & { history?: SimulationStep[] }, 
    tension: number, 
    metaParams: Partial<MetaParams> & { 
      minProgressRate?: number;
      heisenbergConstant?: number;
      minCoherence?: number;
      minSuccessThreshold?: number;
    }
  ): boolean {
    // Check for stagnation
    const history = state.history || [];
    const progressRate = this.computeProgressRate(history);
    if (progressRate > (metaParams.minProgressRate || 0.001)) return false;
    
    // Check tension threshold
    const adjustedTensionThreshold = (metaParams.criticalTension || 2.5) * 
      (1 - (metaParams.heisenbergConstant || 0.7) / 2);
    if (tension < adjustedTensionThreshold) return false;
    
    // Analyze hypothesis clusters
    const clusterQuality = this.analyzeHypothesisClusters(state);
    if (clusterQuality.bestCluster.coherence < (metaParams.minCoherence || 0.7)) return false;
    
    // Meta-analysis of success probability
    const metaSuccessProb = this.estimateRevolutionSuccess(state);
    return metaSuccessProb > (metaParams.minSuccessThreshold || 0.6);
  }
  
  private computeProgressRate(history: SimulationStep[]): number {
    if (history.length < 3) return Infinity;
    
    const recentPhiValues = history.slice(-3).map(step => step.phiValue);
    const gradients = recentPhiValues.slice(1).map((val, i) => 
      Math.abs(val - recentPhiValues[i])
    );
    
    return gradients.reduce((a, b) => a + b, 0) / gradients.length;
  }
  
  private analyzeHypothesisClusters(state: CognitiveState): ClusterAnalysis {
    const hypotheses = state.activeHypotheses || [];
    
    if (hypotheses.length === 0) {
      return { bestCluster: { coherence: 0, size: 0 } };
    }
    
    // Simplified analysis - return coherence based on hypothesis count
    const coherence = Math.min(1, 0.5 + hypotheses.length * 0.1);
    
    return {
      bestCluster: {
        coherence,
        size: hypotheses.length
      }
    };
  }
  
  private estimateRevolutionSuccess(state: CognitiveState): number {
    // Base probability with corrections
    const hypothesisCount = state.activeHypotheses?.length || 0;
    const baseProbability = 0.3 + Math.min(0.5, hypothesisCount * 0.1);
    
    return Math.min(0.95, Math.max(0.05, baseProbability));
  }
}
