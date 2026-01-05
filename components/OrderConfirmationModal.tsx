'use client';

import { useCart } from './CartContext';
import Button from './Button';

export default function OrderConfirmationModal() {
  const { isConfirmationOpen, closeConfirmation, currentOrder } = useCart();

  if (!isConfirmationOpen || !currentOrder) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
          {/* Success Animation */}
          <div className="bg-gradient-to-br from-green-400 to-green-500 p-8 text-center">
            <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Order Confirmed!</h2>
            <p className="text-green-100">Your delicious food is on its way</p>
          </div>

          {/* Order Details */}
          <div className="p-6 space-y-4">
            {/* Order ID */}
            <div className="text-center">
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="text-lg font-bold text-gray-900">{currentOrder.id}</p>
            </div>

            {/* Estimated Delivery */}
            <div className="bg-orange-50 rounded-xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estimated Delivery</p>
                <p className="text-xl font-bold text-orange-500">{currentOrder.estimatedDelivery}</p>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="text-sm text-gray-500">Delivering to</p>
                <p className="text-gray-900">{currentOrder.deliveryAddress}</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4">
              <p className="text-sm text-gray-500 mb-2">Order Summary</p>
              <div className="space-y-1">
                {currentOrder.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.image} {item.itemName} x {item.quantity}
                    </span>
                    <span className="text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-3 pt-3 border-t">
                <span className="font-bold text-gray-900">Total Paid</span>
                <span className="font-bold text-orange-500">${currentOrder.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={closeConfirmation}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
