import type { Metadata } from 'next'
import { CocktailEditor } from '@/components/studio/cocktail-editor'

export const metadata: Metadata = { title: '新增雞尾酒' }

export default function NewCocktailPage() {
  return <CocktailEditor />
}
