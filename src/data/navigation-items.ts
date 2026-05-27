import { Bell, Compass, Home, Trophy, User, WalletCards, Zap } from "lucide-react";
import type { BetSocialView } from "@/stores/ui-store";

export type NavigationItem = {
  id: BetSocialView;
  label: string;
  icon: typeof Home;
  showInBottomNav: boolean;
  showInMobileTabs: boolean;
};

export const navigationItems: NavigationItem[] = [
  { id: "feed", label: "Feed", icon: Home, showInBottomNav: true, showInMobileTabs: true },
  { id: "explore", label: "Explorar", icon: Compass, showInBottomNav: false, showInMobileTabs: false },
  { id: "ranking", label: "Ranking", icon: Trophy, showInBottomNav: true, showInMobileTabs: true },
  { id: "challenges", label: "Desafios", icon: Zap, showInBottomNav: true, showInMobileTabs: true },
  { id: "achievements", label: "Conquistas", icon: WalletCards, showInBottomNav: false, showInMobileTabs: false },
  { id: "notifications", label: "Alertas", icon: Bell, showInBottomNav: true, showInMobileTabs: true },
  { id: "profile", label: "Perfil", icon: User, showInBottomNav: true, showInMobileTabs: true },
  { id: "reactions", label: "Reacoes", icon: Zap, showInBottomNav: false, showInMobileTabs: true }
];
