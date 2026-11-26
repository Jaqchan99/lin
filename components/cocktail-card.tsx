import Image from 'next/image'
import type { Cocktail } from '@/lib/cocktails'
import { cn } from '@/lib/utils'

type CocktailCardProps = {
  cocktail: Cocktail
  index: number
  priority?: boolean
  className?: string
}

/**
 * Title size is derived from the longest line so every name fills roughly
 * the same measure of the card regardless of length. Units are container
 * query widths (cqw), so the whole card scales as one printed object.
 */
function getTitleLayout(name: string) {
  const words = name.toUpperCase().split(' ')
  const lines = words.length > 1 ? words : [words[0]]
  const longest = Math.max(...lines.map((line) => line.length))
  const size = Math.min(13, 74 / (longest * 0.86))
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
}: CocktailCardProps) {
  const { lines, size } = getTitleLayout(cocktail.name)
  const number = String(index + 1).padStart(2, '0')

  return (
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
            className="font-wide text-center font-extrabold leading-[0.98] tracking-[-0.02em] text-ink"
            style={{ fontSize: `${size}cqw` }}
          >
            {lines.map((line) => (
              <span key={line} className="block whitespace-nowrap">
                {line}
              </span>
            ))}
          </h2>
        </header>

        <div className="relative mt-[10cqw] aspect-[4/5] w-[62cqw] shrink-0 overflow-hidden bg-blush">
          <Image
            src={cocktail.artwork}
            alt={cocktail.artworkAlt}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 80vw"
            priority={priority}
            className="object-cover"
          />
          <p
            className="absolute top-0 left-[calc(100%+3.4cqw)] font-wide text-[2cqw] leading-none font-semibold tracking-[0.07em] whitespace-nowrap text-ink [writing-mode:vertical-rl]"
          >
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
}
