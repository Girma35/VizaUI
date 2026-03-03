/**
 * Referral tracking: persist ref code in cookie so registration can attribute signup.
 * Use ?ref=CODE in marketing links; read on server or client and store in cookie.
 */
export const REFERRAL_COOKIE = 'viza_ref'
export const REFERRAL_COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

export function getReferralFromSearchParams(searchParams: URLSearchParams): string | null {
  const ref = searchParams.get('ref') ?? searchParams.get('referral') ?? searchParams.get('utm_content')
  return ref?.trim() || null
}
