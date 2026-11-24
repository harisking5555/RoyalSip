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
          <h2 className="font-display text-3xl font-bold tracking-tight text-[#241C24] sm:text-4xl">
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
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold text-[#241C24] transition-colors hover:bg-amber-50/50"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-[#A67C1E] transition-transform duration-200 ${
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
    'Assalam-o-Alaikum RoyalSip! I have a question about RoyalSip bottles & fruit drinks.'
  );

  const footerLinks: { label: string; page: PageId; href: string }[] = [
    { label: 'Home', page: 'home', href: '#home' },
    { label: 'Shop', page: 'shop', href: '#shop' },
    { label: 'Deals', page: 'deals', href: '#deals' },
    { label: 'Custom Event', page: 'custom-event', href: '#custom-event' },
    { label: 'About Us', page: 'about', href: '#about' },
    { label: 'Contact', page: 'contact', href: '#contact' },
  ];

  const featuredOfferings: { label: string; target: PageId }[] = [
    { label: 'Basic · Standard · Premium', target: 'shop' },
    { label: 'Fruit Juices & Flavoured Water', target: 'shop' },
    { label: 'Bulk Water Packages', target: 'deals' },
    { label: 'Shadi Royale Event Bundle', target: 'deals' },
    { label: 'Upload Custom Event Label', target: 'custom-event' },
    { label: 'Feedback & Complaints Desk', target: 'contact' },
  ];

  return (
    <footer className="border-t border-[#D4AF37]/35 bg-gradient-to-br from-[#FFFDF7] via-[#FEF8E8]/85 to-[#FDF2F8]/85">
      <div className="prism-hairline h-[3px] w-full" aria-hidden="true" />
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Logo Image ONLY + Tagline + Icon-Only Social Buttons */}
          <div className="lg:col-span-4">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              aria-label="RoyalSip Beverages Home"
              className="inline-block"
            >
              <img
                src={BRAND.logoUrl}
                alt="RoyalSip Beverages"
                referrerPolicy="no-referrer"
                className="h-12 w-auto object-contain"
              />
            </a>
            <p className="font-display mt-3 text-base font-bold italic text-[#A67C1E]">
              {BRAND.tagline}
            </p>
            <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-slate-600">
              Custom 500ml &amp; 1.5L pure drinking water and chilled fruit juice bottles crafted for
              weddings, marquees, corporates, and restaurants all over Lahore.
            </p>

            {/* Social Media Icons ONLY (No text labels) */}
            <div className="mt-4 flex items-center gap-3">
              <a
                href={BRAND.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RoyalSip Facebook Page"
                title="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1877F2]/30 bg-white text-[#1877F2] shadow-xs transition-all hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RoyalSip Instagram Profile"
                title="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-white text-[#E11D74] shadow-xs transition-all hover:border-[#E11D74] hover:bg-[#E11D74] hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Page Links */}
          <div className="lg:col-span-2">
            <p className="text-xs font-bold tracking-wider text-[#A67C1E] uppercase">Explore</p>
            <ul className="mt-3 space-y-2.5 text-sm font-medium text-slate-600">
              {footerLinks.map((item) => (
                <li key={item.page}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.page);
                    }}
                    className="transition-colors hover:text-[#E11D74]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Offerings */}
          <div className="lg:col-span-3">
            <p className="text-xs font-bold tracking-wider text-[#A67C1E] uppercase">
              Products &amp; Packages
            </p>
            <ul className="mt-3 space-y-2.5 text-sm font-medium text-slate-600">
              {featuredOfferings.map((item) => (
                <li key={item.label}>
                  <a
                    href={`#${item.target}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.target);
                    }}
                    className="transition-colors hover:text-[#E11D74]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Official Contact & Domain Info */}
          <div className="lg:col-span-3">
            <p className="text-xs font-bold tracking-wider text-[#A67C1E] uppercase">
              Contact &amp; Delivery
            </p>
            <div className="mt-3 space-y-3 text-sm text-slate-600">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-bold text-[#E11D74] hover:opacity-80"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                <span className="num-clean">{BRAND.whatsappDisplay}</span>
              </a>

              <a
                href={`mailto:${BRAND.email}`}
                className="flex items-center gap-2 font-semibold text-[#241C24] hover:text-[#A67C1E]"
              >
                <Mail className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                <span>{BRAND.email}</span>
              </a>

              <a
                href={BRAND.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-medium text-slate-600 hover:text-[#A67C1E]"
              >
                <Globe className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                <span>{BRAND.domain}</span>
              </a>

              <div className="flex items-start gap-2 pt-0.5 text-xs leading-relaxed text-slate-500">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                <span>
                  Service Area: All over Lahore (Mon–Sun · 9 AM – 10 PM).
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#D4AF37]/25 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {BRAND.domain} · All rights reserved.
          </p>
          <p>RoyalSip Beverages · {BRAND.tagline} · All over Lahore</p>
        </div>
      </div>
    </footer>
  );
}
