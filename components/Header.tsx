'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Button from './Button';
import SignInModal from './SignInModal';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, isAuthenticated, signOut } = useAuth();

  const handleSignInClick = () => {
    if (isAuthenticated) {
      signOut();
    } else {
      setSignInModalOpen(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">🍔</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">FastFood</span>
              </a>
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

            {/* Cart & Sign In */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated && (
                <span className="text-sm text-gray-700">
                  Hi, <span className="font-medium">{user?.name}</span>
                </span>
              )}
              <button className="relative p-2 text-gray-700 hover:text-orange-500 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <Button variant="primary" size="sm" onClick={handleSignInClick}>
                {isAuthenticated ? 'Sign Out' : 'Sign In'}
              </Button>
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
                {isAuthenticated && (
                  <div className="text-sm text-gray-700 pb-2">
                    Hi, <span className="font-medium">{user?.name}</span>
                  </div>
                )}
                <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">
                  Home
                </a>
                <a href="#restaurants" className="text-gray-700 hover:text-orange-500 font-medium">
                  Restaurants
                </a>
                <a href="#categories" className="text-gray-700 hover:text-orange-500 font-medium">
                  Categories
                </a>
                <a href="#about" className="text-gray-700 hover:text-orange-500 font-medium">
                  About
                </a>
                <div className="flex items-center justify-between pt-4 border-t">
                  <button className="flex items-center space-x-2 text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Cart ({totalItems})</span>
                  </button>
                  <Button variant="primary" size="sm" onClick={handleSignInClick}>
                    {isAuthenticated ? 'Sign Out' : 'Sign In'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      <SignInModal 
        isOpen={signInModalOpen} 
        onClose={() => setSignInModalOpen(false)} 
      />
    </>
  );
}
