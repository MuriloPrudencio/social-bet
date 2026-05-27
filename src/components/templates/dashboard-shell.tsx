"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { buildTrendsFromFeed } from "@/components/organisms/right-rail";
import { FeedInteractionLayer } from "@/components/organisms/social-composers/feed-interaction-layer";
import { AppShellTemplate } from "@/components/templates/app-shell-template";
import { DashboardLayoutTemplate } from "@/components/templates/dashboard-layout-template";
import { viewFromPath } from "@/data/routes";
import { useFeed } from "@/hooks/use-feed";
import { useRanking } from "@/hooks/use-ranking";
import { useChallenges } from "@/hooks/use-challenges";
import { useProfile, useActivities } from "@/hooks/use-profile";
import { useNotifications } from "@/hooks/use-notifications";
import { usePendingWinShare } from "@/hooks/use-pending-win-share";
import { useUiStore } from "@/stores/ui-store";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const view = viewFromPath(pathname ?? "/feed");
  const setActiveView = useUiStore((s) => s.setActiveView);

  const profile = useProfile(true);
  const notifications = useNotifications(true);
  const feed = useFeed(view === "feed" || view === "reactions");
  const ranking = useRanking(view === "ranking" || view === "explore" || view === "achievements");
  const challenges = useChallenges(view === "challenges" || view === "explore" || view === "achievements");
  const activities = useActivities(view === "feed" || view === "explore");

  usePendingWinShare(true);

  useEffect(() => {
    setActiveView(view);
  }, [view, setActiveView]);

  const unreadCount = notifications.data?.filter((item) => item.unread).length ?? 0;
  const trends = buildTrendsFromFeed(feed.data);
  const livePost = feed.data?.find((post) => post.source === "trending" || post.metaLabel.includes("vivo"));

  return (
    <AppShellTemplate profile={profile.data} notifications={notifications.data} unreadCount={unreadCount} livePost={livePost}>
      <DashboardLayoutTemplate
        activeView={view}
        ranking={ranking.data}
        challenges={challenges.data}
        profile={profile.data}
        activities={activities.data}
        trends={trends}
      >
        {children}
      </DashboardLayoutTemplate>
      <FeedInteractionLayer />
    </AppShellTemplate>
  );
}
