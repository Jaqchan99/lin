import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CocktailDetail } from '@/components/cocktail-detail'
import { CocktailPager } from '@/components/cocktail-pager'
import {
  cocktails,
  getAdjacentCocktails,
  getCocktailBySlug,
  getCocktailIndex,
} from '@/lib/cocktails'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return cocktails.map((cocktail) => ({ slug: cocktail.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const cocktail = getCocktailBySlug(slug)
  if (!cocktail) return {}

  return {
    title: cocktail.name,
    description: cocktail.intro,
    openGraph: { images: [cocktail.artwork] },
  }
}

export default async function CocktailPage({ params }: PageProps) {
  const { slug } = await params
  const cocktail = getCocktailBySlug(slug)
  if (!cocktail) notFound()

  const { prev, next } = getAdjacentCocktails(slug)

  return (
    <>
      <CocktailDetail
        cocktail={cocktail}
        index={getCocktailIndex(slug)}
        total={cocktails.length}
      />
      <CocktailPager prev={prev} next={next} />
    </>
  )
}
