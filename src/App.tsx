import { Suspense, lazy, useState } from 'react';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Magnetic from './components/Magnetic';
import Navbar from './components/Navbar';
import Particles from './components/Particles';
import WhatsAppFloat from './components/WhatsAppFloat';
import useLivingScroll from './hooks/useLivingScroll';
import { ThemeProvider } from './hooks/useTheme';
import Hero from './sections/Hero';

// Below-fold sections lazy-loaded for faster first paint (performance)
const About = lazy(() => import('./sections/About'));
const Projects = lazy(() => import('./sections/Projects'));
const TechStack = lazy(() => import('./sections/TechStack'));
const Experience = lazy(() => import('./sections/Experience'));
const Testimonials = lazy(() => import('./sections/Testimonials'));
const Contact = lazy(() => import('./sections/Contact'));

function SectionFallback() {
  return <div className="mx-auto max-w-6xl px-5 py-16" aria-hidden><div className="h-48 animate-pulse rounded-2xl bg-neutral-100 dark:bg-white/5" /></div>;
}

function Shell() {
  useLivingScroll();
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="min-h-screen bg-white font-body text-neutral-900 transition-colors dark:bg-[#0A0A0F] dark:text-white">
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <div id="scroll-progress" />
      <CustomCursor />
      <Particles />
      {/* living ambient glow that shifts hue per section */}
      <div id="ambient-hue" className="pointer-events-none fixed left-1/2 top-1/3 -z-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 blur-[130px]" />
      <Navbar />
      <main className="relative">
        <Hero started={loaded} />
        <Suspense fallback={<SectionFallback />}>
          <About />
          <Projects />
          <TechStack />
          <Experience />
          <Testimonials />
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFloat />
      {/* back-to-top magnetic */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <Magnetic>
          <a href="#home" aria-label="Back to top"
            className="glow-icon flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/80 text-lg shadow-lg backdrop-blur dark:border-white/15 dark:bg-white/10 dark:text-white">
            ↑
          </a>
        </Magnetic>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Shell />
    </ThemeProvider>
  );
}
