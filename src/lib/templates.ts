import { money } from "@/lib/utils";
import type { CreatePostPayload, CreateStoryPayload, PostTemplateType, PrivacySettings, StoryTemplateType } from "@/types/betsocial";

export const CAPTION_MAX_STORY = 80;
export const CAPTION_MAX_POST = 120;

export const STORY_TEMPLATES: Record<
  StoryTemplateType,
  { label: string; emoji: string; accent: string; description: string }
> = {
  big_win: { label: "BIG WIN", emoji: "🏆", accent: "#32f253", description: "Vitória em destaque" },
  multiplier: { label: "MULTIPLICADOR", emoji: "🚀", accent: "#a855f7", description: "Multiplicador absurdo" },
  ranking: { label: "RANKING", emoji: "👑", accent: "#ffc83d", description: "Subiu no ranking" },
  badge: { label: "BADGE", emoji: "🛡️", accent: "#60a5fa", description: "Nova badge desbloqueada" },
  challenge: { label: "DESAFIO", emoji: "⚡", accent: "#34d399", description: "Missão concluída" },
  lucky_moment: { label: "LUCKY MOMENT", emoji: "✨", accent: "#f472b6", description: "Momento de sorte" },
  win_streak: { label: "WIN STREAK", emoji: "🔥", accent: "#fb923c", description: "Sequência de vitórias" }
};

export const POST_TEMPLATES: Record<
  PostTemplateType,
  { label: string; emoji: string; feedType: "win" | "ranking" | "badge" | "challenge" }
> = {
  big_win: { label: "BIG WIN", emoji: "🏆", feedType: "win" },
  mega_win: { label: "MEGA WIN", emoji: "💎", feedType: "win" },
  multiplier: { label: "MULTIPLICADOR", emoji: "🚀", feedType: "win" },
  badge: { label: "BADGE", emoji: "🛡️", feedType: "badge" },
  ranking: { label: "RANKING", emoji: "👑", feedType: "ranking" },
  mission: { label: "MISSÃO", emoji: "⚡", feedType: "challenge" },
  win_streak: { label: "WIN STREAK", emoji: "🔥", feedType: "win" }
};

export const STORY_STICKERS = ["🚀", "🔥", "💚", "🏆", "✨", "👑"];
export const POST_STICKERS = ["🚀", "🔥", "💚", "🏆", "✨"];
export const ACCENT_COLORS = ["#32f253", "#a855f7", "#ffc83d", "#60a5fa", "#f472b6"];

export function clampCaption(value: string, max: number) {
  return value.trim().slice(0, max);
}

export function buildStoryContent(payload: CreateStoryPayload, userName: string) {
  const template = STORY_TEMPLATES[payload.templateType];
  return {
    templateLabel: template.label,
    title: `${template.emoji} ${template.label}`,
    subtitle: `${userName} · ${payload.game}`,
    body: `${payload.multiplier}x · ${money(payload.amount)}`
  };
}

export function buildPostContent(payload: CreatePostPayload, userName: string) {
  const template = POST_TEMPLATES[payload.templateType];
  const title = `${template.emoji} ${template.label}`;
  const description =
    payload.templateType === "ranking"
      ? `${userName} entrou no destaque do ranking semanal`
      : payload.templateType === "badge"
        ? `${userName} desbloqueou uma nova badge na Bet`
        : payload.templateType === "mission"
          ? `${userName} concluiu uma missão e liberou recompensa`
          : `${userName} bateu ${payload.multiplier}x no ${payload.game} e ganhou ${money(payload.amount)}`;

  return {
    type: template.feedType,
    title,
    description,
    metaLabel: `Template · ${template.label}`
  };
}

export function maskAmount(value: number, privacy?: PrivacySettings) {
  if (privacy?.hideAmounts) return "••••";
  return money(value);
}

export function maskMultiplier(value: number, privacy?: PrivacySettings) {
  if (privacy?.hideMultipliers) return "••";
  return `${value}x`;
}

export function maskStat(value: string | number, privacy?: PrivacySettings) {
  if (privacy?.hideStats) return "—";
  return typeof value === "number" ? String(value) : value;
}
