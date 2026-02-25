const REFERRAL_URL = 'https://bouncedaily.link/refer'

/* eslint-disable @typescript-eslint/no-explicit-any */
export function openReferralLink() {
  const win = window as any

  // Strategy 1: React Native WebView bridge
  try {
    if (win.ReactNativeWebView?.postMessage) {
      win.ReactNativeWebView.postMessage(JSON.stringify({ type: 'deeplink', url: REFERRAL_URL }))
      return
    }
  } catch { /* not available */ }

  // Strategy 2: iOS WKWebView message handler
  try {
    const handler = win.webkit?.messageHandlers?.bounce ?? win.webkit?.messageHandlers?.deeplink
    if (handler?.postMessage) {
      handler.postMessage({ type: 'deeplink', url: REFERRAL_URL })
      return
    }
  } catch { /* not available */ }

  // Strategy 3: Direct navigation — lets native webview client intercept
  window.location.href = REFERRAL_URL
}
