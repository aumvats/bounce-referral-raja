import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  return NextResponse.json({
    city: req.headers.get('x-vercel-ip-city') ?? null,
    region: req.headers.get('x-vercel-ip-country-region') ?? null,
    country: req.headers.get('x-vercel-ip-country') ?? null,
  })
}
