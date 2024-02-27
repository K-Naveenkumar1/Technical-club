var rollNoInput = document.getElementById("rollno");
rollNoInput.addEventListener("input", function () {
    var enteredValue = rollNoInput.value;
    var uppercaseValue = enteredValue.toUpperCase();
    rollNoInput.value = uppercaseValue;
});


// Function to check if Roll Number exists in the list
async function checkRollNumber(rollNumber) {
    const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSrBVT_PlpCXrnaCEv7INMYoxls4c_yMcO6QMgdO3DU3agum-E6E7ekpUOPdnEmB6Y6ZTqpi3Qi1-St/pub?output=csv');
    const csvData = await response.text();
    const rows = csvData.split('\n');
    const rollNumbers = rows.map(row => row.split(',')[0]); // Assuming Roll Numbers are in the first column
    return rollNumbers.includes(rollNumber);
}

// Event listener for form submission
document.querySelector('form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const rollNumber = document.getElementById('rollno').value;
    const rollNumberExists = await checkRollNumber(rollNumber);
    if (rollNumberExists) {
        alert('Already Submitted. Please wait for the next quiz.');
        window.location.href = "../Quizes.html";
    } else {
        document.getElementsByClassName('quiz')[0].style.display = 'none';
        document.getElementById('quiz-container').style.display = 'block';
    }
});


const questions = [
  {
    question: "Which of the following is NOT a valid variable name in Python?",
    options: ["my_var", "myVar", "my-var", "myVar123"],
    answer: "my-var",
    selectedOption: null,
  },
  {
    question: "What is the output of the following code?\n\nprint('3' + 2)",
    options: ["5", "'32'", "TypeError", "32"],
    answer: "TypeError",
    selectedOption: null,
  },
  {
    question: "What does the 'range()' function return in Python?",
    options: ["A list of integers", "A generator object", "A tuple", "A dictionary"],
    answer: "A generator object",
    selectedOption: null,
  },
  {
    question: "What is the correct way to declare a list in Python?",
    options: ["list = {}", "list = []", "list = ()", "list = //"],
    answer: "list = []",
    selectedOption: null,
  },
  {
    question: "What is the result of the expression '3 // 2' in Python?",
    options: ["1.5", "1", "2", "0.5"],
    answer: "1",
    selectedOption: null,
  },
  {
    question: "Which of the following is NOT a valid data type in Python?",
    options: ["int", "float", "char", "bool"],
    answer: "char",
    selectedOption: null,
  },
  {
    question: "What does the 'import random' statement do in Python?",
    options: ["Imports the 'random' module", "Generates random numbers", "Imports the 'math' module", "Imports the 'datetime' module"],
    answer: "Imports the 'random' module",
    selectedOption: null,
  },
  {
    question: "Which of the following is used to comment out multiple lines in Python?",
    options: ["//", "/* ... */", "#", "''' ... '''"],
    answer: "''' ... '''",
    selectedOption: null,
  },
  {
    question: "What is the correct way to check the length of a list named 'myList' in Python?",
    options: ["len(myList)", "size(myList)", "length(myList)", "count(myList)"],
    answer: "len(myList)",
    selectedOption: null,
  },
  {
    question: "What is the output of the following code?\n\nx = 'Python'\nprint(x[1:4])",
    options: ["'Pyt'", "'ytho'", "'yth'", "'ytho'"],
    answer: "'yth'",
    selectedOption: null,
  },
];


const quizContainer = document.getElementById('quiz-container');

// Function to display questions and options
function displayQuestions() {
    questions.forEach((question, index) => {
        const questionContainer = document.createElement('div');
        questionContainer.classList.add('question-container');

        const questionText = document.createElement('p');
        questionText.classList.add('question-text');
        questionText.textContent = `${index + 1}. ${question.question}`;
        questionContainer.appendChild(questionText);

        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('options-container');
        question.options.forEach((option, optionIndex) => {
            const optionBtn = document.createElement('button');
            optionBtn.classList.add('option-btn');
            optionBtn.textContent = option;
            optionBtn.addEventListener('click', () => {
                selectOption(questionContainer, question, option);
            });
            optionsContainer.appendChild(optionBtn);
        });
        questionContainer.appendChild(optionsContainer);

        quizContainer.appendChild(questionContainer);
    });
}

// Function to handle option selection
function selectOption(questionContainer, question, selectedOption) {
    question.selectedOption = selectedOption;
    const optionBtns = questionContainer.querySelectorAll('.option-btn');
    optionBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    checkAllOptionsSelected();
}

// Function to check if all options are selected
function checkAllOptionsSelected() {
    const allOptionsSelected = questions.every(question => question.selectedOption !== null);
    if (allOptionsSelected) {
        submitBtn.disabled = false;
    }
}

// Function to calculate score
function calculateScore() {
    let score = 0;
    questions.forEach(question => {
        if (question.selectedOption === question.answer) {
            score++;
        }
    });
    return score;
}

// Function to display score
function displayScore() {
    const score = calculateScore();
    const resultContainer = document.createElement('div');
    resultContainer.className = 'score-container'
    resultContainer.textContent = `Your score: ${score} out of ${questions.length}`;
    quizContainer.appendChild(resultContainer);
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxKgv9KH_X8d2ZAR7esFgl5EozoiKzMe3oQdIgWFM1Lq-uAdxvGhgS5IMKcYGeCRa_o/exec';
    const form = document.forms['javaquiz']
    const formData = new FormData(form);
    formData.append('marks', score); // Append marks to the form data
    fetch(scriptURL, { 
    method: 'POST', 
    body: formData 
    })
    .then(response => console.log('Success!', response))
    .catch(error => console.error('Error!', error.message));
    submitBtn.disabled = true;
    quizContainer.style.pointerEvents = 'none';
}

// Initialize the quiz
displayQuestions();

const submitBtn = document.createElement('button');
submitBtn.id = 'submit-btn';
submitBtn.textContent = 'Submit';
submitBtn.disabled = true;
submitBtn.addEventListener('click', () => {
    displayScore();
});
quizContainer.appendChild(submitBtn);
