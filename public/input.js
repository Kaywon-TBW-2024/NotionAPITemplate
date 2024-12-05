const answerForm = document.getElementById("answer-form");
const answerBox = document.getElementById("answerbox");
const leftAnswer = document.getElementById("answer");
const leftNickname = document.getElementById("nickname");

const HOST = "Put Your Local IP"; // *** local ip
const PORT = 8000; // *** port num

// 데이터를 DB에 넣는다.
function submitFormToNotion_left(newAnsobj) {
  fetch(`http://${HOST}:${PORT}/submitFormToNotion`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      Nickname: newAnsobj.nickname,
      Answer: newAnsobj.answer,
      Date: newAnsobj.time,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("success!", data);
    })
    .catch((err) => {
      console.log("Error: " + err);
    });
}

// 3. send 버튼이 눌릴 때 발생하는 이벤트로
// 들어온 값으로 새로운 json구조를 짠다.
function handleTodoSubmit_left(e) {
  e.preventDefault();
  const answer = leftAnswer.value;
  const nickname = leftNickname.value;
  const timestamp = success();

  leftAnswer.value = "";
  leftNickname.value = "";

  const newAnsobj = {
    answer: answer,
    nickname: nickname,
    time: timestamp,
  };

  submitFormToNotion_left(newAnsobj);

  //4. Update Input Data to Webpage
  const section = document.createElement("section");
  section.classList.add("post");
  section.innerHTML = `
          <div class="answer">${newAnsobj.answer}</div>
          <div class="guest">${newAnsobj.nickname}</div>
        `;
  answerBox.insertBefore(section, answerBox.firstElementChild);
}

answerForm.addEventListener("submit", handleTodoSubmit_left);

// 시간기록하기 Time Recording
const success = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minute =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  return `${year}-${month}-${day}, ${hour}:${minute}`;
};
