---

title: 코딩 테스트 - 스킬트리

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
스킬트리에는 선행스킬이라는 것이 있다. 선행 스킬이란 어떤 스킬을 배우려면 먼저 배워야 하는 스킬을 의미한다. 물론, 순서에 상관없이 배울 수 있는 스킬도 있다. 이 문제에서는 선행스킬 순서가 적인 문자열과 유저들이 만든 스킬트리를 담은 배열이 주어진다. 유저 스킬트리 순서대로 배웠을 때, 가능한 스킬트리의 총 갯수를 반환하는 함수를 작성하면 된다.

## 조건
* 선행스킬 순서를 나타낸 문자열의 길이는 1 이상 26 이하이며, 중복되는 스킬은 없다.
* 스킬트리를 나타낸 배열의 길이는 1 이상 20 이하이다.
* 배열의 각 요소는 스킬트리를 나타낸 문자열이며, 길이는 2 이상 26 이하이다. 중복되는 스킬은 없다.

## 풀이
다른사람의 풀이를 보다보면, 메소드를 이렇게 적절하게 사용할 수 있구나 하는 걸 실감한다. 다른 풀이에서는 배울수 있는 스킬트리인 경우 true를 반환하고, 아니면 false를 반환하도록 했다. 이를 Array.prototype.filter를 사용하여 true를 반환한 element의 갯수를 반환하게끔 사용하였다. 


```js
// 1. 개인풀이
function solution(skill, skill_trees) {
    let answer = 0;
    for (let i = 0; i < skill_tress.length; i++) {
        const tree = skill_trees[i];
        let learnableSkillIndex = 0;
        let isLearnable = true;

        for (let j = 0; j < tree.length; j++) {
            const currentSkill = tree[j];
            // 1. 선행스킬이 아니면 배울 수 있다.
            if (skill.indexOf(currentSkill) === -1) continue;
            // 2. 선행스킬이면서 이전 스킬을 배우지 않으면 배울 수 없다.
            else if (skill.indexOf(currentSkill) > learnableSkillIndex) {
                isLearnable = false;
                break;
            } else learnableSkillIndex += 1;
        }
        if (isLearnable) answer += 1;
    }
    return answer;
}


// 2. 프로그래머스 풀이
function solution(skill, skill_trees) {
    function isCorrect(tree) {
        const test = skill.split("");
        for (let i = 0; i < tree.length; i++) {
            // 1. 선행스킬이 아니면 배운다.
            if (!skill.includes(tree[i])) continue;
            // 2. 선행스킬인 경우 먼저 배울 수 있는 스킬인지 확인하고 배운다.
            if (tree[i] === test.shift()) continue;
            // 3. 배울 수 없으면, 가능한 스킬트리가 아니므로 종료한다.
            return false;
        }
        return true;
    }
    return skill_trees.filter(isCorrect).length;
}
````