export function PlaceholderNote({ children }: { children?: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 border border-dashed border-ink/30 px-2 py-1 text-[11px] tracking-[0.12em] text-ink-soft">
      <span aria-hidden className="size-1.5 bg-ink-soft" />
      {children ?? '佔位內容 · 待 LIN 補充'}
    </p>
  )
}
