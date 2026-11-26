import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Archivo, Cormorant_Garamond, Jost, Noto_Sans_TC } from 'next/font/google'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  weight: ['300', '400'],
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
})

const notoSansTC = Noto_Sans_TC({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-noto-tc',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: {
    default: 'LIN — Cocktail Archive',
    template: '%s — LIN',
  },
  description:
    'LIN 的個人作品集：一位調酒師與 Mixologist 的水彩雞尾酒檔案，收錄配方、風味與創作筆記。',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-Hant" className={`${archivo.variable} ${cormorant.variable} ${jost.variable} ${notoSansTC.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
