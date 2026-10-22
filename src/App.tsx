import { useEffect, useState } from "react";
import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import ConfirmPage from "./pages/ConfirmPage";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import ScrollStory from "./components/ScrollStory";
import PromptStudio from "./components/PromptStudio";
import Registration from "./components/Registration";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import {
  Curriculum,
  FAQ,
  FinalCTA,
  Method,
  Outcomes,
  Pricing,
  SocialProof,
  Testimonials,
  UpcomingCourses,
} from "./components/Sections";

function useHashRoute() {
  const read = () => (typeof window !== "undefined" && window.location.hash.replace(/^#\/?/, "").startsWith("confirmar") ? "confirmar" : "home");
  const [route, setRoute] = useState<"home" | "confirmar">(read);
  useEffect(() => {
    const onHash = () => setRoute(read());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

export default function App() {
  const route = useHashRoute();
  if (route === "confirmar") {
    return (
      <MotionConfig reducedMotion="user">
        <ConfirmPage />
      </MotionConfig>
    );
  }
  return <Landing />;
}

function Landing() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  return (
    <MotionConfig reducedMotion="user">
      <a href="#contenido" className="fixed top-3 left-3 z-[120] -translate-y-24 rounded-full bg-[#67e8ff] px-5 py-3 text-sm font-bold text-[#061640] transition-transform focus:translate-y-0">Saltar al contenido</a>
      <motion.div className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-[#0a58e0] to-[#1ed8ff]" style={{ scaleX: progress }} aria-hidden="true" />
      <Navbar />
      <main id="contenido" tabIndex={-1} className="outline-none">
        <Hero />
        <SocialProof />
        <Philosophy />
        <Method />
        <ScrollStory />
        <Curriculum />
        <PromptStudio />
        <Outcomes />
        <Testimonials />
        <Pricing />
        <UpcomingCourses />
        <FAQ />
        <FinalCTA />
        <Registration />
      </main>
      <Footer />
      <WhatsAppButton />
    </MotionConfig>
  );
}
