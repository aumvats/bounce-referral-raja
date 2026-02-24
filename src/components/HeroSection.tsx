'use client'

import { useEffect, useState } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import AnimatedCounter from './AnimatedCounter'
import LanguageToggle from './LanguageToggle'
import { campaign } from '@/data/mock-data'
import { useLanguage } from '@/contexts/LanguageContext'

function useCountdown(targetDate: string) {
  const calc = () => {
    const diff = new Date(targetDate).getTime() - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true }
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      ended: false,
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const interval = setInterval(() => setTime(calc), 1000)
    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return time
}

const pad = (n: number) => n.toString().padStart(2, '0')

/* Floating gold decorative elements */
const floatingElements = [
  { size: 6, top: '12%', left: '8%', delay: '0s', opacity: 0.4 },
  { size: 4, top: '25%', right: '12%', delay: '0.8s', opacity: 0.3 },
  { size: 8, bottom: '20%', left: '15%', delay: '1.6s', opacity: 0.25 },
  { size: 5, top: '18%', right: '22%', delay: '2.2s', opacity: 0.35 },
  { size: 4, bottom: '30%', right: '8%', delay: '0.4s', opacity: 0.3 },
  { size: 6, top: '40%', left: '5%', delay: '1.2s', opacity: 0.2 },
]

interface HeroSectionProps {
  onLanguageToggle: () => void
}

export default function HeroSection({ onLanguageToggle }: HeroSectionProps) {
  const time = useCountdown(campaign.endDate)
  const { t } = useLanguage()

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #B71C1C 0%, #E53935 30%, #FF5722 60%, #E53935 100%)',
        backgroundSize: '300% 300%',
        animation: 'gradient-shift 8s ease-in-out infinite',
      }}
    >
      {/* Language toggle — top right */}
      <div className="absolute top-3 right-3 z-20">
        <LanguageToggle onPress={onLanguageToggle} />
      </div>

      {/* Subtle blob texture */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 430 280"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-60,150 C-10,60 110,10 220,30 C330,50 400,5 470,75 C540,145 490,220 390,245 C290,270 160,260 60,225 C-40,190 -110,240 -60,150Z"
          fill="rgba(255,255,255,0.05)"
        />
        <path
          d="M280,-15 C370,10 430,60 440,130 C450,200 390,240 300,248 C210,256 140,215 120,155 C100,95 150,42 220,12 C290,-18 190,-42 280,-15Z"
          fill="rgba(255,255,255,0.04)"
        />
      </svg>

      {/* Floating gold decorative elements */}
      {floatingElements.map((el, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: el.size,
            height: el.size,
            top: el.top,
            left: el.left,
            right: el.right,
            bottom: el.bottom,
            background: 'linear-gradient(135deg, #FFD54F, #FFB300)',
            opacity: el.opacity,
            animation: `float 3s ease-in-out infinite`,
            animationDelay: el.delay,
          }}
        />
      ))}

      <div className="relative z-10 px-6 pt-6 pb-5 flex flex-col items-center text-center">
        {/* Trophy Lottie */}
        <div className="w-10 h-10 -mb-1">
          <DotLottieReact
            src="/lottie/Trophy.lottie"
            loop
            autoplay
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Title — compact */}
        <h1 className="mb-3">
          <span className="block text-[18px] font-black leading-none tracking-wider text-white/70 uppercase">
            {t('hero.referral')}
          </span>
          <span
            className="block text-[32px] font-black leading-none tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #FFB300 0%, #FFD54F 35%, #FFB300 65%, #FF8F00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t('hero.raja')}
          </span>
        </h1>

        {/* Prize pool — the focal point with shimmer */}
        <p className="text-[9px] font-bold tracking-[0.15em] text-white/40 uppercase mb-0.5">
          {t('hero.totalPrizePool')}
        </p>
        <div className="relative overflow-hidden">
          <AnimatedCounter
            target={campaign.totalPrizePool}
            duration={2200}
            prefix="₹"
            className="text-[52px] font-black text-white leading-none"
          />
          {/* Gold shimmer sweep */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,215,0,0.25) 45%, rgba(255,215,0,0.4) 50%, transparent 55%)',
              animation: 'shine 3s infinite',
            }}
          />
        </div>

        {/* Countdown — compact inline */}
        <div className="mt-4 flex items-center gap-0.5 bg-white/10 rounded-full px-4 py-1.5">
          {[
            { v: time.days, l: t('hero.countdown.d') },
            { v: time.hours, l: t('hero.countdown.h') },
            { v: time.minutes, l: t('hero.countdown.m') },
            { v: time.seconds, l: t('hero.countdown.s') },
          ].map((item, i) => (
            <div key={item.l} className="flex items-center">
              {i > 0 && (
                <span className="text-[11px] font-bold text-white/20 mx-0.5">:</span>
              )}
              <span className="text-[13px] font-bold text-white/80 tabular-nums">
                {pad(item.v)}
              </span>
              <span className="text-[9px] font-medium text-white/35 ml-0.5">
                {item.l}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
