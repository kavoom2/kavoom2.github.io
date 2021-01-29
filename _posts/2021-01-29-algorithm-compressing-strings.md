---

title: 코딩 테스트 - 문자열 압축

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
문자열을 1에서 문자열 길이 절반 길이까지의 단위로 나누어 압축하였을 때 가장 짧은 길이가 무엇인지 반환하는 함수를 작성해야 한다.

## 조건
* 문자열의 압축은 제일 앞이 우선순위이다. 항상 정해진 길이만큼 잘라야 한다.
* 문자열의 길이는 1 이상 1,000 이하이다. 
* 문자열은 알파벳 소문자로만 이루어져 있다.

## 풀이
처음에 문제를 푸는 방법을 잘못 잡았다. 직접 압축을 해서 문자열 길이를 반환하는 방법으로 풀었어야 했는데, 길이만 생각하다보니 중복되는 횟수가 자리수가 바뀔 때마다 에러가 발생했다. 중요한 부분을 놓치다보니 예상보다 너무 많은 시간을 소모해버렸다. 메서드 substr의 사용법을 다시 한 번 각인시킬 수 있는 좋은 경험이었다.

```js
// 1. 개인풀이
function solution(s) {
    let answer = s.length;
    const range = Math.floor(s.length / 2) + 1;
    for (let i = 1; i < range; i++) {
        let convert = "";
        let count = 1;
        let head = s.substr(0, i); // substr(a, b)는 index === a 부터 b개 만큼 잘라낸다.
        
        for (let j = i; j < s.length; j+=i) { // 불필요한 연산을 건너뛸 수 있다.
            if(head === s.substr(j, i)) count++
            else {
                if (count > 1) convert += count;
                convert += head;
                head = s.substr(j, i);
                count = 1;
            }
        }
        if (count > 1) convert += count;
        convert += head;
        answer = Math.min(convert.length, answer);
    }
    return answer;
}
````