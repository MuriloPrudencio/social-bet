import { Bell, Flame, Trophy, UserPlus, Zap } from "lucide-react";
import { Surface } from "@/components/atoms/surface";
import type { NotificationItem } from "@/types/betsocial";

const icons = { like: Flame, ranking: Trophy, challenge: Zap, badge: Bell, follow: UserPlus, story: Bell, trending: Flame, level_up: Trophy };

export function NotificationsPanel({
  notifications = [],
  onNotificationClick,
  onMarkAllRead
}: {
  notifications?: NotificationItem[];
  onNotificationClick?: (notificationId: string) => void;
  onMarkAllRead?: () => void;
}) {
  return (
    <Surface className="p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-white">Notificacoes</h2>
          <p className="text-xs text-zinc-400">Atualizacao em tempo real</p>
        </div>
        <button type="button" onClick={onMarkAllRead} className="text-xs font-bold text-primary hover:underline">
          Marcar lidas
        </button>
      </div>
      <div className="space-y-3">
        {notifications.map((notification) => {
          const Icon = icons[notification.type];
          return (
            <button
              key={notification.id}
              type="button"
              onClick={() => onNotificationClick?.(notification.id)}
              className="flex w-full gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-3 text-left transition hover:border-primary/30 hover:bg-primary/5"
            >
              <div className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm"><strong>{notification.actor}</strong> {notification.message}</p>
                <p className="text-xs text-zinc-500">{notification.createdAt}</p>
              </div>
              {notification.unread ? <span className="mt-2 size-2 rounded-full bg-red-500" /> : null}
            </button>
          );
        })}
        {!notifications.length ? (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-400">
            Nenhum alerta novo agora.
          </div>
        ) : null}
      </div>
    </Surface>
  );
}
