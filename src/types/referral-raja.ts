export type Tier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'

export type SectionId = 'leaderboard' | 'prizes' | 'winners' | 'rules'

export interface UserProfile {
  name: string
  city: 'BLR' | 'NCR'
  tier: Tier
  streakWeeks: number
  weeklyRank: number
  monthlyRank: number
  thisWeekReferrals: number
  thisMonthReferrals: number
  totalEarned: number
  luckyDrawProgress: number
  gapToNext: number
  nextRankPosition: number
}

export interface LeaderboardEntry {
  rank: number
  name: string
  city?: string
  referrals: number
  isCurrentUser?: boolean
}

export interface ActivityItem {
  name: string
  city: 'BLR' | 'NCR'
  action: string
  actionKey: string
  timeAgo: string
}

export interface WinnerEntry {
  week: number
  winType: 'top_referrer' | 'lucky_draw'
  name: string
  city: 'BLR' | 'NCR'
  referrals: number
  prize: number
}

export interface PastCampaignWinner {
  campaignName: string
  period: string
  name: string
  city: string
  referrals: number
  prize: number
  image?: string
}

export interface WeekSchedule {
  week: number
  label: string
  startDate: string
  endDate: string
  isActive: boolean
  isCompleted: boolean
}

export interface FAQItem {
  question: string
  answer: string
}

export interface CampaignConfig {
  startDate: string
  endDate: string
  totalPrizePool: number
  weeklyTopPrize: number
  weeklyLuckyDrawPrize: number
  weeklyLuckyDrawThreshold: number
  monthlyTopPrize: number
  monthlyLuckyDrawPrize: number
  monthlyLuckyDrawWinners: number
  monthlyLuckyDrawThreshold: number
  currentWeek: number
  weekEndDate: string
}

export const TIER_CONFIG: Record<Tier, { label: string; color: string; bg: string }> = {
  bronze: { label: 'Bronze', color: '#CD7F32', bg: '#FFF3E0' },
  silver: { label: 'Silver', color: '#9E9E9E', bg: '#F5F5F5' },
  gold: { label: 'Gold', color: '#FFB300', bg: '#FFF8E1' },
  platinum: { label: 'Platinum', color: '#7B68EE', bg: '#F3E5F5' },
  diamond: { label: 'Diamond', color: '#00BCD4', bg: '#E0F7FA' },
}
