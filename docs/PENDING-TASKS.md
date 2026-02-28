# Referral Raja — Pending Tasks

> **Context:** The Referral Raja site (`bounce-referral-raja.vercel.app`) is embedded as a webview inside the Bounce app's "Refer" tab.

---

## ~~Task 1: CTA Deep Link~~ ✅ RESOLVED

**Resolution:** The Bounce Daily app provides `window.BounceDailyBridge.postMessage()` (see `webview_bridge.md`). The CTA uses `BounceDailyBridge.postMessage({ action: 'navigate', route: '/?tab=referral' })` in-app, and falls back to `bouncedaily:///?tab=referral` deep link in external browsers. Implemented in `src/lib/deeplink.ts`. CTA is now visible on production.

---

## ~~Task 2: Phone Number~~ ✅ RESOLVED

**Resolution:** The Bounce Daily app injects `window.BounceDailyData.phoneNumber` (see `webview_bridge.md`) — no URL parameter needed. The leaderboard reads the phone from the bridge, highlights the user's row if in top 5, and fetches their rank via `/api/user-rank` if not. URL `?phone=` param is still supported as a fallback.

---

No pending tasks remain.
