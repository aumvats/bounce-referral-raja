'use client'

import { useState, useEffect } from 'react'
import type { LeaderboardEntry } from '@/types/referral-raja'
import { normalizeLast10 } from '@/lib/bridge'

// Proxy through our own API route to avoid CORS issues on mobile
const LEADERBOARD_URL = '/api/leaderboard'

interface MetabaseRow {
  rank: number
  referer_id: number
  full_name: string | null
  phone_number: string
  successful_referrals: number
}

function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length >= 10) {
    return `${digits.slice(-10, -7)}***${digits.slice(-4)}`
  }
  return '***'
}

function toLeaderboardEntry(row: MetabaseRow, currentPhone: string | null): LeaderboardEntry {
  const name = row.full_name?.trim()
    ? row.full_name.trim()
    : maskPhone(row.phone_number)

  const isCurrentUser = currentPhone
    ? normalizeLast10(row.phone_number) === normalizeLast10(currentPhone)
    : false

  return {
    rank: row.rank,
    name,
    referrals: row.successful_referrals,
    phone: row.phone_number,
    ...(isCurrentUser && { isCurrentUser: true }),
  }
}

export function useLeaderboard(currentPhone?: string | null) {
  const [data, setData] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      try {
        const res = await fetch(LEADERBOARD_URL)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const rows: MetabaseRow[] = await res.json()

        if (!cancelled) {
          setData(rows.map((row) => toLeaderboardEntry(row, currentPhone ?? null)))
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch')
          setLoading(false)
        }
      }
    }

    fetchData()
    return () => { cancelled = true }
  }, [currentPhone])

  return { data, loading, error }
}
