'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { restaurants, Restaurant, MenuItem } from '@/components/searchData';
import { useCart } from '@/components/CartContext';
import CartDrawer from '@/components/CartDrawer';
import CheckoutModal from '@/components/CheckoutModal';
import OrderConfirmationModal from '@/components/OrderConfirmationModal';

// Menu categories based on price ranges and item types
function getMenuCategories(menuItems: MenuItem[]) {
  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'popular', name: 'Popular' },
    { id: 'mains', name: 'Mains' },
    { id: 'sides', name: 'Sides' },
  ];
  return categories;
}

// Categorize items (simplified logic)
function categorizeItem(item: MenuItem): string {
  const sidePriceThreshold = 8;
  if (item.price < sidePriceThreshold) {
    return 'sides';
  }
  return 'mains';
}

export default function RestaurantDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const [activeCategory, setActiveCategory] = useState('all');
  const { addItem, totalItems, totalPrice, openCart } = useCart();

  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600 mb-8">Restaurant not found</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const menuCategories = getMenuCategories(restaurant.menuItems);

  const filteredItems = activeCategory === 'all'
    ? restaurant.menuItems
    : activeCategory === 'popular'
    ? restaurant.menuItems.slice(0, 3) // First 3 items as "popular"
    : restaurant.menuItems.filter((item) => categorizeItem(item) === activeCategory);

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: `${restaurant.id}-${item.name}`,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      itemName: item.name,
      price: item.price,
      image: item.image,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32 md:pb-24">
      {/* Header with Back Button */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link
              href="/#restaurants"
              className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium">Back to restaurants</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Banner Image */}
      <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Restaurant Info */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {restaurant.name}
              </h1>
              <p className="text-gray-600 mb-3">{restaurant.cuisine}</p>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-semibold text-green-600">{restaurant.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">{restaurant.deliveryTime}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Min order {restaurant.minOrder}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Category Tabs */}
        <div className="sticky top-16 z-30 bg-gray-50 py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {menuCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="mt-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {activeCategory === 'all' ? 'Full Menu' : menuCategories.find(c => c.id === activeCategory)?.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex">
                  <div className="w-28 h-28 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        Delicious {item.name.toLowerCase()} from {restaurant.name}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-orange-500 font-bold">
                        ${item.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Cart Preview */}
      {totalItems > 0 && (
        <div className="fixed bottom-20 md:bottom-6 left-0 right-0 z-50 px-4">
          <div className="max-w-lg mx-auto">
            <button
              onClick={openCart}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-2xl shadow-lg p-4 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                  <span className="font-bold">{totalItems}</span>
                </div>
                <span className="font-semibold">View Cart</span>
              </div>
              <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
    </div>
  );
}
