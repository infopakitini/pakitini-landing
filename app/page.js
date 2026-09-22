import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProblemSection from "@/components/ProblemSection";
import HowItWorks from "@/components/HowItWorks";
import EverydaySection from "@/components/EverydaySection";
import WhySection from "@/components/WhySection";
import DimensionsSection from "@/components/DimensionsSection";
import KitchenGallery from "@/components/KitchenGallery";
import Guarantee from "@/components/Guarantee";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import StickyBar from "@/components/StickyBar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Marquee />
      <ProblemSection />
      <HowItWorks />
      <EverydaySection />
      <WhySection />
      <DimensionsSection />
      <KitchenGallery />
      <Guarantee />
      <Reviews />
      <FAQ />
      <Footer />
      <StickyBar />
      <FloatingWhatsApp />
    </>
  );
}
