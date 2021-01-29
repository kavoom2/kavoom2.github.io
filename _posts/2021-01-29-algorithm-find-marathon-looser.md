---

title: 코딩 테스트 - 완주하지 못한 선수

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
수 많은 선수들이 마라톤에 참여했다. 단 "한 명"의 선수를 제외하고 모든 선수가 완주했다. 완주하지 못한 선수의 이름을 반환하는 함수를 작성하면 된다.

## 조건
* 참여한 선수의 수는 1명 이상 100,000명 이하이다.
* 항상 완주하지 못한 선수는 한 명뿐이다.
* 참가자 중 동명이인이 있을 수 있다.

## 풀이
설명을 잘 보고 이해해야 한다는 것을 다시 한번 느끼게 해준 문제다. 항상 완주하지 못한 선수가 한 명이라는 것을 인지하지 못하고, 여러명일 수 있다고 가정하고 풀었다. 아래처럼 풀 것도 없이 두 배열을 정렬해놓고 동일한 인덱스의 값을 대응시켰을 때, 다른 값을 반환하면 된다. 괜시리 토이에서 나온 방법을 써먹을 수 있어 좋아했다....

```js
// 1. 개인풀이
function solution(participant, completion) {
    participant.sort();
    completion.sort();
    let answer = "";
    
    function searchTarget(target, fromIdx, completion) {
        for (let i = fromIdx; i < completion.length; i++) {
            if (target === completion[i]) return i;
            else if (target < completion[i]) {
                answer = target;
                return -1;
            }
        }
        answer = target;
        return -1;
    }

    let fromIdx = -1;
    for (let j = 0; j < participant.length; j++) {
        const target = participant[j];
        fromIdx = searchTarget(target, fromIdx + 1, completion);
        if (fromIdx === -1) break;
    }
    return answer;
}
````