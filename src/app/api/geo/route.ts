import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  // Vercel Pro provides all three; Hobby only has country
  const city = req.headers.get('x-vercel-ip-city')
  const region = req.headers.get('x-vercel-ip-country-region')
  const country = req.headers.get('x-vercel-ip-country')

  if (city) {
    return NextResponse.json({ city, region, country })
  }

  // Fallback: server-side ip-api.com (HTTP is fine from serverless)
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    const res = await fetch(
      `http://ip-api.com/json/${ip ?? ''}?fields=city,regionName,countryCode`
    )
    const data = await res.json()
    return NextResponse.json({
      city: data.city ?? null,
      region: data.regionName ?? null,
      country: data.countryCode ?? country ?? null,
    })
  } catch {
    return NextResponse.json({ city: null, region: null, country })
  }
}
