import type { NotificationItem } from "@/types/betsocial";

export const notificationsMock: NotificationItem[] = [
  { id: "n1", type: "like", message: "curtiu sua conquista", actor: "Altair Tips", createdAt: "há 2 min", unread: true },
  { id: "n2", type: "ranking", message: "Você entrou no TOP 3 do ranking semanal", actor: "BetSocial", createdAt: "há 10 min", unread: true },
  { id: "n3", type: "badge", message: "comentou: Brabo!", actor: "LadyGreen", createdAt: "há 15 min", unread: false },
  { id: "n4", type: "challenge", message: "Novo desafio diário disponível", actor: "BetSocial", createdAt: "há 20 min", unread: false },
  { id: "n5", type: "challenge", message: "Desafio diário concluído! Você ganhou 500 XP", actor: "XP Club", createdAt: "há 25 min", unread: false },
  { id: "n6", type: "follow", message: "começou a seguir você", actor: "BraboBets", createdAt: "há 30 min", unread: false }
];
