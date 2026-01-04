import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { SimulationResult } from '@/lib/simulation';

interface FormalizationTabProps {
  result: SimulationResult;
}

export function FormalizationTab({ result }: FormalizationTabProps) {
  const { language } = useLanguage();
  const data = result.formalization;

  return (
    <div className="space-y-4 fade-in">
      <h3 className="section-title">{t('results.formalization.title', language)}</h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-muted/30 rounded-lg border border-border/30">
          <p className="text-foreground/90 mb-2">
            <span className="font-semibold text-primary">RU:</span> {data.ru}
          </p>
          <p className="text-foreground/90">
            <span className="font-semibold text-secondary">EN:</span> {data.en}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">{t('results.formalization.complexityNote', language)}</span>
          <span className="formula">K(G₀) ≈ {data.complexity.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
