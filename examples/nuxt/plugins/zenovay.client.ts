import {
  createSpaPageviewTracker,
  installZenovay,
  trackingCodeFromEnv,
} from '@zenovay/integration-core'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  installZenovay({
    trackingCode: trackingCodeFromEnv(
      config.public.zenovayTrackingCode,
      'NUXT_PUBLIC_ZENOVAY_TRACKING_CODE',
    ),
    cookieless: true,
  })

  const notify = createSpaPageviewTracker()
  nuxtApp.hook('page:finish', () => {
    notify(`${location.pathname}${location.search}${location.hash}`)
  })
})
