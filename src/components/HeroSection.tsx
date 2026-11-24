import { MouseEvent, TouchEvent, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Gift } from 'lucide-react';
import { BRAND, HERO_SLIDES, PageId } from '../data/royalsipData';

interface HeroSectionProps {
  onJumpToSample: () => void;
  onNavigate: (page: PageId) => void;
}

export function HeroSection({ onJumpToSample, onNavigate }: HeroSectionProps) {
  const [slideIdx, setSlideIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const touchStartX = useRef<number | null>(null);

  const total = HERO_SLIDES.length;

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % total);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [paused, total]);

  const prevSlide = () => setSlideIdx((prev) => (prev - 1 + total) % total);
  const nextSlide = () => setSlideIdx((prev) => (prev + 1) % total);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -y * 7, ry: x * 9 });
  };

  const resetTilt = () => setTilt({ rx: 0, ry: 0 });

  const handleTouchStart = (e: TouchEvent<HTMLElement>) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLElement>) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta > 0) prevSlide();
      else nextSlide();
    }
    touchStartX.current = null;
  };

  const active = HERO_SLIDES[slideIdx];

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="section-grad-hero relative overflow-hidden pt-8 pb-10 sm:pt-12 sm:pb-14"
    >
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Banner Copy + Official Tagline + Compact 2 Buttons */}
          <div className="lg:col-span-7">
            <p className="font-display mb-2 text-sm font-bold italic tracking-wide text-[#A67C1E] sm:text-base">
              {BRAND.tagline}
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="font-display text-balance text-4xl font-bold leading-[1.08] tracking-tight text-[#241C24] sm:text-5xl lg:text-[62px]">
                  {active.headlineStart}{' '}
                  <span className="rainbow-heading italic">{active.headlineHighlight}</span>
                </h1>

                <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
                  {active.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Compact 2 Buttons + Banner Prev/Next Arrows */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate(active.primaryTarget)}
                className="royal-btn inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold shadow-sm active:scale-95 sm:text-sm whitespace-nowrap"
              >
                <span>{active.primaryLabel}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={onJumpToSample}
                className="rainbow-btn inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold shadow-sm active:scale-95 sm:text-sm whitespace-nowrap"
              >
                <Gift className="h-3.5 w-3.5" />
                <span>Book Free Sample</span>
              </button>

              {/* Inline Banner Arrows */}
              <div className="flex items-center gap-2 sm:ml-2">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous hero banner"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-white/90 text-[#241C24] shadow-sm transition-all hover:bg-[#D4AF37] hover:text-[#241C24] active:scale-95"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next hero banner"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-white/90 text-[#241C24] shadow-sm transition-all hover:bg-[#D4AF37] hover:text-[#241C24] active:scale-95"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Banner Progress Dots */}
            <div className="mt-5 flex items-center gap-2">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSlideIdx(idx)}
                  aria-label={`Show banner ${idx + 1}: ${s.headlineStart}`}
                  className={`h-2 rounded-full transition-all ${
                    slideIdx === idx
                      ? 'w-8 bg-gradient-to-r from-[#D4AF37] via-[#E11D74] to-[#F59E0B]'
                      : 'w-2 bg-[#D4AF37]/35 hover:bg-[#D4AF37]/65'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Compact 3D-Tilt Banner Image */}
          <div className="perspective-1200 lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onMouseMove={handleMouseMove}
                onMouseLeave={resetTilt}
                style={{
                  transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                  transition: 'transform 0.2s ease-out',
                }}
                className="rainbow-hover-card mx-auto max-w-[400px] rounded-2xl border border-[#D4AF37]/45 bg-white/95 p-2.5 shadow-[0_22px_50px_-16px_rgba(180,123,20,0.22)] backdrop-blur-sm"
              >
                <div className="overflow-hidden rounded-xl bg-[#FFFDF7]">
                  <img
                    src={active.image}
                    alt={active.imageAlt}
                    referrerPolicy="no-referrer"
                    className="aspect-square w-full object-cover"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
