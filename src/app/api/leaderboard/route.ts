import { NextResponse } from 'next/server'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function GET() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/referral_raja_leaderboard?select=rank,referer_id,full_name,phone_number,successful_referrals&order=rank.asc,successful_referrals.desc&limit=10`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        next: { revalidate: 30 },
      }
    )
    if (!res.ok) {
      return NextResponse.json({ error: `Supabase returned ${res.status}` }, { status: res.status })
    }
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 502 })
  }
}
