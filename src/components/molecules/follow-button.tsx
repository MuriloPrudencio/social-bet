"use client";

import { UserPlus, UserCheck } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { useFollow } from "@/hooks/use-follow";
import { cn } from "@/lib/utils";

type FollowButtonProps = {
  userId: string;
  isFollowing?: boolean;
  compact?: boolean;
  className?: string;
};

export function FollowButton({ userId, isFollowing = false, compact, className }: FollowButtonProps) {
  const follow = useFollow(userId);

  return (
    <Button
      variant={isFollowing ? "glass" : "primary"}
      size={compact ? "sm" : "md"}
      className={cn("shrink-0", className)}
      disabled={follow.isPending}
      onClick={() => follow.mutate(isFollowing)}
    >
      {isFollowing ? <UserCheck className="size-4" /> : <UserPlus className="size-4" />}
      {isFollowing ? "Seguindo" : "Seguir"}
    </Button>
  );
}
