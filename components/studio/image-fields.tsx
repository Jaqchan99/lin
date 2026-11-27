'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { readImageAsDataUrl } from '@/lib/image'
import { seedCocktails } from '@/lib/mock-data'
import { Field, TextInput } from '@/components/studio/editor-fields'
import { buttonOutline, textAction } from '@/components/studio/ui'

type ImageSlotProps = {
  id: string
  label: string
  hint: string
  value: string
  error?: string
  onChange: (dataUrl: string) => void
  onRemove: () => void
}

function ImageSlot({ id, label, hint, value, error, onChange, onRemove }: ImageSlotProps) {
  const [uploadError, setUploadError] = useState('')
  const [busy, setBusy] = useState(false)
  const message = uploadError || error

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    setUploadError('')
    setBusy(true)
    try {
      onChange(await readImageAsDataUrl(file))
    } catch (cause) {
      setUploadError(cause instanceof Error ? cause.message : '圖片讀取失敗，請換一張再試。')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium tracking-[0.04em]">{label}</p>
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'relative flex aspect-[4/5] w-28 shrink-0 items-center justify-center overflow-hidden bg-mist text-xs text-ink-soft sm:w-32',
            message && 'outline outline-1 outline-destructive',
          )}
        >
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element -- user uploads are data URLs
            <img src={value} alt="" className="size-full object-cover" />
          ) : (
            <span aria-hidden>尚無圖片</span>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-start gap-3">
          <input
            id={id}
            type="file"
            accept="image/*"
            onChange={handleFile}
            aria-invalid={message ? true : undefined}
            aria-describedby={`${id}-note`}
            className="peer sr-only"
          />
          <label
            htmlFor={id}
            className={cn(
              buttonOutline,
              'h-10 cursor-pointer px-4 peer-focus-visible:outline-2 peer-focus-visible:outline-ink',
              busy && 'pointer-events-none opacity-50',
            )}
          >
            {busy ? '處理中…' : value ? '更換圖片' : '上傳圖片'}
          </label>
          {value && (
            <button type="button" onClick={onRemove} className={textAction}>
              移除
            </button>
          )}
          <p
            id={`${id}-note`}
            className={cn(
              'text-xs leading-[1.7]',
              message ? 'text-destructive' : 'text-ink-soft',
            )}
          >
            {message || hint}
          </p>
        </div>
      </div>
    </div>
  )
}

const sampleArtworks = seedCocktails.filter((item) => item.artwork)

type ImageFieldsProps = {
  originalPhoto: string
  artwork: string
  artworkAlt: string
  artworkError?: string
  onChange: (patch: {
    originalPhoto?: string
    artwork?: string
    artworkAlt?: string
  }) => void
}

export function ImageFields({
  originalPhoto,
  artwork,
  artworkAlt,
  artworkError,
  onChange,
}: ImageFieldsProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <ImageSlot
          id="field-original-photo"
          label="原始照片"
          hint="僅供工作室參考，不會公開顯示。"
          value={originalPhoto}
          onChange={(dataUrl) => onChange({ originalPhoto: dataUrl })}
          onRemove={() => onChange({ originalPhoto: '' })}
        />
        <ImageSlot
          id="field-artwork"
          label="水彩插畫"
          hint="公開顯示的主圖。建議直式 4:5。"
          value={artwork}
          error={artworkError}
          onChange={(dataUrl) => onChange({ artwork: dataUrl })}
          onRemove={() => onChange({ artwork: '', artworkAlt: '' })}
        />
      </div>

      {originalPhoto && !artwork && (
        <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs leading-[1.7] text-ink-soft">
          尚未有水彩插畫，可先以原始照片暫代。
          <button
            type="button"
            onClick={() => onChange({ artwork: originalPhoto })}
            className={textAction}
          >
            以原始照片暫代
          </button>
        </p>
      )}

      {artwork && (
        <Field
          id="field-artwork-alt"
          label="插畫替代文字"
          hint="描述圖片內容，供螢幕閱讀器使用；留空則自動以名稱產生。"
        >
          <TextInput
            id="field-artwork-alt"
            hint="x"
            value={artworkAlt}
            onChange={(event) => onChange({ artworkAlt: event.target.value })}
            placeholder="例如：杯中的深色咖啡雞尾酒與三顆咖啡豆"
          />
        </Field>
      )}

      <fieldset className="flex flex-col gap-3">
        <legend className="text-sm font-medium tracking-[0.04em]">
          或選擇示範插畫
        </legend>
        <ul className="flex flex-wrap gap-3">
          {sampleArtworks.map((sample) => {
            const selected = artwork === sample.artwork
            return (
              <li key={sample.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  aria-label={`使用「${sample.name}」示範插畫`}
                  onClick={() =>
                    onChange({ artwork: sample.artwork, artworkAlt: sample.artworkAlt })
                  }
                  className={cn(
                    'relative block aspect-[4/5] w-16 overflow-hidden bg-mist outline-offset-2 transition-opacity focus-visible:outline-2 focus-visible:outline-ink sm:w-20',
                    selected
                      ? 'outline outline-2 outline-ink'
                      : 'opacity-70 hover:opacity-100',
                  )}
                >
                  <Image
                    src={sample.artwork}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              </li>
            )
          })}
        </ul>
      </fieldset>
    </div>
  )
}
