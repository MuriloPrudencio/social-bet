import { Check, Crown, Target, Trophy } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/atoms/progress";
import { Surface } from "@/components/atoms/surface";
import { SectionHeading } from "@/components/molecules/section-heading";
import type { Challenge } from "@/types/betsocial";

const icons = { target: Target, crown: Crown, check: Check, trophy: Trophy };

export function ChallengesPanel({ challenges = [], full = false }: { challenges?: Challenge[]; full?: boolean }) {
  const grouped = full ? challenges : challenges.slice(0, 4);

  return (
    <Surface className="p-4">
      <SectionHeading
        title={full ? "Desafios" : "Desafios em destaque"}
        action={full ? undefined : <Link href="/challenges" className="hover:underline">Ver todos</Link>}
      />
      <div className="space-y-3">
        {grouped.map((challenge) => {
          const Icon = icons[challenge.icon];
          return (
            <div key={challenge.id} className="rounded-xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-primary/30">
              <div className="flex gap-3">
                <div className="grid size-12 shrink-0 place-items-center rounded-full border border-primary/25 bg-primary/10 text-primary shadow-neon">
                  <Icon className="size-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold">{challenge.title}</h3>
                      <p className="mt-1 text-xs text-zinc-400">{challenge.progress} / {challenge.goal}</p>
                    </div>
                    <span className="rounded-lg border border-violetGlow/40 bg-violetGlow/15 px-2 py-1 text-xs font-black text-white">XP {challenge.rewardXP}</span>
                  </div>
                  <Progress value={challenge.progress} max={challenge.goal} className="mt-3" />
                  {full ? <p className="mt-2 text-xs text-zinc-400">{challenge.description}</p> : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Surface>
  );
}
