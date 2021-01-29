---

title: 코딩 테스트 - 신규 아이디 추천

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
입력한 아이디를 특정 규칙에 맞는 새로운 아이디로 추천해주는 함수를 작성해야 한다. 

## 조건
* 총 7단계를 거쳐 규칙에 맞는 새로운 아이디를 반환한다. 자세한 내용은 문제참조.

## 풀이
친절하게 각 단계를 적어준 문제이다. 그럼에도 시간을 굉장히 많이 허비했다는 것에 자괴감을 느낀다..... 꼼꼼하게 예외 케이스를 생각하는 습관을 기르지 않은 것이 원인이라고 생각한다. 풀이를 저장한 파일이 증발해서 프로그래머스의 좋은 풀이를 대신 올린다.....

```js
// 1. 프로그래머스 풀이
function solution(newId) {
    let answer = "";
    for (let i = 0; i < newId.length; i++) {
        // 1단계: 모든 문자를 소문자로 치환한다.
        let c = newId[i].toLowerCase();
        // 2, 3단계: 불필요한 특수문자를 제거한다. 그리고, 연속한 온점은 하나만 남긴다.
        if ("0123456789abcdefghijklmnopqrstuvwxyz.-_".indexOf(c) === -1) continue;
        if ( c === "." && answer[answer.length - 1] === ".") continue;
        answer += c;
    }
    // 4단계: 맨 앞의 문자가 온점이면 제거한다.
    if (answer[0] === ".") answer = answer.slice(1);
    // 5단계: 길이가 16자 이상이면 나머지 문자를 제거한다.
    answer = answer.slice(0, 15);
    // 6단계: 문자열 맨 뒤에 온점이 있으면 제거한다.
    if (answer[answer.length - 1] === ".") answer = answer.slice(0, answer.length - 1);
    // 7단계: 빈 문자열이면 a를 대입한다.
    if (!answer) answer = "a";
    // 8단계: 문자열의 길이가 2 이하이면, 3이 될 때까지 마지막 문자를 추가한다.
    while (answer.length < 3) answer += answer[answer.length -1];
    return answer;
}
````