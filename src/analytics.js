export function isAnalyticsEnabled () {
  return Boolean(import.meta.env.VITE_CF_BEACON_TOKEN)
}

export function trackFormSubmission (path = '/contact/submitted') {
  if (!isAnalyticsEnabled()) return
  if (typeof window === 'undefined' || typeof window.history?.pushState !== 'function') return

  const currentPath = window.location.pathname + window.location.search
  window.history.pushState({}, '', path)
  window.history.pushState({}, '', currentPath)
}
