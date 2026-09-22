const quizData = [
    {
        question: "What does DOM stand for?",
        options: ["Document Order Model", "Document Object Model", "Data Object Method", "Direct Object Management"],
        correct: 1,
    },
    {
        question: "Which method selects by ID?",
        options: ["getElementById()", "querySelectorAll()", "getElement()", "getElementsByClassName()"],
        correct: 0,
    },
    {
        question: "Which event fires on input change?",
        options: ["click", "submit", "change", "keydown"],
        correct: 2,
    },
];

let questions = [...quizData].sort(() => Math.random() - 0.5);

let cureentQuestion = 0;
let score = 0;
let timer;
let timeLeft;

console.log(questions);

const questionEl = document.getElementById("question");
const optionEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const timerEl = document.getElementById("timer");
const resultEl = document.getElementById("result");

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 15;
    updateTimer();
    timer = setInterval(countDown, 1000);
    const q = questions[cureentQuestion];
    questionEl.textContent = `Q${cureentQuestion + 1}. ${q.question}`;

    optionEl.innerHTML = "";

    q.options.forEach((option, index) => {
        const btn = document.createElement("butotn");
        btn.classList.add("option-btn");
        btn.textContent = option;

        btn.addEventListener("click", () => selectAnswer(index, true));
        optionEl.appendChild(btn);
    });

    nextBtn.style.display = "none";
}

function countDown() {
    timeLeft--;
    updateTimer();

    if (timeLeft === 0) {
        clearInterval(timer);
        selectAnswer(questions[cureentQuestion]?.correct, false);
    }
}
// console.log(object);

function updateTimer() {
    timerEl.textContent = `⏱ ${timeLeft}`;
}

function selectAnswer(index, shouldScore) {
    clearInterval(timer);

    const q = questions[cureentQuestion];

    const buttons = document.querySelectorAll(".option-btn");

    buttons.forEach((btn) => (btn.ariaDisabled = true));
    if (index === q.correct) {
        shouldScore && score++;
        buttons[index].classList.add("correct");
    } else {
        buttons[index].classList.add("wrong");
        buttons[q.correct].classList.add("correct");
    }

    nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
    cureentQuestion++;

    if (cureentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    nextBtn.style.display = "none";
    const highScore = localStorage.getItem("quizeHighScore") || 0;
    const isNew = score > highScore;

    if (isNew) {
        localStorage.setItem("quizeHighScore", score);
    }

    resultEl.innerHTML = `
    <h2>Hurray!!! Quiz Completed</h2>
    <p>You have scored ${score} out of ${questions.length} questions </p>
    <p>Highest Score: ${Math.max(score, highScore)} </p>
    ${isNew ? "<p>Hey, New High Score!</p>" : ""}
    <button onClick={"location.reload()"}>Restard Quiz</button>
    `;
}

loadQuestion();
