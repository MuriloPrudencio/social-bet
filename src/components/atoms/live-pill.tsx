import { Radio } from "lucide-react";

export function LivePill({ label = "Ao vivo" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase text-primary shadow-neon">
      <Radio className="size-3 animate-pulse" />
      {label}
    </span>
  );
}
