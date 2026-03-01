import { NextRequest, NextResponse } from 'next/server'
import { getCurrentWeekInfo } from '@/data/campaign-data'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabaseHeaders = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
}

interface RawReferralRow {
  referer_id: number
  full_name: string | null
  phone_number: string
  created_at_ist: string
}

function aggregateAndRank(rows: RawReferralRow[], limit: number) {
  const map = new Map<number, { referer_id: number; full_name: string | null; phone_number: string; count: number }>()

  for (const row of rows) {
    const existing = map.get(row.referer_id)
    if (existing) {
      existing.count++
    } else {
      map.set(row.referer_id, {
        referer_id: row.referer_id,
        full_name: row.full_name,
        phone_number: row.phone_number,
        count: 1,
      })
    }
  }

  const sorted = [...map.values()].sort((a, b) => b.count - a.count)
  return sorted.slice(0, limit).map((entry, i) => ({
    rank: i + 1,
    referer_id: entry.referer_id,
    full_name: entry.full_name,
    phone_number: entry.phone_number,
    successful_referrals: entry.count,
  }))
}

export async function GET(req: NextRequest) {
  const period = req.nextUrl.searchParams.get('period') || 'campaign'

  try {
    if (period === 'weekly') {
      const { weekStartISO, weekEndISO } = getCurrentWeekInfo()

      // Query raw referrals table filtered to current week
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/referral_raja_referrals_raw?select=referer_id,full_name,phone_number,created_at_ist&created_at_ist=gte.${weekStartISO}&created_at_ist=lte.${weekEndISO}`,
        { headers: supabaseHeaders, next: { revalidate: 30 } }
      )
      if (!res.ok) {
        return NextResponse.json({ error: `Supabase returned ${res.status}` }, { status: res.status })
      }
      const rows: RawReferralRow[] = await res.json()
      return NextResponse.json(aggregateAndRank(rows, 10))
    }

    // Default: campaign (cumulative) — use existing pre-aggregated table
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/referral_raja_leaderboard?select=rank,referer_id,full_name,phone_number,successful_referrals&order=rank.asc,successful_referrals.desc&limit=10`,
      { headers: supabaseHeaders, next: { revalidate: 30 } }
    )
    if (!res.ok) {
      return NextResponse.json({ error: `Supabase returned ${res.status}` }, { status: res.status })
    }
    const data = await res.json()
    // Re-assign sequential ranks (Metabase gives dense ranks with ties)
    const ranked = data.map((row: Record<string, unknown>, i: number) => ({
      ...row,
      rank: i + 1,
    }))
    return NextResponse.json(ranked)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 502 })
  }
}
