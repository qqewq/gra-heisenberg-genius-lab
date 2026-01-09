// src/lib/simulation/asi-hybrid-engine.ts

import { GraHeisenbergEngine } from './gra-heisenberg-engine';
import { RevolutionDetector } from './revolution-detector'; // Исправлена опечатка!
import { CollapseOperator } from './collapse-operator';
import { AIService } from '../ai/ai-service'; // Предполагается, что сервис существует

export class ASIHybridEngine {
  private stableEngine: GraHeisenbergEngine;
  private revolutionDetector: RevolutionDetector;
  private collapseOperator: CollapseOperator;
  private aiService: AIService;

  private tension: number = 0;

  constructor(private config: ASIHybridConfig) {
    this.stableEngine = new GraHeisenbergEngine(config);
    this.revolutionDetector = new RevolutionDetector(config);
    this.collapseOperator = new CollapseOperator(config);
    this.aiService = new AIService(); // LLM-интерфейс
  }

  async runSimulation(problem: ScientificProblem, maxMetaSteps = 100) {
    let currentState = this.initializeState(problem);
    let metaParams = this.initializeMetaParams(problem);
    this.tension = 0; // Сброс напряжения

    const results: SimulationStep[] = [];

    for (let k = 0; k < maxMetaSteps; k++) {
      // Динамическое определение режима
      const shouldRevolution = this.revolutionDetector.shouldActivateRevolution(
        currentState,
        this.tension,
        metaParams
      );

      if (shouldRevolution) {
        // === РЕВОЛЮЦИОННЫЙ ЭТАП: ГЕНЕРАЦИЯ ГИПОТЕЗ ЧЕРЕЗ LLM ===
        const hypotheses = await this.generateHypotheses(problem, currentState);
        currentState = this.injectHypotheses(currentState, hypotheses);
      }

      // Внутренний контур
      for (let t = 0; t < metaParams.innerSteps; t++) {
        const stepResult = await this.stableEngine.step(currentState, metaParams);
        currentState = stepResult.state;

        // Накопление напряжения ТОЛЬКО в революционном режиме
        if (shouldRevolution) {
          this.tension += this.computeTension(stepResult);
          if (this.tension > metaParams.criticalTension) {
            // === КОЛЛАПС: ФАЗОВЫЙ ПЕРЕХОД В НОВУЮ ВСЕЛЕННУЮ ===
            const collapseResult = await this.collapseOperator.execute(currentState, metaParams);
            currentState = collapseResult.state;
            results.push(collapseResult);

            this.tension = 0; // Сброс после коллапса
            break;
          }
        }

        results.push(stepResult);
      }

      // Мета-адаптация (может использовать историю + LLM для анализа траектории)
      metaParams = await this.metaAdaptation(results.slice(-metaParams.metaWindow), metaParams);

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

  // === LLM ИНТЕГРАЦИЯ ===
  private async generateHypotheses(
    problem: ScientificProblem,
    currentState: CognitiveState
  ): Promise<Hypothesis[]> {
    const prompt = this.buildHypothesisPrompt(problem, currentState);
    const response = await this.aiService.generateHypotheses(prompt);
    return this.parseHypothesesResponse(response, currentState);
  }

  private buildHypothesisPrompt(problem: ScientificProblem, state: CognitiveState): string {
    return `
      Научная проблема: ${problem.description}
      Текущее когнитивное состояние:
        - φ-пена: ${state.phiFoam.toFixed(4)}
        - Энтропия: ${state.entropy.toFixed(4)}
        - Negentropy reserve: ${state.negentropyReserve?.toFixed(4) ?? 'N/A'}
      
      Сгенерируй 3–5 радикально новых гипотез, нарушающих текущую парадигму.
      Формат: JSON массив объектов { "text": "...", "novelty": 0..1, "risk": 0..1 }.
    `;
  }

  private parseHypothesesResponse(raw: string, baseState: CognitiveState): Hypothesis[] {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed)
        ? parsed.map((h: any) => ({
            id: crypto.randomUUID(),
            text: h.text || '',
            novelty: Math.min(1, Math.max(0, parseFloat(h.novelty) || 0.5)),
            risk: Math.min(1, Math.max(0, parseFloat(h.risk) || 0.5)),
            source: 'LLM' as const,
            baseEntropy: baseState.entropy
          }))
        : [];
    } catch (e) {
      console.warn('Failed to parse LLM hypotheses:', e);
      return [];
    }
  }

  private injectHypotheses(state: CognitiveState, hypotheses: Hypothesis[]): CognitiveState {
    // Интеграция гипотез как возмущений в φ-пену
    const noveltyBoost = hypotheses.reduce((sum, h) => sum + h.novelty * h.risk, 0);
    return {
      ...state,
      phiFoam: state.phiFoam + noveltyBoost * this.config.hypothesisImpactFactor,
      entropy: state.entropy + hypotheses.length * this.config.entropyPerHypothesis,
      activeHypotheses: [...(state.activeHypotheses || []), ...hypotheses]
    };
  }

  // === ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ (заглушки или реализуйте по контексту) ===
  private initializeState(problem: ScientificProblem): CognitiveState {
    return {
      phiFoam: 0.1,
      entropy: 0.05,
      negentropyReserve: 1.0,
      activeHypotheses: []
    };
  }

  private initializeMetaParams(problem: ScientificProblem): MetaParams {
    return {
      innerSteps: 5,
      metaWindow: 10,
      criticalTension: 2.5,
      hypothesisImpactFactor: 0.3,
      entropyPerHypothesis: 0.02
    };
  }

  private computeTension(stepResult: SimulationStep): number {
    return (
      Math.abs(stepResult.phiChange) * this.config.tensionAlpha +
      Math.max(0, stepResult.currentEntropy - stepResult.metaEntropy) * this.config.tensionBeta
    );
  }

  private async metaAdaptation(recent: SimulationStep[], params: MetaParams): Promise<MetaParams> {
    // Простая адаптация: можно расширить через LLM-анализ траектории
    return params;
  }

  private hasConverged(state: CognitiveState, params: MetaParams): boolean {
    return state.phiFoam < 1e-6 && Math.abs(state.entropy - params.targetEntropy || 0) < 0.01;
  }
}
