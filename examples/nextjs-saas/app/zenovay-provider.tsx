'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  createSpaPageviewTracker,
  installZenovay,
  trackingCodeFromEnv,
} from '@zenovay/integration-core'

export function ZenovayProvider() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const notifyRef = useRef<ReturnType<typeof createSpaPageviewTracker> | null>(
    null,
  )

  useEffect(() => {
    installZenovay({
      trackingCode: trackingCodeFromEnv(
        process.env.NEXT_PUBLIC_ZENOVAY_TRACKING_CODE,
        'NEXT_PUBLIC_ZENOVAY_TRACKING_CODE',
      ),
      cookieless: true,
    })
    notifyRef.current = createSpaPageviewTracker()
  }, [])

  useEffect(() => {
    const query = searchParams.toString()
    notifyRef.current?.(`${pathname}${query ? `?${query}` : ''}`)
  }, [pathname, searchParams])

  return null
}
