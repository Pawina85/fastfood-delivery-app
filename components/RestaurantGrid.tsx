'use client';

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
      { name: "Dragon Roll", price: 18.99, image: "/Image/dragon.jpg" },
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

        <div className="space-y-12">
          {filteredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Restaurant Header */}
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{restaurant.name}</h3>
                    <p className="text-gray-600">{restaurant.cuisine}</p>
                  </div>
                  <div className="flex items-center gap-4">
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
                  </div>
                </div>
              </div>

              {/* Menu Items Grid */}
              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {restaurant.menuItems.map((item) => (
                    <div
                      key={item.name}
                      className="group cursor-pointer"
                      onClick={() => handleOrderNow(restaurant, item)}
                    >
                      <div className="aspect-square rounded-lg overflow-hidden mb-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                        />
                      </div>
                      <h4 className="font-medium text-gray-900 text-sm truncate">{item.name}</h4>
                      <p className="text-orange-500 font-semibold text-sm">${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
