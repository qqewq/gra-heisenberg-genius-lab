import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { ArchitectureCard } from '@/components/ArchitectureCard';
import { InputSection } from '@/components/InputSection';
import { ParametersPanel } from '@/components/ParametersPanel';
import { SimulationButton } from '@/components/SimulationButton';
import { ResultTabs } from '@/components/results/ResultTabs';
import { runSimulation, SimulationResult, SimulationParams } from '@/lib/simulation';
import { t } from '@/lib/translations';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

function SimulatorContent() {
  const { language } = useLanguage();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [goal, setGoal] = useState('');
  const [params, setParams] = useState<SimulationParams>({
    complexity: 5,
    innerSteps: 50,
    metaFrequency: 5,
    heisenberg: 0.1,
  });
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleRunSimulation = async () => {
    if (!goal.trim()) {
      toast.error(language === 'ru' 
        ? 'Введите цель исследования' 
        : 'Enter a research goal'
      );
      return;
    }

    setIsRunning(true);
    setResult(null);

    try {
      const simulationResult = await runSimulation(goal, params, language);
      setResult(simulationResult);
      toast.success(language === 'ru'
        ? 'Симуляция завершена'
        : 'Simulation complete'
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error(language === 'ru'
        ? `Ошибка симуляции: ${errorMessage}`
        : `Simulation error: ${errorMessage}`
      );
    } finally {
      setIsRunning(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <Header />

        <main className="container mx-auto max-w-5xl px-4 pb-12 space-y-6">
          {/* Architecture description */}
          <ArchitectureCard />

          {/* Input section */}
          <InputSection goal={goal} setGoal={setGoal} />

          {/* Parameters */}
          <ParametersPanel params={params} setParams={setParams} />

          {/* Run button */}
          <div className="flex justify-center">
            <SimulationButton
              isRunning={isRunning}
              disabled={!goal.trim()}
              onClick={handleRunSimulation}
            />
          </div>

          {/* Results */}
          {(isRunning || result) && (
            <div className="pt-4">
              <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('results.title', language)}
              </h2>
              <ResultTabs result={result} isLoading={isRunning} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <LanguageProvider>
      <SimulatorContent />
    </LanguageProvider>
  );
}
