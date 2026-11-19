import { useState } from 'react';
import {
  ChevronDown,
  Facebook,
  Globe,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import { BRAND, buildWhatsAppUrl, FAQS, PageId } from '../data/royalsipData';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="section-grad-royal border-t border-[#D4AF37]/25 py-14 sm:py-16"
    >
      <div className="mx-auto max-w-[920px] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[#14224A] sm:text-4xl">
            Frequently asked <span className="rainbow-heading italic">questions</span>
          </h2>
        </div>

        <div className="mt-8 space-y-3">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-xl border border-[#D4AF37]/30 bg-white/95"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold text-[#14224A] transition-colors hover:bg-amber-50/50"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-[#B45309] transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-slate-100 bg-white px-5 py-4 text-sm leading-relaxed text-slate-600">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const whatsappUrl = buildWhatsAppUrl(
    'Assalam-o-Alaikum RoyalSip! I have a question about customized bottles.'
  );

  const footerLinks: { label: string; page: PageId; href: string }[] = [
    { label: 'Home', page: 'home', href: '#home' },
    { label: 'About Us', page: 'about', href: '#about' },
    { label: 'Solutions', page: 'solutions', href: '#solutions' },
    { label: 'Packages', page: 'packages', href: '#packages' },
    { label: 'Contact', page: 'contact', href: '#contact' },
  ];

  const featuredOfferings = [
    'Shadi Royale Bundle',
    'Planner Partner Pack',
    'Corporate Brand Pack',
    'Restaurant Table Plan',
    'Event Drinks Combo',
    'Try RoyalSip Free',
  ];

  return (
    <footer className="border-t border-[#D4AF37]/35 bg-gradient-to-br from-[#FFFBF0] via-[#FFF8E1]/80 to-[#FDF2F8]/80">
      <div className="prism-hairline h-[3px] w-full" aria-hidden="true" />
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Logo Image ONLY + Domain + Social */}
          <div className="lg:col-span-4">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              aria-label="RoyalSip Home"
              className="inline-block"
            >
              <img
                src={BRAND.logoUrl}
                alt="RoyalSip"
                referrerPolicy="no-referrer"
                className="h-12 w-auto object-contain"
              />
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-600">
              {BRAND.tagline} Custom 500ml &amp; 1.5L mineral water and chilled fruit juice bottles
              crafted for weddings, marquees, corporates, and restaurants in Lahore.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <a
                href={BRAND.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RoyalSip Facebook Page"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#D4AF37]/35 bg-white px-3 py-2 text-xs font-semibold text-[#14224A] transition-colors hover:border-blue-500"
              >
                <Facebook className="h-4 w-4 text-blue-600" />
                <span>Facebook</span>
              </a>
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RoyalSip Instagram Profile"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#D4AF37]/35 bg-white px-3 py-2 text-xs font-semibold text-[#14224A] transition-colors hover:border-pink-500"
              >
                <Instagram className="h-4 w-4 text-pink-600" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Page Links */}
          <div className="lg:col-span-2">
            <p className="text-xs font-bold tracking-wider text-[#B45309] uppercase">Explore</p>
            <ul className="mt-3 space-y-2.5 text-sm font-medium text-slate-600">
              {footerLinks.map((item) => (
                <li key={item.page}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.page);
                    }}
                    className="transition-colors hover:text-[#B45309]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Popular Offerings */}
          <div className="lg:col-span-3">
            <p className="text-xs font-bold tracking-wider text-[#B45309] uppercase">
              Solutions &amp; Packs
            </p>
            <ul className="mt-3 space-y-2.5 text-sm font-medium text-slate-600">
              {featuredOfferings.map((title) => (
                <li key={title}>
                  <a
                    href="#solutions"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('solutions');
                    }}
                    className="transition-colors hover:text-[#B45309]"
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Official Contact & Domain Info */}
          <div className="lg:col-span-3">
            <p className="text-xs font-bold tracking-wider text-[#B45309] uppercase">
              Contact &amp; Delivery
            </p>
            <div className="mt-3 space-y-3 text-sm text-slate-600">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-bold text-emerald-700 hover:text-emerald-800"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                <span className="num-clean">{BRAND.whatsappDisplay}</span>
              </a>

              <a
                href={`mailto:${BRAND.email}`}
                className="flex items-center gap-2 font-semibold text-[#14224A] hover:text-[#B45309]"
              >
                <Mail className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                <span>{BRAND.email}</span>
              </a>

              <a
                href={BRAND.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-medium text-slate-600 hover:text-[#B45309]"
              >
                <Globe className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                <span>{BRAND.domain}</span>
              </a>

              <div className="flex items-start gap-2 pt-0.5 text-xs leading-relaxed text-slate-500">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                <span>
                  Delivering across DHA, Gulberg, Model Town, Bahria Town &amp; all Lahore marquees
                  (Mon–Sun · 9 AM – 10 PM).
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#D4AF37]/25 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {BRAND.domain} · All rights reserved.
          </p>
          <p>Custom Water &amp; Fruit Juice Bottles · 500ml &amp; 1.5L · Lahore</p>
        </div>
      </div>
    </footer>
  );
}
