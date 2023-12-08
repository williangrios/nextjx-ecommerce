import type { Metadata } from 'next'
import './globals.css'
import ThemeProvider from '@/providers/ThemeProvider'
import LayoutProvider from '@/providers/LayoutProvider'
import StoreProvider from '@/providers/StoreProvider'

export const metadata: Metadata = {
  title: 'Ecommerce Next.js',
  description: 'Created by Willian Rios',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/remixicon@3.6.0/fonts/remixicon.css" rel="stylesheet"></link>
      </head>
      <body>
        <StoreProvider>
          <ThemeProvider>
            <LayoutProvider>
              {children}
            </LayoutProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
