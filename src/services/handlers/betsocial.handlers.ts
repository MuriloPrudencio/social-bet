import { http, HttpResponse, delay } from "msw";
import { followingIds, suggestedUsersMock } from "@/services/mocks/follow.mock";
import { challengesMock } from "@/services/mocks/challenges.mock";
import { feedMock } from "@/services/mocks/feed.mock";
import { notificationsMock } from "@/services/mocks/notifications.mock";
import { activitiesMock, profileMock } from "@/services/mocks/profile.mock";
import { privacyMock } from "@/services/mocks/privacy.mock";
import { rankingMock } from "@/services/mocks/ranking.mock";
import { storiesMock } from "@/services/mocks/stories.mock";
import { buildPostContent, buildStoryContent, clampCaption, CAPTION_MAX_POST, CAPTION_MAX_STORY } from "@/lib/templates";
import type {
  CreatePostPayload,
  CreateStoryPayload,
  FeedFilter,
  FeedPost,
  NotificationItem,
  PendingWinShare,
  PrivacySettings,
  RankingUser,
  ReactionKey,
  Story
} from "@/types/betsocial";

let feed = [...feedMock];
let ranking = [...rankingMock];
let notifications = [...notificationsMock];
let stories = [...storiesMock];
let privacy: PrivacySettings = { ...privacyMock };
let pendingWinShare: PendingWinShare | null = null;
let tick = 0;
let notificationTick = 0;
let winShareShown = false;

const liveWins = [
  { name: "NatyWin", game: "Aviator", amount: 3620, multiplier: 72 },
  { name: "MegaMoura", game: "Mega da Virada", amount: 12500, multiplier: 250 },
  { name: "RafaGreen", game: "Fortune Tiger", amount: 7540, multiplier: 95 },
  { name: "PlayWise", game: "Dupla do Dia", amount: 2100, multiplier: 21 }
];

function reactionTotal(reactions: Record<ReactionKey, number>) {
  return Object.values(reactions).reduce((sum, value) => sum + value, 0);
}

function withFollowState<T extends { user: { id: string; isFollowing?: boolean; followers?: number } }>(items: T[]) {
  return items.map((item) => ({
    ...item,
    user: {
      ...item.user,
      isFollowing: followingIds.has(item.user.id),
      followers: suggestedUsersMock.find((u) => u.id === item.user.id)?.followers ?? item.user.followers
    },
    privacyMasked: privacy.hideAmounts || privacy.hideMultipliers
  }));
}

function filterFeed(filter: FeedFilter) {
  const enriched = withFollowState(feed);
  if (filter === "following") {
    return enriched.filter((post) => post.isFollowingAuthor || post.user.id === profileMock.id);
  }
  return enriched.sort((a, b) => (b.reactionCount ?? 0) - (a.reactionCount ?? 0));
}

function evolveFeed() {
  tick += 1;
  if (tick % 2 !== 0) return;

  const win = liveWins[tick % liveWins.length];
  const post: FeedPost = {
    id: `live-${Date.now()}`,
    user: {
      id: `live-user-${tick}`,
      name: win.name,
      handle: `@${win.name.toLowerCase()}`,
      avatar: `/avatars/${tick % 2 === 0 ? "naty" : "playwise"}.svg`,
      verified: true,
      level: 14 + tick,
      badge: "Live Winner",
      followers: 1200 + tick * 40,
      isFollowing: false
    },
    type: "win",
    templateType: win.multiplier >= 100 ? "mega_win" : "big_win",
    title: win.multiplier >= 100 ? "💎 MEGA WIN" : "🏆 BIG WIN",
    description: `${win.name} bateu ${win.multiplier}x no ${win.game} e ganhou R$ ${win.amount.toLocaleString("pt-BR")}`,
    game: win.game,
    amount: win.amount,
    multiplier: win.multiplier,
    reactions: { fire: 90 + tick, rocket: 18 + tick, trophy: 8 + tick, clap: 22 + tick, heart: 40 + tick },
    reactionCount: 180 + tick * 3,
    createdAt: new Date().toISOString(),
    metaLabel: "Ao vivo agora",
    source: "trending",
    isFollowingAuthor: false
  };

  feed = [post, ...feed].slice(0, 12);
}

function createUserStory(input: CreateStoryPayload): Story {
  const built = buildStoryContent(input, profileMock.name);
  const templateLabel = built.templateLabel;
  const story: Story = {
    id: `story-created-${Date.now()}`,
    user: { ...profileMock, isFollowing: false },
    templateType: input.templateType,
    templateLabel,
    game: input.game,
    amount: input.amount,
    multiplier: input.multiplier,
    caption: input.caption ? clampCaption(input.caption, CAPTION_MAX_STORY) : undefined,
    sticker: input.sticker,
    accentColor: input.accentColor ?? "#32f253",
    image: profileMock.avatar,
    reactions: { fire: 0, rocket: 0, trophy: 0, clap: 0, heart: 0 },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  };

  stories = [story, ...stories].slice(0, 10);
  return story;
}

function createUserPost(input: CreatePostPayload): FeedPost {
  const built = buildPostContent(input, profileMock.name);
  const post: FeedPost = {
    id: `post-created-${Date.now()}`,
    user: { ...profileMock, isFollowing: false },
    type: built.type,
    templateType: input.templateType,
    title: built.title,
    description: built.description,
    game: input.game,
    amount: input.amount,
    multiplier: input.multiplier,
    caption: input.caption ? clampCaption(input.caption, CAPTION_MAX_POST) : undefined,
    sticker: input.sticker,
    reactions: { fire: 0, rocket: 0, trophy: 0, clap: 0, heart: 0 },
    reactionCount: 0,
    createdAt: new Date().toISOString(),
    metaLabel: built.metaLabel,
    source: "trending",
    isFollowingAuthor: false
  };

  feed = [post, ...feed].slice(0, 12);
  profileMock.posts += 1;
  return post;
}

function addReaction<T extends { id: string; reactions: Record<ReactionKey, number>; reactionCount?: number }>(
  items: T[],
  id: string,
  reaction: ReactionKey
) {
  return items.map((item) => {
    if (item.id !== id) return item;
    const reactions = { ...item.reactions, [reaction]: item.reactions[reaction] + 1 };
    return { ...item, reactions, reactionCount: reactionTotal(reactions) };
  });
}

function evolveRanking() {
  ranking = ranking
    .map((user, index): RankingUser => ({
      ...user,
      previousPosition: user.position,
      amount: user.amount + Math.round(Math.random() * 1800),
      xp: user.xp + Math.round(Math.random() * 350),
      position: index + 1,
      privacyMasked: privacy.hideAmounts || privacy.hideStats
    }))
    .sort((a, b) => b.amount - a.amount)
    .map((user, index) => ({ ...user, position: index + 1 }));
}

function evolveNotifications() {
  notificationTick += 1;
  const next: NotificationItem = {
    id: `notification-${Date.now()}-${notificationTick}`,
    type: notificationTick % 4 === 0 ? "follow" : notificationTick % 3 === 0 ? "ranking" : "like",
    actor: notificationTick % 4 === 0 ? "Altair Tips" : liveWins[notificationTick % liveWins.length].name,
    message:
      notificationTick % 4 === 0
        ? "começou a seguir suas conquistas"
        : notificationTick % 3 === 0
          ? "Ranking semanal atualizado com novas posições"
          : "reagiu à sua conquista em destaque",
    createdAt: "agora",
    unread: true
  };

  notifications = [next, ...notifications].slice(0, 10);
}

function maybeTriggerWinShare() {
  if (winShareShown) return;
  tick += 1;
  if (tick === 3) {
    pendingWinShare = {
      id: "pending-win-1",
      templateType: "big_win",
      game: "Fortune Tiger",
      amount: 4200,
      multiplier: 230
    };
  }
}

export const handlers = [
  http.get("/api/feed", async ({ request }) => {
    await delay(450);
    evolveFeed();
    const filter = (new URL(request.url).searchParams.get("filter") ?? "forYou") as FeedFilter;
    return HttpResponse.json(filterFeed(filter));
  }),

  http.post("/api/feed", async ({ request }) => {
    const body = (await request.json()) as CreatePostPayload;
    const post = createUserPost(body);
    return HttpResponse.json(post, { status: 201 });
  }),

  http.post("/api/feed/:postId/reactions", async ({ params, request }) => {
    const { reaction } = (await request.json()) as { reaction: ReactionKey };
    feed = addReaction(feed, String(params.postId), reaction);
    const post = feed.find((item) => item.id === params.postId);
    return post ? HttpResponse.json(post) : new HttpResponse(null, { status: 404 });
  }),

  http.get("/api/ranking", async () => {
    await delay(350);
    evolveRanking();
    maybeTriggerWinShare();
    return HttpResponse.json(ranking.map((u) => ({ ...u, privacyMasked: privacy.hideAmounts || privacy.hideStats })));
  }),

  http.get("/api/challenges", async () => {
    await delay(300);
    return HttpResponse.json(
      challengesMock.map((challenge, index) => ({
        ...challenge,
        progress: Math.min(challenge.goal, challenge.progress + (tick % (index + 2) === 0 ? 1 : 0))
      }))
    );
  }),

  http.get("/api/profile", async () => {
    await delay(250);
    return HttpResponse.json({
      ...profileMock,
      xp: Math.min(profileMock.nextLevelXP, profileMock.xp + tick * 18),
      following: followingIds.size,
      privacy
    });
  }),

  http.get("/api/profile/privacy", async () => {
    await delay(200);
    return HttpResponse.json(privacy);
  }),

  http.patch("/api/profile/privacy", async ({ request }) => {
    const body = (await request.json()) as Partial<PrivacySettings>;
    privacy = { ...privacy, ...body };
    profileMock.privacy = privacy;
    return HttpResponse.json(privacy);
  }),

  http.get("/api/profile/activities", async () => {
    await delay(250);
    return HttpResponse.json(activitiesMock);
  }),

  http.get("/api/notifications", async () => {
    await delay(280);
    evolveNotifications();
    return HttpResponse.json(notifications);
  }),

  http.patch("/api/notifications/:notificationId/read", async ({ params }) => {
    const notificationId = String(params.notificationId);
    notifications = notifications.map((item) => (item.id === notificationId ? { ...item, unread: false } : item));
    return HttpResponse.json(notifications);
  }),

  http.patch("/api/notifications/read-all", async () => {
    notifications = notifications.map((item) => ({ ...item, unread: false }));
    return HttpResponse.json(notifications);
  }),

  http.get("/api/stories", async () => {
    await delay(260);
    return HttpResponse.json(withFollowState(stories));
  }),

  http.post("/api/stories", async ({ request }) => {
    await delay(300);
    const body = (await request.json()) as CreateStoryPayload;
    return HttpResponse.json(createUserStory(body), { status: 201 });
  }),

  http.post("/api/stories/:storyId/reactions", async ({ params, request }) => {
    const { reaction } = (await request.json()) as { reaction: ReactionKey };
    stories = addReaction(stories, String(params.storyId), reaction);
    const story = stories.find((item) => item.id === params.storyId);
    return story ? HttpResponse.json(story) : new HttpResponse(null, { status: 404 });
  }),

  http.patch("/api/stories/:storyId", async ({ params, request }) => {
    const body = (await request.json()) as Partial<CreateStoryPayload>;
    stories = stories.map((story) =>
      story.id === params.storyId
        ? {
            ...story,
            caption: body.caption ?? story.caption,
            sticker: body.sticker ?? story.sticker,
            accentColor: body.accentColor ?? story.accentColor
          }
        : story
    );
    const story = stories.find((item) => item.id === params.storyId);
    return story ? HttpResponse.json(story) : new HttpResponse(null, { status: 404 });
  }),

  http.delete("/api/stories/:storyId", async ({ params }) => {
    stories = stories.filter((story) => story.id !== params.storyId);
    return HttpResponse.json({ deleted: true });
  }),

  http.get("/api/following", async () => {
    await delay(220);
    return HttpResponse.json(suggestedUsersMock.map((u) => ({ ...u, isFollowing: followingIds.has(u.id) })));
  }),

  http.get("/api/follow/:userId", async ({ params }) => {
    const userId = String(params.userId);
    const user = suggestedUsersMock.find((u) => u.id === userId);
    return HttpResponse.json({
      userId,
      isFollowing: followingIds.has(userId),
      followersCount: user?.followers ?? 0
    });
  }),

  http.post("/api/follow/:userId", async ({ params }) => {
    const userId = String(params.userId);
    followingIds.add(userId);
    profileMock.following = followingIds.size;
    const user = suggestedUsersMock.find((u) => u.id === userId);
    if (user) user.isFollowing = true;
    return HttpResponse.json({
      userId,
      isFollowing: true,
      followersCount: (user?.followers ?? 0) + 1
    });
  }),

  http.patch("/api/follow/:userId", async ({ params, request }) => {
    const body = (await request.json()) as { notificationsEnabled?: boolean; favorite?: boolean; muted?: boolean };
    const userId = String(params.userId);
    const user = suggestedUsersMock.find((u) => u.id === userId);
    return HttpResponse.json({
      userId,
      isFollowing: followingIds.has(userId),
      followersCount: user?.followers ?? 0,
      affinityScore: 62,
      relationshipType: body.favorite ? "high_affinity" : "active_follow",
      notificationsEnabled: body.notificationsEnabled ?? true,
      favorite: body.favorite ?? false,
      muted: body.muted ?? false,
      source: "suggestion"
    });
  }),

  http.delete("/api/follow/:userId", async ({ params }) => {
    const userId = String(params.userId);
    followingIds.delete(userId);
    profileMock.following = followingIds.size;
    const user = suggestedUsersMock.find((u) => u.id === userId);
    if (user) user.isFollowing = false;
    return HttpResponse.json({
      userId,
      isFollowing: false,
      followersCount: user?.followers ?? 0
    });
  }),

  http.get("/api/wins/pending-share", async () => {
    await delay(180);
    return HttpResponse.json(pendingWinShare);
  }),

  http.delete("/api/wins/pending-share/dismiss", async () => {
    pendingWinShare = null;
    winShareShown = true;
    return new HttpResponse(null, { status: 204 });
  }),

  http.get("/api/discovery", async () => {
    await delay(260);
    const decorate = (scoreOffset = 0) =>
      suggestedUsersMock.map((user, index) => ({
        ...user,
        isFollowing: followingIds.has(user.id),
        affinityScore: 40 + index * 7 + scoreOffset,
        relationshipType: user.role === "influencer" ? "creator_influence" : index < 2 ? "competitive_rival" : "active_follow",
        trendingScore: 92 - index * 8 + scoreOffset,
        recommendationScore: 86 - index * 6 + scoreOffset,
        socialScore: 78 - index * 5 + scoreOffset,
        reason: index < 2 ? "Top player em alta" : "Mesmo ritmo de jogos"
      }));
    const users = decorate();
    return HttpResponse.json({
      trendingPlayers: users.slice(0, 6),
      popularStories: decorate(3).slice(0, 6),
      risingPlayers: decorate(5).slice(1, 7),
      topWinners: users.slice(0, 5),
      suggestedForYou: decorate(8).slice(0, 8),
      mostFollowed: users.slice().reverse().slice(0, 6),
      similarPlayers: decorate(2).slice(2, 8),
      hotStreaks: decorate(6).slice(0, 6),
      liveActivity: decorate(4).slice(0, 5)
    });
  })
];
