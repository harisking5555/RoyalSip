import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HIGHLIGHT_SLIDES } from '../data/royalsipData';

export function HighlightsSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const total = HIGHLIGHT_SLIDES.length;

  useEffect(() => {
    const timer = window.setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
      if (maxScroll <= 10) return;
      if (el.scrollLeft >= maxScroll - 12) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const firstCard = el.children[0] as HTMLElement | undefined;
        const step = firstCard ? firstCard.offsetWidth + 16 : 260;
        el.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  const stepTrack = (dir: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el || el.children.length === 0) return;
    const firstCard = el.children[0] as HTMLElement;
    const step = firstCard.offsetWidth + 16;
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);

    if (dir === 'right') {
      if (el.scrollLeft >= maxScroll - 12) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: step, behavior: 'smooth' });
      }
    } else {
      if (el.scrollLeft <= 12) {
        el.scrollTo({ left: maxScroll, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: -step, behavior: 'smooth' });
      }
    }
  };

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el || el.children.length === 0) return;
    const scrollLeft = el.scrollLeft;
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    if (scrollLeft >= maxScroll - 8) {
      setActiveIdx(total - 1);
      return;
    }
    let closest = 0;
    let minDiff = Infinity;
    Array.from(el.children).forEach((child, idx) => {
      const diff = Math.abs((child as HTMLElement).offsetLeft - scrollLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closest = idx;
      }
    });
    setActiveIdx(closest);
  };

  return (
    <section
      aria-label="RoyalSip Key Highlights"
      className="border-t border-[#D4AF37]/25 bg-gradient-to-r from-[#FFFDF7] via-[#FEF9E7]/85 to-[#FDF2F8]/75 py-6"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => stepTrack('left')}
            aria-label="Previous highlight"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/45 bg-white text-[#241C24] shadow-sm transition-all hover:bg-[#D4AF37] active:scale-95"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="no-scrollbar relative flex flex-1 snap-x snap-mandatory gap-4 overflow-x-auto py-1"
          >
            {HIGHLIGHT_SLIDES.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setActiveIdx(idx)}
                className="rainbow-hover-card relative w-[78%] shrink-0 snap-start rounded-xl border border-[#D4AF37]/30 bg-white/95 px-5 py-4 shadow-sm sm:w-[46%] lg:w-[270px]"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${item.accentGradient}`}
                  aria-hidden="true"
                />
                <p
                  className="num-clean text-2xl font-extrabold sm:text-[26px]"
                  style={{ color: item.metricColor }}
                >
                  {item.metric}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-600">{item.label}</p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => stepTrack('right')}
            aria-label="Next highlight"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/45 bg-white text-[#241C24] shadow-sm transition-all hover:bg-[#D4AF37] active:scale-95"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-center gap-1.5 sm:hidden">
          {HIGHLIGHT_SLIDES.map((item, idx) => (
            <span
              key={item.id}
              className={`h-1.5 rounded-full transition-all ${
                activeIdx === idx ? 'w-5 bg-[#D4AF37]' : 'w-1.5 bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
