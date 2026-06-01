export const queryKeys = {
  feed: (filter: string) => ["feed", filter] as const,
  ranking: ["ranking"] as const,
  challenges: ["challenges"] as const,
  profile: ["profile"] as const,
  publicProfile: (userId: string) => ["public-profile", userId] as const,
  privacy: ["privacy"] as const,
  notifications: ["notifications"] as const,
  discovery: ["discovery"] as const,
  activities: ["activities"] as const,
  stories: ["stories"] as const,
  following: ["following"] as const,
  follow: (userId: string) => ["follow", userId] as const,
  pendingWinShare: ["pending-win-share"] as const
} as const;
