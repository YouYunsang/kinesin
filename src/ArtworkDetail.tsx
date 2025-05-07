import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; // Import useParams
import { ArrowLeft } from 'lucide-react'; // Import an icon for back button

function ArtworkDetail() {
  const { artworkTitle } = useParams(); // Get the artwork title from the URL

  // Placeholder data for the specific artwork (could be fetched based on artworkTitle)
  // For now, we'll use a single example and enhance its presentation
  const artwork = {
    title: "The Mute Brush", // This should ideally match the artworkTitle from the URL
    keywords: ["시간", "연결", "기억", "변화", "미지", "추상", "표현주의"], // Example keywords
    planningIntention: "이 작품은 시간의 비선형적인 특성과 인간 경험 속에서의 시간의 의미를 탐구하기 위해 기획되었습니다. 과거의 흔적, 현재의 순간, 그리고 미래에 대한 상상이 캔버스 위에서 어떻게 상호작용하는지를 시각적으로 표현하고자 했습니다. 관람객이 작품을 통해 자신만의 시간적 서사를 발견하고, 삶의 연속성과 순간의 가치를 되돌아보는 계기가 되기를 바랍니다. 깊은 사색과 성찰을 유도하며, 각자의 내면 속 시간의 흐름을 느껴보도록 디자인되었습니다.", // Example intention
    imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", // Example image
    medium: "캔버스에 유채",
    dimensions: "150cm x 100cm",
    year: "2025"
  };

  // State to trigger animations after component mounts
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations shortly after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Small delay to ensure elements are in DOM

    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 overflow-x-hidden pb-20"> {/* Darker background */}
      <div className="container mx-auto px-4 relative z-10"> {/* Add relative and z-index for content */}

        {/* Back Button */}
        <div className={`py-8 ${isVisible ? 'animate-fadeInDown' : 'opacity-0'}`}>
          <Link
            to="/"
            className="inline-flex items-center text-gray-400 hover:text-white transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
            aria-label="메인 페이지로 돌아가기"
          >
            <ArrowLeft size={28} className="mr-2" /> {/* Increased size, added margin */}
            <span className="font-medium">메인 페이지</span> {/* Added text label */}
          </Link>
        </div>

        {/* Hero Section with Artwork Image */}
        <section className={`mb-16 ${isVisible ? 'animate-fadeInUp delay-100' : 'opacity-0'}`}>
           <div className="relative w-full h-[60vh] md:h-[80vh] rounded-xl overflow-hidden shadow-2xl">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-full object-cover filter brightness-[0.6] grayscale transition-transform duration-700 ease-in-out hover:scale-105" // Slightly brighter, grayscale (KEEP)
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80"></div> {/* Gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white text-center">
                 <h1 className="text-4xl md:text-6xl font-extrabold mb-2 drop-shadow-lg">
                   {artwork.title}
                 </h1>
                 {/* Optional: Add a subtitle or short tagline here */}
              </div>
           </div>
        </section>


        {/* Keywords Section */}
        <section className={`bg-gray-900 rounded-xl shadow-lg p-8 mb-12 ${isVisible ? 'animate-fadeInUp delay-300' : 'opacity-0'}`}> {/* Dark section background */}
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-100 border-b-2 border-gray-700 pb-3"> {/* Light heading, darker gray border */}
            작품 키워드
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {artwork.keywords.map((keyword, index) => (
              <span
                key={index}
                className="bg-gray-800 text-gray-400 text-sm font-medium px-4 py-2 rounded-full shadow-md transition duration-300 ease-in-out hover:bg-gray-700 hover:text-white" // Darker tag, gray text, white on hover
              >
                #{keyword}
              </span>
            ))}
          </div>
        </section>

        {/* Planning Intention Section */}
        <section className={`bg-gray-900 rounded-xl shadow-lg p-8 mb-12 ${isVisible ? 'animate-fadeInUp delay-400' : 'opacity-0'}`}> {/* Dark section background */}
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-100 border-b-2 border-gray-700 pb-3"> {/* Light heading, darker gray border */}
            기획 의도
          </h2>
          <p className="text-gray-400 leading-relaxed text-lg"> {/* Lighter gray text */}
            {artwork.planningIntention}
          </p>
        </section>

        {/* Technical Details Section (Optional but adds value) */}
         <section className={`bg-gray-900 rounded-xl shadow-lg p-8 ${isVisible ? 'animate-fadeInUp delay-500' : 'opacity-0'}`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-100 border-b-2 border-gray-700 pb-3">
              작품 정보
            </h2>
            <div className="text-gray-400 text-lg space-y-3">
               <p><strong>매체:</strong> {artwork.medium}</p>
               <p><strong>크기:</strong> {artwork.dimensions}</p>
               <p><strong>제작 연도:</strong> {artwork.year}</p>
            </div>
         </section>


      </div>
       {/* Background element for visual effect (optional) */}
       {/* <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-50 z-0"></div> */}
    </div>
  );
}

export default ArtworkDetail;
