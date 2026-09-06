import { describe, it, expect, vi, afterEach } from 'vitest'
import { isAnalyticsEnabled, trackFormSubmission } from '../analytics.js'

const BEACON_SRC = 'https://static.cloudflareinsights.com/beacon.min.js/v31edd6df95cf4e85bb4c19e7a9bdbcba1788362987495'

function addBeacon () {
  const script = document.createElement('script')
  script.src = BEACON_SRC
  document.head.appendChild(script)

  return script
}

afterEach(() => {
  document.querySelectorAll('script[src*="cloudflareinsights.com"]').forEach((node) => node.remove())
  vi.restoreAllMocks()
  window.history.replaceState({}, '', '/contact')
})

describe('isAnalyticsEnabled', () => {
  it('is false when the beacon is absent from the page', () => {
    expect(isAnalyticsEnabled()).toBe(false)
  })

  it('is true when the beacon script is on the page', () => {
    addBeacon()

    expect(isAnalyticsEnabled()).toBe(true)
  })
})

describe('trackFormSubmission', () => {
  it('does nothing when the beacon is absent', () => {
    const pushState = vi.spyOn(window.history, 'pushState')

    trackFormSubmission()

    expect(pushState).not.toHaveBeenCalled()
  })

  it('pushes a virtual pageview and returns to the current path', () => {
    addBeacon()
    window.history.replaceState({}, '', '/contact')
    const pushState = vi.spyOn(window.history, 'pushState')

    trackFormSubmission('/contact/submitted')

    expect(pushState).toHaveBeenCalledTimes(2)
    expect(pushState).toHaveBeenNthCalledWith(1, {}, '', '/contact/submitted')
    expect(pushState).toHaveBeenNthCalledWith(2, {}, '', '/contact')
  })

  it('defaults the virtual path to /contact/submitted', () => {
    addBeacon()
    window.history.replaceState({}, '', '/contact')
    const pushState = vi.spyOn(window.history, 'pushState')

    trackFormSubmission()

    expect(pushState).toHaveBeenNthCalledWith(1, {}, '', '/contact/submitted')
  })

  it('leaves the visitor on the real path afterwards', () => {
    addBeacon()
    window.history.replaceState({}, '', '/contact')

    trackFormSubmission()

    expect(window.location.pathname).toBe('/contact')
  })
})
