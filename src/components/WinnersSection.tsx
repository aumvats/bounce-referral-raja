'use client'

import { winners, pastCampaignWinners, socialProof } from '@/data/mock-data'
import { useLanguage } from '@/contexts/LanguageContext'
import AnimatedCounter from './AnimatedCounter'

export default function WinnersSection() {
  const hasWinners = winners.length > 0
  const { t } = useLanguage()

  return (
    <div className="space-y-3">
      {/* Current campaign winners or empty state */}
      <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] px-4 py-5">
        <p className="text-[9px] font-bold text-[#E53935] tracking-wider uppercase mb-3">
          {t('winners.thisCampaign')}
        </p>
        {hasWinners ? (
          <div className="grid grid-cols-2 gap-3">
            {winners.map((winner, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl p-3 text-center"
              >
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                  {t('winners.week', { week: winner.week })}
                </span>
                <p className="text-[11px] font-semibold text-gray-600 mt-0.5">
                  {winner.winType === 'top_referrer' ? t('winners.topReferrer') : t('winners.luckyDraw')}
                </p>
                <p className="text-[14px] font-bold text-gray-900 mt-1">
                  {winner.name}
                </p>
                <span className="text-[9px] font-semibold text-gray-400 bg-gray-200/60 px-1.5 py-0.5 rounded">
                  {winner.city}
                </span>
                <div className="mt-1.5 flex items-center justify-center gap-2">
                  <span className="text-[10px] text-gray-500">{t('winners.refs', { count: winner.referrals })}</span>
                  <span className="text-[12px] font-bold text-[#FFB300]">
                    ₹{winner.prize.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <span className="text-[36px] block mb-2">🏆</span>
            <p className="text-[13px] font-bold text-gray-700 mb-0.5">
              {t('winners.emptyTitle')}
            </p>
            <p className="text-[11px] text-[#E53935] font-semibold">
              {t('winners.emptySubtitle')}
            </p>
          </div>
        )}
      </div>

      {/* ── Past Campaign Winners Gallery ── */}
      {pastCampaignWinners.length > 0 && (
        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] px-4 pt-4 pb-4">
          <p className="text-[9px] font-bold text-[#FFB300] tracking-wider uppercase mb-3">
            {t('winners.hallOfFame')}
          </p>

          <div className="flex gap-2.5 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
            {pastCampaignWinners.map((winner, i) => (
              <div
                key={i}
                className="shrink-0 w-[140px] rounded-xl overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, #1A1A2E 0%, #16213E 100%)',
                }}
              >
                {/* Gold accent bar */}
                <div
                  className="h-1 w-full"
                  style={{
                    background: 'linear-gradient(90deg, #FFB300 0%, #FFD54F 50%, #FFB300 100%)',
                  }}
                />

                <div className="px-3 pt-3 pb-3">
                  {/* Avatar */}
                  {winner.image ? (
                    <img
                      src={winner.image}
                      alt={winner.name}
                      className="w-12 h-12 rounded-full mx-auto object-cover mb-2"
                      style={{
                        boxShadow: '0 0 12px rgba(255,179,0,0.3), 0 0 0 2.5px rgba(255,215,0,0.6)',
                      }}
                    />
                  ) : (
                    <div
                      className="w-12 h-12 rounded-full mx-auto flex items-center justify-center text-[14px] font-black text-white mb-2"
                      style={{
                        background: 'linear-gradient(135deg, #FFB300 0%, #FF8F00 100%)',
                        boxShadow: '0 0 12px rgba(255,179,0,0.3)',
                      }}
                    >
                      {winner.name.charAt(0)}
                    </div>
                  )}

                  {/* Name */}
                  <p className="text-[12px] font-bold text-white text-center truncate">
                    {winner.name}
                  </p>

                  {/* City */}
                  <p className="text-[9px] font-semibold text-white/40 text-center mt-0.5">
                    {winner.city}
                  </p>

                  {/* Stats */}
                  <div className="mt-2 flex items-center justify-center gap-1">
                    <span className="text-[10px] font-bold text-white/50">{t('winners.refs', { count: winner.referrals })}</span>
                    <span className="text-[8px] text-white/20">•</span>
                    <span className="text-[11px] font-black text-[#FFD54F]">
                      ₹{winner.prize.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Campaign tag */}
                  <div className="mt-2 bg-white/10 rounded-full py-1 px-2 text-center">
                    <p className="text-[8px] font-bold text-white/60 truncate">
                      {winner.campaignName} • {winner.period}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Social proof counters */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] px-4 py-4 text-center">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">
            {t('winners.totalReferrals')}
          </p>
          <AnimatedCounter
            target={socialProof.totalReferrals}
            duration={1800}
            className="text-[22px] font-black text-gray-900"
          />
        </div>
        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] px-4 py-4 text-center">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">
            {t('winners.rewardsPaid')}
          </p>
          <AnimatedCounter
            target={socialProof.totalEarned}
            duration={1800}
            prefix="₹"
            className="text-[22px] font-black text-gray-900"
          />
        </div>
      </div>
    </div>
  )
}
