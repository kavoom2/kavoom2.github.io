---

title: 코딩 테스트 - 두 개 뽑아서 더하기

excerpt: "프로그래머스 코딩 테스트"

classes: wide

  

last_modified_at: 2021-01-29T12:00:00

use_math: true
use_mermaid: true

categories:
- Algorithm
tags:
- programmers
---
## 개요
정수 배열이 주어진다. 배열 안에 서로 다른 인덱스의 두 수를 뽑아서 더한다. 이 과정으로 만들 수 있는 모든 수를 배열에 오름차순으로 담아 반환해야 한다.

## 조건
* 배열의 길이는 2 이상 100 이하이다. 생각보다 많이 작다...
* 즉, 이 문제는 시간복잡도보다 중복되는 값을 어떻게 처리할 것인가에 집중한다.

## 풀이
중복되는 값을 처리하기 위해 더한 후, 반환할 배열에 있는지 확인하는 과정을 거쳤다. [Set](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Set)을 사용하면, 굳이 이 과정을 거치지 않아도 된다. 배열처럼 삽입한 순서대로 내부 요소를 순회할 수 있으며, Set 내부의 요소들은 유일하다. 즉 중복되는 값이 없다는 것이다.

> new Set([iterable]);    
>     
> ex) const set1 = new Set([1, 2, 3, 4, 5, 5, 2]);    
> console.log(set1.has(1)) // true     
> console.log(set1) // [1, 2, 3, 4, 5]   


```js
// 1. 개인풀이
function solution(numbers) {
    var answer = [];

    for(let i=0; i<numbers.length-1; i++) {
        for(let j=i+1; j<numbers.length; j++) {
            var sum = numbers[i]+numbers[j];
            if(!answer.includes(sum)) answer.push(sum);
        }
    }

    return answer.sort((a, b) => a-b);
}


// 2. 프로그래머스 풀이
function solution(numbers) {
    const temp = [];

    for (let i = 0; i < numbers.length - 1; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            temp.push(numbers[i] + numbers[j]);
        }
    }
    const answer = [...new Set(temp)];
    return answer.sort((a, b) => a - b);
}
````