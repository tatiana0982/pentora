import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Templates from "./components/Templates";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import CardSection from "./components/CardSection";
import ActionCard from "./components/ActionCards";
import Testimonials from "./components/Testimonials";
import SuperCard from "./components/SuperCard";
import HeroSearch from "./components/Hero Search";

export default function Home() {
  return (
    <div className="bg-[#04010E]">
      <Navbar />
      <main>
        <HeroSearch/>
        <Hero />
          <Templates />
          <SuperCard />
          <Testimonials />
          <ActionCard />
          <CardSection />
          <CTA />
          <Footer />
      </main>
    </div>
  );
}