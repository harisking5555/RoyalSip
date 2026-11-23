import { FormEvent, useState } from 'react';
import {
  CheckCircle2,
  Mail,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import {
  BRAND,
  buildMailtoUrl,
  buildWhatsAppUrl,
  ShopProduct,
} from '../data/royalsipData';

export interface CartItem {
  product: ShopProduct;
  qty: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [cityArea, setCityArea] = useState('Lahore');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    total: number;
    summaryText: string;
  } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const deliveryFee = subtotal >= 10000 || subtotal === 0 ? 0 : 350;
  const grandTotal = subtotal + deliveryFee;

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (customerName.trim().length < 2) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!/^[\d+\-\s()]{8,18}$/.test(phone.trim())) {
      setErrorMsg('Please enter a valid mobile / WhatsApp number.');
      return;
    }
    if (address.trim().length < 6) {
      setErrorMsg('Please enter your complete Lahore delivery address.');
      return;
    }

    const orderId = `RS-${Math.floor(10000 + Math.random() * 90000)}`;
    const lines = items
      .map(
        (i) =>
          `• ${i.product.name} (${i.product.volume}) × ${i.qty} = PKR ${(
            i.product.price * i.qty
          ).toLocaleString()}`
      )
      .join('\n');

    const summaryText =
      `Assalam-o-Alaikum RoyalSip! New Cash on Delivery Order (${orderId})\n` +
      `Customer: ${customerName}\n` +
      `Phone: ${phone}\n` +
      `Email: ${email || 'Not provided'}\n` +
      `Delivery Address: ${address}, ${cityArea}\n` +
      `Payment: Cash on Delivery (COD)\n\nItems:\n${lines}\n\nDelivery: ${
        deliveryFee === 0 ? 'FREE' : `PKR ${deliveryFee}`
      }\nTotal Cash Payable on Delivery: PKR ${grandTotal.toLocaleString()}`;

    setConfirmedOrder({
      orderId,
      total: grandTotal,
      summaryText,
    });
    setStep('confirmed');
    onClearCart();
  };

  const resetAndClose = () => {
    setStep('cart');
    setErrorMsg('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex justify-end bg-black/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="RoyalSip Shopping Cart and Cash on Delivery Checkout"
    >
      <div className="flex h-full w-full max-w-md flex-col bg-[#FFFDF7] text-[#241C24] shadow-2xl">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#D4AF37]/30 bg-gradient-to-r from-[#FFFDF7] via-[#FEF8E8] to-[#FDF2F8] px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-[#A67C1E]" />
            <h2 className="font-display text-xl font-bold">
              {step === 'cart'
                ? 'Your Shopping Cart'
                : step === 'checkout'
                ? 'Cash on Delivery Details'
                : 'Send Order on WhatsApp'}
            </h2>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close cart"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-white text-[#241C24] hover:bg-rose-50 hover:text-[#E11D74]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {step === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                  <ShoppingBag className="h-12 w-12 text-[#D4AF37]" />
                  <p className="font-display mt-3 text-xl font-bold">Your cart is empty</p>
                  <p className="mt-1 max-w-xs text-xs text-slate-500">
                    Add RoyalSip water packs or chilled fruit juice &amp; flavoured water cases from
                    the Shop.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-xl border border-[#D4AF37]/30 bg-amber-50/60 px-3.5 py-2.5 text-xs font-medium text-[#241C24]">
                    {subtotal >= 10000 ? (
                      <span className="font-bold text-emerald-700">
                        Free Lahore Delivery unlocked on your order.
                      </span>
                    ) : (
                      <span>
                        Add{' '}
                        <strong className="num-clean">
                          PKR {(10000 - subtotal).toLocaleString()}
                        </strong>{' '}
                        more for Free Lahore Delivery (otherwise PKR 350).
                      </span>
                    )}
                  </div>

                  {items.map(({ product, qty }) => (
                    <div
                      key={product.id}
                      className="flex gap-3 rounded-xl border border-[#D4AF37]/25 bg-white p-3 shadow-xs"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="h-18 w-18 shrink-0 rounded-lg border border-slate-100 object-cover"
                      />
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-bold text-[#241C24]">{product.name}</p>
                            <p className="text-[11px] text-slate-500">{product.volume}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(product.id)}
                            aria-label={`Remove ${product.name}`}
                            className="text-slate-400 hover:text-rose-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <div className="inline-flex items-center rounded-lg border border-[#D4AF37]/35 bg-[#FFFDF7]">
                            <button
                              type="button"
                              onClick={() => onUpdateQty(product.id, -1)}
                              aria-label="Decrease quantity"
                              className="px-2 py-1 text-[#241C24] hover:text-[#E11D74]"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="num-clean px-2.5 text-xs font-bold">{qty}</span>
                            <button
                              type="button"
                              onClick={() => onUpdateQty(product.id, 1)}
                              aria-label="Increase quantity"
                              className="px-2 py-1 text-[#241C24] hover:text-[#E11D74]"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="num-clean text-sm font-extrabold text-[#241C24]">
                            PKR {(product.price * qty).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {step === 'checkout' && (
            <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div>
                <label htmlFor="co-name" className="mb-1 block text-xs font-semibold text-slate-700">
                  Full Name *
                </label>
                <input
                  id="co-name"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Usman Tariq"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="co-phone" className="mb-1 block text-xs font-semibold text-slate-700">
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="co-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="03XX-XXXXXXX"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="co-email" className="mb-1 block text-xs font-semibold text-slate-700">
                    Email Address
                  </label>
                  <input
                    id="co-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="co-address" className="mb-1 block text-xs font-semibold text-slate-700">
                  Delivery Street Address *
                </label>
                <textarea
                  id="co-address"
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House / Office / Hall, Block, Phase, Landmark"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="co-city" className="mb-1 block text-xs font-semibold text-slate-700">
                  City / Delivery Zone
                </label>
                <input
                  id="co-city"
                  type="text"
                  value={cityArea}
                  onChange={(e) => setCityArea(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              {/* COD Payment Summary Card (Cash on Delivery Only) */}
              <div className="pt-1">
                <p className="mb-2 text-xs font-bold text-[#241C24] uppercase">Payment Method</p>
                <div className="flex w-full items-center gap-3 rounded-xl border border-[#D4AF37] bg-amber-50/70 p-3.5 text-left">
                  <Truck className="h-5 w-5 shrink-0 text-[#A67C1E]" />
                  <div>
                    <p className="text-xs font-bold text-[#241C24]">Cash on Delivery (COD)</p>
                    <p className="text-[11px] text-slate-600">
                      Pay cash to our delivery rider when your bottles arrive. Orders are confirmed
                      directly via WhatsApp.
                    </p>
                  </div>
                </div>
              </div>

              {errorMsg && (
                <p className="rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
                  {errorMsg}
                </p>
              )}
            </form>
          )}

          {step === 'confirmed' && confirmedOrder && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 text-center">
              <CheckCircle2 className="mx-auto h-11 w-11 text-emerald-600" />
              <h3 className="font-display mt-3 text-2xl font-bold text-[#241C24]">
                Order {confirmedOrder.orderId} Ready
              </h3>
              <p className="num-clean mt-1 text-sm font-extrabold text-[#A67C1E]">
                Cash on Delivery Total: PKR {confirmedOrder.total.toLocaleString()}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Tap below to send your complete itemized Cash on Delivery order straight to RoyalSip
                on WhatsApp for dispatch confirmation.
              </p>

              <div className="mt-5 flex flex-col gap-2.5">
                <a
                  href={buildWhatsAppUrl(confirmedOrder.summaryText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rainbow-btn inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Send Order on WhatsApp</span>
                </a>
                <a
                  href={buildMailtoUrl(
                    `New RoyalSip COD Order ${confirmedOrder.orderId}`,
                    confirmedOrder.summaryText
                  )}
                  className="royal-btn inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email Copy to {BRAND.email}</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {step !== 'confirmed' && items.length > 0 && (
          <div className="border-t border-[#D4AF37]/30 bg-white p-5">
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="num-clean font-bold text-[#241C24]">
                  PKR {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Lahore Delivery</span>
                <span className="num-clean font-bold text-[#241C24]">
                  {deliveryFee === 0 ? 'FREE' : `PKR ${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-2 text-sm font-extrabold text-[#241C24]">
                <span>Total (COD)</span>
                <span className="num-clean">PKR {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {step === 'cart' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="rainbow-btn mt-4 w-full rounded-xl px-4 py-3 text-sm font-bold"
              >
                Proceed to Cash on Delivery
              </button>
            ) : (
              <div className="mt-4 flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs font-bold text-[#241C24]"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="rainbow-btn flex-1 rounded-xl px-4 py-3 text-sm font-bold"
                >
                  Confirm COD Order
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
