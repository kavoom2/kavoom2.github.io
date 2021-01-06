var store = [{
        "title": "Arguments와 Rest parameter",
        "excerpt":"1. arguments arguments는 함수에 전달한 인자들을 참조하는 객체입니다. function foo(a, b, c) { console.log(arguments[0]); // 1 console.log(arguments[1]); // 2 console.log(arguments[2]); // 3 }; foo(1, 2, 3);; arguments은 유사배열입니다. 배열처럼 인덱스는 0에서부터 시작하며, 각 인수를 설정하거나 재할당할 수 있습니다. arguments[0]; // arguments의 0번째 인덱스 arguments[1]; // arguments의 1번째 인덱스 arguments[2] =...","categories": ["Javascript101"],
        "tags": [],
        "url": "https://kavoom2.github.io/javascript101/arguments/",
        "teaser": null
      },{
        "title": "클로져(Closure)",
        "excerpt":"1. 클로저(Closure)란 클로저(closure)는 함수와 그 함수가 선언되었을 때 렉시컬 환경(lexical environment)과의 조합입니다. 스코프(scope)는 함수를 호출할 때가 아니라 함수를 어디에 선언하였는지에 따라 결정됩니다. 이러한 개념을 렉시컬 스코핑(Lexical Scoping)라 합니다. function outer() { let x = 10; let inner = function() { console.log(x); }; return inner; }; outer(); // 10 위 예제에서...","categories": ["Javascript101"],
        "tags": [],
        "url": "https://kavoom2.github.io/javascript101/closure/",
        "teaser": null
      },{
        "title": "복잡도(Complexity)",
        "excerpt":"(수정 중인 TIL.) 1. 복잡도 처리해야 할 데이터의 양이 방대해지면서, 알고리즘의 효율성 차이가 커질 수 밖에 없습니다. 가령, 데이터를 정렬하더라도 정렬 알고리즘마다 정렬에 걸리는 시간은 천차만별입니다. 방대한 데이터를 더 빨리 처리할 수 있는 방법을 선택해야겠습니다. 서로 다른 알고리즘을 비교할 때, 하드웨어와 소프트웨어 환경이 천차만별이라면 결과를 신뢰하기 힘들겁니다. 계산복잡도는 이러한 환경을...","categories": ["Javascript101"],
        "tags": [],
        "url": "https://kavoom2.github.io/javascript101/complexity/",
        "teaser": null
      },{
        "title": "재귀(Recursion)",
        "excerpt":"1. 재귀란? 컴퓨터 과학에서 재귀(recursion)은 자신을 정의할 때 자기 자신을 참조하는 것이라고 합니다. 프로그래밍에서 재귀함수는 자기 자신을 호출하도록 정의한 함수입니다. 1. 1. 재귀함수의 구성요소 재귀함수는 베이스(base case)와 재귀단계(recursive case)로 구성됩니다. x를 n 제곱하는 함수 pow(x, n)을 예시로 재귀함수의 구성과 작동원리를 이해해봅시다. function pow(x, n) { if (n === 1) {...","categories": ["Javascript101"],
        "tags": [],
        "url": "https://kavoom2.github.io/javascript101/recursion/",
        "teaser": null
      },{
        "title": "This",
        "excerpt":"1. this란 this는 모든 함수 스코프(scope) 내에서 자동으로 설정되는 식별자입니다. 실행 컨텍스트(Execution Context)의 구성요소로 함수가 실행되는 동안 이용할 수 있습니다. 어느 지점에서 this를 호출하였는지에 따라 컨텍스트가 달라집니다. 2. 바인딩 규칙 규칙은 다음과 같이 5가지로 구분할 수 있습니다. 바인딩 우선순위는 명시적 바인딩 - 암시적 바인딩 - 기본 바인딩 순입니다. 구분 호출방식...","categories": ["Javascript101"],
        "tags": [],
        "url": "https://kavoom2.github.io/javascript101/this/",
        "teaser": null
      },{
        "title": "하노이의 탑",
        "excerpt":"세 개의 기둥과 크기가 서로 다른 원판이 있다. 처음에는 아래 그림처럼 기둥 A에 원판이 작은 것이 위로 오도록 쌓여 있다. 게임의 목적은 처음에 꽂혀 있던 순서대로 기둥 C에 옮겨서 쌓는 것이다. 다음 규칙들을 만족하면서 움직여야한다. 원판은 한 번에 한 개만 이동할 수 있다. 큰 원판은 작은 원판 위에 있을 수...","categories": ["algorithm"],
        "tags": ["hanoi","recursion"],
        "url": "https://kavoom2.github.io/algorithm/hanoi/",
        "teaser": null
      },{
        "title": "Ubuntu 20.04에서 소리가 정상적으로 출력되지 않는 경우",
        "excerpt":"1. 해결방법 원문: https://www.maketecheasier.com/fix-no-sound-issue-ubuntu/ 위 주소에서 도움을 받아 해결할 수 있었다. 마지막 방법인 패키지 재설치를 시도해보자. 유의할 점은 설정파일도 제거할 수 있도록 반드시 purge를 실행해야 한다는 것이다. 다음 명령어를 실행하고 재부팅하면 해결된다. $ sudo apt remove --purge alsa-base $ sudo apt remove --purge pulseaudio $ sudo apt install alsa-base $...","categories": ["기타"],
        "tags": ["Ubuntu","alsa","pulseaudio","가짜출력"],
        "url": "https://kavoom2.github.io/%EA%B8%B0%ED%83%80/ubuntu_sound_mixing_problem/",
        "teaser": null
      }]
