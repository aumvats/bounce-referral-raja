'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { campaign } from '@/data/mock-data'
import { useLanguage } from '@/contexts/LanguageContext'
import { useLeaderboard } from '@/hooks/useLeaderboard'
import type { LeaderboardEntry } from '@/types/referral-raja'

type LeaderboardTab = 'weekly' | 'campaign'

function calcWeekTimeLeft(endDate: string) {
  const diff = new Date(endDate).getTime() - Date.now()
  if (diff <= 0) return null
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  return `${d}d ${h}h ${m}m`
}

export default function LeaderboardSection() {
  const [tab, setTab] = useState<LeaderboardTab>('weekly')
  const [weekTimeLeft, setWeekTimeLeft] = useState<string | null>(null)
  const [campaignTimeLeft, setCampaignTimeLeft] = useState<string | null>(null)
  const { t } = useLanguage()
  const { data: liveData, loading } = useLeaderboard()

  // Live data powers both tabs for now (single Metabase query)
  const data = liveData.length > 0 ? liveData : []
  const top3 = data.slice(0, 3)
  const rest = data.slice(3, 5)

  useEffect(() => {
    const update = () => {
      setWeekTimeLeft(calcWeekTimeLeft(campaign.weekEndDate))
      setCampaignTimeLeft(calcWeekTimeLeft(campaign.endDate))
    }
    update()
    const interval = setInterval(update, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        boxShadow: '0 2px 12px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)',
      }}
    >
      {/* ── Header ── */}
      <div className="bg-white px-4 pt-4 pb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-black text-gray-900 tracking-tight">
            {t('leaderboard.title')}
          </h2>

          {/* Compact toggle */}
          <div className="flex items-center bg-gray-100 rounded-full p-0.5">
            <button
              type="button"
              onClick={() => setTab('weekly')}
              className={cn(
                'px-3 py-1 rounded-full text-[10px] font-bold transition-all duration-200',
                tab === 'weekly'
                  ? 'bg-[#E53935] text-white shadow-sm'
                  : 'text-gray-500'
              )}
            >
              {t('leaderboard.weekly')}
            </button>
            <button
              type="button"
              onClick={() => setTab('campaign')}
              className={cn(
                'px-3 py-1 rounded-full text-[10px] font-bold transition-all duration-200',
                tab === 'campaign'
                  ? 'bg-[#E53935] text-white shadow-sm'
                  : 'text-gray-500'
              )}
            >
              {t('leaderboard.overall')}
            </button>
          </div>
        </div>

        {/* Week countdown */}
        {tab === 'weekly' && weekTimeLeft && (
          <p className="text-[9px] font-semibold text-gray-400 mt-1">
            {t('leaderboard.weekEndsIn')}{' '}
            <span className="text-[#E53935] font-bold">{weekTimeLeft}</span>
          </p>
        )}
        {tab === 'campaign' && campaignTimeLeft && (
          <p className="text-[9px] font-semibold text-gray-400 mt-1">
            {t('leaderboard.fullCampaign')}{' '}
            <span className="text-[#E53935] font-bold">{campaignTimeLeft}</span>
          </p>
        )}
      </div>

      {loading ? (
        <div className="px-4 py-12 flex flex-col items-center justify-center gap-2"
          style={{ background: 'linear-gradient(180deg, #1A1A2E 0%, #16213E 100%)' }}
        >
          <div className="w-5 h-5 border-2 border-white/20 border-t-[#FFB300] rounded-full animate-spin" />
          <p className="text-[10px] font-semibold text-white/40">Loading leaderboard…</p>
        </div>
      ) : (
        <>
          {/* ── Podium — dark dramatic section ── */}
          <div
            className="relative px-3 pt-2 pb-4"
            style={{
              background: 'linear-gradient(180deg, #1A1A2E 0%, #16213E 100%)',
            }}
          >
            {/* Subtle radial glow behind #1 */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-0 w-[200px] h-[160px] pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(255,179,0,0.12) 0%, transparent 70%)',
              }}
            />

            <Podium entries={top3} />
          </div>

          {/* ── Ranked table (positions 4 & 5) ── */}
          {rest.length > 0 && (
            <div className="bg-white px-3 pt-2 pb-3">
              {/* Column headers */}
              <div className="flex items-center px-2.5 pb-1.5 border-b border-gray-100">
                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider w-8">{t('leaderboard.rankCol')}</span>
                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider flex-1">{t('leaderboard.nameCol')}</span>
                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider text-right w-12">{t('leaderboard.refsCol')}</span>
              </div>
              {rest.map((entry, i) => (
                <RankRow key={entry.rank} entry={entry} isLast={i === rest.length - 1} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

/* ─── Podium ───────────────────────────────────────────── */

function Podium({ entries }: { entries: LeaderboardEntry[] }) {
  const { t } = useLanguage()
  if (entries.length < 3) return null

  const [first, second, third] = entries

  return (
    <div className="flex items-end justify-center gap-1.5 relative z-10">
      {/* 2nd place */}
      <PodiumSlot
        entry={second}
        rank={2}
        barHeight={64}
        accentColor="#A8B4C4"
        gradientFrom="#5C6B7F"
        gradientTo="#3D4A5C"
        ringColor="rgba(168,180,196,0.5)"
        avatarSize="w-9 h-9"
        nameSize="text-[10px]"
      />

      {/* 1st place — the champion */}
      <div className="flex flex-col items-center flex-1 max-w-[130px] -mt-2">
        {/* Trophy Lottie */}
        <div className="w-12 h-12 -mb-1 relative">
          <DotLottieReact
            src="/lottie/Trophy.lottie"
            loop
            autoplay
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Avatar with gold ring */}
        <div className="relative mb-1">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-[14px] font-black text-white relative z-10"
            style={{
              background: 'linear-gradient(135deg, #FFB300 0%, #FF8F00 100%)',
              boxShadow: '0 0 16px rgba(255,179,0,0.4), 0 0 0 2.5px rgba(255,215,0,0.6)',
            }}
          >
            {first.name.charAt(0)}
          </div>
        </div>

        <p className={cn(
          'text-[11px] font-bold text-white text-center truncate w-full',
          first.isCurrentUser && 'text-[#FF6B6B]'
        )}>
          {first.name}
        </p>
        <p className="text-[18px] font-black text-white leading-tight tabular-nums">
          {first.referrals}
          <span className="text-[9px] font-semibold text-white/40 ml-0.5">{t('leaderboard.refs')}</span>
        </p>

        {/* Gold podium bar */}
        <div
          className="w-full rounded-t-xl flex items-end justify-center pb-2 mt-1.5 relative overflow-hidden"
          style={{
            height: 80,
            background: 'linear-gradient(180deg, #FFD54F 0%, #FFB300 40%, #FF8F00 100%)',
            boxShadow: '0 -4px 20px rgba(255,179,0,0.25)',
          }}
        >
          {/* Shine effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.3) 50%, transparent 55%)',
            }}
          />
          <span className="text-[22px] font-black text-white/90 relative z-10" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.15)' }}>
            #1
          </span>
        </div>
      </div>

      {/* 3rd place */}
      <PodiumSlot
        entry={third}
        rank={3}
        barHeight={48}
        accentColor="#CD9A6B"
        gradientFrom="#B87C4F"
        gradientTo="#8B5E3C"
        ringColor="rgba(205,154,107,0.5)"
        avatarSize="w-9 h-9"
        nameSize="text-[10px]"
      />
    </div>
  )
}

function PodiumSlot({
  entry,
  rank,
  barHeight,
  accentColor,
  gradientFrom,
  gradientTo,
  ringColor,
  avatarSize,
  nameSize,
}: {
  entry: LeaderboardEntry
  rank: number
  barHeight: number
  accentColor: string
  gradientFrom: string
  gradientTo: string
  ringColor: string
  avatarSize: string
  nameSize: string
}) {
  const { t } = useLanguage()
  const medal = rank === 2 ? '🥈' : '🥉'

  return (
    <div className="flex flex-col items-center flex-1 max-w-[100px]">
      <span className="text-[16px] mb-0.5">{medal}</span>
      <div
        className={cn(avatarSize, 'rounded-full flex items-center justify-center text-[12px] font-bold text-white mb-1')}
        style={{
          background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
          boxShadow: `0 0 0 2px ${ringColor}`,
        }}
      >
        {entry.name.charAt(0)}
      </div>
      <p className={cn(
        nameSize, 'font-semibold text-white/80 text-center truncate w-full',
        entry.isCurrentUser && 'text-[#FF6B6B]'
      )}>
        {entry.name}
      </p>
      <p className="text-[13px] font-black text-white/90 leading-tight tabular-nums">
        {entry.referrals}
        <span className="text-[8px] font-semibold text-white/30 ml-0.5">{t('leaderboard.refs')}</span>
      </p>

      <div
        className="w-full rounded-t-lg flex items-end justify-center pb-1.5 mt-1 relative overflow-hidden"
        style={{
          height: barHeight,
          background: `linear-gradient(180deg, ${accentColor} 0%, ${gradientTo} 100%)`,
        }}
      >
        <span className="text-[14px] font-black text-white/80" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
          #{rank}
        </span>
      </div>
    </div>
  )
}

/* ─── Rank Row ─────────────────────────────────────────── */

function RankRow({ entry, isLast }: { entry: LeaderboardEntry; isLast: boolean }) {
  const { t } = useLanguage()

  return (
    <div
      className={cn(
        'flex items-center px-2.5 py-2.5 transition-colors',
        entry.isCurrentUser && 'bg-[#E53935]/[0.04] rounded-lg',
        !isLast && 'border-b border-gray-50'
      )}
    >
      {/* Rank */}
      <span
        className={cn(
          'text-[12px] font-bold w-8 tabular-nums shrink-0',
          entry.rank <= 5 ? 'text-gray-600' : 'text-gray-400'
        )}
      >
        #{entry.rank}
      </span>

      {/* Name + badges */}
      <div className="flex-1 min-w-0 flex items-center gap-1.5">
        <p className={cn(
          'text-[12px] font-semibold text-gray-800 truncate',
          entry.isCurrentUser && 'text-[#E53935] font-bold'
        )}>
          {entry.name}
        </p>
        {entry.isCurrentUser && (
          <span className="shrink-0 px-1.5 py-0.5 rounded-full text-[7px] font-extrabold bg-[#E53935] text-white uppercase tracking-wider">
            {t('leaderboard.you')}
          </span>
        )}
        {entry.city && (
          <span className="shrink-0 text-[8px] font-semibold text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-full">
            {entry.city}
          </span>
        )}
      </div>

      {/* Referral count */}
      <div className="shrink-0 text-right w-12">
        <span className="text-[14px] font-black text-gray-800 tabular-nums">
          {entry.referrals}
        </span>
      </div>
    </div>
  )
}
