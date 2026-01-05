'use client';

import Card from './Card';
import Button from './Button';
import { useCart } from './CartContext';

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  minOrder: string;
  image: string;
  popularItem: string;
  price: number;
}

const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Pizza Paradise",
    cuisine: "Italian, Pizza",
    rating: 4.8,
    deliveryTime: "20-30 min",
    minOrder: "$15",
    image: "🍕",
    popularItem: "Margherita Pizza",
    price: 14.99,
  },
  {
    id: 2,
    name: "Burger House",
    cuisine: "American, Burgers",
    rating: 4.6,
    deliveryTime: "25-35 min",
    minOrder: "$12",
    image: "🍔",
    popularItem: "Classic Cheeseburger",
    price: 11.99,
  },
  {
    id: 3,
    name: "Sushi Master",
    cuisine: "Japanese, Sushi",
    rating: 4.9,
    deliveryTime: "30-40 min",
    minOrder: "$20",
    image: "🍣",
    popularItem: "Dragon Roll",
    price: 18.99,
  },
  {
    id: 4,
    name: "Taco Fiesta",
    cuisine: "Mexican, Tacos",
    rating: 4.7,
    deliveryTime: "15-25 min",
    minOrder: "$10",
    image: "🌮",
    popularItem: "Carne Asada Tacos",
    price: 9.99,
  },
  {
    id: 5,
    name: "Noodle House",
    cuisine: "Asian, Noodles",
    rating: 4.5,
    deliveryTime: "25-35 min",
    minOrder: "$12",
    image: "🍜",
    popularItem: "Spicy Ramen",
    price: 12.99,
  },
  {
    id: 6,
    name: "Sweet Treats",
    cuisine: "Desserts, Bakery",
    rating: 4.8,
    deliveryTime: "20-30 min",
    minOrder: "$8",
    image: "🍰",
    popularItem: "Chocolate Cake",
    price: 7.99,
  },
];

export default function RestaurantGrid() {
  const { addItem, openCart } = useCart();

  const handleOrderNow = (restaurant: Restaurant) => {
    addItem({
      id: `${restaurant.id}-${restaurant.popularItem}`,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      itemName: restaurant.popularItem,
      price: restaurant.price,
      image: restaurant.image,
    });
    openCart();
  };

  return (
    <section className="py-16 bg-gray-50" id="restaurants">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Restaurants
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the best restaurants in your area
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {restaurants.map((restaurant) => (
            <Card key={restaurant.id} hover>
              <div className="p-6">
                {/* Restaurant Image/Icon */}
                <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-8xl">{restaurant.image}</span>
                </div>

                {/* Restaurant Info */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold text-gray-900">
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-semibold text-green-600">
                        {restaurant.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600">{restaurant.cuisine}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t">
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <span>Min {restaurant.minOrder}</span>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    className="w-full mt-4"
                    onClick={() => handleOrderNow(restaurant)}
                  >
                    Order Now - ${restaurant.price.toFixed(2)}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
