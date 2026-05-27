import { cn } from "@/lib/utils";

type ProgressProps = {
  value: number;
  max: number;
  className?: string;
};

export function Progress({ value, max, className }: ProgressProps) {
  const width = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-white/10", className)}>
      <div className="h-full rounded-full bg-gradient-to-r from-primary to-violetGlow shadow-neon transition-all duration-700" style={{ width: `${width}%` }} />
    </div>
  );
}
