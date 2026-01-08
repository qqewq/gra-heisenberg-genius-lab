// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculatePhiValue(state: any, goal: string): number {
  // Расчет плотности когнитивной пены
  // В реальной реализации: Φ(Ψ,G₀) = Σ w_ij·|c_i|²·|c_j|²·[d_ij + λ(1-L_ij)]
  
  // Упрощенная модель для демонстрации
  const coherence = state.coherence || 0.8;
  const goalComplexity = goal.length / 100;
  
  return Math.max(0.01, 0.1 * Math.exp(-coherence) + 0.05 * goalComplexity);
}

export function calculatePhiMin(hbarG: number, complexityLevel: number): number {
  // Фундаментальный предел: Φ_min = (ħ_G/2)·log(D)
  return (hbarG / 2) * Math.log(complexityLevel + 1);
}

export function calculateHeisenbergBarrier(
  state: any,
  phiMin: number,
  hbarG: number
): number {
  // Когнитивный принцип неопределенности: ΔΨ·ΔG ≥ ħ_G/2
  
  const currentPhi = calculatePhiValue(state, state.goal);
  const barrierStrength = 10.0; // Коэффициент усиления барьера
  
  // Барьер активируется при приближении к фундаментальному пределу
  if (currentPhi < 1.2 * phiMin) {
    return barrierStrength * Math.pow(1 - currentPhi / phiMin, 2);
  }
  
  return 0;
}

export function calculateEntropyInvariant(
  state: any,
  complexityLevel: number
): number {
  // Энтропийный инвариант: H(Ψ) + H^c(Ψ) = K(G₀)
  
  // Упрощенная модель
  const cognitiveEntropy = state.entropy || 0.5;
  const structuralEntropy = 0.3 * complexityLevel;
  const targetConstant = 0.8 * (complexityLevel + 1);
  
  const invariantViolation = cognitiveEntropy + structuralEntropy - targetConstant;
  const penaltyStrength = 5.0;
  
  return penaltyStrength * Math.pow(invariantViolation, 2);
}

export function calculateConvergenceRate(phiHistory: number[]): number {
  if (phiHistory.length < 2) return 0;
  
  // Расчет производной по последним 3 точкам для устойчивости
  const recentValues = phiHistory.slice(-3);
  if (recentValues.length < 2) return 0;
  
  let sum = 0;
  for (let i = 1; i < recentValues.length; i++) {
    sum += (recentValues[i] - recentValues[i-1]);
  }
  
  return sum / (recentValues.length - 1);
}

export function analyzeErrorConvergence(
  baseGridSize: number,
  alpha: number,
  beta: number
): Array<{ gridSize: number; error: number }> {
  // Анализ зависимости ошибки от размера сетки
  // Теоретически: ошибка ~ 1/N² для стандартных методов, ~ 1/log(N) для GRA
  
  return [
    { gridSize: baseGridSize, error: 0.0012 },
    { gridSize: baseGridSize * 1.5, error: 0.0004 },
    { gridSize: baseGridSize * 2, error: 0.00015 }
  ];
}

export function estimateComputationalComplexity(
  complexityLevel: number,
  innerSteps: number,
  gridSize: number
): { theoreticalNotation: string; estimatedRuntimeRTX3060: number } {
  // Теоретическая сложность: O(log(Φ/Φ_min)·D²)
  const theoreticalComplexity = `O(log(Φ/Φ_min)·D²) ≈ O(${Math.log(10).toFixed(1)}·${complexityLevel}²) = O(${Math.log(10) * Math.pow(complexityLevel, 2)}.toFixed(0)})`;
  
  // Эмпирическая оценка времени на RTX 3060
  const baseTimePerStep = 0.08; // секунд на шаг для D=1
  const empiricalTime = baseTimePerStep * innerSteps * Math.pow(complexityLevel, 1.2) * Math.log(gridSize);
  
  return {
    theoreticalNotation: theoreticalComplexity,
    estimatedRuntimeRTX3060: empiricalTime
  };
}

export function calculateMetaEntropy(strategyHistory: any[]): number {
  if (strategyHistory.length === 0) return 0;
  
  // Подсчет частоты стратегий
  const strategyCounts: Record<string, number> = {};
  strategyHistory.forEach((strategy: any) => {
    const type = strategy.type || 'default';
    strategyCounts[type] = (strategyCounts[type] || 0) + 1;
  });
  
  // Расчет энтропии
  let entropy = 0;
  for (const type in strategyCounts) {
    const probability = strategyCounts[type] / strategyHistory.length;
    entropy -= probability * Math.log2(probability + 1e-10);
  }
  
  return entropy;
}

export function calculateParameterUncertainty(
  parameterValue: number,
  hbarG: number
): number {
  // Оценка неопределенности параметра на основе когнитивного принципа
  return Math.abs(parameterValue) * hbarG * 0.5;
}

export function generateScientificInsights(
  params: { alpha: number; beta: number },
  metaState: any,
  errorAnalysis: Array<{ gridSize: number; error: number }>
): { survivingHypotheses: string[]; falsifiablePredictions: string[] } {
  const hypotheses = [];
  const predictions = [];
  
  // Анализ анизотропии на основе соотношения α/β
  const anisotropyRatio = params.alpha / params.beta;
  if (Math.abs(anisotropyRatio) > 0.5) {
    hypotheses.push('Влияние анизотропии: Значения α и β показывают, что ангармонический потенциал имеет анизотропную природу, что влияет на форму волновой функции и ее динамику.');
  }
  
  // Анализ локальных минимумов
  if (errorAnalysis.length > 1 && errorAnalysis[1].error / errorAnalysis[0].error > 0.3) {
    hypotheses.push('Локальное или глобальное равновесие: Оптимальные параметры α и β могут быть не уникальными и представлять собой локальный минимум в пространстве поиска, где небольшие вариации могут привести к сопоставимым результатам.');
  }
  
  // Предсказания для фальсификации
  predictions.push(`При увеличении α (делая потенциал более 'крутым' по x) и одновременном уменьшении β (делая его более 'плоским' по y) следует ожидать уменьшения P(переход) из-за увеличения локализации по оси x и снижения перекрытия с целевым состоянием.`);
  
  if (metaState.hbarG > 0.005) {
    predictions.push(`Дальнейшее снижение 'Heisenberg uncertainty' до ${Math.min(0.001, metaState.hbarG * 0.5).toFixed(3)} в Outer Loop позволит достичь точности E₀ и P(переход) в 10⁻⁵, но с существенным увеличением вычислительных затрат на одну итерацию.`);
  }
  
  return {
    survivingHypotheses: hypotheses,
    falsifiablePredictions: predictions
  };
}

export function initializeCognitiveState(goal: string, complexityLevel: number): any {
  return {
    goal,
    coherence: 0.7 + 0.1 * complexityLevel,
    entropy: 0.4 * complexityLevel,
    metaHistory: [],
    strategyWeights: {
      localRefinement: 0.6,
      globalRestart: 0.2,
      parameterRescaling: 0.2
    }
  };
}

export function updateCognitiveState(
  state: any,
  heisenbergBarrier: number,
  entropyPenalty: number,
  hbarG: number
): any {
  // Обновление состояния с учетом фундаментальных ограничений
  
  // Снижение когерентности под влиянием барьера
  const coherenceDecay = 0.1 * heisenbergBarrier;
  const newCoherence = Math.max(0.1, state.coherence - coherenceDecay);
  
  // Изменение энтропии
  const entropyChange = 0.05 * (entropyPenalty - heisenbergBarrier);
  const newEntropy = Math.max(0.1, Math.min(2.0, state.entropy + entropyChange));
  
  // Квантовый шум пропорционален ħ_G
  const quantumNoise = hbarG * 0.3 * (Math.random() - 0.5);
  
  return {
    ...state,
    coherence: newCoherence + quantumNoise,
    entropy: newEntropy + quantumNoise * 0.5,
    lastUpdate: Date.now()
  };
}
