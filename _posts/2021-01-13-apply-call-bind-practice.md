---

title: call, apply, bind 유용한 예제

excerpt: "call, apply, bind의 활용법"

classes: wide

  

last_modified_at: 2021-01-13T22:00:00
use_mermaid: true
use_math: true

categories:
- Javascript
tags:
- TIL
- this
- apply
- bind
- call
---
## call, apply 활용
call, apply 함수를 사용하면 유사객체도 객체의 메소드를 사용할 수 있다.
querySelector 리턴값 NodeList는 대표적인 유사객체이다. 배열 내부에 길이 속성이 있어 length 메소드를 사용할 수 있지만, 배열의 고유 메소드인 map, forEach 등은 직접 사용할 수 없다. 하지만 아래 예제에서 볼 수 있듯이 apply, call, bind로 메소드를 빌려서 사용할 수 있다.
```js
let allDivs = document.querySelectorAll("div") // nodeList는 유사배열이다.
console.log(allDivs.length) // 유사배열이지만 길이 속성이 있으므로 nodeList 길이를 출력한다
Arrray.prototype.map.call(allDivs, (el) => {
    return el.className;
});
````

## bind 활용
### 1. 이벤트 핸들러(Event Handler)
bind는 this에 바인딩한 새로운 함수를 리턴한다. 즉시 실행하는 apply, call과의 차이점이다.
아래 예제에서 이벤트 핸들러에서 this는 HTML element인 `<button>...</button>`을 가리킨다.
```js
let btn = document.querySelector("#btn");
btn.onclick = handleClick;
function handleClick() {
    console.log(this); // <button>...</button>
}
````
이는 this를 사전에 바인딩 해놓으면 해결할 수 있다.
```js
btn.onclick = handleClick.bind(obj) // console.log(this)는 obj를 출력함
````
Hire Assessment 4번 문제를 풀 때, 이전에는 이벤트핸들러를 익명함수 내부에서 실행시켰다. 위 내용을 바탕으로 bind를 사용하여 수정하였다.
```js
function test4(arr) {
  // TODO: 여기에 코드를 작성합니다.
  let ulElement = document.querySelector("#container");

  arr.forEach( (user) => {
    let liElement = document.createElement("li");
    let aElement = document.createElement("a");
    let divElement = document.createElement("div");

    aElement.classList.add("name");
    aElement.textContent = `${user.firstName} ${user.lastName}`;
    aElement.addEventListener("click", printRole.bind(null, user)); // 익명함수 대신 bind 함수를 사용함.

    divElement.classList.add("age");
    divElement.textContent = user.age;

    liElement.append(aElement, divElement);
    ulElement.append(liElement);
  })
}
````

### 2. setTimeout
setTimeout의 콜백함수는 다른 실행 컨텍스트에서 실행된다. this를 호출하면 전역객체 Windows를 출력한다.

```js
class Rectangle {
  constructor(width, height) {
    this.area = width * height;
  }

  printArea() {
    console.log(this.area);
  }

  printAsync() {
    setTimeout(this.printArea, 1000)
  }
}

let board = new Rectangle(10, 20);
board.printAsync() // this가 windows 전역객체이므로 Error 발생
````
예전에는 익명함수를 사용했지만, 이제 bind를 사용할 수 있다. 콜백함수의 this를 인스턴스로 바인딩한다. 프로토타입 함수 내부이므로 this를 bind 함수의 인자로 전달하면 된다.
```js
// 예시 1. bind
printAsync() {
  setTimeout(this.printArea.bind(this), 1000)
}
````
다른 방법으로는 화살표 함수가 있다. 화살표 함수의 this는 상위스코프의 this를 가리킨다는 것을 활용하자. 화살표 함수의 상위스코프는 인스턴스의 프로토타입 함수이기 때문에 this가 인스턴스로 바인딩된다.
```js
// 예시 2. 화살표 함수
printAsync() {
  setTimeout( () => this.printArea, 1000)
}
````