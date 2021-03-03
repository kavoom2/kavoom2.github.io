---

title: 소프트웨어 설계에서 디자인 패턴

excerpt: "MVC 디자인 패턴과 Sequelize ORM 실습"

classes: wide

  

last_modified_at: 2021-03-02T21:00:00

use_mermaid: true
use_math: true

categories:
- MVC
- Sequelize
tags:
- design pattern
---
## 1. MVC
MVC는 Model View Controller의 약자로 애플리케이션을 세 가지 역할로 구분하는 개발 방법론. 사용자가 Controller를 조작하면, Controller는 Model을 통해 데이터를 가져온다. 가져온 정보를 바탕으로 시각적 표현을 담당하는 View를 제어하여 사용자에게 전달한다.    

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Router-MVC-DB.svg/1024px-Router-MVC-DB.svg.png" width="400px">    

Web에서 MVC를 적용하면 다음 과정을 거치게 된다.    

* 사용자가 웹 사이트에 접속
* Controller는 사용자가 요청한 웹페이지를 서비스하고자 모델을 호출
* Model은 데이터베이스이나 파일 등 리소스를 제어하고, 그 결과를 반환
* Controller는 Model이 반환한 결과를 View에 반영
* 새로운 정보가 반영된 View가 사용자에게 전달    
    

## 2. ORM

ORM(Object-Relational Mapping)은 모델을 기술하는 도구이다. ORM을 이용하면 직접 SQL 쿼리를 작성하지 않고, 엔티티를 자바스크립트로 표현할 수 있다. 자바스크립트에는 객체를 클래스로 구현하였는데, 클래스와 데이터 테이블을 자동으로 매핑(연결)한 것이다.    

<div class="mermaid">
graph LR
A(("&#123;   &#125;"<br>Object)) --- B(ORM)
B --- C[(Relational<br>Database)]

</div>

## 3. Sequelize
Sequelize는 프로미스 기반 Node.js 환경에서 사용할 수 있는 ORM이다. 설치 및 사용법은 [공식문서 - CLI을 사용하는 방법](https://sequelize.org/master/manual/migrations.html)를 읽도록 하자.     

```js
npm install --save sequelize
npm install --save mysql2 // 지원하는 데이터베이스 중 원하는 것을 선택.
npm install --save sequelize-cli // CLI(Command-line Interface)를 사용할 수 있도록 하는 보조 툴
````

모델(Models)은 클래스(Class)의 메서드, 속성과 스키마(Schema)의 엔티티를 합쳐놓은 것이다. 실제 데이터베이스로 옮기기 전, 와이어 프레임을 짤 수 있는 곳. 모델의 기능을 추가하거나 삭제할 수 있다.

마이그레이션(Migration)은 스키마(Schema)를 정의한다. 한편, 각각의 마이그레이션은 깃의 **커밋**처럼 작업 히스토리를 남기는 역할을 수행한다. 따라서, 모델을 수정해야한다면 먼저 작업을 되돌리고, 새로운 마이그레이션을 생성한다.    

```js
npx sequelize-cli db:mirgrate:undo // 가장 최근에 데이터베이스로 옮긴 작업을 되돌린다.
npx sequelize-cli migration:generate --name ...// 모델을 수정하기 위해 새로운 마이그레이션을 생성한다. 새로 생성한 마이그레이션에 수정 작업을 해야한다.
````

새로 생성한 마이그레이션에 반영할 수정사항을 적어준다. 이 때, 마이그레이션이 작업 히스토리의 역할을 수행할 수 있도록 up, down에 모두 적어주어야 한다.    

```js
// 새로 생성한 mirgartion js
'use strict';
const { users, url } = require("../models")

// npx sequelize-cli migration:generate --name "name..."
//새로운 Migration Skeleton을 생성한다. 여기에서 FK 등 수정작업을 할 것.

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // UP은 새로 추가할 요소들을 적는다. 데이터 베이스에 적용하기.
    // QueryInterface API를 살펴볼 것.
    queryInterface.addColumn("urls", "userId", Sequelize.INTEGER);
  },

  down: async (queryInterface, Sequelize) => {
    // DOWN은 Undo 할 때 할 것을 적는다. 데이터 베이스에서 되돌리기.
    queryInterface.removeColumn("urls", "userId");
  }
};
````

Association은 관계형 데이터베이스에서 JOIN 관계를 갖는 데이터 사이의 처리를 위해 사용한다. Sequelize에서 $1: N$을 구현해보자. 새로운 마이그레이션을 생성하여 외래키를 만들고, 각 모델파일에서 association을 추가해야 한다. 모델과 마이그레이션에서 수정작업이 끝나면, `npx sequelize-cli db:migrate`를 실행하면 된다.    

```js
// 1. models/url.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataType) => {
  class url extends Model {
    static associate(models) {
      // Associate를 정의한다.
      url.belongsTo(models.users, {
        foreignKey: "userId"
      })
    }
  };
  url.init({
    // Model fields
    url: DatyTypes.STRING,
    title: DataTypes.STRING,
    visits: {
      type: DataTypes.INTEGER,
      defaultValue:0
    }
  }, {
    // Sequelizer Options
    sequelize,
    modelName: "url"
  })
  return url;
};

// 2. models/users.js
"use strict"
const { Model } = require("sequelizer");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      // Associate를 정의한다.
      users.hasMany(models.url, {
        foreignKey: "userId",
        as: "urls"
      })
    }
  };
  users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: "users"
  });
  return users;
}

// 3. migrations/새로 생성한 마이그레이션.js
// urls 테이블에 새로운 Column(=userId)를 생성해야 한다.
"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Model 이름이 아닌 Table 이름으로 적어야 한다. (urls이다)
    return queryInterface.addColumn("urls", "userId", {
      type: "integer",
      references: {
        model: "users",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("urls, "userId");
  }
};
````


## 4. Reference
[생활코딩 - MVC 디자인 패턴](https://opentutorials.org/course/697/3828)    
[Sequelize 공식문서](https://sequelize.org/)