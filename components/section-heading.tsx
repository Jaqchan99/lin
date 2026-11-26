import Link from 'next/link'

type SectionHeadingProps = {
  id?: string
  title: string
  eyebrow: string
  action?: { label: string; href: string }
}

export function SectionHeading({
  id,
  title,
  eyebrow,
  action,
}: SectionHeadingProps) {
  return (
    <div className="flex items-end justify-between gap-6 border-t border-ink pt-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
        <h2 id={id} className="text-xl font-medium tracking-[0.06em] sm:text-2xl">
          {title}
        </h2>
        <span className="text-[11px] tracking-[0.18em] text-ink-soft uppercase">
          {eyebrow}
        </span>
      </div>
      {action && (
        <Link
          href={action.href}
          className="group shrink-0 text-sm tracking-[0.08em] underline-offset-4 hover:underline"
        >
          {action.label}
          <span
            aria-hidden
            className="ml-2 inline-block transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      )}
    </div>
  )
}
