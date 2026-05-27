import type { Challenge } from "@/types/betsocial";

export const challengesMock: Challenge[] = [
  { id: "c1", title: "Ganhe 3 apostas hoje", description: "Finalize o dia com três greens validados.", progress: 2, goal: 3, rewardXP: 500, type: "daily", icon: "target", expiresIn: "12h 45m" },
  { id: "c2", title: "Multiplique 50x", description: "Alcance multiplicador acumulado em jogos selecionados.", progress: 10, goal: 50, rewardXP: 1000, type: "daily", icon: "crown", expiresIn: "12h 45m" },
  { id: "c3", title: "Faça login 7 dias seguidos", description: "Mantenha sua sequência semanal ativa.", progress: 6, goal: 7, rewardXP: 200, type: "daily", icon: "check", expiresIn: "12h 45m" },
  { id: "c4", title: "Ganhe R$ 10.000 em apostas", description: "Some ganhos válidos na semana.", progress: 7200, goal: 10000, rewardXP: 2000, type: "weekly", icon: "target", expiresIn: "3d 12h" },
  { id: "c5", title: "Participe de 5 desafios", description: "Complete missões sociais e competitivas.", progress: 2, goal: 5, rewardXP: 1500, type: "weekly", icon: "trophy", expiresIn: "3d 12h" }
];
