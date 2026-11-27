'use client'

import { CocktailDetail } from '@/components/cocktail-detail'
import { Modal } from '@/components/studio/ui'
import { statusLabels, type Cocktail } from '@/lib/cocktails'

type DetailPreviewDialogProps = {
  cocktail: Cocktail | null
  index: number
  total: number
  onClose: () => void
}

export function DetailPreviewDialog({
  cocktail,
  index,
  total,
  onClose,
}: DetailPreviewDialogProps) {
  return (
    <Modal
      open={cocktail !== null}
      onClose={onClose}
      label="詳情頁預覽"
      className="m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto bg-white p-0 backdrop:bg-ink/40"
    >
      {cocktail && (
        <>
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-ink px-5 py-3 text-white sm:px-10 lg:px-16">
            <p className="text-[11px] tracking-[0.18em]">
              {`詳情頁預覽 · ${statusLabels[cocktail.status]}`}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="text-sm tracking-[0.12em] underline-offset-4 outline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-white"
            >
              關閉 ✕
            </button>
          </div>
          <CocktailDetail
            preview
            cocktail={cocktail}
            index={index}
            total={total}
          />
        </>
      )}
    </Modal>
  )
}
