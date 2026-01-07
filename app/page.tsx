import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import RestaurantGrid from "@/components/RestaurantGrid";
import Recommendations from "@/components/Recommendations";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { CategoryProvider } from "@/components/CategoryContext";
import PromoBanner from "@/components/PromoBanner";

export default function Home() {
  return (
    <CategoryProvider>
        <Header />
        <main className="min-h-screen bg-white pt-16 md:pt-20">
        <PromoBanner />
        <Hero />
        <Recommendations />
        <Categories />
        <RestaurantGrid />
        <About />
        <Footer />
      </main>
    </CategoryProvider>
  );
}
