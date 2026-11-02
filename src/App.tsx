import { MotionConfig } from 'framer-motion';
import Nav from './components/Nav';
import Gallery from './components/Gallery';
import Booking from './components/Booking';
import { About, Faq, Footer, Hero, Pricing, Process } from './components/Sections';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#portfolio" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-neutral-900">
        Skip to portfolio
      </a>
      <Nav />
      <main>
        <Hero />
        <Gallery />
        <About />
        <Process />
        <Pricing />
        <Faq />
        <Booking />
      </main>
      <Footer />
    </MotionConfig>
  );
}
