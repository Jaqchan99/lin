export type Ingredient = {
  measure: string
  name: string
}

export type FlavorAxis = {
  label: string
  /** 1 (low) to 5 (high) */
  value: number
}

export type CocktailStatus = 'draft' | 'published'

export type TitleVariant = 'bold' | 'light' | 'serif' | 'geometric'

export const categories = [
  { id: 'gin', zh: '琴酒', en: 'Gin' },
  { id: 'vodka', zh: '伏特加', en: 'Vodka' },
  { id: 'tequila', zh: '龍舌蘭', en: 'Tequila' },
  { id: 'whisky', zh: '威士忌', en: 'Whisky' },
  { id: 'rum', zh: '蘭姆酒', en: 'Rum' },
  { id: 'brandy', zh: '白蘭地', en: 'Brandy' },
  { id: 'aperitivo', zh: '開胃酒', en: 'Aperitivo' },
  { id: 'liqueur', zh: '利口酒', en: 'Liqueur' },
  { id: 'zero', zh: '無酒精', en: 'Zero-proof' },
  { id: 'other', zh: '其他', en: 'Other' },
] as const

export type CategoryId = (typeof categories)[number]['id']

export const titleVariantOptions: { id: TitleVariant; label: string }[] = [
  { id: 'bold', label: '粗體' },
  { id: 'light', label: '細體' },
  { id: 'serif', label: '襯線' },
  { id: 'geometric', label: '幾何' },
]

export const statusLabels: Record<CocktailStatus, string> = {
  draft: '草稿',
  published: '已發佈',
}

export const flavorLabels = ['甜度', '苦度', '酸度', '酒感'] as const

export type Cocktail = {
  id: string
  slug: string
  name: string
  status: CocktailStatus
  /** Short description shown under the title on the detail page. */
  intro: string
  category: CategoryId
  ingredients: Ingredient[]
  method: string[]
  flavor: FlavorAxis[]
  taste: string
  inspiration: string
  story: string
  /** Original reference photo. Studio-only; never rendered publicly. */
  originalPhoto: string
  /** Watercolor illustration. Path under /public or a data URL. */
  artwork: string
  artworkAlt: string
  featured: boolean
  titleVariant: TitleVariant
  /** While true, taste / inspiration / story are marked as placeholder copy in the UI. */
  isPlaceholder: boolean
  updatedAt: string
}

export function createFlavor(values: readonly number[]): FlavorAxis[] {
  return flavorLabels.map((label, index) => ({
    label,
    value: Math.min(5, Math.max(1, Math.round(values[index] ?? 1))),
  }))
}

export function getCategory(id: string) {
  return categories.find((category) => category.id === id) ?? categories[categories.length - 1]
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function isValidSlug(slug: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}

export function formatUpdatedAt(iso: string) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())}`
}

export function getPublished(list: Cocktail[]) {
  return list.filter((cocktail) => cocktail.status === 'published')
}

export function findBySlug(list: Cocktail[], slug: string) {
  return list.find((cocktail) => cocktail.slug === slug)
}

export function findById(list: Cocktail[], id: string) {
  return list.find((cocktail) => cocktail.id === id)
}

/** Previous / next wrap around so the archive reads as a loop. */
export function getAdjacent(list: Cocktail[], slug: string) {
  const index = list.findIndex((cocktail) => cocktail.slug === slug)
  const total = list.length
  return {
    prev: list[(index - 1 + total) % total],
    next: list[(index + 1) % total],
  }
}

/** Everything that must be in place before an entry can go public. */
export function getPublishIssues(cocktail: Cocktail) {
  const issues: string[] = []
  if (!cocktail.name.trim()) issues.push('名稱')
  if (!isValidSlug(cocktail.slug)) issues.push('網址代稱')
  if (!cocktail.intro.trim()) issues.push('簡短描述')
  if (!cocktail.ingredients.some((item) => item.name.trim())) issues.push('配方')
  if (!cocktail.artwork) issues.push('水彩插畫')
  return issues
}
