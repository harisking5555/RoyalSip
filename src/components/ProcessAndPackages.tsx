import { useMemo, useState } from 'react';
import { Calculator, Check, MessageCircle } from 'lucide-react';
import {
  buildWhatsAppUrl,
  PackageTierId,
  PRICING_TIERS,
} from '../data/royalsipData';

interface ProcessAndPackagesProps {
  onSelectTierForOrder: (tierId: PackageTierId, quantity: number, isPartner: boolean) => void;
}

export function ProcessAndPackages({ onSelectTierForOrder }: ProcessAndPackagesProps) {
  const [selectedTier, setSelectedTier] = useState<PackageTierId>('premium');
  const [quantity, setQuantity] = useState<number>(500);
  const [includePartnerDiscount, setIncludePartnerDiscount] = useState<boolean>(false);
  const [includeJuiceCombo, setIncludeJuiceCombo] = useState<boolean>(false);

  const estimate = useMemo(() => {
    const tier = PRICING_TIERS.find((t) => t.id === selectedTier) ?? PRICING_TIERS[1];
    const discountMultiplier = includePartnerDiscount ? 0.9 : 1;
    const juiceExtra = includeJuiceCombo ? 20 : 0;
    const minTotal = Math.round((tier.minPrice + juiceExtra) * quantity * discountMultiplier);
    const maxTotal = Math.round((tier.maxPrice + juiceExtra) * quantity * discountMultiplier);
    return {
      tier,
      minTotal,
      maxTotal,
      perBottleMin: Math.round((tier.minPrice + juiceExtra) * discountMultiplier),
      perBottleMax: Math.round((tier.maxPrice + juiceExtra) * discountMultiplier),
    };
  }, [selectedTier, quantity, includePartnerDiscount, includeJuiceCombo]);

  const quoteWhatsappUrl = buildWhatsAppUrl(
    `Assalam-o-Alaikum RoyalSip! Please send an exact quote for:\n` +
      `• Package: ${estimate.tier.name}\n` +
      `• Quantity: ${quantity.toLocaleString()} bottles\n` +
      `• Drink Setup: ${includeJuiceCombo ? 'Water + Fruit Juice Combo' : 'Pure Mineral Water (500ml/1.5L)'}\n` +
      `• Partner / 1st Month 10% Rate: ${includePartnerDiscount ? 'Yes' : 'Standard'}\n` +
      `• Estimated Range: PKR ${estimate.minTotal.toLocaleString()} – ${estimate.maxTotal.toLocaleString()}`
  );

  return (
    <section
      id="packages"
      className="section-grad-gold border-t border-[#0B193D]/10 py-14 sm:py-16"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h1 className="font-display text-4xl font-bold tracking-tight text-[#0B193D] sm:text-5xl">
              Three packages.{' '}
              <span className="rainbow-heading italic">One royal standard.</span>
            </h1>
            <p className="text-sm font-medium text-slate-600">
              Free digital mock-up included on every package.
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
                      ? 'border-[#D4AF37] bg-gradient-to-b from-amber-50/90 via-white to-white shadow-md'
                      : 'border-[#D4AF37]/30 bg-white/90 shadow-sm'
                  } ${isSelected ? 'ring-2 ring-[#D4AF37]' : ''}`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-extrabold tracking-wider text-[#B45309] uppercase">
                        {tier.name}
                      </span>
                      {tier.featured && (
                        <span className="text-xs font-bold text-[#B45309]">
                          Most Popular
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-sm font-bold text-slate-500">PKR</span>
                      <span className="num-clean text-4xl font-extrabold text-[#14224A]">
                        {tier.rangeLabel}
                      </span>
                      <span className="text-xs font-medium text-slate-500">/ bottle</span>
                    </div>

                    <p className="mt-2 text-sm text-slate-600">{tier.subtitle}</p>

                    <ul className="mt-5 space-y-2.5 border-t border-slate-200/70 pt-5 text-sm text-slate-700">
                      {tier.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#059669]" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTier(tier.id);
                      onSelectTierForOrder(tier.id, quantity, includePartnerDiscount);
                    }}
                    className={`mt-7 w-full rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                      tier.featured ? 'rainbow-btn shadow-sm' : 'royal-btn'
                    }`}
                  >
                    Select {tier.name}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Instant Quote Estimator */}
        <div className="rainbow-hover-card mt-10 rounded-2xl border border-[#D4AF37]/35 bg-white/90 p-6 shadow-sm backdrop-blur-sm sm:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-bold text-[#B45309] uppercase">
                <Calculator className="h-4 w-4" />
                <span>Budget Estimator</span>
              </div>
              <h2 className="font-display mt-1 text-2xl font-bold text-[#14224A] sm:text-3xl">
                Calculate your{' '}
                <span className="rainbow-heading italic">event budget</span>
              </h2>

              <div className="mt-5 space-y-5">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-600">Quantity</span>
                    <span className="num-clean text-lg font-extrabold text-[#14224A]">
                      {quantity.toLocaleString()} bottles
                    </span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={3000}
                    step={50}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
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
                        ? 'border-orange-500 bg-orange-50 text-orange-800'
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
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
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

            <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#FFFBF0] p-6 shadow-sm lg:col-span-5">
              <p className="text-xs font-semibold text-slate-500">
                Estimated Total · {estimate.tier.name}
              </p>
              <p className="num-clean mt-2 text-3xl font-extrabold text-[#14224A] sm:text-4xl">
                PKR {estimate.minTotal.toLocaleString()} – {estimate.maxTotal.toLocaleString()}
              </p>
              <p className="num-clean mt-1 text-xs font-bold text-[#B45309]">
                PKR {estimate.perBottleMin}–{estimate.perBottleMax} per bottle
              </p>

              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                <a
                  href={quoteWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rainbow-btn flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold whitespace-nowrap"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Order on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() =>
                    onSelectTierForOrder(selectedTier, quantity, includePartnerDiscount)
                  }
                  className="royal-btn rounded-xl px-4 py-2.5 text-xs font-bold whitespace-nowrap"
                >
                  Fill Order Form
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
