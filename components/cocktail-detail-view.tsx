'use client'

import Link from 'next/link'
import { CocktailDetail } from '@/components/cocktail-detail'
import { CocktailPager } from '@/components/cocktail-pager'
import { useCocktails } from '@/hooks/use-cocktails'
import { findBySlug, getAdjacent } from '@/lib/cocktails'

export function CocktailDetailView({ slug }: { slug: string }) {
  const { published } = useCocktails()
  const cocktail = findBySlug(published, slug)

  if (!cocktail) {
    return (
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-6 px-5 py-32 sm:px-10 lg:px-16">
        <p className="text-[11px] tracking-[0.2em] text-ink-soft uppercase">
          Not found
        </p>
        <h1 className="text-4xl font-medium tracking-[0.04em] sm:text-5xl">
          找不到這款雞尾酒
        </h1>
        <p className="max-w-[28rem] text-sm leading-[1.9] text-ink-soft">
          它可能尚未發佈，或網址已經變更。
        </p>
        <Link
          href="/collection"
          className="text-sm tracking-[0.12em] underline underline-offset-[6px]"
        >
          返回作品集
        </Link>
      </div>
    )
  }

  const { prev, next } = getAdjacent(published, slug)

  return (
    <>
      <CocktailDetail
        cocktail={cocktail}
        index={published.indexOf(cocktail)}
        total={published.length}
      />
      {published.length > 1 && <CocktailPager prev={prev} next={next} />}
    </>
  )
}
