const { Client } = require("@notionhq/client");
let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();
require("dotenv").config();
const cors = require("cors");

//express - server
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

//database
const databaseId = process.env.NOTION_API_DATABASE;
const HOST = "172.30.1.91"; // *** local ip
const portNum = 8000;
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});
app.use(cors());

app.use(express.static("public"));

//express server
server.listen(portNum, HOST, () => {
  console.log("Starting proxy at " + HOST + ":" + portNum);
});

// 0. 기초가 되는 데이터베이스 getDatabase_1는 여기서 query로 받아오고, 저장합니다.
const getDatabase_1 = async () => {
  const response = await notion.databases.query({ database_id: databaseId });
  return response.results.map((page) => {
    // console.log(page);
    console.log(page.properties.Nickname.title[0]?.plain_text);
    return {
      nickname: page.properties.Nickname.title[0]?.plain_text,
      answer: page.properties.Answer.rich_text[0]?.plain_text,
      timestamp: page.properties.Date.rich_text[0]?.plain_text,
    };
  });
};

// ---> 1. Query a database (res)
// getDatabase_1의 데이터 베이스를 express.app/leftpage에 띄울게요.
// leftanswers에 getDatabase_1 데이터 베이스를 저장합니다.
// 그리고 응답받은 값(res)을 json()형식으로 저장합니다.
app.get("/leftpage", async (req, res) => {
  const leftanswers = await getDatabase_1();
  res.json(leftanswers);
});

// ---> 4. Create a page (req) 데이터 넣어달라고 요청하기 파트
// /submitFormToNotion_left 띄운 값 가져와서 띄우는 거임
// Record the input value
app.post("/submitFormToNotion", jsonParser, async (req, res) => {
  // console.log(req);
  const nickname = req.body.Nickname;
  const answer = req.body.Answer;
  const timestamp = req.body.Date;

  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Nickname: {
          title: [
            {
              text: {
                content: nickname,
              },
            },
          ],
        },
        Answer: {
          rich_text: [
            {
              text: {
                content: answer,
              },
            },
          ],
        },
        Date: {
          rich_text: [
            {
              text: {
                content: timestamp,
              },
            },
          ],
        },
      },
    });
    // console.log(response);
    console.log("Success!_Input");
  } catch (err) {
    console.log("Something Wrong!");
    console.log(err);
  }
});
