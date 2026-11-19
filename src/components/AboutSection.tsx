import { ArrowRight } from 'lucide-react';
import { BOTTLE_PHOTOS, PageId, PROCESS_STEPS } from '../data/royalsipData';

interface AboutSectionProps {
  onNavigate?: (page: PageId) => void;
}

export function AboutSection({ onNavigate }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="section-grad-gold border-t border-[#0B193D]/10 py-14 sm:py-16"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rainbow-hover-card overflow-hidden rounded-2xl border border-[#D4AF37]/35 bg-white/90 p-2.5 shadow-sm">
              <img
                src={BOTTLE_PHOTOS.shadiLuxury}
                alt="Custom-labeled RoyalSip wedding bottles"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="aspect-[4/3] w-full rounded-xl object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <h1 className="font-display text-4xl font-bold tracking-tight text-[#0B193D] sm:text-5xl">
              Your bottle,{' '}
              <span className="rainbow-heading italic">your identity.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              RoyalSip crafts custom-labeled mineral water and fruit juice bottles in Lahore for
              weddings, corporate events, restaurants, and private celebrations.
            </p>

            {/* 3-Step Workflow */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {PROCESS_STEPS.map((item, idx) => {
                const colors = ['#B45309', '#EC4899', '#0284C7'];
                return (
                  <div
                    key={item.step}
                    className="rainbow-hover-card rounded-xl border border-[#0B193D]/12 bg-white/95 p-5"
                  >
                    <span
                      className="num-clean text-sm font-extrabold"
                      style={{ color: colors[idx % colors.length] }}
                    >
                      {item.step}.
                    </span>
                    <h2 className="font-display mt-1.5 text-lg font-bold text-[#0B193D]">
                      {item.title}
                    </h2>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {onNavigate && (
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="royal-btn inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold"
                >
                  <span>Start Your Order</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
