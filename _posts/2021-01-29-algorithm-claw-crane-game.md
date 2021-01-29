---

title: 코딩 테스트 - 크레인 인형뽑기 게임

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
N x N 게임판 매트릭스와 매 라운드마다 크레인이 어디서 인형을 뽑을지 적혀있는 배열이 주어진다. 매 라운드마다 인형을 뽑는다면(그 칸이 비어있지 않다면), 뽑은 인형을 바구니로 옮기게 된다. 인형은 바구니 아래부터 차곡차곡 쌓이게 된다. 이때 동일한 인형이 나란히 쌓이게 되면, 이 인형들은 바구니에서 제거되고 그 갯수만큼 점수를 얻게 된다. 라운드가 끝났을 때 얻은 총 점수가 얼마인지 구하는 문제이다.

## 조건
* 게임판의 크기는 5 이상 30 이하이다.
* 인형의 종류는 정수로 나타낸다. 정수의 범위는 0 ~ 100이다.
* 크레인의 움직임을 나타내는 배열의 크기는 1 이상 1,000 이하이다.
* 일반적으로 배열의 첫 번째 인덱스는 0이지만, 이 문제에서 첫번째 칸을 1로 표기한 것을 주의하자.

## 풀이
크레인이 움직일 칸에 인형이 있는지 탐색해야 한다. 그리고, 인형을 옮기고 나서 점수를 얻을 수 있는 요건이 되는지 바로 확인해야 한다. 이는 자료구조 중 스택을 배열을 사용하여 구현하면 된다. 


```js
function solution(board, moves) {
    let answer = 0;
    const basket = [];

    while (moves.length > 0) {
        const index = moves[0] - 1;
        for (let i = 0; i < board.length; i++) {
            const doll = board[i][index];
            // 1. 인형이 해당 칸에 없으면 바로 다음칸을 탐색한다.
            if (doll === 0 ) continue;
            // 2. 인형이 칸에 있으면, 해당 칸을 비우고 인형은 바구니로 옮긴다.
            board[i][index] = 0;
            basket.push(doll);

            // 3. 조건을 충족하면 인형을 제거하고 점수를 얻는다.
            if (basket[basket.length - 1] === basket[basket.length -2]) {
                basket.splice(basket.length -2, 2);
                answer += 2;
            }
            // 4. 이번 라운드 행동을 종료한다.
            break;
        }
        moves.splice(0, 1);
    }
    return answer;
}
````