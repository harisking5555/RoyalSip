/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { AmbientLightCursor } from './components/AmbientLightCursor';
import { BeverageRangeSection } from './components/BeverageRangeSection';
import { Bottle3DSlider } from './components/Bottle3DSlider';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { CustomEventPage } from './components/CustomEventPage';
import { DealsPage } from './components/DealsPage';
import { FaqSection, Footer } from './components/FaqAndFooter';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { HeroSection } from './components/HeroSection';
import { HighlightsSlider } from './components/HighlightsSlider';
import { Navbar } from './components/Navbar';
import {
  OrderAndSampleForm,
  OrderPrefill,
} from './components/OrderAndSampleForm';
import { ShopPage } from './components/ShopPage';
import { SolutionsSection } from './components/SolutionsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import {
  BOTTLE_SLIDES,
  BottleSlideEdition,
  PackageTierId,
  PageId,
  ShopProduct,
  SolutionPack,
} from './data/royalsipData';

const VALID_PAGES: PageId[] = [
  'home',
  'shop',
  'deals',
  'custom-event',
  'about',
  'contact',
];

function getPageFromHash(): PageId {
  const raw = window.location.hash.replace(/^#\/?/, '').toLowerCase() as PageId;
  return VALID_PAGES.includes(raw) ? raw : 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() => getPageFromHash());
  const [scrollProgress, setScrollProgress] = useState(0);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartNotice, setCartNotice] = useState<string | null>(null);

  const [orderPrefill, setOrderPrefill] = useState<OrderPrefill>({
    mode: 'feedback',
    packageTier: 'standard',
    drinkId: 'water-500',
    quantity: 500,
    occasion: 'Shadi / Wedding Marquee',
    labelNotes: '',
  });

  useEffect(() => {
    const onHashChange = () => {
      setCurrentPage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const pct =
        total > 0
          ? Math.min(100, Math.max(0, (window.scrollY / total) * 100))
          : 0;
      setScrollProgress(pct);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [currentPage]);

  useEffect(() => {
    if (!cartNotice) return;
    const timer = window.setTimeout(() => setCartNotice(null), 2600);
    return () => window.clearTimeout(timer);
  }, [cartNotice]);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '#home' : `#${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: ShopProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { product, qty: 1 }];
    });
    setCartNotice(`Added "${product.name}" to cart`);
  };

  const handleUpdateCartQty = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.product.id === productId ? { ...i, qty: i.qty + delta } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSelectSlideForOrder = (slide: BottleSlideEdition) => {
    if (slide.id === 'slide-juices-combo') {
      navigateTo('shop');
      return;
    }
    navigateTo('custom-event');
  };

  const handleSelectPackForQuote = (pack: SolutionPack) => {
    const occMap: Record<string, string> = {
      'shadi-royale': 'Shadi / Wedding Marquee',
      'planner-partner': 'Event Planner Partner',
      'corporate-brand': 'Corporate Conference / Office',
      'restaurant-table': 'Restaurant / Café Monthly Plan',
      'party-bottles': 'Birthday / Mehndi / Dholki Party',
      'event-drinks-combo': 'Event Drinks Combo (Water + Juice)',
    };
    setOrderPrefill({
      mode: 'quote',
      packageTier: 'standard',
      drinkId: pack.defaultDrink,
      quantity: pack.id === 'party-bottles' ? 50 : 500,
      occasion: occMap[pack.id] || 'Shadi / Wedding Marquee',
      labelNotes: `${pack.title} — ${pack.defaultLabelTitle} (${pack.defaultLabelSub})`,
    });
    navigateTo('custom-event');
  };

  const handleSelectTierForOrder = (
    tierId: PackageTierId,
    quantity: number,
    isPartner: boolean
  ) => {
    setOrderPrefill((prev) => ({
      ...prev,
      mode: 'quote',
      packageTier: tierId,
      quantity,
      occasion: isPartner ? 'Event Planner Partner' : prev.occasion,
      labelNotes: `${tierId.toUpperCase()} package for ${quantity} bottles`,
    }));
    navigateTo('contact');
  };

  const handleJumpToSample = () => {
    setOrderPrefill((prev) => ({
      ...prev,
      mode: 'sample',
      labelNotes: 'Requesting FREE branded sample bottle visit in Lahore.',
    }));
    navigateTo('contact');
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="relative min-h-screen bg-[#FFFDF7] text-[#241C24]">
      {/* Brand Hairline Scroll Progress Bar */}
      <div
        className="prism-hairline fixed left-0 top-0 z-[60] h-[3px] transition-[width] duration-75"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Soft Ambient Under-Light Cursor */}
      <AmbientLightCursor />

      <div className="relative z-20 flex min-h-screen flex-col">
        <Navbar
          currentPage={currentPage}
          cartCount={totalCartCount}
          onNavigate={navigateTo}
          onOpenCart={() => setCartOpen(true)}
        />

        <main className="flex-1">
          {currentPage === 'home' && (
            <>
              <HeroSection
                onJumpToSample={handleJumpToSample}
                onNavigate={navigateTo}
              />
              <HighlightsSlider />
              <Bottle3DSlider
                slides={BOTTLE_SLIDES}
                headingPrefix="Slide through"
                headingHighlight="our signature bottles"
                sectionClassName="section-grad-prism"
                onSelectSlideForOrder={handleSelectSlideForOrder}
              />
              <BeverageRangeSection
                onAddToCart={handleAddToCart}
                onNavigate={navigateTo}
              />
              <SolutionsSection onSelectPackForQuote={handleSelectPackForQuote} />
              <TestimonialsSection />
            </>
          )}

          {currentPage === 'shop' && (
            <ShopPage
              onAddToCart={handleAddToCart}
              onSelectTierForOrder={handleSelectTierForOrder}
              onNavigate={navigateTo}
            />
          )}

          {currentPage === 'deals' && (
            <DealsPage
              onAddToCart={handleAddToCart}
              onNavigate={navigateTo}
            />
          )}

          {currentPage === 'custom-event' && <CustomEventPage />}

          {currentPage === 'about' && (
            <>
              <AboutSection onNavigate={navigateTo} />
              <Bottle3DSlider
                slides={BOTTLE_SLIDES}
                headingPrefix="Slide through"
                headingHighlight="our label finishes"
                sectionClassName="section-grad-prism"
                onSelectSlideForOrder={handleSelectSlideForOrder}
              />
            </>
          )}

          {currentPage === 'contact' && (
            <>
              <OrderAndSampleForm prefill={orderPrefill} />
              <FaqSection />
            </>
          )}
        </main>

        <Footer onNavigate={navigateTo} />
      </div>

      {/* Subtle Add-to-Cart Toast */}
      {cartNotice && (
        <div className="fixed bottom-4 left-4 z-50 flex items-center gap-3 rounded-xl border border-[#D4AF37]/50 bg-white px-4 py-2.5 text-xs font-bold text-[#241C24] shadow-lg sm:bottom-6 sm:left-6">
          <span>{cartNotice}</span>
          <button
            type="button"
            onClick={() => {
              setCartNotice(null);
              setCartOpen(true);
            }}
            className="text-[#E11D74] underline"
          >
            View Cart
          </button>
        </div>
      )}

      {/* E-Commerce Shopping Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Fixed WhatsApp Button */}
      <FloatingWhatsAppButton />
    </div>
  );
}
