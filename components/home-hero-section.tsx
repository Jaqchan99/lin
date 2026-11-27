'use client'

import { HomeHero } from '@/components/home-hero'
import { useCocktails } from '@/hooks/use-cocktails'

/** Picks the showcase piece: the espresso martini if public, else the first featured entry. */
export function HomeHeroSection() {
  const { published } = useCocktails()
  const hero =
    published.find((cocktail) => cocktail.slug === 'espresso-martini') ??
    published.find((cocktail) => cocktail.featured) ??
    published[0]

  return <HomeHero cocktail={hero} index={hero ? published.indexOf(hero) : 0} />
}
