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
        "title": "개인 토이프로젝트 - 테트리스 클론",
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
      },{
        "title": "클래스 예제 - Beesbeesbees",
        "excerpt":"1. ECMAScript6 Class문법에서 속성과 메소드 상속 ECMAScript6 문법에서 Class 상속은 다음과 같이 표현할 수 있다. Constuctor와 메소드에서 super가 어떻게 사용되는지 유심히 살펴보자. 생성자에서 부모 클래스의 속성과 메소드 상속 : super([arguments]); 부모 클래스의 함수 호출 : super.functionOnParent([arguments]); class Grub { constructor() { this.age = 0; this.color = \"pink\"; this.food = \"jelly\";...","categories": ["Javascript"],
        "tags": ["class","instance","inheritance","TIL"],
        "url": "https://kavoom2.github.io/javascript/inheritance-beebeebees/",
        "teaser": null
      },{
        "title": "자료구조(Data Structure) - Stack, Queue",
        "excerpt":"1. 스택(Stack) 스택은 마지막에 들어온 데이터가 먼저 나가는 LIFO(Last In First Out) 방식의 자료구조이다. 어떻게 스택을 사용할지에 따라 다르겠지만, 스택에 필요한 주요 속성과 메소드는 다음과 같다. Stack.pop() 스택 최상단 데이터를 반환하고 제거하는 메소드. Stack.push(element) 스택에 메모리를 생성하여 추가하는 메소드. this.top + 1에 추가한다. Stack.empty() 스택이 비었는지 확인하는 메소드. 비었으면 1,...","categories": ["Data Structure"],
        "tags": ["stack","queue"],
        "url": "https://kavoom2.github.io/data%20structure/data-structure/",
        "teaser": null
      },{
        "title": "개인 토이프로젝트 중간점검 - 폴 가이즈",
        "excerpt":"시작하기에 앞서 정말 좋은 컨텐츠와 강의를 제공해주신 개발자 Interactive Developer님에게 감사의 말씀을 드리고 싶다. 덕분에 HTML5와 자바스크립트만으로도 다양한 시각적 경험을 만들 수 있다는 것을 알게 되었다. 그리고 이 영상들을 보면서 배운 내용을 어떻게 활용할지 머리 속에 그려볼 수 있었다. 지금까지 올리신 강의는 이 곳에서 볼 수 있다. 심지어 무료다. 1....","categories": ["Toy","Javscript"],
        "tags": ["fallguys"],
        "url": "https://kavoom2.github.io/toy/javscript/toy-fallGuys/",
        "teaser": null
      },{
        "title": "자료구조(Data Structure) - Linked list, Hash table",
        "excerpt":"출처에 표기한 글을 정리한 내용입니다. CPU, 메모리(RAM), 스토리지(HDD, SSD)는 컴퓨터의 주요 부품이다. 메모리는 처리속도가 매우 빠르지만 용량이 매우 적다. 저장된 데이터는 휘발성이 있어, 전기 공급이 중단되면 데이터 또한 사라지게 된다. 따라서, 데이터는 평상시 스토리지에 저장되어 있다. 스토리지는 처리속도가 매우 느리므로 CPU와 함께 일을 하기 힘들다. 따라서, 어떤 프로그램을 실행하면 필요한...","categories": ["Data Structure"],
        "tags": ["linked list","hash table"],
        "url": "https://kavoom2.github.io/data%20structure/data-structure-02/",
        "teaser": null
      },{
        "title": "자료구조(Data Structure) - Tree, Binary search tree",
        "excerpt":"1. 트리(Tree) 먼저 트리의 구성요소를 살펴보도록 하자. 노드(Node): 데이터가 담기는 공간. 도식 상에서는 점으로 표시한다. 엣지(Edge): 노드와 노드 사이를 연결한 선. 노드 사이의 관계를 나타낸다. 높이(Height): 최상단에 위치한 루트노드(root)를 기준으로 최하단에 위치한 노트에 이르는 가장 경로 중 가장 긴 경로이다. 레벨(Level): 루트 노트를 기준으로 해당 노드가 어떤 깊이에 있는지 나타낸다....","categories": ["Data Structure"],
        "tags": ["tree","binary search tree"],
        "url": "https://kavoom2.github.io/data%20structure/data-structure-03/",
        "teaser": null
      },{
        "title": "깊이 우선 탐색(Depth-First Search)와 되추적(Backtracking)을 활용한 Nqueens 문제해결",
        "excerpt":"1. 너비 우선 탐색(Breadth-first search) 루트 노드에서 시작하여 인접한 노드를 먼저 탐색하는 방법이다. 현재 탐색할 레벨에 있는 노드를 모두 방문한 뒤에 다음 레벨에 있는 노드를 탐색한다. 아래 트리를 탐색하는 순서는 root, 1, 2, 3, 4, 5, 6이다. 너비 우선 탐색은 깊이 탐색하기 전에 넓게 탐색한다. 주로 두 노드 사이의 최단경로나...","categories": ["Data Structure","Algorithm"],
        "tags": ["nqueens","depth-first search","breadth-first search"],
        "url": "https://kavoom2.github.io/data%20structure/algorithm/nQueens/",
        "teaser": null
      },{
        "title": "코딩 테스트 - 2 x N 타일링",
        "excerpt":"개요 가로의 길이가 2이고, 세로의 길이가 1인 직사각형 모양의 타일이 있다. 이 타일들로 가로의 길이가 2이고 세로의 길이가 n인 바닥을 가득 채울 수 있는 방법의 수를 반환해야한다. 조건 가로의 길이 n은 60,000이하 자연수이다. 경우의 수가 많아질 수 있으므로 경우의 수를 1,000,000,007로 나눈 나머지를 반환해야 한다. 풀이 귀납적으로 n = 1,...","categories": ["Algorithm"],
        "tags": ["programmers"],
        "url": "https://kavoom2.github.io/algorithm/algorithm-2xN-tile-placing/",
        "teaser": null
      },{
        "title": "코딩 테스트 - 크레인 인형뽑기 게임",
        "excerpt":"개요 N x N 게임판 매트릭스와 매 라운드마다 크레인이 어디서 인형을 뽑을지 적혀있는 배열이 주어진다. 매 라운드마다 인형을 뽑는다면(그 칸이 비어있지 않다면), 뽑은 인형을 바구니로 옮기게 된다. 인형은 바구니 아래부터 차곡차곡 쌓이게 된다. 이때 동일한 인형이 나란히 쌓이게 되면, 이 인형들은 바구니에서 제거되고 그 갯수만큼 점수를 얻게 된다. 라운드가 끝났을...","categories": ["Algorithm"],
        "tags": ["programmers"],
        "url": "https://kavoom2.github.io/algorithm/algorithm-claw-crane-game/",
        "teaser": null
      },{
        "title": "코딩 테스트 - 문자열 압축",
        "excerpt":"개요 문자열을 1에서 문자열 길이 절반 길이까지의 단위로 나누어 압축하였을 때 가장 짧은 길이가 무엇인지 반환하는 함수를 작성해야 한다. 조건 문자열의 압축은 제일 앞이 우선순위이다. 항상 정해진 길이만큼 잘라야 한다. 문자열의 길이는 1 이상 1,000 이하이다. 문자열은 알파벳 소문자로만 이루어져 있다. 풀이 처음에 문제를 푸는 방법을 잘못 잡았다. 직접 압축을...","categories": ["Algorithm"],
        "tags": ["programmers"],
        "url": "https://kavoom2.github.io/algorithm/algorithm-compressing-strings/",
        "teaser": null
      },{
        "title": "코딩 테스트 - 완주하지 못한 선수",
        "excerpt":"개요 수 많은 선수들이 마라톤에 참여했다. 단 “한 명”의 선수를 제외하고 모든 선수가 완주했다. 완주하지 못한 선수의 이름을 반환하는 함수를 작성하면 된다. 조건 참여한 선수의 수는 1명 이상 100,000명 이하이다. 항상 완주하지 못한 선수는 한 명뿐이다. 참가자 중 동명이인이 있을 수 있다. 풀이 설명을 잘 보고 이해해야 한다는 것을 다시...","categories": ["Algorithm"],
        "tags": ["programmers"],
        "url": "https://kavoom2.github.io/algorithm/algorithm-find-marathon-looser/",
        "teaser": null
      },{
        "title": "코딩 테스트 - 기능개발",
        "excerpt":"개요 각 기능은 진도가 100%가 되면 배포할 수 있다. 단, 개발속도와 작업진도는 작업마다 다르다. 이 때, 배열 progress는 배포되어야 하는 순서대로 작업의 진도가 요소로 담겨있다. 그리고 각 요소의 작업속도가 담긴 배열 speed가 주어진다. 매번 배포할 때마다 몇 개의 기능이 배포되는지를 요소로 담은 배열을 반환해야 한다. 조건 작업 진도는 100 미만의...","categories": ["Algorithm"],
        "tags": ["programmers"],
        "url": "https://kavoom2.github.io/algorithm/algorithm-function-development/",
        "teaser": null
      },{
        "title": "코딩 테스트 - 다리를 지나는 트럭",
        "excerpt":"개요 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 알아내야 한다. 1차 선이므로 트럭의 순서는 바꿀 수 없다. 트럭은 매 초마다 1칸 씩 움직이며, 다리의 길이는 n칸이다. 또한, 다리가 견딜 수 있는 최대무게와 각 트럭의 무게가 주어진다. 다리에는 버틸 수 있는 무게까지만 트럭들이 올라갈 수 있다. 조건 다리길이는 1 이상...","categories": ["Algorithm"],
        "tags": ["programmers"],
        "url": "https://kavoom2.github.io/algorithm/algorithm-passing-through-trucks/",
        "teaser": null
      },{
        "title": "코딩 테스트 - 신규 아이디 추천",
        "excerpt":"개요 입력한 아이디를 특정 규칙에 맞는 새로운 아이디로 추천해주는 함수를 작성해야 한다. 조건 총 7단계를 거쳐 규칙에 맞는 새로운 아이디를 반환한다. 자세한 내용은 문제참조. 풀이 친절하게 각 단계를 적어준 문제이다. 그럼에도 시간을 굉장히 많이 허비했다는 것에 자괴감을 느낀다….. 꼼꼼하게 예외 케이스를 생각하는 습관을 기르지 않은 것이 원인이라고 생각한다. 풀이를 저장한...","categories": ["Algorithm"],
        "tags": ["programmers"],
        "url": "https://kavoom2.github.io/algorithm/algorithm-recommend-new-id/",
        "teaser": null
      },{
        "title": "코딩 테스트 - 두 개 뽑아서 더하기",
        "excerpt":"개요 정수 배열이 주어진다. 배열 안에 서로 다른 인덱스의 두 수를 뽑아서 더한다. 이 과정으로 만들 수 있는 모든 수를 배열에 오름차순으로 담아 반환해야 한다. 조건 배열의 길이는 2 이상 100 이하이다. 생각보다 많이 작다… 즉, 이 문제는 시간복잡도보다 중복되는 값을 어떻게 처리할 것인가에 집중한다. 풀이 중복되는 값을 처리하기 위해...","categories": ["Algorithm"],
        "tags": ["programmers"],
        "url": "https://kavoom2.github.io/algorithm/algorithm-select-two-and-merge/",
        "teaser": null
      },{
        "title": "코딩 테스트 - 스킬트리",
        "excerpt":"개요 스킬트리에는 선행스킬이라는 것이 있다. 선행 스킬이란 어떤 스킬을 배우려면 먼저 배워야 하는 스킬을 의미한다. 물론, 순서에 상관없이 배울 수 있는 스킬도 있다. 이 문제에서는 선행스킬 순서가 적인 문자열과 유저들이 만든 스킬트리를 담은 배열이 주어진다. 유저 스킬트리 순서대로 배웠을 때, 가능한 스킬트리의 총 갯수를 반환하는 함수를 작성하면 된다. 조건 선행스킬...","categories": ["Algorithm"],
        "tags": ["programmers"],
        "url": "https://kavoom2.github.io/algorithm/algorithm-skill-tree/",
        "teaser": null
      },{
        "title": "코딩 테스트 - 멀쩡한 사각형",
        "excerpt":"개요 가로 길이 Wcm, 세로 길이 Hcm인 모눈종이 사각형이 있다. 격자 칸의 크기는 1cm x 1cm이다. 좌측상단 꼭지점에서 우측하단 꼭지점을 이은 직선으로 종이를 잘랐다. 이 때 온전한 1cm x 1cm 정사각형의 갯수를 구하는 문제이다. 조건 W, H는 100,000,000이하의 자연수이다. 풀이 예제 그림을 보니 단위사각형으로 나눌 수 있다는 것을 확인했다. 그리고...","categories": ["Algorithm"],
        "tags": ["programmers"],
        "url": "https://kavoom2.github.io/algorithm/algorithm-ternery-abnormal-rectangle/",
        "teaser": null
      },{
        "title": "코딩 테스트 - 124 나라의 숫자",
        "excerpt":"개요 우리가 일반적으로 알고 있는 10진법 숫자를 3진법으로 바꾸는 문제이다. 다만, 수를 표현할 때 1, 2, 4만을 사용한다. 자연수 n을 요상한 3진법을 사용하여 바꾼 값을 반환하면 된다. 조건 자연수 n은 500,000,000이하의 자연수이다. 매우 크다. 풀이 진수법 알고리즘을 귀납적으로 도출하느라 삽질을 했는데, 알고보니 고등수학 때 배웠던 방법을 써먹으면 된다. 수학을 놓은지...","categories": ["Algorithm"],
        "tags": ["programmers"],
        "url": "https://kavoom2.github.io/algorithm/algorithm-ternery-base-3/",
        "teaser": null
      },{
        "title": "코딩 테스트 - 모의고사",
        "excerpt":"개요 3명의 수포자가 각각 맞춘 문제를 파악하고, 가장 많은 문제를 맞춘 사람을 오름차순 순으로 반환해야 하는 문제이다. 조건 문제의 답은 1, 2, 3, 4, 5 중 하나이다. 또한, 각자 정해진 규칙에 따라 문제를 찍는다. 자료의 크기는 최대 10,000이다. 즉, 최대 30,000번까지 탐색을 해야한다. 가장 높은 점수를 받은 사람이 여러명일 경우,...","categories": ["Algorithm"],
        "tags": ["programmers"],
        "url": "https://kavoom2.github.io/algorithm/algorithm-test/",
        "teaser": null
      },{
        "title": "코딩 테스트 - 삼각 달팽이",
        "excerpt":"개요 정수 n이 매개변수로 주어진다. 밑변의 길이와 높이가 각각 n인 삼각형에서 맨 위 꼭지점부터 반시계 방ㄴ향으로 달팽이 채우기를 한다. 만들어진 삼각형의 첫 행부터 마지막 행까지 순서대로 합친 배열을 반환해야 한다. 조건 n은 1 이상 1,000 이하이다. 풀이 이 삼각형은 달리 생각하면 밑변과 높이가 n인 삼각형으로 치환할 수 있다. 그 말인...","categories": ["Algorithm"],
        "tags": ["programmers"],
        "url": "https://kavoom2.github.io/algorithm/algorithm-triangle-snail/",
        "teaser": null
      },{
        "title": "비동기 호출 - Callback, Promise, Async",
        "excerpt":"비동기 호출이란 특정 코드의 연산이 끝날 때까지 실행을 멈추지 않고, 다음 코드를 먼저 실행하는 자바스크립트의 작동방식이다. 가령, 클라이언트가 서버에서 데이터를 요청한다고 해보자. 서버로 데이터를 요청하면 응답이 언제 올지는 명확히 알 수 없다. 요청을 보내놓고 무작정 기다리기보다 다른 코드를 실행하는 것이 나을 것이다. 1. 콜백(Callback) setTimeout은 비동기 처리의 대표적 예시이다. 코드를...","categories": ["Javascript"],
        "tags": ["asynchronous"],
        "url": "https://kavoom2.github.io/javascript/asynchronous/",
        "teaser": null
      },{
        "title": "자바스크립트 이벤트 루프",
        "excerpt":"   원본영상    직접 해볼 수 있는 사이트  ","categories": ["Javascript"],
        "tags": [],
        "url": "https://kavoom2.github.io/javascript/Event-loop/",
        "teaser": null
      },{
        "title": "클라이언트와 서버의 통신",
        "excerpt":"1. 클라이언트 서버 아키텍쳐 쇼핑몰 앱을 이용하는데 상품 목록이나 정보를 바꾸려고 앱을 다시 받는 것은 그다지 좋은 경험이 아닐 것이다. 그래서 데이터 업데이트가 빈번하게 일어나는 환경에서는 리소스를 보관하는 공간과 리소스를 사용하는 앱을 분리하는 것이 효율적이다. 리소스를 사용하는 앱을 클라이언트(Client), 리소스가 존재하는 곳을 서버(Server)라고 한다. 이러한 통신형태를 클라이언트 서버 아키텍쳐(Client-Server Architecture)라고...","categories": ["Server"],
        "tags": ["http","protocol","api","ajax"],
        "url": "https://kavoom2.github.io/server/interaction-client-server/",
        "teaser": null
      },{
        "title": "브라우저 보안",
        "excerpt":"1. XXS flowchart LR C([Attacker Web Browser]) --&gt;|sends XXS payload| D[Server] D &lt;--&gt;|victim views XXS payload| E([Victim Web Browser]) 클라이언트가 서버를 신뢰하기 때문에 발생하는 보안이슈이다. 클라이언트는 서버로 부터 받는 데이터를 정상 데이터라고 생각하고 일방적으로 받아들인다. 그리고 서버에서 받은 리소스를 처리하여 돔 오브젝트에 반영한다. 스크립트 인젝션(Script Inject) 공격은 이러한 방식의 취약점을...","categories": ["Server"],
        "tags": ["cors","xxs"],
        "url": "https://kavoom2.github.io/server/CORS-XXS/",
        "teaser": null
      },{
        "title": "HTTP - URL구조",
        "excerpt":"URL(Uniform Resource Locator)은 웹 서버가 리소스를 고유하게 식별할 수 있도록 하는 것. 일반적으로 다음과 같은 구조이다.     http://www.google.com/search?q=puppies#p2      scheme: http, https, ssh, git   host: google.com, localhost, 192.168.1.1   subdomain: www, mail, blog   path: search, about.html, blog/entries/2/big-day   query string: q=puppies&amp;ref=mobile&amp;page=4   hash fragment: p2, FAQ, /profile/edit   Rest, HTTP Verbs  ","categories": ["HTTP"],
        "tags": [],
        "url": "https://kavoom2.github.io/http/HTTP-TIL/",
        "teaser": null
      },{
        "title": "React",
        "excerpt":"React는 컴포넌트 단위로 어플리케이션을 설계할 수 있도록 하는 자바스크립트 라이브러리이다. 튜토리얼은 공식 홈페이지에 잘 설명되어있으니 꼭 읽어보도록 하자. 1. JSX와 앨리먼트 랜더링 JSX는 자바스크립트를 확장한 문법이다. JSX로 작성한 스크립트는 해석할 수 있도록 자바스크립트 컴파일러 라이브러리 바벨이 변환하게 된다. JSX를 사용하면 아래와 같이 엘리먼트(element)를 생성하여 변수에 할당하거나 반환을 할 수 있다....","categories": ["React"],
        "tags": [],
        "url": "https://kavoom2.github.io/react/React/",
        "teaser": null
      },{
        "title": "Database - MySQL",
        "excerpt":"1. 데이터베이스의 필요성 In-Memory: 자바스크립트 변수에 할당하는 방식. 배열에 넣는 방법이 이 방식이다. 프로그램이 종료되면 데이터도 같이 없어진다. 데이터 수명의 프로그램의 수명에 의존하게 됨. File I/O: 파일을 읽어오는 방식 파일을 매번 읽어야 한다는 것이 단점. 파일 크기가 커질 수록 버거워진다. 파일이 손상되거나 여러 파일을 동시에 다뤄야 하는 등 복잡하고 데이터양이...","categories": ["MySQL","Database"],
        "tags": [],
        "url": "https://kavoom2.github.io/mysql/database/Database-MySQL/",
        "teaser": null
      },{
        "title": "React + Redux",
        "excerpt":"컴포넌트 구성이 깊고 복잡해지면서, 소위 드릴링이라고 하는 부모 컴포넌트의 상태 전달이 굉장히 번거로워진다. React에서도 Context API로 드릴링 없이 부모의 상태를 가져올 수 있긴 하다. Redux도 Context API를 가지고 만든 라이브러리인지라, 전역상태 관리 측면에서는 거의 차이점이 없다고 한다. Redux는 전역상태관리 외에도 다양한 기능을 제공하며, 확장성이 뛰어나다. // index.js import React from...","categories": ["React","Redux"],
        "tags": [],
        "url": "https://kavoom2.github.io/react/redux/Redux/",
        "teaser": null
      },{
        "title": "소프트웨어 설계에서 디자인 패턴",
        "excerpt":"1. MVC MVC는 Model View Controller의 약자로 애플리케이션을 세 가지 역할로 구분하는 개발 방법론. 사용자가 Controller를 조작하면, Controller는 Model을 통해 데이터를 가져온다. 가져온 정보를 바탕으로 시각적 표현을 담당하는 View를 제어하여 사용자에게 전달한다. Web에서 MVC를 적용하면 다음 과정을 거치게 된다. 사용자가 웹 사이트에 접속 Controller는 사용자가 요청한 웹페이지를 서비스하고자 모델을 호출...","categories": ["MVC","Sequelize"],
        "tags": ["design pattern"],
        "url": "https://kavoom2.github.io/mvc/sequelize/MVC-design-patterns/",
        "teaser": null
      }]
