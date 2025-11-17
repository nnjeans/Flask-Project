let questions = [];
let current = 0;
let score = 0;
const questionText = document.getElementById("questionText");
const choiceElems = [
    document.getElementById("choice0"),
    document.getElementById("choice1"),
    document.getElementById("choice2"),
    document.getElementById("choice3")
];
const nextBtn = document.getElementById("nextBtn");
const resultP = document.getElementById("result");
const quizDiv = document.getElementById("choice");
for (let i = 0; i < radios.length; i++) {
    radios[i].onclick = showAnswer
}


// Load questions from external JSON file
fetch('/static/data.json')
    .then(r => r.json())
    .then(data => {
        questions=data;
        showQuestion();
    })
    .catch(err => {
        console.error('Error loading questions:', err);
    });



function showAnswers() {
    let q = questions[current];
    let a = q.answer;
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].value === a){
            choiceElems[i].style = "lightgreen";
        }
    }
}





    function showQuestion() {
    let q = questions[current];
    questionText.textContent = q.text;
    const choices = [q.choice0, q.choice1, q.choice2, q.choice3];
    for (let i = 0; i < q.choices.length; i++) {
        choiceElems[i].textContent = q.choices[i];
    }
    let radios = document.getElementsByName("choice");
    for (let i = 0; i < radios.length; i++) {
        radios[i].checked = false;
        choiceElems[i].style = "";
    }
}
nextBtn.onclick = () => {
    const selected = document.querySelector('input[name="choice"]:checked');
    if (!selected) return alert("Please select an answer.");

    // Check correctness (A = 0, B = 1, C = 2)
    const answerIndex = questions[current].answer.charCodeAt(0) - 65;
    if (selected.value == answerIndex) score++;

    current++;

    if (current < questions.length) {
        showQuestion();
    } else {
        document.getElementById("quiz").style.display = "none";
        nextBtn.style.display = "none";
        resultP.textContent = `Quiz complete! You scored ${score}/${questions.length}.`;
    }
};

showQuestion();
