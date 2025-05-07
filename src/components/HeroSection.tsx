import React from 'react';
import { Brush } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      {/*
        TODO: Replace the image file at public/hero-background.jpg with your desired background image.
        The current image source points to this location.
      */}
      <img
        src="public/hero-background.jpg" // 배경 이미지 경로를 public 폴더의 파일로 변경
        alt="전시회 배경 이미지"
        className="absolute inset-0 w-full h-full object-cover filter brightness-[.4]" // 배경 이미지 어둡게 조정
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 p-6 md:p-10 bg-black bg-opacity-40 rounded-xl shadow-2xl max-w-4xl mx-auto transform transition-all duration-500 ease-in-out hover:scale-105" // 배경 오버레이 및 그림자 강화
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <Brush size={72} className="mx-auto mb-6 text-white animate-pulse" /> {/* 아이콘 크기 키우고 애니메이션 추가 */}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="text-4xl md:text-7xl font-extrabold mb-4 drop-shadow-xl tracking-tight" // 제목 폰트 및 크기 강화
        >
          The Mute Brush
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          className="text-lg md:text-2xl mb-8 drop-shadow-lg font-light" // 부제 폰트 및 크기 강화
        >
          [전시회 부제 또는 간략한 설명]
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          href="#about"
          className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-10 rounded-full shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:-translate-y-1" // 버튼 스타일 개선
        >
          전시회 자세히 보기
        </motion.a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
