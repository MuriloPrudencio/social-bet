import type { SuggestedUser } from "@/types/betsocial";

export const followingIds = new Set(["u2", "u4", "u5"]);

export const suggestedUsersMock: SuggestedUser[] = [
  {
    id: "u2",
    name: "Altair Tips",
    handle: "@altairtips",
    avatar: "/avatars/altair.svg",
    verified: true,
    level: 31,
    badge: "Top Winner",
    role: "influencer",
    followers: 48200,
    isFollowing: true
  },
  {
    id: "u4",
    name: "BraboBets",
    handle: "@brabobets",
    avatar: "/avatars/brabo.svg",
    verified: true,
    level: 29,
    badge: "Elite",
    role: "player",
    followers: 31800,
    isFollowing: true
  },
  {
    id: "u5",
    name: "LadyGreen",
    handle: "@ladygreen",
    avatar: "/avatars/ladygreen.svg",
    verified: true,
    level: 22,
    badge: "Green Queen",
    role: "friend",
    followers: 22100,
    isFollowing: true
  },
  {
    id: "u3",
    name: "JoaoVitor",
    handle: "@joaov",
    avatar: "/avatars/joao.svg",
    verified: false,
    level: 18,
    badge: "Rising Star",
    role: "player",
    followers: 9400,
    isFollowing: false
  },
  {
    id: "u6",
    name: "PlayWise",
    handle: "@playwise",
    avatar: "/avatars/playwise.svg",
    verified: true,
    level: 27,
    badge: "Affiliate Pro",
    role: "affiliate",
    followers: 15600,
    isFollowing: false
  }
];
