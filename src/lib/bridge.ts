/* eslint-disable @typescript-eslint/no-explicit-any */

/** Phone number from the Bounce app bridge, e.g. "+919876543210". Null if not in webview. */
export function getBridgePhone(): string | null {
  if (typeof window === 'undefined') return null
  return (window as any).BounceDailyData?.phoneNumber ?? null
}

/** True when running inside the Bounce Daily app webview. */
export function isInApp(): boolean {
  if (typeof window === 'undefined') return false
  return typeof (window as any).BounceDailyBridge !== 'undefined'
}

/** Extract last 10 digits from a phone string for comparison. */
export function normalizeLast10(phone: string): string {
  return phone.replace(/\D/g, '').slice(-10)
}
