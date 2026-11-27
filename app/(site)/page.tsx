import { AboutSection } from '@/components/about-section'
import { FeaturedCocktails } from '@/components/featured-cocktails'
import { HomeHeroSection } from '@/components/home-hero-section'

export default function HomePage() {
  return (
    <>
      <HomeHeroSection />
      <FeaturedCocktails />
      <AboutSection />
    </>
  )
}
