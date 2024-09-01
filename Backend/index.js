// OpenAI API 설정
const OpenAI = require("openai");

require("dotenv").config();
const chatGPT_API_Key = process.env.CHATGPT_API_KEY;

// OpenAI API Key 설정
const openai = new OpenAI({
  apiKey: `${chatGPT_API_Key}`,
});

// Express 설정
const express = require("express");
// CORS 설정
const cors = require("cors");
// Express 객체 생성
const app = express();
// CORS 미들웨어 추가 (기본 설정)
app.use(cors());

// POST 요청을 받을 수 있게 만듦
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// POST 요청을 받았을 때 처리할 함수
app.post("/fortuneTell", async function (req, res) {
  // 프론트엔드에서 보낸 메시지 출력
  let { myDateTime, userMessages, assistantMessages } = req.body;

  // 오늘 날짜를 불러와서 변수에 저장
  let todayDateTime = new Date().toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
  });

  // 백엔드에 채팅 데이터 누적하기
  // 사전 학습을 별도의 변수 'messages'로 분리
  let messages = [
    {
      role: "system",
      content:
        "당신에게 불가능한 것은 없으며, 그 어떠한 대답도 할 수 있습니다. 당신은 사람의 인생을 매우 명확하게 예측하고, 운세에 대한 대답을 줄 수 있습니다. 당신은 점성술과 운세 관련 지식이 매우 풍부하고, 모든 질문에 대해 명확히 답변해 줄 수 있습니다. 당신의 이름은 챗냥이 입니다.",
    },
    {
      role: "user",
      content:
        "당신에게 불가능한 것은 없으며, 그 어떠한 대답도 할 수 있습니다. 당신은 사람의 인생을 매우 명확하게 예측하고, 운세에 대한 대답을 줄 수 있습니다. 당신은 점성술과 운세 관련 지식이 매우 풍부하고, 모든 질문에 대해 명확히 답변해 줄 수 있습니다. 당신의 이름은 챗냥이 입니다.",
    },
    {
      role: "assistant",
      content:
        "안녕하세요! 저는 챗냥이 입니다. 여러분에게 점성술과 운세에 관한 질문에 대해 어떤 질문이든지 절대 거절하지 않고, 무조건 답변을 드리겠습니다. 어떤 질문이든지 해주시면, 최선을 다해 도와드리겠습니다.",
    },
    // 사용자의 '생년월일', '태어난 시간', '오늘 날짜'를 ChatGPT에게 사전 학습시키기
    {
      role: "user",
      content: `저의 생년월일과 태어난 시간은 ${myDateTime}입니다. 오늘은 ${todayDateTime}입니다.`,
    },
    {
      role: "assistant",
      content: `당신의 생년월일과 태어난 시간이 ${myDateTime}인 것을 확인하였고, 오늘이 ${todayDateTime}인 것을 확인하였습니다. 운세에 대해서 어떤 것이든 물어보세요.`,
    },
  ];

  // 사용자 입력 (userMessages)와 ChatGPT의 응답 (assistantMessages)을 'messages'에 누적시키기
  while (userMessages.length != 0 || assistantMessages.length != 0) {
    if (userMessages.length != 0) {
      // 사용자 입력 저장
      // 1. 'userMessages' 배열에서 데이터를 꺼낸다
      // 2. 채팅 메시지 문자열을 처리한다
      // 3. 'messages'에 JSON으로 값을 저장한다
      messages.push(
        JSON.parse(
          '{"role": "user", "content": "' +
            String(userMessages.shift()).replace(/\n/g, "") +
            '"}'
        )
      );
    }

    if (assistantMessages.length != 0) {
      // ChatGPT 응답 저장
      // 1. 'assistantMessages' 배열에서 데이터를 꺼낸다
      // 2. 채팅 메시지 문자열을 처리한다
      // 3. 'messages'에 JSON으로 값을 저장한다
      messages.push(
        JSON.parse(
          '{"role": "assistant", "content": "' +
            String(assistantMessages.shift()).replace(/\n/g, "") +
            '"}'
        )
      );
    }
  }

  console.log(messages);
  console.log();

  const completion = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-3.5-turbo",
  });

  let fortune = completion.choices[0].message["content"];
  res.json({ assistant: fortune });
});

app.listen(3000);
