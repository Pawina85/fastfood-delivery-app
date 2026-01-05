'use client';

import Button from './Button';
import Input from './Input';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-white-50 to-light-100 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Delicious Food
            <span className="block text-orange-500">Delivered to You</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Order from your favorite restaurants and get fresh, hot food delivered right to your doorstep in minutes.
          </p>

          {/* Delivery Promise Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-5 py-2.5 rounded-full mb-10 border border-orange-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="font-medium text-sm">Delivered in 30 minutes or less</span>
          </div>

          {/* Search Box */}
          <div className="bg-white rounded-full shadow-xl p-2 flex flex-col sm:flex-row gap-2 max-w-3xl mx-auto mb-16">
            <div className="flex-1">
              <Input
                placeholder="Enter your delivery address"
                className="border-0 shadow-none"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
              />
            </div>
            <Button variant="primary" size="lg" className="sm:w-auto w-full">
              Find Food
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-500">200+</div>
              <div className="text-sm md:text-base text-gray-600 mt-1">Restaurants</div>
            </div>
            <div className="text-center border-x border-gray-300">
              <div className="text-3xl md:text-4xl font-bold text-orange-500">5000+</div>
              <div className="text-sm md:text-base text-gray-600 mt-1">Dishes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-500">30min</div>
              <div className="text-sm md:text-base text-gray-600 mt-1">Avg Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
