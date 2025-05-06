import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ContactSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="contact" className="py-20 px-6 md:px-10 bg-white">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="container mx-auto max-w-5xl"
      >
        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800"> {/* 제목 스타일 개선 */}
          문의 및 오시는 길
        </motion.h2>
        <div className="flex flex-col md:flex-row gap-12"> {/* 간격 조정 */}
          <motion.div variants={itemVariants} className="md:w-1/2">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">전시 정보</h3> {/* 소제목 스타일 개선 */}
            <div className="space-y-4 text-lg text-gray-700"> {/* 정보 항목 간격 및 스타일 */}
              <p className="flex items-start"> {/* 아이콘 정렬 */}
                <MapPin size={24} className="mr-4 text-blue-600 flex-shrink-0 mt-1" /> {/* 아이콘 색상 및 마진 */}
                <div>
                  <strong className="block text-gray-900 mb-1">장소:</strong> [전시 장소 상세 주소 및 건물명]
                </div>
              </p>
              <p className="flex items-center">
                <Phone size={24} className="mr-4 text-blue-600 flex-shrink-0" />
                <div>
                   <strong className="block text-gray-900 mb-1">연락처:</strong> <a href="tel:[문의 전화번호]" className="hover:underline">[문의 전화번호]</a>
                </div>
              </p>
              <p className="flex items-center">
                <Mail size={24} className="mr-4 text-blue-600 flex-shrink-0" />
                <div>
                  <strong className="block text-gray-900 mb-1">이메일:</strong> <a href="mailto:[문의 이메일 주소]" className="hover:underline">[문의 이메일 주소]</a>
                </div>
              </p>
              <p>
                <strong className="block text-gray-900 mb-1">전시 기간:</strong> [YYYY년 MM월 DD일] - [YYYY년 MM월 DD일]
              </p>
              <p>
                <strong className="block text-gray-900 mb-1">관람 시간:</strong> [오전 10시] - [오후 6시] (매주 [휴관일] 휴관)
              </p>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="md:w-1/2">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">오시는 길</h3> {/* 소제목 스타일 개선 */}
            {/* 실제 지도 iframe 또는 이미지 추가 */}
            <div className="bg-gray-200 h-80 rounded-xl overflow-hidden shadow-xl"> {/* 지도 영역 스타일 개선 */}
               {/* 예시: Google Maps iframe. 실제 사용 시 [장소] 부분을 실제 주소로 변경하세요. */}
               <iframe
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1dXXXX.XXXX!2dXXXX.XXXX!3dXXXX.XXXX!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z[장소 이름 또는 주소]!5e0!3m2!1sko!2skr!4vXXXXXXXXXXXXX"
                 width="100%"
                 height="100%"
                 style={{ border: 0 }}
                 allowFullScreen={false}
                 loading="lazy"
                 referrerPolicy="no-referrer-when-downgrade"
                 title="전시 장소 지도"
               ></iframe>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
