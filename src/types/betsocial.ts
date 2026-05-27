export type ReactionKey = "fire" | "rocket" | "trophy" | "clap" | "heart";

export type PrivacyLevel = "public" | "followers" | "private";

export type FeedFilter = "forYou" | "following";

export type FollowSource = "feed" | "story" | "profile" | "ranking" | "discover" | "search" | "trending" | "suggestion" | "live_event";

export type RelationshipType =
  | "passive_follow"
  | "active_follow"
  | "high_affinity"
  | "competitive_rival"
  | "creator_influence"
  | "vip_influence";

export type StoryTemplateType =
  | "big_win"
  | "multiplier"
  | "ranking"
  | "badge"
  | "challenge"
  | "lucky_moment"
  | "win_streak";

export type PostTemplateType =
  | "big_win"
  | "mega_win"
  | "multiplier"
  | "badge"
  | "ranking"
  | "mission"
  | "win_streak";

export type FeedPostType = "win" | "ranking" | "badge" | "challenge";

export type FeedSource = "following" | "trending" | "ranking" | "badge" | "event";

export type UserSummary = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  verified: boolean;
  level: number;
  badge: string;
  followers?: number;
  isFollowing?: boolean;
};

export type PrivacySettings = {
  profileVisibility: PrivacyLevel;
  hideAmounts: boolean;
  hideStats: boolean;
  hideMultipliers: boolean;
  hideFollowers?: boolean;
  hideFollowing?: boolean;
  hideActivity?: boolean;
};

export type FollowState = {
  userId: string;
  isFollowing: boolean;
  followersCount: number;
  relationshipType?: RelationshipType;
  affinityScore?: number;
  notificationsEnabled?: boolean;
  favorite?: boolean;
  muted?: boolean;
  source?: FollowSource;
};

export type CreateStoryPayload = {
  templateType: StoryTemplateType;
  game: string;
  amount: number;
  multiplier: number;
  caption?: string;
  sticker?: string;
  accentColor?: string;
};

export type CreatePostPayload = {
  templateType: PostTemplateType;
  game: string;
  amount: number;
  multiplier: number;
  caption?: string;
  sticker?: string;
};

export type PendingWinShare = {
  id: string;
  templateType: PostTemplateType;
  game: string;
  amount: number;
  multiplier: number;
};

export type FeedPost = {
  id: string;
  user: UserSummary;
  type: FeedPostType;
  templateType: PostTemplateType;
  title: string;
  description: string;
  game: string;
  amount: number;
  multiplier: number;
  caption?: string;
  sticker?: string;
  reactions: Record<ReactionKey, number>;
  reactionCount?: number;
  createdAt: string;
  metaLabel: string;
  source: FeedSource;
  isFollowingAuthor?: boolean;
  privacyMasked?: boolean;
};

export type Story = {
  id: string;
  user: UserSummary;
  templateType: StoryTemplateType;
  templateLabel: string;
  game: string;
  amount: number;
  multiplier: number;
  caption?: string;
  sticker?: string;
  accentColor: string;
  image: string;
  reactions: Record<ReactionKey, number>;
  createdAt: string;
  expiresAt: string;
  privacyMasked?: boolean;
};

export type RankingUser = UserSummary & {
  position: number;
  previousPosition: number;
  amount: number;
  multiplier: number;
  xp: number;
  privacyMasked?: boolean;
};

export type Challenge = {
  id: string;
  title: string;
  description: string;
  progress: number;
  goal: number;
  rewardXP: number;
  type: "daily" | "weekly";
  icon: "target" | "crown" | "check" | "trophy";
  expiresIn: string;
};

export type NotificationItem = {
  id: string;
  type: "like" | "ranking" | "challenge" | "badge" | "follow" | "story" | "trending" | "level_up";
  message: string;
  actor: string;
  createdAt: string;
  unread: boolean;
};

export type Profile = UserSummary & {
  balance: number;
  xp: number;
  nextLevelXP: number;
  followers: number;
  following: number;
  posts: number;
  totalWon: number;
  bestMultiplier: number;
  favoriteGame: string;
  badges: string[];
  privacy: PrivacySettings;
};

export type Activity = {
  id: string;
  user: string;
  avatar: string;
  text: string;
  createdAt: string;
};

export type SuggestedUser = UserSummary & {
  role: "player" | "affiliate" | "influencer" | "friend";
  followers: number;
  isFollowing: boolean;
  relationshipType?: RelationshipType;
  affinityScore?: number;
  notificationsEnabled?: boolean;
  favorite?: boolean;
  muted?: boolean;
  source?: FollowSource;
  trendingScore?: number;
  recommendationScore?: number;
  socialScore?: number;
  reason?: string;
};

export type DiscoverySection =
  | "trendingPlayers"
  | "popularStories"
  | "risingPlayers"
  | "topWinners"
  | "suggestedForYou"
  | "mostFollowed"
  | "similarPlayers"
  | "hotStreaks"
  | "liveActivity";

export type DiscoveryPayload = Record<DiscoverySection, SuggestedUser[]>;
