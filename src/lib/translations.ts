export type Language = 'ru' | 'en';

export const translations = {
  header: {
    title: {
      ru: 'GRA-Heisenberg Genius Simulator',
      en: 'GRA-Heisenberg Genius Simulator',
    },
    subtitle: {
      ru: 'Симулятор когнитивного ИИ-гения на базе двухконтурной GRA-архитектуры',
      en: 'Cognitive AI Genius Simulator based on dual-loop GRA architecture',
    },
  },
  architecture: {
    title: {
      ru: 'Архитектура системы',
      en: 'System Architecture',
    },
    description: {
      ru: 'Двухконтурная система с квантово-подобной динамикой состояний и мета-управлением',
      en: 'Dual-loop system with quantum-like state dynamics and meta-control',
    },
    innerLoop: {
      ru: 'Внутренний контур: GRA-обнулёнка с когнитивным гейзенбергом',
      en: 'Inner loop: GRA reset mechanism with cognitive Heisenberg',
    },
    outerLoop: {
      ru: 'Внешний контур: LLM-мета-управление адаптацией параметров',
      en: 'Outer loop: LLM meta-control for parameter adaptation',
    },
    keyFormulas: {
      ru: 'Ключевые формулы: H(Ψ) + Hᶜ(Ψ) = K(G₀), ΔΨ·ΔG ≥ ℏG/2',
      en: 'Key formulas: H(Ψ) + Hᶜ(Ψ) = K(G₀), ΔΨ·ΔG ≥ ℏG/2',
    },
  },
  input: {
    goalLabel: {
      ru: 'Цель исследования (формулировка задачи G₀)',
      en: 'Research goal (problem statement G₀)',
    },
    goalPlaceholder: {
      ru: 'Опишите вашу исследовательскую задачу...',
      en: 'Describe your research problem...',
    },
  },
  params: {
    complexity: {
      ru: 'Уровень сложности D',
      en: 'Complexity level D',
    },
    innerSteps: {
      ru: 'Внутренние шаги',
      en: 'Inner steps',
    },
    metaFrequency: {
      ru: 'Частота мета-итераций',
      en: 'Meta frequency',
    },
    heisenberg: {
      ru: 'Константа ℏG',
      en: 'Constant ℏG',
    },
  },
  buttons: {
    run: {
      ru: 'Запустить симуляцию',
      en: 'Run simulation',
    },
    running: {
      ru: 'Симуляция...',
      en: 'Simulating...',
    },
  },
  tabs: {
    formalization: {
      ru: 'A. Формализация G₀',
      en: 'A. Formalization G₀',
    },
    innerLoop: {
      ru: 'B. Внутренний контур',
      en: 'B. Inner loop',
    },
    outerLoop: {
      ru: 'C. Внешний контур',
      en: 'C. Outer loop',
    },
    conclusion: {
      ru: 'D. Научный вывод',
      en: 'D. Conclusion',
    },
    diagnostics: {
      ru: 'E. Диагностика',
      en: 'E. Diagnostics',
    },
  },
  results: {
    title: {
      ru: 'Результат исследования',
      en: 'Research Result',
    },
    formalization: {
      title: {
        ru: 'Формализация задачи',
        en: 'Problem Formalization',
      },
      complexityNote: {
        ru: 'Колмогоровская сложность: K(G₀) ≈ log rank(𝒫_G₀)',
        en: 'Kolmogorov complexity: K(G₀) ≈ log rank(𝒫_G₀)',
      },
    },
    innerLoop: {
      title: {
        ru: 'Траектория внутреннего контура',
        en: 'Inner Loop Trajectory',
      },
    },
    outerLoop: {
      title: {
        ru: 'Мета-итерации внешнего контура',
        en: 'Outer Loop Meta-iterations',
      },
      adaptationFormula: {
        ru: 'Формула адаптации ℏG',
        en: 'ℏG adaptation formula',
      },
    },
    conclusion: {
      title: {
        ru: 'Итоговый научный вывод',
        en: 'Final Scientific Conclusion',
      },
      hypotheses: {
        ru: 'Выжившие гипотезы',
        en: 'Surviving hypotheses',
      },
      predictions: {
        ru: 'Предсказания и фальсифицируемые следствия',
        en: 'Predictions and falsifiable consequences',
      },
    },
    diagnostics: {
      title: {
        ru: 'Диагностика «гениальности»',
        en: 'Genius Diagnostics',
      },
      phiProximity: {
        ru: 'Близость к Φ_min(G₀)',
        en: 'Proximity to Φ_min(G₀)',
      },
      optimalPath: {
        ru: 'Оптимальность траектории 𝒫*(G₀)',
        en: 'Path optimality 𝒫*(G₀)',
      },
    },
  },
} as const;

export function t(key: string, lang: Language): string {
  const keys = key.split('.');
  let value: any = translations;
  for (const k of keys) {
    value = value?.[k];
  }
  return value?.[lang] ?? key;
}
