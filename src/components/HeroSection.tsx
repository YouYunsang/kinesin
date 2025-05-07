import React from 'react';
import { Brush } from 'lucide-react';
// framer-motion import 제거

const HeroSection: React.FC = () => {
  // framer-motion variants 제거

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
      {/* motion.div 대신 일반 div 사용 및 애니메이션 클래스 추가 */}
      <div
        className="relative z-10 p-6 md:p-10 bg-black bg-opacity-40 rounded-xl shadow-2xl max-w-4xl mx-auto transform transition-all duration-500 ease-in-out hover:scale-105 hero-content-animate" // 배경 오버레이 및 그림자 강화, 애니메이션 클래스 추가
      >
        {/* motion.div 대신 일반 div 사용 */}
        <div>
          <Brush size={72} className="mx-auto mb-6 text-white animate-pulse" /> {/* 아이콘 크기 키우고 애니메이션 추가 */}
        </div>
        {/* motion.h1 대신 일반 h1 사용 */}
        <h1
          className="text-4xl md:text-7xl font-extrabold mb-4 drop-shadow-xl tracking-tight" // 제목 폰트 및 크기 강화
        >
          The Mute Brush
        </h1>
        {/* motion.p 대신 일반 p 사용 */}
        <p
          className="text-lg md:text-2xl mb-8 drop-shadow-lg font-light" // 부제 폰트 및 크기 강화
        >
          [전시회 부제 또는 간략한 설명]
        </p>
        {/* motion.a 대신 일반 a 사용 */}
        <a
          href="#about"
          className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-10 rounded-full shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:-translate-y-1" // 버튼 스타일 개선
        >
          전시회 자세히 보기
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
