# NOTION API TEMPLATE

### 0. Node.js

(1) [Node.js](https://nodejs.org/en) 다운로드 <br>

(2) [Node.js](https://nodejs.org/en) 다운확인<br>

- `node -v`<br>

- `npm -v`

### 1. Notion Integrations

(1) [Notion Integrations](https://www.notion.so/profile/integrations) 이동

(2) New Intergration 생성

- Name
- Associated workspace 지정
- Type : Internal
- Logo (optional)

(3) 생성된 Notion Integration에 들어가서 Configuration > Internal Integration Secret 복사

- Content Capabilities 모두 체크
- Comment Capabilities 모두 체크
- User Capabilities > Read User Information including email addresses

(4) `.env` 파일 내, `NOTION_API_KEY=` 우측 항에 붙여넣기

### Notion Database

(1) Page 생성

(2) 생성된 페이지에서 Table(database) 생성

| Answer     | Nickname    | Date       |
| ---------- | ----------- | ---------- |
| Type: text | Type: title | Type :text |

(3) 우측 상단 `...` 을 누르고, 하단에 `Connect to` 클릭 후 [Notion Integrations](https://www.notion.so/profile/integrations) 에서 만든 Integration 이름추가

(4) 테이블 이름 우측 `...` > view database 에 들어가면 username/ 뒤부터 `?(물음표 마크)` 전까지가 `DATABASE-API-KEY` 이다.

해당 키를 복사하여 notionAPITemplate
`.env` 파일 내, `NOTION_API_DATABASE=` 우측 항에 붙여넣기

- (예시) https://www.notion.so/username/DATABASE-API-KEY?

### Postman

(1) [Postman](https://www.postman.com/) 가입

(2) Workspace > GET https://api.notion.com/v1/databases/`NOTION_API_DATABASE`

- Auth : Bearer Token
- Token : NOTION_API_KEY (Notion Integration)
- Header :

| checkbox | Key            | Value      |
| -------- | -------------- | ---------- |
|          | Notion-Version | 2022-06-28 |

(3) 200 OK 나오면 성공

### VSCODE

(1) server.js > HOST = "your local ip" 로 변경

(2) public > input.js > HOST = "your local ip" 로 변경

(3) `npm i` package.json에 있는 npm 모듈 다운로드

(4) `npm start`로 서버띄우기

(5) 본인의 local ip:PORT를 단톡에 공유하기
