---

title: 클래스 예제 - Beesbeesbees

excerpt: "스프린트 과제로 배우는 클래스 상속구현"

classes: wide

  

last_modified_at: 2021-01-15T18:00:00

categories:
- Javascript
tags:
- class
- instance
- inheritance
- TIL
---
## 1. ECMAScript6 Class문법에서 속성과 메소드 상속
ECMAScript6 문법에서 Class 상속은 다음과 같이 표현할 수 있다. Constuctor와 메소드에서 super가 어떻게 사용되는지 유심히 살펴보자.
> 1. 생성자에서 부모 클래스의 속성과 메소드 상속 : super([arguments]);
> 2. 부모 클래스의 함수 호출 : super.functionOnParent([arguments]);    

```js
class Grub {
    constructor() {
        this.age = 0;
        this.color = "pink";
        this.food = "jelly";
    }
    eat() {
        return "Yummy";
    }
}

class Bee extends Grub {
    constructor () {
        super(); // Grub의 속성과 메소드를 상속받는다. this 키워드가 사용되기 전에 호출되어야 한다.
        this.age = 5;
        this.color = "yellow";
    }
    eat() {
        return `${super.eat()}, ${this.food} is so delicious..!` // 다형성을 구현할 수 있다.
    }
}
bee = new Bee();

bee.eat() // Yummy, jelly is so delicious..!

bee.__proto__ === Bee.prototype // true
Bee.prototype.__proto__ === Grub.prototype // true
````

## 2. ECMAScript5 Pseudoclasscal inheritance
레거시 코드로 구현해보자. 프로토타입 체인, 프로토타입 객체, 생성자의 관계를 이해해야 한다.

```js
var Grub = function () {
    this.age = 0;
    this.color = "pink";
    this.food = "jelly"
}

Grub.prototype.eat = function () {
    return "Yummy";
} // 메소드는 프로토타입에서 선언한다.

Grub.prototype.constructor = Grub; // 생성자와 Class를 연결한다.

var Bee = function () {
    Grub.call(this); // 부모 클래스의 속성값을 먼저 받아온다.
    this.age = 5;
    this.color = "yellow";
}

Bee.prototype = Object.create(Grub.prototype); // 
Bee.prototype.constructor = Bee;

Bee.prototype.eat = function () {
    return `${Grub.prototype.eat()}, ${this.food} is so delicious..!` // 다형성을 부모 객체의 메소드를 직접 불러와서 구현한다.
}

bee = new Bee();

bee.eat() // Yummy, jelly is so delicious..!

bee.__proto__ === Bee.prototype // true, 인스턴스의 원형객체는 부모클래스이다
Bee.prototype.__proto__ === Grub.prototype // true, 상속받을 클래스의 메소드를 공유할 수 있도록 프로토타입 객체끼리 연결해야 한다.
````
부모 클래스의 속성은 `Class.call(arguments)`로 불러왔으므로, 메소드만 참조할 수 있도록 연결하면 된다.

## 3. Reference
[MDN - super](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/super)    
[MDN - Inheritance in Javascript](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/Inheritance)