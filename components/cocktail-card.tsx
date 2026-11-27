import Image from 'next/image'
import Link from 'next/link'
import type { Cocktail, TitleVariant } from '@/lib/cocktails'
import { cn } from '@/lib/utils'

const titleVariants: Record<
  TitleVariant,
  { className: string; width: number }
> = {
  bold: {
    className: 'font-wide font-extrabold tracking-[-0.02em]',
    width: 0.86,
  },
  light: {
    className: 'font-wide font-light tracking-[0.02em]',
    width: 0.86,
  },
  serif: {
    className:
      "font-medium tracking-[0.04em] [font-family:var(--font-cormorant),serif]",
    width: 0.72,
  },
  geometric: {
    className:
      "font-light tracking-[0.1em] [font-family:var(--font-jost),sans-serif]",
    width: 0.8,
  },
}

type CocktailCardProps = {
  cocktail: Cocktail
  index: number
  priority?: boolean
  className?: string
  titleVariant?: TitleVariant
  /** When provided the whole card becomes a link to this route. */
  href?: string
}

/**
 * Title size is derived from the longest line so every name fills roughly
 * the same measure of the card regardless of length. Units are container
 * query widths (cqw), so the whole card scales as one printed object.
 */
function getTitleLayout(name: string, widthFactor: number) {
  const words = name.toUpperCase().split(' ')
  const lines = words.length > 1 ? words : [words[0]]
  const longest = Math.max(...lines.map((line) => line.length))
  const size = Math.min(13, 74 / (longest * widthFactor))
  return { lines, size }
}

function formatRecipe(cocktail: Cocktail) {
  return cocktail.ingredients
    .map(({ measure, name }) => `${measure} ${name}.`)
    .join(' ')
    .toUpperCase()
}

export function CocktailCard({
  cocktail,
  index,
  priority = false,
  className,
  titleVariant = cocktail.titleVariant ?? 'bold',
  href,
}: CocktailCardProps) {
  const variant = titleVariants[titleVariant]
  const { lines, size } = getTitleLayout(cocktail.name, variant.width)
  const number = String(index + 1).padStart(2, '0')

  const card = (
    <article
      className={cn(
        '@container group aspect-[17/24] w-full bg-paper paper-shadow',
        'transition-[box-shadow,translate] duration-500 ease-out',
        'motion-safe:hover:-translate-y-1 hover:paper-shadow-lifted',
        className,
      )}
      aria-labelledby={`cocktail-${cocktail.id}`}
    >
      <div className="flex h-full flex-col items-center px-[19cqw]">
        <header className="flex h-[22cqw] w-[100cqw] items-center justify-center pt-[9cqw]">
          <h2
            id={`cocktail-${cocktail.id}`}
            className={cn("text-center leading-[0.98] text-ink", variant.className)}
            style={{ fontSize: `${size}cqw` }}
          >
            {lines.map((line) => (
              <span key={line} className="block whitespace-nowrap">
                {line}
              </span>
            ))}
          </h2>
        </header>

        <div className="relative mt-[10cqw] aspect-[4/5] w-[62cqw] shrink-0">
          <div className="absolute inset-0 overflow-hidden bg-mist">
            {cocktail.artwork ? (
              <Image
                src={cocktail.artwork}
                alt={cocktail.artworkAlt}
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 80vw"
                priority={priority}
                className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.035]"
              />
            ) : (
              <div className="flex h-full items-center justify-center border border-dashed border-ink/25 text-[2.2cqw] tracking-[0.2em] text-ink-soft">
                尚未加入水彩插畫
              </div>
            )}
          </div>
          <p className="absolute top-0 left-[calc(100%+3.4cqw)] font-wide text-[2cqw] leading-none font-semibold tracking-[0.07em] whitespace-nowrap text-ink [writing-mode:vertical-rl]">
            {formatRecipe(cocktail)}
          </p>
        </div>

        <footer className="mt-auto flex w-[62cqw] items-end justify-between gap-[3cqw] pb-[7cqw]">
          <ol className="flex flex-col gap-[0.5cqw] text-[2.15cqw] leading-[1.38] text-ink">
            {cocktail.method.map((step, stepIndex) => (
              <li key={step} className="flex gap-[1cqw]">
                <span aria-hidden className="tabular-nums">
                  {stepIndex + 1}.
                </span>
                <span className="max-w-[34cqw]">{step}</span>
              </li>
            ))}
          </ol>
          <div className="flex shrink-0 flex-col items-end gap-[1cqw]">
            <span className="text-[1.8cqw] font-medium tracking-[0.12em] text-ink-soft tabular-nums">
              {`Nº ${number}`}
            </span>
            <span className="font-wide text-[5.2cqw] leading-none font-extrabold tracking-[0.01em] text-ink">
              LIN
            </span>
          </div>
        </footer>
      </div>
    </article>
  )

  if (!href) return card

  return (
    <Link
      href={href}
      aria-label={`${cocktail.name} — 查看詳情`}
      className="block outline-offset-8 focus-visible:outline-2 focus-visible:outline-ink"
    >
      {card}
    </Link>
  )
}
