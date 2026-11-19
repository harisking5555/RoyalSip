import { useState } from 'react';
import { Menu, MessageCircle, X } from 'lucide-react';
import { BRAND, buildWhatsAppUrl, PageId } from '../data/royalsipData';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: { label: string; page: PageId; href: string }[] = [
    { label: 'Home', page: 'home', href: '#home' },
    { label: 'About Us', page: 'about', href: '#about' },
    { label: 'Solutions', page: 'solutions', href: '#solutions' },
    { label: 'Packages', page: 'packages', href: '#packages' },
    { label: 'Contact', page: 'contact', href: '#contact' },
  ];

  const whatsappUrl = buildWhatsAppUrl(
    'Assalam-o-Alaikum RoyalSip! I would like to inquire about customized water/juice bottles.'
  );

  const handleLinkClick = (page: PageId) => {
    setMobileOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#D4AF37]/30 bg-gradient-to-r from-[#FFFDF6]/95 via-[#FEF9E7]/95 to-[#FDF2F8]/95 backdrop-blur-md">
      <div className="prism-hairline h-[3px] w-full" aria-hidden="true" />
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-8 px-4 py-3 sm:px-6 lg:px-8">
        {/* Zone 1: Logo Image ONLY (No text beside logo) */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          aria-label="RoyalSip Home"
          className="inline-flex items-center shrink-0"
        >
          <img
            src={BRAND.logoUrl}
            alt="RoyalSip"
            referrerPolicy="no-referrer"
            className="h-10 w-auto object-contain sm:h-11"
          />
        </a>

        {/* Zone 2: Single-Line Page Navigation */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary Navigation">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <a
                key={item.page}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.page);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#B45309]'
                    : 'text-[#14224A] hover:text-[#B45309]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="prism-hairline absolute inset-x-0 -bottom-0.5 h-[2.5px] rounded-full"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: WhatsApp Action Button (NO phone number inside button) */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="royal-btn hidden items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold shadow-sm sm:inline-flex whitespace-nowrap shrink-0"
          >
            <MessageCircle className="h-4 w-4 text-[#14224A]" />
            <span>Order on WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#D4AF37]/40 bg-white/85 text-[#14224A] hover:bg-white md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-[#D4AF37]/25 bg-[#FFFDF7]/95 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <a
                  key={item.page}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.page);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-amber-50 text-[#B45309]'
                      : 'text-[#14224A] hover:bg-amber-50/50 hover:text-[#B45309]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="royal-btn mt-2 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold"
            >
              <MessageCircle className="h-4 w-4 text-[#14224A]" />
              <span>Order on WhatsApp</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
