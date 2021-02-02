---

title: 비동기 호출 - Callback, Promise, Async

excerpt: "자바스크립트 비동기 호출패턴"

classes: wide

  

last_modified_at: 2021-02-01T12:00:00

use_math: true

categories:
- Javascript
tags:
- asynchronous
---

비동기 호출이란 특정 코드의 연산이 끝날 때까지 실행을 멈추지 않고, 다음 코드를 먼저 실행하는 자바스크립트의 작동방식이다. 가령, 클라이언트가 서버에서 데이터를 요청한다고 해보자. 서버로 데이터를 요청하면 응답이 언제 올지는 명확히 알 수 없다. 요청을 보내놓고 무작정 기다리기보다 다른 코드를 실행하는 것이 나을 것이다. 

## 1. 콜백(Callback)
setTimeout은 비동기 처리의 대표적 예시이다. 코드를 바로 실행하지 않고, 일정시간 만큼 기다린 다음에 실행한다. 여러 작업들을 비동기으로 실행하면서도 순서를 제어할 수 있다. 아래 코드는 비동기적으로 "A", "B", "C"를 일정한 순서대로 실행하는 예시이다. 다만 무수한 콜백은 코드 가독성 및 유지보수 측면에서 좋지 않으니 가급적 지양해야 한다.
```js
const printString = (string, callback) => {
    setTimeout(
        () => {
            console.log(string);
            callback();
        },
        Math.floor(Math.random() * 100) + 1
    )
}

const printAll = () => {
    printString("A", () => {
        printString("B", () => {
            printString("C", () => {});
        })
    })
}
````
콜백을 사용하면서 바로 함수가 실행되도록 할 수 있지만, 예상과 다른 결과가 발생할 수 있다. 이러한 경우 함수가 실행되지 않고 오류가 출력되도록 설계할 수도 있다. 일반적으로 첫 번째 인자를 error, 마지막 인자를 data로 사용한다. Error Handling Design 예시를 보도록 하자.
```js
const getDataFromFile = function(filePath, callback) {
    fs.readFile(filePath, "utf8", (error, data) => {
        if (error) callback(error, null);
        else callback(null, data);
    })
}
````

## 2. 프로미스(Promise)
비동기 함수를 순차적으로 실행하다보면 흔히 콜백지옥이라 부르는 상황에 빠질 수 있다. 일반적으로 Promise나 Async를 사용하면 해결할 수 있다.

프로미스는 자바스크립트 비동기 처리에 사용되는 객체이다. 사용하기에 앞서 알아야 할 개념이 있다. 프로미스에는 3가지 상태 "대기, 이행, 실패" 가 있다.

> 대기(Pending): 비동기 로직이 완료되지 않은 상태
> 
> 이행(Fulfilled): 비동기 처리가 완료되어 프로미스가 Resolve값을 반환한 상태
>
> 실패(Rejected): 비동기 처리가 실패하거나 오류가 발생하여 Reject값을 반환한 상태

프로미스를 `new Promise()` 메서드로 호출하면 대기상태에 진입한다. 프로미스는 콜백함수를 인자로 받을 수 있으며, 콜백함수는 Resolve와 Reject를 인자로 받는다.

```js
new Promise((resolve, reject) => {})
````

콜백함수의 인자 resolve를 실행하면 이행상태가 되며, 프로미스의 메서드 then에서 그 값을 매개인자로 받을 수 있다. 마찬가지로 reject를 호출하면 실패 상태가 되며, then과 catch 메서드에서 reject의 값을 인자로 받을 수 있다. 즉, 분기에 따라 then(), catch()로 나뉘어 결과를 출력할 수 있다. 일반적으로 catch는 예제처럼 모든 then 메소드를 거치고 나서 작동하도록 마지막에 붙여준다.

```js
const getDataFromFilePromise = filePath => {
    return new Promise(resolve, reject) => {
        fs.readFile(filePath, "utf8", (error, data) => {
            if (error) reject (error); // catch 에서 error를 받을 수 있다.
            else resolve(data); // then에서 data를 받을 수 있다.
        })
    }
}

getDataFromFilePromise(validPath).then((data) => console.log(data)); //Resolve의 값을 매개인자로 받는다.
getDataFromFilePromise(invalidPath).then().catch((error) => console.log(error)); // Reject의 값을 매개인자로 받는다. 프로미스의 오류는 다음과 같이 catch로 실행하도록 하자.
````

프로미스의 주요한 특징이 하나 더 있다. 바로 여러 개의 프로미스를 사슬처럼 연결하여 사용할 수 있다는 것. 이러한 방식을 프로미스 체이닝(Promise Chaining)이라고 한다. **then() 메서드를 호출하면 새로운 프로미스 객체를 반환하는 것을 이용한 방법이다**. 예제를 한 번 보도록 하자.

```js
// 예제 1.
function readAllUserChaining() {
    // 문자열 상태의 user1, user2를 객체로 변환하고 배열에 담아 반환하는 함수 
  return getDataFromFilePromise(user1Path)
    .then(user1 => {
      return getDataFromFilePromise(user2Path)
        .then(user2 => "[" + user1 + "," + user2 + "]")
    })
    .then(text => JSON.parse(text))
}

// 예제 2.
function getNewsAndWeather() {
    return fetch(newsURL)
      .then(res => res.json())
      .then(json1 => {
          return fetch(weatherURL)
            .then(res => res.json())
            .then(json2 => {
                return {
                    news: json1.data,
                    weather: json2,
                }
            })
      })
}
````
단, then은 대기(Pending) 상태인 프로미스를 받아야 정상적으로 작동한다. 아래 예제의 첫 번째 사례와 같이 작성하면 이미 프로미스가 이행되어 제대로 작동하지 않을 수 있다.
```js
// 1. 수정 전
function getData() {
    const promise1 = getDatafromFilePromise(user1Path);
    const promise2 = getDatafromFilePromise(user2Path);

    return promise1
      .then(user1 => {
          return promise2.then(user2 => { // 이미 promise2가 이행된 상태이면 제대로 작동하지 않는다.
              return "[" + user1 + "," + user2 + "]";
          })
      })
      .then(text => JSON.parse(text))
}

// 2. 수정 후
function getData() {
    return getDataFromFilePromise(user1Path)
      .then(user1 => {
          return getDataFromFilePromise(user2Path)
            .then(user2 => return "[" + user1 + "," + user2 + "]";
            })
      })
      .then(text => JSON.parse(text));
}


````

Promise.all() 메서드는 순회 가능한 객체를 매개인자로 받는다. 객체 안에 있는 모든 비동기 작업을 이행한 새로운 배열을 프로미스로 반환한다. 이 때, 인자로 받은 프로미스들은 **병렬**로 수행된다. 

모든 프로미스들가 이행 상태가 되면 then, catch 등 메소드에 새로이 만든 배열 프로미스를 넘긴다. 만약, 하나라도 비동기 호출이 실패하다면 먼저 실패한 프로미스의 reject가 넘겨진다.

Promise.allSettled()는 Promise.all과 유사하다. 차이점은 내부 프로미스들 중 호출이 실패한 것이 있더라도, 이행된 프로미스들을 추려서 반환할 수 있다는 것이다.
```js
// 예제 1.
function readAllUser() {
    const user1 = getDataFromFilePromise(user1Path);
    const user2 = getDataFromFilePromise(user2Path);

    return Promise.all([user1, user2])
      .then(arr => arr.map(data => JSON.parse(data)));
}
// 예제 2.
function getNewsAndWeatherAll() {
    return Promise.all([fetch(newsURL), fetch(weatherURL)])
      .then(([newsResponse, weatherResponse]) => {
          return Promise.all([newsResponse.json(), weatherResponse.json()]);
       })
      .then(([json1, json2]) => {
          return {
              news: json1.data,
              weather: json2,
          }
      })
}
````
## 3. async와 await
async와 await은 프로미스를 조금 더 편리하게 사용하기 위한 목적으로 고안한 문법이다. 함수 앞에 **async**를 붙이면, 해당 함수는 항상 프로미스를 결과값으로 반환한다. 또한, 프로미스가 아닌 값을 반환하더라도 이행 상태의 프로미스로 반환되도록 한다.

**await**는 오직 async 함수 내부에서만 사용할 수 있다. 자바스크립트는 await를 만나면 해당 프로미스가 처리될 때 까지 기다린다. 그 전까지 async 내부에 있는 이하의 코드는 실행되지 않는 것. 실제로 코드를 작성해보면 직관적이다.
```js
// 예제 1.
const readAllUserAsyncAwait = async () => {
    const result = [];
    const data1 = await getDataFromFilePromise(user1Path);
    const data2 = await getDataFromFilePromise(user2Path);

    result.push(JSON.parse(data1));   
    result.push(JSON.parse(data2));

    return result;
}

// 예제 2.
asnyc function getNewsAndWeatherAsync() {
    const json1 = await fetch(newsURL).then(resp => resp.json());
    const json2 = await fetch(weatherURL).then(resp => resp.json());

    return {
        news: json1.data,
        weather: json2,
    }
}
````



## 4. Reference
[MDN - Promise](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)    
[JAVASCRIPT.INFO - async와 await](https://ko.javascript.info/async-await)    
[자바스크립트 Promise 쉽게 이해하기](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)    
[자바스크립트 async와 await](https://joshua1988.github.io/web-development/javascript/js-async-await/)    