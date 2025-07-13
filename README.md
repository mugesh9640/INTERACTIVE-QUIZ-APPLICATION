# INTERACTIVE-QUIZ-APPLICATION

A Interactive Quiz Application built using HTML, CSS, and JavaScript, designed to test and improve frontend development knowledge.

#Features

  -Randomized multiple-choice questions

  -Timer with 10 seconds per question

  -Score tracking with high score saved in browser(localStorage)

  -Auto-mark wrong if no answer selected before timeout

  -Review section showing all answers with correctness

  -Progress bar and current question indicator(e.g.,5/15)

#Project Structure

quiz-app

  -index.html     # Main HTML page
  -style.css      # Styling for the quiz UI
  -script.js      # Main quiz logic
  -questions.json # Question bank (15 frontend questions)

#How to Run

Clone or Download this repository:

https://github.com/Mugesh/Interactive-Quiz-Application

Open index.html in your web browser

#That's it! The quiz will load dynamically from questions.json.

#Sample Question Format (questions.json)

{
  "question": "What does HTML stand for?",
  "answers": [
    { "text": "Hyper Text Markup Language", "correct": true },
    { "text": "Home Tool Markup Language", "correct": false },
    { "text": "High Tech Machine Language", "correct": false },
    { "text": "Hyperlinks and Text Markup Language", "correct": false }
  ]
}

#To Customize

 -Add/remove questions in questions.json

 -Modify styles in style.css

 -Update timing and scoring logic in script.js

#Tech Stack

  -HTML5

  -CSS3

  -JavaScript(ES6)

#output screenshots

Developed by,
Mugesh M
