## 목차

### 1. 기능 설명
### 2. 적용법
### 3. 적용된 코드로 보기

<br />

---------------

<br />

### 1. 기능 설명
- 앞, 뒤 내용이 다른 카드를 뒤집어 각기 다른 내용을 보여주는 애니메이션을 구현
- 앞, 뒤로 구성된 카드를 구현하는 방법을 알아봄
- 카드를 뒤집는 방법을 알아봄

<br />

-----------------

<br />

### 2. 적용법

- Card 컴포넌트를 작성
	- 카드를 뒤집는 여부를 관리하는 상태를 작성
    - 마우스가 카드 공간에 진입했을 때, 발생하는 이벤트 함수를 작성
    - 카드를 뒤집는 여부 값에 따라 특정 class를 부여할 지 말 지 정함
    - 카드의 앞면과 뒷면은 front, back 클래스로 구분
 
 <br />
 
```
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
```
 
 <br />
 
- card
 	- card의 가장 상위 태그에 position: absolute; 적용, 하위 태그 card-inner의 기준점으로 삼기 위해서임
 	- 자식 요소에 3d 효과 적용
 	- transition으로 뒤집는 효과 설정 추가

<br />

```
.card {
  margin: 8px;
  width: 50px;
  height: 80px;

  /*하위 태그 card-inner가 positon: aboluste;를 사용하므로 기준점으로 삼기 위해 relative 적용 */
  position: relative;

  /*자식 요소에 3D 공간 효과 적용, 기본 값은 flat으로 3D 효과를 적용하지 않음 */
  transform-style: preserve-3d;

  /*카드 뒤집는 효과 동작 시간 설정 */
  transition: transform 0.5s;
}
```

<br />

- card-inner
	- absolute 사용해서 하위 태그 card-front, card-back이 겹쳐서 그려지도록 함
    - 3d 효과가 적용되었을 때 현재 보이는 화면의 뒷면이 보이지 않게끔 설정
    
 ```
 .card-inner {
  width: 100%;
  height: 100%;

  /*card-front와 card-back이 겹쳐야 하므로 사용, absolute 사용을 안할 시 card-back이 card-front 아래에 렌더링 됨 */
  position: absolute;

  /*뒷면을 보이게 할 것인지에 대한 설정, 해당 값을 없앨 시 앞면이 뒷면에 덮혀서 보여지지 않음 */
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
}
 ```
 
 <br />
 
- card-back
	- 카드 반대편에 그려지게 끔 설정
 
 <br />
 
```
 .card-back {
  background-color: #e74c3c;
  color: white;

  /*카드 반대편에 그려지게 됨, 만약 해당 속성이 없을 시 앞면과 똑같은 공간에 그려져서 카드 뒷면이 텅 비게 됨 */
  transform: rotateY(180deg);
}
```

<br />

- flipped 
	- 마우스를 올렸을 시 반대편으로 뒤집는 효과 적용
    
<br />

```
.flipped {
  /*마우스를 올렸을 시 반대편으로 뒤집는 효과*/
  transform: rotateY(180deg);
}
```

<br />

- 전체 css 코드

<br />

```
.App {
  display: flex;
}

.card {
  margin: 8px;
  width: 50px;
  height: 80px;

  /*하위 태그 card-inner가 positon: aboluste;를 사용하므로 기준점으로 삼기 위해 relative 적용 */
  position: relative;

  /*자식 요소에 3D 공간 효과 적용, 기본 값은 flat으로 3D 효과를 적용하지 않음 */
  transform-style: preserve-3d;

  /*카드 뒤집는 효과 동작 시간 설정 */
  transition: transform 0.5s;
}

.card-inner {
  width: 100%;
  height: 100%;

  /*card-front와 card-back이 겹쳐야 하므로 사용, absolute 사용을 안할 시 card-back이 card-front 아래에 렌더링 됨 */
  position: absolute;

  /*뒷면을 보이게 할 것인지에 대한 설정, 해당 값을 없앨 시 앞면이 뒷면에 덮혀서 보여지지 않음 */
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
}

.card-front {
  background-color: #3498db;
  color: white;
}

.card-back {
  background-color: #e74c3c;
  color: white;

  /*카드 반대편에 그려지게 됨, 만약 해당 속성이 없을 시 앞면과 똑같은 공간에 그려져서 카드 뒷면이 텅 비게 됨 */
  transform: rotateY(180deg);
}

.flipped {
  /*마우스를 올렸을 시 반대편으로 뒤집는 효과*/
  transform: rotateY(180deg);
}
```

