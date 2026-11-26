import type { Metadata } from 'next'
import { CocktailCard } from '@/components/cocktail-card'
import { cocktails } from '@/lib/cocktails'

export const metadata: Metadata = {
  title: '作品集',
  description: 'LIN 的雞尾酒作品集：六款水彩插畫與配方，點擊進入每一款的詳情。',
}

export default function CollectionPage() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-5 pt-10 pb-24 sm:px-10 sm:pt-16 sm:pb-32 lg:px-16 lg:pt-20">
      <header className="mb-14 grid gap-6 border-b border-ink pb-10 sm:mb-20 lg:grid-cols-12 lg:items-end">
        <div className="flex flex-col gap-4 lg:col-span-8">
          <p className="text-[11px] tracking-[0.2em] text-ink-soft uppercase">
            Collection
          </p>
          <h1 className="text-5xl font-medium tracking-[0.04em] sm:text-7xl">
            作品集
          </h1>
        </div>
        <div className="flex flex-col gap-2 lg:col-span-4 lg:items-end lg:text-right">
          <p className="max-w-[24rem] text-sm leading-[1.9] text-ink-soft">
            每一杯，一張水彩，一行配方。點擊卡片查看完整內容。
          </p>
          <p className="text-[11px] tracking-[0.18em] tabular-nums">
            {`${String(cocktails.length).padStart(2, '0')} 款收錄`}
          </p>
        </div>
      </header>

      <h2 className="sr-only">全部雞尾酒</h2>
      <ul className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-14 lg:gap-y-24">
        {cocktails.map((cocktail, index) => (
          <li
            key={cocktail.id}
            className="mx-auto w-full max-w-[460px] sm:max-w-none"
          >
            <CocktailCard
              cocktail={cocktail}
              index={index}
              href={`/cocktail/${cocktail.slug}`}
              priority={index < 3}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
