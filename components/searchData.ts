export interface MenuItem {
  name: string;
  price: number;
  image: string;
}

export interface Restaurant {
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

export const restaurants: Restaurant[] = [
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

export interface RestaurantSearchResult {
  type: 'restaurant';
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  image: string;
}

export interface DishSearchResult {
  type: 'dish';
  name: string;
  price: number;
  image: string;
  restaurantId: number;
  restaurantName: string;
}

export type SearchResult = RestaurantSearchResult | DishSearchResult;

export function searchAll(query: string): SearchResult[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  for (const restaurant of restaurants) {
    // Search restaurant name and cuisine
    if (
      restaurant.name.toLowerCase().includes(normalizedQuery) ||
      restaurant.cuisine.toLowerCase().includes(normalizedQuery)
    ) {
      results.push({
        type: 'restaurant',
        id: restaurant.id,
        name: restaurant.name,
        cuisine: restaurant.cuisine,
        rating: restaurant.rating,
        image: restaurant.image,
      });
    }

    // Search menu items
    for (const item of restaurant.menuItems) {
      if (item.name.toLowerCase().includes(normalizedQuery)) {
        results.push({
          type: 'dish',
          name: item.name,
          price: item.price,
          image: item.image,
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
        });
      }
    }
  }

  return results;
}

export function getPopularSearches(): string[] {
  return ['Pizza', 'Burgers', 'Sushi', 'Desserts', 'Drinks'];
}
