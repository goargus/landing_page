const BEACON_SELECTOR = 'script[src*="cloudflareinsights.com"]'

export function isAnalyticsEnabled () {
  if (typeof document === 'undefined') return false

  return document.querySelector(BEACON_SELECTOR) !== null
}

export function trackFormSubmission (path = '/contact/submitted') {
  if (!isAnalyticsEnabled()) return
  if (typeof window === 'undefined' || typeof window.history?.pushState !== 'function') return

  const currentPath = window.location.pathname + window.location.search
  window.history.pushState({}, '', path)
  window.history.pushState({}, '', currentPath)
}
