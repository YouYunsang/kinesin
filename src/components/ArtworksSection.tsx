import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const artworks = [
  {
    id: 1,
    title: '작품 제목 1',
    artist: '작가 이름 1',
    imageUrl: 'https://images.unsplash.com/photo-1578301978018-3005759f48f7?auto=format&fit=crop&w=600&q=80', // 이미지 해상도 약간 높임
    description: '작품 1에 대한 간략한 설명입니다. 사용된 재료, 제작 배경 등을 포함할 수 있습니다. 이 작품은 [특정 기법]을 사용하여 [어떤 감정]을 표현합니다.',
  },
  {
    id: 2,
    title: '작품 제목 2',
    artist: '작가 이름 2',
    imageUrl: 'https://images.unsplash.com/photo-1597655601840-edcc24a43b9e?auto=format&fit=crop&w=600&q=80',
    description: '작품 2에 대한 간략한 설명입니다. 사용된 재료, 제작 배경 등을 포함할 수 있습니다. [작품의 특징]이 두드러지며, 관람객에게 [어떤 생각]을 하게 만듭니다.',
  },
  {
    id: 3,
    title: '작품 제목 3',
    artist: '작가 이름 3',
    imageUrl: 'https://images.unsplash.com/photo-1545972154-9b6206a50758?auto=format&fit=crop&w=600&q=80',
    description: '작품 3에 대한 간략한 설명입니다. 사용된 재료, 제작 배경 등을 포함할 수 있습니다. [작품의 배경 스토리]를 알면 더욱 깊이 이해할 수 있습니다.',
  },
  {
    id: 4,
    title: '작품 제목 4',
    artist: '작가 이름 4',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    description: '작품 4에 대한 간략한 설명입니다. 사용된 재료, 제작 배경 등을 포함할 수 있습니다. 이 작품은 [사회적 메시지]를 담고 있으며, [어떤 질문]을 던집니다.',
  },
  {
    id: 5,
    title: '작품 제목 5',
    artist: '작가 이름 5',
    imageUrl: 'https://images.unsplash.com/photo-1515405295632-cdb66838c30b?auto=format&fit=crop&w=600&q=80',
    description: '작품 5에 대한 간략한 설명입니다. 사용된 재료, 제작 배경 등을 포함할 수 있습니다. [작품의 시각적 특징]이 강렬하며, [어떤 느낌]을 줍니다.',
  },
  {
    id: 6,
    title: '작품 제목 6',
    artist: '작가 이름 6',
    imageUrl: 'https://images.unsplash.com/photo-1501472312651-7269c6064cdc?auto=format&fit=crop&w=600&q=80',
    description: '작품 6에 대한 간략한 설명입니다. 사용된 재료, 제작 배경 등을 포함할 수 있습니다. [작품의 숨겨진 의미]를 찾아보는 재미가 있습니다.',
  },
];

const ArtworksSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, // 카드들이 빠르게 순차적으로 나타나도록 조정
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="artworks" className="py-20 px-6 md:px-10 bg-gray-100">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="container mx-auto max-w-6xl"
      >
        <motion.h2 variants={cardVariants} className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800"> {/* 제목 스타일 개선 */}
          주요 작품
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* 간격 조정 */}
          {artworks.map((artwork) => (
            <motion.div
              key={artwork.id}
              variants={cardVariants}
              className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl" // 카드 스타일 및 효과 추가
            >
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-72 object-cover" // 이미지 높이 조정
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 text-gray-900">{artwork.title}</h3> {/* 제목 스타일 개선 */}
                <p className="text-gray-600 mb-4 text-sm">작가: {artwork.artist}</p> {/* 작가 정보 스타일 개선 */}
                <p className="text-gray-700 text-base leading-relaxed">{artwork.description}</p> {/* 설명 스타일 개선 */}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ArtworksSection;
