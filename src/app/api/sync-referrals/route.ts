import { NextRequest, NextResponse } from 'next/server'

const METABASE_CSV_URL =
  'http://metabaselatest-dy7gqwqrma-el.a.run.app/api/public/card/435a8081-4e86-4ff8-90b4-e1d6072cc2ef/query/csv?'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const CRON_SECRET = process.env.CRON_SECRET

const supabaseHeaders = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=minimal',
}

interface ParsedRow {
  referer_id: number
  full_name: string | null
  phone_number: string
  created_at_ist: string
}

function parseCSV(text: string): ParsedRow[] {
  const lines = text.trim().split('\n')
  // Skip header
  return lines.slice(1).map((line) => {
    // Simple CSV parse — fields don't contain commas (names don't have commas in this dataset)
    const parts = line.split(',')
    const referer_id = parseInt(parts[0], 10)
    const full_name = parts[1]?.trim() || null
    const phone_number = parts[2]?.trim()
    const created_at_ist = parts[3]?.trim()
    return { referer_id, full_name, phone_number, created_at_ist }
  }).filter((row) => !isNaN(row.referer_id) && row.phone_number && row.created_at_ist)
}

export async function GET(req: NextRequest) {
  // Verify cron secret (Vercel sends this header for cron jobs)
  const authHeader = req.headers.get('authorization')
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // 1. Fetch CSV from Metabase
    const csvRes = await fetch(METABASE_CSV_URL)
    if (!csvRes.ok) {
      return NextResponse.json(
        { error: `Metabase returned ${csvRes.status}` },
        { status: 502 }
      )
    }
    const csvText = await csvRes.text()
    const rows = parseCSV(csvText)

    if (rows.length === 0) {
      return NextResponse.json({ error: 'No rows parsed from CSV' }, { status: 502 })
    }

    // 2. Delete all existing rows
    const deleteRes = await fetch(
      `${SUPABASE_URL}/rest/v1/referral_raja_referrals_raw?id=gt.0`,
      { method: 'DELETE', headers: supabaseHeaders }
    )
    if (!deleteRes.ok) {
      return NextResponse.json(
        { error: `Delete failed: ${deleteRes.status}` },
        { status: 502 }
      )
    }

    // 3. Insert in batches of 100
    const batchSize = 100
    let inserted = 0
    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize).map((row) => ({
        referer_id: row.referer_id,
        full_name: row.full_name,
        phone_number: row.phone_number,
        created_at_ist: row.created_at_ist,
      }))

      const insertRes = await fetch(
        `${SUPABASE_URL}/rest/v1/referral_raja_referrals_raw`,
        {
          method: 'POST',
          headers: supabaseHeaders,
          body: JSON.stringify(batch),
        }
      )
      if (!insertRes.ok) {
        const errText = await insertRes.text()
        return NextResponse.json(
          { error: `Insert batch failed: ${insertRes.status} — ${errText}`, inserted },
          { status: 502 }
        )
      }
      inserted += batch.length
    }

    return NextResponse.json({ ok: true, rows: inserted })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
