'use client';

import { useState, useEffect } from 'react';
import { useUser } from './useClerkSafe';
import { useCart, Order } from './CartContext';
import { useUserProfile } from './UserContext';
import Button from './Button';
import Input from './Input';

export default function CheckoutModal() {
  const {
    items,
    isCheckoutOpen,
    closeCheckout,
    totalPrice,
    openConfirmation,
    openCart,
  } = useCart();

  const { isSignedIn } = useUser();
  const { profile, getDefaultAddress, getDefaultPaymentMethod, addToOrderHistory } = useUserProfile();

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);

  // Set defaults when modal opens
  useEffect(() => {
    if (isCheckoutOpen && isSignedIn) {
      const defaultAddress = getDefaultAddress();
      const defaultPayment = getDefaultPaymentMethod();

      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id);
        setDeliveryAddress(defaultAddress.address);
      }
      if (defaultPayment) {
        setSelectedPaymentId(defaultPayment.id);
        setPaymentMethod(defaultPayment.type);
      }
    }
  }, [isCheckoutOpen, isSignedIn, getDefaultAddress, getDefaultPaymentMethod]);

  if (!isCheckoutOpen) return null;

  const deliveryFee = 2.99;
  const total = totalPrice + deliveryFee;

  const handleAddressSelect = (addressId: string, address: string) => {
    setSelectedAddressId(addressId);
    setDeliveryAddress(address);
  };

  const handlePaymentSelect = (paymentId: string, type: 'card' | 'cash') => {
    setSelectedPaymentId(paymentId);
    setPaymentMethod(type);
  };

  const handlePlaceOrder = () => {
    if (!deliveryAddress.trim()) {
      alert('Please enter a delivery address');
      return;
    }

    const order: Order = {
      id: `ORD-${Date.now()}`,
      items: [...items],
      totalPrice: total,
      deliveryAddress,
      status: 'confirmed',
      estimatedDelivery: '25-35 min',
      createdAt: new Date(),
    };

    // Add to order history if signed in
    if (isSignedIn && items.length > 0) {
      addToOrderHistory({
        items: [...items],
        total,
        status: 'preparing',
        deliveryAddress,
        restaurantName: items[0].restaurantName,
      });
    }

    openConfirmation(order);
  };

  const handleBackToCart = () => {
    closeCheckout();
    openCart();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
        onClick={closeCheckout}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-[70] p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white rounded-t-2xl">
            <button
              onClick={handleBackToCart}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-xl font-bold text-gray-900">Checkout</h2>
            <button
              onClick={closeCheckout}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-6">
            {/* Delivery Address */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Delivery Address</h3>

              {/* Saved Addresses (for signed-in users) */}
              {isSignedIn && profile.addresses.length > 0 && (
                <div className="space-y-2 mb-3">
                  {profile.addresses.map((addr) => (
                    <label
                      key={addr.id}
                      className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                        selectedAddressId === addr.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddressId === addr.id}
                        onChange={() => handleAddressSelect(addr.id, addr.address)}
                        className="w-4 h-4 mt-1 text-orange-500 focus:ring-orange-500"
                      />
                      <div>
                        <span className="font-medium text-gray-900">{addr.label}</span>
                        {addr.isDefault && (
                          <span className="ml-2 text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">
                            Default
                          </span>
                        )}
                        <p className="text-sm text-gray-600 mt-0.5">{addr.address}</p>
                      </div>
                    </label>
                  ))}
                  <label
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                      selectedAddressId === 'new'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddressId === 'new'}
                      onChange={() => {
                        setSelectedAddressId('new');
                        setDeliveryAddress('');
                      }}
                      className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="font-medium text-gray-900">Use a different address</span>
                  </label>
                </div>
              )}

              {/* Address Input (for new address or guests) */}
              {(!isSignedIn || selectedAddressId === 'new' || profile.addresses.length === 0) && (
                <Input
                  placeholder="Enter your full address"
                  value={selectedAddressId === 'new' ? deliveryAddress : deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                />
              )}
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
              <div className="space-y-2">
                {/* Saved Payment Methods (for signed-in users) */}
                {isSignedIn && profile.paymentMethods.length > 0 ? (
                  profile.paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                        selectedPaymentId === method.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={selectedPaymentId === method.id}
                        onChange={() => handlePaymentSelect(method.id, method.type)}
                        className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                      />
                      {method.type === 'card' ? (
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      )}
                      <div>
                        <span className="font-medium text-gray-900">{method.label}</span>
                        {method.isDefault && (
                          <span className="ml-2 text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">
                            Default
                          </span>
                        )}
                        {method.last4 && (
                          <p className="text-sm text-gray-500">{method.cardBrand} ending in {method.last4}</p>
                        )}
                      </div>
                    </label>
                  ))
                ) : (
                  <>
                    <label className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                      />
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <span className="font-medium text-gray-900">Credit/Debit Card</span>
                    </label>
                    <label className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === 'cash' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="cash"
                        checked={paymentMethod === 'cash'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                      />
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="font-medium text-gray-900">Cash on Delivery</span>
                    </label>
                  </>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.itemName} x {item.quantity}
                    </span>
                    <span className="text-gray-900 font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="text-gray-900">${deliveryFee.toFixed(2)}</span>
                  </div>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-orange-500">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t sticky bottom-0 bg-white rounded-b-2xl">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handlePlaceOrder}
            >
              Place Order - ${total.toFixed(2)}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
