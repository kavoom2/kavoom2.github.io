---

title: 코딩 테스트 - 124 나라의 숫자

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
우리가 일반적으로 알고 있는 10진법 숫자를 3진법으로 바꾸는 문제이다. 다만, 수를 표현할 때 1, 2, 4만을 사용한다. 자연수 n을 요상한 3진법을 사용하여 바꾼 값을 반환하면 된다.

## 조건
* 자연수 n은 500,000,000이하의 자연수이다. 매우 크다.

## 풀이
진수법 알고리즘을 귀납적으로 도출하느라 삽질을 했는데, 알고보니 고등수학 때 배웠던 방법을 써먹으면 된다. 수학을 놓은지 꽤나 오래되었다보니 이런 내용을 배웠다는 것도 잊고 있었다. 10진법 정수 N을 n진법으로 바꾸어야 한다면, N을 n으로 나누고 나머지를 나열한다. 그리고 나열한 나머지를 역순으로 읽으면 된다. 우리가 배웠던 그 내용이 맞다..... 자세한 내용은 [이 글](https://terms.naver.com/entry.nhn?docId=3572374&cid=58944&categoryId=58970)에서 알아보도록 하자.

진수법에 대한 정보만 알고 있어도 큰 문제는 없다. 다만, 최종적으로 나머지가 n === 3일 때, 계산이 중복되지 않도록 유의해야 한다.


```js
// 1. 개인풀이
function solution(n) {
    var answer = 0;
    let k = 0;
    let rest = 0;
    let originNum = n;
    while ( originNum >= 3**k ) {
        rest = ( originNum % ( 3 ** (k + 1) ) ) / (3 ** k);
        if ( rest === 1 ) answer += 1 * (10 ** k)
        if ( rest === 2 ) answer += 2 * (10 ** k)
        if ( rest === 0 ) {
            answer += 4 * (10 ** k);
            rest = 3;
        }
        originNum -= rest * (3 ** k);
        k += 1;
    }
    return String(answer);
}

// 2. 프로그래머스 풀이
function solution(n) {
    var answer = '';
    // 나머지가 1이면 "1", 2이면 "2", 0이면 "4"로 변환한다.
    const array124 = [4, 1, 2];
    while ( n > 0 ) {
        const index = n % 3;
        // 나머지는 거꾸로 읽어나가야 한다.
        answer = array124[index] + answer;
        // 마지막 n === 3이면, 나머지 계산 후 종료할 수 있도록 해야한다.
        n = Math.floor(( n - 1 ) / 3);
    }
    return answer;
}
````