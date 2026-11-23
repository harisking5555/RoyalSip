import { useState } from 'react';
import { Menu, MessageCircle, ShoppingBag, X } from 'lucide-react';
import { BRAND, buildWhatsAppUrl, PageId } from '../data/royalsipData';

interface NavbarProps {
  currentPage: PageId;
  cartCount: number;
  onNavigate: (page: PageId) => void;
  onOpenCart: () => void;
}

export function Navbar({ currentPage, cartCount, onNavigate, onOpenCart }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: { label: string; page: PageId; href: string }[] = [
    { label: 'Home', page: 'home', href: '#home' },
    { label: 'Shop', page: 'shop', href: '#shop' },
    { label: 'Deals', page: 'deals', href: '#deals' },
    { label: 'Custom Event', page: 'custom-event', href: '#custom-event' },
    { label: 'About Us', page: 'about', href: '#about' },
    { label: 'Contact', page: 'contact', href: '#contact' },
  ];

  const whatsappUrl = buildWhatsAppUrl(
    'Assalam-o-Alaikum RoyalSip! I would like to inquire about water & juice bottles.'
  );

  const handleLinkClick = (page: PageId) => {
    setMobileOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#D4AF37]/30 bg-gradient-to-r from-[#FFFDF7]/95 via-[#FEF8E8]/95 to-[#FDF2F8]/95 backdrop-blur-md">
      <div className="prism-hairline h-[3px] w-full" aria-hidden="true" />
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6 lg:gap-8 lg:px-8">
        {/* Zone 1: Logo Image ONLY (No text beside logo) */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          aria-label="RoyalSip Beverages Home"
          className="inline-flex items-center shrink-0"
        >
          <img
            src={BRAND.logoUrl}
            alt="RoyalSip Beverages"
            referrerPolicy="no-referrer"
            className="h-9 w-auto object-contain sm:h-11"
          />
        </a>

        {/* Zone 2: Single-Line Page Navigation */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary Navigation">
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
                  isActive ? 'text-[#E11D74]' : 'text-[#241C24] hover:text-[#A67C1E]'
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

        {/* Zone 3: Cart Button + WhatsApp CTA (NO phone number inside button) */}
        <div className="flex items-center gap-2 shrink-0 sm:gap-2.5">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open shopping cart with ${cartCount} items`}
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-[#D4AF37]/45 bg-white/90 px-2.5 text-xs font-bold text-[#241C24] shadow-sm transition-colors hover:border-[#E11D74] hover:text-[#E11D74] sm:h-10 sm:gap-2 sm:px-3 whitespace-nowrap"
          >
            <ShoppingBag className="h-4 w-4 text-[#A67C1E]" />
            <span className="num-clean">Cart ({cartCount})</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="royal-btn hidden items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold shadow-sm sm:inline-flex whitespace-nowrap shrink-0"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Order on WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#D4AF37]/40 bg-white/85 text-[#241C24] hover:bg-white sm:h-10 sm:w-10 lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-[#D4AF37]/25 bg-[#FFFDF7]/95 px-4 py-4 lg:hidden">
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
                      ? 'bg-rose-50 text-[#E11D74]'
                      : 'text-[#241C24] hover:bg-amber-50/50 hover:text-[#A67C1E]'
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
              <MessageCircle className="h-4 w-4" />
              <span>Order on WhatsApp</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
