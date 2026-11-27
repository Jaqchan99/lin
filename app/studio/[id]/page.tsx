import type { Metadata } from 'next'
import { CocktailEditor } from '@/components/studio/cocktail-editor'

export const metadata: Metadata = { title: '編輯雞尾酒' }

export default async function EditCocktailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <CocktailEditor id={id} />
}
