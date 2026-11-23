import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/royalsipData';

export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const total = TESTIMONIALS.length;

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
        const step = firstCard ? firstCard.offsetWidth + 24 : 380;
        el.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, 5600);
    return () => window.clearInterval(timer);
  }, []);

  const stepTrack = (dir: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el || el.children.length === 0) return;
    const firstCard = el.children[0] as HTMLElement;
    const step = firstCard.offsetWidth + 24;
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

  const scrollToIdx = (idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[idx] as HTMLElement | undefined;
    if (card) {
      el.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
      setActiveIdx(idx);
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
      aria-label="Client Testimonials"
      className="section-grad-prism border-t border-[#D4AF37]/25 py-14 sm:py-16"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[#241C24] sm:text-5xl">
            Trusted across{' '}
            <span className="rainbow-heading italic">Lahore events.</span>
          </h2>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => stepTrack('left')}
              aria-label="Previous testimonial"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-white text-[#241C24] shadow-sm transition-all hover:bg-[#D4AF37] active:scale-95"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => stepTrack('right')}
              aria-label="Next testimonial"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-white text-[#241C24] shadow-sm transition-all hover:bg-[#D4AF37] active:scale-95"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="no-scrollbar relative mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
        >
          {TESTIMONIALS.map((item) => (
            <article
              key={item.id}
              className="rainbow-hover-card relative flex w-[88%] shrink-0 snap-start flex-col justify-between rounded-2xl border border-[#D4AF37]/35 bg-white/95 p-6 shadow-sm sm:w-[48%] lg:w-[400px]"
            >
              <div
                className={`absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r ${item.accentGradient}`}
                aria-hidden="true"
              />

              <div>
                <Quote className="h-6 w-6 text-[#D4AF37]" aria-hidden="true" />
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  “{item.quote}”
                </p>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="font-display text-base font-bold text-[#241C24]">{item.author}</p>
                <p className="mt-0.5 text-xs font-medium text-slate-500">
                  {item.role} · {item.company}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5">
          {TESTIMONIALS.map((t, idx) => (
            <button
              key={t.id}
              type="button"
              onClick={() => scrollToIdx(idx)}
              aria-label={`View testimonial by ${t.author}`}
              className={`h-2 rounded-full transition-all ${
                activeIdx === idx
                  ? 'w-7 bg-gradient-to-r from-[#D4AF37] via-[#E11D74] to-[#F59E0B]'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
