'use client'

import { useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { howItWorks, campaignRules, faqs } from '@/data/mock-data'
import { useLanguage } from '@/contexts/LanguageContext'
import type { TranslationKey } from '@/data/translations'
import { track } from '@/lib/track'

export default function RulesSection() {
  return (
    <div className="space-y-3">
      {/* How It Works */}
      <HowItWorksCard />

      {/* Campaign Rules */}
      <CampaignRulesCard />

      {/* FAQ Accordion */}
      <FAQCard />
    </div>
  )
}

function HowItWorksCard() {
  const { t } = useLanguage()

  return (
    <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] px-4 pt-4 pb-4">
      <h3 className="text-[13px] font-bold text-gray-900 mb-4">{t('rules.howItWorks')}</h3>

      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-[15px] top-[20px] bottom-[20px] w-[2px] bg-gray-100" />

        <div className="space-y-4">
          {howItWorks.map((step, i) => (
            <div key={step.step} className="flex items-start gap-3 relative">
              {/* Step circle */}
              <div
                className={cn(
                  'w-[30px] h-[30px] rounded-full flex items-center justify-center text-[14px] shrink-0 relative z-10',
                  i === howItWorks.length - 1
                    ? 'bg-[#E53935] text-white'
                    : 'bg-gray-100'
                )}
              >
                {step.icon}
              </div>

              <div className="pt-1">
                <p className="text-[13px] font-bold text-gray-800 leading-tight">
                  {t(`howItWorks.${step.step}.title` as TranslationKey)}
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {t(`howItWorks.${step.step}.description` as TranslationKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CampaignRulesCard() {
  const [showAll, setShowAll] = useState(false)
  const { t } = useLanguage()
  const ruleIndices = campaignRules.map((_, i) => i + 1)
  const visibleIndices = showAll ? ruleIndices : ruleIndices.slice(0, 5)

  return (
    <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] px-4 pt-4 pb-4">
      <h3 className="text-[13px] font-bold text-gray-900 mb-3">{t('rules.campaignRules')}</h3>

      <div className="space-y-2">
        {visibleIndices.map((ruleNum, i) => (
          <div key={ruleNum} className="flex items-start gap-2.5">
            <span className="shrink-0 w-5 h-5 rounded-full bg-[#E53935]/8 flex items-center justify-center text-[9px] font-bold text-[#E53935] mt-0.5">
              {ruleNum}
            </span>
            <p className="text-[12px] text-gray-600 leading-relaxed">
              {t(`campaignRule.${ruleNum}` as TranslationKey)}
            </p>
          </div>
        ))}
      </div>

      {campaignRules.length > 5 && (
        <button
          onClick={() => { if (!showAll) track('rules_expand'); setShowAll(!showAll) }}
          className="mt-3 text-[12px] font-semibold text-[#E53935] flex items-center gap-1 active:opacity-70"
        >
          {showAll ? t('rules.showLess') : t('rules.showAll', { count: campaignRules.length })}
          <ChevronDown
            className={cn(
              'w-3.5 h-3.5 transition-transform duration-200',
              showAll && 'rotate-180'
            )}
          />
        </button>
      )}
    </div>
  )
}

function FAQCard() {
  const { t } = useLanguage()
  const faqIndices = faqs.map((_, i) => i + 1)

  return (
    <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] px-4 pt-4 pb-2">
      <h3 className="text-[13px] font-bold text-gray-900 mb-3">
        {t('rules.faq')}
      </h3>

      <Accordion.Root type="single" collapsible onValueChange={(val) => { if (val) track('faq_open', { faq: val }) }}>
        {faqIndices.map((faqNum) => (
          <Accordion.Item
            key={faqNum}
            value={`faq-${faqNum}`}
            className="border-b border-gray-100 last:border-0"
          >
            <Accordion.Trigger className="flex items-center justify-between w-full py-3 text-left group">
              <span className="text-[12px] font-semibold text-gray-700 pr-3 leading-relaxed">
                {t(`faq.${faqNum}.question` as TranslationKey)}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </Accordion.Trigger>
            <Accordion.Content className="overflow-hidden data-[state=open]:animate-slide-down data-[state=closed]:animate-fade-out">
              <p className="text-[11px] text-gray-500 leading-relaxed pb-3 pr-6">
                {t(`faq.${faqNum}.answer` as TranslationKey)}
              </p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  )
}
