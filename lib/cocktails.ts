export type Ingredient = {
  measure: string
  name: string
}

export type Cocktail = {
  id: string
  name: string
  artwork: string
  artworkAlt: string
  ingredients: Ingredient[]
  method: string[]
}

export const cocktails: Cocktail[] = [
  {
    id: 'negroni',
    name: 'Negroni',
    artwork: '/art/negroni.png',
    artworkAlt:
      '水彩插画：一只水晶岩石杯，盛着深红色的内格罗尼，杯中一块大冰球，杯沿挂着橙皮卷，背后是珊瑚红的晕染背景。',
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
  },
  {
    id: 'margarita',
    name: 'Margarita',
    artwork: '/art/margarita.png',
    artworkAlt:
      '水彩插画：一只边缘沾盐的玛格丽特杯，盛着淡青柠色的酒液，杯沿放着一片青柠，背后是柠檬黄的晕染背景。',
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
  },
  {
    id: 'espresso-martini',
    name: 'Espresso Martini',
    artwork: '/art/espresso-martini.png',
    artworkAlt:
      '水彩插画：一只高脚蝶形杯，盛着深褐色的浓缩咖啡马天尼，顶部是浅驼色泡沫，漂着三颗咖啡豆，背后是雾蓝色的晕染背景。',
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
  },
  {
    id: 'aperol-spritz',
    name: 'Aperol Spritz',
    artwork: '/art/aperol-spritz.png',
    artworkAlt:
      '水彩插画：一只大号高脚杯，盛着明亮的橙红色阿佩罗气泡酒，杯中有冰块，杯沿放着半片橙子，背后是杏桃色的晕染背景。',
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
  },
  {
    id: 'dry-martini',
    name: 'Dry Martini',
    artwork: '/art/dry-martini.png',
    artworkAlt:
      '水彩插画：一只经典 V 形马天尼杯，盛着清澈透明的酒液，杯沿横放一支穿着青橄榄的酒签，背后是长春花蓝的晕染背景。',
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
  },
  {
    id: 'old-fashioned',
    name: 'Old Fashioned',
    artwork: '/art/old-fashioned.png',
    artworkAlt:
      '水彩插画：一只厚底水晶岩石杯，盛着琥珀色的威士忌，杯中一块大冰球，配有橙皮扭条和一颗深红色樱桃，背后是赭黄色的晕染背景。',
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
  },
]
