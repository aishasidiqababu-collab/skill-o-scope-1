export type ReadinessSignal = {
  score: number;
  weight: number;
};

export function calculateReadiness(signals: ReadinessSignal[]): number {
  if (signals.length === 0) return 0;
  const totalWeight = signals.reduce((sum, signal) => sum + signal.weight, 0);
  if (totalWeight === 0) return 0;
  const weightedScore = signals.reduce((sum, signal) => sum + signal.score * signal.weight, 0) / totalWeight;
  return Math.round(Math.min(100, Math.max(0, weightedScore)));
}

export function gapLabel(current: number, target: number): "Ready" | "Small gap" | "Moderate gap" | "Major gap" {
  const gap = target - current;
  if (gap <= 0) return "Ready";
  if (gap <= 5) return "Small gap";
  if (gap <= 15) return "Moderate gap";
  return "Major gap";
}
