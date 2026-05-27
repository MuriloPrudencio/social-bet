import { ShieldCheck } from "lucide-react";
import { Avatar } from "@/components/atoms/avatar";
import { Progress } from "@/components/atoms/progress";
import { Surface } from "@/components/atoms/surface";
import { SectionHeading } from "@/components/molecules/section-heading";
import { maskMultiplier, maskStat } from "@/lib/templates";
import { compact, money } from "@/lib/utils";
import type { Profile } from "@/types/betsocial";

export function ProfilePanel({ profile, full = false }: { profile?: Profile; full?: boolean }) {
  if (!profile) return null;

  return (
    <Surface className="overflow-hidden rounded-2xl">
      <div className="h-24 rounded-t-2xl bg-[radial-gradient(circle_at_20%_20%,rgba(50,242,83,.4),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,.45),transparent_32%),linear-gradient(135deg,rgba(255,200,61,.2),rgba(4,10,16,.9))]" />
      <div className="p-5">
        <div className="-mt-12 flex items-end gap-4">
          <Avatar label={profile.avatar} verified={profile.verified} size="lg" />
          <div className="pb-1">
            <h2 className="text-xl font-black">{profile.name}</h2>
            <p className="text-sm text-zinc-400">{profile.badge}</p>
          </div>
          <span className="ml-auto rounded-xl border border-violetGlow/40 bg-violetGlow/15 px-3 py-2 font-black">Nível {profile.level}</span>
        </div>
        <div className="mt-5">
          <div className="mb-2 flex justify-between text-xs text-zinc-400">
            <span>{compact(profile.xp)} XP</span>
            <span>{compact(profile.nextLevelXP)} XP</span>
          </div>
          <Progress value={profile.xp} max={profile.nextLevelXP} />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3 text-center">
          <Metric label="Publicações" value={profile.posts.toString()} />
          <Metric label="Seguidores" value={compact(profile.followers)} />
          <Metric label="Seguindo" value={profile.following.toString()} />
        </div>
        <div className="mt-5 space-y-2">
          <SectionHeading title="Estatísticas" action="Ver todas" />
          <Stat label="Total ganho" value={maskStat(money(profile.totalWon), profile.privacy)} />
          <Stat label="Melhor multiplicador" value={maskMultiplier(profile.bestMultiplier, profile.privacy)} />
          <Stat label="Jogo favorito" value={maskStat(profile.favoriteGame, profile.privacy)} />
        </div>
        {full ? (
          <div className="mt-5">
            <SectionHeading title="Conquistas" action="Ver todas" />
            <div className="grid gap-2 sm:grid-cols-2">
              {profile.badges.map((badge) => (
                <div key={badge} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-3">
                  <ShieldCheck className="size-5 text-primary" />
                  <span className="text-sm font-semibold">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </Surface>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-lg font-black">{value}</p>
      <p className="text-xs text-zinc-400">{label}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.035] p-3">
      <span className="text-sm text-zinc-400">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
