"use client";

import { NotificationsPanel } from "@/components/organisms/notifications-panel";
import { useNotificationActions, useNotifications } from "@/hooks/use-notifications";

export function NotificationsView() {
  const notifications = useNotifications(true);
  const actions = useNotificationActions();
  return (
    <NotificationsPanel
      notifications={notifications.data}
      onNotificationClick={(id) => actions.markRead.mutate(id)}
      onMarkAllRead={() => actions.markAllRead.mutate()}
    />
  );
}
