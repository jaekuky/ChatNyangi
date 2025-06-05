// 변수 추가
let userMessages = []; // 사용자가 입력한 메시지를 저장할 배열
let assistantMessages = []; // ChatGPT의 응답(운세)을 저장할 배열
let myDateTime = ""; // 사용자의 생년월일, 태어난 시간을 저장할 변수
let fortuneMessageCounter = 0; // ChatGPT의 응답(운세) 메시지 개수

// 웹페이지 객체 상수
const mainTitle = document.getElementById("main-title");
const subTitle = document.getElementById("sub-title");
const languageSelect = document.getElementById("language");
const dateLabel = document.getElementById("date-label");
const hourLabel = document.getElementById("hour-label");
const viewFortuneButton = document.getElementById("view-fortune-buttton");
const messageInput = document.getElementById("message-input");
const messageRequestButton = document.getElementById("message-request-button");

// 복채 요청 메시지
const requestForAFortuneTellingFeeMessage = {
  de: "Wenn Sie ein wenig Freundlichkeit zeigen, indem Sie auf den zusätzlichen Link klicken, werden Sie mehr Glück haben.",
  en: "Additionally, if you click on the link and show a little kindness, you will have even better luck.",
  es: "Si muestra un poco de amabilidad haciendo clic en el enlace adicional, tendrá mejor suerte.",
  fr: "Si vous faites preuve d'un peu de gentillesse en cliquant sur le lien supplémentaire, vous aurez plus de chance.",
  it: "Se mostri un po' di gentilezza facendo clic sul collegamento aggiuntivo, avrai più fortuna.",
  ja: "さらにリンクを押して小さな暖かさを施していただければ、より良い運があります。",
  ko: "추가로 링크를 눌러 작은 온정을 베풀어 주시면, 더욱 좋은 운이 있으실 겁니다.",
  ru: "Если вы проявите немного доброты, нажав на дополнительную ссылку, вам повезет больше.",
  zh: "如果您通过点击附加链接表现出一点善意，您将会有更好的运气。",
};

// '복채 보내기' 메시지
const sendAFortuneTellingFeeMessage = {
  de: "Wahrsagergebühr senden",
  en: "Send a fortune-telling fee",
  es: "Enviar la tarifa de adivinación",
  fr: "Envoyer le tarif de divination",
  it: "Inviare la tariffa per la divinazione",
  ja: "占い料金を送る",
  ko: "복채 보내기",
  ru: "Отправить плату за гадание",
  zh: "发送占卜费",
};

// 생년월일 입력 요청 메시지
const dateOfBirthInputRequestMessage = {
  de: "Bitte geben Sie Ihr Geburtsdatum ein.",
  en: "Please enter your date of birth.",
  es: "Por favor, introduzca su fecha de nacimiento.",
  fr: "Veuillez entrer votre date de naissance.",
  it: "Per favore, inserisci la tua data di nascita.",
  ja: "生年月日を入力してください。",
  ko: "생년월일을 입력해 주세요.",
  ru: "Пожалуйста, введите дату вашего рождения.",
  zh: "请输入您的出生日期。",
};

// 입력 요청 메시지
const inputRequestMessage = {
  de: "Sie haben nichts eingegeben. Bitte geben Sie eine Frage für ChatNyangi ein.",
  en: "You have not entered anything. Please enter a question for ChatNyangi.",
  es: "No has introducido nada. Por favor, introduce una pregunta para ChatNyangi.",
  fr: "Vous n’avez rien saisi. Veuillez entrer une question pour ChatNyangi.",
  it: "Non hai inserito nulla. Per favore, inserisci una domanda per ChatNyangi.",
  ja: "何も入力されていません。ChatNyangiに聞きたい内容を入力してください。",
  ko: "아무런 내용도 입력하지 않으셨습니다. 챗냥이에게 물어볼 내용을 입력해주세요.",
  ru: "Вы ничего не ввели. Пожалуйста, введите вопрос для ChatNyangi.",
  zh: "您未输入任何内容。请输入您想问ChatNyangi的问题。",
};

// 오류 메시지
const errorMessage = {
  de: "Das Abrufen des Horoskops ist fehlgeschlagen. Bitte versuchen Sie es später noch einmal.",
  en: "Failed to retrieve the fortune. Please try again later.",
  es: "No se pudo cargar el horóscopo. Por favor, inténtelo de nuevo más tarde.",
  fr: "Échec du chargement de l’horoscope. Veuillez réessayer plus tard.",
  it: "Non è stato possibile caricare l’oroscopo. Per favore riprova più tardi.",
  ja: "運勢を読み込むことができませんでした。後でもう一度お試しください。",
  ko: "운세를 불러오는 데 실패했습니다. 나중에 다시 시도해 주세요.",
  ru: "Не удалось загрузить гороскоп. Пожалуйста, попробуйте позже.",
  zh: "运势加载失败。请稍后再试。",
};

// Added translations for "모름" (unknown)
const hourUnknownTranslation = {
  de: "Unbekannt",
  en: "Unknown",
  es: "Desconocido",
  fr: "Inconnu",
  it: "Sconosciuto",
  ja: "不明",
  ko: "모름",
  ru: "Неизвестно",
  zh: "未知",
};

// mainTitle Text
const mainTitleText = {
  de: "Wir verraten Ihnen Ihr Schicksal",
  en: "I'll tell you your fortune",
  es: "Te diremos tu fortuna",
  fr: "Nous vous dirons votre fortune",
  it: "Ti diremo la fortuna",
  ja: "をお知らせします",
  ko: "운세를 알려드립니다",
  ru: "Мы предскажем вам вашу судьбу",
  zh: "我们会告诉你你的命运",
};

// subTitle Text
const subTitleText = {
  de: "Fragen Sie ChatNyangi!",
  en: "Ask Chatnyangi",
  es: "¡Pregunta a ChatNyangi!",
  fr: "Demandez à ChatNyangi!",
  it: "Chiedi a ChatNyangi!",
  ja: "ChatNyangiに聞いてみて！",
  ko: "챗냥이에게 물어보세요!",
  ru: "Спросите у ChatNyangi!",
  zh: "问问ChatNyangi吧！",
};

// dateLabel Text
const dateLabelText = {
  de: "Geburtsdatum",
  en: "Date of birth",
  es: "Fecha de nacimiento",
  fr: "Date de naissance",
  it: "Data di nascita",
  ja: "生年月日",
  ko: "생년월일",
  ru: "Дата рождения",
  zh: "出生日期",
};

// hourLable Text
const hourLableText = {
  de: "Geburtszeit",
  en: "Time of birth",
  es: "Hora de nacimiento",
  fr: "Heure de naissance",
  it: "Orario di nascita",
  ja: "生まれた時間",
  ko: "태어난 시간",
  ru: "Время рождения",
  zh: "出生时间",
};

// viewFortuneButton Text
const viewFortuneButtonText = {
  de: "Finden Sie Ihr Horoskop für heute heraus",
  en: "Find out your fortune for today",
  es: "Conoce tu horóscopo de hoy",
  fr: "Découvrez votre horoscope du jour",
  it: "Scopri il tuo oroscopo di oggi",
  ja: "今日の占いを学ぶ",
  ko: "오늘의 운세 보기",
  ru: "Узнайте свой гороскоп на сегодня",
  zh: "找出你今天的星座运势",
};

// messageInput placeholder
const messageInputPlaceholder = {
  de: "Fragen Sie ChatNyangi!",
  en: "Ask Chatnyangi!",
  es: "¡Pregunta a ChatNyangi!",
  fr: "Demandez à ChatNyangi!",
  it: "Chiedi a ChatNyangi!",
  ja: "ChatNyangiに聞いてみて！",
  ko: "챗냥이에게 물어보세요!",
  ru: "Спросите у ChatNyangi!",
  zh: "问问ChatNyangi吧！",
};

// messageRequestButton Text
const messageRequestButtonText = {
  de: "Eine Frage stellen",
  en: "Ask a question",
  es: "Hacer una pregunta",
  fr: "Poser une question",
  it: "Fai una domanda",
  ja: "質問する",
  ko: "물어보기",
  ru: "Задать вопрос",
  zh: "问一个问题",
};

// Language translations for SEO-related content
const pageTitleText = {
  ko: "운세 보는 챗냥이 - ChatGPT 인공지능 운세 확인",
  en: "ChatNyangi - AI Fortune Telling",
  de: "ChatNyangi - Wahrsagen mit KI",
  es: "ChatNyangi - Adivinación con IA",
  fr: "ChatNyangi - Prédiction avec l'IA",
  it: "ChatNyangi - Predizione con AI",
  ja: "ChatNyangi - AI運勢占い",
  ru: "ChatNyangi - Гадание с ИИ",
  zh: "ChatNyangi - AI算命",
};

// 언어 설정 함수
document
  .getElementById("language")
  .addEventListener("change", async function (event) {
    event.preventDefault();

    const selectedLanguage = languageSelect.value;

    // Dynamically update title
    document.title = pageTitleText[selectedLanguage];

    // 화면 객체 다국어 지원
    mainTitle.textContent = mainTitleText[selectedLanguage];
    subTitle.textContent = subTitleText[selectedLanguage];
    dateLabel.textContent = dateLabelText[selectedLanguage];
    hourLabel.textContent = hourLableText[selectedLanguage];
    viewFortuneButton.textContent = viewFortuneButtonText[selectedLanguage];
    messageInput.placeholder = messageInputPlaceholder[selectedLanguage];
    messageRequestButton.textContent =
      messageRequestButtonText[selectedLanguage];

    // '태어난 시간' 선택 객체 (id: hour) 다국어 지원
    const hourUnknownOption = document.getElementById("hour-unknown");
    hourUnknownOption.textContent = hourUnknownTranslation[selectedLanguage];
  });

// 사용자가 입력한 생년월일, 태어난 시간을 가져오는 함수
function getMyDateTime() {
  const date = document.getElementById("date").value;
  const time = document.getElementById("hour").value;
  const selectedLanguage = languageSelect.value;

  if (date === "") {
    //alert("생년월일을 입력해 주세요.");
    alert(`${dateOfBirthInputRequestMessage[selectedLanguage]}`);
    return;
  }

  myDateTime = date + time;

  // "intro-container"를 숨기고, "chat-container"를 화면에 표시함
  document.getElementById("intro").style.display = "none";
  document.getElementById("chat").style.display = "block";
}

// 프론트엔드에서 백엔드 서버로 요청을 보내고, ChatGPT응답을 가져오는 함수
async function sendFortuneRequest() {
  const selectedLanguage = languageSelect.value;

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
    // console.error("There was a problem with the fetch operation:", error);
    // throw new Error("Network response was not ok " + response.statusText);
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
}

// 'messageBubble'에 사용자 입력 또는 백엔드 응답 표시
function appendMessage(message, isUser) {
  const messageBubble = document.createElement("div");
  messageBubble.classList.add("message");
  messageBubble.classList.add(isUser ? "user-message" : "server-message");

  // 메시지 내용을 담을 요소 생성
  const messageContent = document.createElement("p");
  messageContent.textContent = message;
  messageBubble.appendChild(messageContent);

  // 두번째 운세 메시지부터, 메시지 끝에 '복채 보내기' 추가하기
  if (isUser == false && fortuneMessageCounter >= 2) {
    const extraMessage = document.createElement("p");
    extraMessage.innerHTML =
      // "\n추가로 링크를 눌러 작은 온정을 베풀어 주시면, 더욱 좋은 운이 있으실 겁니다. => ";
      `\n${requestForAFortuneTellingFeeMessage[selectedLanguage]} =>`;
    const link = document.createElement("a");
    link.href = "https://buymeacoffee.com/jakukyr";
    //link.textContent = "복채 보내기";
    link.textContent = `${sendAFortuneTellingFeeMessage[selectedLanguage]}`;
    link.target = "_blank";
    extraMessage.appendChild(link);
    messageBubble.appendChild(extraMessage);
  }

  // 'messageContainer'에 messageBubble 추가
  const messageContainer = document.getElementById("messages");
  messageContainer.appendChild(messageBubble);

  // 'messageContainer' 스크롤바 위치 수정
  let maxScrollHeight =
    messageContainer.scrollHeight - messageContainer.clientLeft;
  messageContainer.scrollTop = maxScrollHeight;
}

async function sendMessage() {
  const selectedLanguage = languageSelect.value;
  // 'loading-icon' 보여주기
  document.getElementById("loading-icon").style.display = "block";

  // 사용자가 압력한 요청을 가져옴
  const userMessage = messageInput.value.trim();
  if (userMessage === "") {
    appendMessage(
      //"아무런 내용도 입력하지 않으셨습니다. 챗냥이에게 물어볼 내용을 입력해주세요.",
      `${inputRequestMessage[selectedLanguage]}`,
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
  messageInput.value = "";

  try {
    // 백엔드 서버에 요청을 보내고, 운세를 가져옴
    const serverResponse = await sendFortuneRequest();
    const fortune = serverResponse["assistant"];

    // 운세 메시지를 가져오는데 성공했으면, 카운터 증가
    fortuneMessageCounter++;

    // 채팅 컨테이너에 백엔드 서버(ChatGPT)의 응답 (운세)를 추가
    appendMessage(fortune, false);

    // assistantMessages에 ChatGPT의 응답(운세)을 저장
    assistantMessages.push(fortune);
  } catch (error) {
    console.log("Failed to get fortune : ", error);

    appendMessage(
      //"운세를 불러오는 데 실패했습니다. 나중에 다시 시도해 주세요.",
      `${errorMessage[selectedLanguage]}`,
      false
    );
  }
  // 'loading-icon' 숨기기
  document.getElementById("loading-icon").style.display = "none";
}
