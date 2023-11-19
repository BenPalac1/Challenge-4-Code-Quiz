// array of questions and answers

const questions = [
  {
    question: 'Commonly used data types do NOT include:',
    options: ['strings', 'booleans', 'alerts', 'numbers'],
    correctAnswer: 'alerts',
  },

  {
    question: 'DOM stands for _____.',
    options: ['Download Or Modify', 'Duplicate Or Match', 'Document Object Model', 'Defrag Over Manipulate'],
    correctAnswer: 'Document Object Model',
  },

  {
    question: 'A common coding language used for styling is _____.',
    options: ['XYZebra', 'Picture Perfect', 'CSS', 'StylesRuS'],
    correctAnswer: 'CSS',
  },

  {
    question: 'A common application used to traverse a computer and its files is a _____.',
    options: ['Slack', 'Terminal', 'Task Manager', 'Menu'],
    correctAnswer: 'Terminal',
  },

  {
    question: 'API stands for _____.',
    options: ['Actual Percentage Incurred', 'Augmented Post Intervals', 'It does not stand for anything', 'Application Programming Interface'],
    correctAnswer: 'Application Programming Interface',
  },

  {
    question: 'BONUS QUESTION!! Who would win in a fight, Lemmy or God?',
    options: ['Lemmy', 'God', 'Neither', 'Trick question, Lemmy is God'],
    correctAnswer: 'Trick question, Lemmy is God',
  },
];

const pointsPerQuestion = 20;
const penaltyTime = 10;

let currentQuestion = 0;
let score = 0;
let timerSeconds = 60;
let timerInterval;
let highScores = [];

const startButton = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const scoreElement = document.getElementById("score");
const scoreValueElement = document.getElementById("score-value");
const initialsForm = document.getElementById("initials-form");
const initialsInput = document.getElementById("initials");
const saveScoreButton = document.getElementById("save-score-btn");
const highScoresList = document.getElementById("high-scores-list");
const highScoresContainer = document.getElementById("high-scores");
const timerDisplay = document.getElementById("timer-display");
const viewScoresButton = document.getElementById("view-scores-btn");
const restartButton = document.getElementById("restart-btn");




function startQuiz() {
    startButton.style.display = "none";
    quizContainer.style.display = "block";
    startTimer();
    loadQuestion();
}

function loadQuestion() {
    const currentQuizQuestion = questions[currentQuestion];
    questionElement.textContent = currentQuizQuestion.question;

    optionsElement.innerHTML = "";
    for (const option of currentQuizQuestion.options) {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "option";
        button.addEventListener("click", () => checkAnswer(option));
        optionsElement.appendChild(button);
    }
}

function checkAnswer(selectedOption) {
    const currentQuizQuestion = questions[currentQuestion];
    if (selectedOption === currentQuizQuestion.correctAnswer) {
        score += pointsPerQuestion;
    } else {
        timerSeconds -= penaltyTime;
        if (timerSeconds < 0) {
            timerSeconds = 0;
        }
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    stopTimer();
    questionElement.textContent = "Quiz completed!";
    optionsElement.innerHTML = "";
    scoreValueElement.textContent = score;
    scoreElement.removeAttribute("hidden");
    initialsForm.removeAttribute("hidden");

    restartButton.removeAttribute("hidden");
}

function restartQuiz() {
    // Reset quiz variables
    currentQuestion = 0;
    score = 0;
    timerSeconds = 60;

    // Hide the "Restart Quiz" button
    restartButton.setAttribute("hidden", "true");

    // Clear high scores display
    highScoresContainer.setAttribute("hidden", "true");
    highScoresList.innerHTML = "";

    // Start a new quiz
    startQuiz();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timerSeconds--;
        if (timerSeconds < 0) {
            stopTimer();
            endQuiz();
        }
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function saveScore() {
    const initials = initialsInput.value.toUpperCase();
    if (initials && score > 0) {
        const newScore = { initials, score };
        highScores.push(newScore);
        highScores.sort((a, b) => b.score - a.score);
        showHighScores();
    }
}

function viewHighScores() {
    // Load high scores from local storage
    showHighScores(highScores);
}    

function showHighScores() {
    initialsForm.style.display = "none";
    highScoresList.innerHTML = "";
    highScores.forEach((score, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${score.initials} - ${score.score}`;
        highScoresList.appendChild(li);
    });

    highScoresContainer.removeAttribute("hidden");
}


startButton.addEventListener("click", startQuiz);
saveScoreButton.addEventListener("click", saveScore);
viewScoresButton.addEventListener("click", viewHighScores);
restartButton.addEventListener("click", restartQuiz);