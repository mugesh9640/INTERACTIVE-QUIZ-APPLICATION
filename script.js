const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;
let userAnswers = [];
async function loadQuestions() {
  const res = await fetch('questions.json');
  const data = await res.json();
  questions = shuffleArray(data);
  startQuiz();
}
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  nextButton.innerText = "Next";
  scoreContainer.classList.add("hide");
  document.getElementById("review-container").classList.add("hide");
  showQuestion();
}
function showQuestion() {
  resetState();
  startTimer();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  document.getElementById("progress-bar").style.width = `${progress}%`;
}
function resetState() {
  clearInterval(timerInterval);
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function startTimer() {
  timeLeft = 10;
  timeDisplay.textContent = timeLeft;
  timerInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      recordUnanswered();  // ← If not clicked, count as wrong
      disableOptions();    // Highlight correct answer
      nextButton.style.display = "inline-block";
    }
  }, 1000);
}
function selectAnswer(e) {
  if (nextButton.style.display === "inline-block") return;

  clearInterval(timerInterval);
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  const correctAnswer = questions[currentQuestionIndex].answers.find(a => a.correct).text;
  userAnswers.push({
    question: questions[currentQuestionIndex].question,
    selected: selectedButton.innerText,
    correctAnswer: correctAnswer,
    isCorrect: correct
  });
  if (correct) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("wrong");
  }
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "inline-block";
}
function recordUnanswered() {
  const currentQ = questions[currentQuestionIndex];
  const correctAnswer = currentQ.answers.find(a => a.correct).text;
  const alreadyAnswered = userAnswers.some(entry => entry.question === currentQ.question);
  if (!alreadyAnswered) {
    userAnswers.push({
      question: currentQ.question,
      selected: "Not Answered",
      correctAnswer: correctAnswer,
      isCorrect: false
    });
  }
}
function disableOptions() {
  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });
}
function escapeHTML(str) {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;");
}
function showScore() {
  clearInterval(timerInterval);
  questionElement.classList.add("hide");
  answerButtons.classList.add("hide");
  nextButton.classList.add("hide");
  scoreContainer.classList.remove("hide");
  scoreDisplay.innerText = `${score} / ${questions.length}`;
  const highScore = localStorage.getItem('highScore') || 0;
  if (score > highScore) {
    localStorage.setItem('highScore', score);
  }
  const highScoreDisplay = document.createElement('p');
  highScoreDisplay.innerText = `High Score: ${localStorage.getItem('highScore')} / ${questions.length}`;
  scoreContainer.appendChild(highScoreDisplay);
  const reviewContainer = document.getElementById("review-container");
  const reviewList = document.getElementById("review-list");
  reviewContainer.classList.remove("hide");
  reviewList.innerHTML = "";
  userAnswers.forEach((item, index) => {
    const li = document.createElement("li");
    const resultClass = item.isCorrect ? 'correct-answer' : 'wrong-answer';
    li.innerHTML = `
      <strong>Q${index + 1}:</strong> ${escapeHTML(item.question)}<br/>
      Your Answer: <span class="${resultClass}">${escapeHTML(item.selected)}</span><br/>
      Correct Answer: <strong>${escapeHTML(item.correctAnswer)}</strong>
    `;
    reviewList.appendChild(li);
  });
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", handleNextButton);
loadQuestions();