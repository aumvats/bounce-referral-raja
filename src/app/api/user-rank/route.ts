import { NextRequest, NextResponse } from 'next/server'
import { getCurrentWeekInfo } from '@/data/campaign-data'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabaseHeaders = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
}

function last10(phone: string): string {
  return phone.replace(/\D/g, '').slice(-10)
}

interface RawReferralRow {
  referer_id: number
  full_name: string | null
  phone_number: string
  created_at_ist: string
}

function aggregateAll(rows: RawReferralRow[]) {
  const map = new Map<number, { full_name: string | null; phone_number: string; count: number }>()

  for (const row of rows) {
    const existing = map.get(row.referer_id)
    if (existing) {
      existing.count++
    } else {
      map.set(row.referer_id, {
        full_name: row.full_name,
        phone_number: row.phone_number,
        count: 1,
      })
    }
  }

  return [...map.values()]
    .sort((a, b) => b.count - a.count)
    .map((entry, i) => ({
      rank: i + 1,
      full_name: entry.full_name,
      phone_number: entry.phone_number,
      successful_referrals: entry.count,
    }))
}

export async function GET(req: NextRequest) {
  const phone = req.nextUrl.searchParams.get('phone')
  if (!phone) {
    return NextResponse.json({ found: false, error: 'phone param required' }, { status: 400 })
  }

  const period = req.nextUrl.searchParams.get('period') || 'campaign'
  const needle = last10(phone)

  try {
    let rows: { rank: number; full_name: string | null; phone_number: string; successful_referrals: number }[]

    if (period === 'weekly') {
      const { weekStartISO, weekEndISO } = getCurrentWeekInfo()
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/referral_raja_referrals_raw?select=referer_id,full_name,phone_number,created_at_ist&created_at_ist=gte.${encodeURIComponent(weekStartISO)}&created_at_ist=lte.${encodeURIComponent(weekEndISO)}`,
        { headers: supabaseHeaders, next: { revalidate: 30 } }
      )
      if (!res.ok) {
        return NextResponse.json({ found: false, error: `Supabase ${res.status}` }, { status: res.status })
      }
      const rawRows: RawReferralRow[] = await res.json()
      rows = aggregateAll(rawRows)
    } else {
      // Campaign: use existing pre-aggregated table
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/referral_raja_leaderboard?select=rank,full_name,phone_number,successful_referrals&order=rank.asc,successful_referrals.desc`,
        { headers: supabaseHeaders, next: { revalidate: 30 } }
      )
      if (!res.ok) {
        return NextResponse.json({ found: false, error: `Supabase ${res.status}` }, { status: res.status })
      }
      rows = (await res.json()).map((row: Record<string, unknown>, i: number) => ({
        ...row,
        rank: i + 1,
      }))
    }

    const idx = rows.findIndex((r) => last10(r.phone_number) === needle)

    if (idx === -1) {
      return NextResponse.json({ found: false })
    }

    const row = rows[idx]
    return NextResponse.json({
      found: true,
      rank: row.rank,
      name: row.full_name?.trim() || null,
      referrals: row.successful_referrals,
    })
  } catch {
    return NextResponse.json({ found: false, error: 'Failed to fetch' }, { status: 502 })
  }
}
