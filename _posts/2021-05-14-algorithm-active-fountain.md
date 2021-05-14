---
title: 코딩 테스트 - 활성화된 분수

excerpt: "코딩 테스트 - 기출문제"

classes: wide

last_modified_at: 2021-05-14T12:00:00

use_math: true
use_mermaid: true

categories:
  - Algorithm
---

## 개요

0 ~ n 인 지점이 있으며, 각 지점마다 분수가 설치되어 있다. 배열 locations의 값은 해당 인덱스에 위치한 분수의 최대 범위를 나타낸다. 즉, locations[2] = 3이라면, 2지점에 있는 분수의 영역은 좌우로 각각 최대 3까지 뻗어나간다.

지점의 갯수와 분수의 최대 범위를 나타내는 locations이 주어졌을 때, 모든 영역을 덮기 위해 최소한으로 활성해야 하는 분수의 갯수를 계산해야 한다.

## 조건

- 1 <= n <= 10^5
- 1 <= locations[i] <= min(n, 100)

## 풀이

최소 갯수를 계산해야 하므로, 최단 경로를 찾아내는 BFS를 적용한다. 여러 차례 디버깅을 하면서 시간초과 문제에 직면하였는데, 가지치기를 어느정도까지 할 수 있는지가 핵심이다.

1. 이전 최대 영역 ~ 현재 분수의 범위 시작지점에 덮이지 않은 곳이 있으면 안된다.

2. 각 Depth마다 최대 영역과 그 Case의 마지막 Idx를 기억한다. 그리고, 동일한 Depth를 계속 탐색할 때 최대 영역보다 작으면 해당 CASE를 Queue에 넘기지 않는다.

```js
function fountainActivation(locations) {
  // BFS로 최단경로를 찾아냅니다.
  const queue = [];
  const memo_maxRange = [-1];
  const memo_lastIdx = [-1];
  const initTask = {
    count: 0,
    lastCoveredIdx: -1,
  };
  let answer = initTask;
  queue.push(initTask);

  while (true) {
    const curTask = queue.shift();
    const { count, lastCoveredIdx } = curTask;
    const lastIdx = memo_lastIdx[count];

    if (lastCoveredIdx >= locations.length - 1) {
      answer = curTask;
      break;
    }

    // 기억하고 있는 최대영역 미만이라면 검토하지 않습니다.
    if (lastCoveredIdx < memo_maxRange[count]) continue;

    for (let i = lastIdx + 1; i < locations.length; i++) {
      const range = locations[i];

      // 이전 영역이 완전히 Cover되지 않으면 제외합니다.
      if (lastCoveredIdx + 1 < i - range) continue;
      if (lastCoveredIdx >= i + range) continue;

      // 최대 영역을 기억하고, 최대 영역 미만인 Case는 제외합니다.
      if (memo_maxRange[count + 1] === undefined) {
        memo_lastIdx[count + 1] = i;
        memo_maxRange[count + 1] = i + range;
      } else if (memo_maxRange[count + 1] < i + range) {
        memo_lastIdx[count + 1] = i;
        memo_maxRange[count + 1] = i + range;
      } else continue;

      const newTask = { count: count + 1, lastCoveredIdx: i + range };
      queue.push(newTask);
    }
  }

  return answer.count;
}
```
