import { useState } from 'react';
import { ArrowRight, Check, Mail, MessageCircle, ShoppingBag } from 'lucide-react';
import {
  BRAND,
  buildMailtoUrl,
  buildWhatsAppUrl,
  DEAL_BUNDLES,
  DealBundle,
  DealCategory,
  PageId,
  SHOP_PRODUCTS,
  ShopProduct,
} from '../data/royalsipData';

interface DealsPageProps {
  onAddToCart: (product: ShopProduct) => void;
  onNavigate: (page: PageId) => void;
}

const DEAL_TABS: { id: DealCategory; label: string }[] = [
  { id: 'all', label: 'All Deals (6)' },
  { id: 'bulk-water', label: 'Bulk Water Packages' },
  { id: 'event-packages', label: 'Event Packages' },
  { id: 'water-juice-combo', label: 'Water + Juice Combos' },
];

export function DealsPage({ onAddToCart, onNavigate }: DealsPageProps) {
  const [filter, setFilter] = useState<DealCategory>('all');
  const [selectedDeal, setSelectedDeal] = useState<DealBundle | null>(null);

  const visibleDeals =
    filter === 'all' ? DEAL_BUNDLES : DEAL_BUNDLES.filter((d) => d.category === filter);

  const handleEnquireDeal = (deal: DealBundle) => {
    setSelectedDeal(deal);
  };

  const handleQuickAddBundle = (deal: DealBundle) => {
    const bundleAsProduct: ShopProduct = {
      id: deal.id,
      sku: deal.id.toUpperCase(),
      category: 'custom-pack',
      name: deal.name,
      volume: deal.categoryLabel,
      packSize: 'Bundle Deal',
      price: deal.priceNumeric,
      summary: deal.contents.join(' · '),
      image: deal.image,
      accentHex: '#E11D74',
    };
    onAddToCart(bundleAsProduct || SHOP_PRODUCTS[0]);
  };

  return (
    <section className="section-grad-royal border-t border-[#D4AF37]/25 py-12 sm:py-16">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold tracking-wider text-[#E11D74] uppercase">
              Special Offers · Lahore
            </p>
            <h1 className="font-display mt-1 text-4xl font-bold tracking-tight text-[#241C24] sm:text-5xl">
              Value Packages &amp;{' '}
              <span className="rainbow-heading italic">Combo Deals.</span>
            </h1>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('custom-event')}
            className="rainbow-btn inline-flex items-center gap-2 self-start rounded-xl px-4 py-2.5 text-xs font-bold sm:self-auto whitespace-nowrap"
          >
            <span>Need Custom Event Quote?</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Clean Gold Underline Filter Tabs */}
        <div
          className="no-scrollbar mt-8 flex items-center gap-6 overflow-x-auto border-b border-[#D4AF37]/30 sm:gap-9"
          role="tablist"
          aria-label="Filter bundle deals"
        >
          {DEAL_TABS.map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(tab.id)}
                className={`relative pb-3 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  active ? 'text-[#241C24]' : 'text-slate-500 hover:text-[#A67C1E]'
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

        {/* Bundles Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleDeals.map((deal) => (
            <article
              key={deal.id}
              className="rainbow-hover-card relative flex flex-col justify-between rounded-2xl border border-[#D4AF37]/35 bg-white/95 p-5 shadow-sm"
            >
              <div
                className={`absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r ${deal.accentGradient}`}
                aria-hidden="true"
              />

              <div>
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-slate-500">{deal.categoryLabel}</span>
                  <span className="font-bold text-[#E11D74]">{deal.savingsBadge}</span>
                </div>

                <div className="mt-3.5 overflow-hidden rounded-xl border border-slate-100 bg-[#FFFDF7]">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                  />
                </div>

                <h2 className="font-display mt-4 text-2xl font-bold text-[#241C24]">
                  {deal.name}
                </h2>
                <p className="num-clean mt-1.5 text-2xl font-extrabold text-[#A67C1E]">
                  {deal.priceLabel}
                </p>

                <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-600">
                  {deal.contents.map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#E11D74]" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => handleQuickAddBundle(deal)}
                  className="royal-btn inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3.5 py-2.5 text-xs font-bold whitespace-nowrap"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  <span>Add to Cart</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleEnquireDeal(deal)}
                  className="rainbow-btn inline-flex items-center justify-center gap-1.5 rounded-xl px-3.5 py-2.5 text-xs font-bold whitespace-nowrap"
                >
                  <span>Enquire</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Selected Deal Enquiry Drawer / Strip */}
        {selectedDeal && (
          <div className="mt-10 rounded-2xl border border-[#D4AF37]/45 bg-white/95 p-6 shadow-md">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-bold text-[#E11D74] uppercase">Deal Enquiry Ready</p>
                <h3 className="font-display mt-1 text-2xl font-bold text-[#241C24]">
                  {selectedDeal.name} ({selectedDeal.priceLabel})
                </h3>
                <p className="mt-1 text-xs text-slate-600">
                  Send this bundle request directly on WhatsApp or via {BRAND.email}.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <a
                  href={buildWhatsAppUrl(
                    `Assalam-o-Alaikum RoyalSip! I want to order / enquire about the "${selectedDeal.name}" (${selectedDeal.priceLabel}):\n` +
                      selectedDeal.contents.map((c) => `• ${c}`).join('\n')
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rainbow-btn inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Order on WhatsApp</span>
                </a>
                <a
                  href={buildMailtoUrl(
                    `Deal Enquiry: ${selectedDeal.name}`,
                    `Hello RoyalSip Team,\n\nI would like to book the ${selectedDeal.name} (${selectedDeal.priceLabel}).\n\nIncludes:\n${selectedDeal.contents.join(
                      '\n'
                    )}\n\nPlease contact me.`
                  )}
                  className="royal-btn inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email {BRAND.email}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
