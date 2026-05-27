import type { ReactionKey } from "@/types/betsocial";
import { cn } from "@/lib/utils";

const reactionMap: Record<ReactionKey, { icon: string; label: string }> = {
  fire: { icon: "🔥", label: "Fogo" },
  rocket: { icon: "🚀", label: "Foguete" },
  trophy: { icon: "🏆", label: "Troféu" },
  clap: { icon: "👏", label: "Aplausos" },
  heart: { icon: "💚", label: "Valeu" }
};

type ReactionBarProps = {
  reactions: Partial<Record<ReactionKey, number>>;
  compact?: boolean;
  onReact?: (reaction: ReactionKey) => void;
};

export function ReactionBar({ reactions, compact: isCompact, onReact }: ReactionBarProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", isCompact && "gap-1.5")}>
      {Object.entries(reactionMap).map(([key, reaction]) => (
        <button
          key={key}
          type="button"
          onClick={() => onReact?.(key as ReactionKey)}
          title={reaction.label}
          className="inline-flex min-w-12 items-center justify-center gap-1 rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1 text-xs text-zinc-200 transition hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
        >
          <span>{reaction.icon}</span>
          <span>{reactions[key as ReactionKey] ?? 0}</span>
        </button>
      ))}
    </div>
  );
}
