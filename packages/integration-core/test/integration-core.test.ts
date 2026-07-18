import { afterEach, describe, expect, it, vi } from 'vitest'
import { installBrowserHarness } from '../../test-utils/src/index.js'

afterEach(() => {
  vi.resetModules()
  Reflect.deleteProperty(globalThis, 'window')
  Reflect.deleteProperty(globalThis, 'document')
})

describe('integration core', () => {
  it('is safe during server-side rendering', async () => {
    const { installZenovay, track } = await import('../src/index.js')
    expect(() => installZenovay({ trackingCode: 'ZV_TEST_ONLY' })).not.toThrow()
    expect(() => track('server_render')).not.toThrow()
  })

  it('loads the official tracker once in cookieless mode', async () => {
    const harness = installBrowserHarness()
    const { installZenovay } = await import('../src/index.js')

    installZenovay({ trackingCode: 'ZV_TEST_ONLY', cookieless: true })
    installZenovay({ trackingCode: 'ZV_TEST_ONLY', cookieless: true })

    const scripts = harness.document.querySelectorAll('script[src*="/z.js"]')
    expect(scripts).toHaveLength(1)
    expect(scripts[0]?.getAttribute('data-id')).toBe('ZV_TEST_ONLY')
    expect(scripts[0]?.getAttribute('data-cookieless')).toBe('true')
    harness.cleanup()
  })

  it('skips the initial and duplicate SPA page views', async () => {
    const harness = installBrowserHarness('https://example.test/start')
    const { createSpaPageviewTracker } = await import('../src/index.js')
    const notify = createSpaPageviewTracker('/start')

    expect(notify('/start')).toBe(false)
    expect(notify('/pricing')).toBe(true)
    expect(notify('/pricing')).toBe(false)

    const queue = (harness.window.zenovay as { q?: unknown[][] } | undefined)?.q
    expect(queue).toEqual([['page']])
    harness.cleanup()
  })

  it('queues the actual custom-event, identify, goal, and revenue commands', async () => {
    const harness = installBrowserHarness()
    const { goal, identify, revenue, track } = await import('../src/index.js')

    track('signup_started', { plan: 'pro' })
    identify('user_test', { plan: 'pro' })
    goal('signup_completed')
    revenue(49, 'USD', { order_id: 'order_test' })

    const queue = (harness.window.zenovay as { q?: unknown[][] } | undefined)?.q
    expect(queue).toEqual([
      ['track', 'signup_started', { plan: 'pro' }],
      ['identify', 'user_test', { plan: 'pro' }],
      ['goal', 'signup_completed', {}],
      ['revenue', 49, 'USD', { order_id: 'order_test' }],
    ])
    harness.cleanup()
  })

  it('rejects missing and placeholder environment values', async () => {
    const { trackingCodeFromEnv } = await import('../src/index.js')
    expect(() =>
      trackingCodeFromEnv(undefined, 'PUBLIC_ZENOVAY_TRACKING_CODE'),
    ).toThrow()
    expect(() =>
      trackingCodeFromEnv(
        'ZV_REPLACE_WITH_YOUR_CODE',
        'PUBLIC_ZENOVAY_TRACKING_CODE',
      ),
    ).toThrow()
  })
})
