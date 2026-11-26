import { PlaceholderNote } from '@/components/placeholder-note'
import { SectionHeading } from '@/components/section-heading'

const facts = [
  { label: '身份', value: '調酒師 / Mixologist' },
  { label: '專注', value: '經典雞尾酒、水彩手繪酒款檔案' },
  { label: '經歷', value: '待 LIN 補充' },
  { label: '合作與聯絡', value: 'hello@example.com（佔位）' },
]

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto w-full max-w-[1440px] scroll-mt-20 px-5 pb-24 sm:px-10 sm:pb-32 lg:px-16"
    >
      <SectionHeading id="about-title" title="關於我" eyebrow="About" />

      <div className="mt-12 grid gap-12 sm:mt-16 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col gap-8 lg:col-span-7">
          <p className="text-2xl leading-[1.6] font-light sm:text-3xl sm:leading-[1.55]">
            一杯好酒，是味道、溫度與顏色的總和。我用調酒記錄這些細節，也用水彩把它們留下來。
          </p>
          <p className="max-w-[34rem] text-sm leading-[1.9] text-ink-soft">
            這份檔案收錄我調製與繪製的雞尾酒：每一款都有一張插畫、一行配方，以及背後的風味筆記。
          </p>
          <PlaceholderNote>個人簡介為佔位內容 · 待 LIN 補充</PlaceholderNote>
        </div>

        <dl className="lg:col-span-4 lg:col-start-9">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="grid grid-cols-[6rem_1fr] gap-4 border-t border-rule py-4 text-sm first:border-t-0 first:pt-0 sm:grid-cols-[7rem_1fr]"
            >
              <dt className="text-ink-soft">{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
