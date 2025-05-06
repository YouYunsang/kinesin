import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // 한 번만 애니메이션 실행
    threshold: 0.1, // 뷰포트의 10%가 보이면 실행
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3, // 자식 요소들에게 순차적으로 애니메이션 적용
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="about" className="py-20 px-6 md:px-10 bg-gradient-to-b from-white to-gray-100"> {/* 배경 그라데이션 추가 */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="container mx-auto max-w-5xl"
      >
        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800"> {/* 제목 스타일 개선 */}
          전시회 소개
        </motion.h2>
        <div className="flex flex-col md:flex-row items-center gap-12"> {/* 간격 조정 */}
          <motion.div variants={itemVariants} className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1547891654-acba31c3e0f7?auto=format&fit=crop&w=800&q=80"
              alt="전시회 공간 이미지"
              className="rounded-xl shadow-2xl border-4 border-white transform transition-transform duration-500 ease-in-out hover:scale-105" // 이미지 스타일 및 효과 추가
            />
          </motion.div>
          <motion.div variants={itemVariants} className="md:w-1/2 text-lg leading-relaxed text-gray-700"> {/* 텍스트 스타일 개선 */}
            <p className="mb-6"> {/* 문단 간격 조정 */}
              <strong className="text-gray-900">[전시회 제목]</strong>은 <strong className="text-gray-900">[전시 기간]</strong> 동안 <strong className="text-gray-900">[전시 장소]</strong>에서 열립니다. 이번 전시는 <strong className="text-gray-900">[전시 주제]</strong>를 중심으로, <strong className="text-gray-900">[참여 작가 수]</strong>명의 작가들이 참여하여 다채로운 작품 세계를 선보입니다.
            </p>
            <p className="mb-6"> {/* 문단 간격 조정 */}
              관람객들은 회화, 조각, 설치 미술, 미디어 아트 등 다양한 장르의 작품을 통해 <strong className="text-gray-900">[전시회가 전달하고자 하는 메시지 또는 경험]</strong>을 느낄 수 있습니다. 각 작품은 작가의 깊은 고뇌와 영감을 담고 있으며, 관람객들에게 새로운 시각과 감동을 선사할 것입니다.
            </p>
            <p>
              예술과 소통하며 새로운 영감을 얻을 수 있는 이번 전시에 여러분을 초대합니다. 특별한 경험을 놓치지 마세요.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
