/* eslint-disable @typescript-eslint/no-explicit-any */
export function openReferralLink() {
  const win = window as any

  // Strategy 1: BounceDailyBridge (Flutter webview)
  if (win.BounceDailyBridge?.postMessage) {
    win.BounceDailyBridge.postMessage(JSON.stringify({
      action: 'navigate',
      route: '/?tab=referral',
    }))
    return
  }

  // Strategy 2: Deep link (external browser)
  window.location.href = 'bouncedaily:///?tab=referral'
}
