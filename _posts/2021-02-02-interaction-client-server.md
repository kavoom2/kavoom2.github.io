---

title: 클라이언트와 서버의 통신

excerpt: "클라이언트와 서버가 통신하는 방법. 전달되는 데이터의 형태"

classes: wide

  

last_modified_at: 2021-02-02T12:00:00

use_mermaid: true
use_math: true

categories:
- Server
tags:
- http
- protocol
- api
- ajax
---

## 1. 클라이언트 서버 아키텍쳐
쇼핑몰 앱을 이용하는데 상품 목록이나 정보를 바꾸려고 앱을 다시 받는 것은 그다지 좋은 경험이 아닐 것이다. 그래서 데이터 업데이트가 빈번하게 일어나는 환경에서는 리소스를 보관하는 공간과 리소스를 사용하는 앱을 분리하는 것이 효율적이다. 리소스를 사용하는 앱을 **클라이언트(Client)**, 리소스가 존재하는 곳을 **서버(Server)**라고 한다. 이러한 통신형태를 **클라이언트 서버 아키텍쳐(Client-Server Architecture)**라고 한다. 사실, 서버는 리소스를 전달하는 역할만 하며, 서버를 보관하는 **데이터베이스(Database)**라는 공간을 별도로 둔다. 

<div class = "mermaid"> 
flowchart TB
subgraph ide1 [3Tier]
C[Client] <--> D[Server]
D <--> id1[(Database)]
end
subgraph ide2 [2Tier]
A[Client] <--> B[Server]
end
</div>

클라이언트는 플랫폼에 따라 구분할 수 있고, 서버는 어떤 작업을 수행하는지에 따라 구분할 수 있다.    

+ 클라이언트의 종류
    - 웹 앱
    - 모바일, 태블릿 앱
    - 데스크탑 앱 등...    

+ 서버의 종류
    - 웹 서버: 웹사이트에 필요한 정보를 제공한다.
    - 파일 서버: 파일을 제공한다.
    - 데이터베이스 서버: 필요한 리소스를 제공한다.    
    - 메일 서버 등...    

## 2. 클라이언트와 서버의 통신
클라이언트와 서버 사이의 통신은 **요청**과 **응답**으로 구성된다. 일부 경우를 제외하면 요청이 있어야 응답이 들어온다. 서버는 클라이언트의 요청이 있기까지 마음대로 리소스를 전달하지 않는다.    


### 2. 1. 프로토콜
한편, 클라이언트와 서버 사이의 통신에는 정해진 방식이 있다. **프로토콜(Protocol)**이 클라이언트와 서버 사이의 통신에 지켜야 할 통신규약이다. 클라이언트를 손님, 서버를 카페 종업원으로 생각하자. 손님이 종업원에게 주문을 할 때, 제대로 알아듣지 못할 언어를 쓰면 요청한 음료를 받기 힘들 것이다. 우리가 배울 웹 플랫폼에서는 클라이언트와 서버는 **HTTP**라는 프로토콜로 서로 통신을 한다.

프로토콜에도 종류가 있다. 이와 관련해서는 [**OSI 7 Layers 모형**](https://ko.wikipedia.org/wiki/OSI_%EB%AA%A8%ED%98%95)을 찾아보도록 하자. 기본적으로 각 계층은 하위계층의 기능만 이용할 수 있고, 상위계층에는 기능을 제공한다. 계층모형은 1 ~ 7단계까지 나뉜다. 언급된 내용만 간략히 적어본다.

+ 계층 4: [전송계층](https://brunch.co.kr/@wangho/6)
    - TCP: HTTP, FTP 통신 등의 근간이 되는 인터넷 프로토콜. 양방향 통신이다.    
    - UDP: TCP와 달리 단방향으로 작동하는 프로토콜. 단순하고 빠르지만, 신뢰성이 낮다.    
    
+ 계층 7: 응용계층
    - HTTP: 웹에서 HTML, JSON 등 정보를 주고받는 프로토콜.    
    - HTTPS: HTTP에서 보안이 강화된 프로토콜.    
    - FTP: 파일전송 프로토콜.    
    - SMTP: 메일을 전송하기 위한 프로토콜.    
    - SSH: CLI환경의 원격 컴퓨터에 접속하기 위한 프로토콜.    
    - RDP: Windows 계열의 원격 컴퓨터에 접속하기 위한 프로토콜.    
    - WebSocket: 실시간 통신, Push 등을 지원하는 프로토콜.

### 2. 2. API
클라이언트와 서버는 프로토콜로 상호 간에 통신을 한다고 했다. 그렇다면 실제 사용자는 어떻게 접근해야 할까. 우리가 사용하는 어플리케이션의 인터페이스, 컴퓨터를 조작하는데 필요한 키보드와 마우스 등을 떠올려보자. 이러한 장치 및 기능들은 실제 사용자가 내부 로직은 잘 알지 못하더라도 편리하게 사용할 수 있도록 도와준다.    

**API(Application Programming Interface)**도 프로그램 간 통신에서 이러한 역할을 한다. 물론, 서버에서 API를 사전에 잘 구축해놓아야 클라이언트 측에서 잘 활용할 수 있다. 

인터넷에서 데이터를 요청할 때에는 HTTP 프로토콜을 사용하며, 주소(URL, URI)를 통해 접근한다. [쿼리 스트링(Query String)](https://en.wikipedia.org/wiki/Query_string)은 사용자가 입력한 데이터를 URL 주소를 활용하여 파라미터로 전달할 수 있다. 예제를 보도록 하자. [좋은 레퍼런스 사이트](https://koreanjson.com)도 있다.

```console
https://starbucks.com/coffee/coldbrew?quantity=2&syrup=hazelnet
````

> ? : End point 이후에 ?를 표기하여 쿼리스트링이 시작하도록 한다.    
> = : 파라미터와 키 값은 parameter=key로 표현한다.    
> & : 파라미터가 둘 이상이면 &으로 구분해준다.    

위 예제는 HTTP에서 리소스를 요청하는 "GET"에 대한 예제이다. 요청에는 여러 메소드가 존재하는데 이는 [MDN - HTTP 요청 메소드](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods)를 살펴보도록 하자.

|       요청       |          HTTP Response 메소드         |
|-----------------|---------------------------------------|
|조회(Read)        |GET                                   |
|추가(Create)      |POST                                  | 
|갱신(Update)      |PUT or PATCH                          |
|삭제(Delete)      |DELETE                                |     

HTTP 요청이 성공적으로 완료되었는지 확인할 필요가 있다. 이는 [HTTP 상태 코드](https://ko.wikipedia.org/wiki/HTTP_%EC%83%81%ED%83%9C_%EC%BD%94%EB%93%9C)가 어떻게 왔는지를 통해 알 수 있다. 우선은 상태 코드의 첫 번째 숫자는 응답의 클래스를 나타낸다는 것만 알아두자.

### 2. 3. HTTP의 무상태성과 비연결성
**비연결성**이란 클라이언트 요청에 서버가 응답을 마치면 연결을 끊어버리는 방식을 일컫는다. 연결을 유지하려면 리소스가 발생한다. HTTP는 불특정 다수와 통신을 목적으로 설계되었다는 것음 생각하자.

비연결성으로 인해 이전 통신의 상태를 알 수 없게 된다. 이를 **무상태성**이라고 한다. 불필요한 리소스를 줄이기 때문에 서버의 부하를 줄일 수 있지만, 클라이언트의 정보를 유지할 수 없다는 단점이 있다. 자칫하면 사용자가 매번 새로운 인증을 해야하는 불상사가 발생한다. 이를 보완하고자 **쿠키**와 **세션**을 사용하고 있다.

## 3. Ajax
[WebArchive](https://web.archive.org/)에서 20년 전과 지금의 네이버를 비교해보자. 뉴스란을 클릭하면 페이지가 전환되면서 새로운 웹페이지 전체를 다시 불러와야했다. 지금 네이버에 들어가서 웹툰, 게임, 스포츠를 클릭해보면, 해당 컨텐츠를 출력하는 부분만 새로이 렌더링되는 것을 볼 수 있다.

**Ajax(Asynchronous Javascript and XML)**는 서버와 자유롭게 통신하고, 페이지 깜빡임 없이 작동할 수 있도록 하는 웹 개발 방식이다. XHR(XMLHttpRequest)로 서버와 자유롭게 통신하며, 자바스크립트로 DOM을 조작하여 동적인 화면 출력과 상호작용을 가능하게 한다.




## 4. 읽어봐야할 문서들
[NAVER D2 - 브라우저는 어떻게 작동하는가?](https://d2.naver.com/helloworld/59361)    
[MDN - MIME Type: Content-Type에 대한 설명](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types)    
[지메일이 핫메일을 이긴 진짜 이유 - Ajax가 가져온 유저 인터페이스의 혁신](https://sungmooncho.com/2012/12/04/gmail-and-ajax/)    
[MDN - Using Fetch](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Fetch%EC%9D%98_%EC%82%AC%EC%9A%A9%EB%B2%95)    
[That's so fetch!](https://jakearchibald.com/2015/thats-so-fetch/)    
[This API is so Fetching!](https://hacks.mozilla.org/2015/03/this-api-is-so-fetching/)    