'use client';

import { useState, useEffect, useMemo } from 'react';
import { SignInButton, SignUpButton, UserButton, useUser } from './useClerkSafe';
import Button from './Button';
import { useCart } from './CartContext';
import { useUserProfile } from './UserContext';
import { useDelivery } from './DeliveryContext';
import CartDrawer from './CartDrawer';
import CheckoutModal from './CheckoutModal';
import OrderConfirmationModal from './OrderConfirmationModal';
import UserProfileModal from './UserProfileModal';
import { searchAll, getPopularSearches, SearchResult } from './searchData';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const { totalItems, openCart, addItem } = useCart();
  const { isSignedIn, isLoaded } = useUser();
  const { openProfileModal } = useUserProfile();
  const { deliveryAddress } = useDelivery();

  // Debounce search query for desktop modal
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Immediate search results (for mobile - no debounce)
  const immediateResults = useMemo(() => {
    const results = searchAll(searchQuery);
    console.log('Query:', searchQuery, 'Results:', results);
    return results;
  }, [searchQuery]);

  // Debounced search results (for desktop modal)
  const debouncedResults = useMemo(() => {
    return searchAll(debouncedQuery);
  }, [debouncedQuery]);

  // Group immediate results by type (for mobile)
  const mobileRestaurantResults = immediateResults.filter((r): r is Extract<SearchResult, { type: 'restaurant' }> => r.type === 'restaurant');
  const mobileDishResults = immediateResults.filter((r): r is Extract<SearchResult, { type: 'dish' }> => r.type === 'dish');

  // Group debounced results by type (for desktop)
  const restaurantResults = debouncedResults.filter((r): r is Extract<SearchResult, { type: 'restaurant' }> => r.type === 'restaurant');
  const dishResults = debouncedResults.filter((r): r is Extract<SearchResult, { type: 'dish' }> => r.type === 'dish');

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'dish') {
      addItem({
        id: `${result.restaurantId}-${result.name}`,
        restaurantId: result.restaurantId,
        restaurantName: result.restaurantName,
        itemName: result.name,
        price: result.price,
        image: result.image,
      });
      openCart();
    }
    setSearchOpen(false);
    setSearchQuery('');
    setMobileMenuOpen(false);
  };

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
   <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Delivery Address */}
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">🍔</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">FastFood</span>
            </a>
            {/* Delivery Address Badge */}
            {deliveryAddress && (
              <div className="hidden md:flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full border border-orange-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-medium max-w-[150px] truncate">{deliveryAddress}</span>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
              Home
            </a>
            <a href="#restaurants" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
              Restaurants
            </a>
            <a href="#categories" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
              Categories
            </a>
            <a href="#about" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
              About
            </a>
          </div>

          {/* Cart & Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-gray-700 hover:text-orange-500 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2 text-gray-700 hover:text-orange-500 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Auth Buttons */}
            {!isLoaded ? (
              <div className="w-20 h-8 bg-gray-200 rounded-full animate-pulse" />
            ) : isSignedIn ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={openProfileModal}
                  className="text-gray-700 hover:text-orange-500 font-medium transition-colors text-sm"
                >
                  My Account
                </button>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: 'w-9 h-9',
                    },
                  }}
                />
              </div>
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="secondary" size="sm">Login</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button variant="primary" size="sm">Sign Up</Button>
                </SignUpButton>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search Bar */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search restaurants, dishes..."
                  value={searchQuery}
                  onChange={(e) => {
                    const val = e.target.value;
                    console.log('Mobile search typing:', val);
                    if (val === 'test') alert('Search is working!');
                    setSearchQuery(val);
                  }}
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-gray-900 placeholder-gray-500 text-sm"
                />
              </div>

              {/* Mobile Search Results */}
              {searchQuery && (
                <div className="bg-white rounded-xl shadow-lg border max-h-64 overflow-y-auto">
                  {immediateResults.length === 0 ? (
                    <div className="p-4 text-center">
                      <p className="text-gray-500">No results for &quot;{searchQuery}&quot;</p>
                      <p className="text-sm text-gray-400 mt-1">Try searching for pizza, burger, or sushi</p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {mobileRestaurantResults.length > 0 && (
                        <div className="p-2">
                          <p className="text-xs font-semibold text-gray-500 px-2 mb-1">Restaurants</p>
                          {mobileRestaurantResults.slice(0, 3).map((result) => (
                            <button
                              key={result.id}
                              onClick={() => handleResultClick(result)}
                              className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg text-left"
                            >
                              <img src={result.image} alt={result.name} className="w-10 h-10 rounded-lg object-cover" />
                              <div>
                                <p className="font-medium text-gray-900 text-sm">{result.name}</p>
                                <p className="text-xs text-gray-500">{result.cuisine} • ⭐ {result.rating}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                      {mobileDishResults.length > 0 && (
                        <div className="p-2">
                          <p className="text-xs font-semibold text-gray-500 px-2 mb-1">Dishes</p>
                          {mobileDishResults.slice(0, 5).map((result, idx) => (
                            <button
                              key={`${result.restaurantId}-${result.name}-${idx}`}
                              onClick={() => handleResultClick(result)}
                              className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg text-left"
                            >
                              <img src={result.image} alt={result.name} className="w-10 h-10 rounded-lg object-cover" />
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 text-sm">{result.name}</p>
                                <p className="text-xs text-gray-500">{result.restaurantName}</p>
                              </div>
                              <span className="text-orange-500 font-semibold text-sm">${result.price.toFixed(2)}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">
                Home
              </a>
              <a href="#restaurants" className="text-gray-700 hover:text-orange-500 font-medium">
                Restaurants
              </a>
              <a href="/orders" className="text-gray-700 hover:text-orange-500 font-medium">
                My Orders
              </a>
              <a href="#about" className="text-gray-700 hover:text-orange-500 font-medium">
                About
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Modals */}
      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <UserProfileModal />

      {/* Mobile Sticky Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {!isLoaded ? (
            <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse" />
          ) : isSignedIn ? (
            <button
              onClick={openProfileModal}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Account
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Login
              </button>
            </SignInButton>
          )}
          <button
            onClick={openCart}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Cart {totalItems > 0 && `(${totalItems})`}
          </button>
        </div>
      </div>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeSearch}
          />
          <div className="relative min-h-screen flex items-start justify-center pt-20 px-4">
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6">
              <div className="flex items-center gap-4">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search restaurants, dishes, cuisines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-lg border-0 focus:ring-0 focus:outline-none placeholder-gray-400 text-gray-900"
                  autoFocus
                />
                <button
                  onClick={closeSearch}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Search Results */}
              {debouncedQuery ? (
                <div className="mt-6 pt-6 border-t max-h-96 overflow-y-auto">
                  {debouncedResults.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 text-lg">No results for &quot;{debouncedQuery}&quot;</p>
                      <p className="text-sm text-gray-400 mt-2">Try searching for pizza, burger, or sushi</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Restaurant Results */}
                      {restaurantResults.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-500 mb-3">Restaurants</h3>
                          <div className="space-y-2">
                            {restaurantResults.map((result) => (
                              <button
                                key={result.id}
                                onClick={() => handleResultClick(result)}
                                className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors text-left"
                              >
                                <img
                                  src={result.image}
                                  alt={result.name}
                                  className="w-14 h-14 rounded-xl object-cover"
                                />
                                <div>
                                  <p className="font-semibold text-gray-900">{result.name}</p>
                                  <p className="text-sm text-gray-500">{result.cuisine} • ⭐ {result.rating}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Dish Results */}
                      {dishResults.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-500 mb-3">Dishes</h3>
                          <div className="space-y-2">
                            {dishResults.map((result, idx) => (
                              <button
                                key={`${result.restaurantId}-${result.name}-${idx}`}
                                onClick={() => handleResultClick(result)}
                                className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors text-left"
                              >
                                <img
                                  src={result.image}
                                  alt={result.name}
                                  className="w-14 h-14 rounded-xl object-cover"
                                />
                                <div className="flex-1">
                                  <p className="font-semibold text-gray-900">{result.name}</p>
                                  <p className="text-sm text-gray-500">from {result.restaurantName}</p>
                                </div>
                                <span className="text-orange-500 font-bold">${result.price.toFixed(2)}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-gray-500 mb-3">Popular searches</p>
                  <div className="flex flex-wrap gap-2">
                    {getPopularSearches().map((item) => (
                      <button
                        key={item}
                        className="px-4 py-2 bg-gray-100 hover:bg-orange-100 hover:text-orange-600 rounded-full text-sm font-medium transition-colors"
                        onClick={() => handlePopularSearch(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
