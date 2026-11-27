'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { statusLabels, type CocktailStatus } from '@/lib/cocktails'

export const buttonBase =
  'inline-flex h-11 shrink-0 items-center justify-center gap-2 px-6 text-sm tracking-[0.12em] whitespace-nowrap transition-colors outline-offset-4 focus-visible:outline-2 focus-visible:outline-ink disabled:pointer-events-none disabled:opacity-40'
export const buttonPrimary = cn(buttonBase, 'bg-ink text-white hover:bg-ink/85')
export const buttonOutline = cn(
  buttonBase,
  'border border-ink hover:bg-ink hover:text-white',
)
export const buttonDanger = cn(
  buttonBase,
  'bg-destructive text-white hover:bg-destructive/90',
)
export const textAction =
  'text-sm tracking-[0.08em] underline-offset-4 outline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-ink'
export const inputClass =
  'w-full border border-rule bg-white px-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-ink aria-[invalid=true]:border-destructive'

export function StatusTag({ status }: { status: CocktailStatus }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.16em]">
      <span
        aria-hidden
        className={cn('size-2 border border-ink', status === 'published' && 'bg-ink')}
      />
      {statusLabels[status]}
    </span>
  )
}

type ModalProps = {
  open: boolean
  onClose: () => void
  label: string
  className?: string
  children: React.ReactNode
}

/** Native modal dialog: focus trap, Escape and backdrop come from the platform. */
export function Modal({ open, onClose, label, className, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      document.documentElement.style.overflow = 'hidden'
    }
    if (!open && dialog.open) dialog.close()
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      className={className}
    >
      {open && children}
    </dialog>
  )
}

type ConfirmDialogProps = {
  open: boolean
  title: string
  description: string
  confirmLabel: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      label={title}
      className="m-auto w-[min(28rem,calc(100vw-2.5rem))] border border-ink bg-white p-0 backdrop:bg-ink/40"
    >
      <div className="flex flex-col gap-6 p-6 sm:p-8">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-medium tracking-[0.04em]">{title}</h2>
          <p className="text-sm leading-[1.9] text-ink-soft">{description}</p>
        </div>
        <div className="flex flex-wrap justify-end gap-3">
          <button type="button" onClick={onCancel} className={buttonOutline}>
            取消
          </button>
          <button type="button" onClick={onConfirm} className={buttonDanger}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  )
}
