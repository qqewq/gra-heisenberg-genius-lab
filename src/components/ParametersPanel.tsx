import { forwardRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface SimulationParams {
  complexity: number;
  innerSteps: number;
  metaFrequency: number;
  heisenberg: number;
}

interface ParametersPanelProps {
  params: SimulationParams;
  setParams: (params: SimulationParams) => void;
}

export const ParametersPanel = forwardRef<HTMLDivElement, ParametersPanelProps>(
  function ParametersPanel({ params, setParams }, ref) {
  const { language } = useLanguage();

  const paramConfig = [
    { key: 'complexity', min: 1, max: 10, step: 1, translationKey: 'complexity' },
    { key: 'innerSteps', min: 10, max: 100, step: 10, translationKey: 'innerSteps' },
    { key: 'metaFrequency', min: 1, max: 10, step: 1, translationKey: 'metaFrequency' },
    { key: 'heisenberg', min: 0.01, max: 1, step: 0.01, translationKey: 'heisenberg' },
  ] as const;

  return (
    <div ref={ref} className="glass-card glow-border p-6">
      <h3 className="section-title mb-4">
        {language === 'ru' ? 'Параметры симуляции' : 'Simulation Parameters'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paramConfig.map(({ key, min, max, step, translationKey }) => (
          <div key={key} className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-sm text-muted-foreground">
                {t(`params.${translationKey}`, language)}
              </Label>
              <span className="font-mono text-primary text-sm">
                {params[key].toFixed(key === 'heisenberg' ? 2 : 0)}
              </span>
            </div>
            <Slider
              value={[params[key]]}
              min={min}
              max={max}
              step={step}
              onValueChange={([value]) => setParams({ ...params, [key]: value })}
              className="cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
});
