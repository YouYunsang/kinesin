import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import motion

const ExhibitionSlider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0); // State to track current slide index

  // Placeholder content - Replace with actual game details
  const gameTitle = "The Mute Brush";
  const gameDescription = "\"The Mute Brush\"는 더이상 기억을 그리지 못하는, 그려 놓았던 것마저 잃어가는 치매 환자의 내면을 담았습니다. 평생을 그려낸 인생이라는 그림을 잃어가는 공포, 혼란, 공허를 느껴보세요.";
  // Detailed plan content - now structured for easier JSX rendering
  const detailedPlan = {
    title: "상세 기획 설명",
    sections: [
      {
        heading: "1. 컨셉",
        content: "치매 환자의 내면세계를 탐험하며 잃어가는 기억과 감정을 시각적으로 표현하는 인터랙티브 아트 게임.",
      },
      {
        heading: "2. 목표",
        content: "플레이어에게 치매 환자의 경험을 간접적으로 체험하게 하여 공감대를 형성하고, 기억과 정체성에 대한 성찰 기회를 제공.",
      },
      {
        heading: "3. 주요 특징",
        list: [
          "**추상적인 비주얼:** 왜곡되고 흐릿해지는 기억을 표현하기 위해 몽환적이고 추상적인 그래픽 스타일 사용.",
          "**감정 기반 상호작용:** 플레이어의 행동이나 특정 오브젝트와의 상호작용이 내면세계의 분위기나 비주얼에 영향을 미침.",
          "**비선형적 서사:** 파편화된 기억 조각을 모으고 연결하며 스토리를 이해하는 방식.",
          "**사운드 디자인:** 불안감, 혼란, 평온함 등 다양한 감정을 유발하는 몰입감 있는 사운드스케이프.",
        ],
      },
      {
        heading: "4. 게임 플레이",
        list: [
          "플레이어는 '붓'을 사용하여 잊혀가는 기억의 흔적을 따라가거나 새로운 감정을 그려낼 수 있음.",
          "특정 기억 조각을 활성화하면 과거의 단편적인 장면이나 소리가 재생됨.",
          "내면세계의 환경은 플레이어의 감정 상태나 기억 복원 정도에 따라 변화함.",
        ],
      },
      {
        heading: "5. 기술 스택",
        content: "Unity 3D 또는 Unreal Engine (게임 개발), React/TypeScript (웹사이트).",
      },
      {
        heading: "6. 전시회 활용",
        content: "아이패드에 게임의 핵심 컨셉과 비주얼을 보여주는 데모 또는 인터랙티브 아트 설치물로 활용.",
      },
    ],
  };


  const backgroundImage = '/images/logo_1920x1080.png'; // Define the background image path

  // Effect to update current slide based on scroll position
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const scrollLeft = slider.scrollLeft;
      const slideWidth = slider.clientWidth;
      // Calculate the current slide index based on scroll position
      const index = Math.round(scrollLeft / slideWidth);
      setCurrentSlide(index);
    };

    slider.addEventListener('scroll', handleScroll);

    return () => {
      slider.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array means this runs once on mount

  // Effect to handle the 20-second timer and auto-scroll
  useEffect(() => {
    // Only apply timer to slides 1 and 2 (indices 1 and 2)
    if (currentSlide === 1 || currentSlide === 2) {
      const timer = setTimeout(() => {
        // Scroll back to the first slide (index 0)
        sliderRef.current?.scrollTo({
          left: 0,
          behavior: 'smooth',
        });
      }, 20000); // 20 seconds

      // Clear the timer if the slide changes before 20 seconds
      return () => clearTimeout(timer);
    }
    // If on slide 0, ensure no timer is active (though the above logic handles this)
    // If the user manually scrolls to slide 0, the timer for 1 or 2 is cleared by the return function
  }, [currentSlide]); // Re-run effect when currentSlide changes

  // Function to scroll to a specific slide
  const scrollToSlide = (index: number) => {
    const slider = sliderRef.current;
    if (slider) {
      const slideWidth = slider.clientWidth;
      slider.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth',
      });
    }
  };

  // Animation variants for elements
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const slideInUp = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const slideInDown = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.8, ease: "easeOut" }
  };


  return (
    <div className="w-screen h-screen overflow-hidden bg-black text-white relative"> {/* Added relative for pagination positioning */}
      {/* Slider Container */}
      <div
        ref={sliderRef} // Attach ref to the slider container
        className="w-full h-full flex overflow-x-scroll snap-x snap-mandatory"
      >
        {/* Slide 1: Logo */}
        <div className="flex-shrink-0 w-full h-full snap-center flex items-center justify-center p-4">
          {/* Replace with your actual logo image path */}
          <motion.img // Use motion.img
            src={backgroundImage} // Use the defined image path
            alt="Kinesin Game Logo"
            className="max-w-full max-h-full object-contain"
            initial="initial"
            animate={currentSlide === 0 ? "animate" : "initial"} // Animate when currentSlide is 0
            variants={fadeIn} // Use fadeIn variant
          />
        </div>

        {/* Slide 2: Title and Description */}
        {/* Added background image and darkening overlay */}
        <div
          className="flex-shrink-0 w-full h-full snap-center flex flex-col items-center justify-center text-center p-8 relative"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Darkening Overlay */}
          <div className="absolute inset-0 bg-black opacity-70"></div> {/* Adjust opacity for desired darkness */}
          {/* Content */}
          <div className="relative z-10 text-white"> {/* Ensure text is above the overlay */}
            <motion.h1 // Use motion.h1
              className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg"
              initial="initial"
              animate={currentSlide === 1 ? "animate" : "initial"} // Animate when currentSlide is 1
              variants={slideInDown} // Use slideInDown variant
            >
              {gameTitle}
            </motion.h1>
            <motion.p // Use motion.p
              className="text-lg md:text-xl leading-relaxed max-w-3xl opacity-90 drop-shadow-md"
              initial="initial"
              animate={currentSlide === 1 ? "animate" : "initial"} // Animate when currentSlide is 1
              variants={slideInUp} // Use slideInUp variant
              transition={{ ...slideInUp.transition, delay: 0.2 }} // Add delay
            >
              {gameDescription}
            </motion.p>
          </div>
        </div>

        {/* Slide 3: Detailed Plan - Modern Design */}
        <div
          className="flex-shrink-0 w-full h-full snap-center flex items-center justify-center p-8 overflow-y-auto relative"
           style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
           {/* Darkening Overlay */}
          <div className="absolute inset-0 bg-black opacity-70"></div> {/* Adjust opacity for desired darkness */}
           {/* Content Container */}
           <motion.div // Use motion.div for the content container
             className="relative z-10 text-white w-full max-w-4xl mx-auto p-6 bg-black bg-opacity-60 rounded-lg shadow-xl"
             initial="initial"
             animate={currentSlide === 2 ? "animate" : "initial"} // Animate when currentSlide is 2
             variants={scaleIn} // Use scaleIn variant
           >
             <h2 className="text-3xl font-bold mb-6 text-center text-white">{detailedPlan.title}</h2> {/* Styled main heading */}
             {detailedPlan.sections.map((section, index) => (
               <div key={index} className="mb-8 last:mb-0"> {/* Added margin between sections */}
                 <h3 className="text-xl font-semibold mb-3 text-gray-200">{section.heading}</h3> {/* Styled section heading */}
                 {section.content && (
                   <p className="text-gray-300 leading-relaxed">{section.content}</p>
                 )}
                 {section.list && (
                   <ul className="list-disc list-inside text-gray-300 leading-relaxed space-y-2 pl-4">
                     {section.list.map((item, itemIndex) => (
                       <li key={itemIndex} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></li>
                     ))}
                   </ul>
                 )}
               </div>
             ))}
           </motion.div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-20"> {/* Position dots at the bottom */}
        {[0, 1, 2].map((index) => ( // Assuming 3 slides (0, 1, 2)
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentSlide === index ? 'bg-white' : 'bg-gray-500 hover:bg-gray-400' // White for active, gray for inactive
            }`}
            onClick={() => scrollToSlide(index)} // Scroll to slide on dot click
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ExhibitionSlider;
