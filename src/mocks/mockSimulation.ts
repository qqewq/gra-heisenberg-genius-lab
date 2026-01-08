// src/mocks/mockSimulation.ts
export const mockSimulationResult = {
  alpha: -0.0083,
  beta: 0.0127,
  alphaUncertainty: 0.0001,
  betaUncertainty: 0.0001,
  achievedEnergy: 1.7320,
  achievedTransitionProbability: 0.2505,
  phiValue: 0.012345,
  phiMin: 0.011512,
  convergenceRate: -0.001234,
  computationalComplexity: "O(log(Φ/Φ_min)·D²) ≈ O(3)",
  estimatedRuntime: 8.5,
  errorAnalysis: [
    { gridSize: 200, error: 0.0012 },
    { gridSize: 300, error: 0.0004 },
    { gridSize: 400, error: 0.00015 }
  ],
  survivingHypotheses: [
    "Влияние анизотропии: Значения α и β показывают, что ангармонический потенциал имеет анизотропную природу...",
    "Локальное или глобальное равновесие: Оптимальные параметры могут представлять локальный минимум..."
  ],
  falsifiablePredictions: [
    "При увеличении α и уменьшении β следует ожидать уменьшения P(переход)...",
    "Снижение ħ_G до 0.001 позволит достичь точности 10⁻⁵..."
  ]
};
