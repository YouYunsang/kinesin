import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; // Import useParams
import { ArrowLeft } from 'lucide-react'; // Import an icon for back button

function ArtworkDetail() {
  const { artworkTitle } = useParams(); // Get the artwork title from the URL

  // Placeholder data for the specific artwork (could be fetched based on artworkTitle)
  // For now, we'll use a single example and enhance its presentation
  const artwork = {
    title: "The Mute Brush", // This should ideally match the artworkTitle from the URL
    keywords: ["기억", "화가", "상실", "공허", "공포", "슬픔", "치매"], // Example keywords
    // Split planning intention into two parts
    planningIntentionGameArt: "\“The Mute Brush\”를 통해 게임 아트라는 새로운 장르에 도전하며, 게임이 가지고 있는 예술성을 사람들에게 보여주고 싶었습니다. \‘게임\’이라는 매체는 사람들의 강력한 몰입을 유도하며, 뛰어난 상호작용성은 플레이어로 하여금 작품의 일부가 되도록 합니다. 이에 VR을 접목하여 그러한 특성을 극대화 하고자 했습니다. 저희는 사람들이 작품의 한 가운데서 게임이 담고 있는 메시지, 감정, 스토리를 온몸으로 만끽하기를 바랍니다. \“The Mute Brush\”는 각 플레이어와 하나 되어 그들만의 이야기가 담긴 각기 다른 예술 작품으로 완성될 것 입니다.", // Content for Game Art section
    planningIntentionDementia: "\“The Mute Brush\”는 많은 이들에게 아픔을 주는 질병, \‘치매\’를 소재로 하여 만들어진 게임입니다. 사람이 살면서 평생을 그려온 인생이라는 그림이 지워져 가는 슬픔, 혼란, 공포가 바로 치매의 본질이라 생각했습니다. 평생을 함께 한 소중한 것들이 하나하나 지워지고, 더이상 그림을 그려나갈 수 없을 때의 감정을 조금이나마 느껴볼 수 있는 장을 만들고자 했고, 그것이 \“The Mute Brush\”입니다.", // Content for Dementia section (Placeholder)
    imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", // Example image
    medium: "Virtual Reality",
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

        {/* Planning Intention Section 1 - Game Art */}
        <section className={`bg-gray-900 rounded-xl shadow-lg p-8 mb-12 ${isVisible ? 'animate-fadeInUp delay-400' : 'opacity-0'}`}> {/* Dark section background */}
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-100 border-b-2 border-gray-700 pb-3"> {/* Light heading, darker gray border */}
            기획의도 1 - 게임 아트
          </h2>
          <p className="text-gray-400 leading-relaxed text-lg"> {/* Lighter gray text */}
            {artwork.planningIntentionGameArt}
          </p>
        </section>

        {/* Planning Intention Section 2 - Dementia Expression */}
        <section className={`bg-gray-900 rounded-xl shadow-lg p-8 mb-12 ${isVisible ? 'animate-fadeInUp delay-500' : 'opacity-0'}`}> {/* Dark section background */}
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-100 border-b-2 border-gray-700 pb-3"> {/* Light heading, darker gray border */}
            기획 의도 2 - 치매의 표현
          </h2>
          <p className="text-gray-400 leading-relaxed text-lg"> {/* Lighter gray text */}
            {artwork.planningIntentionDementia}
          </p>
        </section>


        {/* Technical Details Section (Optional but adds value) */}
         <section className={`bg-gray-900 rounded-xl shadow-lg p-8 ${isVisible ? 'animate-fadeInUp delay-600' : 'opacity-0'}`}> {/* Adjusted delay */}
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
