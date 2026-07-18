import {
  disable,
  enable,
  goal,
  identify,
  init,
  page,
  revenue,
  track,
} from '@zenovay/tracker'
import type { InitOptions } from '@zenovay/tracker'

export { disable, enable, goal, identify, revenue, track }

export interface InstallOptions extends Omit<InitOptions, 'allowLocalhost'> {
  trackingCode: string
}

/**
 * Loads the official @zenovay/tracker package once.
 *
 * Localhost ingestion is controlled by the website setting in Zenovay. This
 * integration intentionally omits the wrapper's legacy allowLocalhost option
 * so a code attribute cannot be mistaken for server-side permission.
 */
export function installZenovay({
  trackingCode,
  ...options
}: InstallOptions): void {
  assertTrackingCode(trackingCode)
  init(trackingCode, options)
}

/**
 * Returns a navigation notifier that skips the initial URL and repeated URLs.
 * The tracker records the initial page view when it loads, so emitting it again
 * from a router hook would double count.
 */
export function createSpaPageviewTracker(initialUrl?: string) {
  let previousUrl = initialUrl ?? currentUrl()

  return (nextUrl: string): boolean => {
    if (!nextUrl || nextUrl === previousUrl) return false
    previousUrl = nextUrl
    page()
    return true
  }
}

export function trackingCodeFromEnv(
  value: string | undefined,
  name: string,
): string {
  if (!value || value === 'ZV_REPLACE_WITH_YOUR_CODE') {
    throw new Error(`${name} is required`)
  }

  assertTrackingCode(value)
  return value
}

function assertTrackingCode(value: string): void {
  if (!value.startsWith('ZV_') || value.length <= 3 || /\s/.test(value)) {
    throw new Error(
      'Use the public ZV_ tracking code from the Zenovay dashboard',
    )
  }
}

function currentUrl(): string {
  if (typeof window === 'undefined') return ''
  return `${window.location.pathname}${window.location.search}${window.location.hash}`
}
