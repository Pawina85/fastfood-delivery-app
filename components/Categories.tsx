'use client';

import { useState } from 'react';

const categories = [
  { id: 'all', name: 'All', icon: '🍽️' },
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'burger', name: 'Burgers', icon: '🍔' },
  { id: 'sushi', name: 'Sushi', icon: '🍣' },
  { id: 'dessert', name: 'Desserts', icon: '🍰' },
  { id: 'drinks', name: 'Drinks', icon: '🥤' },
];

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <section className="py-12 bg-white" id="categories">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
          What are you craving?
        </h2>
        
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-orange-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-xl">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
