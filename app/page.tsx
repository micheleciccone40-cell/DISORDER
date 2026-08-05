import Intro from "@/components/Intro";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EventsCarousel from "@/components/EventsCarousel";
import About from "@/components/About";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Intro />
      <Header />
      <main>
        <Hero />
        <EventsCarousel />
        <About />
        <Menu />
      </main>
      <Footer />
    </>
  );
}
