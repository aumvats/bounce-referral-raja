'use client'

import { useState } from 'react'
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext'
import LanguageSelector from '../LanguageSelector'
import HeroSectionV2 from './HeroSectionV2'
import ActivityTicker from '../ActivityTicker'
import StatusCardV2 from './StatusCardV2'
import SectionNav from '../SectionNav'
import PrizesSectionV2 from './PrizesSectionV2'
import LeaderboardSectionV2 from './LeaderboardSectionV2'
import WinnersSection from '../WinnersSection'
import RulesSection from '../RulesSection'
import StickyBottomCtaV2 from './StickyBottomCtaV2'

function ReferralRajaV2Content() {
  const { locale } = useLanguage()
  const [langSelectorOpen, setLangSelectorOpen] = useState(false)

  return (
    <div className={`min-h-screen bg-[#F5F5F5] flex justify-center lang-${locale}`}>
      <div className="w-full max-w-[430px] min-h-screen bg-[#F5F5F5] shadow-xl relative">
        <HeroSectionV2 onLanguageToggle={() => setLangSelectorOpen(true)} />
        <ActivityTicker />
        <StatusCardV2 />
        <SectionNav />
        <div className="px-4 pb-28 space-y-4">
          <section id="section-prizes" className="scroll-mt-14">
            <PrizesSectionV2 />
          </section>
          <section id="section-leaderboard" className="scroll-mt-14">
            <LeaderboardSectionV2 />
          </section>
          <section id="section-winners" className="scroll-mt-14">
            <WinnersSection />
          </section>
          <section id="section-rules" className="scroll-mt-14">
            <RulesSection />
          </section>
        </div>
        <StickyBottomCtaV2 />
      </div>
      <LanguageSelector
        open={langSelectorOpen}
        onOpenChange={setLangSelectorOpen}
      />
    </div>
  )
}

export default function ReferralRajaAppV2() {
  return (
    <LanguageProvider>
      <ReferralRajaV2Content />
    </LanguageProvider>
  )
}
