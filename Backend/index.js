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
  const completion = await openai.chat.completions.create({
    messages: [
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
      {
        role: "user",
        content: "오늘의 운세를 알려주세요.",
      },
    ],
    model: "gpt-3.5-turbo",
  });

  let fortune = completion.choices[0].message["content"];
  console.log(fortune);
  res.json({ assistant: fortune });
});

app.listen(3000);
