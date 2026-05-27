import { Bell, Sparkles, Trophy, Zap } from "lucide-react";
import { compact, money } from "@/lib/utils";
import type { Challenge, FeedPost, Profile, RankingUser } from "@/types/betsocial";

export type AchievementCardViewModel = {
  title: string;
  description: string;
  icon: typeof Trophy;
  tone: string;
};

export function buildAchievementCards({
  profile,
  ranking = [],
  challenges = [],
  feed = []
}: {
  profile?: Profile;
  ranking?: RankingUser[];
  challenges?: Challenge[];
  feed?: FeedPost[];
}): AchievementCardViewModel[] {
  const topPosition = ranking.find((user) => user.id === profile?.id)?.position;
  const bestPost = feed.reduce<FeedPost | undefined>((best, post) => (!best || post.amount > best.amount ? post : best), undefined);
  const completedChallenges = challenges.filter((challenge) => challenge.progress >= challenge.goal);

  return [
    {
      title: topPosition ? `Ranking semanal #${topPosition}` : "Ranking semanal",
      description: profile ? `${profile.name} esta competindo com ${compact(profile.xp)} XP.` : "Dados de perfil carregando.",
      icon: Trophy,
      tone: "text-gold"
    },
    {
      title: bestPost ? `${bestPost.multiplier}x em ${bestPost.game}` : "Multiplicador social",
      description: bestPost ? `${bestPost.user.name} registrou ${money(bestPost.amount)} no feed.` : "Aguardando conquistas do feed.",
      icon: Sparkles,
      tone: "text-violetGlow"
    },
    {
      title: `${completedChallenges.length} desafios concluidos`,
      description: `${challenges.length} desafios ativos vindos da API mockada.`,
      icon: Zap,
      tone: "text-primary"
    },
    {
      title: profile?.badges[0] ?? "Badge premium",
      description: profile ? `${profile.badges.length} badges vinculadas ao perfil.` : "Badges carregando do mock de perfil.",
      icon: Bell,
      tone: "text-primary"
    }
  ];
}
