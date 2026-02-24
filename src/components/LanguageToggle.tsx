'use client'

import { Globe } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { LANGUAGES } from '@/data/translations'
import { track } from '@/lib/track'

interface LanguageToggleProps {
  onPress: () => void
}

export default function LanguageToggle({ onPress }: LanguageToggleProps) {
  const { locale } = useLanguage()
  const currentLang = LANGUAGES.find((l) => l.code === locale)

  return (
    <button
      type="button"
      onClick={() => { track('language_open'); onPress() }}
      className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/15 active:bg-white/25 transition-colors"
      aria-label={`Current language: ${currentLang?.labelEn}. Tap to change.`}
    >
      <Globe className="w-3 h-3 text-white/70" strokeWidth={2.2} />
      <span className="text-[9px] font-bold text-white/80 uppercase tracking-wider">
        {locale === 'en' ? 'EN' : currentLang?.label.slice(0, 2)}
      </span>
    </button>
  )
}
