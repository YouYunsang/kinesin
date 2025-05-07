import React from 'react';
import { Brush } from 'lucide-react';
import { motion } from 'framer-motion'; // framer-motion import

const HeroSection: React.FC = () => {
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3, // Delay before children start animating
        staggerChildren: 0.2, // Stagger delay between children
      },
    },
  };

  // Animation variants for individual items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      {/*
        TODO: Replace the image file at public/hero-background.jpg with your desired background image.
        The current image source points to this location.
      */}
      <img
        src="/public/hero-background.png" // 배경 이미지 경로를 public 폴더의 파일로 변경
        alt="전시회 배경 이미지"
        className="absolute inset-0 w-full h-full object-cover filter brightness-[.4]" // 배경 이미지 어둡게 조정
      />
      {/* motion.div 사용 및 variants 적용 */}
      <motion.div
        className="relative z-10 p-6 md:p-10 bg-black bg-opacity-40 rounded-xl shadow-2xl max-w-4xl mx-auto transform transition-all duration-500 ease-in-out hover:scale-105" // 배경 오버레이 및 그림자 강화
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* motion.div 사용 및 variants 적용 */}
        <motion.div variants={itemVariants}>
          <Brush size={72} className="mx-auto mb-6 text-white animate-pulse" /> {/* 아이콘 크기 키우고 애니메이션 추가 */}
        </motion.div>
        {/* motion.h1 사용 및 variants 적용 */}
        <motion.h1
          className="text-4xl md:text-7xl font-extrabold mb-4 drop-shadow-xl tracking-tight" // 제목 폰트 및 크기 강화
          variants={itemVariants}
        >
          The Mute Brush
        </motion.h1>
        {/* motion.p 사용 및 variants 적용 */}
        <motion.p
          className="text-lg md:text-2xl mb-8 drop-shadow-lg font-light" // 부제 폰트 및 크기 강화
          variants={itemVariants}
        >
          [전시회 부제 또는 간략한 설명]
        </motion.p>
        {/* motion.a 사용 및 variants 적용 */}
        <motion.a
          href="#about"
          className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-10 rounded-full shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:-translate-y-1" // 버튼 스타일 개선
          variants={itemVariants}
        >
          전시회 자세히 보기
        </motion.a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
