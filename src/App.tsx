import React, { useRef, useState, useEffect } from 'react';
import { Brush, ArrowUp, Menu, X } from 'lucide-react'; // Import Menu and X icons
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ArtworkDetail from './ArtworkDetail';

function App() {
  const artistsSectionNavRef = useRef<HTMLDivElement>(null);
  const artworksSectionNavRef = useRef<HTMLDivElement>(null);
  const contactSectionNavRef = useRef<HTMLDivElement>(null);
  const exhibitionInfoSectionNavRef = useRef<HTMLDivElement>(null);

  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [artworksVisible, setArtworksVisible] = useState(false);
  const [artistsVisible, setArtistsVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  // State for mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();

  // Hero Artwork - Keep URL
  const heroArtwork = {
    title: "The Mute Brush",
    description: "\"The Mute Brush\"는 더이상 기억을 그리지 못하는, 그려 놓았던 것마저 잃어가는 치매 환자의 내면을 담았습니다. 평생을 그려낸 인생이라는 그림을 잃어가는 공포, 혼란, 공허를 느껴보세요.",
    imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  };

  // Artists - Use local paths (place images in public/images/artists)
  // Updated to include mainPosition and subPosition instead of bio
  const artists = [
    {
      name: "박지우",
      mainPosition: "3D 모델링 / 애니메이션", // Main Position
      subPosition: "게임 디자인", // Sub Position
      imageUrl: "/images/artists/artist1.png", // Local path
      email: "cather0327@naver.com"
    },
    {
      name: "유윤상",
      mainPosition: "게임 디자인", // Main Position
      subPosition: "3D 모델링", // Sub Position
      imageUrl: "/images/artists/artist2.png", // Local path
      email: "vipsang02@gmail.com"
    },
    {
      name: "하성용",
      mainPosition: "클라이언트 개발", // Main Position
      subPosition: "게임 디자인", // Sub Position
      imageUrl: "/images/artists/artist3.png", // Local path
      email: "gktjddyd9429@naver.com"
    }
  ];

  // Artworks - Use local paths (place images in public/images/artworks)
  const artworks = [
    {
      title: "내면으로 가는 길목",
      description: "본격적으로 게임이 시작되기 이전 세계관 설명이 진행되는 가상의 공간입니다.",
      imageUrl: "/images/artworks/artwork1.png" // Local path
    },
    {
      title: "내면의 작업실",
      description: "게임 진행의 메인 공간인 내면세계의 모습입니다. 의식한 것들이 그림이 되어 기억으로 남겨지는 공간입니다.",
      imageUrl: "/images/artworks/artwork2.png" // Local path
    },
    {
      title: "기억의 그림",
      description: "기억으로 남겨질 그림이 그려지는 공간으로, 플레이어는 이곳에서 자신이 의식한 모든 것을 자유롭게 그려낼 수 있습니다.",
      imageUrl: "/images/artworks/artwork3.png" // Local path
    },
    {
      title: "치매 악화의 시작",
      description: "치매가 악화됨에 따라 벌어지는 이상 현상 중 하나로, 내면세계를 비추던 환한 빛이 꺼지며 존재 상실의 시작을 알립니다.",
      imageUrl: "/images/artworks/artwork4.png" // Local path
    },
    {
      title: "감정의 요동",
      description: "치매의 악화로 인해 감정 변화를 컨트롤 하지 못하게 된 상황이 내면 세계에 영향을 주는 모습입니다.",
      imageUrl: "/images/artworks/artwork5.png" // Local path
    },
    {
      title: "무의식 공간",
      description: "무의식 공간의 모습입니다. 플레이어 내면의 가장 깊숙한 공간으로 잊힌 기억들과 콤플렉스가 존재합니다.",
      imageUrl: "/images/artworks/artwork6.png" // Local path
    },
  ];

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
      // Close mobile menu after clicking a link
      setIsMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Close mobile menu after clicking scroll to top (if it were in the menu)
    setIsMobileMenuOpen(false);
  };

  // Toggle mobile menu state
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) { // Tailwind's 'sm' breakpoint is 640px
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Intersection Observer for sections
  useEffect(() => {
    // Reset visibility state when navigating to the main page
    if (location.pathname === '/') {
       setArtworksVisible(false);
       setArtistsVisible(false);
       setContactVisible(false);
    }


    const observerOptions = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.1, // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target === artworksSectionNavRef.current) {
          setArtworksVisible(entry.isIntersecting);
        } else if (entry.target === artistsSectionNavRef.current) {
          setArtistsVisible(entry.isIntersecting);
        } else if (entry.target === contactSectionNavRef.current) {
          setContactVisible(entry.isIntersecting);
        }
        // No need to track exhibitionInfoSectionNavRef visibility for now
      });
    }, observerOptions);

    const elementsToObserve = [
      artworksSectionNavRef.current,
      artistsSectionNavRef.current,
      contactSectionNavRef.current,
    ].filter(Boolean) as Element[]; // Filter out null refs

    elementsToObserve.forEach(el => {
      observer.observe(el);
    });


    return () => {
      elementsToObserve.forEach(el => {
        observer.unobserve(el);
      });
      observer.disconnect(); // Disconnect the main observer on cleanup
    };
  }, [location.pathname, artworksSectionNavRef, artistsSectionNavRef, contactSectionNavRef]); // Add location.pathname to dependencies


  // Render different content based on the current route
  return (
    <Routes>
      {/* Route for the main landing page */}
      <Route path="/" element={
        <div className="min-h-screen bg-black text-gray-300 overflow-x-hidden"> {/* Changed main background to black */}
          {/* Header */}
          <header className="container mx-auto px-4 py-6 flex justify-between items-center text-gray-100 relative z-50"> {/* Added relative z-50 */}
            <div className="flex items-center text-2xl font-bold">
              <Brush size={32} className="mr-3 text-gray-400" /> {/* Icon color */}
              <span>Kinesin</span> {/* Changed text here */}
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden sm:flex space-x-4"> {/* Hidden on small, flex on medium+ */}
              <button
                onClick={() => scrollToSection(artworksSectionNavRef)}
                className="text-sm text-gray-300 hover:text-white font-medium transition duration-300 ease-in-out transform hover:scale-105"
              >
                작품 사진
              </button>
              <button
                onClick={() => scrollToSection(artistsSectionNavRef)}
                className="text-sm text-gray-300 hover:text-white font-medium transition duration-300 ease-in-out transform hover:scale-105"
              >
                참여 작가
              </button>
              <button
                onClick={() => scrollToSection(exhibitionInfoSectionNavRef)}
                className="text-sm text-gray-300 hover:text-white font-medium transition duration-300 ease-in-out transform hover:scale-105"
              >
                전시 정보
              </button>
               <button
                onClick={() => scrollToSection(contactSectionNavRef)}
                className="text-sm text-gray-300 hover:text-white font-medium transition duration-300 ease-in-out transform hover:scale-105"
              >
                문의하기
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="sm:hidden"> {/* Visible only on small screens */}
              <button
                onClick={toggleMobileMenu}
                className="text-gray-300 hover:text-white focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />} {/* Show X when open, Menu when closed */}
              </button>
            </div>
          </header>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div className="sm:hidden fixed inset-0 bg-black bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-8 animate-fadeIn"> {/* Changed overlay background to black */}
               <button
                onClick={() => scrollToSection(artworksSectionNavRef)}
                className="text-xl text-gray-300 hover:text-white font-medium transition duration-300 ease-in-out transform hover:scale-105"
              >
                작품 사진
              </button>
              <button
                onClick={() => scrollToSection(artistsSectionNavRef)}
                className="text-xl text-gray-300 hover:text-white font-medium transition duration-300 ease-in-out transform hover:scale-105"
              >
                참여 작가
              </button>
              <button
                onClick={() => scrollToSection(exhibitionInfoSectionNavRef)}
                className="text-xl text-gray-300 hover:text-white font-medium transition duration-300 ease-in-out transform hover:scale-105"
              >
                전시 정보
              </button>
               <button
                onClick={() => scrollToSection(contactSectionNavRef)}
                className="text-xl text-gray-300 hover:text-white font-medium transition duration-300 ease-in-out transform hover:scale-105"
              >
                문의하기
              </button>
            </div>
          )}


          {/* Hero Section - Artwork Introduction */}
          <section className="relative h-[70vh] md:h-[85vh] overflow-hidden shadow-xl">
            <img
              src={heroArtwork.imageUrl} // This remains a URL
              alt={heroArtwork.title}
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] grayscale transform scale-105 transition-transform duration-1000 ease-in-out hover:scale-100" // Darker, grayscale image (KEEP)
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center p-6"> {/* Darker overlay */}
              <div className="text-center text-white max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg animate-fadeInDown">
                  {heroArtwork.title}
                </h1>
                <p className="text-lg md:text-xl leading-relaxed opacity-90 drop-shadow-md mb-8 animate-fadeInUp delay-200">
                  {heroArtwork.description}
                </p>
                {/* Detailed Description Button - Now a Link */}
                <Link
                  to="/artwork/시간의-흐름" // Example route, could be dynamic later
                  className="inline-block bg-gray-800 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105 animate-fadeInUp delay-400" // Changed button background
                >
                  상세 설명 보기
                </Link>
              </div>
            </div>
          </section>

          {/* Artworks Section */}
          <section ref={artworksSectionNavRef} className={`container mx-auto px-4 py-20 bg-black rounded-xl shadow-inner ${artworksVisible ? 'animate-fadeIn' : 'opacity-0'}`}> {/* Changed section background to black */}
            <h2 className={`text-3xl md::text-4xl font-bold text-center mb-16 text-gray-100`}> {/* Light heading */}
              작품 사진
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {artworks.map((artwork, index) => {
                return (
                  <div
                    key={index}
                    className={`bg-gray-950 rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-xl cursor-pointer ${artworksVisible ? `animate-fadeInUp delay-${index * 100}` : 'opacity-0'}`}
                  >
                    <img
                      src={artwork.imageUrl} // This is now a local path
                      alt={artwork.title}
                      className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110" // Removed filter grayscale
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-3 text-gray-100">{artwork.title}</h3> {/* Light text */}
                      <p className="text-gray-300 leading-relaxed text-sm">{artwork.description}</p> {/* Lighter gray text */}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Artists Section */}
          <section ref={artistsSectionNavRef} className={`container mx-auto px-4 py-20 bg-black ${artistsVisible ? 'animate-fadeIn' : 'opacity-0'}`}> {/* Changed section background to black */}
            <h2 className={`text-3xl md:text-4xl font-bold text-center mb-16 text-gray-100`}> {/* Light heading */}
              참여 작가
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {artists.map((artist, index) => {
                return (
                  <div
                    key={index}
                    className={`bg-gray-950 rounded-xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-3xl cursor-pointer ${artistsVisible ? `animate-fadeInUp delay-${index * 100}` : 'opacity-0'}`}
                  >
                    {/* Adjusted image classes */}
                    <img
                      src={artist.imageUrl} // This is now a local path
                      alt={artist.name}
                      className="w-full h-auto object-contain object-top transition-transform duration-500 hover:scale-110" // Removed h-72, changed object-cover to object-contain
                    />
                    <div className="p-8 text-center">
                      <h3 className="text-2xl font-semibold mb-4 text-gray-100">{artist.name}</h3> {/* Light text */}
                      {/* Displaying main and sub positions */}
                      <p className="text-gray-300 leading-relaxed text-base mb-2">
                        <strong>Main:</strong> {artist.mainPosition}
                      </p>
                       <p className="text-gray-400 leading-relaxed text-sm">
                        <strong>Sub:</strong> {artist.subPosition}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Exhibition Info Section - NEW SECTION */}
          <section ref={exhibitionInfoSectionNavRef} className="container mx-auto px-4 py-20 text-center bg-black"> {/* Changed section background to black */}
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-100">전시 정보</h2> {/* Light heading */}
            <div className="text-lg text-gray-300 mb-12"> {/* Lighter gray text */}
              <p className="mb-4">
                <strong>전시 일정:</strong> 2025.05.23 - 2025.05.25
              </p>
              <p className="mb-4">
                <strong>전시 시간:</strong> 10:00 - 17:00
              </p>
              <p className="mb-4">
                <strong>전시장 주소:</strong> 서울특별시 종로구 인사동5길 14, 마루아트센터 B1
              </p>
              {/* Added Official URL */}
              <p>
                <strong>공식 url:</strong> <a href="https://afterglow2025.github.io/afterglow2025/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:underline hover:text-white">https://afterglow2025.github.io/afterglow2025/</a>
              </p>
            </div>


            {/* Map Placeholder or alternative if possible */}
            {/* Due to environment limitations, interactive map embedding may not be possible. */}
            {/* You can replace this section with a static image of the map if needed. */}
          </section>


          {/* Contact Section - MODIFIED */}
          <section ref={contactSectionNavRef} className={`container mx-auto px-4 py-20 text-center bg-black ${contactVisible ? 'animate-fadeIn' : 'opacity-0'}`}> {/* Changed section background to black */}
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-100">문의하기</h2> {/* Light heading */}
            <div className="text-lg text-gray-300 mb-12"> {/* Lighter gray text */}
              <p className="mb-4">각 작가에게 직접 문의하시려면 아래 이메일 주소를 이용해주세요.</p>
              <ul className="list-none p-0 m-0 space-y-2 mb-4">
                {artists.map((artist, index) => (
                  <li key={index}>
                    <strong>{artist.name}:</strong> <a href={`mailto:${artist.email}`} className="text-gray-400 hover:underline hover:text-white">{artist.email}</a> {/* Gray link, white on hover */}
                  </li>
                ))}
              </ul>
              {/* Removed Exhibition Address from here */}
            </div>

            {/* Map Placeholder or alternative if possible */}
            {/* Due to environment limitations, interactive map embedding may not be possible. */}
            {/* You can replace this section with a static image of the map if needed. */}
          </section>


          {/* Footer */}
          <footer className="bg-black text-gray-400 py-10 text-center mt-20"> {/* Black footer, gray text */}
            <p className="text-sm opacity-80">© 2025 team Kinesin : The Mute Brush</p>
          </footer>

          {/* Scroll to Top Button */}
          {showScrollToTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-500 focus::ring-opacity-50 z-50" // Changed button background
              aria-label="Scroll to top"
            >
              <ArrowUp size={24} />
            </button>
          )}
        </div>
      } />

      {/* Route for the artwork detail page - NOT MODIFIED */}
      <Route path="/artwork/:artworkTitle" element={<ArtworkDetail />} /> {/* Dynamic route */}
    </Routes>
  );
}

export default App;
