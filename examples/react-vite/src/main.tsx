import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import {
  goal,
  identify,
  installZenovay,
  revenue,
  track,
  trackingCodeFromEnv,
} from '@zenovay/integration-core'

function App() {
  useEffect(() => {
    installZenovay({
      trackingCode: trackingCodeFromEnv(
        import.meta.env.VITE_ZENOVAY_TRACKING_CODE,
        'VITE_ZENOVAY_TRACKING_CODE',
      ),
      cookieless: true,
    })
  }, [])

  return (
    <main>
      <h1>React + Vite</h1>
      <button onClick={() => track('pricing_cta_clicked', { plan: 'pro' })}>
        Track custom event
      </button>
      <button onClick={() => goal('signup_completed')}>Track signup</button>
      <button onClick={() => identify('user_example', { plan: 'pro' })}>
        Identify example user
      </button>
      <button onClick={() => revenue(49, 'USD', { order_id: 'order_example' })}>
        Track example revenue
      </button>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
