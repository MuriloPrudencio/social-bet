"use client";

import type { ReactNode } from "react";
import { RightRail, type Trend } from "@/components/organisms/right-rail";
import type { BetSocialView } from "@/stores/ui-store";
import type { Activity, Challenge, Profile, RankingUser } from "@/types/betsocial";

type DashboardLayoutTemplateProps = {
  children: ReactNode;
  activeView?: BetSocialView;
  ranking?: RankingUser[];
  challenges?: Challenge[];
  profile?: Profile;
  activities?: Activity[];
  trends?: Trend[];
};

export function DashboardLayoutTemplate({
  children,
  activeView,
  ranking,
  challenges,
  profile,
  activities,
  trends
}: DashboardLayoutTemplateProps) {
  return (
    <div className="mx-auto flex max-w-[1660px] gap-4 p-4 pb-24 lg:p-6 xl:pb-6">
      <section className="min-w-0 flex-1 space-y-4">{children}</section>
      {activeView === "ranking" ? null : (
        <RightRail
          ranking={ranking}
          challenges={challenges}
          profile={profile}
          activities={activities}
          trends={trends}
          hideRanking={false}
          hideChallenges={activeView === "challenges"}
        />
      )}
    </div>
  );
}
