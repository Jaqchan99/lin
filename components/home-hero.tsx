import Image from 'next/image'
import Link from 'next/link'
import type { Cocktail } from '@/lib/cocktails'

type HomeHeroProps = {
  cocktail: Cocktail
  index: number
}

export function HomeHero({ cocktail, index }: HomeHeroProps) {
  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto w-full max-w-[1440px] px-5 pt-10 pb-20 sm:px-10 sm:pt-16 sm:pb-28 lg:px-16 lg:pt-20 lg:pb-32"
    >
      <div className="grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="flex flex-col gap-10 lg:col-span-7 lg:gap-14">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] tracking-[0.2em] uppercase">
            <span>Bartender / Mixologist</span>
            <span aria-hidden className="h-px w-8 bg-ink" />
            <span className="tracking-[0.2em] text-ink-soft">調酒師</span>
          </p>

          <h1
            id="hero-title"
            className="font-wide text-[clamp(5.5rem,17vw,15rem)] leading-[0.82] font-extrabold tracking-[-0.04em]"
          >
            LIN
          </h1>

          <div className="flex max-w-[34rem] flex-col gap-6">
            <p className="text-xl leading-relaxed font-light sm:text-2xl">
              我是 LIN，一位調酒師。把每一杯酒的顏色、杯型與裝飾，畫成一張水彩，再寫下它的配方。
            </p>
            <p className="text-sm leading-[1.9] text-ink-soft">
              這裡是我的個人作品集，也是一份持續增添的雞尾酒檔案。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/collection"
              className="group inline-flex h-12 items-center gap-3 bg-ink px-7 text-sm tracking-[0.12em] text-white transition-colors outline-offset-4 hover:bg-ink/85 focus-visible:outline-2 focus-visible:outline-ink"
            >
              瀏覽作品集
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <Link
              href="/#about"
              className="text-sm tracking-[0.12em] underline-offset-[6px] hover:underline"
            >
              關於我
            </Link>
          </div>
        </div>

        <figure className="lg:col-span-5">
          <Link
            href={`/cocktail/${cocktail.slug}`}
            className="group block outline-offset-8 focus-visible:outline-2 focus-visible:outline-ink"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-mist">
              <Image
                src={cocktail.artwork}
                alt={cocktail.artworkAlt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
              />
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between gap-4 text-[11px] tracking-[0.16em] uppercase">
              <span className="font-wide font-bold tracking-[0.04em]">
                {cocktail.name}
              </span>
              <span className="text-ink-soft tabular-nums">
                {`Nº ${String(index + 1).padStart(2, '0')}`}
              </span>
            </figcaption>
          </Link>
        </figure>
      </div>
    </section>
  )
}
