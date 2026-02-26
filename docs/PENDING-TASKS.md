# Referral Raja — Two Pending Tasks

> **Context:** The Referral Raja site (`bounce-referral-raja.vercel.app`) is embedded as a webview inside the Bounce app's "Refer" tab. These two tasks require native app changes + web changes working together.

---

## Task 1: CTA Deep Link (Blocked — needs native dev input)

### Problem
The "Refer Now" CTA needs to navigate the user back to the Refer tab in the Bounce app. The site is loaded inside a webview in the app. Neither `bouncedaily://` (raw deep link) nor `https://bouncedaily.link/` (HTTPS wrapper) works from inside the webview — both cause `ERR_UNKNOWN_URL_SCHEME`.

### Current state on web side
- Both sticky CTAs are **hidden on prod** (return `null`)
- `src/lib/deeplink.ts` exists with a utility that tries RN WebView bridge → iOS WKWebView handler → `window.location.href` fallback
- All 7 CTA links across 6 files have `onClick` with `e.preventDefault()` + `openReferralLink()`

### What we need from the native dev

**Question 1: How should the webview communicate with the app?**

| Option | How it works | What web side does |
|--------|-------------|----------------------|
| **A. JS Bridge (postMessage)** | App injects `window.ReactNativeWebView` or similar | We call `postMessage({ type: 'navigate', tab: 'refer' })` |
| **B. Custom URL scheme** | App's webview intercepts a specific scheme (e.g. `bounce://tab/refer`) | We set `window.location.href = 'bounce://tab/refer'` |
| **C. shouldOverrideUrlLoading** | App intercepts ALL navigations and handles deep links | We navigate to `bouncedaily.link/refer` normally (current setup, doesn't work yet) |
| **D. Close webview** | CTA just closes the webview, returning to the Refer tab behind it | We call `window.close()` or bridge method |

**Question 2: What is the exact deep link / scheme / bridge method?**
- e.g. `bounce://refer`, `bouncedaily://tab/refer`, `window.BounceApp.navigate('refer')`, etc.

### Once we have the answer
Update `src/lib/deeplink.ts` with the correct method, remove `return null` from both CTAs, build and deploy. ~5 min change.

---

## Task 2: Pass Rider Phone Number via URL Parameter

### Goal
The Bounce app opens the webview with the rider's phone number in the URL:
```
https://bounce-referral-raja.vercel.app/v2?phone=9876543210
```

The site uses this to:
1. **Highlight the rider's row** in the leaderboard (if they're in top 10)
2. **Show their real rank and stats** in the status card (replacing hardcoded mock data)
3. If the rider is NOT in the top 10, show their rank at the bottom of the leaderboard

### What the native dev needs to do
When opening the webview for the Refer tab, append `?phone=<rider_phone>` to the URL.

### What we need to know from the native dev

1. **What phone format will be passed?** — 10 digits (`9876543210`), with country code (`919876543210`), or with `+` (`+919876543210`)? We need to match against what Supabase stores.

2. **Should we hide the status card / earnings section if no phone is passed?** — Or show a generic "Share to climb the leaderboard" message instead of fake data?

### How the web side will implement it

**New API endpoint:** `GET /api/user-rank?phone=9876543210`
- Queries full leaderboard in Supabase (not just top 10) to find rider's rank + referral count
- Returns: `{ rank, name, referrals, found }`

**New hook:** `useCurrentUser()`
- Reads `phone` from URL search params
- Calls `/api/user-rank` to get real data
- Replaces hardcoded mock `currentUser` across components

**Leaderboard changes:**
- Match phone in top 10 → highlight row with "YOU" badge
- Phone not in top 10 → show extra row at bottom: "You — Rank #47 — 2 referrals"

**Components updated:**
- `LeaderboardSectionV2` — highlight current user, show "You" row
- `StatusCardV2` — show real rank and referral count
- `PrizesSectionV2` — show real milestone progress

---

## Summary for native dev

| Task | What native dev needs to do | What web dev needs to know |
|------|---------------------------|--------------------------|
| **CTA Deep Link** | Tell us how the webview can communicate back to the app (JS bridge? URL scheme? close webview?) | The exact method/scheme to use |
| **Phone in URL** | Append `?phone=<rider_phone>` when opening the webview | Phone number format stored in your DB |
