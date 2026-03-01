'use client'

import { useEffect, useRef, useState } from 'react'
import { campaign, milestones, pastCampaignWinners, getCurrentWeekInfo } from '@/data/campaign-data'
import { currentUser } from '@/data/mock-data'
import { useLanguage } from '@/contexts/LanguageContext'
import { openReferralLink } from '@/lib/deeplink'
import { useLeaderboard } from '@/hooks/useLeaderboard'
import AnimatedCounter from '../AnimatedCounter'
import type { TranslationKey } from '@/data/translations'

export default function PrizesSectionV2() {
  return (
    <div className="space-y-3">
      <YourEarningsCard />
      <MilestoneJourney />
      <WeeklyPrizeCard />
      <MonthlyMegaCard />
      <InlineCTA />
    </div>
  )
}

/* ── 5A. Your Earnings Card ─────────────────────────────────────── */
function YourEarningsCard() {
  const { t } = useLanguage()
  const user = currentUser

  return (
    <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] px-4 pt-4 pb-4">
      <p className="text-[9px] font-bold text-[#43A047] tracking-wider uppercase mb-3">
        {t('prizes.yourEarnings')}
      </p>

      {/* Earnings amount — the anchor */}
      <div
        className="text-center mb-1"
        style={{
          background: 'linear-gradient(135deg, #FFB300 0%, #FFD54F 35%, #FFB300 65%, #FF8F00 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        <AnimatedCounter
          target={user.totalEarned}
          duration={1800}
          prefix="₹"
          className="text-[36px] font-black"
        />
      </div>
      <p className="text-[11px] text-gray-500 text-center mb-3">
        {t('prizes.earnedFrom', { count: user.thisWeekReferrals })}
      </p>

      {/* +₹300 pill with shimmer */}
      <div className="flex justify-center mb-4">
        <div
          className="relative overflow-hidden inline-flex items-center px-4 py-1.5 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #FFF8E1 0%, #FFF3E0 100%)',
            border: '1px solid rgba(255,179,0,0.3)',
          }}
        >
          <span className="text-[13px] font-black text-[#FF8F00]">
            {t('prizes.nextReferral')}
          </span>
          {/* Shimmer sweep */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,179,0,0.15) 45%, rgba(255,179,0,0.25) 50%, transparent 55%)',
              animation: 'shine 3s infinite',
            }}
          />
        </div>
      </div>

      {/* CTA */}
      <a
        href="https://bouncedaily.link/refer"
        onClick={(e) => { e.preventDefault(); openReferralLink() }}
        className="block w-full py-3 rounded-xl font-bold text-[14px] text-white tracking-wide transition-all duration-200 active:scale-[0.98] text-center"
        style={{
          background: 'linear-gradient(135deg, #E53935 0%, #C62828 100%)',
          boxShadow: '0 4px 16px rgba(229, 57, 53, 0.3)',
        }}
      >
        {t('prizes.shareEarn')}
      </a>

      <p className="text-[9px] text-gray-400 text-center mt-2.5">
        {t('prizes.earnedFootnote')}
      </p>
    </div>
  )
}

/* ── 5B. Milestone Journey Track ────────────────────────────────── */
function MilestoneJourney() {
  const { t } = useLanguage()
  const user = currentUser
  const scrollRef = useRef<HTMLDivElement>(null)

  // Find the "next" milestone index (first one user hasn't reached)
  const nextIndex = milestones.findIndex((m) => m.refs > user.thisWeekReferrals)
  const nextMilestoneIdx = nextIndex === -1 ? milestones.length : nextIndex

  // Auto-scroll to show the next milestone centered
  useEffect(() => {
    if (scrollRef.current && nextMilestoneIdx < milestones.length) {
      const nodeWidth = 80 // approximate width of each node + gap
      const scrollTarget = Math.max(0, nextMilestoneIdx * nodeWidth - 120)
      scrollRef.current.scrollTo({ left: scrollTarget, behavior: 'smooth' })
    }
  }, [nextMilestoneIdx])

  return (
    <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] px-4 pt-4 pb-4">
      <p className="text-[9px] font-bold text-[#FFB300] tracking-wider uppercase mb-3">
        {t('prizes.yourJourney')}
      </p>

      <div
        ref={scrollRef}
        className="flex items-start gap-0 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2"
      >
        {milestones.map((milestone, i) => {
          const isCompleted = user.thisWeekReferrals >= milestone.refs
          const isNext = i === nextMilestoneIdx
          const isLocked = !isCompleted && !isNext
          const remaining = milestone.refs - user.thisWeekReferrals

          return (
            <div key={milestone.refs} className="flex items-start shrink-0">
              {/* Node */}
              <div className="flex flex-col items-center w-[72px]">
                {/* Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-black transition-all ${
                    isCompleted
                      ? 'bg-[#43A047] text-white'
                      : isNext
                      ? 'text-[#FFB300]'
                      : 'bg-gray-100 text-gray-300'
                  }`}
                  style={
                    isNext
                      ? {
                          background: 'linear-gradient(135deg, #FFF8E1, #FFF3E0)',
                          boxShadow: '0 0 0 3px rgba(255,179,0,0.4), 0 0 12px rgba(255,179,0,0.2)',
                          animation: 'pulse-subtle 2s infinite',
                        }
                      : undefined
                  }
                >
                  {isCompleted ? '✓' : milestone.refs}
                </div>

                {/* "X more!" badge for next milestone */}
                {isNext && remaining > 0 && (
                  <span className="mt-1 text-[8px] font-bold text-[#FF8F00] bg-[#FFF8E1] px-1.5 py-0.5 rounded-full">
                    {t('prizes.moreToGo', { count: remaining })}
                  </span>
                )}

                {/* Label */}
                <p
                  className={`mt-1.5 text-[9px] font-bold text-center leading-tight ${
                    isCompleted ? 'text-[#43A047]' : isNext ? 'text-[#FF8F00]' : 'text-gray-300'
                  }`}
                >
                  {t(milestone.labelKey as TranslationKey)}
                </p>
                <p
                  className={`text-[8px] text-center ${
                    isCompleted ? 'text-[#43A047]/60' : isNext ? 'text-[#FF8F00]/60' : 'text-gray-200'
                  }`}
                >
                  {t(milestone.rewardKey as TranslationKey)}
                </p>
              </div>

              {/* Connector line */}
              {i < milestones.length - 1 && (
                <div className="flex items-center mt-5 -mx-1">
                  <div
                    className={`w-4 h-[2px] ${
                      isCompleted ? 'bg-[#43A047]' : 'bg-gray-200'
                    }`}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── 5C. Weekly Prize Card ──────────────────────────────────────── */
function WeeklyPrizeCard() {
  const { t } = useLanguage()
  const { data: liveData } = useLeaderboard()
  const user = currentUser
  const { activeSchedule, weekEndDate } = getCurrentWeekInfo()
  const activeWeek = activeSchedule.find((w) => w.isActive)
  const threshold = campaign.weeklyLuckyDrawThreshold
  const remaining = Math.max(0, threshold - user.luckyDrawProgress)
  const progress = Math.min(user.luckyDrawProgress / threshold, 1)
  const isEligible = remaining <= 0

  // Derive stats from live data
  const leaderRefs = liveData.length > 0 ? liveData[0].referrals : 18
  const qualifiedCount = liveData.filter((e) => e.referrals >= threshold).length || 47

  // Weekly countdown
  const [timeLeft, setTimeLeft] = useState('')
  useEffect(() => {
    const calc = () => {
      const diff = new Date(weekEndDate).getTime() - Date.now()
      if (diff <= 0) return 'Ended'
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      return `${d}d ${h}h`
    }
    setTimeLeft(calc())
    const interval = setInterval(() => setTimeLeft(calc()), 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] px-4 pt-4 pb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-bold text-[#E53935] tracking-wider uppercase">
            {t('prizes.thisWeekPrizes')}
          </span>
          {activeWeek && (
            <span className="px-1.5 rounded text-[7px] font-bold bg-[#E53935] text-white">
              {t('prizes.live')}
            </span>
          )}
        </div>
        <span className="text-[11px] font-bold text-[#E53935] tabular-nums">
          {timeLeft}
        </span>
      </div>

      {/* Top referrer prize */}
      <div className="space-y-3">
        <div>
          <div className="flex items-start gap-2.5">
            <span className="text-[16px] shrink-0">🥇</span>
            <div className="min-w-0">
              <p className="text-[15px] font-black text-gray-900 leading-tight">
                ₹{campaign.weeklyTopPrize.toLocaleString('en-IN')}
              </p>
              <p className="text-[10px] text-gray-500 mt-0.5">{t('prizes.highestReferrals')}</p>
            </div>
          </div>
          <p className="text-[9px] font-semibold text-gray-400 ml-[30px] mt-1">
            {t('prizes.currentLeader', { count: leaderRefs })}
          </p>
        </div>

        {/* Lucky draw prize with inline progress */}
        <div>
          <div className="flex items-start gap-2.5">
            <span className="text-[16px] shrink-0">🎲</span>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-black text-gray-900 leading-tight">
                ₹{campaign.weeklyLuckyDrawPrize.toLocaleString('en-IN')}
              </p>
              <p className="text-[10px] text-gray-500 mt-0.5">
                {t('prizes.luckyDraw', { threshold })}
              </p>
              {/* Inline progress bar */}
              <div className="mt-2">
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${progress * 100}%`,
                      background: isEligible
                        ? '#43A047'
                        : 'linear-gradient(90deg, #E53935, #FF5252)',
                    }}
                  />
                </div>
                <p className="text-[9px] font-semibold mt-1">
                  {isEligible ? (
                    <span className="text-[#43A047]">{t('status.eligible')}</span>
                  ) : (
                    <span className="text-gray-400">{t('prizes.moreToQualify', { count: remaining })}</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social proof */}
      <div className="mt-3 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#43A047] animate-pulse-subtle" />
        <p className="text-[10px] font-semibold text-gray-400">
          {t('prizes.qualifiedCount', { count: qualifiedCount })}
        </p>
      </div>
    </div>
  )
}

/* ── 5D. Monthly Mega Prize ─────────────────────────────────────── */
function MonthlyMegaCard() {
  const { t } = useLanguage()
  const user = currentUser
  const monthlyThreshold = campaign.monthlyLuckyDrawThreshold
  const monthlyProgress = Math.min(user.thisMonthReferrals / monthlyThreshold, 1)
  const pastWinner = pastCampaignWinners[0] // Deepak

  return (
    <div
      className="rounded-2xl overflow-hidden border border-[#FFB300]/30 relative"
      style={{
        background: 'linear-gradient(180deg, #FFF8E1 0%, #FFF3E0 100%)',
      }}
    >
      <div className="px-4 pt-4 pb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[18px]">👑</span>
          <span className="text-[9px] font-bold text-[#FF8F00] tracking-wider uppercase">
            {t('prizes.monthlyMega')}
          </span>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-start gap-2.5">
            <span className="text-[16px] shrink-0">🏆</span>
            <div className="min-w-0">
              <p className="text-[15px] font-black text-[#FF8F00] leading-tight">
                ₹{campaign.monthlyTopPrize.toLocaleString('en-IN')}
              </p>
              <p className="text-[10px] text-gray-500 mt-0.5">{t('prizes.campaignRaja')}</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="text-[16px] shrink-0">🎲</span>
            <div className="min-w-0">
              <p className="text-[15px] font-black text-[#FF8F00] leading-tight">
                ₹{campaign.monthlyLuckyDrawPrize.toLocaleString('en-IN')} × {campaign.monthlyLuckyDrawWinners}
              </p>
              <p className="text-[10px] text-gray-500 mt-0.5">
                {t('prizes.monthlyLucky', { threshold: monthlyThreshold })}
              </p>
            </div>
          </div>
        </div>

        {/* Past winner spotlight */}
        {pastWinner && (
          <div className="mt-3 bg-white/60 rounded-xl px-3 py-2">
            <p className="text-[10px] font-bold text-[#FF8F00]">
              {t('prizes.lastRaja', { name: pastWinner.name, city: pastWinner.city })}
            </p>
            <p className="text-[9px] text-gray-500 mt-0.5">
              {t('prizes.lastRajaStats', { refs: pastWinner.referrals, prize: pastWinner.prize.toLocaleString('en-IN') })}
            </p>
          </div>
        )}

        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[8px] font-bold text-[#FF8F00]/60 uppercase">Progress</span>
            <span className="text-[9px] font-bold text-[#FF8F00] tabular-nums">
              {user.thisMonthReferrals}/{monthlyThreshold}
            </span>
          </div>
          <div className="h-1.5 bg-white/60 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${monthlyProgress * 100}%`,
                background: 'linear-gradient(90deg, #FFB300, #FF8F00)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── 5E. Bottom Inline CTA ──────────────────────────────────────── */
function InlineCTA() {
  const { t } = useLanguage()
  const user = currentUser
  const threshold = campaign.weeklyLuckyDrawThreshold
  const remaining = Math.max(0, threshold - user.luckyDrawProgress)

  return (
    <div
      className="rounded-2xl px-4 py-4"
      style={{
        background: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)',
      }}
    >
      <p className="text-[12px] font-bold text-[#F57F17] text-center mb-3">
        ⚡ {remaining > 0
          ? t('prizes.nudgeMessage', { count: remaining })
          : t('status.eligible')
        }
      </p>
      <a
        href="https://bouncedaily.link/refer"
        onClick={(e) => { e.preventDefault(); openReferralLink() }}
        className="block w-full py-3 rounded-xl font-bold text-[14px] text-white tracking-wide transition-all duration-200 active:scale-[0.98] text-center"
        style={{
          background: 'linear-gradient(135deg, #E53935 0%, #C62828 100%)',
          boxShadow: '0 4px 16px rgba(229, 57, 53, 0.3)',
        }}
      >
        {t('prizes.nudgeCta')}
      </a>
      <p className="text-[9px] text-[#F57F17]/60 text-center mt-2">
        {t('prizes.allRewardsStack')}
      </p>
    </div>
  )
}
