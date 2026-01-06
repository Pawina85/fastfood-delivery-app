'use client';

import Button from './Button';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-white-50 to-light-100 py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Craving Fast Food?
            <span className="block text-orange-500">We Got You Covered</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Burgers, pizza, sushi & more — fresh and hot, delivered to your door in 30 minutes or less.
          </p>

          {/* Delivery Promise Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-5 py-2.5 rounded-full mb-10 border border-orange-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="font-medium text-sm">Delivered in 30 minutes or less</span>
          </div>

          {/* Search Box */}
          <div className="bg-white rounded-2xl shadow-2xl p-3 flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto lg:mx-0 mb-16 border border-gray-100">
            <div className="flex-1 relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Enter your delivery address"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-gray-900 placeholder-gray-500"
              />
            </div>
            <Button variant="primary" size="lg" className="sm:w-auto w-full px-8">
              Find Food
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 max-w-2xl mx-auto lg:mx-0">
            <div className="text-center lg:text-left">
              <div className="text-3xl md:text-4xl font-bold text-orange-500">200+</div>
              <div className="text-sm md:text-base text-gray-600 mt-1">Restaurants</div>
            </div>
            <div className="text-center lg:text-left lg:border-l lg:border-r lg:border-y-0 border-x border-gray-300 lg:px-4">
              <div className="text-3xl md:text-4xl font-bold text-orange-500">5000+</div>
              <div className="text-sm md:text-base text-gray-600 mt-1">Dishes</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-3xl md:text-4xl font-bold text-orange-500">30min</div>
              <div className="text-sm md:text-base text-gray-600 mt-1">Avg Delivery</div>
            </div>
          </div>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative w-full h-[280px] sm:h-[350px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/Image/png1.jpg"
                alt="Delicious food delivery"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                className="object-cover object-center"
                priority
              />
              {/* Image overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
            
            {/* Floating badge on image */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-900">Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
