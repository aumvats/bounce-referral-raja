import { NextRequest, NextResponse } from 'next/server'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

function last10(phone: string): string {
  return phone.replace(/\D/g, '').slice(-10)
}

export async function GET(req: NextRequest) {
  const phone = req.nextUrl.searchParams.get('phone')
  if (!phone) {
    return NextResponse.json({ found: false, error: 'phone param required' }, { status: 400 })
  }

  try {
    // Fetch full leaderboard (ordered by rank) to find this user
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/referral_raja_leaderboard?select=rank,full_name,phone_number,successful_referrals&order=rank.asc,successful_referrals.desc`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        next: { revalidate: 30 },
      }
    )
    if (!res.ok) {
      return NextResponse.json({ found: false, error: `Supabase ${res.status}` }, { status: res.status })
    }

    const rows: { rank: number; full_name: string | null; phone_number: string; successful_referrals: number }[] = await res.json()

    const needle = last10(phone)
    // Find matching row — compare by last 10 digits
    const idx = rows.findIndex((r) => last10(r.phone_number) === needle)

    if (idx === -1) {
      return NextResponse.json({ found: false })
    }

    const row = rows[idx]
    const sequentialRank = idx + 1 // re-assign sequential rank same as /api/leaderboard

    return NextResponse.json({
      found: true,
      rank: sequentialRank,
      name: row.full_name?.trim() || null,
      referrals: row.successful_referrals,
    })
  } catch {
    return NextResponse.json({ found: false, error: 'Failed to fetch' }, { status: 502 })
  }
}
