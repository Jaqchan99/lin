import { CocktailCard } from '@/components/cocktail-card'
import { Masthead } from '@/components/masthead'
import { cocktails } from '@/lib/cocktails'

export default function Page() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-5 sm:px-10 lg:px-16">
      <Masthead count={cocktails.length} />

      <main className="flex-1 pb-24 sm:pb-32">
        <h2 className="sr-only">酒款档案</h2>
        <ul className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-14 lg:gap-y-24">
          {cocktails.map((cocktail, index) => (
            <li
              key={cocktail.id}
              className="mx-auto w-full max-w-[460px] sm:max-w-none"
            >
              <CocktailCard
                cocktail={cocktail}
                index={index}
                priority={index < 3}
              />
            </li>
          ))}
        </ul>
      </main>

      <footer className="flex flex-col gap-2 border-t border-ink/15 py-6 text-[11px] tracking-[0.14em] text-ink-soft uppercase sm:flex-row sm:justify-between">
        <span>LIN — Cocktail Archive</span>
        <span>示意插画 · 配方仅供参考</span>
      </footer>
    </div>
  )
}
