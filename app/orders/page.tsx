'use client';

import { useOrders, Order, OrderStatus } from '@/components/OrdersContext';
import { useCart } from '@/components/CartContext';
import Header from '@/components/Header';
import Link from 'next/link';

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
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}

// Empty state component
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
      <p className="text-gray-500 text-center mb-6 max-w-sm">
        Looks like you haven&apos;t placed any orders yet. Start exploring our restaurants!
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-full transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Browse Restaurants
      </Link>
    </div>
  );
}

// Order card component
function OrderCard({ order }: { order: Order }) {
  const { addItem, openCart } = useCart();
  const isActive = order.status === 'preparing' || order.status === 'on_the_way' || order.status === 'confirmed';

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
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

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={order.restaurantImage}
              alt={order.restaurantName}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{order.restaurantName}</h3>
              <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
            </div>
          </div>
          <StatusBadge status={order.status} />
        </div>
      </div>

      {/* Order Summary */}
      <div className="p-4">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span>{order.items.reduce((sum, item) => sum + item.quantity, 0)} items</span>
          <span className="font-semibold text-gray-900">${order.total.toFixed(2)}</span>
        </div>

        {/* Items Preview */}
        <div className="flex flex-wrap gap-1 mb-4">
          {order.items.slice(0, 3).map((item, idx) => (
            <span key={idx} className="text-sm text-gray-500">
              {item.quantity}x {item.name}{idx < Math.min(order.items.length, 3) - 1 ? ', ' : ''}
            </span>
          ))}
          {order.items.length > 3 && (
            <span className="text-sm text-gray-400">+{order.items.length - 3} more</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {isActive ? (
            <Link
              href={`/orders/${order.id}`}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 px-4 rounded-full text-center transition-colors"
            >
              Track Order
            </Link>
          ) : (
            <>
              <button
                onClick={handleReorder}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 px-4 rounded-full transition-colors"
              >
                Reorder
              </button>
              <Link
                href={`/orders/${order.id}`}
                className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2.5 px-4 rounded-full text-center transition-colors"
              >
                View Details
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const { orders } = useOrders();

  // Separate active and past orders
  const activeOrders = orders.filter(
    (order) => order.status === 'preparing' || order.status === 'on_the_way' || order.status === 'confirmed'
  );
  const pastOrders = orders.filter(
    (order) => order.status === 'delivered' || order.status === 'cancelled'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-20 md:pt-24 pb-24 md:pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Orders</h1>
          </div>

          {orders.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-8">
              {/* Active Orders */}
              {activeOrders.length > 0 && (
                <section>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Orders</h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {activeOrders.map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                </section>
              )}

              {/* Past Orders */}
              {pastOrders.length > 0 && (
                <section>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Past Orders</h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {pastOrders.map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
