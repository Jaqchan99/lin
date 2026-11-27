import type { Metadata } from 'next'
import { CocktailDetailView } from '@/components/cocktail-detail-view'
import { findBySlug, getPublished } from '@/lib/cocktails'
import { seedCocktails } from '@/lib/mock-data'

type PageProps = {
  params: Promise<{ slug: string }>
}

const seedPublished = getPublished(seedCocktails)

export function generateStaticParams() {
  return seedPublished.map((cocktail) => ({ slug: cocktail.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const cocktail = findBySlug(seedPublished, slug)
  if (!cocktail) return { title: '雞尾酒' }

  return {
    title: cocktail.name,
    description: cocktail.intro,
    openGraph: { images: [cocktail.artwork] },
  }
}

/**
 * Entries created in the Studio live in the browser, so unknown slugs are
 * resolved on the client instead of calling notFound() on the server.
 */
export default async function CocktailPage({ params }: PageProps) {
  const { slug } = await params
  return <CocktailDetailView slug={slug} />
}
