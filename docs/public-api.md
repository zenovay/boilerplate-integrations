# Zenovay public integration surface

This repository deliberately stays thin. The canonical tracker is maintained
and served by Zenovay; integrations load it rather than copy it.

## Install surfaces

Script tag:

```html
<script
  defer
  data-id="ZV_REPLACE_WITH_YOUR_CODE"
  data-cookieless="true"
  src="https://api.zenovay.com/z.js"
></script>
```

npm:

```ts
import { init } from '@zenovay/tracker'

init('ZV_REPLACE_WITH_YOUR_CODE', { cookieless: true })
```

The dashboard's **Allow Localhost** setting controls local event ingestion.
For first-party tracking, copy the generated custom-domain snippet from the
site's Zenovay settings.

## Browser commands

```ts
window.zenovay?.('track', 'pricing_cta_clicked', { plan: 'pro' })
window.zenovay?.('page')
window.zenovay?.('identify', user.id, { email: user.email })
window.zenovay?.('goal', 'signup_completed')
window.zenovay?.('revenue', 49, 'USD', { order_id: order.id })
```

The npm wrapper exports matching helpers. Event names and properties are
chosen by the integrating application; they are not a fixed Zenovay schema.

## Verification

Use a non-production site when testing. In DevTools, confirm that the script
loads once and that navigation or event calls create one expected request.
Then use Zenovay's install verification or Live View. Automated tests in this
repository use a DOM mock and never submit production events.
