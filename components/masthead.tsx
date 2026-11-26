type MastheadProps = {
  count: number
}

export function Masthead({ count }: MastheadProps) {
  return (
    <header className="flex flex-col gap-10 pt-8 pb-16 sm:pt-10 sm:pb-24">
      <div className="flex items-baseline justify-between border-b border-ink/15 pb-4 text-[11px] tracking-[0.14em] uppercase">
        <span className="font-wide font-extrabold tracking-[0.04em]">LIN</span>
        <span className="text-ink-soft">Vol. 01</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <h1 className="font-wide text-[clamp(2.6rem,9.5vw,8.5rem)] leading-[0.92] font-extrabold tracking-[-0.03em] lg:col-span-9">
          LIN
          <span className="block text-[0.42em] leading-[1.15] tracking-[-0.01em]">
            Cocktail Archive
          </span>
        </h1>
        <div className="flex flex-col gap-3 text-[13px] leading-relaxed lg:col-span-3 lg:pb-3">
          <p className="max-w-[28ch] text-ink">
            一位独立调酒师的手绘酒单。每一杯，一张水彩，一行配方。
          </p>
          <p className="text-[11px] tracking-[0.14em] text-ink-soft uppercase tabular-nums">
            {String(count).padStart(2, '0')} 款收录
          </p>
        </div>
      </div>
    </header>
  )
}
