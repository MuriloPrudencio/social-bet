import type { BetSocialView } from "@/stores/ui-store";

export const viewPaths: Record<BetSocialView, string> = {
  feed: "/feed",
  explore: "/explore",
  ranking: "/ranking",
  challenges: "/challenges",
  achievements: "/achievements",
  notifications: "/notifications",
  profile: "/profile",
  reactions: "/reactions"
};

export function viewFromPath(pathname: string): BetSocialView {
  const entry = Object.entries(viewPaths).find(([, path]) => pathname === path || pathname.startsWith(`${path}/`));
  return (entry?.[0] as BetSocialView) ?? "feed";
}
