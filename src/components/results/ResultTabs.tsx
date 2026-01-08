import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { SimulationResult } from '@/lib/simulation';
import { FormalizationTab } from './FormalizationTab';
import { InnerLoopTab } from './InnerLoopTab';
import { OuterLoopTab } from './OuterLoopTab';
import { ConclusionTab } from './ConclusionTab';
import { DiagnosticsTab } from './DiagnosticsTab';
import {
  FormalizationSkeleton,
  InnerLoopSkeleton,
  OuterLoopSkeleton,
  ConclusionSkeleton,
  DiagnosticsSkeleton,
} from './ResultSkeletons';
import { cn } from '@/lib/utils';

interface ResultTabsProps {
  result?: SimulationResult | null;
  isLoading?: boolean;
}

type TabKey = 'formalization' | 'innerLoop' | 'outerLoop' | 'conclusion' | 'diagnostics';

export function ResultTabs({ result, isLoading = false }: ResultTabsProps) {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabKey>('formalization');

  const tabs: { key: TabKey; translationKey: string }[] = [
    { key: 'formalization', translationKey: 'results.tabs.formalization' },
    { key: 'innerLoop', translationKey: 'results.tabs.innerLoop' },
    { key: 'outerLoop', translationKey: 'results.tabs.outerLoop' },
    { key: 'conclusion', translationKey: 'results.tabs.conclusion' },
    { key: 'diagnostics', translationKey: 'results.tabs.diagnostics' },
  ];

  const renderContent = () => {
    if (isLoading) {
      switch (activeTab) {
        case 'formalization':
          return <FormalizationSkeleton />;
        case 'innerLoop':
          return <InnerLoopSkeleton />;
        case 'outerLoop':
          return <OuterLoopSkeleton />;
        case 'conclusion':
          return <ConclusionSkeleton />;
        case 'diagnostics':
          return <DiagnosticsSkeleton />;
      }
    }

    if (!result) return null;

    switch (activeTab) {
      case 'formalization':
        return <FormalizationTab result={result} />;
      case 'innerLoop':
        return <InnerLoopTab result={result} />;
      case 'outerLoop':
        return <OuterLoopTab result={result} />;
      case 'conclusion':
        return <ConclusionTab result={result} />;
      case 'diagnostics':
        return <DiagnosticsTab result={result} />;
    }
  };

  return (
    <div className="glass-card glow-border overflow-hidden fade-in">
      {/* Tab header */}
      <div className="flex overflow-x-auto border-b border-border/50 bg-muted/20">
        {tabs.map(({ key, translationKey }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={cn(
              'px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2',
              activeTab === key
                ? 'text-primary border-primary bg-primary/5'
                : 'text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/30'
            )}
          >
            {t(translationKey, language)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-6">
        {renderContent()}
      </div>
    </div>
  );
}
