"use client";

import { useState } from "react";
import Link from "next/link";
import { Crown, Swords, TrendingUp, Users } from "lucide-react";
import { Avatar } from "@/components/atoms/avatar";
import { Button } from "@/components/atoms/button";
import { Surface } from "@/components/atoms/surface";
import { SectionHeading } from "@/components/molecules/section-heading";
import { viewPaths } from "@/data/routes";
import { compact, money, moneyCompact } from "@/lib/utils";
import { maskAmount, maskMultiplier } from "@/lib/templates";
import type { PrivacySettings, RankingUser } from "@/types/betsocial";

const SIDEBAR_REST_LIMIT = 2;
const FULL_PREVIEW_REST_LIMIT = 4;

export function RankingPanel({
  ranking = [],
  full = false,
  privacy
}: {
  ranking?: RankingUser[];
  full?: boolean;
  privacy?: PrivacySettings;
}) {
  const [expanded, setExpanded] = useState(false);
  const top = ranking.slice(0, 3);
  const rest = ranking.slice(3);
  const leader = ranking[0];
  const totalPrize = ranking.reduce((sum, user) => sum + user.amount, 0);
  const averageMultiplier = ranking.length
    ? Math.round(ranking.reduce((sum, user) => sum + user.multiplier, 0) / ranking.length)
    : 0;
  const hasMore = rest.length > (full ? FULL_PREVIEW_REST_LIMIT : SIDEBAR_REST_LIMIT);
  const visibleRest = full
    ? expanded
      ? rest
      : rest.slice(0, FULL_PREVIEW_REST_LIMIT)
    : rest.slice(0, SIDEBAR_REST_LIMIT);
  const showExpandControls = full ? hasMore && !expanded : hasMore || ranking.length > 0;

  const expandAction = full ? (
    <button type="button" className="text-xs font-semibold text-primary hover:underline" onClick={() => setExpanded(true)}>
      Ver completo
    </button>
  ) : (
    <Link href={viewPaths.ranking} className="text-xs font-semibold text-primary hover:underline">
      Ver completo
    </Link>
  );

  return (
    <Surface className="p-4">
      <SectionHeading title="Ranking Semanal" action={showExpandControls && (!full || !expanded) ? expandAction : undefined} />
      {full && leader ? (
        <div className="mb-5 grid gap-3 md:grid-cols-[1.3fr_1fr_1fr]">
          <div className="rounded-xl border border-gold/30 bg-gold/10 p-4">
            <p className="text-xs font-black uppercase text-gold">Centro da disputa</p>
            <div className="mt-3 flex items-center gap-3">
              <Avatar label={leader.avatar} verified={leader.verified} size="md" />
              <div className="min-w-0">
                <p className="truncate text-lg font-black">{leader.name}</p>
                <p className="text-sm text-zinc-400">lidera com {leader.privacyMasked ? maskAmount(leader.amount, privacy) : moneyCompact(leader.amount)}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
            <Users className="mb-3 size-5 text-primary" />
            <p className="text-2xl font-black">{ranking.length}</p>
            <p className="text-xs text-zinc-400">jogadores ativos</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
            <Swords className="mb-3 size-5 text-violetGlow" />
            <p className="text-2xl font-black">{moneyCompact(totalPrize)}</p>
            <p className="text-xs text-zinc-400">volume semanal · media {averageMultiplier}x</p>
          </div>
        </div>
      ) : null}
      <div className="grid grid-cols-3 items-end gap-2 sm:gap-3">
        {top.map((user) => (
          <div key={user.id} className={`min-w-0 ${user.position === 1 ? "order-2" : user.position === 2 ? "order-1" : "order-3"}`}>
            <div className={`min-w-0 rounded-xl border p-2 text-center sm:p-3 ${user.position === 1 ? "border-gold/60 bg-gold/10 pb-5 shadow-gold sm:pb-8" : "border-violetGlow/40 bg-violetGlow/10"}`}>
              <Crown className={`mx-auto mb-1 size-6 sm:mb-2 sm:size-7 ${user.position === 1 ? "text-gold" : "text-violetGlow"}`} />
              <p className="text-3xl font-black sm:text-4xl">{user.position}</p>
              <Avatar label={user.avatar} verified={user.verified} size="sm" className="mx-auto my-2 sm:my-3" />
              <p className="truncate text-xs font-bold sm:text-sm">{user.name}</p>
              <p className="truncate text-[11px] font-black text-gold sm:hidden">
                {user.privacyMasked ? maskAmount(user.amount, privacy) : moneyCompact(user.amount)}
              </p>
              <p className="hidden text-sm font-black text-gold sm:block">
                {user.privacyMasked ? maskAmount(user.amount, privacy) : money(user.amount)}
              </p>
              <p className="text-xs text-zinc-400">{user.privacyMasked ? maskMultiplier(user.multiplier, privacy) : `${user.multiplier}x`}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 space-y-2">
        {visibleRest.map((user) => (
          <div key={user.id} className="grid grid-cols-[24px_minmax(0,1fr)_auto] items-center gap-2 rounded-xl border border-white/5 bg-white/[0.025] p-2 sm:grid-cols-[32px_1fr_auto_auto] sm:gap-3">
            <span className="text-sm text-zinc-400">{user.position}</span>
            <div className="flex min-w-0 items-center gap-2">
              <Avatar label={user.avatar} verified={user.verified} size="sm" />
              <span className="truncate text-sm font-semibold">{user.name}</span>
            </div>
            <span className="text-xs font-bold text-primary sm:text-sm">
              {user.privacyMasked ? maskAmount(user.amount, privacy) : moneyCompact(user.amount)}
            </span>
            <span className="hidden rounded-full bg-white/5 px-2 py-1 text-xs text-zinc-400 sm:inline">{compact(user.xp)} XP</span>
          </div>
        ))}
      </div>
      {showExpandControls && (!full || !expanded) ? (
        full ? (
          <Button variant="glass" className="mt-4 w-full border-primary/30 text-primary" onClick={() => setExpanded(true)}>
            Ver ranking completo ({rest.length - FULL_PREVIEW_REST_LIMIT} restantes)
          </Button>
        ) : (
          <Button variant="glass" className="mt-4 w-full border-primary/30 text-primary" asChild>
            <Link href={viewPaths.ranking}>Ver ranking completo</Link>
          </Button>
        )
      ) : null}
      {full ? (
        <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-white/[0.035] px-4 py-3 text-xs text-zinc-400">
          <TrendingUp className="size-4 text-primary" />
          {expanded ? `Exibindo ${ranking.length} jogadores no ranking semanal.` : "Atualiza automaticamente com novas conquistas."}
        </div>
      ) : null}
    </Surface>
  );
}
