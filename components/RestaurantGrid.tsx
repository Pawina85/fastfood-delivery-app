'use client';

import Link from 'next/link';
import { useCart } from './CartContext';
import { useCategory } from './CategoryContext';
import { restaurants, Restaurant, MenuItem } from './searchData';

export default function RestaurantGrid() {
  const { items, addItem, updateQuantity, totalItems, totalPrice, openCart } = useCart();
  const { activeCategory } = useCategory();

  const filteredRestaurants = activeCategory === 'all'
    ? restaurants
    : restaurants.filter(restaurant => restaurant.category === activeCategory);

  const getItemQuantity = (restaurantId: number, itemName: string) => {
    const cartItem = items.find(item => item.id === `${restaurantId}-${itemName}`);
    return cartItem?.quantity || 0;
  };

  const handleAddItem = (e: React.MouseEvent, restaurant: Restaurant, item: MenuItem) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: `${restaurant.id}-${item.name}`,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      itemName: item.name,
      price: item.price,
      image: item.image,
    });
  };

  const handleRemoveItem = (e: React.MouseEvent, restaurantId: number, itemName: string) => {
    e.preventDefault();
    e.stopPropagation();
    const itemId = `${restaurantId}-${itemName}`;
    const cartItem = items.find(item => item.id === itemId);
    if (cartItem) {
      updateQuantity(itemId, cartItem.quantity - 1);
    }
  };

  return (
    <section className="py-16 bg-gray-50 pb-32" id="restaurants">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Restaurants
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the best restaurants in your area
          </p>
        </div>

        <div className="space-y-12">
          {filteredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Restaurant Header - Clickable link to detail page */}
              <Link href={`/restaurant/${restaurant.id}`} className="block p-6 border-b hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-orange-500 transition-colors">
                        {restaurant.name}
                      </h3>
                      <p className="text-gray-600">{restaurant.cuisine}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex items-center space-x-1 bg-green-100 px-3 py-1 rounded-full">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-semibold text-green-600">{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="text-sm text-gray-500">Min {restaurant.minOrder}</div>
                    <svg className="w-5 h-5 text-gray-400 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>

              {/* Menu Items Grid */}
              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {restaurant.menuItems.map((item) => {
                    const quantity = getItemQuantity(restaurant.id, item.name);
                    return (
                      <div
                        key={item.name}
                        className="group"
                      >
                        <div className="relative aspect-square rounded-lg overflow-hidden mb-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                          />
                          {/* Quantity controls */}
                          <div className="absolute bottom-2 right-2">
                            {quantity === 0 ? (
                              <button
                                onClick={(e) => handleAddItem(e, restaurant, item)}
                                className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-orange-600 transition-colors hover:scale-110"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            ) : (
                              <div className="flex items-center gap-1 bg-white rounded-full shadow-lg p-1">
                                <button
                                  onClick={(e) => handleRemoveItem(e, restaurant.id, item.name)}
                                  className="w-7 h-7 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                  </svg>
                                </button>
                                <span className="w-6 text-center font-semibold text-gray-900 text-sm">{quantity}</span>
                                <button
                                  onClick={(e) => handleAddItem(e, restaurant, item)}
                                  className="w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                  </svg>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        <h4 className="font-medium text-gray-900 text-sm truncate">{item.name}</h4>
                        <p className="text-orange-500 font-semibold text-sm">฿{item.price.toFixed(2)}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Cart Summary Bar */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 left-0 right-0 z-40 px-4">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={openCart}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-2xl shadow-xl p-4 flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                  <span className="font-bold">{totalItems}</span>
                </div>
                <span className="font-semibold">View Cart</span>
              </div>
              <span className="font-bold text-lg">฿{totalPrice.toFixed(2)}</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
