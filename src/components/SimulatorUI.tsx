// src/components/SimulatorUI.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

// Типы
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
  survivingHypotheses: string[];
  falsifiablePredictions: string[];
}

export function SimulatorUI() {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [goal, setGoal] = useState<string>(''); // ← ЦЕЛЬ ИССЛЕДОВАНИЯ G₀

  const runSimulation = async () => {
    if (!goal.trim()) {
      setError('Пожалуйста, опишите цель исследования (G₀)');
      return;
    }

    setIsRunning(true);
    setError(null);
    
    try {
      // Передаём goal в бэкенд
      const response = await fetch(import.meta.env.VITE_API_URL + '/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal })
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      
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
      {/* Ввод цели G₀ */}
      <div className="glass-card glow-border p-6">
        <Label htmlFor="goal" className="section-title block mb-3">
          Цель исследования (G₀)
        </Label>
        <Textarea
          id="goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Опишите цель исследования..."
          className="min-h-[120px] bg-muted/30 border-border/50 focus:border-primary/50 focus:ring-primary/20 resize-none font-mono text-sm"
          maxLength={5000}
        />
      </div>

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
              <p className="text-sm text-muted-foreground">
                Двухконтурная система с квантово-подобной динамикой состояний и мета-управлением
              </p>
            </div>
            <div className="space-y-2">
              <code className="text-xs bg-muted p-1 rounded">
                H(Ψ) + Hᶜ(Ψ) = K(G₀), ΔΨ·ΔG ≥ ℏG/2
              </code>
            </div>
          </div>

          <Separator />

          <div className="flex justify-center">
            <Button 
              onClick={runSimulation} 
              disabled={isRunning || !goal.trim()}
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
            {/* ... остальной вывод без изменений ... */}
            <p>
              На основе симулированного процесса оптимизации, наиболее вероятные оптимальные параметры...
            </p>
            {/* ... */}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
