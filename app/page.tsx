import { AboutSection } from '@/components/about-section'
import { FeaturedCocktails } from '@/components/featured-cocktails'
import { HomeHero } from '@/components/home-hero'
import { cocktails } from '@/lib/cocktails'

const heroCocktail = cocktails.find(
  (cocktail) => cocktail.slug === 'espresso-martini',
)!

export default function HomePage() {
  return (
    <>
      <HomeHero
        cocktail={heroCocktail}
        index={cocktails.indexOf(heroCocktail)}
      />
      <FeaturedCocktails />
      <AboutSection />
    </>
  )
}
