'use client'

import { useState } from 'react'
import { Drawer } from 'vaul'
import { Check, Globe } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { LANGUAGES, type Locale } from '@/data/translations'

interface LanguageSelectorProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function LanguageSelector({ open, onOpenChange }: LanguageSelectorProps) {
  const { locale, setLocale, isLanguageSelected } = useLanguage()
  const [selected, setSelected] = useState<Locale>(locale)

  const isFirstVisit = !isLanguageSelected
  const isOpen = isFirstVisit || (open ?? false)

  const handleConfirm = () => {
    setLocale(selected)
    onOpenChange?.(false)
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (isFirstVisit && !newOpen) return
    onOpenChange?.(newOpen)
  }

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={handleOpenChange}
      dismissible={!isFirstVisit}
      noBodyStyles
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]" />
        <Drawer.Content
          className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-[430px] outline-none"
          aria-describedby={undefined}
        >
          <div
            className="rounded-t-[28px] max-h-[80dvh] flex flex-col overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF9F0 100%)',
            }}
          >
            {/* ── Handle ── */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 rounded-full bg-gray-200" />
            </div>

            {/* ── Header ── */}
            <div className="px-6 pt-1 pb-2 text-center shrink-0">
              <div className="mx-auto mb-2 w-10 h-10 rounded-full flex items-center justify-center relative">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #FFB300 0%, #FFD54F 50%, #FF8F00 100%)',
                    opacity: 0.15,
                  }}
                />
                <Globe
                  className="w-5 h-5 relative z-10"
                  style={{ color: '#E53935' }}
                  strokeWidth={2.2}
                />
              </div>

              <Drawer.Title className="text-[16px] font-black text-gray-900 tracking-tight">
                Choose Your Language
              </Drawer.Title>
              <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                Select your preferred language
              </p>
            </div>

            {/* ── Language Cards — scrolls if viewport is small ── */}
            <div className="px-5 space-y-1.5 pb-2 flex-1 min-h-0 overflow-y-auto">
              {LANGUAGES.map((lang) => {
                const isSelected = selected === lang.code

                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setSelected(lang.code)}
                    className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition-all duration-200 active:scale-[0.98] text-left relative overflow-hidden"
                    style={{
                      background: isSelected
                        ? 'linear-gradient(135deg, rgba(229,57,53,0.06) 0%, rgba(255,179,0,0.06) 100%)'
                        : '#FFFFFF',
                      border: isSelected
                        ? '2px solid #E53935'
                        : '2px solid #F0F0F0',
                      boxShadow: isSelected
                        ? '0 2px 12px rgba(229,57,53,0.12), 0 0 0 1px rgba(229,57,53,0.05)'
                        : '0 1px 3px rgba(0,0,0,0.03)',
                    }}
                  >
                    {/* Language text */}
                    <div className="flex-1 min-w-0 relative z-10">
                      <p
                        className="text-[15px] font-bold leading-tight"
                        style={{
                          color: isSelected ? '#E53935' : '#1A1A2E',
                        }}
                      >
                        {lang.label}
                      </p>
                      {lang.code !== 'en' && (
                        <p className="text-[10px] text-gray-400 font-medium">
                          {lang.labelEn}
                        </p>
                      )}
                    </div>

                    {/* Check circle */}
                    <div
                      className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 relative z-10"
                      style={{
                        background: isSelected
                          ? 'linear-gradient(135deg, #E53935 0%, #C62828 100%)'
                          : '#F5F5F5',
                        boxShadow: isSelected
                          ? '0 2px 8px rgba(229,57,53,0.3)'
                          : 'inset 0 1px 2px rgba(0,0,0,0.06)',
                      }}
                    >
                      {isSelected && (
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* ── Continue Button — always visible ── */}
            <div className="px-5 pt-3 pb-6 shrink-0">
              <button
                type="button"
                onClick={handleConfirm}
                className="w-full py-3 rounded-2xl font-bold text-[15px] text-white tracking-wide transition-all duration-200 active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #E53935 0%, #C62828 100%)',
                  boxShadow: '0 4px 16px rgba(229, 57, 53, 0.4), 0 1px 3px rgba(0,0,0,0.1)',
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
