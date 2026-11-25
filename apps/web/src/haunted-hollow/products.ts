export interface Product {
  slug: string;
  name: string;
  price: string;
  image: string;
  description: string;
  longDescription: string;
  category: string;
}

export const products: Product[] = [
  {
    slug: 'black-amber-pillar-candle',
    name: 'Black Amber Pillar Candle',
    price: '$34.00',
    image: '/haunted-hollow/images/IMG_9154.jpg.svg',
    description: 'Hand-poured soy wax. Notes of dark amber, sandalwood & black oud.',
    longDescription:
      'Each candle is hand-poured in small batches using 100% natural soy wax. The black amber fragrance opens with smoky top notes before settling into deep sandalwood and oud. Burns for approximately 55 hours.',
    category: 'Candles',
  },
  {
    slug: 'momento-mori-skull-planter',
    name: 'Memento Mori Skull Planter',
    price: '$58.00',
    image: '/haunted-hollow/images/IMG_7703.jpg.svg',
    description: 'Hand-cast resin. Drainage hole included. Perfect for succulents.',
    longDescription:
      'Cast from hand-sculpted originals in durable resin. Each piece is finished by hand, so minor variations in texture are expected. Includes a drainage hole and saucer. Dimensions: 15cm × 12cm × 14cm.',
    category: 'Home Décor',
  },
  {
    slug: 'midnight-elixir-potion-bottle',
    name: 'Midnight Elixir Potion Bottle',
    price: '$22.00',
    image: '/haunted-hollow/images/DSC_0042.jpg.svg',
    description: 'Hand-blown glass. Violet salt & elderflower bath soak inside.',
    longDescription:
      'Each potion bottle is individually hand-blown by artisan glassblowers in the Hollow. Filled with our proprietary Midnight Elixir bath soak — violet sea salts, dried elderflower, and lavender essential oil.',
    category: 'Bath & Body',
  },
  {
    slug: 'rider-hollow-tarot-deck',
    name: 'Rider-Hollow Tarot Deck',
    price: '$48.00',
    image: '/haunted-hollow/images/P1040892.jpg.svg',
    description: '78 cards. Original gothic illustrations. Linen-finish stock.',
    longDescription:
      'All 78 cards, illustrated in the classic Rider tradition with a Haunted Hollow gothic twist. Printed on premium 350gsm linen-finish card stock. Comes with a 240-page illustrated guidebook in a magnetic-closure box.',
    category: 'Divination',
  },
  {
    slug: 'raven-sentinels-bookends',
    name: 'Raven Sentinels Bookends',
    price: '$95.00',
    image: '/haunted-hollow/images/DSCF2201.jpg.svg',
    description: 'Cast iron pair. Weighted non-slip base. Sold as a set of two.',
    longDescription:
      'Cast from solid iron and finished with a hand-rubbed antiqued patina. The heavy weighted bases prevent slipping. Each raven measures approximately 24cm tall. Sold as a matched pair.',
    category: 'Home Décor',
  },
  {
    slug: 'crystal-oracle-orb',
    name: 'Crystal Oracle Orb',
    price: '$120.00',
    image: '/haunted-hollow/images/IMG_3317.jpg.svg',
    description: 'Borosilicate glass. 10cm diameter. Stand included.',
    longDescription:
      'Hand-blown borosilicate glass sphere, 10cm in diameter, with an internal violet nebula effect achieved through a proprietary blown-glass technique. Comes with a black velvet stand and presentation box.',
    category: 'Divination',
  },
];
