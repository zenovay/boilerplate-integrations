import { JSDOM } from 'jsdom'

export interface BrowserHarness {
  document: Document
  window: Window
  cleanup(): void
}

export function installBrowserHarness(
  url = 'https://example.test/',
): BrowserHarness {
  const dom = new JSDOM(
    '<!doctype html><html><head></head><body></body></html>',
    {
      url,
    },
  )

  const previousWindow = globalThis.window
  const previousDocument = globalThis.document
  Object.assign(globalThis, {
    window: dom.window,
    document: dom.window.document,
  })

  return {
    document: dom.window.document,
    window: dom.window as unknown as Window,
    cleanup() {
      dom.window.close()
      Object.assign(globalThis, {
        window: previousWindow,
        document: previousDocument,
      })
    },
  }
}
