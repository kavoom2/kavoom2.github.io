---

title: 코딩 테스트 - 삼각 달팽이

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
정수 n이 매개변수로 주어진다. 밑변의 길이와 높이가 각각 n인 삼각형에서 맨 위 꼭지점부터 반시계 방ㄴ향으로 달팽이 채우기를 한다. 만들어진 삼각형의 첫 행부터 마지막 행까지 순서대로 합친 배열을 반환해야 한다.

## 조건
* n은 1 이상 1,000 이하이다.

## 풀이
이 삼각형은 달리 생각하면 밑변과 높이가 n인 삼각형으로 치환할 수 있다. 그 말인 즉슨, 2차원 배열 위로 옮길 수 있다는 것. 반시계 방향으로 움직이는 것은 이동거리를 계산하거나 벽에 부딛혔을 때 방향을 바꾸도록 하면 된다. 매 시행의 이동거리를 계산했었는데, 이동거리는 n ~ 1로 점차 줄어든다. 지금 생각해보면, 다음에 이동할 칸이 존재하지 않거나 값이 1 이상인 경우를 확인하는게 작성하기 훨씬 수월하다고 생각한다.

그리고 Array.prototype.flat 메서드를 사용해볼 기회였다. 여러 메서드를 시의적절하게 사용하자.

```js
// 1. 개인풀이
function solution(n) {
    let answer = [];
    let value = 1;
    let count = 0;
    let checker = 1;
    const curPosition = {x: 0, y: 0}
    let direction = {dx: 0, dy: 1};

    // 이동방향을 바꾸는 함수
    function directionChanger(num) {
        const checker = num % 3;
        if (checker === 1) return {dx: 0, dy:1};
        else if (checker === 2) return {dx: 1, dy:0};
        else return {dx: -1, dy: -1};
    }

    // (n x n) matrix를 만든다. 처음부터 만들 때, 삼각형만 만드는 것이 수월하다.
    const matrix = Array(n).fill().map((el, idx) => Array(idx + 1).fill());
    while (n > 0) {
        // 1. 칸을 이동한다.
        count += 1;
        matrix[curPosition.y][curPosition.x] = value;

        // 2. 다음 칸으로 이동하기 전에 방향을 바꾸어야하는지 확인한다.
        if (count === n) {
            checker += 1;
            direction = directionChanger(checker);
            n -= 1;
            count = 0;
        }

        // 3. 다음 칸으로 이동한다.
        curPosition.x += direction.dx;
        curPosition.y ++ direction.dy;
        value += 1;
    }
    answer = matrix.flat();
    return answer;
}
````