import { useEffect, useRef } from 'react';

export function AmbientLightCursor() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (prefersReduced || !isFinePointer) return;

    const glowEl = glowRef.current;
    if (!glowEl) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currX = targetX;
    let currY = targetY;
    let active = false;
    let rafId = 0;

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!active) {
        active = true;
        glowEl.style.opacity = '1';
      }

      // Feed pointer position into hovered .rainbow-hover-card for local under-light glow
      const target = e.target as HTMLElement | null;
      const card = target?.closest('.rainbow-hover-card') as HTMLElement | null;
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        card.style.setProperty('--my', `${e.clientY - rect.top}px`);
      }
    };

    const onMouseLeave = () => {
      active = false;
      glowEl.style.opacity = '0';
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    const animate = () => {
      currX += (targetX - currX) * 0.16;
      currY += (targetY - currY) * 0.16;
      glowEl.style.transform = `translate3d(${currX - 220}px, ${currY - 220}px, 0)`;
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-10 hidden h-[440px] w-[440px] rounded-full opacity-0 transition-opacity duration-300 lg:block"
      style={{
        background:
          'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.22) 0%, rgba(225, 29, 116, 0.14) 38%, rgba(254, 243, 199, 0.14) 65%, transparent 76%)',
        filter: 'blur(26px)',
        willChange: 'transform',
      }}
    />
  );
}
