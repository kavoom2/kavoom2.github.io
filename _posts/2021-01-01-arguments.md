---
title: "Arguments와 Rest parameter"
excerpt: "전달인자 참조 객체의 종류와 활용"
classes: wide

categories:
  - Javascript101
---


## 1. arguments 
arguments는 함수에 전달한 인자들을 참조하는 객체입니다. 

````
function foo(a, b, c) {
  console.log(arguments[0]); // 1
  console.log(arguments[1]); // 2
  console.log(arguments[2]); // 3
};
foo(1, 2, 3);;
````

arguments은 유사배열입니다. 배열처럼 인덱스는 0에서부터 시작하며, 각 인수를 설정하거나 재할당할 수 있습니다.

> arguments[0]; // arguments의 0번째 인덱스    
> arguments[1]; // arguments의 1번째 인덱스    
> arguments[2] = 'new value'; // arguments의 2번째 인덱스 값을 'new value'로 설정 또는 재할당

arguments 객체는 Array가 아닙니다. 배열에서 사용할 수 있는 pop(), shift() 등 프로퍼티를 가지고 있지 않습니다. 대신, 다음과 같은 방법으로 arguments를 배열로 변환할 수 있습니다.

> let arg = Array.prototype.slice.call(arguments);    
> let args = Array.from(arguments);    
> let args = [...arguments];

## 1.1. 예제
arguments 객체는 다음과 같이 전달인자를 변수에 할당하기 힘든 상황에서 유용합니다.
````
let memoize = function (func) {
  let cache = {};
  let result;

  return function() {
    let args = Array.prototype.slice.call(arguments);
    if ( args in cache ) {
    return cache[args];
    }
    else {
    cache[args] = func.apply.(null, args);
    };
  };
};

const add = memoize(function(a,b) {
  return a + b;
});

add(2, 3); // 5
add(5, 8); // 13
````


함수 memoize는 어떤 함수에 이전에 전달받은 인자들을 다시 받으면, 즉시 함수 내에 저장한 결과값을 출력합니다. 어떤 인자를 입력했을 때, 그 인자가 한 번 이상 입력받았는지 확인해야 합니다. 즉, 현재 받은 인자가 캐시 안에 있는지 여부를 판단해야 합니다.

변수 add는 memoize가 반환한 함수 function() {.....}이 할당되어 있습니다. add(2, 3)을 입력하면, arguments 객체는 전달인자 2, 3을 참조합니다.

## 2. Rest parameter
Rest parameter는 정해지지 않은 수의 인자를 배열로 나타냅니다. 

````
function foo(a, b, ...args) {
  console.log('a', a);
  console.log('b', b);
  console.log('args', args);
};

foo('one', 'two', 'three', 'four', 'five', 'six');

// a, one
// b, two
// args, [three, four, five, six]
````

함수의 마지막 매개변수에 **...**을 붙여 모든 나머지 인자들을 배열로 대체합니다. 위 예제는 a, b를 제외한 나머지 인자들을 args 배열로 대체합니다.

arguments 객체와 달리 Rest parameter는 실제 배열이며, 배열의 모든 속성에 접근할 수 있습니다. Array의 인스턴스이므로 sort, map, forEach, pop 등 메소드를 바로 적용할 수 있습니다.

````
// 위 예제와 동일한 함수를 사용

foo('one', 'two');
// a, one
// b, two
// args, []
````

한편, Rest parameter에 인자를 넣지 않으면 args은 빈배열이 됩니다.

# Reference
*https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/rest_parameters
*https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/arguments
