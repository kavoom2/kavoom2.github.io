---

title: 코딩 테스트 - 다리를 지나는 트럭

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
모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 알아내야 한다. 1차 선이므로 트럭의 순서는 바꿀 수 없다. 트럭은 매 초마다 1칸 씩 움직이며, 다리의 길이는 n칸이다. 또한, 다리가 견딜 수 있는 최대무게와 각 트럭의 무게가 주어진다. 다리에는 버틸 수 있는 무게까지만 트럭들이 올라갈 수 있다.

## 조건
* 다리길이는 1 이상 10,000 이하이다
* 트럭 무게는 1 이상 10,000 이하이다.
* 대기 중인 트럭의 수는 1 이상 10,000대 이하이다.
* 모든 트럭의 무게는 1 이상 다리가 견딜 수 있는 최대무게 이하이다.

## 풀이
자료구조 중 큐(Queue)를 사용하는 문제이다. 원리 자체는 크게 어렵지 않은데, 문제를 풀기 전 사건이 일어나는 순서를 명확히해야 한다. 이 부분을 제대로 정리하지 않아 처음에 애를 먹었다.
> 1. 다리에서 건너편으로 건너간다.    
> 2. 다리 내부에서 다음 칸으로 전진한다.    
> 3. 다리에 올라갈 수 있다면, 시작지점에서 다리로 넘어온다.    


큐는 배열을 사용하면 구현할 수 있다. 트럭이 다리를 언제 건너야할지만 명확하게 코드로 작성하면 큰 문제는 없을 것이다. 다만, 개선해야할 점은 다리에서 시간만 보내는 부분이 생긴다는 것. 다음 트럭이 건너는데 필요한 최소시간을 계산하여 해결할 수 있을 것이다.

```js
// 1. 개인풀이
function solution(bridgeLength, bridgeWeight, trucksWeights) {
    var answer = 0;
    let queueCurrentWeight = 0;
    let start = trucksWeights.length;
    let end = 0;
    const queue = [];
    
    while ( end < start ) {
        answer += 1;
        for (let i = 0; i < queue.length; i++) {
            const truck = queue[i];
            // 1. 맨 앞의 트럭이 넘어갈 수 있는지 확인한다.
            if (answer - truck.time >= bridgeLength) {
                queueCurrentWeight -= truck.weight;
                queue.shift()
                end +=1;
            }
        }
        
        // 2. 다음 트럭이 다리로 넘어올 수 있는지 확인한다.
        const nextTruck = trucksWeights[0];
        if ( (nextTruck + queueCurrentWeight) <= bridgeWeight ) {
            queueCurrentWeight += nextTruck;
            queue.push({time: answer, weight: nextTruck});
            trucksWeights.shift();
        }
    }
    return answer;
}
````