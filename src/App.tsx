import React, { useRef, useState, useEffect } from 'react';
import { Brush, ArrowUp } from 'lucide-react';
import { Routes, Route, Link, useLocation } from 'react-router-dom'; // Import useLocation
import ArtworkDetail from './ArtworkDetail';

function App() {
  const artistsSectionNavRef = useRef<HTMLDivElement>(null);
  const artworksSectionNavRef = useRef<HTMLDivElement>(null);
  const contactSectionNavRef = useRef<HTMLDivElement>(null);

  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [artworksVisible, setArtworksVisible] = useState(false);
  const [artistsVisible, setArtistsVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  const location = useLocation(); // Get current location

  // Hero Artwork - Keep URL
  const heroArtwork = {
    title: "The Mute Brush",
    description: "이 작품은 과거, 현재, 미래가 끊임없이 연결되는 시간의 본질을 탐구합니다. 캔버스 위에 겹겹이 쌓인 색채와 질감은 기억의 파편과 변화하는 현실, 그리고 다가올 미지의 세계를 상징합니다. 관람객은 작품 앞에서 자신만의 시간 여행을 떠나며 삶의 연속성과 순간의 소중함을 되새기게 될 것입니다.",
    imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  };

  // Artists - Use local paths (place images in public/images/artists)
  const artists = [
    {
      name: "박지우",
      bio: "추상 표현주의를 기반으로 인간 내면의 감정을 색채와 형태로 표현하는 작가입니다. 그의 작품은 강렬한 붓 터치와 깊이 있는 색감으로 유명합니다.",
      imageUrl: "/images/artists/artist1.png", // Local path
      email: "kimminjun@example.com"
    },
    {
      name: "유윤상",
      bio: "자연에서 영감을 받아 유기적인 형태와 부드러운 색감을 사용하는 작가입니다. 그녀의 작업은 평온함과 조화로움을 선사합니다.",
      imageUrl: "/images/artists/artist2.png", // Local path
      email: "parkseoyeon@example.com"
    },
    {
      name: "하성용",
      bio: "디지털 매체를 활용하여 현실과 가상의 경계를 탐구하는 미디어 아티스트입니다. 그의 작품은 새로운 시각적 경험을 제공합니다.",
      imageUrl: "/images/artists/artist3.png", // Local path
      email: "leejihun@example.com"
    }
  ];

  // Artworks - Use local paths (place images in public/images/artworks)
  const artworks = [
    {
      title: "고요한 아침",
      description: "새벽의 고요함과 빛의 변화를 포착한 작품입니다. 부드러운 색채와 섬세한 붓 터치가 특징입니다.",
      imageUrl: "/images/artworks/artwork1.png" // Local path
    },
    {
      title: "도시의 리듬",
      description: "복잡한 도시의 에너지와 움직임을 추상적으로 표현했습니다. 강렬한 색상 대비가 인상적입니다.",
      imageUrl: "/images/artworks/artwork2.png" // Local path
    },
    {
      title: "숲의 속삭임",
      description: "자연 속에서 느껴지는 평화와 생명력을 담았습니다. 녹색과 갈색의 조화가 편안함을 줍니다.",
      imageUrl: "/images/artworks/artwork3.png" // Local path
    },
    {
      title: "바다의 기억",
      description: "끝없이 펼쳐진 바다와 그 속에 담긴 추억을 표현했습니다. 푸른색 계열의 깊이 있는 색감이 특징입니다.",
      imageUrl: "/images/artworks/artwork4.png" // Local path
    },
    {
      title: "꿈의 조각",
      description: "현실과 비현실의 경계를 넘나드는 꿈의 세계를 시각화했습니다. 신비로운 분위기를 자아냅니다.",
      imageUrl: "/images/artworks/artwork5.png" // Local path
    },
    {
      title: "빛의 춤",
      description: "다양한 형태의 빛이 만들어내는 움직임과 패턴을 표현했습니다. 역동적이고 생기 넘치는 작품입니다.",
      imageUrl: "/images/artworks/artwork6.png" // Local path
    },
  ];

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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
        <div className="min-h-screen bg-gray-900 text-gray-300 overflow-x-hidden"> {/* Dark background, light text */}
          {/* Header */}
          <header className="container mx-auto px-4 py-6 flex justify-between items-center text-gray-100"> {/* Light text for header */}
            <div className="flex items-center text-2xl font-bold">
              <Brush size={32} className="mr-3 text-gray-400" /> {/* Icon color */}
              <span>팀 Kinesin</span> {/* Changed text here */}
            </div>
            <nav className="flex space-x-4">
              <button
                onClick={() => scrollToSection(artworksSectionNavRef)}
                className="text-gray-300 hover:text-white font-medium transition duration-300 ease-in-out transform hover:scale-105"
              >
                작품 사진
              </button>
              <button
                onClick={() => scrollToSection(artistsSectionNavRef)}
                className="text-gray-300 hover:text-white font-medium transition duration-300 ease-in-out transform hover:scale-105"
              >
                참여 작가
              </button>
               <button
                onClick={() => scrollToSection(contactSectionNavRef)}
                className="text-gray-300 hover:text-white font-medium transition duration-300 ease-in-out transform hover:scale-105"
              >
                문의하기
              </button>
            </nav>
          </header>

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
                  className="inline-block bg-gray-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105 animate-fadeInUp delay-400" // Dark button
                >
                  상세 설명 보기
                </Link>
              </div>
            </div>
          </section>

          {/* Artworks Section */}
          <section ref={artworksSectionNavRef} className={`container mx-auto px-4 py-20 bg-gray-800 rounded-xl shadow-inner ${artworksVisible ? 'animate-fadeIn' : 'opacity-0'}`}> {/* Dark section background */}
            <h2 className={`text-3xl md::text-4xl font-bold text-center mb-16 text-gray-100`}> {/* Light heading */}
              작품 사진
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {artworks.map((artwork, index) => {
                return (
                  <div
                    key={index}
                    className={`bg-gray-700 rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-xl cursor-pointer ${artworksVisible ? `animate-fadeInUp delay-${index * 100}` : 'opacity-0'}`} // Dark card background
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
          <section ref={artistsSectionNavRef} className={`container mx-auto px-4 py-20 ${artistsVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
            <h2 className={`text-3xl md:text-4xl font-bold text-center mb-16 text-gray-100`}> {/* Light heading */}
              참여 작가
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {artists.map((artist, index) => {
                return (
                  <div
                    key={index}
                    className={`bg-gray-800 rounded-xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-3xl cursor-pointer ${artistsVisible ? `animate-fadeInUp delay-${index * 100}` : 'opacity-0'}`} // Dark card background
                  >
                    {/* Adjusted image classes */}
                    <img
                      src={artist.imageUrl} // This is now a local path
                      alt={artist.name}
                      className="w-full h-auto object-contain object-top transition-transform duration-500 hover:scale-110" // Removed h-72, changed object-cover to object-contain
                    />
                    <div className="p-8 text-center">
                      <h3 className="text-2xl font-semibold mb-4 text-gray-100">{artist.name}</h3> {/* Light text */}
                      <p className="text-gray-300 leading-relaxed text-base">{artist.bio}</p> {/* Lighter gray text */}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Contact Section */}
          <section ref={contactSectionNavRef} className={`container mx-auto px-4 py-20 text-center ${contactVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
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
              <p>
                <strong>전시장 주소:</strong> 서울특별시 종로구 인사동5길 14
              </p>
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
              className="fixed bottom-6 right-6 bg-gray-700 text-white p-3 rounded-full shadow-lg hover:bg-gray-600 transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-500 focus::ring-opacity-50 z-50" // Dark button
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
