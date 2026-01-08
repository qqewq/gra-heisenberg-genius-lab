// src/lib/translations.ts

export type Language = 'ru' | 'en';

export function t(key: string, language: Language): string {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key;
    }
  }
  
  return typeof value === 'string' ? value : key;
}

export const translations: Record<Language, Record<string, any>> = {
  ru: {
    header: {
      title: "GRA-Heisenberg Genius Simulator",
      subtitle: "Двухконтурная система с квантово-подобной динамикой"
    },
    architecture: {
      title: "Архитектура системы",
      description: "Двухконтурная система с квантово-подобной динамикой состояний и мета-управлением",
      innerLoop: "Внутренний контур: GRA-обнулёнка с когнитивным гейзенбергом",
      outerLoop: "Внешний контур: LLM-мета-управление адаптацией параметров",
      keyFormulas: "Ключевые формулы: H(Ψ) + Hᶜ(Ψ) = K(G₀), ΔΨ·ΔG ≥ ℏG/2"
    },
    input: {
      goalLabel: "Исследовательская цель",
      goalPlaceholder: "Опишите вашу исследовательскую цель..."
    },
    parameters: {
      title: "Параметры симуляции",
      complexity: "Сложность (D)",
      innerSteps: "Внутренние шаги",
      metaFrequency: "Частота мета-итераций",
      heisenberg: "Неопределенность ℏG"
    },
    buttons: {
      run: "Запустить симуляцию",
      running: "Симуляция..."
    },
    results: {
      formalization: {
        title: "Формализация цели",
        complexityNote: "Сложность Колмогорова"
      },
      innerLoop: {
        title: "Внутренний контур (GRA)",
        formulas: "Теоретические формулы",
        trajectory: "Траектория оптимизации",
        metrics: "Финальные метрики"
      },
      outerLoop: {
        title: "Внешний контур (Мета)",
        adaptation: "Формула адаптации",
        iterations: "Мета-итерации",
        metrics: "Итоговые метрики"
      },
      conclusion: {
        title: "Заключение",
        summary: "Резюме",
        hypotheses: "Выжившие гипотезы",
        predictions: "Предсказания"
      },
      diagnostics: {
        title: "Диагностика",
        geniusIndex: "Индекс гениальности",
        metrics: "Метрики производительности"
      },
      tabs: {
        formalization: "Формализация",
        innerLoop: "Внутренний",
        outerLoop: "Внешний",
        conclusion: "Заключение",
        diagnostics: "Диагностика"
      }
    },
    toast: {
      success: "Симуляция завершена",
      successDescription: "Результаты готовы к анализу",
      error: "Ошибка симуляции",
      errorDescription: "Пожалуйста, попробуйте снова",
      validation: "Введите цель",
      validationDescription: "Пожалуйста, опишите исследовательскую цель"
    }
  },
  en: {
    header: {
      title: "GRA-Heisenberg Genius Simulator",
      subtitle: "Two-contour system with quantum-like dynamics"
    },
    architecture: {
      title: "System Architecture",
      description: "Two-contour system with quantum-like state dynamics and meta-control",
      innerLoop: "Inner contour: GRA-nullifier with cognitive Heisenberg principle",
      outerLoop: "Outer contour: LLM meta-control for parameter adaptation",
      keyFormulas: "Key formulas: H(Ψ) + Hᶜ(Ψ) = K(G₀), ΔΨ·ΔG ≥ ℏG/2"
    },
    input: {
      goalLabel: "Research Goal",
      goalPlaceholder: "Describe your research goal..."
    },
    parameters: {
      title: "Simulation Parameters",
      complexity: "Complexity (D)",
      innerSteps: "Inner Steps",
      metaFrequency: "Meta Frequency",
      heisenberg: "Uncertainty ℏG"
    },
    buttons: {
      run: "Run Simulation",
      running: "Simulating..."
    },
    results: {
      formalization: {
        title: "Goal Formalization",
        complexityNote: "Kolmogorov Complexity"
      },
      innerLoop: {
        title: "Inner Loop (GRA)",
        formulas: "Theoretical Formulas",
        trajectory: "Optimization Trajectory",
        metrics: "Final Metrics"
      },
      outerLoop: {
        title: "Outer Loop (Meta)",
        adaptation: "Adaptation Formula",
        iterations: "Meta Iterations",
        metrics: "Final Metrics"
      },
      conclusion: {
        title: "Conclusion",
        summary: "Summary",
        hypotheses: "Surviving Hypotheses",
        predictions: "Predictions"
      },
      diagnostics: {
        title: "Diagnostics",
        geniusIndex: "Genius Index",
        metrics: "Performance Metrics"
      },
      tabs: {
        formalization: "Formalization",
        innerLoop: "Inner Loop",
        outerLoop: "Outer Loop",
        conclusion: "Conclusion",
        diagnostics: "Diagnostics"
      }
    },
    toast: {
      success: "Simulation Complete",
      successDescription: "Results are ready for analysis",
      error: "Simulation Error",
      errorDescription: "Please try again",
      validation: "Enter Goal",
      validationDescription: "Please describe your research goal"
    }
  }
};
