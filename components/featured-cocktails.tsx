import Link from 'next/link'
import { CocktailCard } from '@/components/cocktail-card'
import { SectionHeading } from '@/components/section-heading'
import { cocktails, getFeaturedCocktails } from '@/lib/cocktails'

export function FeaturedCocktails() {
  const featured = getFeaturedCocktails()

  return (
    <section
      aria-labelledby="featured-title"
      className="mx-auto w-full max-w-[1440px] px-5 pb-24 sm:px-10 sm:pb-32 lg:px-16"
    >
      <SectionHeading
        id="featured-title"
        title="精選作品"
        eyebrow="Selected"
        action={{ label: '全部作品', href: '/collection' }}
      />

      <ul className="mt-12 grid grid-cols-1 gap-12 sm:mt-16 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-14">
        {featured.map((cocktail, position) => (
          <li
            key={cocktail.id}
            className="mx-auto w-full max-w-[460px] sm:max-w-none sm:[&:last-child:nth-child(odd)]:col-span-2 sm:[&:last-child:nth-child(odd)]:mx-auto sm:[&:last-child:nth-child(odd)]:w-[calc(50%-1.25rem)] lg:[&:last-child:nth-child(odd)]:col-span-1 lg:[&:last-child:nth-child(odd)]:w-full"
          >
            <CocktailCard
              cocktail={cocktail}
              index={cocktails.indexOf(cocktail)}
              href={`/cocktail/${cocktail.slug}`}
              priority={position === 0}
            />
          </li>
        ))}
      </ul>

      <div className="mt-16 flex justify-center sm:mt-20">
        <Link
          href="/collection"
          className="group inline-flex h-12 items-center gap-3 border border-ink px-7 text-sm tracking-[0.12em] transition-colors outline-offset-4 hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-ink"
        >
          {`查看全部 ${String(cocktails.length).padStart(2, '0')} 款作品`}
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </section>
  )
}
