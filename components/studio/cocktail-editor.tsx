'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { CocktailCard } from '@/components/cocktail-card'
import { DetailPreviewDialog } from '@/components/studio/detail-preview-dialog'
import {
  EditorSection,
  Field,
  FlavorFields,
  IngredientFields,
  MethodFields,
  TextArea,
  TextInput,
} from '@/components/studio/editor-fields'
import { ImageFields } from '@/components/studio/image-fields'
import {
  buttonOutline,
  buttonPrimary,
  inputClass,
  StatusTag,
  textAction,
} from '@/components/studio/ui'
import { useCocktails, useHydrated } from '@/hooks/use-cocktails'
import {
  categories,
  findById,
  slugify,
  titleVariantOptions,
  type Cocktail,
  type CocktailStatus,
  type CategoryId,
  type TitleVariant,
} from '@/lib/cocktails'
import {
  cocktailToForm,
  createId,
  emptyForm,
  formToCocktail,
  formToPreview,
  serializeForm,
  validateForm,
  type CocktailFormValues,
  type FormErrors,
} from '@/lib/cocktail-form'

export function CocktailEditor({ id }: { id?: string }) {
  const hydrated = useHydrated()
  const { all } = useCocktails()

  if (!hydrated) {
    return <p className="py-32 text-center text-sm text-ink-soft">載入中…</p>
  }

  const existing = id ? findById(all, id) : undefined

  if (id && !existing) {
    return (
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-6 px-5 py-24 sm:px-10 lg:px-16">
        <h1 className="text-4xl font-medium tracking-[0.04em]">找不到這筆作品</h1>
        <p className="text-sm leading-[1.9] text-ink-soft">
          它可能已被刪除，或儲存在其他瀏覽器中。
        </p>
        <Link href="/studio" className={buttonOutline}>
          返回作品管理
        </Link>
      </div>
    )
  }

  return <EditorForm key={id ?? 'new'} initial={existing} />
}

type Notice = { tone: 'ok' | 'error'; content: React.ReactNode }

function EditorForm({ initial }: { initial?: Cocktail }) {
  const { all, published, actions } = useCocktails()
  const [cocktailId] = useState(() => initial?.id ?? createId())
  const [saved, setSaved] = useState<Cocktail | undefined>(initial)
  const [values, setValues] = useState<CocktailFormValues>(() =>
    initial ? cocktailToForm(initial) : emptyForm(),
  )
  const [baseline, setBaseline] = useState(() => serializeForm(values))
  const [slugTouched, setSlugTouched] = useState(Boolean(initial))
  const [errors, setErrors] = useState<FormErrors>({})
  const [notice, setNotice] = useState<Notice | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  const status: CocktailStatus = saved?.status ?? 'draft'
  const dirty = serializeForm(values) !== baseline

  const previewCocktail = useMemo(
    () => formToPreview(values, { id: cocktailId, status, base: saved }),
    [values, cocktailId, status, saved],
  )
  const publishedIndex = published.findIndex((item) => item.id === cocktailId)
  const cardIndex = saved ? all.findIndex((item) => item.id === cocktailId) : all.length
  const detailIndex = publishedIndex >= 0 ? publishedIndex : published.length
  const detailTotal = published.length + (publishedIndex >= 0 ? 0 : 1)

  function patch(update: Partial<CocktailFormValues>) {
    setValues((current) => ({ ...current, ...update }))
    const touched = Object.keys(update) as (keyof CocktailFormValues)[]
    if (touched.some((key) => errors[key])) {
      setErrors((current) => {
        const next = { ...current }
        touched.forEach((key) => delete next[key])
        return next
      })
    }
  }

  function changeName(name: string) {
    patch(slugTouched ? { name } : { name, slug: slugify(name) })
  }

  function submit(nextStatus: CocktailStatus) {
    const found = validateForm(values, {
      intent: nextStatus === 'published' ? 'publish' : 'draft',
      currentId: cocktailId,
      others: all,
    })

    if (Object.keys(found).length > 0) {
      setErrors(found)
      setNotice({
        tone: 'error',
        content:
          nextStatus === 'published'
            ? '還有欄位需要補齊才能發佈，請看標示的欄位。'
            : '請先修正標示的欄位。',
      })
      requestAnimationFrame(() =>
        document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      )
      return
    }

    const cocktail = formToCocktail(values, { id: cocktailId, status: nextStatus, base: saved })
    const result = actions.upsert(cocktail)

    if (!result.ok) {
      setNotice({ tone: 'error', content: result.error })
      return
    }

    if (!saved) window.history.replaceState(null, '', `/studio/${cocktailId}`)
    setSaved(cocktail)
    setBaseline(serializeForm(values))
    setErrors({})
    setNotice({
      tone: 'ok',
      content:
        nextStatus === 'published' ? (
          <>
            已發佈。
            <Link href={`/cocktail/${cocktail.slug}`} className="ml-2 underline underline-offset-4">
              查看公開頁
            </Link>
          </>
        ) : status === 'published' ? (
          '已轉為草稿，公開網站不再顯示。'
        ) : (
          '草稿已儲存。'
        ),
    })
  }

  function handleLeave(event: React.MouseEvent) {
    if (dirty && !window.confirm('有尚未儲存的變更，確定要離開嗎？')) {
      event.preventDefault()
    }
  }

  const errorCount = Object.keys(errors).length

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        submit(status)
      }}
      className="flex flex-col"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 pt-10 pb-16 sm:px-10 sm:pt-14 lg:px-16">
        <header className="mb-10 flex flex-col gap-4 border-b border-ink pb-8">
          <Link
            href="/studio"
            onClick={handleLeave}
            className={cn(textAction, 'self-start text-ink-soft')}
          >
            ← 作品管理
          </Link>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-medium tracking-[0.04em] sm:text-5xl">
              {saved ? values.name || '未命名' : '新增雞尾酒'}
            </h1>
            <StatusTag status={status} />
          </div>
        </header>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-14 lg:col-span-7">
            <EditorSection id="section-basics" number="01" title="基本資料">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="field-name" label="名稱" error={errors.name}>
                  <TextInput
                    id="field-name"
                    error={errors.name}
                    value={values.name}
                    onChange={(event) => changeName(event.target.value)}
                    placeholder="Espresso Martini"
                    autoComplete="off"
                  />
                </Field>
                <Field
                  id="field-slug"
                  label="網址代稱"
                  error={errors.slug}
                  hint={`公開網址：/cocktail/${values.slug || '…'}`}
                >
                  <TextInput
                    id="field-slug"
                    error={errors.slug}
                    hint={`公開網址：/cocktail/${values.slug || '…'}`}
                    value={values.slug}
                    onChange={(event) => {
                      setSlugTouched(true)
                      patch({ slug: event.target.value })
                    }}
                    placeholder="espresso-martini"
                    autoCapitalize="none"
                    spellCheck={false}
                  />
                </Field>
              </div>

              <Field
                id="field-intro"
                label="簡短描述"
                error={errors.intro}
                hint="顯示在詳情頁標題下方，一至兩句即可。"
              >
                <TextArea
                  id="field-intro"
                  error={errors.intro}
                  hint="顯示在詳情頁標題下方，一至兩句即可。"
                  rows={2}
                  value={values.intro}
                  onChange={(event) => patch({ intro: event.target.value })}
                />
              </Field>

              <Field id="field-category" label="基酒分類">
                <select
                  id="field-category"
                  value={values.category}
                  onChange={(event) => patch({ category: event.target.value as CategoryId })}
                  className={cn(inputClass, 'h-11 sm:max-w-xs')}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {`${category.zh} ${category.en}`}
                    </option>
                  ))}
                </select>
              </Field>
            </EditorSection>

            <EditorSection
              id="section-images"
              number="02"
              title="圖片"
              description="上傳的圖片會縮小後存在瀏覽器中。"
            >
              <ImageFields
                originalPhoto={values.originalPhoto}
                artwork={values.artwork}
                artworkAlt={values.artworkAlt}
                artworkError={errors.artwork}
                onChange={patch}
              />
            </EditorSection>

            <EditorSection id="section-recipe" number="03" title="配方">
              <IngredientFields
                rows={values.ingredients}
                error={errors.ingredients}
                onChange={(ingredients) => patch({ ingredients })}
              />
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-medium tracking-[0.04em]">製作步驟</h3>
                <MethodFields rows={values.method} onChange={(method) => patch({ method })} />
              </div>
            </EditorSection>

            <EditorSection
              id="section-flavor"
              number="04"
              title="風味"
              description="1 為最低，5 為最高。"
            >
              <FlavorFields values={values.flavor} onChange={(flavor) => patch({ flavor })} />
              <Field id="field-taste" label="口感描述">
                <TextArea
                  id="field-taste"
                  rows={3}
                  value={values.taste}
                  onChange={(event) => patch({ taste: event.target.value })}
                />
              </Field>
            </EditorSection>

            <EditorSection id="section-story" number="05" title="故事">
              <Field id="field-inspiration" label="靈感">
                <TextArea
                  id="field-inspiration"
                  rows={3}
                  value={values.inspiration}
                  onChange={(event) => patch({ inspiration: event.target.value })}
                />
              </Field>
              <Field id="field-story" label="背後的故事">
                <TextArea
                  id="field-story"
                  rows={5}
                  value={values.story}
                  onChange={(event) => patch({ story: event.target.value })}
                />
              </Field>
            </EditorSection>

            <EditorSection id="section-display" number="06" title="展示設定">
              <fieldset className="flex flex-col gap-3">
                <legend className="text-sm font-medium tracking-[0.04em]">標題字型</legend>
                <div className="flex flex-wrap gap-3">
                  {titleVariantOptions.map((option) => (
                    <label key={option.id} className="cursor-pointer">
                      <input
                        type="radio"
                        name="title-variant"
                        value={option.id}
                        checked={values.titleVariant === option.id}
                        onChange={() => patch({ titleVariant: option.id as TitleVariant })}
                        className="peer sr-only"
                      />
                      <span className="inline-flex h-10 items-center border border-rule px-5 text-sm tracking-[0.1em] transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={values.featured}
                  onChange={(event) => patch({ featured: event.target.checked })}
                  className="mt-1 size-4 accent-ink"
                />
                <span className="flex flex-col gap-1">
                  <span className="text-sm font-medium tracking-[0.04em]">設為精選</span>
                  <span className="text-xs leading-[1.7] text-ink-soft">
                    已發佈的精選作品會出現在首頁。
                  </span>
                </span>
              </label>
            </EditorSection>
          </div>

          <aside
            aria-label="卡片預覽"
            className="flex flex-col gap-4 lg:sticky lg:top-6 lg:col-span-5 lg:self-start"
          >
            <p className="text-[11px] tracking-[0.2em] text-ink-soft uppercase">
              Card preview
            </p>
            <div className="mx-auto w-full max-w-[420px]">
              <CocktailCard
                cocktail={previewCocktail}
                index={cardIndex}
              />
            </div>
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className={cn(buttonOutline, 'mx-auto w-full max-w-[420px]')}
            >
              預覽詳情頁
            </button>
          </aside>
        </div>
      </div>

      <div className="sticky bottom-0 z-20 border-t border-ink bg-white">
        <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-3 sm:px-10 lg:px-16">
          <p
            role={notice?.tone === 'error' ? 'alert' : 'status'}
            className={cn(
              'min-w-0 flex-1 text-sm leading-[1.7]',
              notice?.tone === 'error' && 'text-destructive',
            )}
          >
            {notice
              ? notice.content
              : dirty
                ? '有尚未儲存的變更'
                : saved
                  ? '所有變更已儲存'
                  : ''}
            {notice?.tone === 'error' && errorCount > 0 ? ` （${errorCount} 項）` : ''}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {status === 'published' ? (
              <>
                <button type="button" onClick={() => submit('draft')} className={buttonOutline}>
                  轉為草稿
                </button>
                <button type="submit" className={buttonPrimary}>
                  儲存變更
                </button>
              </>
            ) : (
              <>
                <button type="submit" className={buttonOutline}>
                  儲存草稿
                </button>
                <button type="button" onClick={() => submit('published')} className={buttonPrimary}>
                  發佈
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <DetailPreviewDialog
        cocktail={previewOpen ? previewCocktail : null}
        index={detailIndex}
        total={detailTotal}
        onClose={() => setPreviewOpen(false)}
      />
    </form>
  )
}
