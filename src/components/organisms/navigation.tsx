"use client";

import { usePathname, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Avatar } from "@/components/atoms/avatar";
import { Button } from "@/components/atoms/button";
import { LivePill } from "@/components/atoms/live-pill";
import { Progress } from "@/components/atoms/progress";
import { Surface } from "@/components/atoms/surface";
import { viewPaths } from "@/data/routes";
import type { NavigationItem } from "@/data/navigation-items";
import { cn, money } from "@/lib/utils";
import { useFeedInteractionStore } from "@/stores/feed-interaction-store";
import type { FeedPost, Profile } from "@/types/betsocial";

type SidebarProps = {
  profile?: Profile;
  unreadCount: number;
  livePost?: FeedPost;
  items: NavigationItem[];
};

export function Sidebar({ profile, unreadCount, livePost, items }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const openPostComposer = useFeedInteractionStore((state) => state.openPostComposer);

  return (
    <aside className="hidden w-[280px] shrink-0 border-r border-white/5 bg-black/25 p-5 xl:block">
      <div className="mb-8 flex items-center gap-3 text-2xl font-black">
        <span className="grid size-9 place-items-center rounded-lg border border-primary/70 text-primary shadow-neon">B</span>
        Bet<span className="text-primary">Social</span>
      </div>
      <p className="mb-4 text-xs leading-relaxed text-zinc-500">Camada social premium integrada à Bet — prova social, status e comunidade viva.</p>
      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const href = viewPaths[item.id];
          const active = pathname === href;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => router.push(href)}
              className={cn(
                "flex h-12 w-full items-center gap-3 rounded-xl px-4 text-sm font-medium text-zinc-300 transition",
                active ? "border border-primary/40 bg-primary/10 text-white shadow-neon" : "hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className={cn("size-5", active && "text-primary")} />
              {item.label}
              {item.id === "notifications" && unreadCount > 0 ? (
                <span className="ml-auto rounded-full bg-violetGlow px-2 py-0.5 text-xs text-white">{unreadCount}</span>
              ) : null}
            </button>
          );
        })}
      </nav>
      <Button className="mt-6 w-full justify-start bg-gradient-to-r from-primary to-violetGlow" onClick={() => openPostComposer()}>
        <Plus className="size-4" />
        Compartilhar conquista
      </Button>
      {livePost ? (
        <Surface className="premium-card mt-6 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-bold">Ao vivo</span>
            <LivePill />
          </div>
          <div className="rounded-xl border border-gold/20 bg-gold/10 p-3">
            <p className="text-sm text-zinc-300">{livePost.game}</p>
            <p className="font-bold text-white">{livePost.title}</p>
            <p className="text-sm font-black text-gold">{livePost.multiplier}x</p>
            <p className="text-sm font-bold text-primary">{money(livePost.amount)}</p>
          </div>
          <Button variant="glass" size="sm" className="mt-3 w-full border-primary/30 text-primary" onClick={() => router.push("/feed")}>
            Ver feed
          </Button>
        </Surface>
      ) : null}
      {profile ? (
        <Surface className="premium-card mt-6 p-4">
          <div className="flex items-center gap-3">
            <Avatar label={profile.avatar} verified={profile.verified} size="md" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold">{profile.name}</p>
              <p className="text-xs text-zinc-400">Nível {profile.level}</p>
              <Progress value={profile.xp} max={profile.nextLevelXP} className="mt-2" />
            </div>
          </div>
        </Surface>
      ) : null}
    </aside>
  );
}

export function MobileNav({ items }: { items: NavigationItem[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const mobileItems = items.filter((item) => item.showInBottomNav);

  return (
    <nav className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-5 rounded-2xl border border-white/10 bg-black/80 p-2 backdrop-blur-xl xl:hidden">
      {mobileItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === viewPaths[item.id];
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => router.push(viewPaths[item.id])}
            className={cn("grid place-items-center gap-1 rounded-xl py-2 text-[11px] text-zinc-400", active && "bg-primary/10 text-primary")}
          >
            <Icon className="size-4" />
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}

export function MobileSectionTabs({ items }: { items: NavigationItem[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const mobileScreens = items.filter((item) => item.showInMobileTabs);

  return (
    <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-black/25 p-2 backdrop-blur xl:hidden">
      {mobileScreens.map((screen) => (
        <button
          key={screen.id}
          type="button"
          onClick={() => router.push(viewPaths[screen.id])}
          className={cn(
            "min-w-0 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-bold text-zinc-300 transition",
            pathname === viewPaths[screen.id] && "border-primary/40 bg-primary/10 text-primary shadow-neon"
          )}
        >
          {screen.label}
        </button>
      ))}
    </div>
  );
}
