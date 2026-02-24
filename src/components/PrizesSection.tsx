'use client'

import { campaign, weekSchedule } from '@/data/mock-data'
import { useLanguage } from '@/contexts/LanguageContext'
import { cn } from '@/lib/utils'

export default function PrizesSection() {
  return (
    <div className="space-y-3">
      <WeeklyPrizesCard />
      <MonthlyMegaCard />
      <PerReferralCard />
    </div>
  )
}

function WeeklyPrizesCard() {
  const activeWeek = weekSchedule.find((w) => w.isActive)
  const { t } = useLanguage()

  return (
    <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] px-4 pt-4 pb-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[9px] font-bold text-[#E53935] tracking-wider uppercase">
          {t('prizes.everyWeek')}
        </span>
        {activeWeek && (
          <span className="flex items-center gap-1 text-[9px] font-semibold text-gray-400">
            {activeWeek.label}: {activeWeek.startDate} – {activeWeek.endDate}
            <span className="px-1 rounded text-[7px] font-bold bg-[#E53935] text-white">
              {t('prizes.live')}
            </span>
          </span>
        )}
      </div>

      <div className="space-y-2.5">
        <PrizeRow
          icon="🥇"
          amount={`₹${campaign.weeklyTopPrize.toLocaleString('en-IN')}`}
          description={t('prizes.highestReferrals')}
        />
        <PrizeRow
          icon="🎲"
          amount={`₹${campaign.weeklyLuckyDrawPrize.toLocaleString('en-IN')}`}
          description={t('prizes.luckyDraw', { threshold: campaign.weeklyLuckyDrawThreshold })}
        />
      </div>
    </div>
  )
}

function MonthlyMegaCard() {
  const { t } = useLanguage()

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
          <PrizeRow
            icon="🏆"
            amount={`₹${campaign.monthlyTopPrize.toLocaleString('en-IN')}`}
            description={t('prizes.campaignRaja')}
            highlight
          />
          <PrizeRow
            icon="🎲"
            amount={`₹${campaign.monthlyLuckyDrawPrize.toLocaleString('en-IN')} × ${campaign.monthlyLuckyDrawWinners}`}
            description={t('prizes.monthlyLucky', { threshold: campaign.monthlyLuckyDrawThreshold })}
            highlight
          />
        </div>
      </div>
    </div>
  )
}

function PerReferralCard() {
  const { t } = useLanguage()

  return (
    <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] px-4 pt-3 pb-3">
      <span className="text-[9px] font-bold text-[#43A047] tracking-wider uppercase">
        {t('prizes.everyReferralEarns')}
      </span>

      <div className="mt-2">
        <div className="bg-gray-50 rounded-xl py-2.5 text-center">
          <p className="text-[16px] font-black text-gray-900">{t('prizes.perReferralReward')}</p>
        </div>
      </div>

      <p className="text-[10px] font-semibold text-[#2E7D32] text-center mt-2.5">
        {t('prizes.onTop')}
      </p>
    </div>
  )
}

function PrizeRow({
  icon,
  amount,
  description,
  highlight = false,
}: {
  icon: string
  amount: string
  description: string
  highlight?: boolean
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="text-[16px] shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className={cn(
          'text-[15px] font-black leading-tight',
          highlight ? 'text-[#FF8F00]' : 'text-gray-900'
        )}>
          {amount}
        </p>
        <p className="text-[10px] text-gray-500 mt-0.5">{description}</p>
      </div>
    </div>
  )
}
