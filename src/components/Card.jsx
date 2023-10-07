import React, { useState } from "react";

const Card = () => {
  const [filpped, setFlipped] = useState(false);

  // 마우스를 카드에 올렸을 때 실행되는 이벤트
  const handleMouseEnter = () => {
    setFlipped(true);
  };

  // 마우스가 카드에서 벗어났을 때 실행되는 이벤트
  const handleMouseLeave = () => {
    setFlipped(false);
  };

  return (
    <div
      // filpped 값에 따라 flipped 클래스 적용할 지 말지 선택, true일 시, flipped 클래스 적용
      className={`card ${filpped ? "flipped" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 앞면과 뒷면은 똑같은 곳에 작성하고 css를 통해 앞, 뒷면 레이아웃을 적용시킴 */}
      <div className="card-inner card-front">앞</div>
      <div className="card-inner card-back">뒤</div>
    </div>
  );
};

export default Card;
