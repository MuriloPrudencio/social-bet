"use client";

import type { ReactNode } from "react";
import { MobileNav, Sidebar } from "@/components/organisms/navigation";
import { Topbar } from "@/components/organisms/topbar";
import { navigationItems } from "@/data/navigation-items";
import type { FeedPost, NotificationItem, Profile } from "@/types/betsocial";

type AppShellTemplateProps = {
  children: ReactNode;
  profile?: Profile;
  notifications?: NotificationItem[];
  unreadCount: number;
  livePost?: FeedPost;
};

export function AppShellTemplate({ children, profile, notifications, unreadCount, livePost }: AppShellTemplateProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-betsocial-radial">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
      <div className="relative flex min-h-screen">
        <Sidebar profile={profile} unreadCount={unreadCount} livePost={livePost} items={navigationItems} />
        <div className="min-w-0 flex-1">
          <Topbar profile={profile} notifications={notifications} unread={unreadCount} />
          {children}
        </div>
      </div>
      <MobileNav items={navigationItems} />
    </main>
  );
}
