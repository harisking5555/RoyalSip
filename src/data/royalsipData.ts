export type PageId = 'home' | 'about' | 'solutions' | 'packages' | 'contact';

export const BRAND = {
  name: 'RoyalSip',
  tagline: 'Turn water into your brand.',
  domain: 'royalsipbeverages.pk',
  websiteUrl: 'https://royalsipbeverages.pk',
  email: 'info@royalsipbeverages.pk',
  city: 'Lahore, Pakistan',
  sizes: '500ml & 1.5L',
  logoUrl: 'https://i.postimg.cc/XvPVh6j1/royalsip-logo-transparent.png',
  whatsappDisplay: '0321-4551473',
  whatsappIntl: '+92-321-455-1473',
  whatsappNumberRaw: '923214551473',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61595403909316',
  instagramUrl: 'https://www.instagram.com/royalsip707/',
};

export const BOTTLE_PHOTOS = {
  waterPair: '/src/assets/images/bottle_water_pair_studio_1795094882658.jpg',
  juiceTrio: '/src/assets/images/bottle_juice_trio_studio_1795094882862.jpg',
  shadiLuxury: '/src/assets/images/bottle_shadi_luxury_studio_1795094882830.jpg',
  corporatePack: '/src/assets/images/bottle_corporate_pack_studio_1795094883335.jpg',
};

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${BRAND.whatsappNumberRaw}?text=${encodeURIComponent(message)}`;
}

export interface HeroSlide {
  id: string;
  headlineStart: string;
  headlineHighlight: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  primaryLabel: string;
  primaryTarget: PageId;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'hero-brand',
    headlineStart: 'Turn water',
    headlineHighlight: 'into your brand.',
    subtitle: 'Custom mineral water & fruit juice bottles crafted for Lahore weddings, corporates, and restaurants.',
    image: BOTTLE_PHOTOS.waterPair,
    imageAlt: 'RoyalSip custom mineral water bottles',
    primaryLabel: 'View Packages',
    primaryTarget: 'packages',
  },
  {
    id: 'hero-shadi',
    headlineStart: 'Your Big Day.',
    headlineHighlight: 'On every table.',
    subtitle: 'Couple names, wedding dates, and gold-foil labels with complimentary Lahore venue delivery.',
    image: BOTTLE_PHOTOS.shadiLuxury,
    imageAlt: 'Shadi Royale custom wedding water bottles',
    primaryLabel: 'Explore Weddings',
    primaryTarget: 'solutions',
  },
  {
    id: 'hero-combo',
    headlineStart: 'Water + juice.',
    headlineHighlight: 'One royal combo.',
    subtitle: 'Pure mineral water paired with chilled Orange, Mango & Lime juices in custom branded bottles.',
    image: BOTTLE_PHOTOS.juiceTrio,
    imageAlt: 'RoyalSip chilled orange, mango and lime juice bottles',
    primaryLabel: 'Explore Combos',
    primaryTarget: 'solutions',
  },
];

export interface HighlightSlideItem {
  id: string;
  metric: string;
  label: string;
  accentGradient: string;
  metricColor: string;
}

export const HIGHLIGHT_SLIDES: HighlightSlideItem[] = [
  {
    id: 'hl-50',
    metric: '50+',
    label: 'Minimum bottles for private parties',
    accentGradient: 'from-[#D4AF37] via-amber-500 to-orange-500',
    metricColor: '#B45309',
  },
  {
    id: 'hl-10off',
    metric: '10% OFF',
    label: 'Event planner partner & 1st month dining',
    accentGradient: 'from-pink-500 via-rose-500 to-[#D4AF37]',
    metricColor: '#DB2777',
  },
  {
    id: 'hl-free',
    metric: 'FREE',
    label: 'Custom label design & Lahore samples',
    accentGradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    metricColor: '#059669',
  },
  {
    id: 'hl-flavors',
    metric: '4 Flavors',
    label: 'Pure water, Orange, Mango & Lime juice',
    accentGradient: 'from-sky-500 via-violet-500 to-pink-500',
    metricColor: '#0284C7',
  },
  {
    id: 'hl-sizes',
    metric: '500ml & 1.5L',
    label: 'Custom ribbed PET bottles for every venue',
    accentGradient: 'from-[#D4AF37] via-yellow-500 to-emerald-500',
    metricColor: '#B45309',
  },
];

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  accentGradient: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-wedding',
    quote:
      'Guests kept photographing our couple-monogrammed bottles at the Walima. Gold foil looked elegant on every dining table and delivery reached our marquee right on time.',
    author: 'Sana & Bilal Ahmed',
    role: 'Wedding Hosts',
    company: 'DHA Phase 6, Lahore',
    accentGradient: 'from-[#D4AF37] via-rose-500 to-pink-500',
  },
  {
    id: 'test-planner',
    quote:
      'RoyalSip gives us priority slots even in peak November wedding season. Having a flat 10% partner rate lets us include bespoke client water bottles on every event.',
    author: 'Zara Mansoor',
    role: 'Lead Event Planner',
    company: 'Aura Weddings & Marquees',
    accentGradient: 'from-violet-500 via-[#D4AF37] to-amber-500',
  },
  {
    id: 'test-restaurant',
    quote:
      'Switching to our own branded 500ml and 1.5L table water elevated our dining presentation instantly. The monthly refill schedule runs without a single reminder.',
    author: 'Chef Adeel Qureshi',
    role: 'Managing Partner',
    company: 'Saffron Courtyard, Gulberg',
    accentGradient: 'from-emerald-500 via-teal-500 to-[#D4AF37]',
  },
  {
    id: 'test-corporate',
    quote:
      'They sent free printed sample bottles to our office within a day. Our boardroom conferences and seminar desks look sharp with our corporate emblem on every bottle.',
    author: 'Hamza Malik',
    role: 'Operations Director',
    company: 'Lahore Business Suites',
    accentGradient: 'from-sky-500 via-indigo-500 to-[#D4AF37]',
  },
];

export type SolutionCategory = 'all' | 'weddings' | 'business' | 'homes-parties' | 'combos';

export interface SolutionPack {
  id: string;
  category: Exclude<SolutionCategory, 'all'>;
  segment: string;
  title: string;
  headline: string;
  highlight: string;
  specs: string;
  bullets: string[];
  ctaText: string;
  accentGradient: string;
  accentHex: string;
  image: string;
  defaultLabelTitle: string;
  defaultLabelSub: string;
  defaultDrink: DrinkVariantId;
}

export type DrinkVariantId = 'water-500' | 'water-1500' | 'juice-orange' | 'juice-mango' | 'juice-lime';
export type PackageTierId = 'basic' | 'premium' | 'luxury';

export interface DrinkVariant {
  id: DrinkVariantId;
  label: string;
  volume: string;
}

export const DRINK_VARIANTS: DrinkVariant[] = [
  { id: 'water-500', label: '500ml Pure Water', volume: '500ml' },
  { id: 'water-1500', label: '1.5L Family Water', volume: '1.5L' },
  { id: 'juice-orange', label: 'Orange Juice (500ml)', volume: '500ml' },
  { id: 'juice-mango', label: 'Mango Juice (500ml)', volume: '500ml' },
  { id: 'juice-lime', label: 'Lime Juice (500ml)', volume: '500ml' },
];

export interface BottleSlideEdition {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  volume: string;
  priceRange: string;
  image: string;
  accentGradient: string;
  drinkId: DrinkVariantId;
  labelTitle: string;
}

export const BOTTLE_SLIDES: BottleSlideEdition[] = [
  {
    id: 'slide-water-pair',
    tag: 'Mineral Water',
    title: 'Signature Water Pair',
    subtitle: 'Crystal-clear ribbed PET bottles with waterproof custom branding.',
    volume: '500ml & 1.5L',
    priceRange: 'PKR 80–150',
    image: BOTTLE_PHOTOS.waterPair,
    accentGradient: 'from-[#D4AF37] via-amber-500 to-sky-500',
    drinkId: 'water-500',
    labelTitle: 'RoyalSip Pure',
  },
  {
    id: 'slide-juice-trio',
    tag: 'Fruit Juices',
    title: 'Orange, Mango & Lime',
    subtitle: 'Chilled fruit juice bottles paired with custom event water.',
    volume: '500ml Trio',
    priceRange: 'Combo Rate',
    image: BOTTLE_PHOTOS.juiceTrio,
    accentGradient: 'from-orange-500 via-amber-400 to-emerald-500',
    drinkId: 'juice-orange',
    labelTitle: 'Event Juices',
  },
  {
    id: 'slide-shadi-luxury',
    tag: 'Weddings & Marquees',
    title: 'Shadi Royale Edition',
    subtitle: 'Couple names, date, and gold accents with free Lahore venue delivery.',
    volume: '500+ Bottles',
    priceRange: 'PKR 120–250',
    image: BOTTLE_PHOTOS.shadiLuxury,
    accentGradient: 'from-rose-500 via-[#D4AF37] to-amber-500',
    drinkId: 'water-500',
    labelTitle: 'Shadi Edition',
  },
  {
    id: 'slide-corporate',
    tag: 'Corporate & Dining',
    title: 'Executive Table Pack',
    subtitle: 'Your company or restaurant logo on every desk and dining table.',
    volume: '500ml & 1.5L',
    priceRange: '10% Off 1st Month',
    image: BOTTLE_PHOTOS.corporatePack,
    accentGradient: 'from-[#D4AF37] via-pink-500 to-cyan-500',
    drinkId: 'water-1500',
    labelTitle: 'Executive Table',
  },
];

export const CRAFT_SLIDES: BottleSlideEdition[] = [
  {
    id: 'craft-label',
    tag: '01 · Custom Artwork',
    title: 'Free Digital Mock-Up',
    subtitle: 'Share your logo or names and preview your label before printing.',
    volume: 'Zero Design Fee',
    priceRange: '24h Proof',
    image: BOTTLE_PHOTOS.corporatePack,
    accentGradient: 'from-[#D4AF37] via-amber-500 to-orange-500',
    drinkId: 'water-500',
    labelTitle: 'Custom Artwork',
  },
  {
    id: 'craft-foil',
    tag: '02 · Luxury Finish',
    title: 'Waterproof & Foil Labels',
    subtitle: 'Ice-bucket proof gloss wraps and metallic gold finishes.',
    volume: 'Basic to VIP',
    priceRange: 'PKR 80–250',
    image: BOTTLE_PHOTOS.shadiLuxury,
    accentGradient: 'from-amber-500 via-pink-500 to-violet-500',
    drinkId: 'water-500',
    labelTitle: 'Gold Foil Finish',
  },
  {
    id: 'craft-juice',
    tag: '03 · Pure & Chilled',
    title: 'Hygienic Bottling & Juices',
    subtitle: 'Pure mineral water alongside chilled Orange, Mango & Lime juices.',
    volume: '500ml & 1.5L',
    priceRange: '4 Variants',
    image: BOTTLE_PHOTOS.juiceTrio,
    accentGradient: 'from-orange-500 via-pink-500 to-emerald-500',
    drinkId: 'juice-mango',
    labelTitle: 'Water & Juices',
  },
  {
    id: 'craft-delivery',
    tag: '04 · Lahore Logistics',
    title: 'Direct Venue Delivery',
    subtitle: 'Scheduled delivery to marquees, offices, and restaurants across Lahore.',
    volume: 'From 50 Bottles',
    priceRange: 'On-Time Drop',
    image: BOTTLE_PHOTOS.waterPair,
    accentGradient: 'from-sky-500 via-[#D4AF37] to-emerald-500',
    drinkId: 'water-1500',
    labelTitle: 'Lahore Delivery',
  },
];

export const SOLUTIONS: SolutionPack[] = [
  {
    id: 'shadi-royale',
    category: 'weddings',
    segment: 'Weddings & Marquees',
    title: 'Shadi Royale Bundle',
    headline: 'Your names on every table.',
    highlight: 'Free Design',
    specs: '500+ Bottles · 500ml',
    bullets: [
      'Couple names, date & décor-matched labels',
      'Free venue delivery across Lahore',
    ],
    ctaText: 'Book Wedding Dates',
    accentGradient: 'from-amber-500 via-rose-500 to-pink-500',
    accentHex: '#E11D48',
    image: BOTTLE_PHOTOS.shadiLuxury,
    defaultLabelTitle: 'Ayesha & Hamza',
    defaultLabelSub: 'Walima · Lahore',
    defaultDrink: 'water-500',
  },
  {
    id: 'planner-partner',
    category: 'weddings',
    segment: 'Event Planners',
    title: 'Planner Partner Pack',
    headline: 'Plan bigger. Serve royal.',
    highlight: '10% Partner Rate',
    specs: '500ml & 1.5L',
    bullets: [
      'Flat 10% partner rate on every order',
      'Priority peak-season production',
    ],
    ctaText: 'Join Partner Network',
    accentGradient: 'from-[#D4AF37] via-amber-500 to-violet-500',
    accentHex: '#B45309',
    image: BOTTLE_PHOTOS.waterPair,
    defaultLabelTitle: 'Signature Events',
    defaultLabelSub: 'VIP Wedding Edition',
    defaultDrink: 'water-500',
  },
  {
    id: 'corporate-brand',
    category: 'business',
    segment: 'Corporate Events',
    title: 'Corporate Brand Pack',
    headline: 'Your logo. On every desk.',
    highlight: 'Bulk Rates',
    specs: '500ml Custom Label',
    bullets: [
      'Company logo & brand colours on 500ml bottles',
      'Free mock-up before bulk production',
    ],
    ctaText: 'Request Free Mock-Up',
    accentGradient: 'from-[#D4AF37] via-sky-500 to-indigo-500',
    accentHex: '#0284C7',
    image: BOTTLE_PHOTOS.corporatePack,
    defaultLabelTitle: 'Apex Tech Summit',
    defaultLabelSub: 'Corporate Edition',
    defaultDrink: 'water-500',
  },
  {
    id: 'restaurant-table',
    category: 'business',
    segment: 'Restaurants & Cafés',
    title: 'Restaurant Table Plan',
    headline: 'On every table, every day.',
    highlight: '10% Off 1st Month',
    specs: 'Monthly Supply',
    bullets: [
      'Logo bottles in 500ml & 1.5L sizes',
      'Locked-in fixed monthly refill rates',
    ],
    ctaText: 'Upgrade Tables',
    accentGradient: 'from-emerald-500 via-teal-500 to-[#D4AF37]',
    accentHex: '#059669',
    image: BOTTLE_PHOTOS.waterPair,
    defaultLabelTitle: 'Table Water Plan',
    defaultLabelSub: 'Monthly Supply',
    defaultDrink: 'water-1500',
  },
  {
    id: 'party-bottles',
    category: 'homes-parties',
    segment: 'Private Parties',
    title: 'Personalised Party Pack',
    headline: 'Make every sip personal.',
    highlight: 'From 50 Bottles',
    specs: 'Custom Label · 500ml',
    bullets: [
      'Birthdays, mehndi, dholki & bridal showers',
      'Free custom label from just 50 bottles',
    ],
    ctaText: 'Personalize Party',
    accentGradient: 'from-pink-500 via-purple-500 to-cyan-500',
    accentHex: '#DB2777',
    image: BOTTLE_PHOTOS.juiceTrio,
    defaultLabelTitle: "Zainab's Mehndi",
    defaultLabelSub: 'Party Edition',
    defaultDrink: 'water-500',
  },
  {
    id: 'pure-water-delivered',
    category: 'homes-parties',
    segment: 'Homes & Offices',
    title: 'Pure Water, Delivered',
    headline: 'Pure hydration. Royal standard.',
    highlight: 'Free 1st Delivery',
    specs: '500ml & 1.5L',
    bullets: [
      '1.5L family packs & 500ml office cases',
      'Free doorstep delivery on 1st order',
    ],
    ctaText: 'Order First Pack',
    accentGradient: 'from-cyan-500 via-sky-500 to-[#D4AF37]',
    accentHex: '#0EA5E9',
    image: BOTTLE_PHOTOS.waterPair,
    defaultLabelTitle: 'RoyalSip Pure',
    defaultLabelSub: 'Home & Office',
    defaultDrink: 'water-1500',
  },
  {
    id: 'event-drinks-combo',
    category: 'combos',
    segment: 'Juice + Water',
    title: 'Event Drinks Combo',
    headline: 'Water + juice. One combo.',
    highlight: 'Combo Deal',
    specs: 'Orange · Mango · Lime',
    bullets: [
      'Custom water + chilled fruit juice bottles',
      'One streamlined order and single bill',
    ],
    ctaText: 'Add Juice Combo',
    accentGradient: 'from-orange-500 via-amber-500 to-emerald-500',
    accentHex: '#EA580C',
    image: BOTTLE_PHOTOS.juiceTrio,
    defaultLabelTitle: 'Royal Feast Combo',
    defaultLabelSub: 'Juice + Water',
    defaultDrink: 'juice-mango',
  },
  {
    id: 'try-royalsip-free',
    category: 'business',
    segment: 'Sample Program',
    title: 'Try RoyalSip Free',
    headline: 'See it. Taste it. Then order.',
    highlight: 'Free Samples',
    specs: 'Lahore Business Slots',
    bullets: [
      'Free sample bottles printed with your logo',
      'Delivered to your venue with zero commitment',
    ],
    ctaText: 'Book Free Sample',
    accentGradient: 'from-[#D4AF37] via-amber-500 to-orange-500',
    accentHex: '#D97706',
    image: BOTTLE_PHOTOS.corporatePack,
    defaultLabelTitle: 'Your Brand Sample',
    defaultLabelSub: 'Tasting Kit',
    defaultDrink: 'water-500',
  },
];

export interface PricingTier {
  id: PackageTierId;
  name: string;
  minPrice: number;
  maxPrice: number;
  rangeLabel: string;
  subtitle: string;
  features: string[];
  featured?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    minPrice: 80,
    maxPrice: 100,
    rangeLabel: '80–100',
    subtitle: 'Standard custom label · 500ml / 1.5L',
    features: [
      'Clean waterproof custom label',
      '500ml or 1.5L pure mineral water',
      'Free digital mock-up before print',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    minPrice: 120,
    maxPrice: 150,
    rangeLabel: '120–150',
    subtitle: 'Full-colour design · Names / logo & theme',
    featured: true,
    features: [
      'Full-colour gloss wrap label',
      'Custom names, logo & event theme',
      'Water or Orange / Mango / Lime juice',
    ],
  },
  {
    id: 'luxury',
    name: 'Luxury',
    minPrice: 180,
    maxPrice: 250,
    rangeLabel: '180–250',
    subtitle: 'Metallic foil finish · Weddings & VIPs',
    features: [
      'Metallic gold-foil & embossed crown finish',
      'Velvet-matte stock & coordinated cap',
      'Dedicated Lahore venue delivery',
    ],
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Share your logo or names',
    description: 'Send your logo, couple names, or colours on WhatsApp.',
  },
  {
    step: '02',
    title: 'We design the label',
    description: 'Receive a free digital mock-up for approval before print.',
  },
  {
    step: '03',
    title: 'We fill & deliver',
    description: 'Sealed 500ml & 1.5L bottles delivered across Lahore.',
  },
];

export const FAQS = [
  {
    q: 'What is the minimum order quantity?',
    a: 'Private party orders start from just 50 bottles (500ml). Shadi Royale wedding bundles with free Lahore delivery start at 500+ bottles.',
  },
  {
    q: 'Is custom label design free?',
    a: 'Yes. Digital mock-ups and custom label design are complimentary on every order.',
  },
  {
    q: 'Can businesses request a sample first?',
    a: 'Yes. Restaurants, marquees, offices, and planners in Lahore can book free sample bottles printed with their logo.',
  },
  {
    q: 'Which bottle sizes and drinks are available?',
    a: '500ml and 1.5L pure mineral water, plus chilled Orange, Mango, and Lime fruit juice bottles.',
  },
];
