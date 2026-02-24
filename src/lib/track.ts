const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const sessionId =
  typeof crypto !== 'undefined'
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2)

// IP geolocation — fetched once per session, cached
let geoData: { city?: string; region?: string; country?: string } = {}
let geoFetched = false

function fetchGeo() {
  if (geoFetched) return
  geoFetched = true
  fetch('http://ip-api.com/json/?fields=city,regionName,countryCode')
    .then((r) => r.json())
    .then((d) => {
      geoData = { city: d.city, region: d.regionName, country: d.countryCode }
    })
    .catch(() => {})
}

export function track(event: string, props?: Record<string, unknown>) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return
  fetchGeo()
  try {
    const body = {
      event,
      props: props ?? {},
      page: window.location.pathname,
      locale: localStorage.getItem('referral-raja-lang') ?? 'en',
      session_id: sessionId,
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
      ...geoData,
    }

    fetch(`${SUPABASE_URL}/rest/v1/referral_raja_events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(body),
    }).catch(() => {})
  } catch {
    // never crash the app for tracking
  }
}
