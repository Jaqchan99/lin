import Link from 'next/link'

export function StudioHeader() {
  return (
    <header className="bg-ink text-white">
      <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center justify-between px-5 sm:px-10 lg:px-16">
        <Link
          href="/studio"
          aria-label="LIN Studio — 回到作品管理"
          className="flex items-baseline gap-3 outline-offset-4 focus-visible:outline-2 focus-visible:outline-white"
        >
          <span className="font-wide text-lg font-extrabold tracking-[0.02em]">
            LIN
          </span>
          <span className="text-[11px] tracking-[0.24em] uppercase opacity-70">
            Studio
          </span>
        </Link>
        <nav aria-label="工作室選單">
          <ul className="flex items-center gap-6 text-sm tracking-[0.08em] sm:gap-8">
            <li>
              <Link
                href="/studio"
                className="underline-offset-4 outline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-white"
              >
                作品管理
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="underline-offset-4 outline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-white"
              >
                返回網站 <span aria-hidden>↗</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
