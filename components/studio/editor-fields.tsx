'use client'

import { cn } from '@/lib/utils'
import { flavorLabels } from '@/lib/cocktails'
import {
  createKey,
  type FormRow,
  type IngredientRow,
} from '@/lib/cocktail-form'
import { inputClass } from '@/components/studio/ui'

type FieldProps = {
  id: string
  label: string
  hint?: string
  error?: string
  className?: string
  children: React.ReactNode
}

export function Field({ id, label, hint, error, className, children }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-sm font-medium tracking-[0.04em]">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs leading-[1.7] text-ink-soft">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs leading-[1.7] text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

function describedBy(id: string, error?: string, hint?: string) {
  if (error) return `${id}-error`
  if (hint) return `${id}-hint`
  return undefined
}

type TextInputProps = Omit<React.ComponentProps<'input'>, 'id'> & {
  id: string
  error?: string
  hint?: string
}

export function TextInput({ id, error, hint, className, ...props }: TextInputProps) {
  return (
    <input
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy(id, error, hint)}
      className={cn(inputClass, 'h-11', className)}
      {...props}
    />
  )
}

type TextAreaProps = Omit<React.ComponentProps<'textarea'>, 'id'> & {
  id: string
  error?: string
  hint?: string
}

export function TextArea({ id, error, hint, className, ...props }: TextAreaProps) {
  return (
    <textarea
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy(id, error, hint)}
      className={cn(inputClass, 'min-h-28 py-2.5 leading-[1.8]', className)}
      {...props}
    />
  )
}

type EditorSectionProps = {
  id: string
  number: string
  title: string
  description?: string
  children: React.ReactNode
}

export function EditorSection({
  id,
  number,
  title,
  description,
  children,
}: EditorSectionProps) {
  return (
    <section
      aria-labelledby={id}
      className="flex flex-col gap-6 border-t border-ink pt-6"
    >
      <header className="flex flex-col gap-1.5">
        <div className="flex items-baseline gap-4">
          <span className="text-[11px] tracking-[0.2em] tabular-nums text-ink-soft">
            {number}
          </span>
          <h2 id={id} className="text-xl font-medium tracking-[0.04em]">
            {title}
          </h2>
        </div>
        {description && (
          <p className="text-xs leading-[1.8] text-ink-soft sm:pl-9">{description}</p>
        )}
      </header>
      {children}
    </section>
  )
}

function moveItem<T>(list: T[], from: number, to: number) {
  if (to < 0 || to >= list.length) return list
  const next = [...list]
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}

const iconButton =
  'inline-flex size-9 shrink-0 items-center justify-center border border-rule text-sm transition-colors outline-offset-2 hover:border-ink hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-ink disabled:pointer-events-none disabled:opacity-30'

type RowControlsProps = {
  label: string
  index: number
  count: number
  onMove: (to: number) => void
  onRemove: () => void
}

function RowControls({ label, index, count, onMove, onRemove }: RowControlsProps) {
  return (
    <div className="flex gap-1">
      <button
        type="button"
        className={iconButton}
        aria-label={`上移${label}`}
        disabled={index === 0}
        onClick={() => onMove(index - 1)}
      >
        ↑
      </button>
      <button
        type="button"
        className={iconButton}
        aria-label={`下移${label}`}
        disabled={index === count - 1}
        onClick={() => onMove(index + 1)}
      >
        ↓
      </button>
      <button
        type="button"
        className={iconButton}
        aria-label={`刪除${label}`}
        disabled={count === 1}
        onClick={onRemove}
      >
        ✕
      </button>
    </div>
  )
}

const addButton =
  'self-start text-sm tracking-[0.08em] underline underline-offset-[6px] outline-offset-4 focus-visible:outline-2 focus-visible:outline-ink'

type IngredientFieldsProps = {
  rows: IngredientRow[]
  error?: string
  onChange: (rows: IngredientRow[]) => void
}

export function IngredientFields({ rows, error, onChange }: IngredientFieldsProps) {
  const update = (key: string, patch: Partial<IngredientRow>) =>
    onChange(rows.map((row) => (row.key === key ? { ...row, ...patch } : row)))

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-3" aria-label="材料清單">
        {rows.map((row, index) => (
          <li key={row.key} className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
            <TextInput
              id={`ingredient-measure-${row.key}`}
              aria-label={`材料 ${index + 1} 用量`}
              placeholder="45 ml"
              value={row.measure}
              onChange={(event) => update(row.key, { measure: event.target.value })}
              className="w-28 shrink-0"
            />
            <TextInput
              id={`ingredient-name-${row.key}`}
              aria-label={`材料 ${index + 1} 名稱`}
              aria-invalid={error && index === 0 ? true : undefined}
              placeholder="伏特加"
              value={row.name}
              onChange={(event) => update(row.key, { name: event.target.value })}
              className="min-w-0 flex-1"
            />
            <RowControls
              label={`材料 ${index + 1}`}
              index={index}
              count={rows.length}
              onMove={(to) => onChange(moveItem(rows, index, to))}
              onRemove={() => onChange(rows.filter((item) => item.key !== row.key))}
            />
          </li>
        ))}
      </ul>
      {error && (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
      <button
        type="button"
        className={addButton}
        onClick={() => onChange([...rows, { key: createKey(), measure: '', name: '' }])}
      >
        ＋ 新增材料
      </button>
    </div>
  )
}

type MethodFieldsProps = {
  rows: FormRow[]
  onChange: (rows: FormRow[]) => void
}

export function MethodFields({ rows, onChange }: MethodFieldsProps) {
  return (
    <div className="flex flex-col gap-4">
      <ol className="flex flex-col gap-3" aria-label="製作步驟">
        {rows.map((row, index) => (
          <li key={row.key} className="flex items-start gap-3">
            <span
              aria-hidden
              className="mt-3 w-6 shrink-0 text-[11px] tracking-[0.12em] tabular-nums text-ink-soft"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <TextArea
              id={`method-${row.key}`}
              aria-label={`步驟 ${index + 1}`}
              placeholder="例如：所有材料加冰搖盪 12 秒，雙重過濾入冰鎮杯。"
              rows={2}
              value={row.text}
              onChange={(event) =>
                onChange(
                  rows.map((item) =>
                    item.key === row.key ? { ...item, text: event.target.value } : item,
                  ),
                )
              }
              className="min-h-0 min-w-0 flex-1"
            />
            <RowControls
              label={`步驟 ${index + 1}`}
              index={index}
              count={rows.length}
              onMove={(to) => onChange(moveItem(rows, index, to))}
              onRemove={() => onChange(rows.filter((item) => item.key !== row.key))}
            />
          </li>
        ))}
      </ol>
      <button
        type="button"
        className={addButton}
        onClick={() => onChange([...rows, { key: createKey(), text: '' }])}
      >
        ＋ 新增步驟
      </button>
    </div>
  )
}

type FlavorFieldsProps = {
  values: number[]
  onChange: (values: number[]) => void
}

export function FlavorFields({ values, onChange }: FlavorFieldsProps) {
  return (
    <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
      {flavorLabels.map((label, index) => (
        <li key={label} className="flex items-center gap-4">
          <label
            htmlFor={`flavor-${index}`}
            className="w-10 shrink-0 text-sm tracking-[0.08em]"
          >
            {label}
          </label>
          <input
            id={`flavor-${index}`}
            type="range"
            min={1}
            max={5}
            step={1}
            value={values[index] ?? 3}
            onChange={(event) =>
              onChange(
                values.map((value, position) =>
                  position === index ? Number(event.target.value) : value,
                ),
              )
            }
            className="h-6 min-w-0 flex-1 cursor-pointer accent-ink"
          />
          <span
            aria-hidden
            className="w-8 shrink-0 text-right text-xs tabular-nums text-ink-soft"
          >
            {`${values[index] ?? 3}/5`}
          </span>
        </li>
      ))}
    </ul>
  )
}
