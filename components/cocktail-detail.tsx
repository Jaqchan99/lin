import Image from 'next/image'
import Link from 'next/link'
import { PlaceholderNote } from '@/components/placeholder-note'
import type { Cocktail } from '@/lib/cocktails'

type CocktailDetailProps = {
  cocktail: Cocktail
  index: number
  total: number
}

function DetailSection({
  id,
  title,
  eyebrow,
  placeholder,
  children,
}: {
  id: string
  title: string
  eyebrow: string
  placeholder?: boolean
  children: React.ReactNode
}) {
  return (
    <section
      aria-labelledby={id}
      className="grid gap-4 border-t border-rule py-8 sm:grid-cols-[8rem_1fr] sm:gap-8"
    >
      <div className="flex flex-col gap-1">
        <h2 id={id} className="text-base font-medium tracking-[0.06em]">
          {title}
        </h2>
        <span className="text-[11px] tracking-[0.16em] text-ink-soft uppercase">
          {eyebrow}
        </span>
      </div>
      <div className="flex flex-col items-start gap-4">
        {children}
        {placeholder && <PlaceholderNote />}
      </div>
    </section>
  )
}

function FlavorMeter({ label, value }: { label: string; value: number }) {
  return (
    <div className="grid grid-cols-[3rem_1fr] items-center gap-4 text-sm">
      <dt className="text-ink-soft">{label}</dt>
      <dd
        role="img"
        aria-label={`${label} ${value} / 5`}
        className="flex items-center gap-1.5"
      >
        {Array.from({ length: 5 }, (_, step) => (
          <span
            key={step}
            aria-hidden
            className={step < value ? 'h-2 w-8 bg-ink' : 'h-2 w-8 bg-rule'}
          />
        ))}
      </dd>
    </div>
  )
}

export function CocktailDetail({ cocktail, index, total }: CocktailDetailProps) {
  const number = String(index + 1).padStart(2, '0')

  return (
    <article className="mx-auto w-full max-w-[1440px] px-5 pt-8 pb-20 sm:px-10 sm:pt-12 sm:pb-28 lg:px-16">
      <Link
        href="/collection"
        className="group inline-flex items-center gap-2 text-sm tracking-[0.1em] text-ink-soft transition-colors hover:text-ink"
      >
        <span
          aria-hidden
          className="transition-transform group-hover:-translate-x-1"
        >
          ←
        </span>
        返回作品集
      </Link>

      <div className="mt-8 grid gap-12 sm:mt-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-24">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-mist">
              <Image
                src={cocktail.artwork}
                alt={cocktail.artworkAlt}
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 flex justify-between text-[11px] tracking-[0.16em] text-ink-soft uppercase tabular-nums">
              <span>Watercolor Illustration</span>
              <span>{`Nº ${number} / ${String(total).padStart(2, '0')}`}</span>
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <header className="flex flex-col gap-6 pb-10">
            <p className="text-[11px] tracking-[0.2em] text-ink-soft uppercase">
              {`Cocktail Archive — Nº ${number}`}
            </p>
            <h1 className="font-wide text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[0.95] font-extrabold tracking-[-0.02em] text-balance uppercase">
              {cocktail.name}
            </h1>
            <p className="max-w-[30rem] text-lg leading-[1.8] font-light">
              {cocktail.intro}
            </p>
          </header>

          <DetailSection id="ingredients-title" title="配方" eyebrow="Ingredients">
            <dl className="w-full">
              {cocktail.ingredients.map((ingredient) => (
                <div
                  key={ingredient.name}
                  className="flex items-baseline justify-between gap-6 border-b border-rule py-3 first:pt-0 last:border-b-0 last:pb-0"
                >
                  <dt className="font-wide text-sm font-semibold tracking-[0.04em] uppercase">
                    {ingredient.name}
                  </dt>
                  <dd className="text-sm tracking-[0.1em] text-ink-soft tabular-nums">
                    {ingredient.measure}
                  </dd>
                </div>
              ))}
            </dl>
            <ol className="flex flex-col gap-2 text-sm leading-relaxed">
              {cocktail.method.map((step, stepIndex) => (
                <li key={step} className="flex gap-3">
                  <span aria-hidden className="text-ink-soft tabular-nums">
                    {stepIndex + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </DetailSection>

          <DetailSection
            id="flavor-title"
            title="風味輪廓"
            eyebrow="Flavor Profile"
            placeholder={cocktail.isPlaceholder}
          >
            <dl className="flex w-full flex-col gap-3">
              {cocktail.flavor.map((axis) => (
                <FlavorMeter key={axis.label} {...axis} />
              ))}
            </dl>
          </DetailSection>

          <DetailSection
            id="taste-title"
            title="口感與質地"
            eyebrow="Taste & Texture"
            placeholder={cocktail.isPlaceholder}
          >
            <p className="text-sm leading-[1.9]">{cocktail.taste}</p>
          </DetailSection>

          <DetailSection
            id="story-title"
            title="靈感與創作故事"
            eyebrow="Inspiration"
            placeholder={cocktail.isPlaceholder}
          >
            <p className="text-sm leading-[1.9]">{cocktail.story}</p>
          </DetailSection>
        </div>
      </div>
    </article>
  )
}
