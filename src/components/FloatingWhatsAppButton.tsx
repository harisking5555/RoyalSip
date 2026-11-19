import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../data/royalsipData';

export function FloatingWhatsAppButton() {
  const whatsappUrl = buildWhatsAppUrl(
    'Assalam-o-Alaikum RoyalSip! I would like to inquire about custom water/juice bottles.'
  );

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on WhatsApp"
      className="rainbow-btn fixed right-4 bottom-4 z-40 inline-flex h-11 items-center justify-center gap-2 rounded-full px-3.5 text-xs font-bold shadow-[0_12px_28px_-6px_rgba(236,72,153,0.5)] transition-transform hover:scale-105 active:scale-95 sm:right-6 sm:bottom-6 sm:h-11 sm:px-4"
    >
      <MessageCircle className="h-4 w-4 shrink-0" />
      <span className="hidden sm:inline whitespace-nowrap">WhatsApp</span>
    </a>
  );
}
