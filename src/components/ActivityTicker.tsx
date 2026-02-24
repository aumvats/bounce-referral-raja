'use client'

import { useEffect, useState, useMemo } from 'react'
import { activityFeed } from '@/data/mock-data'
import { useLanguage } from '@/contexts/LanguageContext'
import { useLeaderboard } from '@/hooks/useLeaderboard'
import type { TranslationKey } from '@/data/translations'
import type { LeaderboardEntry } from '@/types/referral-raja'

interface TickerItem {
  name: string
  actionKey: TranslationKey
}

/** Pick an action key that's consistent with this person's actual referral count */
function actionForEntry(entry: LeaderboardEntry): TranslationKey {
  if (entry.referrals >= 10) return 'activity.hit10'
  if (entry.referrals >= 7) return 'activity.qualifiedLuckyDraw'
  if (entry.referrals >= 5) return 'activity.earned600'
  if (entry.referrals >= 2) return 'activity.referred2'
  if (entry.referrals >= 1) return 'activity.earned300'
  return 'activity.earnedReward'
}

/** Deterministic shuffle (Fisher-Yates) seeded by array length so it's stable per render */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = (i * 7 + 3) % (i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildTickerItems(leaderboard: LeaderboardEntry[]): TickerItem[] {
  const items: TickerItem[] = leaderboard
    .filter((e) => e.referrals >= 1)
    .map((entry) => ({
      name: entry.name,
      actionKey: actionForEntry(entry),
    }))

  return shuffle(items).slice(0, 10)
}

export default function ActivityTicker() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const { t } = useLanguage()
  const { data: liveData, loading } = useLeaderboard()

  const tickerItems = useMemo(() => {
    if (liveData.length > 0) return buildTickerItems(liveData)
    return null // signals to use fallback
  }, [liveData])

  const items = tickerItems ?? activityFeed
  const count = items.length

  useEffect(() => {
    if (count === 0) return
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrentIndex((i) => (i + 1) % count)
        setVisible(true)
      }, 250)
    }, 8000)
    return () => clearInterval(interval)
  }, [count])

  if (count === 0) return null

  const item = items[currentIndex % count]

  // Determine name and action — works for both live TickerItem and fallback ActivityItem
  const name = item.name
  const actionKey = item.actionKey as TranslationKey

  return (
    <div className="py-2 px-4">
      <div
        className="flex items-center justify-center gap-1.5 transition-all duration-250"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(4px)',
        }}
      >
        <span className="w-2 h-2 rounded-full bg-[#43A047] shrink-0 animate-pulse-subtle" />
        <p className="text-[12px] text-gray-600 font-medium">
          <span className="font-bold text-gray-800">{name}</span>
          {' '}{t(actionKey)}
          {!loading && <span className="text-gray-400"> • just now</span>}
        </p>
      </div>
    </div>
  )
}
