---
title: 개인 토이프로젝트 Tetris Clone 회고

excerpt: "자바스크립트로 구현하는 테트리스 게임"

classes: wide

last_modified_at: 2021-01-08T24:00:00
use_mermaid: true

categories:
  - Toy
  - Project
tags:
  - clone
  - tetris
---

다음 글은 **테트리스 예제(https://ui.toast.com/weekly-pick/ko_20191216)**를 직접 구현해보고 정리한 내용이다.  
프로젝트 트리 구성요소들이 어떤 역할을 하는지 정리한다. 그리고, 직접 구현하면서 알아둘 필요가 있는 내용도 덧붙인다.

## 1. 블록의 기본요소

테트리스 게임의 핵심은 블록의 움직임과 물리적 충돌을 어떻게 구현할 것인가이다. 게임 시작, 종료, 점수 매기기 등 기능들은 우선 배제하고 블록의 움직임만 생각해보자.

### 1.1. 블록 자동하강

다음은 게임이 시작하여 종료될 때까지 블록 움직임의 알고리즘을 간단히 적어본 것이다.

<center><div class = "mermaid">
graph LR
A["게임시작"] --> B["새로운 블록 생성"]
B --> C{"블록이<br>한 칸 아래로<br>이동가능한가?"}
C --> |"아니오"| D{"종료조건을<br>만족하는가?"}
C --> |"예"| F["블록을 한 칸<br>아래로 이동"]
F --> C
D --> |"아니오"| B
D --> |"예"| E["게임종료"]
</div></center>

블록은 게임이 시작된 직후, 처음 생성된다. 그리고 게임 설정에 따라 일정 시간마다 아래로 한 칸씩 이동한다. 블록이 움직일 수 없는 경우를 고려하여 설계해야 한다.

> 1. 블록이 게임보드 바닥에 도달한 경우
> 2. 블록 바로 아래에 다른 블록이 있는 경우

위 조건을 만족하면 블록은 멈추게 된다. 게임을 계속하려면 새로운 블록을 만들어야 하는데, 그 전에 게임종료 조건에 부합하는지 확인해야 한다. 테트리스에서 주요 종료조건은 "블록이 천장에 닿았는가"이다. 천장에 닿았다면 현재게임을 종료한다. 블록이 천장에 닿지 않는다면, 게임은 새로운 블록이 생성되어 아래로 움직이고, 멈추는 것을 계속 반복한다.

이를 토대로 블록의 움직임을 구현하려면 다음과 같은 기능이 필요하다.

> 1. 새로운 블록 생성
> 2. 블록이 다음 위치로 이동이 가능한지 여부 확인
> 3. 일정시간마다 블록이 한 칸씩 아래로 이동

### 1.2. 블록 조작

테트리스 게임에서 블록 조작법은 다음과 같다.

> 1. 블록이동: 왼쪽, 오른쪽, 아래 방향키를 입력하여 원하는 방향으로 이동할 수 있다.
> 2. 블록회전: 위쪽 방향키와 Q버튼을 입력하여 블록을 시계방향이나 반시계 방향으로 90도씩 회전할 수 있다.
> 3. 하드드롭: 스페이스키를 입력하여 블록을 움직일 수 없는 지점 직전까지 하강시킬 수 있다.

위 세 기능을 구현하면서 고려해야 할 점이 있다. 앞서, 블록 움직임을 구현하면서 블록이 이동가능한지 확인했었다. 블록을 조작할 때에는 더 고려해야 것이 있다.

> 1. 블록이 게임보드 바닥에 도달한 경우
> 2. 블록 바로 아래에 다른 블록이 있는 경우
> 3. 블록이 보드 경계지점에 도달한 경우

방향키 조작이나 회전을 할 경우 블록이 화면 좌측 또는 우측 경계선을 벗어날 수 있다. 따라서, 키 입력을 받고, 블록을 주어진 명령에 따라 이동이나 회전하고 나서 정상적으로 출력되는지 여부도 판단해야 한다. 자세한 내용은 뒤에서 이야기하고, 본격적으로 테트리스를 구현하자.

## 2. 게임보드와 블록구현

게임보드와 블록은 클래스(Class)로 규정하였다. 예제에서는 싱글게임이지만 경쟁하는 게임을 구현한다고 생각해보자. 클래스로 원하는 함수와 변수를 담은 객체를 손쉽게 만들어내는게 훨씬 쉽고 직관적이다.

게임보드를 구현하는 함수 board.js의 구성은 크게 다음과 같다.

<center><div class = "mermaid">
graph LR
A["class Board"] --- B
A --- C
B["생성자(constructor)"]
B --- Z["변수설정: 캔버스, 블록크기 설정"]
B --- Y["init(), initNext()"]
C["내장함수(function)"]
C --- D["reset()"]
D --- E["getEmptyBoard()"]
C --- F["drop()"]
C --- G["rotate()"]
</div></center>

### 2.1. 생성자(Constructor)

생성자(Constructor)는 클래스로 생성한 객체를 초기화하기 위한 메서드이다. 모든 클래스는 하나의 생성자만 가지게 된다. 인스턴스가 생성될 때마다, 생성자 안에 적힌 코드를 실행한다. 속성에 값을 할당하거나, 내장함수를 실행하는 등의 동작이 가능하다. 이 스크립트에서는 게임보드와 블록의 기본크기를 설정하고자 사용했다.

게임보드는 격자판 모양으로 설계한다. 이는 나중에 볼 piece.js에서도 알 수 있지만, 게임보드와 블록을 2차원 행렬로 구현하기 위함이다. 게임보드를 격자가 있는 바둑판이라고 생각해보자. 격자를 이루는 단위 정사각형의 한 변의 길이는 블록 하나의 길이로 설정한다. 이러면 각 블록의 위치를 이차원 행렬로 나타내기 용이하며, 블록을 화면상에 구현하기도 편할 것이다.

constants.js에서 변수 cols, row, blocksize로 미리 값을 설정하였다. 게임보드를 가로가 cols x blocksize, 세로가 rows x blocksize인 사각형으로 설정하자. 그러면, 게임보드는 격자간격이 blocksize인 바둑판이 된다.

```js
// constants.js
const cols = 10;
const rows = 20;
const blocksize = 30;

// board.js
class Board {
  constructor(canvas, canvasNext) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.canvasNext = canvasNext;
    this.ctxNext = canvasNext.getContext("2d");

    this.init();
    this.initNext();
  }
  init() {
    this.canvas.width = cols * blocksize;
    this.canvas.height = rows * blocksize;
    this.ctx.scale(blocksize, blocksize);
  }
  initNext() {
    this.canvasNext.width = cols * blocksize;
    this.canvasNext.height = rows * blocksize;
    this.ctxNext.scale(blocksize, blocksize);
  }
}
```

생성자의 매개인자인 canvas, canvasNext는 main.js에서 querySelector로 캔버스 엘리먼트(`<canvas>...</canvas>`)를 입력받는다. 여기서 canvas는 게임을 진행할 게임보드이고, canvasNext는 다음 블록을 표시하는 보드이다.

캔버스 상에서 그림 그리기는 캔버스 API의 일부인 CanvasRenderingContext2D에서 일어난다. 실질적으로 필요한 것이 이 2D 렌더링 컨텍스트다. ctx에 getContext("2d")로 해당 컨텍스트를 할당한다.

### 2.2. 클래스 내장함수

클래스 속성으로 필요할 때 호출할 수 있는 내장함수들이다. board.js 내장함수는 보드초기화, 블록하강, 블록회전 함수가 있다. 각 함수의 구성과 역할을 알아보자.

#### 2.2.1. 게임보드와 블록 생성 및 초기화

초기화 함수 reset()은 새로운 게임을 시작하면 실행된다. 이 함수는 getEmptyBoard()라는 함수를 실행하는데, 이 함수는 새로운 게임보드를 2차원 행렬 형태로 반환한다. 이차원행렬은 배열 속에 배열이 있는 이중배열로 구현할 수 있다.

```js
// main.js
let board = new Board(canvas, canvasNext);

function play() {
  resetGame();
}

function resetGame() {
  board.reset();
}

// board.js
class Board {
  reset() {
    this.grid = this.getEmptyBoard();
  }
  getEmptyBoard() {
    return Array.from({ length: rows }, (y) => Array(cols).fill(0));
  }
}
```

Array.from()은 유사배열 객체나 순회가능한 객체를 매개인자로 받아 얕은복사를 한 새로운 배열을 만든다. 두 번째 인자로는 배열의 모든 요소에 매핑할 함수를 넣는다. 가령, x => { 2 \* x } 를 넣는다면, 기존배열의 요소들에 각각 2를 곱한 값을 요소로 하는 새로운 새로운 배열을 복사한다.

유사배열 객체는 속성이 length이고, 값이 정수인 객체이다. Array.from({length: rows})을 실행하면, 배열의 길이가 rows이고 요소들은 모두 undefined인 배열이 생성된다. Array(cols)는 길이가 cols이고 요소들은 모두 undefined인 배열을 생성한다.

<center><img src = "https://drive.google.com/uc?export=view&id=1Ws4cKuoJNK09jItFT4LKahXMldkI6be9" width = "600px"></center>    
    
생성한 배열 Array.from({length: rows}, (y) => Array(cols).fill(0))은 x축 크기가 cols이고 y축 크기가 rows인 2차원 행렬열 만드는 것이다. 이차원행렬을 좌표계로 보고, 어떤 점 위에 블록이 있다면 0 없으면 1로 표기할 수 있다. 참고로, 캔버스 2D 컨텍스트에서 원점은 좌측 상단이다.

보드의 다른 내장함수를 살펴보기 전에 **블록 클래스를 확인해보자.**

```js
// main.js
function play() {
    let piece = new Piece(ctx);
    piece.draw();
    board.piece = piece;
}

// constatns.js
const tetroShapes = [
    [
        [1, 0, 0],
        [1, 1, 0],
        [1, 0, 0]
    ], ....
]

// piece.js
class Piece {
    constructor(ctx) {
        this.x = Math.floor(cols/2 - 2);
        this.y = 0;
        this.ctx = ctx;
        this.spawn();
        }
    }

    randomizeTetrominoType(num) {
        return Math.floor(Math.random() * num);
    }

    spawn() {
        this.colorIdx = this.randomizeTetromino(tetroColors.length - 2 ) + 1;
        this.shapeIdx = this.randomizeTetromino(tetroShapes.length - 1);
        this.color = tetroColors[this.colorIdx];
        this.shape = JSON.parse(JSON.stringify(tetroShapes[this.shapeIdx]));
        this.shape.forEach( (rows, y) => {
            rows.forEach( (value, x) =>{
                if ( value > 0 ) {
                    rows[x] = this.colorIdx;
                }
            })
        })
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.shape.forEach( (row, y) => {
            row.forEach( (value, x) => {
                if ( value > 0 ) {
                    this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
                }
            })
        })
    }

    move(p) {
        this.x = p.x;
        this.y = p.y;
        this.shape = p.shape;
    }
}
```

게임이 시작되면 새로운 블록 인스턴스를 생성하고, 보드의 속성으로 할당한다. 블록은 게임보드와 마찬가지로 2차원 행렬구조이다. 블록 내에 this.x 와 this.y는 블록의 위치를 나타내는 기준점으로, 블록의 좌측상단 좌표의 (x, y)값이다. 캔버스 2D 컨텍스트에서 (0, 0)이 좌측상단임을 생각하자.

매 이동마다 블록의 기준점이 어디인지 알 수 있으니, 블록의 충돌과 회전을 구현할 수 있다. 보드판과 블록의 좌표는 board.grid[y][x], board.piece[y][x]로 불러올 수 있다. 블록은 매 프레임마다 현재 좌표를 확인하고, 이를 저장한 뒤 보드를 초기화하고 칠하는 과정을 반복한다.

#### 2.2.2. 블록하강과 이동

블록은 아래로 한 칸 이동하기 전에 이동가능한지 확인해야 한다. 블록의 현재 좌표와 모양, 크기를 알고 있음을 이용하면 된다. 2차원 배열에서 한 칸 아래로 이동한 지점의 값이 0보다 크면, 블록이 있으므로 이동해서는 안된다. 이를 board.js에서 다음과 같이 구현했다.

```js
//board.js
class Board {
    valid(p) {
        return p.shape.every( (row, dy) => {
            return row.every( (value, dx) => {
                let x = p.x + dx;
                let y = p.y + dy;
                return (
                    value === 0 || (this.isInsideWalls(x,y) && this.isNotOccupied(x, y));
                )
            })
        })
    }

    isInsideWalls(x, y) {
        return x >= 0 && x < cols && y <= rows;
    }

    isNotOccupied(x, y) {
        return this.grid[y] && this.grid[y][x] === 0;
    }

    freeze() {
        this.piece.shpae.forEach( (row, y) => {
            row.forEach( (value, x) => {
                if ( value > 0 ) {
                    this.grid[y + this.piece.y][x + this.piece.x] = value;
                }
            })
        })
    }

    drop() {
        let p = moves[key.down](this.piece);
        if ( this.valid(p) ) {
            this.piece.move(p);
        }
        else {
            this.freeze();
            this.clearLines();
            if ( this.piece.y === 0 ) {
                return false;
            }
            this.piece = this.next;
            this.piece.ctx = this.ctx;
            this.getNetPiece();
        }
    }
}


// main.js
const moves = {
    // 블록 인스턴스의 속성 중, ...p, 이후에 해당하는 값만 변경합니다.
    [key.left]: p => ({...p, x: p.x - 1}),
    [key.right]:p => ({...p, x: p.x + 1}),
    [key.down]: p => ({...p, y: p.y + 1}),
    [key.space]: p => ({...p, y: p.y + 1}),
}

function play() {
    resetGame();
    let piece = new Piece(ctx);
    piece.draw();
    board.piece = piece;
    animate();
}

function resetGame() {
    board.reset();
    time = {start: performance.now(), elapsed: 0, level: level[account.level]};
}

function animate(now = 0) {
    time.elapsed = now - time.start;
    if ( time.elapsed > time.level ) {
        time.start = now;
        if ( !board.drop() ) {
            gameOver();
            return;
        }
        board.drop();
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    board.draw();
    requestID = requestAnimationFrame(animate);
}
```

main.js의 moves 변수는 블록 인스턴스를 입력받으면, 속성 값중 x 또는 y를 수정한다. 다른 블록과 충돌하는지 확인하고 이동할 수 있다. board.js의 drop()함수는 다음과 같이 구성된다.

<div class = "mermaid">
graph LR
A["drop()"] --- B["valid(p)"]
B --- C["isInsideWalls(x, y)"]
B --- D["isNotOccupied(x, y)"]
A --- E["freeze()"]
A --- F["clearLines()"]
</div>
valid()는 블록이 다음 위치로 이동할 수 있는지 확인한다. 양옆 벽, 바닥, 다른 블록에 닿았는지 확인하여 이동할 수 있는지 여부를 반환한다. 이후 블록은 다음 위치로 이동하거나 그 자리에서 멈추게 된다. 더 이상 이동할 수 없다면, 현재 생성된 블록을 보드에 병합시키고, 새로운 블록이 떨어지도록 해야한다. freeze() 함수는 이동할 수 없는 블록의 위치좌표, 색상 값을 가져와서 보드에 붙여넣는다.
     
블록이 떨어지는 과정을 연속적으로 보여주려면 requestAnimationFrame()를 사용하면 된다. 이 함수는 한 번 실행되면, 1 프레임을 그려서 출력한다.

우리가 원하는건 일정시간마다 블록이 움직이는 것이다. 동영상처럼 화면이 움직이게 하려면 예제 animate()함수와 같이 함수를 재귀로 호출해야 한다. 주의할 점은 프레임 단위로 보여주므로, 모니터 주사율이 다르면 모니터 성능마다 영상 재생속도가 달라진다는 점이다. 60프레임을 보여준다고 하면 모니터 주사율이 60fps인 모니터에서는 1초 동안 재생하지만, 주사율이 120fps인 모니터는 0.5초 동안 재생한다. 따라서, 경과한 시간을 받아서 일정시간마다 재생할 수 있도록 해야한다. 예제에서는 객체 time에 start, elapsed, level(레벨마다 블록이 떨어지는 시간간격)으로 조정하였다.

방향키로 블록을 이동하거나 회전하는 등 조작 이벤트는 위 내용과 기본적인 흐름은 유사하다. 회전은 변환행렬 곱을 이용하여 배열을 만들고, 함수실행은 특정 키가 눌렸을 때로 바꾸어주면 된다. 이벤트 사용법과 행렬변환으로 회전하는 방법을 자세히 알고 싶다면 최상단 링크의 관련내용을 살펴보자.
