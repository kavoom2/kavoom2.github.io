---

title: 권한 부여 와 인증 시스템

excerpt: "쿠키, 세션, 토큰, OAuth 기반 권한 및 인증 시스템"

classes: wide

  

last_modified_at: 2021-03-08T21:00:00

use_mermaid: true
use_math: true

categories:
- Authorization
tags:
- cookie
- session
- token
- OAuth
---
## 1. HTTPS(Hyper Text Transfer Protocol Secure Socket Layer)
HTTP 프로토콜의 내용을 암호화한 프로토콜. HTTP over SSL이라 부르기도 한다.

HTTP보다 안전한 프로토콜이며, 데이터 제공자의 신원을 보장할 수 있다. 클라이언트는 데이터 제공자가 제공한 데이터밖에 사용할 수 없다. 그러다보니 요청 및 응답을 중간에 가로채는 중간자 공격에 취약하다. 이를 보완하려면, 해당 데이터가 **특정 도메인**에서 전달되었다는 추가 데이터를 응답에 실어 보내서 요청과 응답의 도메인을 비교할 수 있도록 하며 된다.  물론, 이러한 데이터도 변조할 수 있으니 암호화 작업이 필요하다.   

**HTTPS에서 사용하는 인증서(Certificate)**는 데이터 제공자의 신원을 보장하는 장치이다. 
먼저, 요청을 받은 서버는 응답에 인증서를 포함하여 전달한다.
이후 클라이언트가 응답을 받으면, 요청 인증서의 도메인과 응답 인증서의 도메인을 비교하여 데이터 제공자의 신원을 확인한다.    

따라서, 응답 인증서의 도메인이 요청에 있는 것과 다르다면 제 3자가 위조한 것임을 알 수 있다.

**CA(Certificate Authority)**는 인증서를 발급하는 공인된 기관이다.

**HTTPS에서는 비대칭 키**도 사용한다. 정보를 Key A로 암호화를 했다면, 복호화할 때는 전혀 다른 Key B가 필요하다. 즉, HTTPS는 두 개의 키를 한 쌍으로 사용한다. 하나는 숨겨두고, 다른 하나는 클라이언트에 공개하여 데이터를 안전하게 전달할 수 있도록 한다.

### 1. 1.로컬 환경에서 인증서 생성

[**mkcert**](https://github.com/FiloSottile/mkcert)라는 프로그램을 사용하여 로컬환경 내에 신뢰할 수 있는 인증서를 만들 수 있다. 다음은 인증서의 개인키(Key)와 서명한 인증서(Cert)를 생성하는 명령어이다.
```js
// 먼저 인증서를 설치할 디렉토리로 이동한다.
$ mkcert - install
$ mkcert -key-file key.pem -cert-file cert.pem localhost 127.0.0.1 ::1 // localhost, 127.0.0.1(IPv4), ::1(IPv6)에서 사용할 수 있는 인증서 생성
````

## 2. Hashing
임의의 연산을 적용하여 다른 문자열로 적용하는 것이다. 해싱에는 3가지 원칙이 있다.

> 1. 모든 값에 대해 해시 값을 계산하는데 오래 걸리지 않아아 햔다.
> 2. 가능하면 중복되는 해시값이 없도록 해야하며, 모든 값이 고유한 해시값을 가질 수 있도록 한다.
> 3. 유추할 수 없도록 아주 작은 단위의 문자열이 변경도 완전히 다른 해시값을 가져야 한다.    

**Salt**는 암호화할 값에 **임의로 정한 별도의 문자열**을 추가하여 결과를 변형하는 것. 암호화 알고리즘이 노출되더라도 원본값을 보호할 수 있는 안전장치이다. Salt에도 지켜야 할 4가지 원칙이 있다.

> 1. Salt는 유저와 패스워드마다 유일한 값을 가져야 한다.
> 2. 사용자 계정을 생성할 때, 비밀번호를 변경할 때 새로운 임의의 Salt를 사용해야 한다.
> 3. Salt는 재사용하면 안된다.
> 4. Salt는 DB의 유저 Table에 같이 저장해야 한다.    


3 Tier Architecture에서 적용은 대략 아래 그림과 같다.
<div class="mermaid">
sequenceDiagram
    Client->>+Server: email: a@naver.com<br>password:asdf
    Server->>+Server: password 암호화<br>asdf --> fghj
    Database->>+Server: email: a@naver.com<br>password: fghj
    Server->>+Server: 비교하여 일치여부 확인
    Database->>+Server: a@naver.com의<br>phoneNumber, address 등.. 전달
    Server->>+Client: Resp<br>email, phoneNumber... 전달
</div>

## 3. Cookie
HTTP의 비연결성(connectionless), 무상태성(stateless)을 보완하기 위한 데이터이다. 어떤 웹사이트에 들어갔을 때 서버가 일방적으로 클라이언트에 전달하는 데이터이다. 해외에서는 정책상 쿠키 사용여부를 확인한다. 쿠키는 서버가 클라이언트에 정보를 저장하거 불러올 수 있다. 클라이언트는 해당 도메인에 대한 쿠키가 존재하면 HTTP 요청 전달시 쿠키를 함께 전달할 수 있다.

사용자 선호, 테마 등 장기간 보존해야 하는 정보를 저장하는데 적합하다.

## 4. Session
서버가 Client에 유일하고 암호화된 ID를 부여하고, 중요 데이터는 서버에서 관리한다. 신뢰할 수 있는 유저인지 서버에서 확인할 수 있지만, 클라이언트를 확인하려면 접속상태를 알고 있어야하므로 서버를 분산하는 경우에 적합하지 않다. 또한 서버의 메모리에 이용자 정보를 저장하고 있기에 가용할 수 있는 메모리가 한정적이다. 

# 5. Token-base Aunthetication
[**JSON Web Token** ](https://jwt.io/)을 사용하도록 한다.
>**aaaaa(header).bbbb(payload).cccc(signature)**    
>    
>1. header: 토큰 종류, 암호화 알고리즘    
>2. payload: 유저의 정보, 권한 여부, 기타 정보    
>3. signature: Header, payload를 base64로 인코딩 한 값과 Salt값의 조합으로 암호화한 값    


**Access Token**은 보호된 정보(유저 개인정보)에 접근할 수 있는 권한부여에 사용한다. 클라이언트가 처음 인증을 받을 때(로그인), Access와 Refresh Token을 받으나 실제로 권한을 얻는데 사용한 것은 Access token이다. 권한을 부여받는데에는 Access token만 있으면 되지만, 제 3자가 탈취할 수 있기 때문에, 짧은 유효기간을 가지고 있다.

**Refresh token**은 Access token이 만료되면 Refresh token으로 새로운 Access token을 발급받게 된다. 

Token의 장점은 다음과 같다.
> 1. Stateless, Scalability(무상태성, 확장성): 세션과 달리 서버는 클라이언트 정보를 저장할 필요가 없으며, 해독이 되는지만 판단한다. 클라이언트가 새로운 요청을 보낼 때 헤더에 토큰을 담으면 된다. 동일 토큰으로 여러 서버에서 인증 가능
> 
> 2. 안전성: 암호화한 토큰을 사용하며, 암호화 키를 노출할 필요가 없으므로 안전함.
> 
> 3. 어디서나 생성가능: 토큰을 확인하는 서버가 꼭 토큰을 만들 필요는 없음. 토큰 생성용 서버나 외부의 서버를 사용하여 생성하여도 해독만 가능하면 무방.
> 
> 4. 권한 부여에 용이: 토큰의 Payload 안에 어떤 정보에 접근 가능한지 정할 수 있다.


# 6. OAuth 2
일반적으로 많이 사용하는 소셜 로그인 인증방식이다. 인증을 중개하는 매커니즘. 이미 사용자 정보를 가지고 있는 웹 서비스(GitHub, google, facebook 등...)에서 사용자의 인증을 대신 해주고 접근권한에 대한 토큰을 발급하면, 이를 이용해 서버 내에 인증을 하는 방식이다.

다만, **인증(Authentication)을 다른 서비스에 맡기는 것이며, 권한 관리(Authorization)은 서버에서 담당**해야 한다.


다음은 OAuth에서 알아두어야 할 용어들이다.

> * Resource Owner: 액세스 중인 리소스의 유저    
> * Client: Resource owner를 대신하여 보호된 리소스에 액세스하는 응용프로그램    
> * Resouce server: Client의 요청을 수락하고 응답할 수 있는 서버    
> * Authorization server: Resource server가 액세스 토큰을 발급받는 서버    
> * Authorization grant: 클라이언트가 액세스 토큰을 얻을 때 사용한 자격증명    
> * Authorization code: Access token을 발급받기 전 필요한 Code    
> * Access token: 보호된 리소스에 액세스하는 데 사용할 Credentials    
> * Scope: 주어진 액세스 토큰을 사용하여 액세스할 수 있는 리소스 범위       


**Grant Type**은 Client가 액세스 토큰을 얻는 방법으로, 대표적으로 Authorization Code Grant Type, Refresh Token Grant Type 등이 있다.    

> 1. Authorization Code Grant Type: 가장 일반적으로 사용되는 인증 방법. 액세스 토큰을 받아오기 위해 Authorization Code를 받아 액세스 토큰과 교환하는 방법이다.     
>
> 2. Refresh Token Grant Type: 일정기간 유효시간이 지나서 만료된 액세스 토큰을 편리하게 받아오기 위해 사용하는 방법. Access token보다 Refresh token의 유효시간을 더 길게 설정하기 때문에 가능한 방법이다.    


**다음 그림을 보고 OAuth2 기반 인증의 흐름을 이해하자.**
<img src = "https://drive.google.com/uc?export=view&id=1zOhju4NTrYBT5bYXCTjdz83QDv39DX1P">
<img src = "https://drive.google.com/uc?export=view&id=14wm8fvZgOh_6nnYv6PUV_XqIg19walnb">


## 7. Sprint 코드
자세한 내용은 GitHub 또는 VSCode 주석 참고.
### 7. 1. Cookie
```js
// Express에서 CORS 설정.
    app.use(cors(
        origins: "https://localhost:3000", // Access-Control-Origin 설정. CORS 요청을 허용할 주소이다.
        methods: ['GET', 'POST', 'OPTIONS'], // Access-Control-Allow-Method 설정. CORS 요청으로 허용할 METHOD
        credentials: true, // Access-Control-Allow-Credentials 설정. 쿠키를 헤더로 전송하는 것을 허용하려면 true.
    ))

// Express Cookie-Parser
    app.use(cookieParser()); // Cookie-parser는 쿠키 헤더를 분석하여 이를 req.cookies에 객체 형태로 담아낸다.
````

```js
// Express UrlEncoded
    app.use(express.urlencoded({ extended: false }))
    // bodyParser는 "application/json" 방식의 데이터를 받아 변환한다.
    // urlEncoded는 "application/x-www-form-urlencoded" 방식의 데이터를 받아 변환한다.

    // * Extended: true: URL 인코딩 데이터를 npm: qs library로 parse한다.
    // * 쿼리 문자열에서 중첩된 Ojbect를 생성할 수 있다. ?를 필터링하지 않는다.
    // qs.parse("person[name]=bobby&person[age]=3") ... { person: { name: 'bobby', age: '3' } }
    // qs.parse("?a=b") ... { '?a': 'b' }

    // * Extended: false: URL 인코딩 데이터를 npm: query-string lirary으로 parse한다.
    // * 쿼리 문자열에서 중첩된 Object를 생성할 수 없다. ?를 필터링한다.
    // queryString.parse("person[name]=bobby&person[age]=3") ... { 'person[age]': 3, 'person[name]': 'bobby' }
    // queryString.parse("?a=b") ... { a: 'b' }
````

```js
// res.cookie 설정
    // ! res.cookie: Cookie의 이름과 속성값을 설정한다.

    // ? domain: 쿠키를 적용할 호스트를 지정한다. 서브도메인도 항상 포함.

    // ? path: 요청된 URL에 있어야하는 경로. 없으면 브라우저가 쿠키헤더를 안보낸다. 하위 경로 모두 포함.

    // ? secure: 클라이언트와 서버가 HTTPS로 통신할 경우에만, 브라우저가 서버로 쿠키를 전송하는 옵션.

    // ? httpOnly: XXS 공격을 막고자, 자바스크립트의 document.cookie로 쿠키에 접속하는 것을 막는 옵션.

    // ? sameSite: CORS 요청시(서로 다른 도메인 간) 쿠키전송에 대한 보안 설정.
    // * None: 동일 도메인, 크로스 사이트 모두 쿠키전송 가능. Strict: 서로 다른 도메인 전송 불가능
    // * Lax: Strict 설정에서 일부 예외(HTTP GET Method, a href, link href)를 둔 것.
    // * 크롬 80 버전부터 새로운 쿠키 정책이 적용되어 SameSite 속성 기본값이 "None" --> "Lax"로 변경

    res.cookie("id", userInfo.id, { domain: "localhost", path: "/", httpOnly: true, secure: true, sameSite: "none" })
      .json({
        data: null,
        message: "ok"
      })

// res.clearCookie 쿠키 제거
    // ? res.clearCookie()는 쿠키의 특정 부분을 제거한다. (쿠키는 이름으로만 되어있다는 것을 생각하자)
    // ? 가령 res.clearCookie("id")는 쿠키의 id="...."에서 "..."를 제거한다. 

    res.clearCookie("id");
    res.json({ data: null, message: "ok" });

````

### 7. 2. Session
```js
// Express-Session
  // 클라이언트가 세션 쿠키가 포함되지 않은 요청을 보내면, Express Session은 새로운 세션을 생성한다.

  // * 1. 새로운 Unique 세션ID 생성.
  // * 2. 생성한 세션ID를 쿠키에 저장. 이를 토대로 클라이언트 식별.
  // * 3. req.session으로 빈 세션 객체를 생성.

  // 세션 데이터는 쿠키 자체에 저장되지 않으며, 클라이언트를 식별하는 ID만 저장된다. 즉, 실질적인 데이터는 서버가 가지고 있으며 관리.
  // 별도로 저장소를 설정하지 않으면 Memory Store가 기본 세션 저장소로 설정됨.
  // 메모리 스토어는 대부분의 조건에서 메모리가 누출되므로 디버깅 및 개발 목적으로만 사용할 것.

  app.use(
    session({
      secret: '@codestates', // * 필수옵션: 세션을 암호화한다. Salting에 사용할 문자열이나 배열을 입력해야 한다. 변경하면 기존 세션은 무효화된다.
      resave: false, // * 세션이 수정되지 않더라도 다시 저장할지 (즉, 변경사항이 없음에도 덮어씌울 것인지) 여부를 결정. 일반적으로 false
      saveUninitialized: true, // * 세션을 저장하기 전에 초기화 되지 않은 상태로 미리 만들어서 저장한다. 일반적으로 true
      cookie: { // * 세션ID 쿠키에 대한 설정. 쿠키 이름을 설정한다. Cookie-parser 사용하듯이 설정하면 된다.
        domain: "localhost",
        path: "/",
        maxAge: 24 * 6 * 60 * 10000, // * 쿠키가 만료될 때까지 소요되는 시간(단위: Seconds)이다.
        sameSite: "none",
        httpOnly: true,
        secure: true,
      },
    })
  );
````

```js
// req.session
      // ! 세션에 클라이언트를 식별할 수 있는 키를 저장해야 한다.

      // * req.session 객체에 직접 Key-Value를 지정하여도 되고
      // * req.session.save(() => {req.session.userId = userInfo.userId})로 전용 메서드를 사용하여도 된다. 후자는 강제적으로 실행하여 보다 확실한 방법이다.
      
      // ? req.cookies가 쿠키를 객체화한 것처럼, req.session도 세션을 객체화한 것이다.
      // ? req.session으로 세션을 수정 또는 탐색할 수 있다.
      // ? 여기서는 특정 사용자의 아이디를 userId라는 임의의 키에 저장하는 것으로 정하였다.

      req.session.userId = userInfo.id
      res.status(200).send({
        data: null,
        message: "ok"
      })

// logout
    // * Session Cookie: 식별정보를 쿠키에 저장하는 정책을 허용할 경우, 클라이언트 쿠키에 저장한 세션 데이터 전체를 의미.
    // * Session ID: 쿠키에 종속됨. 고유 의미는 사용자의 세션을 식별하기 위한 ID값 (물론 하나의 사용자가 여러 개의 세션ID을 가질 수 있다.)
    // * 여러 ID를 넣어줄 수 있으니까.

    // * 서버가 클라이언트에 Session ID를 부여하는 방법 중 하나가 쿠키를 이용한 것.
    // * Session ID를 클라이언트에 저장하기 위해 쿠키를 사용한다.
    // * 서버는 클라이언트가 누구인지 식별하기 위해 쿠기 안에 담겨있는 Session ID를 참고한다.

    if (!req.session.userId) {
      res.status(400).json({ data: null, message: "not authorized" });
    } else {
      // ? 세션을 파괴하고  req.session 속성을 해제한다. 콜백함수로 에러 핸들링이 가능.
      req.session.destroy();
      res.json({ data: null, message: "ok" })
    }
````

### 7. 3. Token
```js
// Router 설정: Access token, Request token 분기를 만들어준다.
  app.get("/accesstokenrequest", controllers.accessTokenRequest);
  app.get("/refreshtokenrequest", controllers.refreshTokenRequest);

// 1. Login
  //   a. 클라이언트에서 전송한 아이디와 비밀번호가 유효한지 데이터베이스와 비교
  //   b. 유효하면 필요한 사용자 정보를 담은 Refresh token, Access token 생성하여 클라이언트로 전달. 아니면 에러 핸들링 등

// 2. Access token requset: 실질적으로 유저가 권한이 있는지 확인한다.
  //   a. 요청 헤더에 담긴 Authorization이 유효한 Access token인지 확인한다. 
  //   b. 유효한 토큰이면, 클라이언트가 요청한 정보를 송신한다. 아니면 에러 핸들링 등

// 3. Refresh token request: 쿠키에 담긴 Refresh token을 확인하여 Access Token을 갱신하고, 사용자가 요청한 정보를 전달.
  //   a. Cookie에 담겨있는 Refresh token을 확인.
  //   b. 유효한 토큰이면 새로운 Access token을 생성하고, 클라이언트가 요청한 정보를 함께 송신한다.


// JSON Web Token
  // jwt.sign: 암호화. Access secret or Refresh secret으로 새로운 토큰 생성.
    // * jwt.sign(data, process.env.ACCESS_SECRET, {expiresIn: "15s"})
    // * jwt.sign(data, process.env.REFRESH_SECRET, {expiresIn: "30d"})

  // jwt.verify: 복호화. 토큰을 해독한다.
    // * jwt.verify(token, process.env.REFRESH_SECRET)

  // Auth, Token 확인 시
    const auth = req.headers.authorization;
    if (!auth) return null;

    const token = auth.split(" ")[1];
    //   ....
````
### 7. 4. OAuth2
```js
// 주로 새로 습득한 내용 위주로 정리
  // 1.API에 특정 형태로 데이터를 받고 싶으면 헤더에 이를 명시해야 한다.
  axios({
    method: "POST",
    url: "https://github.com/login/oauth/access_token",
    data: {
      client_id: clientID,
      client_secret: clientSecret,
      code: req.body.authorizationCode,
    },
    headers: { accept: "application/json" } // JSON으로 받는다.
  })

  // 2. Client 코드 중
    componentDidMount() {
    // ? window.location.href 현재 주소의 URL입니다.
    // ? 또한 window.location.href = "other site URL"로 할당하면, 다른 주소로 이동하게 됩니다.
    
    const url = new URL(window.location.href)
    // ? URL의 특정 Parameter의 값을 다음과 같이 가져올 수 있습니다.
    // ? const params = URL.seachParams.get("WhatYouWant");

    const authorizationCode = url.searchParams.get('code')
    if (authorizationCode) {
      // console.log(authorizationCode);
      // authorization server로부터 클라이언트로 리디렉션된 경우, authorization code가 함께 전달됩니다.
      // ex) http://localhost:3000/?code=5e52fb85d6a1ed46a51f
      this.getAccessToken(authorizationCode)
    }
  }


    socialLoginHandler() {
    // ? window.location.assign(URL): URL을 불러서 해당 문서에 띄운다.(현재 창에서 새로운 주소로 이동한다고 보면 된다)
    window.location.assign(this.GITHUB_LOGIN_URL)
  }


````
