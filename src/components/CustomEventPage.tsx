import { ChangeEvent, FormEvent, useState } from 'react';
import { CheckCircle2, Mail, MessageCircle, Send, Upload } from 'lucide-react';
import {
  BOTTLE_PHOTOS,
  BRAND,
  buildMailtoUrl,
  buildWhatsAppUrl,
  PackageTierId,
  PRICING_TIERS,
} from '../data/royalsipData';

const SAMPLE_LABELS: {
  tierId: PackageTierId;
  title: string;
  subtitle: string;
  image: string;
}[] = [
  {
    tierId: 'basic',
    title: 'Basic · Metallic Silver',
    subtitle: 'Clean 1-colour venue or company line · PKR 80–100',
    image: BOTTLE_PHOTOS.labelBasic,
  },
  {
    tierId: 'standard',
    title: 'Standard · Full-Colour Event',
    subtitle: 'Couple names, wedding date & custom colours · PKR 120–150',
    image: BOTTLE_PHOTOS.labelStandard,
  },
  {
    tierId: 'premium',
    title: 'Premium · Black & Gold Foil',
    subtitle: 'Luxury matte finish with gold crest monogram · PKR 180–250',
    image: BOTTLE_PHOTOS.labelPremium,
  },
];

export function CustomEventPage() {
  const [eventType, setEventType] = useState('Wedding / Walima');
  const [eventDate, setEventDate] = useState('');
  const [quantity, setQuantity] = useState(500);
  const [selectedTier, setSelectedTier] = useState<PackageTierId>('standard');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [venueCity, setVenueCity] = useState('');
  const [labelNotes, setLabelNotes] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadedPreviewUrl, setUploadedPreviewUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFileName(file.name);
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setUploadedPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setUploadedPreviewUrl(null);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (customerName.trim().length < 2) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!/^[\d+\-\s()]{8,18}$/.test(phone.trim())) {
      setErrorMsg('Please enter a valid mobile / WhatsApp number.');
      return;
    }
    if (quantity < 50) {
      setErrorMsg('Minimum custom event quantity is 50 bottles.');
      return;
    }

    setSubmittedCode(`EVT-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  const tierObj = PRICING_TIERS.find((t) => t.id === selectedTier) ?? PRICING_TIERS[1];

  const messagePayload =
    `Assalam-o-Alaikum RoyalSip! (${submittedCode || 'Custom Event Enquiry'})\n` +
    `• Customer Name: ${customerName || 'Not specified'}\n` +
    `• Phone / WhatsApp: ${phone || 'Not specified'}\n` +
    `• Email: ${email || 'Not provided'}\n` +
    `• Event Type: ${eventType}\n` +
    `• Event Date: ${eventDate || 'Flexible / To be confirmed'}\n` +
    `• Quantity: ${quantity} bottles\n` +
    `• Label Package: ${tierObj.name} (PKR ${tierObj.rangeLabel})\n` +
    `• Venue / Hall: ${venueCity || 'Lahore'}\n` +
    `• Uploaded Custom Artwork: ${uploadedFileName || 'Design requested from RoyalSip team'}\n` +
    `• Label Text / Notes: ${labelNotes || 'Please prepare complimentary mock-up'}\n` +
    `Directed to: ${BRAND.email}`;

  return (
    <section className="section-grad-hero border-t border-[#D4AF37]/25 py-12 sm:py-16">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Introduction Header */}
        <div className="max-w-3xl">
          <p className="text-xs font-bold tracking-wider text-[#E11D74] uppercase">
            Customise Your Event · All over Lahore
          </p>
          <h1 className="font-display mt-1 text-4xl font-bold tracking-tight text-[#241C24] sm:text-5xl">
            Bespoke labels for{' '}
            <span className="rainbow-heading italic">every celebration.</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Turn every guest table into a signature moment for weddings, marriage halls, corporate
            seminars, restaurants, and private parties. Pick a RoyalSip label edition below or upload
            your own artwork.
          </p>
        </div>

        {/* Sample Custom Label Designs Row */}
        <div className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-3">
          {SAMPLE_LABELS.map((sample) => {
            const active = selectedTier === sample.tierId;
            return (
              <button
                key={sample.tierId}
                type="button"
                onClick={() => setSelectedTier(sample.tierId)}
                className={`rainbow-hover-card flex flex-col items-start rounded-2xl border bg-white/95 p-4 text-left transition-all ${
                  active
                    ? 'border-[#E11D74] ring-2 ring-[#E11D74]/40'
                    : 'border-[#D4AF37]/35 shadow-sm'
                }`}
              >
                <div className="w-full overflow-hidden rounded-xl border border-slate-100 bg-[#FFFDF7]">
                  <img
                    src={sample.image}
                    alt={sample.title}
                    referrerPolicy="no-referrer"
                    className="aspect-square w-full object-cover"
                  />
                </div>
                <h2 className="font-display mt-4 text-xl font-bold text-[#241C24]">
                  {sample.title}
                </h2>
                <p className="mt-1 text-xs text-slate-600">{sample.subtitle}</p>
                <span className="mt-3 text-xs font-bold text-[#E11D74]">
                  {active ? '✓ Selected Label Style' : 'Select This Label Style'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Custom Event Enquiry Form */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="rainbow-hover-card rounded-2xl border border-[#D4AF37]/35 bg-white/95 p-6 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-[#241C24]">
                Direct Event Desk
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                All custom event enquiries are dispatched immediately via WhatsApp and addressed to
                our official sales team:
              </p>

              <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 text-sm">
                <div>
                  <p className="text-xs text-slate-500">Official Business Email</p>
                  <a
                    href={`mailto:${BRAND.email}`}
                    className="font-bold text-[#E11D74] hover:underline"
                  >
                    {BRAND.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-slate-500">WhatsApp Event Line</p>
                  <a
                    href={`https://wa.me/${BRAND.whatsappNumberRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="num-clean font-bold text-[#241C24] hover:text-[#A67C1E]"
                  >
                    {BRAND.whatsappDisplay}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-[#D4AF37]/35 bg-white/95 p-6 shadow-sm sm:p-8">
              {submittedCode ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-6 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
                  <h3 className="font-display mt-3 text-2xl font-bold text-[#241C24]">
                    Event Enquiry Ready ({submittedCode})
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Your custom event specifications have been compiled. Send via WhatsApp or email{' '}
                    <strong>{BRAND.email}</strong> (attach your label file if emailing artwork).
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-3">
                    <a
                      href={buildWhatsAppUrl(messagePayload)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rainbow-btn inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Send via WhatsApp</span>
                    </a>
                    <a
                      href={buildMailtoUrl(
                        `Custom Event Enquiry (${submittedCode}) - ${eventType}`,
                        messagePayload
                      )}
                      className="royal-btn inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Email {BRAND.email}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmittedCode(null)}
                      className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs font-bold text-[#241C24]"
                    >
                      Edit Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="ce-name" className="mb-1 block text-xs font-semibold text-slate-700">
                        Customer Name *
                      </label>
                      <input
                        id="ce-name"
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Ayesha & Ali / Sara Khan"
                        className="w-full rounded-xl border border-slate-300 bg-[#FFFDF7] px-3.5 py-2.5 text-sm focus:border-[#D4AF37] focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="ce-phone" className="mb-1 block text-xs font-semibold text-slate-700">
                        Contact / WhatsApp Number *
                      </label>
                      <input
                        id="ce-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="03XX-XXXXXXX"
                        className="w-full rounded-xl border border-slate-300 bg-[#FFFDF7] px-3.5 py-2.5 text-sm focus:border-[#D4AF37] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="ce-email" className="mb-1 block text-xs font-semibold text-slate-700">
                        Email Address
                      </label>
                      <input
                        id="ce-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-slate-300 bg-[#FFFDF7] px-3.5 py-2.5 text-sm focus:border-[#D4AF37] focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="ce-venue" className="mb-1 block text-xs font-semibold text-slate-700">
                        Venue / Marriage Hall / Company
                      </label>
                      <input
                        id="ce-venue"
                        type="text"
                        value={venueCity}
                        onChange={(e) => setVenueCity(e.target.value)}
                        placeholder="e.g. Royal Palm Marquee, Lahore"
                        className="w-full rounded-xl border border-slate-300 bg-[#FFFDF7] px-3.5 py-2.5 text-sm focus:border-[#D4AF37] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label htmlFor="ce-type" className="mb-1 block text-xs font-semibold text-slate-700">
                        Event Type *
                      </label>
                      <select
                        id="ce-type"
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-[#FFFDF7] px-3 py-2.5 text-sm focus:border-[#D4AF37] focus:bg-white focus:outline-none"
                      >
                        <option value="Wedding / Walima">Wedding / Walima</option>
                        <option value="Marriage Hall / Marquee">Marriage Hall / Marquee</option>
                        <option value="Corporate Event / Seminar">Corporate Event / Seminar</option>
                        <option value="Restaurant / Café Table">Restaurant / Café Table</option>
                        <option value="Birthday / Mehndi / Private Party">Birthday / Mehndi / Party</option>
                        <option value="Other Occasion">Other Occasion</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="ce-date" className="mb-1 block text-xs font-semibold text-slate-700">
                        Event Date
                      </label>
                      <input
                        id="ce-date"
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-[#FFFDF7] px-3 py-2.5 text-sm focus:border-[#D4AF37] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="ce-qty" className="mb-1 block text-xs font-semibold text-slate-700">
                        Required Quantity (Min 50) *
                      </label>
                      <input
                        id="ce-qty"
                        type="number"
                        min={50}
                        step={50}
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value || '50', 10))}
                        className="num-clean w-full rounded-xl border border-slate-300 bg-[#FFFDF7] px-3.5 py-2.5 text-sm font-bold focus:border-[#D4AF37] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Custom Label / Design Upload */}
                  <div>
                    <label
                      htmlFor="ce-upload"
                      className="mb-1.5 block text-xs font-semibold text-slate-700"
                    >
                      Upload Custom Label or Design (Optional — PNG, JPG, PDF, SVG)
                    </label>
                    <label
                      htmlFor="ce-upload"
                      className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-dashed border-[#D4AF37] bg-[#FFFDF7] px-4 py-3 text-xs transition-colors hover:bg-amber-50/50"
                    >
                      <div className="flex items-center gap-3">
                        <Upload className="h-4 w-4 text-[#A67C1E]" />
                        <span className="font-medium text-slate-700">
                          {uploadedFileName
                            ? `Selected: ${uploadedFileName}`
                            : 'Choose your logo, monogram, or custom label file'}
                        </span>
                      </div>
                      {uploadedPreviewUrl && (
                        <img
                          src={uploadedPreviewUrl}
                          alt="Uploaded label preview"
                          className="h-10 w-10 rounded border border-slate-200 object-cover"
                        />
                      )}
                    </label>
                    <input
                      id="ce-upload"
                      type="file"
                      accept="image/*,.pdf,.svg,.ai"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </div>

                  <div>
                    <label htmlFor="ce-notes" className="mb-1 block text-xs font-semibold text-slate-700">
                      Custom Text, Couple Names or Theme Details
                    </label>
                    <textarea
                      id="ce-notes"
                      rows={3}
                      value={labelNotes}
                      onChange={(e) => setLabelNotes(e.target.value)}
                      placeholder="e.g. Ayesha & Ali · Walima · 12.12.2026"
                      className="w-full rounded-xl border border-slate-300 bg-[#FFFDF7] px-3.5 py-2.5 text-sm focus:border-[#D4AF37] focus:bg-white focus:outline-none"
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
                    <span>Submit Custom Event Enquiry</span>
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
