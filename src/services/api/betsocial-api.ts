import { apiDelete, apiGet, apiPatch, apiPost } from "@/services/api/client";
import type {
  Activity,
  Challenge,
  CreatePostPayload,
  CreateStoryPayload,
  FeedFilter,
  FeedPost,
  FollowState,
  FollowSource,
  NotificationItem,
  PendingWinShare,
  PrivacySettings,
  Profile,
  RankingUser,
  ReactionKey,
  Story,
  DiscoveryPayload,
  SuggestedUser
} from "@/types/betsocial";

export const betSocialApi = {
  feed: (filter: FeedFilter = "forYou") => apiGet<FeedPost[]>(`/feed?filter=${filter}`),
  ranking: () => apiGet<RankingUser[]>("/ranking"),
  challenges: () => apiGet<Challenge[]>("/challenges"),
  profile: () => apiGet<Profile>("/profile"),
  privacy: () => apiGet<PrivacySettings>("/profile/privacy"),
  updatePrivacy: (body: Partial<PrivacySettings>) => apiPatch<PrivacySettings, Partial<PrivacySettings>>("/profile/privacy", body),
  notifications: () => apiGet<NotificationItem[]>("/notifications"),
  markNotificationRead: (notificationId: string) => apiPatch<NotificationItem[], Record<string, never>>(`/notifications/${notificationId}/read`, {}),
  markAllNotificationsRead: () => apiPatch<NotificationItem[], Record<string, never>>("/notifications/read-all", {}),
  activities: () => apiGet<Activity[]>("/profile/activities"),
  stories: () => apiGet<Story[]>("/stories"),
  following: () => apiGet<SuggestedUser[]>("/following"),
  followState: (userId: string) => apiGet<FollowState>(`/follow/${userId}`),
  follow: (userId: string, source: FollowSource = "suggestion") => apiPost<FollowState, { source: FollowSource }>(`/follow/${userId}`, { source }),
  updateFollow: (userId: string, body: Partial<Pick<FollowState, "notificationsEnabled" | "favorite" | "muted">>) =>
    apiPatch<FollowState, typeof body>(`/follow/${userId}`, body),
  unfollow: (userId: string) => apiDelete<FollowState>(`/follow/${userId}`),
  discovery: () => apiGet<DiscoveryPayload>("/discovery"),
  pendingWinShare: () => apiGet<PendingWinShare | null>("/wins/pending-share"),
  dismissWinShare: () => apiDelete<void>("/wins/pending-share/dismiss"),
  createStory: (body: CreateStoryPayload) => apiPost<Story, CreateStoryPayload>("/stories", body),
  updateStory: (storyId: string, body: Partial<CreateStoryPayload>) => apiPatch<Story, Partial<CreateStoryPayload>>(`/stories/${storyId}`, body),
  deleteStory: (storyId: string) => apiDelete<{ deleted: boolean }>(`/stories/${storyId}`),
  createPost: (body: CreatePostPayload) => apiPost<FeedPost, CreatePostPayload>("/feed", body),
  reactToPost: (postId: string, reaction: ReactionKey) =>
    apiPost<FeedPost, { reaction: ReactionKey }>(`/feed/${postId}/reactions`, { reaction }),
  reactToStory: (storyId: string, reaction: ReactionKey) =>
    apiPost<Story, { reaction: ReactionKey }>(`/stories/${storyId}/reactions`, { reaction })
};
