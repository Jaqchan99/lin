import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-rule bg-white">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-5 sm:px-10 lg:px-16">
        <Link
          href="/"
          aria-label="LIN — 回到首頁"
          className="font-wide text-lg font-extrabold tracking-[0.02em] outline-offset-4 focus-visible:outline-2 focus-visible:outline-ink"
        >
          LIN
        </Link>
        <SiteNav />
      </div>
    </header>
  )
}
