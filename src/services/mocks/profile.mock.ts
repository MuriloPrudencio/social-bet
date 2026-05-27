import type { Activity, Profile } from "@/types/betsocial";
import { privacyMock } from "@/services/mocks/privacy.mock";

export const profileMock: Profile = {
  id: "u1",
  name: "MuriloOFC",
  handle: "@murilo",
  avatar: "/avatars/murilo.svg",
  verified: true,
  level: 25,
  badge: "Apostador profissional",
  balance: 9850,
  xp: 8450,
  nextLevelXP: 12000,
  followers: 18500,
  following: 342,
  posts: 128,
  totalWon: 245000,
  bestMultiplier: 230,
  favoriteGame: "Fortune Tiger",
  badges: ["Dupla do Dia", "Fortune Tiger 100x", "Mega da Virada", "Top 3 Semanal"],
  privacy: { ...privacyMock }
};

export const activitiesMock: Activity[] = [
  { id: "a1", user: "Altair Tips", avatar: "/avatars/altair.svg", text: "Bateu 100x no Fortune Tiger", createdAt: "ha 5 min" },
  { id: "a2", user: "LadyGreen", avatar: "/avatars/ladygreen.svg", text: "Desbloqueou nova badge", createdAt: "ha 15 min" },
  { id: "a3", user: "BraboBets", avatar: "/avatars/brabo.svg", text: "Subiu no ranking semanal", createdAt: "ha 23 min" },
  { id: "a4", user: "Voce", avatar: "/avatars/murilo.svg", text: "Entrou no TOP 3 do ranking semanal", createdAt: "ha 30 min" }
];
