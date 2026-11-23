import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  SolutionCategory,
  SolutionPack,
  SOLUTIONS,
} from '../data/royalsipData';

interface SolutionsSectionProps {
  onSelectPackForQuote: (pack: SolutionPack) => void;
}

const FILTER_TABS: { id: SolutionCategory; label: string }[] = [
  { id: 'all', label: 'All Solutions' },
  { id: 'weddings', label: 'Weddings' },
  { id: 'business', label: 'Business' },
  { id: 'homes-parties', label: 'Parties & Homes' },
  { id: 'combos', label: 'Juice + Water' },
];

export function SolutionsSection({ onSelectPackForQuote }: SolutionsSectionProps) {
  const [filter, setFilter] = useState<SolutionCategory>('all');
  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const visibleSolutions =
    filter === 'all' ? SOLUTIONS : SOLUTIONS.filter((item) => item.category === filter);

  const totalCards = visibleSolutions.length;

  useEffect(() => {
    setActiveCardIdx(0);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [filter]);

  const scrollStep = (dir: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el || el.children.length === 0) return;

    const firstCard = el.children[0] as HTMLElement;
    const stepSize = firstCard.offsetWidth + 24;
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);

    if (dir === 'right') {
      if (el.scrollLeft >= maxScroll - 12) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: stepSize, behavior: 'smooth' });
      }
    } else {
      if (el.scrollLeft <= 12) {
        el.scrollTo({ left: maxScroll, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: -stepSize, behavior: 'smooth' });
      }
    }
  };

  const scrollToCard = (targetIdx: number) => {
    const el = trackRef.current;
    if (!el || totalCards === 0) return;
    const clamped = ((targetIdx % totalCards) + totalCards) % totalCards;
    setActiveCardIdx(clamped);

    const cardEl = el.children[clamped] as HTMLElement | undefined;
    if (cardEl) {
      el.scrollTo({
        left: cardEl.offsetLeft,
        behavior: 'smooth',
      });
    }
  };

  const handleTrackScroll = () => {
    const el = trackRef.current;
    if (!el || el.children.length === 0) return;
    const scrollLeft = el.scrollLeft;
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    if (scrollLeft >= maxScroll - 8 && totalCards > 0) {
      setActiveCardIdx(totalCards - 1);
      return;
    }
    let closest = 0;
    let minDiff = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const diff = Math.abs((child as HTMLElement).offsetLeft - scrollLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closest = i;
      }
    });
    setActiveCardIdx(closest);
  };

  return (
    <section
      id="solutions"
      className="section-grad-royal border-t border-[#D4AF37]/25 py-14 sm:py-16"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Clean Spacious Laptop/Desktop Header Row */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[#241C24] sm:text-5xl">
            Every occasion,{' '}
            <span className="rainbow-heading italic">bottled Royal.</span>
          </h2>

          {totalCards > 1 && (
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => scrollStep('left')}
                aria-label="Previous solution card"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-white text-[#241C24] shadow-sm transition-all hover:bg-[#D4AF37] active:scale-95"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollStep('right')}
                aria-label="Next solution card"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-white text-[#241C24] shadow-sm transition-all hover:bg-[#D4AF37] active:scale-95"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Dedicated Clean Underline Category Bar (Never cramped next to headline) */}
        <div
          className="no-scrollbar mt-7 flex items-center gap-6 overflow-x-auto border-b border-[#D4AF37]/30 sm:gap-9"
          role="tablist"
          aria-label="Filter RoyalSip solutions"
        >
          {FILTER_TABS.map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(tab.id)}
                className={`relative pb-3 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'text-[#241C24]'
                    : 'text-slate-500 hover:text-[#A67C1E]'
                }`}
              >
                {tab.label}
                {active && (
                  <span
                    className="prism-hairline absolute inset-x-0 bottom-0 h-[3px] rounded-full"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Interactive Smooth Slider Track */}
        <div
          ref={trackRef}
          onScroll={handleTrackScroll}
          className="no-scrollbar relative mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
        >
          {visibleSolutions.map((pack) => (
            <article
              key={pack.id}
              className="rainbow-hover-card flex w-[88%] shrink-0 snap-start flex-col justify-between rounded-2xl border border-[#D4AF37]/35 bg-white/95 p-5 shadow-sm backdrop-blur-sm sm:w-[47%] lg:w-[386px]"
            >
              <div
                className={`absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r ${pack.accentGradient}`}
                aria-hidden="true"
              />

              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                  <span className="font-semibold">{pack.segment}</span>
                  <span className="font-bold" style={{ color: pack.accentHex }}>
                    {pack.highlight}
                  </span>
                </div>

                <div className="mt-3.5 overflow-hidden rounded-xl border border-slate-100 bg-[#FFFDF7]">
                  <img
                    src={pack.image}
                    alt={pack.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                  />
                </div>

                <h3 className="font-display mt-4 text-2xl font-bold text-[#241C24]">
                  {pack.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{pack.headline}</p>

                <ul className="mt-3.5 space-y-1.5 border-t border-slate-100 pt-3.5 text-sm text-slate-600">
                  {pack.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45"
                        style={{ backgroundColor: pack.accentHex }}
                        aria-hidden="true"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => onSelectPackForQuote(pack)}
                  className="royal-btn inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold whitespace-nowrap"
                >
                  <span>{pack.ctaText}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Card Dots Indicator */}
        {totalCards > 1 && (
          <div className="mt-4 flex items-center justify-center gap-1.5">
            {visibleSolutions.map((pack, idx) => (
              <button
                key={pack.id}
                type="button"
                onClick={() => scrollToCard(idx)}
                aria-label={`Scroll to ${pack.title}`}
                className={`h-2 rounded-full transition-all ${
                  activeCardIdx === idx
                    ? 'w-7 bg-gradient-to-r from-[#D4AF37] via-[#E11D74] to-[#F59E0B]'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
