import Link from 'next/link'
import type { Cocktail } from '@/lib/cocktails'

type CocktailPagerProps = {
  prev: Cocktail
  next: Cocktail
}

export function CocktailPager({ prev, next }: CocktailPagerProps) {
  return (
    <nav
      aria-label="作品導覽"
      className="mx-auto w-full max-w-[1440px] px-5 pb-24 sm:px-10 sm:pb-32 lg:px-16"
    >
      <div className="grid grid-cols-2 border-t border-ink">
        <Link
          href={`/cocktail/${prev.slug}`}
          rel="prev"
          className="group flex flex-col gap-3 border-r border-rule py-8 pr-4 sm:py-12 sm:pr-8"
        >
          <span className="text-[11px] tracking-[0.18em] text-ink-soft">
            <span
              aria-hidden
              className="mr-2 inline-block transition-transform group-hover:-translate-x-1"
            >
              ←
            </span>
            上一款
          </span>
          <span className="font-wide text-base leading-tight font-extrabold uppercase underline-offset-4 group-hover:underline sm:text-2xl lg:text-4xl">
            {prev.name}
          </span>
        </Link>
        <Link
          href={`/cocktail/${next.slug}`}
          rel="next"
          className="group flex flex-col items-end gap-3 py-8 pl-4 text-right sm:py-12 sm:pl-8"
        >
          <span className="text-[11px] tracking-[0.18em] text-ink-soft">
            下一款
            <span
              aria-hidden
              className="ml-2 inline-block transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </span>
          <span className="font-wide text-base leading-tight font-extrabold uppercase underline-offset-4 group-hover:underline sm:text-2xl lg:text-4xl">
            {next.name}
          </span>
        </Link>
      </div>
      <div className="flex justify-center border-t border-rule py-6">
        <Link
          href="/collection"
          className="text-sm tracking-[0.12em] underline-offset-[6px] hover:underline"
        >
          返回作品集
        </Link>
      </div>
    </nav>
  )
}
