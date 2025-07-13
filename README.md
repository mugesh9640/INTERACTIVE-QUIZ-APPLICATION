#INTERACTIVE-QUIZ-APPLICATION

  Welcome to the Frontend Quiz Application! This project is a fully functional, interactive quiz app built using HTML, CSS, and JavaScript. It allows users to answer multiple-choice questions and provides instant feedback, score tracking, high score saving, and answer review after submission.

#Features

  Dynamic question loading from a JSON file

  Random question order

  Countdown timer per question (10 seconds)

  Unanswered questions are counted as incorrect

  Instant feedback on correct/wrong answers

  Score tracking and localStorage high score

  Answer review list after the quiz

  HTML-escaped rendering for special tags (<, >, etc.)

  Progress bar to track question progression

  Responsive layout with minimal styling

  Replayable anytime!

#Project Structure
  Interactive-Quiz-App/
│
├── index.html          # Main HTML file
├── style.css           # Custom styles
├── script.js           # Quiz logic
├── questions.json      # Question database
└── README.md           # Project documentation

#Getting Started

  Follow the steps below to set up and run the application.

1️. Clone the Repository

git clone https://github.com/mugesh9640/INTERACTIVE-QUIZ-APPLICATION.git
cd frontend-quiz-app

2️. Add the questions.json File

Make sure you have a valid questions.json file with this format:

[
  {
    "question": "What does HTML stand for?",
    "answers": [
      { "text": "Hyper Text Markup Language", "correct": true },
      { "text": "High Tech Machine Language", "correct": false },
      { "text": "Home Tool Markup Language", "correct": false },
      { "text": "Hyperlinks and Text Markup Language", "correct": false }
    ]
  },
  ... more questions ...
]

We recommend at least 15 questions for best user experience.

3. Open in Browser

No server needed! Just open index.html in your browser:

start index.html  # On Windows
open index.html   # On macOS

  Understanding the Code

#index.html

Hosts the layout of the quiz

Includes:

Question title

Timer

Buttons for each answer

Progress bar

Score and review containers

#style.css

Minimal custom styling for:

Buttons (default, correct, wrong)

Container box

Timer display

Progress bar

#script.js

The brain of the quiz! It handles:

Loading questions from questions.json

Timer countdown (10s/question)

Scoring logic

Answer checking

Review list creation

Escaping HTML characters in output

Preventing double answers

localStorage high score logic

#questions.json

Contains all the multiple-choice questions in JSON format. Each question has:

question: String

answers: Array of objects with text and correct

#Sample Question Format

{
  "question": "Which tag is used to display an image in HTML?",
  "answers": [
    { "text": "<img>", "correct": true },
    { "text": "<image>", "correct": false },
    { "text": "<pic>", "correct": false },
    { "text": "<src>", "correct": false }
  ]
}

Make sure all HTML symbols like <, > are inside strings.

#Escaping HTML in Answers

To ensure tags like <script> or <img> display properly, script.js uses a function:

function escapeHTML(str) {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;");
}

This protects against rendering HTML inside answer text.

#How Unanswered Questions Are Handled

If user doesn’t click an option within 10 seconds

recordUnanswered() is triggered

The question is marked as:

Selected: "Not Answered"

isCorrect: false

-This ensures fairness and accurate scoring.

-Review Section

After quiz completion:

All questions are listed

You see:

Q number

Your answer (with correct/wrong color)

Correct answer

Example:

Q3: What is the correct HTML tag for a hyperlink?
Your Answer: <a>
Correct Answer: <a>

#High Score Tracking

Automatically stored in localStorage

Displays at the end of the quiz

Updates only if current score is higher

#Tools & Tech

HTML5

CSS3

JavaScript (Vanilla)

Browser LocalStorage

No frameworks. No dependencies. 100% frontend-only app.

#Tips for Customization

Want to customize?

Update questions.json with your own questions

Style it in style.css

Customize logic in script.js

Replace timer, add audio, or build with React!

Developed by,
 Mugesh.M
