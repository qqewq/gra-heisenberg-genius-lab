// src/lib/simulation/revolution-detector.ts

export class RevolutionDetector {
  constructor(private config: ASIHybridConfig) {}
  
  shouldActivateRevolution(state: CognitiveState, tension: number, metaParams: MetaParams): boolean {
    // 1. Проверка застоя
    const progressRate = this.computeProgressRate(state.history);
    if (progressRate > metaParams.minProgressRate) return false;
    
    // 2. Проверка напряжения
    const adjustedTensionThreshold = metaParams.criticalTension * 
      (1 - metaParams.heisenbergConstant / 2);
    if (tension < adjustedTensionThreshold) return false;
    
    // 3. Анализ структуры гипотез
    const clusterQuality = this.analyzeHypothesisClusters(state);
    if (clusterQuality.bestCluster.coherence < metaParams.minCoherence) return false;
    
    // 4. Мета-анализ вероятности успеха
    const metaSuccessProb = this.estimateRevolutionSuccess(state, metaParams);
    return metaSuccessProb > metaParams.minSuccessThreshold;
  }
  
  private computeProgressRate(history: SimulationStep[]): number {
    if (history.length < 3) return Infinity;
    
    const recentPhiValues = history.slice(-3).map(step => step.phiValue);
    const gradients = recentPhiValues.slice(1).map((val, i) => 
      Math.abs(val - recentPhiValues[i])
    );
    
    return gradients.reduce((a, b) => a + b, 0) / gradients.length;
  }
  
  private estimateRevolutionSuccess(state: CognitiveState, metaParams: MetaParams): number {
    // Оценка вероятности успешного коллапса на основе:
    // 1. Когерентности критических кластеров гипотез
    // 2. Истории предыдущих коллапсов
    // 3. Степени приближения к фундаментальным пределам
    
    const clusterCoherence = this.analyzeHypothesisClusters(state).bestCluster.coherence;
    const proximityToLimit = 1 - (state.currentPhi / metaParams.phiStabilityLimit);
    
    // Базовая вероятность с коррекцией
    let baseProbability = 0.3 + clusterCoherence * 0.5 + proximityToLimit * 0.2;
    
    // Коррекция на основе исторического успеха
    if (state.pastCollapses.successful > 0) {
      const successRate = state.pastCollapses.successful / 
                         (state.pastCollapses.successful + state.pastCollapses.failed);
      baseProbability *= (0.8 + successRate * 0.4);
    }
    
    return Math.min(0.95, Math.max(0.05, baseProbability));
  }
}
