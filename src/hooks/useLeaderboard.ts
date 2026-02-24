'use client'

import { useState, useEffect } from 'react'
import type { LeaderboardEntry } from '@/types/referral-raja'

const METABASE_URL =
  'https://metabaselatest-dy7gqwqrma-el.a.run.app/api/public/card/162e10a2-5971-47aa-a276-aef59f78198f/query/json'

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

function toLeaderboardEntry(row: MetabaseRow): LeaderboardEntry {
  const name = row.full_name?.trim()
    ? row.full_name.trim()
    : maskPhone(row.phone_number)

  return {
    rank: row.rank,
    name,
    referrals: row.successful_referrals,
  }
}

export function useLeaderboard() {
  const [data, setData] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      try {
        const res = await fetch(METABASE_URL)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const rows: MetabaseRow[] = await res.json()

        if (!cancelled) {
          setData(rows.map(toLeaderboardEntry))
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
  }, [])

  return { data, loading, error }
}
