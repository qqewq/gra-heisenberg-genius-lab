import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface InputSectionProps {
  goal: string;
  setGoal: (goal: string) => void;
}

export function InputSection({ goal, setGoal }: InputSectionProps) {
  const { language } = useLanguage();

  return (
    <div className="glass-card glow-border p-6">
      <Label htmlFor="goal" className="section-title block mb-3">
        {t('input.goalLabel', language)}
      </Label>
      <Textarea
        id="goal"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder={t('input.goalPlaceholder', language)}
        className="min-h-[120px] bg-muted/30 border-border/50 focus:border-primary/50 focus:ring-primary/20 resize-none font-mono text-sm"
      />
    </div>
  );
}
