import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import RestaurantGrid from "@/components/RestaurantGrid";
import Recommendations from "@/components/Recommendations";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { CategoryProvider } from "@/components/CategoryContext";

export default function Home() {
  return (
    <CategoryProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <Hero />
        <Recommendations />
        <Categories />
        <RestaurantGrid />
        <About />
        <Footer />
      </div>
    </CategoryProvider>
  );
}
