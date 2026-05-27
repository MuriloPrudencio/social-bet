import { Compass, Sparkles, Zap } from "lucide-react";
import type { Trend } from "@/components/organisms/right-rail";
import { compact, money } from "@/lib/utils";
import type { Challenge, RankingUser } from "@/types/betsocial";

export type ExploreCardViewModel = {
  title: string;
  text: string;
  icon: typeof Sparkles;
};

export function buildExploreCards({
  ranking = [],
  challenges = [],
  trends = []
}: {
  ranking?: RankingUser[];
  challenges?: Challenge[];
  trends?: Trend[];
}): ExploreCardViewModel[] {
  const leader = ranking[0];
  const hotTrend = trends[0];
  const nextChallenge = challenges.find((challenge) => challenge.progress < challenge.goal);

  return [
    {
      title: hotTrend ? `${hotTrend.game} em alta` : "Tendencias ao vivo",
      icon: Sparkles,
      text: hotTrend ? `${hotTrend.bets.toLocaleString("pt-BR")} apostas e crescimento de ${hotTrend.growth}% no social feed.` : "Aguardando dados do feed para calcular tendencias."
    },
    {
      title: leader ? `${leader.name} lidera agora` : "Influencers em alta",
      icon: Compass,
      text: leader ? `${money(leader.amount)} acumulados, ${leader.multiplier}x e ${compact(leader.xp)} XP no ranking semanal.` : "Ranking carregando usuarios com maior prova social."
    },
    {
      title: nextChallenge ? nextChallenge.title : "Drops sociais",
      icon: Zap,
      text: nextChallenge ? `${nextChallenge.progress}/${nextChallenge.goal} concluido. Recompensa de ${nextChallenge.rewardXP} XP.` : "Todos os desafios carregados foram concluidos."
    }
  ];
}
