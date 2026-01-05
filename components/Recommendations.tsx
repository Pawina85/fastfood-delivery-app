'use client';

import { useUser } from './useClerkSafe';
import { useUserProfile } from './UserContext';
import { useCart } from './CartContext';
import Card from './Card';
import Button from './Button';

// Restaurant data (same as RestaurantGrid for consistency)
const allRestaurants = [
  { id: 1, name: "Pizza Paradise", cuisine: "Italian, Pizza", rating: 4.8, image: "🍕", popularItem: "Margherita Pizza", price: 14.99 },
  { id: 2, name: "Burger House", cuisine: "American, Burgers", rating: 4.6, image: "🍔", popularItem: "Classic Cheeseburger", price: 11.99 },
  { id: 3, name: "Sushi Master", cuisine: "Japanese, Sushi", rating: 4.9, image: "🍣", popularItem: "Dragon Roll", price: 18.99 },
  { id: 4, name: "Taco Fiesta", cuisine: "Mexican, Tacos", rating: 4.7, image: "🌮", popularItem: "Carne Asada Tacos", price: 9.99 },
  { id: 5, name: "Noodle House", cuisine: "Asian, Noodles", rating: 4.5, image: "🍜", popularItem: "Spicy Ramen", price: 12.99 },
  { id: 6, name: "Sweet Treats", cuisine: "Desserts, Bakery", rating: 4.8, image: "🍰", popularItem: "Chocolate Cake", price: 7.99 },
];

export default function Recommendations() {
  const { isSignedIn } = useUser();
  const { profile } = useUserProfile();
  const { addItem, openCart } = useCart();

  // Don't show recommendations for non-signed-in users
  if (!isSignedIn) return null;

  // Get recommended restaurants based on favorites and order history
  const getRecommendations = () => {
    const orderedRestaurantIds = profile.orderHistory.map((order) => {
      const restaurant = allRestaurants.find((r) => r.name === order.restaurantName);
      return restaurant?.id;
    }).filter(Boolean) as number[];

    // Combine favorites and previously ordered
    const relevantIds = [...new Set([...profile.favoriteRestaurants, ...orderedRestaurantIds])];

    // Get restaurants that match
    const recommended = allRestaurants.filter((r) => relevantIds.includes(r.id));

    // If we have recommendations, return them; otherwise return top-rated
    return recommended.length > 0
      ? recommended.slice(0, 3)
      : allRestaurants.sort((a, b) => b.rating - a.rating).slice(0, 3);
  };

  const recommendations = getRecommendations();

  const handleQuickOrder = (restaurant: typeof allRestaurants[0]) => {
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
    <section className="py-12 bg-gradient-to-br from-orange-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Recommended for You
            </h2>
            <p className="text-gray-600 mt-1">Based on your favorites and order history</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-orange-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-medium">Personalized picks</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((restaurant) => (
            <Card key={restaurant.id} hover>
              <div className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center text-4xl">
                    {restaurant.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900 truncate">{restaurant.name}</h3>
                      {profile.favoriteRestaurants.includes(restaurant.id) && (
                        <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{restaurant.cuisine}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">{restaurant.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Try their popular</p>
                    <p className="font-medium text-gray-900">{restaurant.popularItem}</p>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleQuickOrder(restaurant)}
                  >
                    ${restaurant.price.toFixed(2)}
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
