---

title: Node.js와 관련 툴

excerpt: "Node.js 사용에 필요한 툴과 package.json의 역할 이해"

classes: wide

  

last_modified_at: 2021-01-11T22:00:00
use_mermaid: true
use_math: true

categories:
- Node.js
tag:
- package.json
- nvm
- npm
---
Node.js는 Javascript가 동작할 수 있는 환경 또는 프로그램인 런타임(Runtime) 중 하나이다. Javascript 코드를 브라우저에서 실행할 수도 있고, Node.js에서도 실행할 수 있는 것. 다음 예제에서는 터미널에서 Node.js로 스크립트를 실행한 결과를 출력한다.

```js
// runnode.js
function testFunction(arg) {
    console.log("Arg is ", arg);
}

testFunction(arg)

// terminal
$ Node runnode.js // "Arg is 20"
````

## NVM
Node.js를 사용하려면 관련 프로그램들이 필요하다. 먼저 Node.js를 설치, 관리하는 NVM(Node.js Version Manager)을 살펴보자. NVM이 설치되었다면, 다음 명령어를 실행하여 현재 버전을 확인할 수 있다.
```js
nvm --version
````
설치할 수 있는 Node.js의 버전은 다음 명령어로 확인할 수 있다. 원하는 버전을 설치하자. 설치할 때에는 호환성 문제가 발생기지 않도록 LTS(Long Term Supported) 버전을 설치하자.
```js
nvm ls-remote --lts // 설치가능한 버전 확인
nvm isntall 14.15.4
````
제대로 설치되었는지 확인해보려면 버전을 출력해보자.
```js
$ Node -v
````
여러 버전을 설치하여 사용한다면 다음 명령어로 버전을 변경하면서 사용할 수 있다.
```js
nvm use 14.15.4
nvm use 12.16.1
````
## NPM
NPM(Node Package Manager)은 프로그램에 필요한 모듈을 받을 수 있는 앱스토어의 일종이다.

## package.json
프로젝트는 필연적으로 다른 사람들과 함께 개발하고 사용하게 된다. 프로그램에 필요한 모듈이 무엇이고 어떻게 실행하는지를 알아야한다. package.json이 이러한 내용들을 알려주는 설명서다.

참고로, 프로젝트에 필요한 모듈 파일들은 node_modules에 설치되어 있다.

package.json에서 scripts는 npm으로 실행할 수 있는 명령어를 정의한다.
```js
// package.json
"scripts": {
    "start": "Node app.js"
    "test": "Node test.js"
}

// terminal
$ npm run test // test.js를 실행
$ npm run start // app.js을 실행
````

## dev Dependencies vs dependencies
package.json에는 devDependencies와 dependencies가 있다. 전자는 로컬 개발 및 테스트 과정에서만 필요한 패키지이다. 실제 배포에는 포함되지 않는다. 후자는 프로그램의 실제 기술스펙으로 사용되는 패키지이다. 

패키지를 설치할 때 다음 명령어로 각각 구분하여 설치한다. --save 명령어는 패키지 간 충돌을 잡아준다.
```js
$ npm install --save -dev // devDependencies 패키지 설치
$ npm install --save // Dependencies 패키지 설치
````

스프린트 과제 패키지 설치 중 오류가 발생하면 다음 명령어를 입력해보자.
```js
sh. registry.sh
````