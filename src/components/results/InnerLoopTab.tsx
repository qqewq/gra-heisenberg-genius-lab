import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';
import { SimulationResult } from '@/lib/simulation';

interface InnerLoopTabProps {
  result: SimulationResult;
}

export function InnerLoopTab({ result }: InnerLoopTabProps) {
  const { language } = useLanguage();
  const data = result.innerLoop;

  const formulas = [
    '|Ψ⟩ = Σᵢ cᵢ|ψᵢ⟩, Σᵢ|cᵢ|² = 1',
    'Φ(Ψ,G₀) = Σ wᵢⱼ|cᵢ|²|cⱼ|²[dᵢⱼ + λ(1-Lᵢⱼ)]',
    'H(Ψ) + Hᶜ(Ψ) = K(G₀)',
    'ΔΨ·ΔG ≥ ℏG/2',
    'ℒinner = Φ + Σλₖℒgₖ + η(H+Hᶜ-K)² + μ·max(0,Φmin-Φ)',
    'd|Ψ⟩/dt = -i𝓗GRA|Ψ⟩ - ∇Ψℒinner + √(ℏG/2)·ξ(t)',
  ];

  return (
    <div className="space-y-4 fade-in">
      <h3 className="section-title">{t('results.innerLoop.title', language)}</h3>

      {/* Formulas */}
      <div className="p-4 bg-muted/30 rounded-lg border border-border/30 space-y-2">
        {formulas.map((formula, i) => (
          <div key={i} className="formula text-xs md:text-sm overflow-x-auto">
            {formula}
          </div>
        ))}
      </div>

      {/* Trajectory log */}
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {data.trajectory.map((step, i) => (
          <div key={i} className="log-line">
            <span className="text-muted-foreground">t={step.t.toFixed(0).padStart(3, '0')}</span>
            <span className="mx-2 text-primary">Φ={step.phi.toFixed(4)}</span>
            <span className="text-secondary">H={step.entropy.toFixed(4)}</span>
          </div>
        ))}
      </div>

      {/* Final metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="Φ_final" value={data.phiFinal.toFixed(4)} />
        <MetricCard label="H_final" value={data.entropyFinal.toFixed(4)} />
        <MetricCard label="Steps" value={data.trajectory.length.toString()} />
        <MetricCard label="ℏG_used" value={data.heisenbergUsed.toFixed(3)} />
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
