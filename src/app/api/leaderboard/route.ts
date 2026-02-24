import { NextResponse } from 'next/server'

const METABASE_URL =
  'https://metabaselatest-dy7gqwqrma-el.a.run.app/api/public/card/162e10a2-5971-47aa-a276-aef59f78198f/query/json'

export async function GET() {
  try {
    const res = await fetch(METABASE_URL, { next: { revalidate: 60 } })
    if (!res.ok) {
      return NextResponse.json({ error: `Metabase returned ${res.status}` }, { status: res.status })
    }
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 502 })
  }
}
