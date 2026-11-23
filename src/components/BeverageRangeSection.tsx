import { ShoppingBag } from 'lucide-react';
import {
  BOTTLE_PHOTOS,
  BeverageRangeCategory,
  PageId,
  ROYALSIP_FLAVOUR_CARDS,
  ROYALSIP_RANGES,
  SHOP_PRODUCTS,
  ShopProduct,
} from '../data/royalsipData';

interface BeverageRangeSectionProps {
  onAddToCart: (product: ShopProduct) => void;
  onNavigate?: (page: PageId) => void;
}

function RangeEmblem({ type }: { type: BeverageRangeCategory['ringType'] }) {
  if (type === 'fruit') {
    return (
      <svg viewBox="0 0 100 100" className="h-20 w-20" aria-hidden="true">
        <circle cx="50" cy="50" r="44" fill="#FFFDF7" stroke="#241C24" strokeWidth="2.5" />
        <path d="M50,50 L50,6 A44,44 0 0,1 88,28 Z" fill="#F59E0B" opacity="0.9" />
        <path d="M50,50 L88,28 A44,44 0 0,1 88,72 Z" fill="#EF4444" opacity="0.88" />
        <path d="M50,50 L88,72 A44,44 0 0,1 50,94 Z" fill="#84CC16" opacity="0.88" />
        <path d="M50,50 L50,94 A44,44 0 0,1 12,72 Z" fill="#E11D74" opacity="0.88" />
        <path d="M50,50 L12,72 A44,44 0 0,1 12,28 Z" fill="#FB923C" opacity="0.9" />
        <path d="M50,50 L12,28 A44,44 0 0,1 50,6 Z" fill="#FBBF24" opacity="0.92" />
        <circle cx="50" cy="50" r="24" fill="#FFFDF7" stroke="#241C24" strokeWidth="2" />
        <text
          x="50"
          y="53"
          textAnchor="middle"
          className="fill-[#241C24] text-[11px] font-extrabold tracking-tight"
        >
          RoyalSip
        </text>
      </svg>
    );
  }
  if (type === 'wedding') {
    return (
      <svg viewBox="0 0 100 100" className="h-20 w-20" aria-hidden="true">
        <defs>
          <linearGradient id="wedGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="55%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#E11D74" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="44" fill="url(#wedGrad)" stroke="#241C24" strokeWidth="2.5" />
        <path d="M16 58 Q50 42 84 58 L80 82 Q50 96 20 82 Z" fill="#241C24" opacity="0.85" />
        <polygon points="36,38 42,24 50,33 58,24 64,38" fill="#FFFDF7" />
        <rect x="24" y="45" width="52" height="19" rx="9.5" fill="#FFFDF7" />
        <text
          x="50"
          y="58"
          textAnchor="middle"
          className="fill-[#241C24] text-[10.5px] font-extrabold"
        >
          RoyalSip
        </text>
      </svg>
    );
  }
  if (type === 'flavored') {
    return (
      <svg viewBox="0 0 100 100" className="h-20 w-20" aria-hidden="true">
        <circle cx="50" cy="50" r="44" fill="#10B981" stroke="#241C24" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="34" fill="#FFFDF7" />
        <path d="M35 28 L65 28 L61 74 L39 74 Z" fill="#FDF2F8" stroke="#E11D74" strokeWidth="2" />
        <rect x="26" y="44" width="48" height="18" rx="9" fill="#E11D74" />
        <text
          x="50"
          y="56.5"
          textAnchor="middle"
          className="fill-white text-[10px] font-extrabold"
        >
          RoyalSip
        </text>
      </svg>
    );
  }
  if (type === 'corporate') {
    return (
      <svg viewBox="0 0 100 100" className="h-20 w-20" aria-hidden="true">
        <defs>
          <linearGradient id="corpGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="44" fill="url(#corpGrad)" stroke="#241C24" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="32" fill="#FFFDF7" />
        <rect x="26" y="41" width="48" height="18" rx="9" fill="#D4AF37" />
        <text
          x="50"
          y="53.5"
          textAnchor="middle"
          className="fill-[#241C24] text-[10.5px] font-extrabold"
        >
          RoyalSip
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" className="h-20 w-20" aria-hidden="true">
      <circle cx="50" cy="50" r="44" fill="#D4AF37" stroke="#241C24" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="34" fill="#FFFDF7" />
      <path d="M50 18 C62 34 65 44 65 52 A15 15 0 1 1 35 52 C35 44 38 34 50 18 Z" fill="#FEF3C7" stroke="#A67C1E" strokeWidth="2" />
      <rect x="24" y="44" width="52" height="17" rx="8.5" fill="#241C24" />
      <text
        x="50"
        y="55.5"
        textAnchor="middle"
        className="fill-[#FDE68A] text-[10px] font-extrabold"
      >
        RoyalSip
      </text>
    </svg>
  );
}

export function BeverageRangeSection({
  onAddToCart,
  onNavigate,
}: BeverageRangeSectionProps) {
  const handleQuickFlavourOrder = (productId: string) => {
    const matched = SHOP_PRODUCTS.find((p) => p.id === productId) ?? SHOP_PRODUCTS[4];
    onAddToCart(matched);
  };

  return (
    <div id="royalsip-range">
      {/* Top Crisp White/Ivory Block: Five Ranges Grid (mirrors layout reference cleanly) */}
      <section className="border-t border-[#D4AF37]/25 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-bold tracking-wider text-[#E11D74] uppercase">
              The RoyalSip Family
            </p>
            <h2 className="font-display mt-1.5 text-3xl font-bold tracking-tight text-[#241C24] sm:text-5xl">
              Five ranges, one fresh taste
            </h2>
            <p className="mx-auto mt-2.5 max-w-xl text-sm text-slate-600">
              From bespoke event hydration to chilled fruit refreshments, there&apos;s a RoyalSip
              bottle crafted for every table.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
            {ROYALSIP_RANGES.map((range, idx) => (
              <button
                key={range.id}
                type="button"
                onClick={() => onNavigate?.(range.targetPage)}
                className={`rainbow-hover-card flex flex-col items-center rounded-2xl border border-[#D4AF37]/25 bg-[#FFFDF7] px-3 py-5 text-center shadow-xs transition-all hover:-translate-y-1 hover:shadow-md sm:px-4 sm:py-6 ${
                  idx === ROYALSIP_RANGES.length - 1 ? 'col-span-2 sm:col-span-1' : ''
                }`}
              >
                <RangeEmblem type={range.ringType} />
                <h3 className="mt-3.5 text-sm font-bold text-[#241C24]">{range.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  {range.subtitle}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Warm Ivory/Champagne Showcase Block: Circular Wheel + Bottle Photo + Flavour Cards */}
      <section className="border-t border-[#D4AF37]/25 bg-gradient-to-br from-[#FEF8E8] via-[#FFFDF7] to-[#FDF2F8]/80 py-14 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Left Visual: Square Crisp RoyalSip Juices Studio Photo */}
            <div className="flex flex-col items-center lg:col-span-5">
              <div className="rainbow-hover-card w-full max-w-[420px] overflow-hidden rounded-3xl border border-[#D4AF37]/40 bg-white p-3 shadow-md">
                <img
                  src={BOTTLE_PHOTOS.juicesRange}
                  alt="Single 500ml RoyalSip Fruit Juices and Flavoured Water bottle surrounded by fresh mango, orange, lime, peach and mint"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="aspect-square w-full rounded-2xl object-cover"
                />
              </div>
            </div>

            {/* Right Heading + Colorful Flavour Grid */}
            <div className="lg:col-span-7">
              <p className="text-xs font-bold tracking-wider text-[#E11D74] uppercase">
                RoyalSip Fruit Juices &amp; Waters
              </p>
              <h2 className="font-display mt-1 text-3xl font-bold tracking-tight text-[#241C24] sm:text-4xl">
                Pakistan&apos;s favourite flavours,{' '}
                <span className="rainbow-heading italic">bottled.</span>
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                500ml chilled cases for marquees and on-the-go hospitality, plus 1.5L for family dining.
              </p>

              <div className="mt-7 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                {ROYALSIP_FLAVOUR_CARDS.map((card) => (
                  <div
                    key={card.id}
                    className="flex flex-col justify-between overflow-hidden rounded-xl border border-[#D4AF37]/25 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className={`bg-gradient-to-r ${card.headerGradient} px-3.5 py-2.5 text-white`}>
                      <p className="text-xs font-bold tracking-tight">{card.name}</p>
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-3.5">
                      <div>
                        <p className="text-[11px] text-slate-500">{card.tagline}</p>
                        <div className="mt-2.5 space-y-1 border-t border-slate-100 pt-2 text-[11px]">
                          {card.sizes.map((s) => (
                            <div key={s.volume} className="flex items-center justify-between">
                              <span className="text-slate-500">{s.volume}</span>
                              <span className="num-clean font-bold text-[#241C24]">{s.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleQuickFlavourOrder(card.shopProductId)}
                        className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#D4AF37]/40 bg-[#FFFDF7] px-2.5 py-1.5 text-[11px] font-bold text-[#241C24] transition-colors hover:border-[#E11D74] hover:text-[#E11D74]"
                      >
                        <ShoppingBag className="h-3 w-3" />
                        <span>Add Case</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
