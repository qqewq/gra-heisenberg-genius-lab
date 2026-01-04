import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { CircuitBoard, Layers, Sigma } from 'lucide-react';

export function ArchitectureCard() {
  const { language } = useLanguage();

  const items = [
    { icon: CircuitBoard, key: 'innerLoop' },
    { icon: Layers, key: 'outerLoop' },
    { icon: Sigma, key: 'keyFormulas' },
  ];

  return (
    <div className="glass-card glow-border p-6">
      <h2 className="section-title mb-3">{t('architecture.title', language)}</h2>
      <p className="text-muted-foreground text-sm mb-4">
        {t('architecture.description', language)}
      </p>
      
      <ul className="space-y-3">
        {items.map(({ icon: Icon, key }) => (
          <li key={key} className="flex items-start gap-3 text-sm">
            <Icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-foreground/90">
              {t(`architecture.${key}`, language)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
