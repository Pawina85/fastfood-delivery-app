'use client';

import { useState, useEffect } from 'react';

const promos = [
  { id: 1, text: "Use code FAST20 for 20% off your first order!", icon: "🎉" },
  { id: 2, text: "Free delivery on orders over ฿500", icon: "🔥" },
  { id: 3, text: "Limited time: 30% off all burgers!", icon: "⚡" },
];

const STORAGE_KEY = 'fastfood_promo_dismissed';

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if banner was dismissed
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  // Rotate promos every 5 seconds
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPromoIndex((prev) => (prev + 1) % promos.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  if (!isVisible) return null;

  const currentPromo = promos[currentPromoIndex];

  return (
    <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white py-2 px-4 relative animate-slide-down">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <p
          className={`text-sm md:text-base font-medium text-center pr-8 transition-all duration-300 ${
            isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
        >
          <span className="mr-2">{currentPromo.icon}</span>
          {currentPromo.text}
        </p>
        <button
          onClick={handleDismiss}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Dismiss promotional banner"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {/* Progress dots */}
      <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-1">
        {promos.map((_, index) => (
          <div
            key={index}
            className={`w-1 h-1 rounded-full transition-all ${
              index === currentPromoIndex ? 'bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
