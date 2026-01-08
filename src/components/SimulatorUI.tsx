// src/components/SimulatorUI.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Типы для API
interface SimulationParams {
  complexityLevel: number;
  innerSteps: number;
  metaFrequency: number;
  heisenbergConstant: number;
  gridResolution: number;
  targetEnergy: number;
  targetTransitionProbability: number;
}

interface SimulationResult {
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

export function SimulatorUI() {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runSimulation = async () => {
    setIsRunning(true);
    setError(null);
    
    try {
      // Параметры симуляции (можно сделать настраиваемыми позже)
      const params: SimulationParams = {
        complexityLevel: 1,
        innerSteps: 8,
        metaFrequency: 3,
        heisenbergConstant: 0.01,
        gridResolution: 200,
        targetEnergy: 1.732,
        targetTransitionProbability: 0.25
      };

      // Определяем URL API
      const apiUrl = import.meta.env.VITE_API_URL 
        ? `${import.meta.env.VITE_API_URL}/simulate`
        : '/api/simulate'; // fallback для локальной разработки

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data: SimulationResult = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Simulation failed:', err);
      setError('Ошибка при запуске симуляции. Убедитесь, что бэкенд запущен.');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>GRA-Heisenberg Genius Simulator</CardTitle>
          <CardDescription>
            Симулятор когнитивного ИИ-гения на базе двухконтурной GRA-архитектуры
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Архитектура системы</Label>
              <p className="text-sm text-muted-foreground">
                Двухконтурная система с квантово-подобной динамикой состояний и мета-управлением
              </p>
            </div>
            <div className="space-y-2">
              <Label>Ключевые формулы</Label>
              <code className="text-xs bg-muted p-1 rounded">
                H(Ψ) + Hᶜ(Ψ) = K(G₀), ΔΨ·ΔG ≥ ℏG/2
              </code>
            </div>
          </div>

          <Separator />

          <div className="flex justify-center">
            <Button 
              onClick={runSimulation} 
              disabled={isRunning}
              className="w-full md:w-auto"
            >
              {isRunning ? 'Запуск симуляции...' : 'Запустить симуляцию'}
            </Button>
          </div>

          {error && (
            <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Итоговый научный вывод</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              На основе симулированного процесса оптимизации, наиболее вероятные оптимальные параметры для двумерной квантовой точки:
              <br />
              <strong>α ≈ {result.alpha.toFixed(4)} ± {result.alphaUncertainty.toFixed(4)} эВ/нм⁴</strong>,{' '}
              <strong>β ≈ {result.beta.toFixed(4)} ± {result.betaUncertainty.toFixed(4)} эВ/нм⁴</strong>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Достигнутые значения:</h4>
                <ul className="text-sm space-y-1">
                  <li>E₀ = {result.achievedEnergy.toFixed(4)} эВ</li>
                  <li>P(переход) = {result.achievedTransitionProbability.toFixed(4)}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Пена разума:</h4>
                <ul className="text-sm space-y-1">
                  <li>Φ = {result.phiValue.toFixed(6)}</li>
                  <li>Φ_min = {result.phiMin.toFixed(6)}</li>
                  <li>Скорость сходимости = {result.convergenceRate.toFixed(6)}</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Выжившие гипотезы:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {result.survivingHypotheses.map((h, i) => (
                  <li key={i} className="text-sm">{h}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Предсказания и фальсифицируемые следствия:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {result.falsifiablePredictions.map((p, i) => (
                  <li key={i} className="text-sm">{p}</li>
                ))}
              </ul>
            </div>

            <Badge variant="secondary">
              Сложность: {result.computationalComplexity}
            </Badge>
            <Badge>Время на RTX 3060: ~{result.estimatedRuntime.toFixed(1)} сек</Badge>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
