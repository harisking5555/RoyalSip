import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, Gift, MessageCircle, Send } from 'lucide-react';
import {
  BRAND,
  buildWhatsAppUrl,
  DRINK_VARIANTS,
  DrinkVariantId,
  PackageTierId,
  PRICING_TIERS,
} from '../data/royalsipData';

export interface OrderPrefill {
  mode: 'quote' | 'sample';
  packageTier: PackageTierId;
  drinkId: DrinkVariantId;
  quantity: number;
  occasion: string;
  labelNotes: string;
}

interface OrderAndSampleFormProps {
  prefill: OrderPrefill;
}

export function OrderAndSampleForm({ prefill }: OrderAndSampleFormProps) {
  const [mode, setMode] = useState<'quote' | 'sample'>(prefill.mode);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessOrVenue, setBusinessOrVenue] = useState('');
  const [occasion, setOccasion] = useState(prefill.occasion);
  const [packageTier, setPackageTier] = useState<PackageTierId>(prefill.packageTier);
  const [drinkId, setDrinkId] = useState<DrinkVariantId>(prefill.drinkId);
  const [quantity, setQuantity] = useState<number>(prefill.quantity);
  const [labelNotes, setLabelNotes] = useState(prefill.labelNotes);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    setMode(prefill.mode);
    setPackageTier(prefill.packageTier);
    setDrinkId(prefill.drinkId);
    setQuantity(prefill.quantity);
    setOccasion(prefill.occasion);
    if (prefill.labelNotes) {
      setLabelNotes(prefill.labelNotes);
    }
  }, [prefill]);

  const selectedDrink = DRINK_VARIANTS.find((d) => d.id === drinkId) ?? DRINK_VARIANTS[0];
  const selectedTier = PRICING_TIERS.find((t) => t.id === packageTier) ?? PRICING_TIERS[1];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    if (cleanName.length < 2) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!/^[\d+\-\s()]{8,18}$/.test(cleanPhone)) {
      setErrorMsg('Please enter a valid phone or WhatsApp number.');
      return;
    }
    if (mode === 'quote' && quantity < 50) {
      setErrorMsg('Minimum order quantity is 50 bottles.');
      return;
    }

    const orderCode = `RS-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef(orderCode);
  };

  const compiledWhatsappMessage =
    mode === 'sample'
      ? `Assalam-o-Alaikum RoyalSip! (${submittedRef || 'Sample Booking'})\n` +
        `I'd like to book FREE branded sample bottles in Lahore:\n` +
        `• Contact Name: ${name || 'Not specified'}\n` +
        `• Phone: ${phone || 'Not specified'}\n` +
        `• Business / Venue: ${businessOrVenue || 'Restaurant / Marquee / Office'}\n` +
        `• Label Notes: ${labelNotes || 'Please contact for logo'}`
      : `Assalam-o-Alaikum RoyalSip! (${submittedRef || 'Quote Request'})\n` +
        `• Name: ${name || 'Not specified'}\n` +
        `• Phone: ${phone || 'Not specified'}\n` +
        `• Occasion: ${occasion}\n` +
        `• Package: ${selectedTier.name} (PKR ${selectedTier.rangeLabel})\n` +
        `• Drink & Size: ${selectedDrink.label}\n` +
        `• Quantity: ${quantity} bottles\n` +
        `• Venue / Area: ${businessOrVenue || 'Lahore'}\n` +
        `• Label Details: ${labelNotes || 'Free mock-up requested'}`;

  const whatsappUrl = buildWhatsAppUrl(compiledWhatsappMessage);

  return (
    <section
      id="order-form"
      className="section-grad-prism border-t border-[#0B193D]/10 py-14 sm:py-16"
    >
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Contact Summary */}
          <div className="lg:col-span-5">
            <h1 className="font-display text-4xl font-bold tracking-tight text-[#0B193D] sm:text-5xl">
              Start your{' '}
              <span className="rainbow-heading italic">custom order.</span>
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Send your logo, couple names, or colour theme to receive a free digital mock-up
              before production.
            </p>

            <div className="rainbow-hover-card mt-6 space-y-4 rounded-2xl border border-[#D4AF37]/40 bg-white/95 p-6 shadow-sm">
              <div>
                <p className="text-xs font-semibold text-slate-500">Call / WhatsApp Direct</p>
                <a
                  href={`https://wa.me/${BRAND.whatsappNumberRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="num-clean mt-1 inline-block text-xl font-extrabold text-[#14224A] hover:text-[#B45309]"
                >
                  {BRAND.whatsappDisplay}
                </a>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <p className="text-xs font-semibold text-slate-500">Official Email &amp; Domain</p>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="mt-1 inline-block text-sm font-bold text-[#B45309] hover:underline"
                >
                  {BRAND.email}
                </a>
                <p className="mt-0.5 text-xs text-slate-500">{BRAND.domain}</p>
              </div>

              <div className="border-t border-slate-100 pt-4 text-xs text-slate-600">
                <p className="font-bold text-[#14224A]">Lahore Delivery</p>
                <p className="mt-1">
                  Marquees, corporate offices, restaurants &amp; doorstep deliveries across Lahore.
                </p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="royal-btn flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold"
              >
                <MessageCircle className="h-4 w-4 text-[#14224A]" />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Form Container */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[#0B193D]/12 bg-white/95 p-6 shadow-sm backdrop-blur-sm sm:p-8">
              <div className="mb-6 flex gap-2 rounded-xl bg-slate-100 p-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setMode('quote');
                    setSubmittedRef(null);
                  }}
                  className={`flex-1 rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
                    mode === 'quote'
                      ? 'royal-btn shadow-sm'
                      : 'text-slate-600 hover:text-[#14224A]'
                  }`}
                >
                  Custom Order
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('sample');
                    setSubmittedRef(null);
                  }}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
                    mode === 'sample'
                      ? 'rainbow-btn text-white shadow-sm'
                      : 'text-slate-600 hover:text-[#0B193D]'
                  }`}
                >
                  <Gift className="h-3.5 w-3.5" />
                  <span>Book Free Sample</span>
                </button>
              </div>

              {submittedRef ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
                  <h2 className="font-display mt-3 text-2xl font-bold text-[#0B193D]">
                    Request Prepared ({submittedRef})
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Click below to send these details directly on WhatsApp for your free mock-up.
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rainbow-btn inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Send via WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmittedRef(null)}
                      className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs font-bold text-[#0B193D] hover:bg-slate-50"
                    >
                      Edit Details
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="order-name" className="mb-1.5 block text-xs font-semibold text-slate-700">
                        Your Name *
                      </label>
                      <input
                        id="order-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Hamza Tariq"
                        className="w-full rounded-xl border border-slate-300 bg-[#FAFBFD] px-3.5 py-2.5 text-sm text-[#0B193D] placeholder-slate-400 focus:border-[#D4AF37] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="order-phone" className="mb-1.5 block text-xs font-semibold text-slate-700">
                        WhatsApp / Phone *
                      </label>
                      <input
                        id="order-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="03XX-XXXXXXX"
                        className="w-full rounded-xl border border-slate-300 bg-[#FAFBFD] px-3.5 py-2.5 text-sm text-[#0B193D] placeholder-slate-400 focus:border-[#D4AF37] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="order-venue" className="mb-1.5 block text-xs font-semibold text-slate-700">
                        {mode === 'sample' ? 'Business / Venue Name' : 'Lahore Area / Venue'}
                      </label>
                      <input
                        id="order-venue"
                        type="text"
                        value={businessOrVenue}
                        onChange={(e) => setBusinessOrVenue(e.target.value)}
                        placeholder={
                          mode === 'sample' ? 'e.g. Royal Palm Marquee' : 'e.g. DHA Phase 5 / Gulberg'
                        }
                        className="w-full rounded-xl border border-slate-300 bg-[#FAFBFD] px-3.5 py-2.5 text-sm text-[#0B193D] placeholder-slate-400 focus:border-[#D4AF37] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="order-occasion" className="mb-1.5 block text-xs font-semibold text-slate-700">
                        Occasion
                      </label>
                      <select
                        id="order-occasion"
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-[#FAFBFD] px-3.5 py-2.5 text-sm text-[#0B193D] focus:border-[#D4AF37] focus:bg-white focus:outline-none"
                      >
                        <option value="Shadi / Wedding Marquee">Shadi / Wedding Marquee</option>
                        <option value="Event Planner Partner">Event Planner Partner (10% Off)</option>
                        <option value="Corporate Conference / Office">Corporate Conference / Office</option>
                        <option value="Restaurant / Café Monthly Plan">Restaurant / Café Monthly Plan</option>
                        <option value="Birthday / Mehndi / Dholki Party">Birthday / Mehndi / Dholki Party</option>
                        <option value="Home & Office Delivery">Home &amp; Office Delivery</option>
                        <option value="Event Drinks Combo (Water + Juice)">Event Drinks Combo (Water + Juice)</option>
                      </select>
                    </div>
                  </div>

                  {mode === 'quote' && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div>
                        <label htmlFor="order-tier" className="mb-1.5 block text-xs font-semibold text-slate-700">
                          Package
                        </label>
                        <select
                          id="order-tier"
                          value={packageTier}
                          onChange={(e) => setPackageTier(e.target.value as PackageTierId)}
                          className="w-full rounded-xl border border-slate-300 bg-[#FAFBFD] px-3 py-2.5 text-sm text-[#0B193D] focus:border-[#D4AF37] focus:bg-white focus:outline-none"
                        >
                          {PRICING_TIERS.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.name} (PKR {t.rangeLabel})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="order-drink" className="mb-1.5 block text-xs font-semibold text-slate-700">
                          Bottle / Flavor
                        </label>
                        <select
                          id="order-drink"
                          value={drinkId}
                          onChange={(e) => setDrinkId(e.target.value as DrinkVariantId)}
                          className="w-full rounded-xl border border-slate-300 bg-[#FAFBFD] px-3 py-2.5 text-sm text-[#0B193D] focus:border-[#D4AF37] focus:bg-white focus:outline-none"
                        >
                          {DRINK_VARIANTS.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="order-qty" className="mb-1.5 block text-xs font-semibold text-slate-700">
                          Quantity (Min 50)
                        </label>
                        <input
                          id="order-qty"
                          type="number"
                          min={50}
                          step={50}
                          value={quantity}
                          onChange={(e) => setQuantity(parseInt(e.target.value || '50', 10))}
                          className="num-clean w-full rounded-xl border border-slate-300 bg-[#FAFBFD] px-3.5 py-2.5 text-sm font-semibold text-[#0B193D] focus:border-[#D4AF37] focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label htmlFor="order-notes" className="mb-1.5 block text-xs font-semibold text-slate-700">
                      Label Text, Names or Colours
                    </label>
                    <textarea
                      id="order-notes"
                      rows={3}
                      value={labelNotes}
                      onChange={(e) => setLabelNotes(e.target.value)}
                      placeholder="e.g. Ayesha & Hamza · Royal Navy & Gold theme..."
                      className="w-full rounded-xl border border-slate-300 bg-[#FAFBFD] px-3.5 py-2.5 text-sm text-[#0B193D] placeholder-slate-400 focus:border-[#D4AF37] focus:bg-white focus:outline-none"
                    />
                  </div>

                  {errorMsg && (
                    <p className="rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="rainbow-btn flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold shadow-sm active:scale-[0.99]"
                  >
                    <Send className="h-4 w-4" />
                    <span>
                      {mode === 'sample'
                        ? 'Book Free Sample Visit'
                        : 'Prepare Quote for WhatsApp'}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
