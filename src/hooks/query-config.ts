export const pollIntervals = {
  feed: 9000,
  ranking: 12000,
  notifications: 8000,
  profile: 20000,
  challenges: 14000,
  stories: 10000,
  pendingWin: 5000
} as const;

export const defaultQueryOptions = {
  refetchOnWindowFocus: false,
  retry: 1,
  staleTime: 3000
} as const;
