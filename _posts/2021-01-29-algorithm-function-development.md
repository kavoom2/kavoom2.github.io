---

title: 코딩 테스트 - 기능개발

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
각 기능은 진도가 100%가 되면 배포할 수 있다. 단, 개발속도와 작업진도는 작업마다 다르다. 이 때, 배열 progress는 배포되어야 하는 순서대로 작업의 진도가 요소로 담겨있다. 그리고 각 요소의 작업속도가 담긴 배열 speed가 주어진다. 매번 배포할 때마다 몇 개의 기능이 배포되는지를 요소로 담은 배열을 반환해야 한다.

## 조건
* 작업 진도는 100 미만의 자연수이다.
* 작업 속도는 100 이하의 자연수이다.
* 작업의 개수는 100개 이하이다.

## 풀이
우선 매일 사건이 어떻게 일어나는지 정리하자. 간단하게 이렇게 생각하면 좋다. 오전에는 작업만 한다. 그리고 오후에 완료된 기능들을 배포한다. 다리를 지나는 트럭 문제에서 공백기간이 발생하고, 그 만큼 효율이 떨어지는 문제가 발생했다. 여기서는 가장 먼저 배포되어야 하는 기능의 최소작업시간을 계산하는 방법을 적용하여 연산횟수를 줄였다.

```js
// 1. 개인풀이
function solution(progresses, speeds) {
    const answer = [];
    while (progresses.length > 0) {
        // 1. 먼저 배포되어야 할 기능의 필요 작업일수를 계산한다.
        let count = 0;
        const restDay = Math.ceil((100 - progresses[0]) / speeds[0]);
        
        for (let i = 0; i < progresses.length; i++) {
            // 2. 소요된 기간만큼 각 기능들의 개발진도를 계산한다.
            if (progresses[i] < 100) {
                progresses[i] += restDay * speeds[i];
                if (progresses[i] > 100) progresses[i] = 100;
            }
        }

        // 3. 배포해야 할 작업을 카운트한다.
        while(progresses.length > 0) {
            if (progresses[0] < 100) break;
            count++;
            progresses.shift();
            speeds.shift();
        } 
        if (count > 0) answer.push(count);
    }
}
````