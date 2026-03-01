import type {
  CampaignConfig,
  WeekSchedule,
  WeekInfo,
  WinnerEntry,
  PastCampaignWinner,
  Milestone,
  FAQItem,
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
}

// ─── Week Schedule ───────────────────────────────────────────────
export const weekSchedule: WeekSchedule[] = [
  { week: 1, label: 'Week 1', startDate: '23 Feb', endDate: '1 Mar', startISO: '2026-02-23T00:00:00+05:30', endISO: '2026-03-01T23:59:59+05:30' },
  { week: 2, label: 'Week 2', startDate: '2 Mar', endDate: '8 Mar', startISO: '2026-03-02T00:00:00+05:30', endISO: '2026-03-08T23:59:59+05:30' },
  { week: 3, label: 'Week 3', startDate: '9 Mar', endDate: '15 Mar', startISO: '2026-03-09T00:00:00+05:30', endISO: '2026-03-15T23:59:59+05:30' },
  { week: 4, label: 'Week 4', startDate: '16 Mar', endDate: '22 Mar', startISO: '2026-03-16T00:00:00+05:30', endISO: '2026-03-22T23:59:59+05:30' },
]

// ─── Auto-compute current week from dates ────────────────────────
export function getCurrentWeekInfo(): WeekInfo {
  const now = new Date()

  const active = weekSchedule.find(w => {
    return now >= new Date(w.startISO) && now <= new Date(w.endISO)
  })

  const activeSchedule = weekSchedule.map(w => ({
    ...w,
    isActive: active ? w.week === active.week : false,
    isCompleted: active ? w.week < active.week : true,
  }))

  if (active) {
    return {
      currentWeek: active.week,
      weekEndDate: active.endISO,
      weekStartISO: active.startISO,
      weekEndISO: active.endISO,
      activeSchedule,
    }
  }

  // Campaign ended or between weeks — fall back to last week
  const lastWeek = weekSchedule[weekSchedule.length - 1]
  return {
    currentWeek: lastWeek.week,
    weekEndDate: lastWeek.endISO,
    weekStartISO: lastWeek.startISO,
    weekEndISO: lastWeek.endISO,
    activeSchedule,
  }
}

// ─── Winners (empty for Week 1) ─────────────────────────────────
export const winners: WinnerEntry[] = []

// ─── Past Campaign Winners ──────────────────────────────────────
export const pastCampaignWinners: PastCampaignWinner[] = [
  { campaignName: 'Referral Raja', period: 'Jan 2026', name: 'Deepak', city: 'Bangalore', referrals: 38, prize: 40000, image: '/winners/deepak.jpeg' },
  { campaignName: 'Referral Raja', period: 'Jan 2026', name: 'Dhanush', city: 'Bangalore', referrals: 22, prize: 40000, image: '/winners/dhanush.jpeg' },
  { campaignName: 'Referral Raja', period: 'Jan 2026', name: 'Saurabb', city: 'NCR', referrals: 23, prize: 40000, image: '/winners/saurabb.jpeg' },
  { campaignName: 'Referral Raja', period: 'Jan 2026', name: 'Shivaraj', city: 'Bangalore', referrals: 32, prize: 20000, image: '/winners/shivaraj.jpeg' },
]

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
  { step: 3, icon: '🎁', title: 'You Earn Rewards', description: '1 Day + 100KM Free' },
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
    answer: 'Absolutely! You still earn 1 Day + 100 KM Free for every successful referral. Contest prizes are additional to these rewards.',
  },
]
