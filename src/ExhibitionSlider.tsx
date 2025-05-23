import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import motion

const ExhibitionSlider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  // currentSlide tracks the index of the *real* slide being viewed (0, 1, 2)
  const [currentSlide, setCurrentSlide] = useState(0);

  // Placeholder content - Replace with actual game details
  const gameTitle = "The Mute Brush";
  const gameDescription = "\"The Mute Brush\"는 더이상 기억을 그리지 못하는, 그려 놓았던 것마저 잃어가는 치매 환자의 내면을 담았습니다. 평생을 그려낸 인생이라는 그림을 잃어가는 공포, 혼란, 공허를 느껴보세요.";
  // Detailed plan content - now structured for easier JSX rendering
  const detailedPlan = {
    title: "상세 기획 설명",
    sections: [
      {
        heading: "1. 컨셉",
        content: "치매 환자의 내면세계를 탐험하며 잃어가는 기억과 감정을 시각적으로 표현한 인터랙티브 게임 아트.",
      },
      {
        heading: "2. 목표",
        content: "플레이어에게 치매 환자의 내면을 간접적으로 체험하게 하여 공감대를 형성하고, 인격 상실과 정체성에 대한 성찰 기회를 제공.",
      },
      {
        heading: "3. 주요 특징",
        list: [
          "**추상적인 연출:** 왜곡되고 흐릿해지는 기억을 표현하기 위해 몽환적이고 추상적인 연출을 활용했습니다.",
          "**높은 상호작용성:** 플레이어가 그린 그림이 게임의 분위기와 진행에 영향을 미칩니다.",
          "**급격한 분위기 전환:** 몽환적이고 아름다운 분위기에서 어둡고 공포스러운 분위기로 급격히 전환하며 치매의 진행 표현했습니다.",
          "**사운드 디자인:** 불안감, 혼란, 평온함 등 다양한 감정을 유발하는 몰입감 있는 사운드스케이프를 형성했습니다.",
        ],
      },
      {
        heading: "4. 게임 플레이",
        list: [
          "플레이어는 '붓'을 사용하여 \"최근 가장 행복했던 기억\"을 그리게 됩니다.",
          "치매의 진행에 따라 플레이어는 기억을 그려내지 못하고, 그려낸 기억마저 지워지는 경험을 하게 됩니다.",
          "치매의 악화로 결국 인격적 죽음에 이르며 모든 기억을 잃어버리는 경험을 제공합니다.",
        ],
      },
      {
        heading: "5. 조작 방법",
        list: [
          "**오른쪽 조이스틱:** 방향 전환",
					"**왼쪽 조이스틱:** 플레이어 이동",
					"**오른쪽 & 왼쪽 검지 버튼:** (붓을 든 상태로)그림 그리기 버튼",
					"**오른쪽 & 왼쪽 중지 버튼:** 붓 잡기",
        ],
      },
    ],
  };


  const backgroundImage = '/images/logo_1920x1080.png'; // Define the background image path
  const numberOfRealSlides = 3; // We have 3 main slides (0, 1, 2)
  // Total slides = dummy last + real slides + dummy first
  const totalSlides = numberOfRealSlides + 2;

  // Effect to update current slide based on scroll position and handle looping
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const scrollLeft = slider.scrollLeft;
      const slideWidth = slider.clientWidth;

      // Calculate the index including dummy slides (0 to totalSlides-1)
      const visibleIndex = Math.round(scrollLeft / slideWidth);

      // --- Looping Logic ---
      // If scrolled to the dummy first slide (at the very end)
      if (visibleIndex === totalSlides - 1) {
        // Jump back to the real first slide (at index 1) instantly
        slider.scrollTo({
          left: slideWidth, // Scroll to index 1
          behavior: 'auto', // Instant jump
        });
        // Update state to reflect being on the real first slide (index 0)
        setCurrentSlide(0);
      }
      // If scrolled to the dummy last slide (at the very beginning)
      else if (visibleIndex === 0) {
        // Jump to the real last slide (at index numberOfRealSlides) instantly
        slider.scrollTo({
          left: numberOfRealSlides * slideWidth, // Scroll to index 3
          behavior: 'auto', // Instant jump
        });
        // Update state to reflect being on the real last slide (index numberOfRealSlides - 1)
        setCurrentSlide(numberOfRealSlides - 1);
      }
      // For real slides (indices 1, 2, 3 in the visible list)
      else {
        // Map visible index (1, 2, 3) to real slide index (0, 1, 2)
        setCurrentSlide(visibleIndex - 1);
      }
    };

    // Use a small timeout to allow the scroll-snap to settle before checking position
    // This can help prevent flickering or incorrect index calculation during fast scrolls
    let scrollTimeout: NodeJS.Timeout | null = null;
    const debouncedHandleScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(handleScroll, 50); // Adjust delay if needed
    };


    slider.addEventListener('scroll', debouncedHandleScroll);

    // Initial scroll to the first real slide (index 1) after render
    // Use a timeout to ensure the slider element is rendered and has a width
    const initialScroll = setTimeout(() => {
        if (sliderRef.current) {
            sliderRef.current.scrollTo({
                left: sliderRef.current.clientWidth, // Scroll to the second element (index 1)
                behavior: 'auto', // Instant jump
            });
        }
    }, 0);


    return () => {
      slider.removeEventListener('scroll', debouncedHandleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      clearTimeout(initialScroll);
    };
  }, [numberOfRealSlides, totalSlides]); // Re-run effect if slide count changes (unlikely here, but good practice)

  // Effect to handle the 20-second timer and auto-scroll
  useEffect(() => {
    // Only apply timer to real slides 1 and 2 (indices 1 and 2 in the real list)
    // These correspond to visible indices 2 and 3 in the list with dummies
    if (currentSlide === 1 || currentSlide === 2) {
      const timer = setTimeout(() => {
        // Scroll back to the first real slide (index 1 in the visible list)
        sliderRef.current?.scrollTo({
          left: sliderRef.current.clientWidth, // Scroll to index 1
          behavior: 'smooth',
        });
      }, 20000); // 20 seconds

      // Clear the timer if the slide changes before 20 seconds
      return () => clearTimeout(timer);
    }
    // If on real slide 0, ensure no timer is active
  }, [currentSlide]); // Re-run effect when currentSlide changes

  // Function to scroll to a specific real slide index (0, 1, 2)
  const scrollToSlide = (realIndex: number) => {
    const slider = sliderRef.current;
    if (slider) {
      const slideWidth = slider.clientWidth;
      // Scroll to the corresponding visible index (realIndex + 1)
      slider.scrollTo({
        left: slideWidth * (realIndex + 1),
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

  // Render functions for slide content to avoid repetition
  const renderSlide1 = (isVisible: boolean) => (
     <motion.img
        src={backgroundImage}
        alt="Kinesin Game Logo"
        // Removed w-full, h-full, object-cover to display image at native size
        initial="initial"
        // Only animate if this is the *real* slide 1 AND it's the current slide
        animate={isVisible ? "animate" : "initial"}
        variants={fadeIn}
      />
  );

  const renderSlide2 = (isVisible: boolean) => (
    <>
      {/* Darkening Overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>
      {/* Content */}
      <div className="relative z-10 text-white">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg"
          initial="initial"
          animate={isVisible ? "animate" : "initial"}
          variants={slideInDown}
        >
          {gameTitle}
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl leading-relaxed max-w-3xl opacity-90 drop-shadow-md"
          initial="initial"
          animate={isVisible ? "animate" : "initial"}
          variants={slideInUp}
          transition={{ ...slideInUp.transition, delay: 0.2 }}
        >
          {gameDescription}
        </motion.p>
      </div>
    </>
  );

  const renderSlide3 = (isVisible: boolean) => (
    <>
      {/* Darkening Overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>
       {/* Content Container */}
       <motion.div
         className="relative z-10 text-white w-full max-w-4xl mx-auto p-6 bg-black bg-opacity-60 rounded-lg shadow-xl"
         initial="initial"
         animate={isVisible ? "animate" : "initial"}
         variants={scaleIn}
       >
         <h2 className="text-3xl font-bold mb-6 text-center text-white">{detailedPlan.title}</h2>
         {detailedPlan.sections.map((section, index) => (
           <div key={index} className="mb-8 last:mb-0">
             <h3 className="text-xl font-semibold mb-3 text-gray-200">{section.heading}</h3>
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
    </>
  );


  return (
    <div className="w-screen h-screen overflow-hidden bg-black text-white relative"> {/* Added relative for pagination positioning */}
      {/* Slider Container */}
      <div
        ref={sliderRef} // Attach ref to the slider container
        className="w-full h-full flex overflow-x-scroll snap-x snap-mandatory"
      >
        {/* Dummy Slide: Copy of Real Slide 3 (Index 0) */}
        <div
          className="flex-shrink-0 w-full h-full snap-center flex items-center justify-center p-8 overflow-y-auto relative"
           style={{
            backgroundImage: `url(${backgroundImage}))`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
           {renderSlide3(false)} {/* Don't animate dummy slides */}
        </div>

        {/* Real Slide 1: Logo (Index 1) */}
        {/* Added p-4 padding back */}
        <div className="flex-shrink-0 w-full h-full snap-center flex items-center justify-center p-4">
          {renderSlide1(currentSlide === 0)}
        </div>

        {/* Real Slide 2: Title and Description (Index 2) */}
        <div
          className="flex-shrink-0 w-full h-full snap-center flex flex-col items-center justify-center text-center p-8 relative"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {renderSlide2(currentSlide === 1)}
        </div>

        {/* Real Slide 3: Detailed Plan (Index 3) */}
        <div
          className="flex-shrink-0 w-full h-full snap-center flex items-center justify-center p-8 overflow-y-auto relative"
           style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
           {renderSlide3(currentSlide === 2)}
        </div>

        {/* Dummy Slide: Copy of Real Slide 1 (Index 4) */}
        {/* Added p-4 padding back */}
        <div className="flex-shrink-0 w-full h-full snap-center flex items-center justify-center p-4">
          {renderSlide1(false)} {/* Don't animate dummy slides */}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-20">
        {[...Array(numberOfRealSlides)].map((_, index) => ( // Only map to real slides (0, 1, 2)
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentSlide === index ? 'bg-white' : 'bg-gray-500 hover:bg-gray-400' // White for active, gray for inactive
            }`}
            onClick={() => scrollToSlide(index)} // Scroll to the real slide on dot click
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ExhibitionSlider;
