---

title: 객체지향 프로그래밍(Object Oriented Programming)

excerpt: "객체지향 프로그래밍의 정의와 특징"

classes: wide

  

last_modified_at: 2021-01-14T18:00:00
use_mermaid: true

categories:
- Javascript
tags:
- OOP
---
일생생활을 돌아보면 수많은 대상이 있다. 동물, 물건 등이 있다. 대상들은 저마다 특성과 기능을 가지고 있는데, 가령 스마트폰을 예로 들어보자. 대상의 형태, 색상 등을 나타내는 "특성"과 어플리케이션 실행, 종료 등 "기능"을 가지고 있다. 그리고 같은 핸드폰이라도 아이폰과 갤럭시 노트 S20의 특성과 기능을 차이가 있다. 

객체지향 프로그래밍은 프로그램을 이러한 대상들의 모임으로 보는 방법론이다. 그리고 유사한 특징과 기능을 가지고 있는 객체는 하나의 집단으로 묶는다.

예시로 들었던 스마트폰을 다시 살펴보자. 개개인이 소유한 스마트폰은 기종과 색상이 각양각색이다. 이를 객체지향 프로그래밍에서는 다음과 같이 나타낼 수 있다.
```js
class SmartPhone() {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
}
let galaxyNoteS20 = new SmartPhone("galaxyNoteS20", "red")
let iPhone12Pro = new SmartPhone("iPhone12Pro", "white")
````


## 2. 객체 지향 프로그래밍의 특징
### 2. 1. 캡슐화(Encapsulation)
캡슐화는 변수와 함수를 하나의 단위로 묶는 것이다. 자바스크립트에서는 클래스라는 개념으로 구현할 수 있다. 클래스의 인스턴스를 생성하면 클래스 안에 담겨있는 특징, 기능에 쉽게 접근할 수 있다.
```js
class Speaker {
    constructor(color) {
        this.color = color;
        this.volume = 50;
    }
    volumeUp() {
        this.volume += 10;
    }
    volumeDown() {
        this.volume -= 10;
    }
    printVolume() {
        return this.volume;
    }
    printColor() {
        return this.color;
    }
} 

speaker = new Speaker("black")

speaker.volumeUp()
speaker.printVolume() // 40
speaker.printColor() // "black"

speaker.volume = 0;
speaker.printVolume() // 0
````
클래스 스피커 안에 각 인스턴스의 특징(색상, 볼륨크기)은 변수, 기능은 메소드로 구현된다. 인스턴스 speaker에서 각 기능을 쉽게 사용한 것을 확인할 수 있다.

캡슐화는 구체적인 정보가 외부로 노출되는 것을 최소화하기도 한다. 이를 정보은닉이라고 하는데, 클래스 외부에서 특정 값에 직접 접근하지 못하고, 오직 메소드로만 접근 가능하도록 하는 것이다.

그런데, 마지막 부분에서 인스턴스 speaker.volume으로 접근하여 값을 변경하였다. 캡슐화는 내부 값에 직접 접근할 수 없다고 하지 않았던가. 자바스크립트에서는 Private 속성을 사용할 변수를 정해주어야 한다.

```js
class Speaker {
    #volume = 50;
    constructor(color) {
        this.color = color;
    }
    volumeUp() {
        this.#volume += 10;
    }
    volumeDown() {
        this.#volume -= 10;
    }
    printVolume() {
        return this.#volume
    }
    printColor() {
        return this.color;
    }
} 

speaker.volumeUp()
speaker.printVolume() // 60
speaker.#volume // Syntax Error: Private Field
````
속성명 앞에 #을 붙이면 Private필드로 동작한다. 특이한 점은 자식 인스턴스도 부모 클래스의 private 속성에 접근할 수 없다는 것이다. 자세한 내용은 다음 [**링크**](https://ui.toast.com/weekly-pick/ko_20200312)를 참조하길 바란다.

### 2. 2. 추상화(Abstraction)
스피커 볼륨을 조절한다고 하자. 사용자는 버튼을 조작하면서 볼륨을 조절한다. 하지만, 어떤 원리로 스피커 볼륨이 커지거나 줄어드는지 정확히 알지 못한다. 객체의 복잡한 기능을 사용자가 손쉽게 사용할 수 있도록 구현하는 작업을 추상화라고 한다. 

### 2. 3. 상속(Inheritance)
상속은 부모 클래스의 특징과 속성을 자식 클래스에게 그대로 물려주는 것을 말한다. 개, 사람, 고양이는 동물이고, 이들 모두 말할 수 있다. 이를 예제로 한 번 살펴보자.
```js
class Animal {
    constructor(name) {
        this.name = name;
    }
    talk() {
        return (`${this.name} is talking`);
    }
}

class Human extends Animal {}
class Cat extends Animal {}
class Dog extends Animal {}

let james = new Human("james");
let navi = new Cat("navi");
let baekgoo = new Dog("baekgoo");

console.log(james.name) // james
navi.talk() // navi is talking

baekgoo.__proto__.talk === Animal.prototype.talk // true
````
예제에서는 사람, 개, 고양이에게 어떠한 특징과 기능을 설정하지 않았음에도 this.name과 talk이 정상적으로 받아 값을 출력한 것을 확인할 수 있다.. 이처럼 자식 인스턴스는 부모 클래스의 특징과 기능을 그대로 상속받을 수 있다.

### 2. 4. 다형성(Polymorphism)
다형성은 하나의 메소드를 다양한 방법으로 동작시킬 수 있도록 하는 것을 말한다. 사람, 개, 고양이는 모두 동물이며 말을 할 수 있지만 그 방식에는 차이가 있다. 사람은 다양한 단어를 섞어가며 대화를 하고, 고양이는 울음소리를 낸다. 다시 한 번 코드를 수정해보자.

```js
class Animal {
    constructor(name) {
        this.name = name;
    }
    talk() {
        return (`${this.name} is talking`);
    }
}

class Human extends Animal {
    talk(word) {
        return `${super.talk()}, "${word}"`;
    }
}

class Cat extends Animal {
    talk() {
        return `${super.talk()}, "meow"`;
    }
}

james = new Human("james");
navi = new Cat("navi");

james.talk("blah") // james is talking, "blah"
navi.talk() // navi is talking, "meow"
````

## 3. Javascript에서 객체 생성방법
자바스크립트에서 객체는 키(key)와 값(value)의 쌍으로 구성된 속성들의 집합이다. 객체지향을 구현하고자 프로토타입 객체의 속성(Property)와 메소드(Method)를 상속받을 수 있다. 속성과 메소드의 차이는 어떤 값이 할당되어 있는지이다. 값(value)가 함수이면 메소드라고 부른다.

### 3. 1. 객체 리터럴
일반적인 객체 생성 방식이다.
```js
const emptyObj = {}; 
const person = {
    name: "James",
    age: 26,
    sayHello: function () {
        console.log(`Hi, My name is ${this.name}`);
    }
};

person.sayHello(); // Hi, My name is James
````

### 3. 2. Object 생성자 함수
Object 생성자 함수로  새로운 객체를 생성하고 초기화할 수 있다.
```js
const person = new Object();
person.name = 'James';
person.age = 26
person.sayHello = function () {
    console.log(`Hi, My name is ${this.name}`);
}

person.sayHello(); // Hi, My name is James
````

### 3. 3. 생성자 함수
위 두 가지 방법은 동일한 속성, 메소드를 갖는 함수를 일일이 기술해야한다. 생성자 함수는 유사한 속성, 기능을 가진 객체를 간편하게 생성할 수 있도록 한다. 또한, 생성자 함수 내부에서 선언한 일반변수는 외부 참조가 불가능하다. 객체기반 프로그래밍의 정보은닉 기능을 구현할 수 있는 방법이니 참고하자.
```js
function Person(name, age) {
    let isMarried = true; 
    this.name = name;
    this.age = age;
    this.sayHello = function () {
        console.log(`Hi, My name is ${this.name}`);
    }
}
const person = new Person("Nick", 10);
const person1 = new Person("James", 26);
const person2 = new Person("Jack", 33);

console.log(person1.married) // undefined
````
다만, 이러한 방법으로는 person1과 person2의 sayHello 함수가 서로 다른 컨텍스트 상에 있으므로 메모리 점유측면에서 비효율적이다. 이러한 문제를 해결하려면 프로토타입이 무엇인지 알아야 한다.

## 4. 프로토타입(Prototype)
자바스크립트의 객체는 부모 객체와 연결되어 있다. 상속, 다형성에서 볼 수 있듯이 부모의 속성, 메소드에 접근할 수 있다. 프로토타입 객체는 각각의 객체가 속성 ,함수 메소드를 공유할 수 있도록 한다.

`__proto__(프토로타입 링크)`는 모든 객체가 가지고 있는데, 부모 객체의 프로토타입을 가리킨다.
```js
person.__proto__ === Person.prototype // true
Person.__proto__ === Function.prototype // true
````
`prototype "객체"`는 `constructor` 속성을 갖고 있다. 이 속성은 자신을 생성한 부모객체를 지칭한다. 일반적으로 프로토타입이라 하면 **프로토타입 객체가 아닌 프로토타입 링크**를 지칭한다.
```js
Person.prototype.constructor === Person // true
person.construtor === Person // true
Person.constructor === Function // true
````
이제 거의 다 왔다. 특정 객체의 속성이나 메소드에 접근하려고 할 때, 해당 객체에 존재하지 않으면 `__proto__`가 지칭하는 부모 객체를 순차적으로 탐색한다.이를 **프로토타입 체인(Prototype Chain)**이라고 한다.

```js
class Human {
    constructor(name) {
        this.name = name;
    }
    talk() {
        return (`${this.name} is talking`);
    }
}
james = new Human("james");
james.talk() // james is talking
````
상속을 설명하면서 들었던 예제를 간단히 변형했다. 인스턴스 james가 talk을 호출할 수 있었던 것은 `__proto__`이 가리키는 객체를 따라 프로토타입 객체의 메소드를 호출했기 때문이다.

```js
james.__proto__ === Human.prototype // true
james.talk === Human.prototype.talk // true

Human.prototype.__proto__ === Object.prototype // true
Function.prototype.__proto__ === Object.prototype // true
````
정확한 모델을 보고 싶다면 [이 글](http://insanehong.kr/post/javascript-prototype/)울 참고하도록 하자.   

<img src = "https://drive.google.com/uc?export=view&id=1ezkZIxtJEQXrbS2EAa2soCtyGPrdp1G4">
<div class = "mermaid">
graph LR
A(["james"]) --> B["james.__proto__"]
B --- C["Human.prototype"]
C --> D["Human.prototype.constructor"]
D --- E(["Human"])
C --> G["Human.prototype.__proto__"]
G --- H["Object.prototype"]
I(["Human"]) --> J["Human.__proto__"]
J --- K["Function.prototype"]
K --> L["Function.prototype.__proto__"]
L --- H
</div>



## 4. Reference
[PoiemaWeb - 객체](https://poiemaweb.com/js-object)    
[PoiemaWeb - 프로토타입](https://poiemaweb.com/js-prototype)    
[[Javascript] 프로토타입 이해하기](https://medium.com/@bluesh55/javascript-prototype-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f8e67c286b67)    
[Javascript 기초 - Object prototype 이해하기](http://insanehong.kr/post/javascript-prototype)