import { describe, it, expect, vi, afterEach } from 'vitest'
import { isAnalyticsEnabled, trackFormSubmission } from '../analytics.js'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
  window.history.replaceState({}, '', '/contact')
})

describe('isAnalyticsEnabled', () => {
  it('is false when no beacon token is configured', () => {
    vi.stubEnv('VITE_CF_BEACON_TOKEN', '')
    expect(isAnalyticsEnabled()).toBe(false)
  })

  it('is true when a beacon token is configured', () => {
    vi.stubEnv('VITE_CF_BEACON_TOKEN', 'test-token')
    expect(isAnalyticsEnabled()).toBe(true)
  })
})

describe('trackFormSubmission', () => {
  it('does nothing when analytics is disabled', () => {
    vi.stubEnv('VITE_CF_BEACON_TOKEN', '')
    const pushState = vi.spyOn(window.history, 'pushState')

    trackFormSubmission()

    expect(pushState).not.toHaveBeenCalled()
  })

  it('pushes a virtual pageview and returns to the current path when enabled', () => {
    vi.stubEnv('VITE_CF_BEACON_TOKEN', 'test-token')
    window.history.replaceState({}, '', '/contact')
    const pushState = vi.spyOn(window.history, 'pushState')

    trackFormSubmission('/contact/submitted')

    expect(pushState).toHaveBeenCalledTimes(2)
    expect(pushState).toHaveBeenNthCalledWith(1, {}, '', '/contact/submitted')
    expect(pushState).toHaveBeenNthCalledWith(2, {}, '', '/contact')
  })

  it('defaults the virtual path to /contact/submitted', () => {
    vi.stubEnv('VITE_CF_BEACON_TOKEN', 'test-token')
    window.history.replaceState({}, '', '/contact')
    const pushState = vi.spyOn(window.history, 'pushState')

    trackFormSubmission()

    expect(pushState).toHaveBeenNthCalledWith(1, {}, '', '/contact/submitted')
  })
})
