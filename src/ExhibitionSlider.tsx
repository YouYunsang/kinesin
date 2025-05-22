import React from 'react';

const ExhibitionSlider: React.FC = () => {
  // Placeholder content - Replace with actual game details
  const gameTitle = "The Mute Brush";
  const gameDescription = "\"The Mute Brush\"는 더이상 기억을 그리지 못하는, 그려 놓았던 것마저 잃어가는 치매 환자의 내면을 담았습니다. 평생을 그려낸 인생이라는 그림을 잃어가는 공포, 혼란, 공허를 느껴보세요.";
  const detailedPlan = `
    ## 상세 기획 설명

    **1. 컨셉:** 치매 환자의 내면세계를 탐험하며 잃어가는 기억과 감정을 시각적으로 표현하는 인터랙티브 아트 게임.
    **2. 목표:** 플레이어에게 치매 환자의 경험을 간접적으로 체험하게 하여 공감대를 형성하고, 기억과 정체성에 대한 성찰 기회를 제공.
    **3. 주요 특징:**
       - **추상적인 비주얼:** 왜곡되고 흐릿해지는 기억을 표현하기 위해 몽환적이고 추상적인 그래픽 스타일 사용.
       - **감정 기반 상호작용:** 플레이어의 행동이나 특정 오브젝트와의 상호작용이 내면세계의 분위기나 비주얼에 영향을 미침.
       - **비선형적 서사:** 파편화된 기억 조각을 모으고 연결하며 스토리를 이해하는 방식.
       - **사운드 디자인:** 불안감, 혼란, 평온함 등 다양한 감정을 유발하는 몰입감 있는 사운드스케이프.
    **4. 게임 플레이:**
       - 플레이어는 '붓'을 사용하여 잊혀가는 기억의 흔적을 따라가거나 새로운 감정을 그려낼 수 있음.
       - 특정 기억 조각을 활성화하면 과거의 단편적인 장면이나 소리가 재생됨.
       - 내면세계의 환경은 플레이어의 감정 상태나 기억 복원 정도에 따라 변화함.
    **5. 기술 스택:** Unity 3D 또는 Unreal Engine (게임 개발), React/TypeScript (웹사이트).
    **6. 전시회 활용:** 아이패드에 게임의 핵심 컨셉과 비주얼을 보여주는 데모 또는 인터랙티브 아트 설치물로 활용.
  `; // Example detailed plan

  const backgroundImage = '/images/logo_1920x1080.png'; // Define the background image path

  return (
    <div className="w-screen h-screen overflow-hidden bg-black text-white">
      {/* Slider Container */}
      <div className="w-full h-full flex overflow-x-scroll snap-x snap-mandatory">
        {/* Slide 1: Logo */}
        <div className="flex-shrink-0 w-full h-full snap-center flex items-center justify-center p-4">
          {/* Replace with your actual logo image path */}
          <img
            src={backgroundImage} // Use the defined image path
            alt="Kinesin Game Logo"
            className="max-w-full max-h-full object-contain"
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
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fadeInDown">
              {gameTitle}
            </h1>
            <p className="text-lg md:text-xl leading-relaxed max-w-3xl opacity-90 animate-fadeInUp delay-200">
              {gameDescription}
            </p>
          </div>
        </div>

        {/* Slide 3: Detailed Plan */}
        {/* Added background image and darkening overlay */}
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
           {/* Content */}
           <div className="relative z-10 text-white w-full flex justify-center"> {/* Ensure text is above the overlay and centered */}
             <div className="prose prose-invert max-w-4xl text-gray-300"> {/* Using prose for markdown-like formatting */}
               {/* Render detailedPlan as HTML, basic markdown supported by prose */}
               <div dangerouslySetInnerHTML={{ __html: detailedPlan.replace(/\n/g, '<br/>').replace(/## (.*)/g, '<h2>$1</h2>').replace(/\* (.*)/g, '<li>$1</li>') }} />
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionSlider;
