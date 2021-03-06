---
title: 개인 토이프로젝트 Fall Guys 회고

excerpt: "Vanilla JS와 HTML5 Canvas로 구현한 움직이는 애니메이션"

classes: wide

last_modified_at: 2021-01-20T00:10:00

use_math: true

categories:
  - Toy
  - Projcet
  - Javscript
tags:
  - fallguys
---

시작하기에 앞서 정말 좋은 컨텐츠와 강의를 제공해주신 개발자 [**Interactive Developer**](https://www.youtube.com/user/cmiscm)님에게 감사의 말씀을 드리고 싶다. 덕분에 HTML5와 자바스크립트만으로도 다양한 시각적 경험을 만들 수 있다는 것을 알게 되었다. 그리고 이 영상들을 보면서 배운 내용을 어떻게 활용할지 머리 속에 그려볼 수 있었다. 지금까지 올리신 강의는 [**이 곳**](https://youtube.com/playlist?list=PLGf_tBShGSDNGHhFBT4pKFRMpiBrZJXCm)에서 볼 수 있다. 심지어 무료다.

## 1. 프로젝트를 하게 된 계기

<video autoPlay loop muted width="700px">
  <source src="https://drive.google.com/uc?export=view&id=1VfrP0lTQR826cT4nT7PbEWzH7GtxtuM3"  type="video/mp4" />
</video>

폴 가이 토이 프로젝트를 진행하게 된 이유는 두 가지였다. 하나는 예전부터 "개인적으로 정말 만들고 싶은 것"을 내 손으로 만드려는 욕구를 해소하고 싶었기 때문이고, 다른 하나는 Interactive Developer님의 이야기가 크게 와닿았기 때문이다. 어도비 플래시에 관한 내용으로 개발 툴의 패러다임이 바뀌어도 적응할 수 있도록 기초를 다져야 한다는 내용이었다.

마침 부트캠프에서 클래스에 관한 개념을 어느정도 잡아놨었고, 다행히 많이 바쁜 시기는 아니었다. 이 만한 기회는 없다고 생각하고 즉시 행동에 옮겼다.

## 2. 무엇을 구현할 것인가

의욕도 앞서고 하고 싶은 것은 정말 많지만, 과욕은 일을 망치기도 하는 법이다. 진행하기에 앞서 무게를 두고 먼저 구현해야 할 것들을 정리했다.

> 다양한 움직임을 구현하되, CSS는 최소한으로 사용하고 자바스크립트로 구현하기
>
> HTML5 캔버스의 다양한 기능을 찾아보고 직접 사용해보기
>
> HTML, Javascript에서 프레임 단위로 애니메이션을 재생하는 기능 활용하기

게임으로 만들고 싶은 욕구가 가득하지만 실력을 한 단계 끌어올리는게 주된 목적이니 부차적인 기능들은 미뤄두었다. 마침 최근에 재밌게 했던 폴가이즈를 바탕으로 만들고 싶었는데, 무엇을 구현할지는 폴가이즈 몇 판하면서 정리했다.

<center><img src = "https://drive.google.com/uc?export=view&id=1Aa7Fm4JBM4RNkRlrVl5TtXtqP1TZllZe"></center>

메인화면과 게임 스테이지를 만들고, 게임은 횡스크롤 형식의 피하기 게임으로 계획했다. 피그마에 만들었던 초기 디자인과는 많이 달라졌는데, 예상보다 시각적인 요소들이 제 기능을 못하다보니 변경사항이 꽤나 많이 생겼다.

현재까지 구현하고, 앞으로 구현할 핵심요소들은 다음과 같다.

> 바람 - 집중선 형태로 캐릭터가 달리는 효과를 강조한다.
>
> 움직이는 캐릭터 - gif 파일이 아닌 스프라이트 이미지를 사용하여 달리거나 뛰는 행동을 구사한다.
>
> 움직이는 바닥 - 바닥은 서로 다른 색상의 블록으로 구성되었고, 캐릭터가 이동함에 따라 원근법을 적용하여 서서히 지평선으로 사라지도록 한다.
>
> 장애물 - 캐릭터가 피해야 할 간단한 장애물을 추가한다. 점차 크기가 줄어들고 지평선으로 사라져야 한다. 또한, 캐릭터와 장애물이 충돌했는지 판단해야 한다.

현재 장애물을 제외한 나머지 요소들은 구현하였다.

## 3. 핵심요소 구현

### 3. 1. 애니메이션 재생

애니메이션을 재생하는 방법은 영화관 영사기를 떠올리면 된다. 그림을 매우 짧은 간격으로 바꾸어서 마치 움직이는 것처럼 보이게 하는 원리이다. 다만 필름처럼 이미 모든 그림이 완성된 상태는 아니다보니, 매 프레임마다 캔버스를 지우고 요소들을 그려주는 과정이 필요하다.

[window.requestAnimationFrame](https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame)으로 애니메이션을 재생할 수 있다. 이전에 테트리스 클론 토이 프로젝트에서도 언급한 내용이지만 주의할 점이 있다. 하드웨어 성능 차이 때문에 모니터마다 주사율이 천차만별인데, 재생할 수 있는 최대 프레임에 따라 재생속도가 달라질 수 있다. 60장의 그림을 재생하는데 한 모니터는 1초 동안 보여주고, 다른 모니터는 0.5초동안 보여준다고 생각하면 이해가 될 것이다.

이 문제는 requestAnimationFrame의 콜백함수가 인자로 받는 **TimeStamp**를 활용하면 된다. 일정시간마다 움직이도록 구현하면 되는데, 다음 예제를 살펴보자.

```js
class App {
  constructor() {
    requestAnimationFrame(this.animate.bind(this));
    // 콜백함수에서 실행할 draw 함수들의 this를 바인딩해주어야 한다.
    this.groundLine = new GroundLine();
  }

  animate(t) {
    // requestAnimationFrame 함수는 타임스탬프를 매개인자로 받는다.
    let requestID = requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.groundLine.draw(this.ctx, t);
  }
}

class GroundLine {
  constructor() {}
  draw(ctx, t) {
    if (!this.time) {
      this.time = t;
    }
    const now = t - this.time;
    if (now > 1000) {
      // 1000ms 마다 움직이도록 한다.
      this.time = t;
      // 이하 움직이도록 하는 함수를 작성.
    }
    ctx.beginPath();
    // 각 점을 이어서 선분으로 만드는 함수는 생략
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }
}
```

콜백함수 animate(t)는 재귀적으로 실행된다. 실행될 때마다 현재 타임스탬프를 자동적으로 받아오게 된다. 이 값을 각 요소를 그리는 함수(Class.draw)에 넣어서 일정 시간마다 움직이도록 만들어주면 된다.

### 3. 2. 바람(하늘 집중선)

하늘 끝 지점에서 생성된 임의의 폭, 길이를 가진 사각형이 화면 중심으로 이동하도록 하였다. 시간이 지남에 따라 크기와 속도가 줄어들도록 하였는데, 이는 일정시간마다 정해놓은 값을 나누어 현재 크기와 속도값가 지수함수 형태로 줄어들도록 하였다. 이 경우 중앙에 도달하지 못한 선분이 있을 수 있는데, 사각형의 폭이 일정 크기 이하가 되면 제거되도록 하였다.

들었던 강의의 도움을 받아 이 강조선들을 관리하는 Wind-Controller 클래스를 만들었다. 컨테이너는 일정 개수 미만의 Wind 인스턴스들을 가지도록 하고, 각 인스턴스가 종료조건을 만족하는지 확인한다. 종료조건에 해당하면 해당 선분을 제거하고 새로운 Wind 인스턴스를 생성한다.

강조선이 이동하려면 시작점과 종료지점 사이의 각도를 알아야 한다. 그리고 이 값으로 X축과 Y축 변화량 dx, dy를 계산하면 된다. 두 점 사이의 각도는 [Math.atan2()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2)로 계산하면 된다.

### 3. 3. 캐릭터 - x축 이동

폴 가이즈를 해본 사람은 캐릭터가 굉장히 답답하게 움직인다는 것을 알 것이다. 이동을 구현하되, 이 느낌을 살리는 것이 목표였다. 키보드 A 또는 D를 누르면, 일정시간 동안 가속하다가 최대속도에 이르면 그 속도를 유지한다. 그리고 키를 누르지 않으면 캐릭터가 서서히 멈추어야 한다.

이 움직임은 사인함수를 사용해서 구현하려고 했다. 현재 이동속도를 sin(value)로 하고, 그 변수가 일정범위($-Pi/2 < value < Pi/2$) 내에서만 움직이도록 하였다.

그리고, 이동을 구현하면서 조건문을 많이 걸어놓다보니 키씹힘 현상이 종종 일어났다. 이는 A, D의 keyDown 이벤트가 발생하면 value를 결정하는 계산식을 결정하는 요소의 값을 각각 변경하는 방법으로 최소화했다.

### 3. 4. 캐릭터 - 점프

이동기능을 구현했다면 뛰는 동작은 크게 어렵지 않다. 사인함수가 범위($0 < value < Pi$) 내에서 value를 서서히 키우면 된다.

### 3. 5. 캐릭터 - 스프라이트 이미지 재생

이번에 스프라이트 이미지를 사용하여 애니메이션을 재생하는 법을 처음으로 알게 되었다. gif를 사용하면 되지 않느냐고 물을 수 있는데, 이 방법은 **내가 원하는 속도**로 **원하는 특정 동작만** 수행하도록 할 수 있다.

어떤 캐릭터를 구현한다고 해보자. 공격, 이동, 달리기, 걷기 등 무수히 많은 동작이 있는데 이를 모든 이미지를 일일이 불러오기보다, 하나의 이미지 안에 저장해놓고 특정 사진만 연속적으로 출력하면 된다. 여러 이미지를 불러올 필요 없이, 하나의 이미지만으로도 다양한 움직임을 구사할 수 있는 것이다.

<center><img src = "https://drive.google.com/uc?export=view&id=1fmoILgSsvqxPQCsTsYeqDPqbphq9XToL"></center>
이 그림이 스프라이트 이미지다. 여러 동작을 하나의 그림 파일 안에 합쳐 놓은 것을 볼 수 있는데, 그렇다면 코드상으로 어떻게 출력하는 것인지는 다음 예제를 살펴보자.

```js
class Fallguy {
  draw(ctx, t) {
    if (!this.time) {
      this.time = t;
    }
    const now = t - this.time;
    if (now > this.fpsTime) {
      // 일정 시간이 지났는지 확인한다.
      this.curFrame += 1; // 스프라이트의 다음 장면을 사용할 수 있도록 한다.
      if (this.curFrame === this.totalFrame) {
        this.curFrame = 0;
      }
    }
    animate(ctx);
  }

  animate(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y); // 기준점(0,0)의 위치를 변경한다. 그림은 항상 기준점이 그림의 좌측상단에 위치하도록 그려진다.
    ctx.drawImage(
      this.img,
      this.imgWidth * this.curFrame, // 스프라이트 이미지의 한 장면만 출력한다
      this.imgWidth,
      -this.imgWidthHalf,
      this.initY,
      this.imgWidth,
      this.imgHeight
    );
    ctx.restore();
  }
}
```

### 3. 6. 움직이는 바닥 - 블록 사이 곡선(또는 블록의 앞면)

처음에는 구현할 생각이 없던 요소였지만, 만들고 보니 굉장히 밋밋한 느낌을 지울 수 없었다. 폴 가이즈 스테이지 중 롤아웃을 보고 만들어보고자 한 요소다.

움직이는 지형은 형형색색의 블록이 붙어있는 형태로 구상하였다. 이를 구현하려면, 다음 요소들을 구현해야 했다.

> 곡선이 일정시간마다 생성되어 캔버스 바닥에서 시작해 지평선을 향해 움직여야 한다.
>
> 시간이 지나면서 곡선의 폭은 줄어들어야 하며, 입체감이 느껴지도록 곡선의 형태가 변해야 한다.
>
> 블록과 블록 사이는 입체감이 느껴지도록 간격이 있다. 이질감이 들지 않으려면, 곡선(블록의 앞면)의 색은 바로 위에 인접한 직사각형(블록의 윗면)의 색상에 맞춰져야 한다.

우선, 곡선을 만들어보자. HTML5 캔버스 상에서 직선 또는 곡선으로 다양한 형태의 선이나 도형을 만들 수 있다.

```js
class GroundLine {
  draw(ctx, t) {
    ctx.beginPath(); // 도형 그리기를 시작한다.
    let prevX = this.curPoint[0].x;
    let prevY = this.curPoint[0].y;

    // 2. Draw - Draw A Quadratic Lines
    ctx.moveTo(prevX, prevY); // canvas.moveTo(x, y)는 선 또는 도형의 시작점이다.
    for (let i = 1; i < this.curPoint.length; i++) {
      const curX = this.curPoint[i].x;
      const curY = this.curPoint[i].y;
      const cpX = (prevX + curX) / 2;
      const cpY = (prevY + curY) / 2;
      ctx.quadraticCurveTo(cpX, cpY, curX, curY); // 다음 점으로 곡선을 잇는다.
      prevX = curX;
      prevY = curY;
    }
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }
}
```

곡선을 그리는 함수를 보면 cpX, cpY라는 이상한 인자가 보일 것이다. 이는 Control Point로 [**베지어 곡선(Bézier Curve**)](https://en.wikipedia.org/wiki/B%C3%A9zier_curve)을 그리는데 필요한 기준점이다. 베지어 곡선은 2차, 3차 등 여러 곡선이 존재하나, HTML5는 2차 베지에 곡선을 채택하고 있으니 필요한 공식들을 찾는다면 **Quadratic Bézier curves**로 검색하면 된다.

참고로 베지어 곡선을 보다보면, $t(0\leqq t \leqq 1)$가 무엇을 의미하는지 애매할 수도 있다. 베지어 곡선을 양 끝에 위치한 두 점을 이은 직선을 하나 만들자. 직선 위에서 어느 지점에 위치해있는지 비율로 나타낸 값으로 볼 수 있는데, 베지어 곡선 상에 있는 특정 점을 구하는데 요긴하게 쓰이니 알아두면 좋다. 곡선이 그려지는 원리를 보면 이해하는데 도움이 될 것이다. 자세한 내용은 [다음 글](https://lee-seokhyun.gitbook.io/workspace/client/easy-mathematics/gdc2012/2)을 참조하자.

> Find coordinates on a bezier curve  
> t = 0.25; // P0와 P1사이 지점을 1:3으로 등분하는 지점  
> x = (1 - t) _ (1 - t) _ p[0].x + 2 _ (1 - t) _ t _ p[1].x + t _ t _ p[2].x;  
> y = (1 - t) _ (1 - t) _ p[0].y + 2 _ (1 - t) _ t _ p[1].y + t _ t _ p[2].y;  
> p[0] is the start point, p[1] is the control point, and p[2] is the end point.  
> t is the parameter, which goes from 0 to 1.

참고로 직선은 quadraticCurveTo를 moveTo(x, y) 함수로 변경하면 된다.

### 3. 7. 움직이는 바닥 - 원근감 구현

블록도 지평선을 향해 움직인다. 원근감이 느껴지려면 곡선의 폭이 점차 줄어들어야 하고, 곡선의 형태 또한 변해야 할 것이다. 곡선이 변형되는 방법은 소닉의 [보너스 스테이지](https://www.youtube.com/watch?v=_QCmIbYm5Rg)에서 아이디어를 얻었다. 선을 각 지점을 등분하는 5개의 점으로 구성고, 이 점들은 화면 바닥에서 동시에 출발하여, 일정시간이 지나면 지평선에 동시에 도착하도록 했다.

### 3. 8. 움직이는 바닥 - 블록과 선(또는 블록앞면)의 색상 통일

블록은 총 4가지의 색상이 임의의 순번으로 칠해지도록 하였다. 여기서 중요한 것은 블록(사각형)과 블록의 앞면(곡선)의 색상이 통일성이 있어야 한다는 점이다. 이를 GroundLine 인스턴스들을 관리하는 Ground에서 코드로 구현하였다. 블록의 색상을 토대로 선의 색상을 바꾸도록 하였다. 예외 케이스인 처음 블록이 생성된 경우와 생성된 블록이 캔버스 바닥에 닿은 경우를 고려하여 작업하였다.

작업 도중에 새로운 효과를 추가하려니 코드가 심각하게 지저분해진 부분이다. 분명 더 간결하게 작성할 수 있는 방법이 있을텐데 아쉬움이 많이 남는다.

## 5. 마치며

<center><img src = "https://drive.google.com/uc?export=view&id=1KRpBwitPg7NpmNiLiMcTYKHFtkDKQGM4"></center>
    
폴가이즈를 하면서 용 코스튬을 입은 **크레이지 스텀블링 애니멀**을 보면, 담굴 생각말고 반갑게 손 한번 들어주길 바란다.

## 6. GitHub & Reference

[**토이 프로젝트 GitHub**](https://github.com/kavoom2/toy-fall-guy)  
[**테스트 영상 - 2021. 01. 19.**](https://youtu.be/-F0pgU2-TAg)  
[**폴가이 모델파일 및 이미지**](https://www.deviantart.com/arisumatio/art/MMD-Fall-Guys-Astronaut-854647126)
