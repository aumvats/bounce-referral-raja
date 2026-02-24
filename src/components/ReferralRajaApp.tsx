'use client'

import { useState } from 'react'
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext'
import LanguageSelector from './LanguageSelector'
import HeroSection from './HeroSection'
import ActivityTicker from './ActivityTicker'
import SectionNav from './SectionNav'
import LeaderboardSection from './LeaderboardSection'
import PrizesSection from './PrizesSection'
import WinnersSection from './WinnersSection'
import RulesSection from './RulesSection'
import StickyBottomCTA from './StickyBottomCTA'

function ReferralRajaContent() {
  const { locale } = useLanguage()
  const [langSelectorOpen, setLangSelectorOpen] = useState(false)

  return (
    <div className={`min-h-screen bg-[#F5F5F5] flex justify-center lang-${locale}`}>
      <div className="w-full max-w-[430px] min-h-screen bg-[#F5F5F5] shadow-xl relative">
        <HeroSection onLanguageToggle={() => setLangSelectorOpen(true)} />
        <ActivityTicker />
        <SectionNav />
        <div className="px-4 pb-28 space-y-4">
          <section id="section-leaderboard" className="scroll-mt-14">
            <LeaderboardSection />
          </section>
          <section id="section-prizes" className="scroll-mt-14">
            <PrizesSection />
          </section>
          <section id="section-winners" className="scroll-mt-14">
            <WinnersSection />
          </section>
          <section id="section-rules" className="scroll-mt-14">
            <RulesSection />
          </section>
        </div>
        <StickyBottomCTA />
      </div>
      <LanguageSelector
        open={langSelectorOpen}
        onOpenChange={setLangSelectorOpen}
      />
    </div>
  )
}

export default function ReferralRajaApp() {
  return (
    <LanguageProvider>
      <ReferralRajaContent />
    </LanguageProvider>
  )
}
