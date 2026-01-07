'use client';

import { useState } from 'react';
import { useCart } from './CartContext';
import Button from './Button';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    totalItems,
    totalPrice,
    updateQuantity,
    removeItem,
    openCheckout,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setPromoApplied(true);
      setPromoError('');
    } else if (promoCode.trim()) {
      setPromoError('Invalid promo code');
      setPromoApplied(false);
    }
  };

  const discount = promoApplied ? totalPrice * 0.1 : 0;
  const deliveryFee = 2.99;
  const finalTotal = totalPrice - discount + deliveryFee;

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-[70] overflow-y-auto transform transition-transform duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            Your Cart ({totalItems})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-gray-900 mb-1">Your cart is empty</p>
              <p className="text-sm text-gray-500 mb-6 text-center">Looks like you haven&apos;t added any items yet</p>
              <Button
                variant="primary"
                onClick={() => {
                  closeCart();
                  document.getElementById('restaurants')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Browse Restaurants
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 bg-gray-50 rounded-xl p-3">
                  {/* Item Image */}
                  <img
                    src={item.image}
                    alt={item.itemName}
                    className="w-16 h-16 rounded-lg object-cover shadow-sm"
                  />

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{item.itemName}</h3>
                    <p className="text-sm text-gray-500">{item.restaurantName}</p>
                    <p className="text-orange-500 font-bold mt-1">฿{item.price.toFixed(2)}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                      >
                        <span className="text-gray-700 font-bold">-</span>
                      </button>
                      <span className="w-6 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center transition-colors"
                      >
                        <span className="text-white font-bold">+</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Special Instructions */}
              <div className="mt-4">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Add special instructions (optional)
                </label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Any allergies? Want extra napkins? Leave at door? Let us know here..."
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none placeholder:text-gray-500"
                  rows={2}
                />
              </div>
            </div>
          )}
        </div>

        {/* Checkout Section */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-3">
            {/* Estimated Delivery Time */}
            <div className="flex items-center gap-2 bg-orange-50 rounded-lg px-3 py-2">
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-gray-700">Estimated delivery: <span className="font-semibold text-orange-600">20-30 min</span></span>
            </div>

            {/* Promo Code */}
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value);
                  setPromoError('');
                }}
                placeholder="Enter promo code"
                className={`flex-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-gray-500 ${
                  promoError ? 'border-red-300' : promoApplied ? 'border-green-300 bg-green-50' : 'border-gray-200'
                }`}
                disabled={promoApplied}
              />
              <button
                onClick={handleApplyPromo}
                disabled={promoApplied || !promoCode.trim()}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  promoApplied
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50'
                }`}
              >
                {promoApplied ? 'Applied!' : 'Apply'}
              </button>
            </div>
            {promoError && <p className="text-xs text-red-500">{promoError}</p>}
            {promoApplied && <p className="text-xs text-green-600">10% discount applied!</p>}

            {/* Price Breakdown */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">฿{totalPrice.toFixed(2)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-green-600">Discount (10%)</span>
                  <span className="font-medium text-green-600">-฿{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium text-gray-900">฿{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-lg font-bold text-orange-500">฿{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={openCheckout}
            >
              Proceed to Checkout
            </Button>

            {/* Continue Shopping */}
            <button
              onClick={closeCart}
              className="w-full text-center text-sm text-gray-500 hover:text-orange-500 transition-colors py-2"
            >
              ← Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
