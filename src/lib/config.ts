// src/lib/config.ts

export const defaultASIConfig = {
  // Параметры памяти для RTX 3060 (12GB VRAM)
  memoryAllocation: {
    llmModelSize: '7B', // 7B параметров в INT4
    llmVram: 5 * 1024 * 1024 * 1024, // 5 ГБ для LLM
    graGraphVram: 4 * 1024 * 1024 * 1024, // 4 ГБ для GRA-графов
    modulesVram: 2 * 1024 * 1024 * 1024, // 2 ГБ для дисциплинарных модулей
    metaControllerVram: 1 * 1024 * 1024 * 1024, // 1 ГБ для мета-контроллера
  },
  
  // Параметры вычислений
  computation: {
    maxInnerSteps: 20,
    maxMetaSteps: 100,
    tensionAlpha: 0.7, // Коэффициент для накопления напряжения
    tensionBeta: 0.3, // Коэффициент для энтропийного порога
    coherenceThreshold: 0.75, // Порог когерентности для критического кластера
  },
  
  // Адаптивные стратегии
  adaptiveStrategies: {
    simpleProblem: {
      complexityThreshold: 0.4,
      heisenbergConstant: 0.3,
      innerSteps: 5,
      metaFrequency: 10,
      criticalTension: 0.95
    },
    mediumProblem: {
      complexityThreshold: 0.7,
      heisenbergConstant: 0.7,
      innerSteps: 10,
      metaFrequency: 5,
      criticalTension: 0.8
    },
    complexProblem: {
      complexityThreshold: 1.0,
      heisenbergConstant: 1.5,
      innerSteps: 20,
      metaFrequency: 2,
      criticalTension: 0.3
    }
  },
  
  // Пороги для активации революционного режима
  revolutionThresholds: {
    minProgressRate: 0.001, // Минимальная скорость изменения пены
    minTensionForCollapse: 0.6, // Минимальное напряжение для коллапса
    minClusterCoherence: 0.7, // Минимальная когерентность кластера
    minSuccessProbability: 0.6 // Минимальная вероятность успеха коллапса
  }
};
