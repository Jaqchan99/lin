'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { DetailPreviewDialog } from '@/components/studio/detail-preview-dialog'
import {
  buttonOutline,
  buttonPrimary,
  ConfirmDialog,
  StatusTag,
  textAction,
} from '@/components/studio/ui'
import { useCocktails, useHydrated } from '@/hooks/use-cocktails'
import {
  formatUpdatedAt,
  getCategory,
  getPublishIssues,
  type Cocktail,
  type CocktailStatus,
} from '@/lib/cocktails'

type Filter = 'all' | CocktailStatus
type Notice = { tone: 'ok' | 'error'; content: React.ReactNode }
type Confirm = {
  title: string
  description: string
  confirmLabel: string
  onConfirm: () => void
}

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: '全部' },
  { id: 'published', label: '已發佈' },
  { id: 'draft', label: '草稿' },
]

export function StudioList() {
  const hydrated = useHydrated()
  const { all, published, actions } = useCocktails()
  const [filter, setFilter] = useState<Filter>('all')
  const [notice, setNotice] = useState<Notice | null>(null)
  const [previewId, setPreviewId] = useState<string | null>(null)
  const [confirm, setConfirm] = useState<Confirm | null>(null)

  const counts: Record<Filter, number> = {
    all: all.length,
    published: published.length,
    draft: all.length - published.length,
  }
  const visible = filter === 'all' ? all : all.filter((item) => item.status === filter)
  const previewing = all.find((item) => item.id === previewId) ?? null
  const previewPublishedIndex = previewing
    ? Math.max(published.findIndex((item) => item.id === previewing.id), 0)
    : 0
  const previewTotal = previewing
    ? published.length + (previewing.status === 'published' ? 0 : 1)
    : 0

  function report(result: { ok: boolean; error?: string }, success: React.ReactNode) {
    setNotice(
      result.ok
        ? { tone: 'ok', content: success }
        : { tone: 'error', content: result.error ?? '儲存失敗，請稍後再試。' },
    )
  }

  function publish(cocktail: Cocktail) {
    const issues = getPublishIssues(cocktail)
    if (issues.length > 0) {
      setNotice({
        tone: 'error',
        content: (
          <>
            {`「${cocktail.name || '未命名'}」還缺少：${issues.join('、')}。`}
            <Link href={`/studio/${cocktail.id}`} className="ml-2 underline underline-offset-4">
              前往編輯
            </Link>
          </>
        ),
      })
      return
    }
    report(
      actions.setStatus(cocktail.id, 'published'),
      `「${cocktail.name}」已發佈，現在會顯示在公開網站。`,
    )
  }

  function unpublish(cocktail: Cocktail) {
    report(
      actions.setStatus(cocktail.id, 'draft'),
      `「${cocktail.name}」已轉為草稿，公開網站不再顯示。`,
    )
  }

  function askRemove(cocktail: Cocktail) {
    setConfirm({
      title: `刪除「${cocktail.name || '未命名'}」？`,
      description: '刪除後無法復原，圖片與配方都會一併移除。',
      confirmLabel: '刪除',
      onConfirm: () => {
        report(actions.remove(cocktail.id), `「${cocktail.name || '未命名'}」已刪除。`)
        setConfirm(null)
      },
    })
  }

  function askReset() {
    setConfirm({
      title: '重設為範例資料？',
      description: '你新增與修改的所有內容都會被清除，並還原成預設的範例作品。',
      confirmLabel: '重設',
      onConfirm: () => {
        actions.reset()
        setNotice({ tone: 'ok', content: '已還原為範例資料。' })
        setConfirm(null)
      },
    })
  }

  return (
    <div className="mx-auto w-full max-w-[1440px] px-5 pt-10 pb-24 sm:px-10 sm:pt-14 lg:px-16">
      <header className="mb-10 grid gap-6 border-b border-ink pb-8 lg:grid-cols-12 lg:items-end">
        <div className="flex flex-col gap-4 lg:col-span-8">
          <p className="text-[11px] tracking-[0.2em] text-ink-soft uppercase">
            Studio
          </p>
          <h1 className="text-5xl font-medium tracking-[0.04em] sm:text-6xl">
            作品管理
          </h1>
        </div>
        <div className="flex lg:col-span-4 lg:justify-end">
          <Link href="/studio/new" className={buttonPrimary}>
            ＋ 新增雞尾酒
          </Link>
        </div>
      </header>

      <div
        role="group"
        aria-label="依狀態篩選"
        className="mb-6 flex flex-wrap gap-x-8 gap-y-2 border-b border-rule"
      >
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
            className={cn(
              '-mb-px flex items-baseline gap-2 border-b-2 py-3 text-sm tracking-[0.1em] outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink',
              filter === item.id
                ? 'border-ink font-medium'
                : 'border-transparent text-ink-soft hover:text-ink',
            )}
          >
            {item.label}
            <span className="text-[11px] tabular-nums">
              {hydrated ? counts[item.id] : '–'}
            </span>
          </button>
        ))}
      </div>

      <div aria-live="polite" className="mb-6 empty:hidden">
        {notice && (
          <p
            role={notice.tone === 'error' ? 'alert' : 'status'}
            className={cn(
              'flex flex-wrap items-center justify-between gap-3 border px-4 py-3 text-sm leading-[1.8]',
              notice.tone === 'error'
                ? 'border-destructive text-destructive'
                : 'border-ink',
            )}
          >
            <span>{notice.content}</span>
            <button
              type="button"
              onClick={() => setNotice(null)}
              className={textAction}
            >
              關閉
            </button>
          </p>
        )}
      </div>

      {!hydrated ? (
        <p className="py-20 text-center text-sm text-ink-soft">載入中…</p>
      ) : visible.length === 0 ? (
        <div className="flex flex-col items-center gap-4 border border-dashed border-ink/25 px-6 py-20 text-center">
          <p className="text-lg font-light">
            {filter === 'all' ? '還沒有任何作品。' : '這個分類下沒有作品。'}
          </p>
          <Link href="/studio/new" className={buttonOutline}>
            新增第一款雞尾酒
          </Link>
        </div>
      ) : (
        <ul>
          {visible.map((cocktail) => (
            <StudioRow
              key={cocktail.id}
              cocktail={cocktail}
              number={all.indexOf(cocktail) + 1}
              onPreview={() => setPreviewId(cocktail.id)}
              onPublish={() => publish(cocktail)}
              onUnpublish={() => unpublish(cocktail)}
              onRemove={() => askRemove(cocktail)}
            />
          ))}
        </ul>
      )}

      <footer className="mt-16 flex flex-col gap-3 border-t border-rule pt-6 text-xs leading-[1.9] text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <p>作品資料目前儲存在這個瀏覽器中，尚未同步到雲端。</p>
        <button type="button" onClick={askReset} className={cn(textAction, 'self-start text-xs')}>
          重設為範例資料
        </button>
      </footer>

      <DetailPreviewDialog
        cocktail={previewing}
        index={previewPublishedIndex}
        total={previewTotal}
        onClose={() => setPreviewId(null)}
      />
      <ConfirmDialog
        open={confirm !== null}
        title={confirm?.title ?? ''}
        description={confirm?.description ?? ''}
        confirmLabel={confirm?.confirmLabel ?? ''}
        onConfirm={() => confirm?.onConfirm()}
        onCancel={() => setConfirm(null)}
      />
    </div>
  )
}

type StudioRowProps = {
  cocktail: Cocktail
  number: number
  onPreview: () => void
  onPublish: () => void
  onUnpublish: () => void
  onRemove: () => void
}

function StudioRow({
  cocktail,
  number,
  onPreview,
  onPublish,
  onUnpublish,
  onRemove,
}: StudioRowProps) {
  const isPublished = cocktail.status === 'published'
  const name = cocktail.name || '未命名'

  return (
    <li className="grid grid-cols-[4.5rem_1fr] gap-x-4 gap-y-4 border-b border-rule py-5 sm:grid-cols-[5.5rem_1fr_auto] sm:items-center sm:gap-x-8">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-mist">
        {cocktail.artwork ? (
          cocktail.artwork.startsWith('data:') ? (
            // eslint-disable-next-line @next/next/no-img-element -- user uploads are data URLs
            <img src={cocktail.artwork} alt="" className="size-full object-cover" />
          ) : (
            <Image
              src={cocktail.artwork}
              alt=""
              fill
              sizes="88px"
              className="object-cover"
            />
          )
        ) : (
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center text-xs text-ink-soft"
          >
            —
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-col gap-1.5">
        <p className="text-[11px] tracking-[0.18em] text-ink-soft tabular-nums">
          {`Nº ${String(number).padStart(2, '0')} · ${getCategory(cocktail.category).zh}`}
        </p>
        <h2 className="text-xl font-medium tracking-[0.04em]">
          <Link
            href={`/studio/${cocktail.id}`}
            className="underline-offset-4 outline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-ink"
          >
            {name}
          </Link>
        </h2>
        <p className="line-clamp-1 text-sm text-ink-soft">
          {cocktail.intro || '尚未填寫簡短描述'}
        </p>
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-soft">
          <StatusTag status={cocktail.status} />
          {cocktail.featured && <span className="tracking-[0.12em]">精選</span>}
          <span className="tabular-nums">{`更新 ${formatUpdatedAt(cocktail.updatedAt)}`}</span>
        </p>
      </div>

      <div className="col-span-2 flex flex-wrap items-center gap-x-5 gap-y-2 sm:col-span-1 sm:justify-end">
        <Link href={`/studio/${cocktail.id}`} className={textAction}>
          編輯
        </Link>
        <button type="button" onClick={onPreview} className={textAction}>
          預覽
        </button>
        {isPublished ? (
          <>
            <Link href={`/cocktail/${cocktail.slug}`} className={textAction}>
              查看公開頁 <span aria-hidden>↗</span>
            </Link>
            <button type="button" onClick={onUnpublish} className={textAction}>
              轉為草稿
            </button>
          </>
        ) : (
          <button type="button" onClick={onPublish} className={cn(textAction, 'font-medium')}>
            發佈
          </button>
        )}
        <button
          type="button"
          onClick={onRemove}
          className={cn(textAction, 'text-destructive')}
          aria-label={`刪除${name}`}
        >
          刪除
        </button>
      </div>
    </li>
  )
}
