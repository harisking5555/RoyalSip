import { MouseEvent, TouchEvent, useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import {
  BOTTLE_SLIDES,
  BottleSlideEdition,
  buildWhatsAppUrl,
} from '../data/royalsipData';

interface Bottle3DSliderProps {
  slides?: BottleSlideEdition[];
  headingPrefix?: string;
  headingHighlight?: string;
  sectionClassName?: string;
  onSelectSlideForOrder: (slide: BottleSlideEdition) => void;
}

export function Bottle3DSlider({
  slides = BOTTLE_SLIDES,
  headingPrefix = 'Slide through',
  headingHighlight = 'our signature bottles',
  sectionClassName = 'section-grad-prism',
  onSelectSlideForOrder,
}: Bottle3DSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = slides.length;

  useEffect(() => {
    setActiveIndex(0);
  }, [total]);

  useEffect(() => {
    if (paused || total <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [paused, total]);

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % total);

  const handleCardMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -y * 8, ry: x * 10 });
  };

  const resetCardTilt = () => setTilt({ rx: 0, ry: 0 });

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta > 0) goPrev();
      else goNext();
    }
    touchStartX.current = null;
  };

  const activeSlide = slides[activeIndex] ?? slides[0];
  const slideWhatsapp = buildWhatsAppUrl(
    `Assalam-o-Alaikum RoyalSip! I would like to inquire about "${activeSlide.title}" (${activeSlide.volume}).`
  );

  return (
    <section
      id="bottle-slider"
      className={`${sectionClassName} relative overflow-hidden border-t border-[#0B193D]/10 py-14 sm:py-16`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[#0B193D] sm:text-5xl">
            {headingPrefix}{' '}
            <span className="rainbow-heading italic">{headingHighlight}</span>
          </h2>

          {/* Always-Accessible Arrow Controls */}
          <div className="relative z-30 flex items-center gap-2.5 self-start sm:self-auto">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous slide"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/55 bg-white text-[#14224A] shadow-sm transition-all hover:bg-[#D4AF37] active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next slide"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/55 bg-white text-[#14224A] shadow-sm transition-all hover:bg-[#D4AF37] active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* 3D Perspective Coverflow Stage (Responsive mobile height + swipe) */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="perspective-1200 relative mt-8 h-[520px] touch-pan-y sm:mt-10 sm:h-[420px] md:h-[430px]"
        >
          <div className="relative flex h-full items-center justify-center">
            {slides.map((slide, index) => {
              let offset = index - activeIndex;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              const isCenter = offset === 0;
              const absOffset = Math.abs(offset);
              const visible = absOffset <= 1;

              const translateX = offset * 60;
              const translateZ = isCenter ? 55 : -115;
              const rotateY = isCenter ? tilt.ry : offset * -20;
              const rotateX = isCenter ? tilt.rx : 0;
              const scale = isCenter ? 1 : 0.84;

              return (
                <div
                  key={slide.id}
                  onClick={() => !isCenter && setActiveIndex(index)}
                  onMouseMove={isCenter ? handleCardMove : undefined}
                  onMouseLeave={isCenter ? resetCardTilt : undefined}
                  style={{
                    transform: `translate3d(${translateX}%, 0, ${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity: visible ? (isCenter ? 1 : 0.52) : 0,
                    zIndex: isCenter ? 20 : 10 - absOffset,
                    pointerEvents: visible ? 'auto' : 'none',
                    transition: isCenter
                      ? 'transform 0.25s ease-out, opacity 0.35s ease'
                      : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease',
                  }}
                  className={`absolute w-full max-w-[380px] rounded-2xl border border-[#D4AF37]/40 bg-white/95 p-4 shadow-[0_26px_60px_-20px_rgba(180,123,20,0.2)] backdrop-blur-sm sm:w-[90%] sm:max-w-[780px] sm:p-6 ${
                    isCenter ? 'rainbow-hover-card' : 'hidden cursor-pointer sm:block'
                  }`}
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r ${slide.accentGradient}`}
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 items-center gap-5 sm:grid-cols-12 sm:gap-6">
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white sm:col-span-6">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        referrerPolicy="no-referrer"
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col justify-between sm:col-span-6">
                      <div>
                        <p className="text-xs font-bold tracking-wide text-[#B45309] uppercase">
                          {slide.tag}
                        </p>
                        <h3 className="font-display mt-1.5 text-2xl font-bold text-[#14224A] sm:text-3xl">
                          {slide.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                          {slide.subtitle}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-2.5 text-xs font-semibold text-slate-700">
                          <span>{slide.volume}</span>
                          <span aria-hidden="true">·</span>
                          <span className="num-clean font-bold text-[#14224A]">
                            {slide.priceRange}
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center gap-2.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectSlideForOrder(slide);
                          }}
                          className="royal-btn inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold whitespace-nowrap"
                        >
                          <span>Order This Edition</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>

                        <a
                          href={slideWhatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-[#D4AF37]/40 bg-white px-3.5 py-2.5 text-xs font-bold text-[#14224A] transition-colors hover:border-[#D4AF37] hover:bg-amber-50/40 whitespace-nowrap"
                        >
                          <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
                          <span>Order on WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Slide Progress Dots */}
        <div className="relative z-30 mt-5 flex items-center justify-center gap-2">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`View slide ${idx + 1}: ${s.title}`}
              className={`h-2.5 rounded-full transition-all ${
                activeIndex === idx
                  ? 'w-8 bg-gradient-to-r from-[#D4AF37] via-[#EC4899] to-[#0EA5E9]'
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
