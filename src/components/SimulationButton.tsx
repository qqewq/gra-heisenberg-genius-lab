import { forwardRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Play, Loader2 } from 'lucide-react';

interface SimulationButtonProps {
  isRunning: boolean;
  disabled: boolean;
  onClick: () => void;
}

export const SimulationButton = forwardRef<HTMLButtonElement, SimulationButtonProps>(
  function SimulationButton({ isRunning, disabled, onClick }, ref) {
    const { language } = useLanguage();

    return (
      <Button
        ref={ref}
        onClick={onClick}
        disabled={disabled || isRunning}
        size="lg"
        className="w-full md:w-auto px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold transition-all duration-300 hover:shadow-glow disabled:opacity-50"
      >
        {isRunning ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            {t('buttons.running', language)}
          </>
        ) : (
          <>
            <Play className="w-5 h-5 mr-2" />
            {t('buttons.run', language)}
          </>
        )}
      </Button>
    );
  }
);
