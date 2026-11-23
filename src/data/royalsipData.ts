import basicSquareImg from '../assets/images/royalsip_basic_square_1795440655967.jpg';
import corporateSquareImg from '../assets/images/royalsip_corporate_square_1795441496825.jpg';
import juicesSquareImg from '../assets/images/royalsip_single_juice_square_1795441807751.jpg';
import limeMintJuiceImg from '../assets/images/royalsip_lime_mint_juice_1795441496644.jpg';
import mangoJuiceImg from '../assets/images/royalsip_mango_juice_1795441496369.jpg';
import orangeJuiceImg from '../assets/images/royalsip_orange_juice_1795441495235.jpg';
import premiumSquareImg from '../assets/images/royalsip_premium_square_1795440655309.jpg';
import rosePeachWaterImg from '../assets/images/royalsip_rose_peach_water_1795441495733.jpg';
import standardSquareImg from '../assets/images/royalsip_standard_square_1795440655579.jpg';
import trioSquareImg from '../assets/images/royalsip_trio_square_1795440657365.jpg';
import weddingSquareImg from '../assets/images/royalsip_shadi_studio_square_1795441809566.jpg';

export type PageId = 'home' | 'shop' | 'deals' | 'custom-event' | 'about' | 'contact';

export const BRAND = {
  name: 'RoyalSip Beverages',
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
  // 1:1 (1000x1000) luxury studio visuals featuring RoyalSip's exact label designs
  labelBasic: basicSquareImg,
  labelStandard: standardSquareImg,
  labelPremium: premiumSquareImg,
  trioShowcase: trioSquareImg,
  juicesRange: juicesSquareImg,
  mangoJuice: mangoJuiceImg,
  orangeJuice: orangeJuiceImg,
  limeMintJuice: limeMintJuiceImg,
  rosePeachWater: rosePeachWaterImg,
  shadiBanquet: weddingSquareImg,
  corporateTable: corporateSquareImg,
};

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${BRAND.whatsappNumberRaw}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl(subject: string, body: string): string {
  return `mailto:${BRAND.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
    subtitle:
      'Custom-labeled mineral water & RoyalSip fruit juice bottles crafted for weddings, events, corporates & retail.',
    image: BOTTLE_PHOTOS.trioShowcase,
    imageAlt: 'RoyalSip Basic, Standard and Premium custom 500ml bottle lineup',
    primaryLabel: 'Shop Products',
    primaryTarget: 'shop',
  },
  {
    id: 'hero-shadi',
    headlineStart: 'Your Big Day.',
    headlineHighlight: 'On every table.',
    subtitle:
      'Bespoke couple monograms, wedding dates & gold-foil matte labels delivered to venues across Lahore.',
    image: BOTTLE_PHOTOS.labelStandard,
    imageAlt: 'RoyalSip Ayesha and Ali wedding bottle on ivory marble',
    primaryLabel: 'Customise Event',
    primaryTarget: 'custom-event',
  },
  {
    id: 'hero-juice',
    headlineStart: 'Pure Juices &',
    headlineHighlight: 'Flavoured Water.',
    subtitle:
      'Chilled Mango Glow, Kinnow Zest, Lemon-Mint & Rose Peach Water paired with RoyalSip event water.',
    image: BOTTLE_PHOTOS.juicesRange,
    imageAlt: 'Single 500ml RoyalSip Fruit Juices and Flavoured Water bottle surrounded by mango, citrus, lime, peach and mint',
    primaryLabel: 'View Combo Deals',
    primaryTarget: 'deals',
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
    label: 'Minimum bottles for custom events',
    accentGradient: 'from-[#D4AF37] via-amber-500 to-rose-500',
    metricColor: '#A67C1E',
  },
  {
    id: 'hl-10off',
    metric: '10% OFF',
    label: 'Event planner partner & 1st month dining',
    accentGradient: 'from-rose-500 via-pink-500 to-[#D4AF37]',
    metricColor: '#E11D74',
  },
  {
    id: 'hl-free',
    metric: 'FREE',
    label: 'Custom label design & mock-ups',
    accentGradient: 'from-[#D4AF37] via-amber-400 to-pink-500',
    metricColor: '#A67C1E',
  },
  {
    id: 'hl-juices',
    metric: '6 Flavours',
    label: 'Mango, Kinnow, Apple, Guava, Peach & Mint',
    accentGradient: 'from-amber-500 via-[#E11D74] to-[#D4AF37]',
    metricColor: '#E11D74',
  },
  {
    id: 'hl-cod',
    metric: 'COD Only',
    label: 'Cash on Delivery across Lahore',
    accentGradient: 'from-[#D4AF37] via-rose-400 to-amber-500',
    metricColor: '#A67C1E',
  },
];

export interface BeverageRangeCategory {
  id: string;
  title: string;
  subtitle: string;
  targetPage: PageId;
  ringType: 'fruit' | 'wedding' | 'flavored' | 'corporate' | 'water';
}

export const ROYALSIP_RANGES: BeverageRangeCategory[] = [
  {
    id: 'range-juices',
    title: 'Fruit Juices',
    subtitle: 'Mango, kinnow, apple & pink guava',
    targetPage: 'shop',
    ringType: 'fruit',
  },
  {
    id: 'range-wedding',
    title: 'Wedding Editions',
    subtitle: 'Couple names & gold-foil matte labels',
    targetPage: 'custom-event',
    ringType: 'wedding',
  },
  {
    id: 'range-flavored',
    title: 'Flavoured Water',
    subtitle: 'Rose peach, mint-lemon & botanicals',
    targetPage: 'shop',
    ringType: 'flavored',
  },
  {
    id: 'range-corporate',
    title: 'Corporate & Dining',
    subtitle: 'Branded bottles for offices & cafés',
    targetPage: 'deals',
    ringType: 'corporate',
  },
  {
    id: 'range-pure-water',
    title: 'Pure Drinking Water',
    subtitle: 'Crisp 500ml & 1.5L mineral water',
    targetPage: 'shop',
    ringType: 'water',
  },
];

export interface FlavourShowcaseCard {
  id: string;
  name: string;
  tagline: string;
  sizes: { volume: string; price: string }[];
  headerGradient: string;
  shopProductId: string;
}

export const ROYALSIP_FLAVOUR_CARDS: FlavourShowcaseCard[] = [
  {
    id: 'fl-mango',
    name: 'RoyalSip Mango',
    tagline: 'Chaunsa & Sindhri nectar',
    sizes: [
      { volume: '500ml Case', price: 'PKR 3,120' },
      { volume: '1.5L Pack', price: 'PKR 3,360' },
    ],
    headerGradient: 'from-amber-400 to-amber-500',
    shopProductId: 'prod-juice-mango',
  },
  {
    id: 'fl-kinnow',
    name: 'RoyalSip Kinnow',
    tagline: 'Sargodha citrus zest',
    sizes: [
      { volume: '500ml Case', price: 'PKR 3,120' },
      { volume: '1.5L Pack', price: 'PKR 3,360' },
    ],
    headerGradient: 'from-orange-400 to-orange-500',
    shopProductId: 'prod-juice-orange',
  },
  {
    id: 'fl-apple',
    name: 'RoyalSip Apple',
    tagline: 'Crisp orchard press',
    sizes: [
      { volume: '500ml Case', price: 'PKR 3,120' },
      { volume: '1.5L Pack', price: 'PKR 3,360' },
    ],
    headerGradient: 'from-rose-500 to-red-500',
    shopProductId: 'prod-juice-orange',
  },
  {
    id: 'fl-guava',
    name: 'RoyalSip Pink Guava',
    tagline: 'Velvet amrood nectar',
    sizes: [{ volume: '500ml Case', price: 'PKR 2,880' }],
    headerGradient: 'from-pink-600 to-[#E11D74]',
    shopProductId: 'prod-flavoured-peach',
  },
  {
    id: 'fl-peach-water',
    name: 'RoyalSip Rose Peach',
    tagline: 'Infused botanical water',
    sizes: [{ volume: '500ml Case', price: 'PKR 2,640' }],
    headerGradient: 'from-[#E11D74] to-rose-400',
    shopProductId: 'prod-flavoured-peach',
  },
  {
    id: 'fl-lemon-mint',
    name: 'RoyalSip Lemon-Mint',
    tagline: 'Cooling shikanjvi breeze',
    sizes: [{ volume: '500ml Case', price: 'PKR 2,880' }],
    headerGradient: 'from-lime-500 to-emerald-500',
    shopProductId: 'prod-juice-lime',
  },
];

export interface ShopProduct {
  id: string;
  sku: string;
  category: 'water' | 'juices' | 'custom-pack';
  name: string;
  volume: string;
  packSize: string;
  price: number;
  summary: string;
  image: string;
  accentHex: string;
}

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: 'prod-water-500-case',
    sku: 'RS-W500-24',
    category: 'water',
    name: 'RoyalSip Basic Silver Water (24 Bottles)',
    volume: '500ml × 24 Case · PKR 80/bottle',
    packSize: 'Case of 24',
    price: 1920,
    summary:
      'Crystal-clear 500ml mineral water bottles with signature silver-white RoyalSip label.',
    image: BOTTLE_PHOTOS.labelBasic,
    accentHex: '#A67C1E',
  },
  {
    id: 'prod-water-1500-case',
    sku: 'RS-CORP-24',
    category: 'water',
    name: 'RoyalSip Corporate Table Pack (24 Bottles)',
    volume: '500ml × 24 Case · PKR 90/bottle',
    packSize: 'Case of 24',
    price: 2160,
    summary:
      'Executive table hydration tailored for boardrooms, conferences, and restaurant dining.',
    image: BOTTLE_PHOTOS.corporateTable,
    accentHex: '#A67C1E',
  },
  {
    id: 'prod-standard-50',
    sku: 'RS-STD-50',
    category: 'custom-pack',
    name: 'Standard Event Label Pack (50 Bottles)',
    volume: '500ml × 50 Bottles · PKR 130/bottle',
    packSize: '50 Bottles',
    price: 6500,
    summary:
      'Full-colour custom label with couple names or company crest & complimentary mock-up.',
    image: BOTTLE_PHOTOS.labelStandard,
    accentHex: '#E11D74',
  },
  {
    id: 'prod-premium-100',
    sku: 'RS-PRM-100',
    category: 'custom-pack',
    name: 'Premium Gold-Foil Luxury Pack (100 Bottles)',
    volume: '500ml × 100 Bottles · PKR 195/bottle',
    packSize: '100 Bottles',
    price: 19500,
    summary:
      'Matte black & metallic gold-foil monogram bottles crafted for VIP weddings and events.',
    image: BOTTLE_PHOTOS.labelPremium,
    accentHex: '#D4AF37',
  },
  {
    id: 'prod-juice-orange',
    sku: 'RS-KIN-24',
    category: 'juices',
    name: 'RoyalSip Kinnow Zest Juice (24 Bottles)',
    volume: '500ml × 24 Case · PKR 130/bottle',
    packSize: 'Case of 24',
    price: 3120,
    summary:
      'Refreshing chilled Sargodha citrus juice ready for events, marquees & home chillers.',
    image: BOTTLE_PHOTOS.orangeJuice,
    accentHex: '#EA580C',
  },
  {
    id: 'prod-juice-mango',
    sku: 'RS-MNG-24',
    category: 'juices',
    name: 'RoyalSip Mango Glow Juice (24 Bottles)',
    volume: '500ml × 24 Case · PKR 130/bottle',
    packSize: 'Case of 24',
    price: 3120,
    summary:
      'Rich golden Chaunsa mango nectar in sleek 500ml RoyalSip bottles.',
    image: BOTTLE_PHOTOS.mangoJuice,
    accentHex: '#D97706',
  },
  {
    id: 'prod-juice-lime',
    sku: 'RS-LMN-24',
    category: 'juices',
    name: 'RoyalSip Lemon-Mint Juice (24 Bottles)',
    volume: '500ml × 24 Case · PKR 120/bottle',
    packSize: 'Case of 24',
    price: 2880,
    summary:
      'Crisp mint-lime refreshment ideal for outdoor lawn events and daytime lunches.',
    image: BOTTLE_PHOTOS.limeMintJuice,
    accentHex: '#16A34A',
  },
  {
    id: 'prod-flavoured-peach',
    sku: 'RS-PCH-24',
    category: 'juices',
    name: 'RoyalSip Rose Peach Water (24 Bottles)',
    volume: '500ml × 24 Case · PKR 110/bottle',
    packSize: 'Case of 24',
    price: 2640,
    summary:
      'Pure mineral water lightly infused with delicate rose & orchard peach notes.',
    image: BOTTLE_PHOTOS.rosePeachWater,
    accentHex: '#E11D74',
  },
];

export type DealCategory = 'all' | 'bulk-water' | 'event-packages' | 'water-juice-combo';

export interface DealBundle {
  id: string;
  category: Exclude<DealCategory, 'all'>;
  categoryLabel: string;
  name: string;
  priceLabel: string;
  priceNumeric: number;
  savingsBadge: string;
  contents: string[];
  image: string;
  accentGradient: string;
}

export const DEAL_BUNDLES: DealBundle[] = [
  {
    id: 'deal-bulk-office',
    category: 'bulk-water',
    categoryLabel: 'Bulk Water Package',
    name: 'Corporate Monthly Desk Pack',
    priceLabel: 'PKR 16,500',
    priceNumeric: 16500,
    savingsBadge: 'Save 12%',
    contents: [
      '200 × 500ml RoyalSip Basic Label Bottles',
      '24 × 1.5L Boardroom Table Bottles',
      'Free Lahore Office Delivery',
    ],
    image: BOTTLE_PHOTOS.corporateTable,
    accentGradient: 'from-[#D4AF37] via-amber-500 to-rose-400',
  },
  {
    id: 'deal-bulk-restaurant',
    category: 'bulk-water',
    categoryLabel: 'Bulk Water Package',
    name: 'Restaurant Table Supply Plan',
    priceLabel: 'PKR 39,000',
    priceNumeric: 39000,
    savingsBadge: '10% Off 1st Month',
    contents: [
      '350 × 500ml Branded Dining Bottles',
      '100 × 1.5L Family Table Bottles',
      'Scheduled Weekly Refill Drops',
    ],
    image: BOTTLE_PHOTOS.trioShowcase,
    accentGradient: 'from-[#D4AF37] via-pink-500 to-amber-500',
  },
  {
    id: 'deal-event-shadi',
    category: 'event-packages',
    categoryLabel: 'Event Package',
    name: 'Shadi Royale Marquee Bundle',
    priceLabel: 'PKR 62,000',
    priceNumeric: 62000,
    savingsBadge: 'Free Design & Drop',
    contents: [
      '500 × 500ml Standard Wedding Label Bottles',
      'Custom Couple Names, Date & Décor Colours',
      'Direct Shadi Hall / Marquee Delivery',
    ],
    image: BOTTLE_PHOTOS.labelStandard,
    accentGradient: 'from-[#E11D74] via-rose-500 to-[#D4AF37]',
  },
  {
    id: 'deal-event-vip',
    category: 'event-packages',
    categoryLabel: 'Event Package',
    name: 'VIP Gold-Foil Celebration Pack',
    priceLabel: 'PKR 48,000',
    priceNumeric: 48000,
    savingsBadge: 'Luxury Edition',
    contents: [
      '250 × 500ml Black & Gold Foil Luxury Bottles',
      'Monogram Crest + Couple / Host Typography',
      'Priority Lahore Venue Delivery',
    ],
    image: BOTTLE_PHOTOS.labelPremium,
    accentGradient: 'from-[#D4AF37] via-amber-600 to-[#E11D74]',
  },
  {
    id: 'deal-combo-feast',
    category: 'water-juice-combo',
    categoryLabel: 'Water + Juice Combo',
    name: 'Royal Feast Combo (Water + Fruit Juices)',
    priceLabel: 'PKR 44,500',
    priceNumeric: 44500,
    savingsBadge: 'Combo Savings',
    contents: [
      '300 × 500ml Custom RoyalSip Water Bottles',
      '150 × 500ml RoyalSip Juices (Mango, Kinnow & Lemon-Mint)',
      'Single Invoice & Chilled Event Dispatch',
    ],
    image: BOTTLE_PHOTOS.juicesRange,
    accentGradient: 'from-orange-500 via-[#E11D74] to-[#D4AF37]',
  },
  {
    id: 'deal-combo-mehndi',
    category: 'water-juice-combo',
    categoryLabel: 'Water + Juice Combo',
    name: 'Mehndi & Birthday Refreshment Pack',
    priceLabel: 'PKR 15,800',
    priceNumeric: 15800,
    savingsBadge: 'From 100 Bottles',
    contents: [
      '60 × 500ml Standard Custom Party Water',
      '48 × 500ml RoyalSip Flavoured Water & Juices',
      'Free Bespoke Label Mock-Up',
    ],
    image: BOTTLE_PHOTOS.labelBasic,
    accentGradient: 'from-pink-500 via-rose-500 to-[#D4AF37]',
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
export type PackageTierId = 'basic' | 'standard' | 'premium';

export interface DrinkVariant {
  id: DrinkVariantId;
  label: string;
  volume: string;
}

export const DRINK_VARIANTS: DrinkVariant[] = [
  { id: 'water-500', label: '500ml Pure Water', volume: '500ml' },
  { id: 'water-1500', label: '1.5L Family Water', volume: '1.5L' },
  { id: 'juice-orange', label: 'RoyalSip Kinnow Orange (500ml)', volume: '500ml' },
  { id: 'juice-mango', label: 'RoyalSip Mango Glow (500ml)', volume: '500ml' },
  { id: 'juice-lime', label: 'RoyalSip Lemon-Mint (500ml)', volume: '500ml' },
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
    id: 'slide-basic',
    tag: 'Basic Edition',
    title: 'Silver Classic RoyalSip',
    subtitle:
      'Clean silver-white 1-colour custom label crafted for restaurants, offices, and daily gatherings.',
    volume: '500ml & 1.5L',
    priceRange: 'PKR 80–100',
    image: BOTTLE_PHOTOS.labelBasic,
    accentGradient: 'from-[#D4AF37] via-amber-400 to-rose-400',
    drinkId: 'water-500',
    labelTitle: 'Basic Edition',
  },
  {
    id: 'slide-standard',
    tag: 'Standard Edition',
    title: 'Royal Crimson Event Bottle',
    subtitle:
      'Full-colour RoyalSip wrap with couple names, event dates, and custom brand colours.',
    volume: '500ml & 1.5L',
    priceRange: 'PKR 120–150',
    image: BOTTLE_PHOTOS.labelStandard,
    accentGradient: 'from-[#E11D74] via-rose-500 to-[#D4AF37]',
    drinkId: 'water-500',
    labelTitle: 'Standard Edition',
  },
  {
    id: 'slide-premium',
    tag: 'Premium Luxury Edition',
    title: 'Black & Gold Foil Crest',
    subtitle:
      'Velvet-matte finish with gold crest monogram, wedding date, and foil-look border.',
    volume: '500ml VIP',
    priceRange: 'PKR 180–250',
    image: BOTTLE_PHOTOS.labelPremium,
    accentGradient: 'from-[#D4AF37] via-amber-500 to-[#E11D74]',
    drinkId: 'water-500',
    labelTitle: 'Premium Luxury',
  },
  {
    id: 'slide-juices-combo',
    tag: 'Fruit Juices & Flavoured Water',
    title: 'RoyalSip Juice & Botanical Line',
    subtitle:
      'Chilled Mango, Kinnow, Lemon-Mint & Rose Peach Water crafted alongside our custom event water.',
    volume: '500ml Range',
    priceRange: 'Combo Pricing',
    image: BOTTLE_PHOTOS.juicesRange,
    accentGradient: 'from-orange-500 via-[#E11D74] to-[#D4AF37]',
    drinkId: 'juice-mango',
    labelTitle: 'RoyalSip Juices',
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
    ctaText: 'Customise Wedding',
    accentGradient: 'from-[#E11D74] via-rose-500 to-[#D4AF37]',
    accentHex: '#E11D74',
    image: BOTTLE_PHOTOS.shadiBanquet,
    defaultLabelTitle: 'Ayesha & Ali',
    defaultLabelSub: 'Walima · 12.12.2026',
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
    ctaText: 'Book Partner Rate',
    accentGradient: 'from-[#D4AF37] via-amber-500 to-[#E11D74]',
    accentHex: '#A67C1E',
    image: BOTTLE_PHOTOS.trioShowcase,
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
    ctaText: 'Order Corporate Pack',
    accentGradient: 'from-[#D4AF37] via-amber-400 to-rose-400',
    accentHex: '#A67C1E',
    image: BOTTLE_PHOTOS.corporateTable,
    defaultLabelTitle: 'Corporate Summit',
    defaultLabelSub: 'Executive Table',
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
    accentGradient: 'from-[#E11D74] via-[#D4AF37] to-amber-500',
    accentHex: '#E11D74',
    image: BOTTLE_PHOTOS.labelBasic,
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
    ctaText: 'Personalise Party',
    accentGradient: 'from-pink-500 via-[#E11D74] to-[#D4AF37]',
    accentHex: '#E11D74',
    image: BOTTLE_PHOTOS.labelStandard,
    defaultLabelTitle: "Zainab's Mehndi",
    defaultLabelSub: 'Party Edition',
    defaultDrink: 'water-500',
  },
  {
    id: 'event-drinks-combo',
    category: 'combos',
    segment: 'Juice + Water Combo',
    title: 'Event Drinks Combo',
    headline: 'Water + fruit juice. One combo.',
    highlight: 'Combo Deal',
    specs: 'Mango · Kinnow · Mint',
    bullets: [
      'Custom water + chilled RoyalSip juice bottles',
      'One streamlined order and single bill',
    ],
    ctaText: 'Add Juice Combo',
    accentGradient: 'from-orange-500 via-[#E11D74] to-[#D4AF37]',
    accentHex: '#EA580C',
    image: BOTTLE_PHOTOS.juicesRange,
    defaultLabelTitle: 'Royal Feast Combo',
    defaultLabelSub: 'Water + Fruit Juice',
    defaultDrink: 'juice-mango',
  },
];

export interface PricingTier {
  id: PackageTierId;
  name: string;
  minPrice: number;
  maxPrice: number;
  rangeLabel: string;
  subtitle: string;
  includedProducts: string;
  previewImage: string;
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
    subtitle: 'Silver-white 1-colour label · 500ml / 1.5L',
    includedProducts: '500ml or 1.5L Pure Mineral Water',
    previewImage: BOTTLE_PHOTOS.labelBasic,
    features: [
      'Clean metallic silver 1-colour custom label',
      'Venue or company name line printed clearly',
      'Waterproof stock & free digital mock-up',
      'Best for offices, restaurants & daily stock',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    minPrice: 120,
    maxPrice: 150,
    rangeLabel: '120–150',
    subtitle: 'Full-colour wrap · Names, logo & event theme',
    includedProducts: '500ml / 1.5L Water or Fruit Juice Pairing',
    previewImage: BOTTLE_PHOTOS.labelStandard,
    featured: true,
    features: [
      'Full-colour gloss custom wrap label',
      'Couple names, event dates & brand palette',
      'Optional pairing with RoyalSip Fruit Juices',
      'Free digital artwork & priority Lahore dispatch',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    minPrice: 180,
    maxPrice: 250,
    rangeLabel: '180–250',
    subtitle: 'Gold-foil luxury matte · Weddings & VIPs',
    includedProducts: '500ml VIP Luxury Edition + Custom Crest',
    previewImage: BOTTLE_PHOTOS.labelPremium,
    features: [
      'Velvet-matte finish with metallic gold foil look',
      'Custom circular monogram crest & gold border',
      'Bespoke calligraphy for weddings & VVIP suites',
      'Dedicated Lahore venue delivery & setup',
    ],
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Share your logo or names',
    description: 'Send your logo, couple names, or upload artwork via our event form.',
  },
  {
    step: '02',
    title: 'We design the label',
    description: 'Receive a free digital mock-up in Basic, Standard, or Premium finish.',
  },
  {
    step: '03',
    title: 'We fill & deliver',
    description: 'Sealed 500ml & 1.5L bottles delivered across Lahore on schedule.',
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
      'Guests kept photographing our Black & Gold Luxury Edition bottles at the Walima. The monogram crest looked regal on every table.',
    author: 'Sana & Bilal Ahmed',
    role: 'Wedding Hosts',
    company: 'DHA Phase 6, Lahore',
    accentGradient: 'from-[#D4AF37] via-[#E11D74] to-amber-500',
  },
  {
    id: 'test-planner',
    quote:
      'RoyalSip gives us priority slots even in peak wedding season. Pairing custom water with chilled Mango & Kinnow juices is effortless.',
    author: 'Zara Mansoor',
    role: 'Lead Event Planner',
    company: 'Aura Weddings & Marquees',
    accentGradient: 'from-[#E11D74] via-pink-500 to-[#D4AF37]',
  },
  {
    id: 'test-restaurant',
    quote:
      'Switching to our own branded silver-label 500ml table water elevated our dining room presentation instantly.',
    author: 'Chef Adeel Qureshi',
    role: 'Managing Partner',
    company: 'Saffron Courtyard, Gulberg',
    accentGradient: 'from-[#D4AF37] via-amber-500 to-rose-400',
  },
  {
    id: 'test-corporate',
    quote:
      'Fast mock-ups, clean labels, and reliable Cash on Delivery dispatches across our corporate seminar halls in Lahore.',
    author: 'Hamza Malik',
    role: 'Operations Director',
    company: 'Lahore Business Suites',
    accentGradient: 'from-rose-500 via-[#D4AF37] to-amber-500',
  },
];

export const FAQS = [
  {
    q: 'What is the minimum order quantity for custom-label bottles?',
    a: 'Private party orders start from just 50 bottles (500ml). Wedding Shadi Royale bundles start from 500+ bottles with complimentary Lahore venue delivery.',
  },
  {
    q: 'What is the difference between Basic, Standard, and Premium packages?',
    a: 'Basic (PKR 80–100) uses a clean silver 1-colour label; Standard (PKR 120–150) provides full-colour event wraps with names and colours; Premium (PKR 180–250) delivers our signature matte black & gold-foil luxury monogram edition.',
  },
  {
    q: 'How do Cart Checkout and Cash on Delivery (COD) orders get confirmed?',
    a: 'Once you add products to your Cart and complete the Cash on Delivery (COD) form, your complete order summary and reference code go straight to our official WhatsApp (0321-4551473) for immediate confirmation and dispatch.',
  },
  {
    q: 'Where do custom event enquiries and feedback go?',
    a: 'All enquiries can be sent immediately to WhatsApp (0321-4551473) as well as our official email at info@royalsipbeverages.pk.',
  },
];
