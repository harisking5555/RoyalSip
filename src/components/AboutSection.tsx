import { ArrowRight, Building2, Check, Download, Globe, Users } from 'lucide-react';
import { BOTTLE_PHOTOS, BRAND, PageId, PROCESS_STEPS } from '../data/royalsipData';
import { downloadCompanyProfilePdf } from '../utils/companyProfilePdf';

interface AboutSectionProps {
  onNavigate?: (page: PageId) => void;
}

export function AboutSection({ onNavigate }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="section-grad-gold border-t border-[#D4AF37]/25 py-12 sm:py-16"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Top Hero Intro & Company Profile Download */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rainbow-hover-card overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-white/95 p-3 shadow-sm">
              <img
                src={BOTTLE_PHOTOS.trioShowcase}
                alt="RoyalSip Beverages Basic, Standard, and Premium bottle portfolio"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="aspect-square w-full rounded-xl object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-xs font-bold tracking-wider text-[#E11D74] uppercase">
              About Us &amp; Company Profile
            </p>
            <h1 className="font-display mt-1 text-4xl font-bold tracking-tight text-[#241C24] sm:text-5xl">
              Turn water{' '}
              <span className="rainbow-heading italic">into your brand.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              <strong>RoyalSip Beverages</strong> ({BRAND.domain}) is a Lahore-based custom
              beverage &amp; private-label bottling brand delivering <strong>Pure Drinking Water</strong>{' '}
              (500ml &amp; 1.5L) alongside our chilled RoyalSip Fruit Juices &amp; Flavoured Water
              collection. We serve hospitality tables, weddings, and workplaces all over Lahore.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={downloadCompanyProfilePdf}
                className="rainbow-btn inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold shadow-sm active:scale-95"
              >
                <Download className="h-4 w-4" />
                <span>Download Company Profile PDF</span>
              </button>

              {onNavigate && (
                <button
                  type="button"
                  onClick={() => onNavigate('custom-event')}
                  className="royal-btn inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold shadow-sm active:scale-95"
                >
                  <span>Customise Your Event</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* B2B & B2C Operations + Mission & Vision */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rainbow-hover-card rounded-2xl border border-[#D4AF37]/35 bg-white/95 p-6 shadow-sm sm:p-7">
            <div className="flex items-center gap-2.5">
              <Building2 className="h-5 w-5 text-[#A67C1E]" />
              <h2 className="font-display text-2xl font-bold text-[#241C24]">
                B2B Operations
              </h2>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Dedicated supply partner for hospitality venues, corporate enterprises, and dining brands.
            </p>
            <ul className="mt-4 space-y-2.5 border-t border-slate-100 pt-4 text-sm text-slate-700">
              {[
                'Wedding marquees & marriage halls with Shadi Royale & Gold-Foil bottles',
                'Event planner partnerships with a flat 10% trade rate & peak priority',
                'Restaurants, hotels & cafés on locked-in monthly table supply plans',
                'Corporate conferences & office boards with brand logo 500ml packs',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#A67C1E]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rainbow-hover-card rounded-2xl border border-[#D4AF37]/35 bg-white/95 p-6 shadow-sm sm:p-7">
            <div className="flex items-center gap-2.5">
              <Users className="h-5 w-5 text-[#E11D74]" />
              <h2 className="font-display text-2xl font-bold text-[#241C24]">
                B2C Operations
              </h2>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Accessible custom celebrations and direct home refreshment orders from just 50 bottles.
            </p>
            <ul className="mt-4 space-y-2.5 border-t border-slate-100 pt-4 text-sm text-slate-700">
              {[
                'Personalised labels for birthdays, mehndi, dholki & family milestones',
                'Direct e-commerce store checkout with Cash on Delivery (COD)',
                'Full RoyalSip Fruit Juice & Flavoured Water case ordering',
                'Fast complimentary digital label mock-up before production begins',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#E11D74]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mission, Vision & Key Business Details */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rainbow-hover-card rounded-2xl border border-[#D4AF37]/30 bg-white/95 p-6">
            <p className="text-xs font-bold tracking-wider text-[#A67C1E] uppercase">Our Mission</p>
            <h3 className="font-display mt-1.5 text-xl font-bold text-[#241C24]">
              Personalise every pour.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              To turn everyday hydration into an elevated, hygienic brand touchpoint across weddings,
              hospitality tables, and workplaces throughout Lahore and Pakistan.
            </p>
          </div>

          <div className="rainbow-hover-card rounded-2xl border border-[#D4AF37]/30 bg-white/95 p-6">
            <p className="text-xs font-bold tracking-wider text-[#E11D74] uppercase">Our Vision</p>
            <h3 className="font-display mt-1.5 text-xl font-bold text-[#241C24]">
              Trusted refreshment leader.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              To become Pakistan&apos;s premier bespoke bottled water and beverage partner—known for
              crisp custom print standards, zero-delay venue logistics, and honest service.
            </p>
          </div>

          <div className="rainbow-hover-card rounded-2xl border border-[#D4AF37]/30 bg-white/95 p-6">
            <p className="text-xs font-bold tracking-wider text-[#A67C1E] uppercase">
              Key Business Info
            </p>
            <div className="mt-2.5 space-y-1.5 text-xs text-slate-700">
              <p>
                <strong>Company:</strong> {BRAND.name}
              </p>
              <p>
                <strong>Tagline:</strong>{' '}
                <span className="font-semibold italic text-[#A67C1E]">{BRAND.tagline}</span>
              </p>
              <p>
                <strong>Website:</strong> {BRAND.domain}
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${BRAND.email}`} className="font-bold text-[#E11D74] hover:underline">
                  {BRAND.email}
                </a>
              </p>
              <p>
                <strong>Phone / WhatsApp:</strong>{' '}
                <span className="num-clean font-bold">{BRAND.whatsappDisplay}</span>
              </p>
              <p className="flex items-center gap-1.5 pt-1 text-slate-500">
                <Globe className="h-3.5 w-3.5 text-[#A67C1E]" />
                <span>Service Area: All over Lahore · Cash on Delivery</span>
              </p>
            </div>
          </div>
        </div>

        {/* 3-Step Workflow */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PROCESS_STEPS.map((item, idx) => {
            const colors = ['#A67C1E', '#E11D74', '#A67C1E'];
            return (
              <div
                key={item.step}
                className="rainbow-hover-card rounded-xl border border-[#D4AF37]/30 bg-white/95 p-5"
              >
                <span
                  className="num-clean text-sm font-extrabold"
                  style={{ color: colors[idx % colors.length] }}
                >
                  {item.step}.
                </span>
                <h3 className="font-display mt-1.5 text-lg font-bold text-[#241C24]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
