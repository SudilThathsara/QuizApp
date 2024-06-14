const questions = [
  {
    question: "Wich is the largest animal in the world?",
    answers: [
      { Text: "Shark", correct: false },
      { Text: "Elephant", correct: false },
      { Text: "Blue whale", correct: true },
      { Text: "Dog", correct: false },
    ],
  },
  {
    question: "Wich is the largest area country in the world?",
    answers: [
      { Text: "Russia", correct: true },
      { Text: "India", correct: false },
      { Text: "Sri lanka", correct: false },
      { Text: "USA", correct: false },
    ],
  },
  {
    question: "Wich is the FIFA win last worldcup?",
    answers: [
      { Text: "England", correct: false },
      { Text: "Span", correct: false },
      { Text: "Japan", correct: false },
      { Text: "Argentina", correct: true },
    ],
  },
  {
    question: "Wich is the small animal?",
    answers: [
      { Text: "Parrot", correct: false },
      { Text: "Ant", correct: true },
      { Text: "Rat", correct: false },
      { Text: "Cat", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.Text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedbtn = e.target;
  const isCorrect = selectedbtn.dataset.correct === "true";
  if (isCorrect) {
    selectedbtn.classList.add("correct");
    score++;
  } else {
    selectedbtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function handlNextbutton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handlNextbutton();
  } else {
    startQuiz();
  }
});

startQuiz();