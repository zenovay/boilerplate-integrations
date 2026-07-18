import { Suspense, type ReactNode } from 'react'
import { ZenovayProvider } from './zenovay-provider'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}>
          <ZenovayProvider />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
