import { createFlavor, type Cocktail } from '@/lib/cocktails'

const seedDate = '2026-11-25T00:00:00.000Z'

const tastePlaceholder = (name: string) =>
  `${name} 的口感與質地描述待 LIN 補充，例如：入口的第一印象、酒體的厚薄、冰塊稀釋後的變化與餘韻。`

const inspirationPlaceholder = (name: string) =>
  `關於 ${name} 的靈感來源，待 LIN 補充。可以寫下這杯酒的起點、參考的經典版本或當時的場景。`

const storyPlaceholder = (name: string) =>
  `關於 ${name} 的創作故事，待 LIN 補充。可以寫下調整配方的過程，以及它與水彩插畫之間的關係。`

export const seedCocktails: Cocktail[] = [
  {
    id: 'negroni',
    slug: 'negroni',
    status: 'published',
    category: 'gin',
    titleVariant: 'serif',
    featured: true,
    originalPhoto: '',
    updatedAt: seedDate,
    name: 'Negroni',
    artwork: '/art/negroni.png',
    artworkAlt:
      '水彩插畫：一只水晶岩石杯，盛著深紅色的 Negroni，杯中一塊大冰塊，杯緣掛著橙皮捲，背後是珊瑚紅的暈染背景。',
    intro:
      '以琴酒、金巴利與甜香艾酒等量調製，在岩石杯中以一塊大冰塊緩慢稀釋，杯緣掛上橙皮。',
    ingredients: [
      { measure: '3 CL', name: 'Gin' },
      { measure: '3 CL', name: 'Campari' },
      { measure: '3 CL', name: 'Sweet Vermouth' },
    ],
    method: [
      'Add ingredients to a mixing glass filled with ice, and stir until well-chilled.',
      'Strain into a rocks glass over a large ice cube.',
      'Garnish with an orange peel.',
    ],
    flavor: createFlavor([2, 5, 1, 4]),
    taste: tastePlaceholder('Negroni'),
    inspiration: inspirationPlaceholder('Negroni'),
    story: storyPlaceholder('Negroni'),
    isPlaceholder: true,
  },
  {
    id: 'margarita',
    slug: 'margarita',
    status: 'published',
    category: 'tequila',
    titleVariant: 'bold',
    featured: true,
    originalPhoto: '',
    updatedAt: seedDate,
    name: 'Margarita',
    artwork: '/art/margarita.png',
    artworkAlt:
      '水彩插畫：一只杯緣沾鹽的 Margarita 杯，盛著淡青檸色的酒液，杯緣放著一片青檸，背後是檸檬黃的暈染背景。',
    intro:
      '以龍舌蘭、橙皮利口酒與青檸汁搖製，杯口沾上一圈海鹽，以青檸片點綴。',
    ingredients: [
      { measure: '5 CL', name: 'Tequila' },
      { measure: '2 CL', name: 'Triple Sec' },
      { measure: '2.5 CL', name: 'Lime Juice' },
    ],
    method: [
      'Rub the rim of a coupe with lime and dip in flaky salt.',
      'Shake all ingredients hard with ice.',
      'Strain into the glass. Garnish with a lime wheel.',
    ],
    flavor: createFlavor([2, 1, 5, 3]),
    taste: tastePlaceholder('Margarita'),
    inspiration: inspirationPlaceholder('Margarita'),
    story: storyPlaceholder('Margarita'),
    isPlaceholder: true,
  },
  {
    id: 'espresso-martini',
    slug: 'espresso-martini',
    status: 'published',
    category: 'vodka',
    titleVariant: 'bold',
    featured: false,
    originalPhoto: '',
    updatedAt: seedDate,
    name: 'Espresso Martini',
    artwork: '/art/espresso-martini.png',
    artworkAlt:
      '水彩插畫：一只高腳碟形杯，盛著深褐色的 Espresso Martini，頂部是淺駝色泡沫，漂著三顆咖啡豆，背後是霧藍色的暈染背景。',
    intro:
      '以伏特加、咖啡利口酒與濃縮咖啡用力搖製，表面浮著一層細密泡沫與三顆咖啡豆。',
    ingredients: [
      { measure: '5 CL', name: 'Vodka' },
      { measure: '3 CL', name: 'Coffee Liqueur' },
      { measure: '3 CL', name: 'Espresso' },
    ],
    method: [
      'Shake all ingredients hard with ice until a thick foam forms.',
      'Double strain into a chilled coupe.',
      'Float three coffee beans on top.',
    ],
    flavor: createFlavor([3, 4, 1, 3]),
    taste: tastePlaceholder('Espresso Martini'),
    inspiration: inspirationPlaceholder('Espresso Martini'),
    story: storyPlaceholder('Espresso Martini'),
    isPlaceholder: true,
  },
  {
    id: 'aperol-spritz',
    slug: 'aperol-spritz',
    status: 'published',
    category: 'aperitivo',
    titleVariant: 'bold',
    featured: false,
    originalPhoto: '',
    updatedAt: seedDate,
    name: 'Aperol Spritz',
    artwork: '/art/aperol-spritz.png',
    artworkAlt:
      '水彩插畫：一只大號高腳杯，盛著明亮橙紅色的 Aperol Spritz，杯中有冰塊，杯緣放著半片橙子，背後是杏桃色的暈染背景。',
    intro:
      '以氣泡酒、Aperol 與蘇打水直接在大號酒杯中疊製，輕輕攪拌一圈，佐以半片橙子。',
    ingredients: [
      { measure: '6 CL', name: 'Prosecco' },
      { measure: '4 CL', name: 'Aperol' },
      { measure: '1 CL', name: 'Soda' },
    ],
    method: [
      'Build over ice in a large wine glass.',
      'Stir gently once.',
      'Garnish with a half orange slice.',
    ],
    flavor: createFlavor([3, 3, 2, 1]),
    taste: tastePlaceholder('Aperol Spritz'),
    inspiration: inspirationPlaceholder('Aperol Spritz'),
    story: storyPlaceholder('Aperol Spritz'),
    isPlaceholder: true,
  },
  {
    id: 'dry-martini',
    slug: 'dry-martini',
    status: 'published',
    category: 'gin',
    titleVariant: 'bold',
    featured: false,
    originalPhoto: '',
    updatedAt: seedDate,
    name: 'Dry Martini',
    artwork: '/art/dry-martini.png',
    artworkAlt:
      '水彩插畫：一只經典 V 形馬丁尼杯，盛著清澈透明的酒液，杯口橫放一支穿著青橄欖的酒籤，背後是長春花藍的暈染背景。',
    intro:
      '以琴酒、不甜香艾酒與橄欖鹽水攪拌至極冷，濾入預先冰鎮的馬丁尼杯。',
    ingredients: [
      { measure: '6 CL', name: 'Gin' },
      { measure: '1 CL', name: 'Dry Vermouth' },
      { measure: '1 CL', name: 'Olive Brine' },
    ],
    method: [
      'Stir all ingredients with ice until very cold.',
      'Strain into a chilled martini glass.',
      'Garnish with an olive or lemon peel.',
    ],
    flavor: createFlavor([1, 2, 1, 5]),
    taste: tastePlaceholder('Dry Martini'),
    inspiration: inspirationPlaceholder('Dry Martini'),
    story: storyPlaceholder('Dry Martini'),
    isPlaceholder: true,
  },
  {
    id: 'old-fashioned',
    slug: 'old-fashioned',
    status: 'published',
    category: 'whisky',
    titleVariant: 'bold',
    featured: true,
    originalPhoto: '',
    updatedAt: seedDate,
    name: 'Old Fashioned',
    artwork: '/art/old-fashioned.png',
    artworkAlt:
      '水彩插畫：一只厚底水晶岩石杯，盛著琥珀色的威士忌，杯中一塊大冰塊，配有橙皮扭條與一顆深紅色櫻桃，背後是赭黃色的暈染背景。',
    intro:
      '以波本威士忌、糖漿與苦精在岩石杯中直接攪拌，加入大冰塊，配上橙皮與櫻桃。',
    ingredients: [
      { measure: '6 CL', name: 'Bourbon' },
      { measure: '1 CL', name: 'Sugar Syrup' },
      { measure: '2 DASH', name: 'Bitters' },
    ],
    method: [
      'Add syrup, bitters and bourbon to a rocks glass.',
      'Add a large ice cube and stir for thirty seconds.',
      'Garnish with an orange twist and a cherry.',
    ],
    flavor: createFlavor([3, 3, 1, 4]),
    taste: tastePlaceholder('Old Fashioned'),
    inspiration: inspirationPlaceholder('Old Fashioned'),
    story: storyPlaceholder('Old Fashioned'),
    isPlaceholder: true,
  },
  {
    id: 'paper-plane',
    slug: 'paper-plane',
    status: 'draft',
    category: 'whisky',
    titleVariant: 'bold',
    featured: false,
    name: 'Paper Plane',
    originalPhoto: '',
    artwork: '',
    artworkAlt: '',
    updatedAt: '2026-11-25T12:00:00.000Z',
    intro: '以波本、Aperol、Amaro 與檸檬汁等量搖製，酸甜苦平衡，尚未完成插畫。',
    ingredients: [
      { measure: '2.25 CL', name: 'Bourbon' },
      { measure: '2.25 CL', name: 'Aperol' },
      { measure: '2.25 CL', name: 'Amaro Nonino' },
      { measure: '2.25 CL', name: 'Lemon Juice' },
    ],
    method: ['Shake all ingredients with ice.', 'Strain into a chilled coupe.'],
    flavor: createFlavor([3, 3, 4, 3]),
    taste: '',
    inspiration: '',
    story: '',
    isPlaceholder: false,
  },
]
