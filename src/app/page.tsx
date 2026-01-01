import Header from "@/components/landing/header/header";
import Hero from "@/components/landing/hero/hero";
import AboutUsSection from "@/components/landing/about-us/about-us";
import FeaturesSection from "@/components/landing/features-section/features-section";
import Footer from "@/components/landing/footer/footer";
import StudyEfficiency from "@/components/landing/study-efficiency/study-efficiency";
import ProgressTracking from "@/components/landing/progress-tracking/progress-tracking";
import PricingSection from "@/components/landing/pricing-section/pricing-section";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="p-6 max-sm:p-3">
          <Hero />
        </div>
        <AboutUsSection />
        <FeaturesSection />
        <StudyEfficiency />
        <ProgressTracking />
        <PricingSection />
      </main>
      <div className="p-6 max-sm:p-3">
        <Footer />
      </div>
    </>
  );
}