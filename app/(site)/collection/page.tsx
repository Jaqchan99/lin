import type { Metadata } from 'next'
import { CollectionView } from '@/components/collection-view'

export const metadata: Metadata = {
  title: '作品集',
  description: 'LIN 的雞尾酒作品集：水彩插畫與配方，點擊進入每一款的詳情。',
}

export default function CollectionPage() {
  return <CollectionView />
}
