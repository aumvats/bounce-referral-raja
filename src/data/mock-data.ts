import type {
  UserProfile,
  LeaderboardEntry,
  ActivityItem,
  WinnerEntry,
} from '@/types/referral-raja'

// ─── Current User (placeholder for development) ─────────────────
export const currentUser: UserProfile = {
  name: 'Ravi',
  city: 'BLR',
  tier: 'bronze',
  streakWeeks: 3,
  weeklyRank: 5,
  monthlyRank: 5,
  thisWeekReferrals: 4,
  thisMonthReferrals: 4,
  totalEarned: 1200,
  luckyDrawProgress: 4,
  gapToNext: 3,
  nextRankPosition: 4,
}

// ─── Weekly Leaderboard ──────────────────────────────────────────
export const weeklyLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Arjun R.', city: 'BLR', referrals: 18 },
  { rank: 2, name: 'Priya M.', city: 'NCR', referrals: 15 },
  { rank: 3, name: 'Vikram S.', city: 'BLR', referrals: 13 },
  { rank: 4, name: 'Neha K.', city: 'NCR', referrals: 7 },
  { rank: 5, name: 'Ravi S.', city: 'BLR', referrals: 4, isCurrentUser: true },
  { rank: 6, name: 'Suresh P.', city: 'BLR', referrals: 3 },
  { rank: 7, name: 'Anil T.', city: 'NCR', referrals: 3 },
  { rank: 8, name: 'Deepa R.', city: 'BLR', referrals: 2 },
  { rank: 9, name: 'Karthik N.', city: 'NCR', referrals: 2 },
  { rank: 10, name: 'Meera J.', city: 'BLR', referrals: 2 },
  { rank: 11, name: 'Rajesh D.', city: 'NCR', referrals: 1 },
  { rank: 12, name: 'Pooja S.', city: 'BLR', referrals: 1 },
  { rank: 13, name: 'Amit V.', city: 'NCR', referrals: 1 },
  { rank: 14, name: 'Lakshmi B.', city: 'BLR', referrals: 1 },
  { rank: 15, name: 'Rohit G.', city: 'NCR', referrals: 0 },
]

// ─── Campaign Leaderboard ────────────────────────────────────────
export const campaignLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Arjun R.', city: 'BLR', referrals: 18 },
  { rank: 2, name: 'Priya M.', city: 'NCR', referrals: 15 },
  { rank: 3, name: 'Vikram S.', city: 'BLR', referrals: 13 },
  { rank: 4, name: 'Neha K.', city: 'NCR', referrals: 7 },
  { rank: 5, name: 'Ravi S.', city: 'BLR', referrals: 4, isCurrentUser: true },
  { rank: 6, name: 'Suresh P.', city: 'BLR', referrals: 3 },
  { rank: 7, name: 'Anil T.', city: 'NCR', referrals: 3 },
  { rank: 8, name: 'Deepa R.', city: 'BLR', referrals: 2 },
  { rank: 9, name: 'Karthik N.', city: 'NCR', referrals: 2 },
  { rank: 10, name: 'Meera J.', city: 'BLR', referrals: 2 },
]

// ─── Activity Feed ───────────────────────────────────────────────
export const activityFeed: ActivityItem[] = [
  { name: 'Suresh M.', city: 'BLR', action: 'earned a reward', actionKey: 'activity.earnedReward', timeAgo: '2 min ago' },
  { name: 'Anita K.', city: 'NCR', action: 'referred 2 friends', actionKey: 'activity.referred2', timeAgo: '5 min ago' },
  { name: 'Rajesh P.', city: 'BLR', action: 'hit 10 referrals!', actionKey: 'activity.hit10', timeAgo: '8 min ago' },
  { name: 'Priya D.', city: 'NCR', action: 'earned ₹300', actionKey: 'activity.earned300', timeAgo: '12 min ago' },
  { name: 'Karthik S.', city: 'BLR', action: 'qualified for lucky draw', actionKey: 'activity.qualifiedLuckyDraw', timeAgo: '15 min ago' },
  { name: 'Sneha R.', city: 'NCR', action: 'earned a reward', actionKey: 'activity.earnedReward', timeAgo: '18 min ago' },
  { name: 'Amit G.', city: 'BLR', action: 'reached Silver tier', actionKey: 'activity.reachedSilver', timeAgo: '22 min ago' },
  { name: 'Deepa L.', city: 'BLR', action: 'earned ₹600', actionKey: 'activity.earned600', timeAgo: '25 min ago' },
]

// ─── Mock Winners (placeholder for when campaign progresses) ────
export const mockWinnersPopulated: WinnerEntry[] = [
  { week: 1, winType: 'top_referrer', name: 'Arjun R.', city: 'BLR', referrals: 23, prize: 5000 },
  { week: 1, winType: 'lucky_draw', name: 'Meera J.', city: 'BLR', referrals: 9, prize: 1000 },
]

// ─── Social Proof Counters (placeholder) ─────────────────────────
export const socialProof = {
  totalParticipants: 1247,
  totalEarned: 48500,
  totalReferrals: 892,
}
