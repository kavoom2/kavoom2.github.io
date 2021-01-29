---

title: 코딩 테스트 - 모의고사

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
3명의 수포자가 각각 맞춘 문제를 파악하고, 가장 많은 문제를 맞춘 사람을 오름차순 순으로 반환해야 하는 문제이다. 

## 조건
* 문제의 답은 1, 2, 3, 4, 5 중 하나이다. 또한, 각자 정해진 규칙에 따라 문제를 찍는다.
* 자료의 크기는 최대 10,000이다. 즉, 최대 30,000번까지 탐색을 해야한다.
* 가장 높은 점수를 받은 사람이 여러명일 경우, 오름차순으로 정렬하여 반환해야 한다.

## 문제풀이
우선, 각자 맞은 정답의 갯수를 알아낸 다음, 그 값을 토대로 가장 많이 맞춘 사람의 정답수를 구해야 한다. 또한, 어떤 사람이 가장 많이 풀었는지, 그리고 동점자가 있을 경우 오름차순으로 정렬해야 한다. 따라서, 정답 갯수를 카운트 할 때, 배열을 사용하였다.

```js
// 1. 개인풀이
function solution(answers) {
    const answer = [];
    const man1 = [1, 2, 3, 4, 5];
    const man2 = [2, 1, 2, 3, 2, 4, 2, 5];
    const man3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
    const grades = [0, 0, 0];

    for (let i = 0; i < answers.length; i++) {
        if (answers[i] === man1[i % man1.length]) grades[0]++;
        if (answers[i] === man2[i % man2.length]) grades[1]++;
        if (answers[i] === man3[i % man3.length]) grades[2]++;
    }
    const maxGrade = Math.max(...grades);
    for (let i = 0; i < grades.length; i++) {
        if (maxGrade === grades[i]) answer.push(i + 1);
    }

    return answer;
}
````