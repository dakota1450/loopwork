import Nav from './components/Nav';
import Overture from './components/Overture';
import Offer from './components/sections/Offer';
import Process from './components/sections/Process';
import Builds from './components/sections/Builds';
import Pricing from './components/sections/Pricing';
import Faq from './components/sections/Faq';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import ScrollProgress from './components/ScrollProgress';

export default function App() {
  return (
    <div
      className="min-h-screen bg-white tracking-[-0.02em]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <ScrollProgress />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-neutral-900 focus:shadow-lg"
      >
        Skip to content
      </a>
      <Nav />
      <Overture />
      <main id="main-content" tabIndex={-1}>
        <Offer />
        <Process />
        <Builds />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
