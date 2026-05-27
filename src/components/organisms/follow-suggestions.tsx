"use client";

import { Avatar } from "@/components/atoms/avatar";
import { Surface } from "@/components/atoms/surface";
import { FollowButton } from "@/components/molecules/follow-button";
import { SectionHeading } from "@/components/molecules/section-heading";
import { useFollowing } from "@/hooks/use-follow";
import { compact } from "@/lib/utils";

const roleLabels = {
  player: "Jogador",
  affiliate: "Afiliado",
  influencer: "Influencer",
  friend: "Amigo"
} as const;

export function FollowSuggestions() {
  const { data: users = [] } = useFollowing(true);

  return (
    <Surface className="premium-card p-5">
      <SectionHeading title="Seguir na Bet" subtitle="Acompanhe conquistas — sem chat ou DMs" />
      <div className="space-y-3">
        {users.map((user) => (
          <div key={user.id} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <Avatar label={user.avatar} verified={user.verified} size="md" />
            <div className="min-w-0 flex-1">
              <p className="font-bold">{user.name}</p>
              <p className="text-xs text-zinc-500">
                {roleLabels[user.role]} · {compact(user.followers)} seguidores
              </p>
            </div>
            <FollowButton userId={user.id} isFollowing={user.isFollowing} compact />
          </div>
        ))}
      </div>
    </Surface>
  );
}
