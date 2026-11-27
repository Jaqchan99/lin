import {
  createFlavor,
  flavorLabels,
  isValidSlug,
  type CategoryId,
  type Cocktail,
  type CocktailStatus,
  type TitleVariant,
} from '@/lib/cocktails'

export type FormRow = { key: string; text: string }
export type IngredientRow = { key: string; measure: string; name: string }

/** Editable shape of a cocktail. Arrays carry stable keys for React lists. */
export type CocktailFormValues = {
  name: string
  slug: string
  intro: string
  category: CategoryId
  ingredients: IngredientRow[]
  method: FormRow[]
  flavor: number[]
  taste: string
  inspiration: string
  story: string
  originalPhoto: string
  artwork: string
  artworkAlt: string
  featured: boolean
  titleVariant: TitleVariant
}

export type FormErrors = Partial<Record<keyof CocktailFormValues, string>>

export function createKey() {
  return Math.random().toString(36).slice(2, 10)
}

export function createId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `c-${Date.now().toString(36)}-${createKey()}`
}

export function emptyForm(): CocktailFormValues {
  return {
    name: '',
    slug: '',
    intro: '',
    category: 'gin',
    ingredients: [{ key: createKey(), measure: '', name: '' }],
    method: [{ key: createKey(), text: '' }],
    flavor: [3, 3, 3, 3],
    taste: '',
    inspiration: '',
    story: '',
    originalPhoto: '',
    artwork: '',
    artworkAlt: '',
    featured: false,
    titleVariant: 'bold',
  }
}

export function cocktailToForm(cocktail: Cocktail): CocktailFormValues {
  return {
    name: cocktail.name,
    slug: cocktail.slug,
    intro: cocktail.intro,
    category: cocktail.category,
    ingredients: cocktail.ingredients.length
      ? cocktail.ingredients.map((item) => ({ key: createKey(), ...item }))
      : [{ key: createKey(), measure: '', name: '' }],
    method: cocktail.method.length
      ? cocktail.method.map((text) => ({ key: createKey(), text }))
      : [{ key: createKey(), text: '' }],
    flavor: flavorLabels.map(
      (label) => cocktail.flavor.find((axis) => axis.label === label)?.value ?? 3,
    ),
    taste: cocktail.taste,
    inspiration: cocktail.inspiration,
    story: cocktail.story,
    originalPhoto: cocktail.originalPhoto,
    artwork: cocktail.artwork,
    artworkAlt: cocktail.artworkAlt,
    featured: cocktail.featured,
    titleVariant: cocktail.titleVariant,
  }
}

/** Stable string used to detect unsaved changes (ignores React keys). */
export function serializeForm(values: CocktailFormValues) {
  return JSON.stringify({
    ...values,
    ingredients: values.ingredients.map(({ measure, name }) => ({ measure, name })),
    method: values.method.map(({ text }) => text),
  })
}

export function formToCocktail(
  values: CocktailFormValues,
  options: { id: string; status: CocktailStatus; base?: Cocktail },
): Cocktail {
  const name = values.name.trim()
  const taste = values.taste.trim()
  const inspiration = values.inspiration.trim()
  const story = values.story.trim()
  const base = options.base

  const stillPlaceholder =
    !!base?.isPlaceholder &&
    taste === base.taste.trim() &&
    inspiration === base.inspiration.trim() &&
    story === base.story.trim()

  return {
    id: options.id,
    slug: values.slug.trim(),
    name,
    status: options.status,
    intro: values.intro.trim(),
    category: values.category,
    ingredients: values.ingredients
      .map(({ measure, name: ingredient }) => ({
        measure: measure.trim(),
        name: ingredient.trim(),
      }))
      .filter((item) => item.name),
    method: values.method.map(({ text }) => text.trim()).filter(Boolean),
    flavor: createFlavor(values.flavor),
    taste,
    inspiration,
    story,
    originalPhoto: values.originalPhoto,
    artwork: values.artwork,
    artworkAlt: values.artwork
      ? values.artworkAlt.trim() || `${name || '雞尾酒'} 的水彩插畫`
      : '',
    featured: values.featured,
    titleVariant: values.titleVariant,
    isPlaceholder: stillPlaceholder,
    updatedAt: new Date().toISOString(),
  }
}

/** Draft-tolerant version used for live previews: empty fields get stand-ins. */
export function formToPreview(
  values: CocktailFormValues,
  options: { id: string; status: CocktailStatus; base?: Cocktail },
): Cocktail {
  const cocktail = formToCocktail(values, options)
  return {
    ...cocktail,
    name: cocktail.name || '未命名',
    slug: cocktail.slug || 'untitled',
    artworkAlt: cocktail.artworkAlt || '尚未加入水彩插畫',
  }
}

export function validateForm(
  values: CocktailFormValues,
  context: {
    intent: 'draft' | 'publish'
    currentId: string
    others: Cocktail[]
  },
): FormErrors {
  const errors: FormErrors = {}
  const slug = values.slug.trim()

  if (!values.name.trim()) errors.name = '請輸入名稱。'

  if (!slug) {
    errors.slug = '請輸入網址代稱。'
  } else if (!isValidSlug(slug)) {
    errors.slug = '只能使用小寫英文字母、數字與連字號，例如 paper-plane。'
  } else if (
    context.others.some((item) => item.slug === slug && item.id !== context.currentId)
  ) {
    errors.slug = '這個網址代稱已被其他雞尾酒使用。'
  }

  if (context.intent === 'publish') {
    if (!values.intro.trim()) errors.intro = '發佈前請填寫簡短描述。'
    if (!values.ingredients.some((item) => item.name.trim())) {
      errors.ingredients = '發佈前至少需要一項材料。'
    }
    if (!values.artwork) errors.artwork = '發佈前請上傳或選擇一張水彩插畫。'
  }

  return errors
}
