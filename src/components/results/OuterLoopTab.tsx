import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { SimulationResult } from '@/lib/simulation';
import { ArrowRight } from 'lucide-react';

interface OuterLoopTabProps {
  result: SimulationResult;
}

export function OuterLoopTab({ result }: OuterLoopTabProps) {
  const { language } = useLanguage();
  const data = result.outerLoop;

  return (
    <div className="space-y-4 fade-in">
      <h3 className="section-title">{t('results.outerLoop.title', language)}</h3>

      {/* Adaptation formula */}
      <div className="p-4 bg-muted/30 rounded-lg border border-border/30">
        <div className="text-sm text-muted-foreground mb-2">
          {t('results.outerLoop.adaptationFormula', language)}:
        </div>
        <div className="formula text-sm">
          ℏG^(k+1) = ℏG^(k) · (1 + α · (dΦ/dt) / Φ_min)
        </div>
      </div>

      {/* Meta-iterations log */}
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {data.iterations.map((iter, i) => (
          <div key={i} className="p-3 bg-muted/20 rounded-lg border border-border/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-primary font-semibold">k={iter.k}</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <span className="font-mono text-xs">ℏG={iter.heisenberg.toFixed(4)}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {language === 'ru' ? iter.goalUpdate.ru : iter.goalUpdate.en}
            </div>
            <div className="mt-2 flex gap-4 text-xs">
              <span>λ: {iter.lambdas.map(l => l.toFixed(2)).join(', ')}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Final metrics */}
      <div className="grid grid-cols-3 gap-4">
        <MetricCard label="Total iterations" value={data.totalIterations.toString()} />
        <MetricCard label="Final ℏG" value={data.finalHeisenberg.toFixed(4)} />
        <MetricCard label="Convergence" value={`${(data.convergenceRate * 100).toFixed(1)}%`} />
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 bg-muted/20 rounded-lg border border-border/20 text-center">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="font-mono text-primary text-lg">{value}</div>
    </div>
  );
}
