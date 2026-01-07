'use client';

import { useOrders, OrderStatus } from '@/components/OrdersContext';
import { useCart } from '@/components/CartContext';
import Header from '@/components/Header';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

// Timeline step component
function TimelineStep({
  status,
  label,
  message,
  timestamp,
  isCompleted,
  isActive,
  isLast,
}: {
  status: OrderStatus;
  label: string;
  message?: string;
  timestamp?: Date;
  isCompleted: boolean;
  isActive: boolean;
  isLast: boolean;
}) {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(new Date(date));
  };

  const getIcon = () => {
    if (isCompleted) {
      return (
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      );
    }
    if (isActive) {
      return (
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
          <div className="w-3 h-3 bg-white rounded-full" />
        </div>
      );
    }
    return (
      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
        <div className="w-3 h-3 bg-gray-400 rounded-full" />
      </div>
    );
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        {getIcon()}
        {!isLast && (
          <div className={`w-0.5 flex-1 my-2 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`} />
        )}
      </div>
      <div className={`pb-6 ${isLast ? 'pb-0' : ''}`}>
        <p className={`font-medium ${isCompleted || isActive ? 'text-gray-900' : 'text-gray-400'}`}>
          {label}
        </p>
        {message && (
          <p className="text-sm text-gray-500 mt-0.5">{message}</p>
        )}
        {timestamp && (
          <p className="text-xs text-gray-400 mt-1">{formatTime(timestamp)}</p>
        )}
      </div>
    </div>
  );
}

// Status badge component
function StatusBadge({ status }: { status: OrderStatus }) {
  const statusConfig: Record<OrderStatus, { bg: string; text: string; label: string }> = {
    confirmed: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Confirmed' },
    preparing: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Preparing' },
    on_the_way: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'On the way' },
    delivered: { bg: 'bg-green-100', text: 'text-green-700', label: 'Delivered' },
    cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: 'Cancelled' },
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getOrderById } = useOrders();
  const { addItem, openCart } = useCart();

  const orderId = params.id as string;
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-20 md:pt-24 pb-24 md:pb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Order not found</h2>
              <p className="text-gray-500 text-center mb-6">
                We couldn&apos;t find the order you&apos;re looking for.
              </p>
              <Link
                href="/orders"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-full transition-colors"
              >
                View All Orders
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(date));
  };

  const handleReorder = () => {
    order.items.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        addItem({
          id: `${order.restaurantId}-${item.name}-${Date.now()}-${i}`,
          restaurantId: order.restaurantId,
          restaurantName: order.restaurantName,
          itemName: item.name,
          price: item.price,
          image: item.image,
        });
      }
    });
    openCart();
  };

  // Define timeline steps
  const timelineSteps: { status: OrderStatus; label: string }[] = [
    { status: 'confirmed', label: 'Order Confirmed' },
    { status: 'preparing', label: 'Preparing' },
    { status: 'on_the_way', label: 'On the Way' },
    { status: 'delivered', label: 'Delivered' },
  ];

  const statusOrder: OrderStatus[] = ['confirmed', 'preparing', 'on_the_way', 'delivered'];
  const currentStatusIndex = statusOrder.indexOf(order.status);

  const getTimelineData = (status: OrderStatus) => {
    const timelineEntry = order.timeline.find((t) => t.status === status);
    return timelineEntry;
  };

  const isActive = order.status === 'preparing' || order.status === 'on_the_way' || order.status === 'confirmed';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-20 md:pt-24 pb-24 md:pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          {/* Page Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Order #{order.id}</h1>
              <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Order Status Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <img
                    src={order.restaurantImage}
                    alt={order.restaurantName}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-900">{order.restaurantName}</h2>
                    {isActive && (
                      <p className="text-sm text-gray-500">Est. delivery: {order.estimatedDelivery}</p>
                    )}
                  </div>
                </div>
                <StatusBadge status={order.status} />
              </div>

              {/* Timeline */}
              {order.status !== 'cancelled' && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Order Timeline</h3>
                  <div className="pl-2">
                    {timelineSteps.map((step, index) => {
                      const timelineData = getTimelineData(step.status);
                      const isCompleted = statusOrder.indexOf(step.status) < currentStatusIndex;
                      const isCurrentStep = step.status === order.status;

                      return (
                        <TimelineStep
                          key={step.status}
                          status={step.status}
                          label={step.label}
                          message={timelineData?.message}
                          timestamp={timelineData?.timestamp}
                          isCompleted={isCompleted || (step.status === 'delivered' && order.status === 'delivered')}
                          isActive={isCurrentStep && order.status !== 'delivered'}
                          isLast={index === timelineSteps.length - 1}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {order.status === 'cancelled' && (
                <div className="mt-6 p-4 bg-red-50 rounded-xl">
                  <p className="text-red-700 font-medium">This order was cancelled</p>
                  {order.timeline.find((t) => t.status === 'cancelled') && (
                    <p className="text-sm text-red-600 mt-1">
                      {order.timeline.find((t) => t.status === 'cancelled')?.message}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Delivery Address</h3>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-gray-600">{order.deliveryAddress}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                        {item.image}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="mt-6 pt-4 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-900">${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className="text-gray-900">${order.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span className="text-gray-900">Total</span>
                  <span className="text-orange-500">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Reorder Button */}
            {!isActive && (
              <button
                onClick={handleReorder}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-full transition-colors"
              >
                Reorder
              </button>
            )}

            {/* Help Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 rounded-full transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Chat Support
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 rounded-full transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Restaurant
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
