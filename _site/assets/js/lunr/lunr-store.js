var store = [{
        "title": "Arguments와 Rest parameter",
        "excerpt":"1. arguments arguments는 함수에 전달한 인자들을 참조하는 객체입니다. function foo(a, b, c) { console.log(arguments[0]); // 1 console.log(arguments[1]); // 2 console.log(arguments[2]); // 3 }; foo(1, 2, 3);; arguments은 유사배열입니다. 배열처럼 인덱스는 0에서부터 시작하며, 각 인수를 설정하거나 재할당할 수 있습니다. arguments[0]; // arguments의 0번째 인덱스 arguments[1]; // arguments의 1번째 인덱스 arguments[2] =...","categories": ["Javascript"],
        "tags": [],
        "url": "https://kavoom2.github.io/javascript/arguments/",
        "teaser": null
      },{
        "title": "클로져(Closure)",
        "excerpt":"1. 클로저(Closure)란 클로저(closure)는 함수와 그 함수가 선언되었을 때 렉시컬 환경(lexical environment)과의 조합입니다. 스코프(scope)는 함수를 호출할 때가 아니라 함수를 어디에 선언하였는지에 따라 결정됩니다. 이러한 개념을 렉시컬 스코핑(Lexical Scoping)라 합니다. function outer() { let x = 10; let inner = function() { console.log(x); }; return inner; }; outer(); // 10 위 예제에서...","categories": ["Javascript"],
        "tags": [],
        "url": "https://kavoom2.github.io/javascript/closure/",
        "teaser": null
      },{
        "title": "복잡도(Complexity)",
        "excerpt":"(아직도 작성 중) 1. 복잡도 처리해야 할 데이터의 양이 방대해지면서, 알고리즘의 효율성 차이가 커질 수 밖에 없습니다. 가령, 데이터를 정렬하더라도 정렬 알고리즘마다 정렬에 걸리는 시간은 천차만별입니다. 방대한 데이터를 더 빨리 처리할 수 있는 방법을 선택해야겠습니다. 서로 다른 알고리즘을 비교할 때, 하드웨어와 소프트웨어 환경이 천차만별이라면 결과를 신뢰하기 힘들겁니다. 계산복잡도는 이러한 환경을...","categories": ["Javascript"],
        "tags": [],
        "url": "https://kavoom2.github.io/javascript/complexity/",
        "teaser": null
      },{
        "title": "재귀(Recursion)",
        "excerpt":"1. 재귀란? 컴퓨터 과학에서 재귀(recursion)은 자신을 정의할 때 자기 자신을 참조하는 것이라고 합니다. 프로그래밍에서 재귀함수는 자기 자신을 호출하도록 정의한 함수입니다. 1. 1. 재귀함수의 구성요소 재귀함수는 베이스(base case)와 재귀단계(recursive case)로 구성됩니다. x를 n 제곱하는 함수 pow(x, n)을 예시로 재귀함수의 구성과 작동원리를 이해해봅시다. function pow(x, n) { if (n === 1) {...","categories": ["Javascript"],
        "tags": [],
        "url": "https://kavoom2.github.io/javascript/recursion/",
        "teaser": null
      },{
        "title": "This",
        "excerpt":"1. this란 this는 모든 함수 스코프(scope) 내에서 자동으로 설정되는 식별자입니다. 실행 컨텍스트(Execution Context)의 구성요소로 함수가 실행되는 동안 이용할 수 있습니다. 어느 지점에서 this를 호출하였는지에 따라 컨텍스트가 달라집니다. 2. 바인딩 규칙 규칙은 다음과 같이 5가지로 구분할 수 있습니다. 바인딩 우선순위는 명시적 바인딩 - 암시적 바인딩 - 기본 바인딩 순입니다. 구분 호출방식...","categories": ["Javascript"],
        "tags": ["this"],
        "url": "https://kavoom2.github.io/javascript/this/",
        "teaser": null
      },{
        "title": "하노이의 탑",
        "excerpt":"세 개의 기둥과 크기가 서로 다른 원판이 있다. 처음에는 아래 그림처럼 기둥 A에 원판이 작은 것이 위로 오도록 쌓여 있다. 게임의 목적은 처음에 꽂혀 있던 순서대로 기둥 C에 옮겨서 쌓는 것이다. 다음 규칙들을 만족하면서 움직여야한다. 원판은 한 번에 한 개만 이동할 수 있다. 큰 원판은 작은 원판 위에 있을 수...","categories": ["Algorithm"],
        "tags": ["hanoi","recursion"],
        "url": "https://kavoom2.github.io/algorithm/hanoi/",
        "teaser": null
      },{
        "title": "Ubuntu 20.04에서 소리가 정상적으로 출력되지 않는 경우",
        "excerpt":"1. 해결방법 원문: https://www.maketecheasier.com/fix-no-sound-issue-ubuntu/ 위 주소에서 도움을 받아 해결할 수 있었다. 마지막 방법인 패키지 재설치를 시도해보자. 유의할 점은 설정파일도 제거할 수 있도록 반드시 purge를 실행해야 한다는 것이다. 다음 명령어를 실행하고 재부팅하면 해결된다. $ sudo apt remove --purge alsa-base $ sudo apt remove --purge pulseaudio $ sudo apt install alsa-base $...","categories": ["기타"],
        "tags": ["Ubuntu","alsa","pulseaudio","dummy output"],
        "url": "https://kavoom2.github.io/%EA%B8%B0%ED%83%80/ubuntu_sound_mixing_problem/",
        "teaser": null
      },{
        "title": "테트리스 구현",
        "excerpt":"다음 글은 테트리스 예제(https://ui.toast.com/weekly-pick/ko_20191216)를 직접 구현해보고 정리한 내용이다. 프로젝트 트리 구성요소들이 어떤 역할을 하는지 정리한다. 그리고, 직접 구현하면서 알아둘 필요가 있는 내용도 덧붙인다. 1. 블록의 기본요소 테트리스 게임의 핵심은 블록의 움직임과 물리적 충돌을 어떻게 구현할 것인가이다. 게임 시작, 종료, 점수 매기기 등 기능들은 우선 배제하고 블록의 움직임만 생각해보자. 1.1. 블록...","categories": ["Toy"],
        "tags": ["clone","tetris"],
        "url": "https://kavoom2.github.io/toy/toy-clone-tetris01/",
        "teaser": null
      },{
        "title": "Git의 사용법과 Workflow 이해",
        "excerpt":"upstream은 fork를 한 원격저장소의 원본이 있는 원격저장소이다. origin master에서 origin은 원격저장소, main은 브랜치다. 자주 사용하던 git push origin main은 원격저장소 origin의 브랜치 main으로로 커밋을 전송한다는 것이다. graph LR A([\"upstream\"]) --&gt;|fork| B([\"user Repository\"]) B --&gt;|clone| C([\"local Storage\"]) GitHub 원격저장소 연결 원격 저장소를 사용하고 관리할 줄 알아야 공동작업 중 생기는 문제들을 줄일...","categories": ["Git"],
        "tags": ["workflow"],
        "url": "https://kavoom2.github.io/git/git-basic/",
        "teaser": null
      },{
        "title": "Node.js와 관련 툴",
        "excerpt":"Node.js는 Javascript가 동작할 수 있는 환경 또는 프로그램인 런타임(Runtime) 중 하나이다. Javascript 코드를 브라우저에서 실행할 수도 있고, Node.js에서도 실행할 수 있는 것. 다음 예제에서는 터미널에서 Node.js로 스크립트를 실행한 결과를 출력한다. // runnode.js function testFunction(arg) { console.log(\"Arg is \", arg); } testFunction(arg) // terminal $ Node runnode.js // \"Arg is 20\"...","categories": ["Node.js"],
        "tags": ["package.json","nvm","npm"],
        "url": "https://kavoom2.github.io/node.js/node-basic/",
        "teaser": null
      },{
        "title": "ESLint 설치와 사용법",
        "excerpt":"개발자는 일상의 불편하고 비효율적인 문제들을 개선하는 사람이다. 하지만 그런 개발자라도 장문의 코드를 직접 작성해야한다. 더욱이 프로젝트에서는 여러 사람과 공동으로 작업한다. 합쳐진 결과물이 뒤죽박죽이면 숨이 턱 막힐 것이다. ESlint는 이러한 문제를 해결할 수 있도록 도와주는 도구이다. 어떻게 코드를 작성할지 규범을 정해놓으면, 그 패턴을 기반으로 문법오류 등을 표시하거나 교정한다. ESLint 설치 공식문서를...","categories": ["Node.js"],
        "tags": ["ESLint"],
        "url": "https://kavoom2.github.io/node.js/Eslint/",
        "teaser": null
      },{
        "title": "call, apply, bind 유용한 예제",
        "excerpt":"call, apply 활용 call, apply 함수를 사용하면 유사객체도 객체의 메소드를 사용할 수 있다. querySelector 리턴값 NodeList는 대표적인 유사객체이다. 배열 내부에 길이 속성이 있어 length 메소드를 사용할 수 있지만, 배열의 고유 메소드인 map, forEach 등은 직접 사용할 수 없다. 하지만 아래 예제에서 볼 수 있듯이 apply, call, bind로 메소드를 빌려서 사용할...","categories": ["Javascript"],
        "tags": ["TIL","this","apply","bind","call"],
        "url": "https://kavoom2.github.io/javascript/apply-call-bind-practice/",
        "teaser": null
      },{
        "title": "인스턴트 생성 패턴(Instantiation Patterns)과 클래스(Class)",
        "excerpt":"1. 인스턴트 생성 패턴(Instantiation Patterns) 자바스크립트의 객체를 Pseudoclassical 방식이라고 한다. pseudo는 “가짜”라는 뜻을 지니고 있다. 직역하면 가짜로 Class 개념을 구현한다는 뜻이다. 자바스크립트에서는 어떤 편법(?)으로 클래스를 구현했는지 한 번 살펴보자. 1. 1. Functional const Person = function(name, age) { let Instance = {}; Instance.name = name; Instance.age = age; Instance.printAll =...","categories": ["Javascript"],
        "tags": ["class","instance"],
        "url": "https://kavoom2.github.io/javascript/ingeritance-patterns/",
        "teaser": null
      },{
        "title": "객체지향 프로그래밍(Object Oriented Programming)",
        "excerpt":"일생생활을 돌아보면 수많은 대상이 있다. 동물, 물건 등이 있다. 대상들은 저마다 특성과 기능을 가지고 있는데, 가령 스마트폰을 예로 들어보자. 대상의 형태, 색상 등을 나타내는 “특성”과 어플리케이션 실행, 종료 등 “기능”을 가지고 있다. 그리고 같은 핸드폰이라도 아이폰과 갤럭시 노트 S20의 특성과 기능을 차이가 있다. 객체지향 프로그래밍은 프로그램을 이러한 대상들의 모임으로 보는...","categories": ["Javascript"],
        "tags": ["OOP"],
        "url": "https://kavoom2.github.io/javascript/object-oriented-programming/",
        "teaser": null
      }]
