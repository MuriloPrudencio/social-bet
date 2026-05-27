import type { Story } from "@/types/betsocial";

const expires = () => new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

export const storiesMock: Story[] = [
  {
    id: "story-1",
    user: { id: "u2", name: "Altair Tips", handle: "@altairtips", avatar: "/avatars/altair.svg", verified: true, level: 31, badge: "Top Winner", isFollowing: true },
    templateType: "multiplier",
    templateLabel: "MULTIPLICADOR",
    game: "Fortune Tiger",
    amount: 103563,
    multiplier: 1000,
    caption: "Hoje foi absurdo 🚀",
    sticker: "🚀",
    accentColor: "#a855f7",
    image: "/avatars/altair.svg",
    reactions: { fire: 240, rocket: 88, trophy: 61, clap: 42, heart: 118 },
    createdAt: "2026-05-23T15:10:00",
    expiresAt: expires()
  },
  {
    id: "story-2",
    user: { id: "u4", name: "BraboBets", handle: "@brabobets", avatar: "/avatars/brabo.svg", verified: true, level: 29, badge: "Elite", isFollowing: true },
    templateType: "big_win",
    templateLabel: "BIG WIN",
    game: "Aviator",
    amount: 72340,
    multiplier: 850,
    caption: "Green absurdo 💚",
    sticker: "🔥",
    accentColor: "#32f253",
    image: "/avatars/brabo.svg",
    reactions: { fire: 190, rocket: 120, trophy: 52, clap: 38, heart: 74 },
    createdAt: "2026-05-23T14:58:00",
    expiresAt: expires()
  },
  {
    id: "story-3",
    user: { id: "u5", name: "LadyGreen", handle: "@ladygreen", avatar: "/avatars/ladygreen.svg", verified: true, level: 22, badge: "Green Queen", isFollowing: true },
    templateType: "lucky_moment",
    templateLabel: "LUCKY MOMENT",
    game: "Mega da Virada",
    amount: 41230,
    multiplier: 540,
    sticker: "✨",
    accentColor: "#f472b6",
    image: "/avatars/ladygreen.svg",
    reactions: { fire: 142, rocket: 55, trophy: 36, clap: 48, heart: 129 },
    createdAt: "2026-05-23T14:22:00",
    expiresAt: expires()
  }
];
