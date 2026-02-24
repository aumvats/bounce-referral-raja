'use client'

import { useState, useEffect } from 'react'
import type { SectionId } from '@/types/referral-raja'
import type { TranslationKey } from '@/data/translations'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/contexts/LanguageContext'
import { track } from '@/lib/track'

const sections: { id: SectionId; icon: string; labelKey: TranslationKey }[] = [
  { id: 'leaderboard', icon: '🏆', labelKey: 'nav.leaderboard' },
  { id: 'prizes', icon: '🎁', labelKey: 'nav.prizes' },
  { id: 'winners', icon: '⭐', labelKey: 'nav.winners' },
  { id: 'rules', icon: '📋', labelKey: 'nav.rules' },
]

export default function SectionNav() {
  const { t } = useLanguage()
  const [active, setActive] = useState<SectionId>('leaderboard')

  // Track which section is in view via IntersectionObserver
  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(`section-${s.id}`))
      .filter(Boolean) as HTMLElement[]

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace('section-', '') as SectionId
            setActive(id)
            track('section_view', { section: id })
          }
        })
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleTap = (id: SectionId) => {
    track('section_nav_tap', { section: id })
    setActive(id)
    document.getElementById(`section-${id}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <nav className="sticky top-0 z-20 bg-[#F5F5F5] px-4 py-2.5">
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {sections.map((section) => {
          const isActive = active === section.id
          return (
            <button
              type="button"
              key={section.id}
              onClick={() => handleTap(section.id)}
              className={cn(
                'shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-semibold transition-all duration-200',
                isActive
                  ? 'bg-[#E53935] text-white shadow-[0_2px_8px_rgba(229,57,53,0.3)]'
                  : 'bg-white text-gray-600 border border-gray-200 active:scale-95'
              )}
            >
              <span className="text-[13px]">{section.icon}</span>
              {t(section.labelKey)}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
