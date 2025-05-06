import React from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ArtworksSection from './components/ArtworksSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased"> {/* antialiased 추가 */}
      <HeroSection />
      <AboutSection />
      <ArtworksSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
