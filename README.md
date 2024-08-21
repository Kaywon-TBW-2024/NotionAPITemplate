# NOTION API Template Q&A

- [NOTION API Template Q\&A](#notion-api-template-qa)
    - [설계](#설계)
    - [동작](#동작)
    - [참고자료](#참고자료)
  
### 설계 
- 간단한 데이터를 기록하기 위해 Notion Table을 DB로 사용하기 
  - 초기로딩시 DB에서 값 불러오기 Query a database in Notion API
  - 값 입력시, DB업로드 Create a page in Notion API 
- 여러대의 아이패드 이용을 위해 데이터 동기화 

### 동작 
  `$ npm start`
  
### 참고자료

- NOTION API **[Create a page](https://developers.notion.com/reference/create-a-database)**
  - Put input values in website to Notion DB(table) 
  - Reference Video **[Using Notion API With React to Create a Notion Database](https://www.youtube.com/watch?v=WbekTHVISh0&feature=emb_title)**

<br />

- NOTION API **[Query a database](https://developers.notion.com/reference/post-database-query)**
  - Take values from Notion DB(table)
  - Reference-1. **[Node express query Notion database](https://daily-dev-tips.com/posts/node-express-query-notion-database/)**
  - Reference-2. **[rebelchris/notion-app](https://github.com/rebelchris/notion-app/tree/database-query)**

<br />