import React from 'react';
import { Copyright } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Footer: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-10"> {/* 배경색 및 텍스트 색상 조정, 패딩 증가 */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={footerVariants}
        className="container mx-auto text-center text-sm"
      >
        <p className="flex items-center justify-center">
          <Copyright size={18} className="mr-2 text-gray-400" /> {/* 아이콘 크기 및 색상 조정 */}
          [YYYY] [전시회 제목]. All rights reserved.
        </p>
        <p className="mt-2 text-xs text-gray-500">
          Designed and Developed by Bolt AI
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
