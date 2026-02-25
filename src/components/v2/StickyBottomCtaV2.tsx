'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { openReferralLink } from '@/lib/deeplink'

export default function StickyBottomCtaV2() {
  const { t } = useLanguage()
  const btnRef = useRef<HTMLAnchorElement>(null)

  // One-time pulse on mount
  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return
    btn.style.animation = 'cta-pulse 600ms ease-out'
    const onEnd = () => { btn.style.animation = '' }
    btn.addEventListener('animationend', onEnd)
    return () => btn.removeEventListener('animationend', onEnd)
  }, [])

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-30">
      {/* Gradient fade */}
      <div className="h-6 bg-gradient-to-t from-[#F5F5F5] to-transparent pointer-events-none" />

      {/* CTA container */}
      <div className="bg-[#F5F5F5] px-4 pb-5 pt-1">
        <a
          ref={btnRef}
          href="https://bouncedaily.link/refer"
          onClick={(e) => { e.preventDefault(); openReferralLink() }}
          className="block w-full py-3.5 rounded-2xl font-bold text-[15px] text-white tracking-wide transition-all duration-200 active:scale-[0.98] text-center"
          style={{
            background: 'linear-gradient(135deg, #E53935 0%, #C62828 100%)',
            boxShadow: '0 4px 16px rgba(229, 57, 53, 0.4), 0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          {t('cta.referNow')}
        </a>
      </div>
    </div>
  )
}
