import { viewFromPath } from "@/data/routes";
import { usePathname } from "next/navigation";
import { useFeed } from "@/hooks/use-feed";
import { useStories } from "@/hooks/use-stories";
import { useRanking } from "@/hooks/use-ranking";
import { useChallenges } from "@/hooks/use-challenges";
import { useProfile, useActivities } from "@/hooks/use-profile";
import { useNotifications } from "@/hooks/use-notifications";

/** @deprecated Prefer hooks por domínio. Mantido para compatibilidade temporária. */
export function useBetSocialData() {
  const pathname = usePathname();
  const view = viewFromPath(pathname ?? "/feed");

  const feed = useFeed(view === "feed" || view === "reactions");
  const stories = useStories(view === "feed");
  const ranking = useRanking(view === "ranking" || view === "explore" || view === "achievements");
  const challenges = useChallenges(view === "challenges" || view === "explore" || view === "achievements");
  const profile = useProfile(true);
  const notifications = useNotifications(view === "notifications" || true);
  const activities = useActivities(view === "feed" || view === "explore");

  return { feed, ranking, challenges, profile, notifications, activities, stories };
}
