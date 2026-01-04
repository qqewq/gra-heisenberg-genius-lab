import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { SimulationResult } from '@/lib/simulation';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

interface ConclusionTabProps {
  result: SimulationResult;
}

export function ConclusionTab({ result }: ConclusionTabProps) {
  const { language } = useLanguage();
  const data = result.conclusion;

  return (
    <div className="space-y-4 fade-in">
      <h3 className="section-title">{t('results.conclusion.title', language)}</h3>

      {/* Main conclusion */}
      <div className="p-4 bg-muted/30 rounded-lg border border-border/30 space-y-3">
        <p className="text-foreground/90">
          <span className="font-semibold text-primary">RU:</span> {data.summary.ru}
        </p>
        <p className="text-foreground/90">
          <span className="font-semibold text-secondary">EN:</span> {data.summary.en}
        </p>
      </div>

      {/* Surviving hypotheses */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground mb-2">
          {t('results.conclusion.hypotheses', language)}
        </h4>
        <ul className="space-y-2">
          {data.hypotheses.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <span>{language === 'ru' ? h.ru : h.en}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Predictions */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground mb-2">
          {t('results.conclusion.predictions', language)}
        </h4>
        <ul className="space-y-2">
          {data.predictions.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
              <span>{language === 'ru' ? p.ru : p.en}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
