import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { SimulationResult } from '@/lib/simulation';
import { Progress } from '@/components/ui/progress';

interface DiagnosticsTabProps {
  result: SimulationResult;
}

export function DiagnosticsTab({ result }: DiagnosticsTabProps) {
  const { language } = useLanguage();
  const data = result.diagnostics;

  return (
    <div className="space-y-6 fade-in">
      <h3 className="section-title">{t('results.diagnostics.title', language)}</h3>

      {/* Genius score */}
      <div className="text-center py-6">
        <div className="text-6xl font-mono font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
          {(data.geniusScore * 100).toFixed(1)}%
        </div>
        <div className="text-muted-foreground">
          {language === 'ru' ? 'Индекс «гениальности»' : 'Genius Index'}
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-4">
        <DiagnosticMetric
          label={language === 'ru' ? 'Близость к Φ_min' : 'Φ Proximity'}
          value={data.phiProximity}
          description={language === 'ru' 
            ? `Текущее значение Φ близко к минимуму на ${(data.phiProximity * 100).toFixed(1)}%`
            : `Current Φ is ${(data.phiProximity * 100).toFixed(1)}% close to minimum`
          }
        />
        
        <DiagnosticMetric
          label={language === 'ru' ? 'Оптимальность пути' : 'Path Optimality'}
          value={data.pathOptimality}
          description={language === 'ru'
            ? `Траектория оптимальна на ${(data.pathOptimality * 100).toFixed(1)}%`
            : `Path is ${(data.pathOptimality * 100).toFixed(1)}% optimal`
          }
        />

        <DiagnosticMetric
          label={language === 'ru' ? 'Когерентность' : 'Coherence'}
          value={data.coherence}
          description={language === 'ru'
            ? `Уровень когерентности квантовых состояний`
            : `Quantum state coherence level`
          }
        />

        <DiagnosticMetric
          label={language === 'ru' ? 'Стабильность' : 'Stability'}
          value={data.stability}
          description={language === 'ru'
            ? `Стабильность решения в метапространстве`
            : `Solution stability in meta-space`
          }
        />
      </div>
    </div>
  );
}

function DiagnosticMetric({ label, value, description }: { 
  label: string; 
  value: number;
  description: string;
}) {
  const getColor = (v: number) => {
    if (v >= 0.8) return 'bg-success';
    if (v >= 0.5) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{label}</span>
        <span className="font-mono text-primary">{(value * 100).toFixed(1)}%</span>
      </div>
      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${getColor(value)}`}
          style={{ width: `${value * 100}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
