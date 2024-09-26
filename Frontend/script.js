// 변수 추가
let userMessages = []; // 사용자가 입력한 메시지를 저장할 배열
let assistantMessages = []; // ChatGPT의 응답(운세)을 저장할 배열
let myDateTime = ""; // 사용자의 생년월일, 태어난 시간을 저장할 변수

// 사용자가 입력한 생년월일, 태어난 시간을 가져오는 함수
function getMyDateTime() {
  const date = document.getElementById("date").value;
  const time = document.getElementById("hour").value;

  if (date === "") {
    alert("생년월일을 입력해 주세요.");
    return;
  }

  myDateTime = date + time;

  // "intro-container"를 숨기고, "chat-container"를 화면에 표시함
  document.getElementById("intro").style.display = "none";
  document.getElementById("chat").style.display = "block";
}

// 프론트엔드에서 백엔드 서버로 요청을 보내고, ChatGPT응답을 가져오는 함수
async function sendFortuneRequest() {
  try {
    const response = await fetch(
      "https://tihppl34ypxjpwvxyo6qegxxoa0yulbt.lambda-url.ap-northeast-2.on.aws/fortuneTell",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Ensure 'mode' is 'cors' and 'credentials' is 'include'
        mode: "cors", // Ensure CORS mode is used
        credentials: "include", // Include credentials in the request
        body: JSON.stringify({
          // '생년월일', '태어난 시간'을 백엔드에 전송하기
          myDateTime: myDateTime,
          // 누적된 채팅 데이터를 송수신하기
          userMessages: userMessages,
          assistantMessages: assistantMessages,
        }), // You can send any data here if needed
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

// 'messageBubble'에 사용자 입력 또는 백엔드 응답 표시
function appendMessage(message, isUser) {
  const messageBubble = document.createElement("div");
  messageBubble.classList.add("message");
  messageBubble.classList.add(isUser ? "user-message" : "server-message");
  messageBubble.textContent = message;

  // 'messageContainer'에 messageBubble 추가
  const messageContainer = document.getElementById("messages");
  messageContainer.appendChild(messageBubble);

  // 'messageContainer' 스크롤바 위치 수정
  let maxScrollHeight =
    messageContainer.scrollHeight - messageContainer.clientLeft;
  messageContainer.scrollTop = maxScrollHeight;
}

async function sendMessage() {
  // 'loading-icon' 보여주기
  document.getElementById("loading-icon").style.display = "block";

  // 사용자가 압력한 요청을 가져옴
  const input = document.getElementById("messageInput");
  const userMessage = input.value.trim();
  if (userMessage === "") {
    appendMessage(
      "아무런 내용도 입력하지 않으셨습니다. 챗냥이에게 물어볼 내용을 입력해주세요.",
      false
    );
    // 'loading-icon' 숨기기
    document.getElementById("loading-icon").style.display = "none";
    return;
  }

  // 채팅 컨테이너에 사용자 메시지 추가
  appendMessage(userMessage, true);

  // userMessages에 사용자 메시지 저장
  userMessages.push(userMessage);

  // 메시지 입력 창을 비움
  input.value = "";

  try {
    // 백엔드 서버에 요청을 보내고, 운세를 가져옴
    const serverResponse = await sendFortuneRequest();
    const fortune = serverResponse["assistant"];

    // 채팅 컨테이너에 백엔드 서버(ChatGPT)의 응답 (운세)를 추가
    appendMessage(fortune, false);

    // assistantMessages에 ChatGPT의 응답(운세)을 저장
    assistantMessages.push(fortune);
  } catch (error) {
    console.log("Failed to get fortune : ", error);

    appendMessage(
      "운세를 불러오는 데 실패했습니다. 나중에 다시 시도해 주세요.",
      false
    );
  }
  // 'loading-icon' 숨기기
  document.getElementById("loading-icon").style.display = "none";
}
