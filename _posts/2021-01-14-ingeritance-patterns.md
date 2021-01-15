---

title: 인스턴트 생성 패턴(Instantiation Patterns)과 클래스(Class)

excerpt: "클래스의 레거시 코드 구현과 클래스 기초문법"

classes: wide

  

last_modified_at: 2021-01-14T18:00:00

categories:
- Javascript
tags:
- class
- instance
---
## 1. 인스턴트 생성 패턴(Instantiation Patterns)
자바스크립트의 객체를 Pseudoclassical 방식이라고 한다. pseudo는 "가짜"라는 뜻을 지니고 있다. 직역하면 가짜로 Class 개념을 구현한다는 뜻이다. 자바스크립트에서는 어떤 편법(?)으로 클래스를 구현했는지 한 번 살펴보자.

### 1. 1. Functional
```js
const Person = function(name, age) {
    let Instance = {};
    Instance.name = name;
    Instance.age = age;
    Instance.printAll = function () {
        console.log(`이름은 ${this.name}, 나이는 ${this.age}살입니다`)
    }

    return Instance;
}
const james = Person("james", 20)
const peter = Person("peter", 35)
james.printAll() // 이름은 james, 나이는 20살입니다
peter.printAll() // 이름은 peter, 나이는 35살입니다
````
이 방식은 james와 peter의 메소드가 별개로 존재한다. 즉, 인스턴스 갯수가 많아질 수록 동일한 구동을 하는 함수가 메모리에서 차지하는 공간이 많아지게 되는 것. 이러한 문제를 다음에 나올 Functional Shared 방식으로 해결할 수 있다.


### 1. 2. Functional Shared
```js
const extend = function(to, from) {
    for (let key in from) {
        to[key] = from[key]
    }
}

const personMethods = {};
personMethods.printAll = function () {
    console.log(`이름은 ${this.name}, 나이는 ${this.age}살입니다`)
}
personMethods.changeName = function (name) {
    this.name = name;
}

const Person = function(name, age) {
    let Instance = {};
    Instance.name = name;
    Instance.age = age;
    
    extend(Instance, personMethods);
    return Instance;
}

const james = Person("james", 20)
const peter = Person("peter", 35)
peter.changeName("adam")

james.printAll() // 이름은 james, 나이는 20살입니다
peter.printAll() // 이름은 adam, 나이는 35살입니다
james.printAll === peter.printAll // true
````
메소드를 personMethods.printAll, personMethods.changeName의 주소값으로 전달하면 서로 다른 인스턴스도 공유할 수 있다. 인스턴스 james와 peter는 parentMethods에서 메소드를 공유하기 때문에 보다 적은 메모리를 사용한다.


### 1. 3. Prototypal
```js
const personMethods = {};
personMethods.printAll = function () {
    console.log(`이름은 ${this.name}, 나이는 ${this.age}살입니다`)
}
personMethods.changeName = function (name) {
    this.name = name;
}

const Person = function(name, age) {
    let Instance = Object.create(personMethods);
    Instance.name = name;
    Instance.age = age;
    return Instance;
}

const james = Person("james", 20)
const peter = Person("peter", 35)
peter.changeName("adam")

james.printAll() // 이름은 james, 나이는 20살입니다
peter.printAll() // 이름은 adam, 나이는 35살입니다

james.printAll === peter.printAll // true
james.__proto__ === Person.prototype // fales
james.__proto__ === personMethods // true
````
Object.create를 사용하면 지정한 객체를 프로토타입 객체로 갖는 객체를 만들 수 있다. 예제에서는 Instance가 personMethods를 프로토타입 객체로 갖는 객체가 되도록 하였다. 인스턴스마다 메소드 함수의 주소값을 할당하는 함수를 만들 필요가 없으니 훨씬 간결해졌다.

인스턴스의 프로토타입 링크를 따라가면 메소드를 공유하는 객체 personMethods와 연결되어 있음을 확인하였다. 이는 클래스 함수를 정의하면서 인스턴스의 프로토타입 객체를 personMethods로 설정하였기 때문이다. 객체 james, peter)는 함수 Person와 공유해야 할 속성이나 메소드를 가지고 있지 않다.



### 1. 4. Pseudoclassical
```js
const Person = function(name, age) {
    Instance.name = name;
    Instance.age = age;
}

const james = new Person("james", 20)
const peter = new Person("peter", 35)
peter.changeName("adam")

james.printAll() // 이름은 james, 나이는 20살입니다
peter.printAll() // 이름은 adam, 나이는 35살입니다
james.printAll === peter.printAll // true
````
new 키워드를 사용하면 인스턴스를 만들 수 있다. 원형 객체는 반드시 생성자(Constructor)가 있어야 하고, 없다면 `OOO is not a constructor`라는 오류를 반환한다. 함수가 아닌 객체는 생성자 자격이 없어 new 키워드를 사용할 수 없으니 참고하도록 하자.

모든 함수는 생성자 자격이 부여되고, 프토토타입 객체도 같이 생성되어 new 생성자를 사용할 수 있다. 예제에서는 new 키워드로 생성자 함수(Person)을 호출하여 인스턴스(james, peter)를 생성한다.

## 2. ES6 Class와 super 키워드
Class 문법은 ECMAScript6에서 구현한 객체지향 프로그래밍 방식이다. Class 사용법은 어느정도 알고 있으니 클래스 상속기능 등 알아두어야 할 기능을 정리한다.
### 2. 1. Private 필드 선언
```js
class Rectangle {
    #height;
    #width;
    constructor(height, width) {
        this.#height = height
        this.#width = width;
    }
    printArea() {
        console.log(this.#width * this.#height);
    }
}

box = new Rectangle(50, 100)
console.log(box.width) // undefined
console.log(box.#width) // SyntaxError: Private field "#width" must be declared in an enclosing class
box.printArea() // 5000
````
인스턴스의 속성은 Public 필드를 기본설정으로 한다. Private 필드로 선언하고자 하는 변수 앞에 #을 붙이면, 외부에서 임의로 변경하지 못하도록 할 수 있다. 예제 마지막 부분에서 볼 수 있듯이 프로토타입 객체의 메소드로는 접근할 수 있다.

### 2. 2. Sub classing
extends 키워드로 클래스를 선언하면 지정한 클래스의 자식 클래스를 생성할 수 있다.
```js
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(`${this.name} makes a noise.`)
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name); // name 매개변수를 전달한다.
    }
    speak() {
        console.log(`${this.name} barks.`);
    }
}

class Human extends Animal {

} // 부모 클래스의 생성자와 메소드가 동일하다면 비워둘 수 있다.

james = new Human("james")
bulldog = new Dog("navi")

james.speark() // james makes a noise.
bulldog.speak() // navi barks.
````

### 2. 3. super를 통한 상위 클래스 속성, 메소드 호출
super는 상위 클래스의 this로 바인딩해준다. 
```js 
class Polygon {
    constructor(height, width, name) {
        this.height = height;
        this.width = width;
        this.name = name
    }
    printArea() {
        return this.height * this.width;
    }
}

class Square extends Polygon {
    constructor(length, name) {
        super(length, length, name);
    }
    getArea() {
        return this.height * this.width;
    }
    printAll() {
        console.log(`넓이가 ${this.height * this.width}인 ${this.name}입니다.`)
    }
}

square = new Square(5, "정사각형");
square.printAll() // 넓이가 25인 정사각형입니다.
````
부모 클래스의 this.height, this.width, this.name에 값이 할당되었음을 확인하였다. 또한, 부모 클래스의 함수를 실행할 수 있다. 객체기반 프로그래밍의 특징 중 하나가 다형성이었다. 같은 메소드여도 다른 동작을 수행하도록 작성한 예제를 살펴보자.

```js
class Human {
    constructor(name) {
        this.name = name;
    }
    sleep() {
        console.log(`${this.name}: Z...z..z..zz`)
    }
}

class Student extends Human {
    sleep() {
        super.sleep() // 부모 클래스의 sleep을 실행한다.
        console.log(`${this.name}은(는) 침을 흘리며 자고있다.`)
    }
}

cosnt james = new Student("James")
james.sleep() // James: Z...z..z..zz
              // James은(는) 침을 흘리며 자고있다.
````
## 3. Reference
[MDN - Class](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes)    
[MDN - super](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/super)