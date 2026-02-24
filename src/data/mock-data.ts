import type {
  UserProfile,
  LeaderboardEntry,
  ActivityItem,
  WinnerEntry,
  PastCampaignWinner,
  WeekSchedule,
  FAQItem,
  CampaignConfig,
  Milestone,
} from '@/types/referral-raja'

// ─── Campaign Config ─────────────────────────────────────────────
export const campaign: CampaignConfig = {
  startDate: '2026-02-20T00:00:00+05:30',
  endDate: '2026-03-22T23:59:59+05:30',
  totalPrizePool: 50000,
  weeklyTopPrize: 5000,
  weeklyLuckyDrawPrize: 1000,
  weeklyLuckyDrawThreshold: 7,
  monthlyTopPrize: 30000,
  monthlyLuckyDrawPrize: 5000,
  monthlyLuckyDrawWinners: 1,
  monthlyLuckyDrawThreshold: 30,
  currentWeek: 1,
  weekEndDate: '2026-03-01T23:59:59+05:30',
}

// ─── Week Schedule ───────────────────────────────────────────────
export const weekSchedule: WeekSchedule[] = [
  { week: 1, label: 'Week 1', startDate: '23 Feb', endDate: '1 Mar', isActive: true, isCompleted: false },
  { week: 2, label: 'Week 2', startDate: '2 Mar', endDate: '8 Mar', isActive: false, isCompleted: false },
  { week: 3, label: 'Week 3', startDate: '9 Mar', endDate: '15 Mar', isActive: false, isCompleted: false },
  { week: 4, label: 'Week 4', startDate: '16 Mar', endDate: '22 Mar', isActive: false, isCompleted: false },
]

// ─── Current User ────────────────────────────────────────────────
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

// ─── Winners (empty for Week 1) ─────────────────────────────────
export const winners: WinnerEntry[] = []

// Mock winners for when campaign progresses
export const mockWinnersPopulated: WinnerEntry[] = [
  { week: 1, winType: 'top_referrer', name: 'Arjun R.', city: 'BLR', referrals: 23, prize: 5000 },
  { week: 1, winType: 'lucky_draw', name: 'Meera J.', city: 'BLR', referrals: 9, prize: 1000 },
]

// ─── Past Campaign Winners ──────────────────────────────────────
export const pastCampaignWinners: PastCampaignWinner[] = [
  { campaignName: 'Referral Raja', period: 'Jan 2026', name: 'Deepak', city: 'Bangalore', referrals: 38, prize: 40000, image: '/winners/deepak.jpeg' },
  { campaignName: 'Referral Raja', period: 'Jan 2026', name: 'Dhanush', city: 'Bangalore', referrals: 22, prize: 40000, image: '/winners/dhanush.jpeg' },
  { campaignName: 'Referral Raja', period: 'Jan 2026', name: 'Saurabb', city: 'NCR', referrals: 23, prize: 40000, image: '/winners/saurabb.jpeg' },
  { campaignName: 'Referral Raja', period: 'Jan 2026', name: 'Shivaraj', city: 'Bangalore', referrals: 32, prize: 20000, image: '/winners/shivaraj.jpeg' },
]

// ─── Social Proof Counters ───────────────────────────────────────
export const socialProof = {
  totalParticipants: 1247,
  totalEarned: 48500,
  totalReferrals: 892,
}

// ─── Milestones (for V2 Journey Track) ──────────────────────────
export const milestones: Milestone[] = [
  { refs: 1, labelKey: 'milestone.1.label', rewardKey: 'milestone.1.reward' },
  { refs: 3, labelKey: 'milestone.3.label', rewardKey: 'milestone.3.reward' },
  { refs: 5, labelKey: 'milestone.5.label', rewardKey: 'milestone.5.reward' },
  { refs: 7, labelKey: 'milestone.7.label', rewardKey: 'milestone.7.reward' },
  { refs: 10, labelKey: 'milestone.10.label', rewardKey: 'milestone.10.reward' },
  { refs: 15, labelKey: 'milestone.15.label', rewardKey: 'milestone.15.reward' },
  { refs: 20, labelKey: 'milestone.20.label', rewardKey: 'milestone.20.reward' },
  { refs: 30, labelKey: 'milestone.30.label', rewardKey: 'milestone.30.reward' },
]

// ─── Campaign Rules ──────────────────────────────────────────────
export const campaignRules: string[] = [
  'Campaign period: 20 Feb to 22 March 2026',
  'Successful referral = referee takes first active rental',
  'Weekly top referrer wins ₹5,000',
  'Weekly lucky draw (1 winner, ₹1,000) — min 7 referrals to qualify',
  'Monthly top referrer wins ₹30,000',
  'Monthly lucky draw (2 winners, ₹5,000 each) — min 30 referrals',
  'Only verified referrals through the Bounce app count',
  'Winners announced within 3 days of each period ending',
  'Prizes credited to Bounce wallet or bank account',
  'Bounce reserves the right to disqualify fraudulent entries',
]

// ─── How It Works Steps ──────────────────────────────────────────
export const howItWorks = [
  { step: 1, icon: '📱', title: 'Refer a Friend', description: 'Share from Bounce app' },
  { step: 2, icon: '✅', title: 'Friend Signs Up & Rides', description: 'KYC + first rental' },
  { step: 3, icon: '🎁', title: 'You Earn Rewards', description: '₹300 Gold or 1 Day + 100KM' },
  { step: 4, icon: '🏆', title: 'Compete & Win Big', description: 'Weekly ₹5K + Monthly ₹30K' },
]

// ─── FAQ ─────────────────────────────────────────────────────────
export const faqs: FAQItem[] = [
  {
    question: 'What counts as a successful referral?',
    answer: 'Your friend must sign up using your referral link, complete KYC verification, and take their first active rental on Bounce Daily.',
  },
  {
    question: 'How do I track my referral progress?',
    answer: 'This page shows your live stats — weekly referrals, monthly total, rank, and lucky draw eligibility. Data updates within a few minutes of each successful referral.',
  },
  {
    question: 'When do I get my contest prize?',
    answer: 'Winners are announced within 3 days of each week/month ending. Prizes are credited to your Bounce wallet or linked bank account within 5 business days.',
  },
  {
    question: 'Can riders from both BLR and NCR participate?',
    answer: 'Yes! Riders from both Bangalore and NCR compete on the same leaderboard. City tags are shown for fun, but rankings are combined.',
  },
  {
    question: 'What if there\'s a tie?',
    answer: 'If two riders have the same referral count, the one who reached that count first wins. Timestamps are tracked automatically.',
  },
  {
    question: 'Do per-referral rewards still apply during the contest?',
    answer: 'Absolutely! You still earn ₹300 Free Gold (or 1 Day + 100 KM Free) for every successful referral. Contest prizes are on top of these rewards.',
  },
]
