import { useMemo, useState } from 'react';
import {
  Calculator,
  Check,
  Mail,
  MessageCircle,
  ShoppingBag,
} from 'lucide-react';
import {
  buildMailtoUrl,
  buildWhatsAppUrl,
  PackageTierId,
  PageId,
  PRICING_TIERS,
  SHOP_PRODUCTS,
  ShopProduct,
} from '../data/royalsipData';
import { BeverageRangeSection } from './BeverageRangeSection';

interface ShopPageProps {
  onAddToCart: (product: ShopProduct) => void;
  onSelectTierForOrder: (
    tierId: PackageTierId,
    quantity: number,
    isPartner: boolean
  ) => void;
  onNavigate: (page: PageId) => void;
}

type ShopFilter = 'all' | 'water' | 'custom-pack' | 'juices';

const SHOP_TABS: { id: ShopFilter; label: string }[] = [
  { id: 'all', label: 'All Products' },
  { id: 'water', label: 'Pure Drinking Water' },
  { id: 'custom-pack', label: 'Custom Packs' },
  { id: 'juices', label: 'Juices & Flavoured Water' },
];

export function ShopPage({
  onAddToCart,
  onSelectTierForOrder,
  onNavigate,
}: ShopPageProps) {
  const [filter, setFilter] = useState<ShopFilter>('all');
  const [selectedTier, setSelectedTier] = useState<PackageTierId>('standard');
  const [quantity, setQuantity] = useState<number>(500);
  const [includePartnerDiscount, setIncludePartnerDiscount] =
    useState<boolean>(false);
  const [includeJuiceCombo, setIncludeJuiceCombo] = useState<boolean>(false);

  const visibleProducts =
    filter === 'all'
      ? SHOP_PRODUCTS
      : SHOP_PRODUCTS.filter((p) => p.category === filter);

  const estimate = useMemo(() => {
    const tier =
      PRICING_TIERS.find((t) => t.id === selectedTier) ?? PRICING_TIERS[1];
    const discountMultiplier = includePartnerDiscount ? 0.9 : 1;
    const juiceExtra = includeJuiceCombo ? 20 : 0;
    const minTotal = Math.round(
      (tier.minPrice + juiceExtra) * quantity * discountMultiplier
    );
    const maxTotal = Math.round(
      (tier.maxPrice + juiceExtra) * quantity * discountMultiplier
    );
    return {
      tier,
      minTotal,
      maxTotal,
      perBottleMin: Math.round((tier.minPrice + juiceExtra) * discountMultiplier),
      perBottleMax: Math.round((tier.maxPrice + juiceExtra) * discountMultiplier),
    };
  }, [selectedTier, quantity, includePartnerDiscount, includeJuiceCombo]);

  const quoteSummaryText =
    `Assalam-o-Alaikum RoyalSip! Please send an exact quote for:\n` +
    `• Package: ${estimate.tier.name}\n` +
    `• Quantity: ${quantity.toLocaleString()} bottles\n` +
    `• Drink Setup: ${
      includeJuiceCombo
        ? 'Pure Drinking Water + Fruit Juice Combo'
        : 'Pure Drinking Water (500ml/1.5L)'
    }\n` +
    `• Partner / 1st Month 10% Rate: ${
      includePartnerDiscount ? 'Yes' : 'Standard'
    }\n` +
    `• Estimated Range: PKR ${estimate.minTotal.toLocaleString()} – ${estimate.maxTotal.toLocaleString()}`;

  return (
    <>
      {/* 1. Online E-Commerce Storefront */}
      <section className="section-grad-hero border-t border-[#D4AF37]/25 py-12 sm:py-16">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold tracking-wider text-[#E11D74] uppercase">
                RoyalSip Online Store · Cash on Delivery
              </p>
              <h1 className="font-display mt-1 text-4xl font-bold tracking-tight text-[#241C24] sm:text-5xl">
                Shop water,{' '}
                <span className="rainbow-heading italic">
                  fruit juices &amp; packs.
                </span>
              </h1>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('custom-event')}
              className="royal-btn self-start rounded-xl px-4 py-2.5 text-xs font-bold sm:self-auto whitespace-nowrap"
            >
              Upload Custom Event Label
            </button>
          </div>

          {/* Filter Tabs */}
          <div
            className="no-scrollbar mt-7 flex items-center gap-6 overflow-x-auto border-b border-[#D4AF37]/30 sm:gap-9"
            role="tablist"
            aria-label="Filter shop products"
          >
            {SHOP_TABS.map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(tab.id)}
                  className={`relative pb-3 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'text-[#241C24]'
                      : 'text-slate-500 hover:text-[#A67C1E]'
                  }`}
                >
                  {tab.label}
                  {active && (
                    <span
                      className="prism-hairline absolute inset-x-0 bottom-0 h-[3px] rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Product Grid (Clean 1:1 Studio Framing — zero awkward zoom) */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <article
                key={product.id}
                className="rainbow-hover-card flex flex-col justify-between rounded-2xl border border-[#D4AF37]/35 bg-white/95 p-4 shadow-sm"
              >
                <div>
                  <div className="overflow-hidden rounded-xl border border-slate-100 bg-[#FFFDF7]">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                    />
                  </div>

                  <div className="mt-3.5 flex items-center justify-between text-[11px] font-bold text-slate-500">
                    <span style={{ color: product.accentHex }}>
                      {product.packSize}
                    </span>
                    <span className="num-clean">{product.sku}</span>
                  </div>

                  <h2 className="font-display mt-1 text-lg font-bold text-[#241C24]">
                    {product.name}
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    {product.summary}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3.5">
                  <div>
                    <p className="num-clean text-lg font-extrabold text-[#241C24]">
                      PKR {product.price.toLocaleString()}
                    </p>
                    <p className="text-[11px] text-slate-500">{product.volume}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onAddToCart(product)}
                    className="rainbow-btn inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold whitespace-nowrap"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 2. RoyalSip Ranges & Flavour Lineup Section */}
      <BeverageRangeSection onAddToCart={onAddToCart} onNavigate={onNavigate} />

      {/* 3. Basic, Standard & Premium Pricing Comparison + Calculator */}
      <section
        id="pricing-packages"
        className="section-grad-prism border-t border-[#D4AF37]/25 py-14 sm:py-16"
      >
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold tracking-wider text-[#E11D74] uppercase">
                Custom Label Pricing Tiers
              </p>
              <h2 className="font-display mt-1 text-3xl font-bold tracking-tight text-[#241C24] sm:text-5xl">
                Basic, Standard &amp;{' '}
                <span className="rainbow-heading italic">Premium.</span>
              </h2>
            </div>
            <p className="text-sm font-medium text-slate-600">
              Free digital label mock-up included on all three tiers.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {PRICING_TIERS.map((tier) => {
              const isSelected = selectedTier === tier.id;
              return (
                <div
                  key={tier.id}
                  className={`rainbow-hover-card relative flex flex-col justify-between rounded-2xl border p-6 transition-all ${
                    tier.featured
                      ? 'border-[#E11D74] bg-gradient-to-b from-[#FDF2F8]/90 via-white to-[#FFFDF7] shadow-md'
                      : 'border-[#D4AF37]/35 bg-white/95 shadow-sm'
                  } ${isSelected ? 'ring-2 ring-[#D4AF37]' : ''}`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-extrabold tracking-wider text-[#A67C1E] uppercase">
                        {tier.name}
                      </span>
                      {tier.featured && (
                        <span className="text-xs font-bold text-[#E11D74]">
                          Most Popular
                        </span>
                      )}
                    </div>

                    <div className="mt-3 overflow-hidden rounded-xl border border-slate-100 bg-[#FFFDF7]">
                      <img
                        src={tier.previewImage}
                        alt={`${tier.name} RoyalSip bottle label`}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="aspect-square w-full object-cover"
                      />
                    </div>

                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-sm font-bold text-slate-500">PKR</span>
                      <span className="num-clean text-4xl font-extrabold text-[#241C24]">
                        {tier.rangeLabel}
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        / bottle
                      </span>
                    </div>

                    <p className="mt-1.5 text-sm font-medium text-[#241C24]">
                      {tier.subtitle}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-[#E11D74]">
                      Includes: {tier.includedProducts}
                    </p>

                    <ul className="mt-4 space-y-2 border-t border-slate-200/70 pt-4 text-sm text-slate-700">
                      {tier.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#E11D74]" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTier(tier.id);
                      onSelectTierForOrder(
                        tier.id,
                        quantity,
                        includePartnerDiscount
                      );
                    }}
                    className={`mt-6 w-full rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                      tier.featured ? 'rainbow-btn shadow-sm' : 'royal-btn'
                    }`}
                  >
                    Order {tier.name} Package
                  </button>
                </div>
              );
            })}
          </div>

          {/* Interactive Instant Budget Estimator */}
          <div className="rainbow-hover-card mt-10 rounded-2xl border border-[#D4AF37]/35 bg-white/95 p-6 shadow-sm backdrop-blur-sm sm:p-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 text-xs font-bold text-[#A67C1E] uppercase">
                  <Calculator className="h-4 w-4" />
                  <span>Budget Estimator</span>
                </div>
                <h3 className="font-display mt-1 text-2xl font-bold text-[#241C24] sm:text-3xl">
                  Calculate your{' '}
                  <span className="rainbow-heading italic">event budget</span>
                </h3>

                <div className="mt-5 space-y-5">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-semibold text-slate-600">
                        Quantity
                      </span>
                      <span className="num-clean text-lg font-extrabold text-[#241C24]">
                        {quantity.toLocaleString()} bottles
                      </span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={3000}
                      step={50}
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(parseInt(e.target.value, 10))
                      }
                      aria-label="Order quantity slider"
                      className="royal-range w-full"
                    />
                    <div className="mt-1.5 flex justify-between text-[11px] font-medium text-slate-500">
                      <span>50</span>
                      <span>500</span>
                      <span>1,500</span>
                      <span>3,000+</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setIncludeJuiceCombo((v) => !v)}
                      className={`rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors ${
                        includeJuiceCombo
                          ? 'border-[#E11D74] bg-rose-50 text-[#E11D74]'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {includeJuiceCombo
                        ? '✓ Fruit Juice Combo (+PKR 20/bottle)'
                        : '+ Add Fruit Juice Combo'}
                    </button>

                    <button
                      type="button"
                      onClick={() => setIncludePartnerDiscount((v) => !v)}
                      className={`rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors ${
                        includePartnerDiscount
                          ? 'border-[#D4AF37] bg-amber-50 text-[#A67C1E]'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {includePartnerDiscount
                        ? '✓ 10% Partner Rate Applied'
                        : 'Apply 10% Partner Rate'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#FFFDF7] p-6 shadow-sm lg:col-span-5">
                <p className="text-xs font-semibold text-slate-500">
                  Estimated Total · {estimate.tier.name}
                </p>
                <p className="num-clean mt-2 text-3xl font-extrabold text-[#241C24] sm:text-4xl">
                  PKR {estimate.minTotal.toLocaleString()} –{' '}
                  {estimate.maxTotal.toLocaleString()}
                </p>
                <p className="num-clean mt-1 text-xs font-bold text-[#A67C1E]">
                  PKR {estimate.perBottleMin}–{estimate.perBottleMax} per bottle
                </p>

                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                  <a
                    href={buildWhatsAppUrl(quoteSummaryText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rainbow-btn flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold whitespace-nowrap"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Order on WhatsApp</span>
                  </a>
                  <a
                    href={buildMailtoUrl(
                      `Pricing Quote Request - ${estimate.tier.name}`,
                      quoteSummaryText
                    )}
                    className="royal-btn inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold whitespace-nowrap"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Email Quote</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
