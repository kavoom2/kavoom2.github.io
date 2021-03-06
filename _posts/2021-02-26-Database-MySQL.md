---
title: Database - MySQL

excerpt: "node.js환경에서 MySQL 기반 관계형 데이터베이스 구축"

classes: wide

  

last_modified_at: 2021-02-26T21:00:00

use_mermaid: true
use_math: true

categories:
- MySQL
- Database
tags:
---

## 1. 데이터베이스의 필요성
In-Memory: 자바스크립트 변수에 할당하는 방식.    
배열에 넣는 방법이 이 방식이다. 프로그램이 종료되면 데이터도 같이 없어진다.
데이터 수명의 프로그램의 수명에 의존하게 됨.

File I/O: 파일을 읽어오는 방식    
파일을 매번 읽어야 한다는 것이 단점. 파일 크기가 커질 수록 버거워진다.
파일이 손상되거나 여러 파일을 동시에 다뤄야 하는 등 복잡하고 데이터양이 방대해질 수록 데이터 가공 및 선별이 힘들어진다.

SQL(Structured Query Language): 구조화된 쿼리 언어. 데이터베이스 언어의     기준이다.
쿼리(Query)는 질의문이라는 의미이다. 데이터베이스 언어의 쿼리는 원하는 데이터를 가져올 수 있도록 무엇을 요청하는지 작성한 언어. 

## 2. SQL(구조화 쿼리 언어) / NoSQL(비구조화 쿼리 언어)
NoSQL 기반 비관계형 데이터베이스의 종류는 다음과 같다.    
* Key-Value: 데이터를 키-값의 쌍으로 저장. (Redis, Dynamo)
* Document: 데이터를 테이블이 아닌 문서처럼 저장. JSON 유사 형식으로 데이터를 문서화. (MongoDB)
* Wide-Column: 
* Graph

SQL과 NOSQL의 차이점
* 데이터 저장(Storage): 관계형 데이터베이스는 미리 작성된 스키마를 기반으로 정해신 형식에 맞게 테이블에 저장. 비관계형 데이터베이스는 key-value, document, graph 등의 방식으로 저장.
* 스키마(Schema): NoSQL은 스키마가 보다 동적. 
* 확장성(Scalability): SQL 기반 관계형 데이터베이스는 일반적으로 수직적으로 확장. 데이터베이스가 하드웨어의 성능을 많이 이용하므로 고비용. NoSQL 데이터베이스는 수평적으로 확장. 많은 트래픽을 처리할 수 있도록 서버를 추가 구축하는 것이 보다 편리함. 저렴한 범용 하드웨어나 클라우드 기반 인스턴스에 NoSQL 데이터베이스를 호스팅 할 수 있다.

SQL기반 관계형 데이터베이스를 사용하는 케이스
* ACID(Atomicity, Consistency, Isolation, Durability)를 준수해야 하는 경우. 하나의 상태변화 수행에 안전성을 보장하기 위해 필요한 성질. 데이터베이스와 상호작용하는 방식을 명확히 규정할 수 있어 데이터 처리시 이상징후를 줄이고 무결성을 보호할 수 있다. 전자상거래, 금융서비스 소프트웨어 개발에서는 필히 준수.

* 데이터가 구조적이고 일관적인 경우. 

NoSQL기반 비관계형 데이터베이스를 사용하는 케이스
* 데이터 구조가 거의 또는 전혀 없는 대용량 데이터를 저장하는 경우. 데이터 유형에 제한을 두지 않는 것이 일반적이고, 필요에 따라 새로운 유형을 추가할 수 있다. 정형화되지 않은 방대한 데이터가 필요한 경우 적합
* 클라우드 컴퓨팅 및 저장공간을 최대한 활용하는 경우. 데이터베이스 확장성이 중요한데, 이 방식은 여러 데이터 센터에 걸쳐 보다 수월하게 확장할 수 있다.
* 빠르게 서비스를 구축하고 데이터 구조를 자주 업데이트하는 경우. 스키마를 미리 준비할 필요가 없으므로 빠르게 개발하는 프로젝트에서 유용. 또한, 데이터베이스 서버를 오프라인(다운타임)없이 자주 업데이트해야 하는 상황에도 더 적합함.

## 3. SQL 기본 명령어
1. TABLE 명령어    
SELECT, 
WHERE, 
AND / OR / NOT, 
ORDER BY, 
INSERT INTO, 
NULL, 
UPDATE, 
DELETE, 
COUNT, 
LIKE, 
WILDCARDS, 
ALIASES, 
INNER JOIN / LEFT JOIN / RIGHT JOIN, 
GROUP BY, 
LIMIT, 
HAVING    

2. 데이터베이스 명령어
CREATE DB, DROP DB, CREATE TABLE, DROP TABLE, ALTER TABLE, NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, DEFAULT, AUTO INCREMENT, DATAES    

> SELECT - FROM - JOIN - ON / WHERE - GROUP BY - ORDER BY - HAVING
> WHERE / ON: GROUP BY로 그룹화 하기 전에 조회한 데이터를 필터링함.
> HAVING: GROUP BY로 그룹화 한 결과를 필터링함.    

## 4. Schema & Query Design
스키마(Schema): 데이터베이스에서 데이터가 구성되는 방식, 엔티티간의 관계에 대한 설명. 데이터베이스의 청사진/설계도.    
엔티티(Entity): 고유한 정보 단위. 관계형 데이터베이스에서는 테이블로 표시한다.    
필드(Field): 각 엔티티마다 특성을 가지고 있다. 각각의 특성을 필트라고 한다. 열(Column)에 해당한다.       
레코드(record): 테이블에 저장된 항목. 한 행(Row)의 정보이다.     
기본 키(Primary Key):각 테이블의 레코드 하나를 가리키는 숫자. 유일(Unique)하며, 자동적으로 그 값이 증가한다(Auto Increment). 각 테이블은 반드시 기본키를 가져야한다.    
외래 키(Foreign Key): 다른 테이블에서 기본 키(Primary Key)를 참조하는 값이다.
1:N(일대 다), N:M(다대 다): 테이블간의 관계를 나타낸 것.



## PS. Node.js 에서 .env파일
node.js 기반 프로젝트 개발을 하면서 외부에 알려지면 안될 민감한 정보들은 일반적으로 소스코드에 하드코딩하거나 특정 설정파일을 만들어서 가져오는 경우가 있다. 하드코딩으로 소스코드에 정보를 넣어두면 깃허브 등 오픈소스 공개시 관련 정보 유출의 위험이 있으며, 관련 정보 수정시 서비스를 재배포해야하는 문제가 있다.

이러한 정보들은 환경변수에 저장해놓고 사용하는 것이 일반적이다. 다음과 같이 환경변수명을 설정하고 불러올 수 있다. Node.js는 환경변수에 접근할 때 process.env라는 자바스크립트 객체를 사용한다. 전역객체이므로 별도로 모듈을 임포트하지 않아도 된다.

```js
// 1. 환경변수 설정
export 환경변수명 = "설정값"
// 또는
process.env.환경변수명 = "설정값"

// 2. 환경변수 불러오기
process.env.환경변수명
````
.env는 환경변수를 관리하는 파일이다. node.js의 dotenv 모듈이 필요하다. 프로젝트 최상위 경로에 .env파일을 생성하고, 환경변수 값을 넣어주면 된다. 그리고 오픈소스에 업로드하지 않도록 .gitignore 파일에 .env를 등록해야 한다.

```js
// .env
DATABASE_USERNAME="root"
DATABASE_PASSWORD="1234"
DATABASE_NAME='learnMySQL'

// mysql.js에서 다음과 같이 환경파일 내부의 설정값을 불러올 수 있다.
const dotenv = require("dotenv");

class Database {
    constructor(){
        this.config = {
            host: "localhost",
            user: process.env.DATABASE_USERNAME || "root",
            password: process.env.DATABASE_PASSWORD || "",
            database: process.env.DATABASE_NAME || "mySQL";
        }
    }
}

//.gitignore
.env
````


## 5. MySQL: Getting Started
mySQL에 접속하여 데이터베이스를 만든다
```js
mysql > CREATE DATABASE learnmysql;
````
배치파일(schema.sql)을 작성하면 데이터베이스의 스키마를 한 번에 적용할 수 있다. [공식문서](https://dev.mysql.com/doc/refman/8.0/en/batch-mode.html)를 보도록 하자.    

```js
// schema.sql 예시
CREATE TABLE users (
  id INT AUTO_INCREMENT,
  username varchar(255),
  PRIMARY KEY (id)
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT,
  user_id INT,
  total_price INT,
  created_at DATAETIME DEFAULT CURRENT_TIMESTAMP,
  // DATETIME TYPE
  // DEFAULT CURRENT_TIMESTAMP: 현재 TIMESTAMP값을 INSERT 시점에 기본값으로 설정
  // ON UPDATE CURRENT_TIMESTAMP: 해당 열(ROW)가 업데이트될 때마다 업데이트 시점의 TIMESTAMP로 설정
  PRIMARY KEY (id)
);

ALTER TABLE orders ADD FOREIGN KEY (user_id) REFERENCES users (id);

// 다음은 터미널에서 실행한다.
$ mysql -u root -p < 터미널에서 해당 파일까지 경로/schema.sql
````
잘못된 SQL을 작성하여 해당 데이터베이스를 삭제하고 다시 생성해야할 경우도 있다. 다음 명령어를 실행하면 기존 데이터베이스를 삭제하고, 작성된 SQL에 따라 데이터베이스를 다시 생성한다.
```js
DROP DATABASE IF EXIST [다시 생성할 데이터베이스] CREATE DATABASE [다시 생성할 데이터베이스]
````

node.js에서 mySQL을 사용하려면 mysql 모듈을 설치해야한다. 클라이언트, 서버를 나누어놓았다면 서버 디렉토리에 모듈을 설치하도록 하자.

config.js 파일에서 mySQL과 관련한 설정을 관리하도록 하였다.
```js
// config/config.js
const dotenv = require("dotenv");
dotenv.config();

const config = {
    host: "localhost",
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: "learnmysql",
    // 다중쿼리를 사용할 수 있도록 하는 옵션이다.
    multipleStatements: true
    }
}

module.exports = config;
````

데이터베이스와 서버 인스턴스를 연결해야 한다. 데이터베이스를 구축하자.    

```js
// db/index.js
const mysql = require("mysql");
const dotenv = require("dotenv");
const config = require("../config/config");
dotenv.config();

const con = mysql.createConnection(config)

con.connetc((err) => {
    if (err) throw err;
    console.log(`connected as id ` + con.threadId);
});

module.exports = con;
````

클라이언트와 연결할 서버를 구축한다.    

```js
// app.js
const express = require("express");
const router = require("./routes");
const morgan = require("morgan"); // request, response를 formmating하는 logger 모듈
const cors = require("cors");
const parser = require("body-parser");
const controller = require("./controllers");

const app = express();
const port = 4000;

app.use(morgan(`:method :url :status :res[content-length] - :response-time ms`))
app.use(cors());
app.use(parser.json());
app.use("/users", router);
app.use("/items", controller.item.get);

module.exports = app.listen(port, () => {
    console.log(`The server is listening on ${port}`)
})

// routes.js
const router = require("express").Router();
const controller = require("./controllers");

// userId로 전체 주문내역을 조회한다.
router.get("/:userId/orders", controller.orders.get);
// 새로운 주문을 생성한다.
router.get("/:userId/orders/new", controller.orders.post);


// URL에서 :userId는 URL에서 :userId 부분을 해당 이름으로 하는 변수로 전달할 수 있도록 한다.
````

다음은 라우터 분기별로 요청에 대해 수행하는 함수이다. 클라이언트로 요청을 받은 것을 토대로 데이터베이스에 요청한다.    

```js
// controllers/index.js
const models = require("../models")

module.exports = {
    // 주문과 아이템에 관한 Action을 분리한다.
    // 1. Orders
    orders: {
        get: (req, res) => {
            // 다음과 같이 URL의 :userId를 사용한 것을 확인할 수 있다.
            const userId = req.params.userId;

            if (!userId) return res.status(401).send("Unauthorized user.");
            else {
                models.orders.get(Number(userId), (error, result) => {
                    // query함수의 callback을 controller.js에서 규정할 수 있도록 하였다. 훨씬 명확하다.
                    if (error) res.status(404).send("No orders found.")
                    else res.status(200).json(result);
                })
            }
        }
    },
    post: (req, res) => {
        const userId = req.params.userId;
        const { orders, totalPrice } = req.body;
        if (orders.length === 0) return res.status(400).send("Bad request.");
        else {
            models.orders.post(Number(userId), orders, totalPrice, (error, result) => {
                if (error) res.status(404).send("Not found.");
                else res.status(201).send("Order has been successfully placed.");
            })
        }
    },
    // 2. Items
    items: {
        get: (req, res) => {
            models.items.get((error, result) => {
                if (error) res.status(404).send("Not found");
                else res.status(200).json(result);
            }) 
        }
    }
}

// models/index.js
const con = require("../db");

module.exports = {
    // 1. Orders
    orders: {
        get: (userId, callback) => {
         const sql = `SELECT orders.id, orders.created_at, orders.total_price, order_items.order_quantity, items.image, items.name, items.price
           FROM users INNER JOIN orders ON users.id = orders.user_id
           INNER JOIN order_items ON orders.id = order_items.order_id
           INNER JOIN items ON order_items.item_id = items.id
           WHERE users.id = ${userId}`;

           con.query(sql, (err, result) => {
               callback(err, result);
           })
        },
        post: (userId, orders, totalPrice, callback) => {
            const sql1 = `INSERT INTO orders (user_id, total_price) VALUES (${userId}, ${totalPrice});`
            con.query(sql1, (err, result) => {
              if (result) {
                const sql2 = `INSERT INTO order_items (order_id, item_id, order_quantity) VALUES ?`
                const params = orders.map(obj => [result.insertId, obj.itemId, obj.quantity])
                con.query(sql2, [params], (err, result) => {
                  callback(err, result)
                })
              } else callback(err, result);
            })
        }
    },
    // 2. Items
    items: {
        get: (callback) => {
            con.query(`SELECT * FROM items`, (err, result) => {
                callback(err, result);
            })
        }
    }
}
````

last_insert_id를 사용할 수도 있지만, 이 경우 bulk array형태인 params로 활용할 수 없다. 따라서,
첫 번째 쿼리를 실행하고 나서, FOREIGN KEY에 result.insertId를 할당하는 방법으로 해결할 수 있다.      

```js
// models.orders.post를 LAST_INSERT_ID()를 사용하여 구현하는 경우.
const sql1 = `INSERT INTO orders (user_id, total_price) VALUES (${userId}, ${totalPrice});`
const sql2 = `INSERT INTO order_items (order_id, item_id, order_quantity) VALUES `
const params = orders.map(obj => "(" + [`LAST_INSERT_ID()`, obj.itemId, obj.quantity].join(",") + ")").join(",");

con.query(sql1 + sql2 + params, (err, result) => {
  callback(err, result);
})
````

LAST_INSET_ID()는 **마지막으로 성공적으로 수행한 INSERT 구문의 첫 번째 AUTO_INCREMENT INDEX**값이다. 또한 서로 다른 Connection의 A, B가 동시에 호출해도 LAST_INSERT_ID()는 별도로 관리된다. 다음 예제를 보도록 하자.    
    
초기 LAST_INSERT_ID()는 1이라고 하자. A에서 INSERT를 하여 AUTO_INCREMENT가 2이 되었고, B에서 INSERT를 하여 AUTO_INCREMENT가 3가 되었다. INSERT를 마치고나서 A가 LAST_INSERT_ID()를 불러오고, B가 LAST_INSERT_ID()를 불러오면 각각 2, 3를 불러오게 된다. 이는 LAST_INSERT_ID()가 Connetion마다 별도로 관리되기 때문.     


## 6. 데이터베이스 정규화(Database Normalization)
### 데이터 중복(Data Redundancy)
어떤 데이터의 동일한 복사본이나 부분적인 복사본을 의미한다. 중복성은 데이터 복구를 수월하게 할 수 있다. 하지만 일관된 자료처리의 어려움, 저장공간 낭비, 데이터 효율성 감소의 문제점을 지니고 있다.    

### 데이터 무결성(Data Integrity)
데이터는 수명주기 동안에는 정확성과 일관성을 지녀야 한다. 이는 데이터가 오염되지 않아야 하고, 입력받는 그대로 데이터를 사용할 수 있어야 한다는 의미이다.    

### 데이터 이상현상(Data Anomaly)
데이터를 삽입, 수정, 삭제하게되면 예상치 못한 현상이 일어나기도 한다. 이를 데이터 이상현상이라고 한다.

갱신이상은 동일한 데이터가 여러 레코드에 걸쳐 있을 때, 어느 데이터를 갱신해야하는지 명확하지 않아 발생하는 현상이다. 다음과 같이 두 개의 레코드가 동일한 ID일 때 갱신을 하게 되는 경우 발생할 수 있다.    

|  Employee ID | Employee Address | Skill    |
|--------------|------------------|----------|
| 1            | Suwon            | Reading  |
| 2            | Seoul            | Writing  |
| 2            | Busan            | Speaking |


삽입이상은 데이터 삽입을 하지 못하는 현상이다. 다음 테이블에 새로운 교수를 넣는다고 해보자. 이 교수가 가르칠 수업이 정해지지 않았다면, 코스를 NULL 등으로 지정하지 않는다면 데이터를 추가하지 못할 것이다.    

| Faculty ID | Faculty Name | Course Code |
|------------|--------------|-------------|
| 1          | Dr. Kim      | A-01        |
| 2          | Dr. Min      | B-01        |
| 2          | Dr. Min      | B-02        |


삭제이상은 데이터의 특정부분을 제거할 때 의도치 않게 다른 부분도 함께 지워지는 현상이다. 다음 테이블에서 A-01이라는 수업이 사라진다고 해보자. 의도치 않게 교수에 대한 정보도 같이 삭제될 수 있다.

| Faculty ID | Faculty Name | Course Code |
|------------|--------------|-------------|
| 1          | Dr. Kim      | A-01        |
| 2          | Dr. Min      | B-01        |
| 2          | Dr. Min      | B-02        |

## 7. ACID
트랜잭션(Transaction)은 여러 개의 작업을 하나의 실행 유닛으로 묶은 것. **모든 작업들을 완료**해야 성공적으로 작업을 마친다. 하나라도 실패하면 전부 실패한 것으로 판정한다. ACID는 데이터베이스 내에서 일어나는 트랜잭션의 안전성을 보장하기 위한 특성이다.    

### 원자성(Atomicity)
하나의 트랜잭션은 전부 성공하거나 실패해야 한다는 원칙. 계좌이체를 A 계좌에서 꺼내서 B 계좌에 해당 금액을 추가하는 것으로 나눌 수 있을 것. 두 과정 중 하나라도 실패하면 트랜잭션 내부에 성공한 작업들도 실패로 되돌아가야 한다는 것.

### 일관성(Consistency)
어떤 트랜잭션의 이전과 이후 데이터베이스의 성질은 이전과 같이 유효해야 한다는 원칙. 특정 제약이나 규칙에 의거해야 한다는 것이다. `이름이 없는 고객을 추가하는 쿼리`가 예시가 되겠다.    

### Isolation
하나의 트랜잭션은 다른 트랜잭션과 독립적이어야 한다는 원칙. 실제로 동시에 여러 트랜잭션이 수행되어도, 각 트랜잭션은 연속적으로 실행한 것과 동일한 결과를 나타내야 한다.    

### Durability
하나의 트랜잭션이 수행되면, 그에 대한 기록이 영구적으로 남아야 한다는 원칙.

## 8. SQL 쿼리 문법 종류
### Data Definition Language(DDL)
데이터베이스의 테이블 등 오브젝트를 정의할 때 사용하는 문법. CREATE, DROP 등이 해당된다. 

### Data Manipulation Language(DML)
데이터베이스에 데이터를 저장할 때 사용하는 문법. INSERT, DELETE, UPDATE 등이 해당된다.

### Data Control Language(DCL)
정해진 스키마 내에서 쿼리를 할 수 있는 문법. SELECT이 대표적이다.

### Transaction Control Language(TCL)
DML을 거친 데이터 변경사항을 수정할 수 있는 문법. DML이 작업한 내용을 데이터베이스에 커밋하는 COMMIT과 커밋했던 내용을 다시 롤백하는 ROLLBACK 등이 있다.

## 9. SQL Advanced
### CASE
자바스크립트의 조건문과 유사하다. 다음은 ID가 ~25는 GROUP1, ~50은 GROUP2, 나머지는 GROUP3으로 분류하는 쿼리문이다.
```js
SELECT CASE
WHEN CustomerID <= 25 THEN "GROUP1"
WHEN CustomerID <= 50 THEN "GROUP2"
ELSE "GROUP3"
END AS "GROUP", CustomerName
FROM Customers
````

### SUBQUERY
쿼리문을 작성할 때 다른 쿼리문을 포함하는 것을 서브쿼리라고 한다. 서브 쿼리는 소괄호로 감싸져 있으며, 하나의 칼럼으로 활용하거나 결과를 레코드 리스트로 넘겨줄 수 있다. 다음은 CustomerID < 6인 레코드에서 CustomerID = 2 이면 1, 아니면 0을 반환하는 테이블이다.

```js
SELECT CustomerID, CustomerID = (SELECT CustomerID FROM Customers WHERE CustomerID = 2) AS "Id === 2"
FROM Customers
WHERE CustomerID < 6
````

### SUBQUERY - IN, NOT IN
특정 값이 서브쿼리에 있는지 확인할 수 있다. 다음 쿼리에서 서브쿼리는 CustomerID가 10 이하인 데이터를 돌려주며, 쿼리는 서브쿼리에서 속한 데이터들만 조회한다. NOT IN을 사용하면 여집합을 확인할 수 있다.
```js
SELECT *
FROM Customers
WHERE CustomerID IN (SELECT CustomerID FROM Customers WHERE CustomerID < 10)
````

### SUBQUERY - EXIST, NOT EXIST
서브쿼리의 존재하는 레코드를 확인한다. 레코드가 존재하면 참, 아니면 거짓을 반환한다.

### SUBQUERY - FROM
서브쿼리를 FROM과 함께 사용할 수 있다.
```js
SELECT *
FROM (
    SELECT CustomerID
    FROM Customers
    WHERE CustomerID < 10
)
````