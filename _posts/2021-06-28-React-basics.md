---
title: React - the complete guide 3일차

excerpt: " React Hooks, Redux, React Router 기초부터 쌓기"

classes: wide

last_modified_at: 2021-06-28T22:00:00

use_math: true

categories:
  - TIL
  - React
---

## 블라블라
부트캠프 수강 당시 무지성으로 React를 사용했었다. Udemy에서 React, Redux, React Router에 대한 강의를 수강하고 있는데, 해당 기술이 어떠한 이유에서 설계되었는지 생각하는 보면서 들어보니 정말 잘못 알고 있었지 싶다. 부트캠프의 교육 시스템 문제는 아니고, 내 자신이 이러한 부분은 중요시하지 않아서였다.

현재 업무에서는 전역 상태 관리에는 Redux를 사용하고, 비동기 처리는 Redux Saga를 사용하고 있다. Redux Toolkit을 사용하면 보일러 플레이트 코드가 대폭 줄어들지만, 하나의 비동기 처리에 전역 상태와 로딩, 에러 핸들링을 만드는 것은 다소 번거로움이 있다. 
전역으로 관리해야 할 상태를 제외하고 React Query를 사용하여 비동기 처리를 구현해 볼 예정이다. 

## React #4 State, Working with Events
### 1. Form 상태 관리
사수분이나 구글링을 통해 Form의 상태를 다루는 것을 보면, 개발자마다 정말 가지 각색이지 싶다. Input 단위로 커스텀 훅을 만들어서 관리하거나, Form 단위로 객체로 묶어서 상태를 관리하기도 한다. 

현업에 들어와서 커스텀 훅을 처음 접해보게 되었는데, React Hooks의 정말 강력한 기능이지 싶다. 이걸 왜 안쓰고 있었을까.

```js
// 1. Input 단위로 커스텀 훅을 사용하여 상태를 관리할 수 있습니다.
import { useCallback, useState } from "react";

const useOnChange = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const changeHandler = useCallback(event => {
        setValue(event.target.value);
    })

    return [value, changeHandler, setValue];
}

cosnt useOnClick = (initialValue) => {
    // Form에서 여러 버튼 중 하나를 선택하는 섹션에 사용합니다.
    const [value, setValue] = useState(initialValue);

    const clickHandler = useCallback(event => {
        cosnt value = event.currentTarget.dataset.value;
        setValue(value);
    })

    return [value, clickHandler, setValue]
}
```

```js
// 2. 컴포넌트 내부에서 객체 형태로 여러 Input을 관리하기도 합니다.
import React from "react"

const ExpenseForm = () => {
    const [userInput, setUserInput] = useState({
        enteredTitle: "",
        enteredAmount: "",
        enteredDate: "",
    })

    const inputChangeHandler = event => {
        // 객체로 Input 상태를 관리할 경우 Outdated 값이 업데이트 될 수 있다.
        // 따라서 직전의 상태를 보장하려면서 상태를 업데이트 하려면 아래와 같이 사용해야 한다.
        setUserInput((prevState) => {return {...prevState, [event.target.dataset.name]: event.target.value}})
    }

    const addExpenseHandler = expense => {
        setExpenses(prevExpenses => [expense, ...prevExpenses])
    }

    return (
        <form onSubmit={submitHandlder}>
          <label>Title</label>
          <input type="text" data-name="enteredTitle" value={userInput.enteredTitle} onChange={inputChangeHandler}>
        </form>
    )
}
```
개인의 취향에 맞는 것을 사용하면 되지 싶다. 

### 2. 놓치기 쉬운 컨벤션
React에서 컴포넌트의 이벤트는 on으로 시작하며, 커멀 케이스이다. onClick, onChange 등..
자동 완성으로 보면 이러한 컨벤션으로 이벤트들이 정의되어 있음을 확인할 수 있다. 사용자 컴포넌트에 Props로 이벤트를 명명할 때, 컨벤션에 맞게 작성하자.

### 3. JSX의 본래 모습
React는 컴포넌트들로 root가 최상위 노드인 노드 트리를 형성한다.
JSX가 JavaScript로 어떻게 바뀌는지 [Babel Compiler](https://babeljs.io/repl/#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.6&spec=false&loose=false&code_lz=GYVwdgxgLglg9mABACwKYBt1wBQEpEDeAUIogE6pQhlIA8AJjAG4B8JpityAjC2pnFoB6Hmw6cAzgAcAhkglQAnulQSAvAQIQ4WMgC5EAIgBG6GRADWhgL7WWAZRBTh0uWI61jIKFASIEAMLoMJYaeGoshLZ8MMJePgjuwoysRNZEQA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=react&prettier=false&targets=&version=7.14.7&externalPlugins=)로 확인할 수 있다. 변환해서 살펴보자.

```js
// JSX
const Hello = () => {
    return (
        <div>
            <h1>hello</h1>
            <span styles={{color: "black"}}>James</span>
            <button onClick={(e) => {console.log(e)}}>Click Me!</button>
        </div>
    )
}

// JavaScript
function hello() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "hello"), /*#__PURE__*/React.createElement("span", {
    styles: {
      color: "black"
    }
  }, "James"), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      console.log(e);
    }
  }, "Click Me!"));
}
```