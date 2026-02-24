'use client'

import { currentUser, campaign } from '@/data/mock-data'
import { useLanguage } from '@/contexts/LanguageContext'
import AnimatedCounter from './AnimatedCounter'

export default function StatusCard() {
  const user = currentUser
  const threshold = campaign.weeklyLuckyDrawThreshold
  const remaining = threshold - user.luckyDrawProgress
  const progress = Math.min(user.luckyDrawProgress / threshold, 1)
  const isEligible = remaining <= 0
  const { t } = useLanguage()

  return (
    <section className="px-4 pb-2">
      <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-4">
        {/* Rank + Referrals */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
              {t('status.yourRank')}
            </p>
            <p className="text-[34px] font-black leading-none text-[#E53935]">
              #{user.weeklyRank}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
              {t('status.thisWeek')}
            </p>
            <div className="flex items-baseline gap-1 justify-end">
              <AnimatedCounter
                target={user.thisWeekReferrals}
                duration={800}
                className="text-[34px] font-black leading-none text-gray-900"
              />
              <span className="text-[10px] font-medium text-gray-400">{t('status.refs')}</span>
            </div>
          </div>
        </div>

        {/* Gap nudge */}
        {user.gapToNext > 0 && (
          <div className="bg-[#FFF8E1] rounded-xl px-3 py-2 mb-3">
            <p className="text-[11px] text-[#F57F17]">
              ⚡ {t('status.gapNudge', { gap: user.gapToNext, rank: user.nextRankPosition })}
            </p>
          </div>
        )}

        {/* Lucky draw progress */}
        <div className="bg-gray-50 rounded-xl px-3 py-2.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
              {t('status.luckyDraw')}
            </span>
            <span className="text-[11px] font-bold tabular-nums text-gray-600">
              {user.luckyDrawProgress}/{threshold}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
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
          <p className="text-[10px] text-gray-500 mt-1.5">
            {isEligible ? (
              <span className="text-[#43A047] font-semibold">
                {t('status.eligible')}
              </span>
            ) : (
              <>{t('status.toQualify', { remaining })}</>
            )}
          </p>
        </div>
      </div>
    </section>
  )
}
