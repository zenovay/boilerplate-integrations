<script lang="ts">
  import { afterNavigate } from '$app/navigation'
  import { env } from '$env/dynamic/public'
  import { onMount } from 'svelte'
  import {
    createSpaPageviewTracker,
    installZenovay,
    trackingCodeFromEnv,
  } from '@zenovay/integration-core'

  let notify: ReturnType<typeof createSpaPageviewTracker> | undefined

  onMount(() => {
    installZenovay({
      trackingCode: trackingCodeFromEnv(
        env.PUBLIC_ZENOVAY_TRACKING_CODE,
        'PUBLIC_ZENOVAY_TRACKING_CODE',
      ),
      cookieless: true,
    })
    notify = createSpaPageviewTracker()
  })

  afterNavigate(({ to }) => {
    if (to) notify?.(`${to.url.pathname}${to.url.search}${to.url.hash}`)
  })
</script>

<slot />
