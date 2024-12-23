let questions = [];
let currentQuestion = 0;
let score = 0;
let userName = '';  
let userEmail = ''; 


window.addEventListener('DOMContentLoaded', () => {
    fetchQuestions();
});

function fetchQuestions() {
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
            if (!questions.length) {
                alert('No questions found.');
            }
        });
}

function startQuiz() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!name || !email) {
        alert('Please fill in your name and email to start the quiz.');
        return;
    }

    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    userName = name;
    userEmail = email;

    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    const questionData = questions[currentQuestion];
    document.getElementById('question').innerText = questionData.question;

    const answersElement = document.getElementById('answers');
    answersElement.innerHTML = questionData.options
        .map((option, index) => 
            `<label>
                <input type="radio" name="answer" value="${index}"> ${option}
            </label>`
        )
        .join('');

}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    
    if (!selectedOption) {
        alert('Please select an answer.');
        return;
    }

    if (questions[currentQuestion].options[selectedOption.value] === questions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;
    
  document.getElementById('progress').style.width = `${(currentQuestion / questions.length) * 100}%`;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('result-page').style.display = 'block';

    const percentage = Math.round((score / questions.length) * 100);

    document.getElementById('result-name').innerText = userName;
    document.getElementById('result-email').innerText = userEmail;
    document.getElementById('score-percentage').innerText = `${percentage}%`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;

    document.getElementById('result-page').style.display = 'none';
    document.getElementById('landing-page').style.display = 'block';

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
}
