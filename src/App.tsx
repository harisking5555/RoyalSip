/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { AmbientLightCursor } from './components/AmbientLightCursor';
import { Bottle3DSlider } from './components/Bottle3DSlider';
import { FaqSection, Footer } from './components/FaqAndFooter';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { HeroSection } from './components/HeroSection';
import { HighlightsSlider } from './components/HighlightsSlider';
import { Navbar } from './components/Navbar';
import { OrderAndSampleForm, OrderPrefill } from './components/OrderAndSampleForm';
import { ProcessAndPackages } from './components/ProcessAndPackages';
import { SolutionsSection } from './components/SolutionsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import {
  BOTTLE_SLIDES,
  BottleSlideEdition,
  CRAFT_SLIDES,
  PackageTierId,
  PageId,
  SolutionPack,
} from './data/royalsipData';

const VALID_PAGES: PageId[] = ['home', 'about', 'solutions', 'packages', 'contact'];

function getPageFromHash(): PageId {
  const raw = window.location.hash.replace(/^#\/?/, '').toLowerCase() as PageId;
  return VALID_PAGES.includes(raw) ? raw : 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() => getPageFromHash());
  const [scrollProgress, setScrollProgress] = useState(0);

  const [orderPrefill, setOrderPrefill] = useState<OrderPrefill>({
    mode: 'quote',
    packageTier: 'premium',
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
      const pct = total > 0 ? Math.min(100, Math.max(0, (window.scrollY / total) * 100)) : 0;
      setScrollProgress(pct);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [currentPage]);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '#home' : `#${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSlideForOrder = (slide: BottleSlideEdition) => {
    setOrderPrefill((prev) => ({
      ...prev,
      mode: 'quote',
      drinkId: slide.drinkId,
      labelNotes: `${slide.title} (${slide.volume}) — "${slide.labelTitle}"`,
    }));
    navigateTo('contact');
  };

  const handleSelectPackForQuote = (pack: SolutionPack) => {
    const isSample = pack.id === 'try-royalsip-free';
    const occMap: Record<string, string> = {
      'shadi-royale': 'Shadi / Wedding Marquee',
      'planner-partner': 'Event Planner Partner',
      'corporate-brand': 'Corporate Conference / Office',
      'restaurant-table': 'Restaurant / Café Monthly Plan',
      'party-bottles': 'Birthday / Mehndi / Dholki Party',
      'pure-water-delivered': 'Home & Office Delivery',
      'event-drinks-combo': 'Event Drinks Combo (Water + Juice)',
      'try-royalsip-free': 'Restaurant / Café Monthly Plan',
    };
    setOrderPrefill({
      mode: isSample ? 'sample' : 'quote',
      packageTier: 'premium',
      drinkId: pack.defaultDrink,
      quantity: pack.id === 'party-bottles' ? 50 : 500,
      occasion: occMap[pack.id] || 'Shadi / Wedding Marquee',
      labelNotes: `${pack.title} — ${pack.defaultLabelTitle} (${pack.defaultLabelSub})`,
    });
    navigateTo('contact');
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
      labelNotes: prev.labelNotes || `${tierId.toUpperCase()} package for ${quantity} bottles`,
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

  return (
    <div className="relative min-h-screen bg-[#FFFDF7] text-[#14224A]">
      {/* Rainbow Scroll Progress Bar */}
      <div
        className="prism-hairline fixed left-0 top-0 z-[60] h-[3px] transition-[width] duration-75"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Soft Ambient Under-Light Cursor */}
      <AmbientLightCursor />

      <div className="relative z-20 flex min-h-screen flex-col">
        <Navbar currentPage={currentPage} onNavigate={navigateTo} />

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
              <SolutionsSection onSelectPackForQuote={handleSelectPackForQuote} />
              <TestimonialsSection />
            </>
          )}

          {currentPage === 'about' && (
            <>
              <AboutSection onNavigate={navigateTo} />
              <Bottle3DSlider
                slides={CRAFT_SLIDES}
                headingPrefix="Slide through"
                headingHighlight="how we craft it"
                sectionClassName="section-grad-prism"
                onSelectSlideForOrder={handleSelectSlideForOrder}
              />
            </>
          )}

          {currentPage === 'solutions' && (
            <>
              <SolutionsSection onSelectPackForQuote={handleSelectPackForQuote} />
              <Bottle3DSlider
                slides={BOTTLE_SLIDES}
                headingPrefix="Slide through"
                headingHighlight="our signature bottles"
                sectionClassName="section-grad-prism"
                onSelectSlideForOrder={handleSelectSlideForOrder}
              />
            </>
          )}

          {currentPage === 'packages' && (
            <>
              <ProcessAndPackages onSelectTierForOrder={handleSelectTierForOrder} />
              <Bottle3DSlider
                slides={CRAFT_SLIDES}
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

      {/* Fixed Colorful Mobile-Responsive WhatsApp Button */}
      <FloatingWhatsAppButton />
    </div>
  );
}
