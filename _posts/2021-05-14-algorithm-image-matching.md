---
title: 코딩 테스트 - 이미지 매칭

excerpt: "코딩 테스트 - 기출문제"

classes: wide

last_modified_at: 2021-05-14T12:00:00

use_math: true
use_mermaid: true

categories:
  - Algorithm
---

## 개요

동일한 크기의 이미지(Matrix) 2개가 주어진다. 각 이미지의 셀은 "1" 또는 "0"의 정보를 담고 있는데, 이는 해당 영역에 이미지가 있는지 여부를 나타낸다. 상하좌우로 연속된 "1"들의 집합을 "이미지 영역"이라고 한다.

두 그리드를 비교하여 이미지 영역이 완전히 일치할 때, 해당 영역이 일치한다고 한다. 두 이미지를 비교하여, 완전히 일치하는 이미지 영역의 갯수를 계산해야 한다.

## 조건

- 1 <= n <= 100
- 1 <= 그리드의 폭 / 너비 <= 1
- 셀은 "0" 또는 "1"의 데이터만을 저장한다.
- 이미지 너비와 폭이 3일 때, ["101", "111", "011"]의 형태로 주어집니다.

## 풀이

완전히 일치하는 영역만 동일한 영역으로 간주하고 갯수를 센다. 따라서 완전탐색으로 각 영역들을 탐색해야 하되, 일치하지 않은 부분에서도 검토를 끊지 않고 이어나가야 한다.

```js
function countMatches(grid1, grid2) {
  let answer = 0;

  const [M, N] = [grid1.length, grid1[0].length];
  const pathChecker = Array(M)
    .fill("_")
    .map((el) => Array(N).fill(false));
  const answerChecker = [];

  const regionFinder = (row, col, idx) => {
    pathChecker[row][col] = true;

    if (grid1[row][col] !== grid2[row][col]) {
      answerChecker[idx] = false;
    }

    if (row - 1 >= 0) {
      if (
        (grid1[row - 1][col] === "1" || grid2[row - 1][col] === "1") &&
        !pathChecker[row - 1][col]
      ) {
        regionFinder(row - 1, col, idx);
      }
    }

    if (row + 1 < M) {
      if (
        (grid1[row + 1][col] === "1" || grid2[row + 1][col] === "1") &&
        !pathChecker[row + 1][col]
      ) {
        regionFinder(row + 1, col, idx);
      }
    }

    if (col - 1 >= 0) {
      if (
        (grid1[row][col - 1] === "1" || grid2[row][col - 1] === "1") &&
        !pathChecker[row][col - 1]
      ) {
        regionFinder(row, col - 1, idx);
      }
    }

    if (col + 1 < N) {
      if (
        (grid1[row][col + 1] === "1" || grid2[row][col + 1] === "1") &&
        !pathChecker[row][col + 1]
      ) {
        regionFinder(row, col + 1, idx);
      }
    }
  };

  for (let row = 0; row < M; row++) {
    for (let col = 0; col < N; col++) {
      const idx = row * N + col;
      answerChecker[idx] = null;

      if (grid1[row][col] === "0" && grid2[row][col] === "0") continue;

      if (!pathChecker[row][col]) {
        answerChecker[idx] = true;
        regionFinder(row, col, idx);
        if (answerChecker[idx]) answer++;
      }
    }
  }
  return answer;
}
```
