import { Skeleton } from "@/components/ui/skeleton";

export function FormalizationSkeleton() {
  return (
    <div className="space-y-4 fade-in">
      <Skeleton className="h-6 w-48" />
      
      <div className="p-4 bg-muted/30 rounded-lg border border-border/30 space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-5 w-24 rounded-full" />
      </div>
    </div>
  );
}

export function InnerLoopSkeleton() {
  return (
    <div className="space-y-6 fade-in">
      <Skeleton className="h-6 w-56" />
      
      {/* Chart placeholder */}
      <div className="h-64 bg-muted/30 rounded-lg border border-border/30 p-4">
        <div className="flex items-end justify-between h-full gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton 
              key={i} 
              className="flex-1" 
              style={{ height: `${30 + Math.random() * 60}%` }} 
            />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-3 bg-muted/30 rounded-lg space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-6 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function OuterLoopSkeleton() {
  return (
    <div className="space-y-6 fade-in">
      <Skeleton className="h-6 w-48" />
      
      {/* Iterations */}
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 bg-muted/30 rounded-lg border border-border/30 space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-3 bg-muted/30 rounded-lg space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-5 w-12" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ConclusionSkeleton() {
  return (
    <div className="space-y-6 fade-in">
      <Skeleton className="h-6 w-32" />
      
      {/* Summary */}
      <div className="p-4 bg-muted/30 rounded-lg border border-border/30 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Hypotheses */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-24" />
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-3 bg-muted/30 rounded-lg">
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Predictions */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-28" />
        <div className="space-y-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="p-3 bg-muted/30 rounded-lg">
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DiagnosticsSkeleton() {
  return (
    <div className="space-y-6 fade-in">
      <Skeleton className="h-6 w-40" />

      {/* Genius score */}
      <div className="text-center py-6 space-y-2">
        <Skeleton className="h-16 w-32 mx-auto" />
        <Skeleton className="h-4 w-28 mx-auto" />
      </div>

      {/* Metrics */}
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-2 w-full rounded-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
