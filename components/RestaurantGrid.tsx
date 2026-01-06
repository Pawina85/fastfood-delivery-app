'use client';

import Card from './Card';
import Button from './Button';
import { useCart } from './CartContext';
import { useCategory } from './CategoryContext';

interface MenuItem {
  name: string;
  price: number;
  image: string;
}

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  category: string;
  rating: number;
  deliveryTime: string;
  minOrder: string;
  image: string;
  menuItems: MenuItem[];
}

const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Pizza Planet",
    cuisine: "Pizza",
    category: "pizza",
    rating: 4.8,
    deliveryTime: "20-30 min",
    minOrder: "$15",
    image: "/Image/margherita.jpg",
    menuItems: [
      { name: "Margherita", price: 12.99, image: "/Image/margherita.jpg" },
      { name: "Pepperoni", price: 14.99, image: "/Image/pizzaslice.jpg" },
      { name: "BBQ Chicken", price: 15.99, image: "/Image/BBQChicken.jpg" },
      { name: "Veggie Supreme", price: 13.99, image: "/Image/VeggieSupreme.jpg" },
      { name: "Garlic Bread", price: 5.99, image: "/Image/GarlicBread.jpg" },
      { name: "Cheese Sticks", price: 7.99, image: "/Image/CheeseSticks.jpg" },
    ],
  },
  {
    id: 2,
    name: "Burger Barn",
    cuisine: "Burgers",
    category: "burgers",
    rating: 4.6,
    deliveryTime: "15-25 min",
    minOrder: "$12",
    image: "/Image/burger.jpg",
    menuItems: [
      { name: "Classic Burger", price: 10.99, image: "/Image/burger.jpg" },
      { name: "Bacon Cheeseburger", price: 12.99, image: "/Image/cheeseburger.jpg" },
      { name: "Mushroom Swiss", price: 13.99, image: "/Image/ MushroomSwiss.jpg" },
      { name: "Chicken Burger", price: 11.99, image: "/Image/ChickenBurger.jpg" },
      { name: "Fries", price: 4.99, image: "/Image/Fries.jpg" },
      { name: "Onion Rings", price: 5.99, image: "/Image/OnionRings.jpg" },
    ],
  },
  {
    id: 3,
    name: "Sushi Studio",
    cuisine: "Sushi",
    category: "sushi",
    rating: 4.9,
    deliveryTime: "30-40 min",
    minOrder: "$20",
    image: "/Image/salmonsushi.jpg",
    menuItems: [
      { name: "Salmon Nigiri", price: 14.99, image: "/Image/salmonsushi.jpg" },
      { name: "California Roll", price: 12.99, image: "/Image/sushiroll.jpg" },
      { name: "Spicy Tuna Roll", price: 15.99, image: "/Image/SpicyTunaRoll.jpg" },
      { name: "Edamame", price: 5.99, image: "/Image/Edamame.jpg" },
      { name: "Miso Soup", price: 4.99, image: "/Image/MisoSoup.jpg" },
      { name: "Dragon Roll", price: 18.99, image: "/Image/sushiroll.jpg" },
    ],
  },
  {
    id: 4,
    name: "Sweet Spot",
    cuisine: "Desserts",
    category: "desserts",
    rating: 4.7,
    deliveryTime: "20-30 min",
    minOrder: "$10",
    image: "/Image/chocolatecake.jpg",
    menuItems: [
      { name: "Chocolate Cake", price: 7.99, image: "/Image/chocolatecake.jpg" },
      { name: "Cheesecake", price: 8.99, image: "/Image/Chesscake.jpg" },
      { name: "Brownie", price: 5.99, image: "/Image/Brownnie.jpg" },
      { name: "Ice Cream Sundae", price: 6.99, image: "/Image/IceCreamSunda.jpg" },
      { name: "Tiramisu", price: 9.99, image: "/Image/Tiramisu.jpg" },
      { name: "Cookies", price: 4.99, image: "/Image/Cookies.jpg" },
    ],
  },
  {
    id: 5,
    name: "Shake Shack Jr",
    cuisine: "Drinks & Sides",
    category: "drinks",
    rating: 4.5,
    deliveryTime: "10-20 min",
    minOrder: "$8",
    image: "/Image/Milkshake.jpg",
    menuItems: [
      { name: "Milkshake", price: 6.99, image: "/Image/Milkshake.jpg" },
      { name: "Smoothie", price: 7.99, image: "/Image/ Smoothie.jpg" },
      { name: "Iced Coffee", price: 4.99, image: "/Image/IcedCoffee.jpg" },
      { name: "Lemonade", price: 3.99, image: "/Image/Lemonade.jpg" },
      { name: "Soda", price: 2.99, image: "/Image/Soda.jpg" },
      { name: "Fries", price: 4.99, image: "/Image/Fries.jpg" },
    ],
  },
  {
    id: 6,
    name: "Fast Bites",
    cuisine: "Mixed Fast Food",
    category: "fast-food",
    rating: 4.4,
    deliveryTime: "15-25 min",
    minOrder: "$10",
    image: "/Image/HotDog.jpg",
    menuItems: [
      { name: "Hot Dog", price: 5.99, image: "/Image/HotDog.jpg" },
      { name: "Chicken Wrap", price: 8.99, image: "/Image/ChickenWrap.jpg" },
      { name: "Nachos", price: 7.99, image: "/Image/Nachos.jpg" },
      { name: "Wings", price: 10.99, image: "/Image/Wings.jpg" },
      { name: "Mozzarella Sticks", price: 6.99, image: "/Image/MozzarellaSticks.jpg" },
      { name: "Combo Meal", price: 12.99, image: "/Image/ComboMeal.jpg" },
    ],
  },
];

export default function RestaurantGrid() {
  const { addItem, openCart } = useCart();
  const { activeCategory } = useCategory();

  const filteredRestaurants = activeCategory === 'all'
    ? restaurants
    : restaurants.filter(restaurant => restaurant.category === activeCategory);

  const handleOrderNow = (restaurant: Restaurant, item: MenuItem) => {
    addItem({
      id: `${restaurant.id}-${item.name}`,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      itemName: item.name,
      price: item.price,
      image: item.image,
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
          {filteredRestaurants.map((restaurant) => (
            <Card key={restaurant.id} hover>
              <div className="p-6">
                {/* Restaurant Image */}
                <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
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
                    onClick={() => handleOrderNow(restaurant, restaurant.menuItems[0])}
                  >
                    Order Now - ${restaurant.menuItems[0].price.toFixed(2)}
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
