import { useState } from "react";
import { Bell, ChevronDown, Search, Wallet } from "lucide-react";
import { Avatar } from "@/components/atoms/avatar";
import { Button } from "@/components/atoms/button";
import { LivePill } from "@/components/atoms/live-pill";
import { Progress } from "@/components/atoms/progress";
import { Surface } from "@/components/atoms/surface";
import { NotificationsPanel } from "@/components/organisms/notifications-panel";
import { useNotificationActions } from "@/hooks/use-notifications";
import { money } from "@/lib/utils";
import { useRouter } from "next/navigation";
import type { NotificationItem, Profile } from "@/types/betsocial";

export function Topbar({ profile, notifications = [], unread = 0 }: { profile?: Profile; notifications?: NotificationItem[]; unread?: number }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const notificationActions = useNotificationActions();

  return (
    <header className="sticky top-0 z-20 border-b border-white/5 bg-[#020606]/80 px-4 py-3 backdrop-blur-xl lg:px-6">
      <div className="mx-auto flex max-w-[1660px] items-center gap-4">
        <div className="flex items-center gap-2 text-xl font-black xl:hidden">Bet<span className="text-primary">Social</span></div>
        <div className="hidden flex-1 items-center rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-zinc-400 md:flex">
          <Search className="mr-3 size-4" />
          Buscar pessoas, jogos ou conquistas...
        </div>
        <div className="ml-auto flex items-center gap-3">
          <button type="button" onClick={() => router.push("/feed")} title="Ver feed ao vivo">
            <LivePill label="Live" />
          </button>
          <Button className="hidden md:inline-flex" size="sm">Depositar</Button>
          <Surface className="hidden items-center gap-3 px-4 py-2 md:flex">
            <Wallet className="size-5 text-gold" />
            <div>
              <p className="text-sm font-bold">{money(profile?.balance ?? 0)}</p>
              <p className="text-[11px] text-zinc-400">Carteira</p>
            </div>
          </Surface>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="relative grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.035] transition hover:border-primary/40"
              aria-label="Abrir notificacoes"
            >
              <Bell className="size-5" />
              {unread ? <span className="absolute -right-1 -top-1 rounded-full bg-red-500 px-1.5 text-[10px] font-black">{unread}</span> : null}
            </button>
            {open ? (
              <div className="absolute right-0 top-12 z-50 w-[min(360px,calc(100vw-2rem))]">
                <NotificationsPanel
                  notifications={notifications}
                  onNotificationClick={(id) => notificationActions.markRead.mutate(id)}
                  onMarkAllRead={() => notificationActions.markAllRead.mutate()}
                />
              </div>
            ) : null}
          </div>
          {profile ? (
            <Surface className="hidden min-w-[230px] items-center gap-3 px-3 py-2 md:flex">
              <Avatar label={profile.avatar} verified={profile.verified} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{profile.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-zinc-400">Nível {profile.level}</span>
                  <Progress value={profile.xp} max={profile.nextLevelXP} className="h-1 flex-1" />
                </div>
              </div>
              <ChevronDown className="size-4 text-zinc-400" />
            </Surface>
          ) : null}
        </div>
      </div>
    </header>
  );
}
