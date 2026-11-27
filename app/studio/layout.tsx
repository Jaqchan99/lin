import type { Metadata } from 'next'
import { StudioHeader } from '@/components/studio/studio-header'

export const metadata: Metadata = {
  title: { default: 'Studio', template: '%s — LIN Studio' },
  description: 'LIN 的私人工作室：新增、編輯與發佈雞尾酒作品。',
  robots: { index: false, follow: false },
}

export default function StudioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <StudioHeader />
      <main className="flex-1">{children}</main>
    </>
  )
}
