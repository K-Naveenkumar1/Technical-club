window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  e.returnValue = '';
});


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
    question: "Which of the following is NOT a valid Java identifier?",
    options: ["_variableName", "myVariable123", "123variable", "$variable"],
    explanation: "According to Java naming conventions, identifiers should begin with a letter, $, or _. Numeric literals cannot appear at the beginning of an identifier. Hence, '123variable' is not a valid identifier.",
    answer: "123variable",
    selectedOption: null,
  },
  {
    question: "What does JVM stand for in Java?",
    options: ["Java Virtual Machine", "Java Variable Manager", "Java Version Manager", "Java Visual Model"],
    explanation: "JVM stands for Java Virtual Machine, which serves as a runtime environment for compiled Java programs. It interprets Java bytecode and provides platform independence by abstracting away hardware details.",
    answer: "Java Virtual Machine",
    selectedOption: null,
  },
  {
    question: "Which keyword is used to define a class in Java?",
    options: ["class", "interface", "new", "this"],
    explanation: "To create a class definition in Java, we utilize the 'class' keyword. Interfaces, on the other hand, employ the 'interface' keyword and specify method declarations without implementation details.",
    answer: "class",
    selectedOption: null,
  },
  {
    question: "Which of the following is NOT a primitive data type in Java?",
    options: ["int", "float", "string", "boolean"],
    explanation: "Primitive data types in Java include: boolean, char, byte, short, int, long, float, double. Strings, however, are represented as objects rather than primitives, specifically through the java.lang.String class.",
    answer: "string",
    selectedOption: null,
  },
  {
    question: "What is the output of the following code?\n\nint x = 5;\nSystem.out.println(x++);",
    options: ["5", "6", "Compiles with error", "Runtime error"],
    explanation: "Postfix increment operators increase the operand's value by 1 after evaluating the expression. As a result, the initial value of x gets printed, i.e., 5.",
    answer: "5",
    selectedOption: null,
  },
  {
    question: "Which of the following is a valid way to declare an array in Java?",
    options: ["array[] x;", "int[] x = new int[];", "int x[] = new int[];", "int x[];"],
    explanation: "While all four options represent viable methods for declaring arrays in Java, the second approach ('int[] x = new int[]') adheres most closely to recommended coding practices.",
    answer: "int[] x = new int[];",
    selectedOption: null,
  },
  {
    question: "Which loop is guaranteed to execute at least once in Java?",
    options: ["for loop", "while loop", "do-while loop", "foreach loop"],
    explanation: "Do-while loops ensure minimum one-time execution, unlike standard while loops which check conditions prior to initiating iterations.",
    answer: "do-while loop",
    selectedOption: null,
  },
  {
    question: "What is the correct way to exit a loop in Java?",
    options: ["exit", "end", "break", "terminate"],
    explanation: "Utilizing the 'break' keyword within a loop facilitates immediate termination upon encountering specified criteria.",
    answer: "break",
    selectedOption: null,
  },
  {
    question: "Which keyword is used to define a constant in Java?",
    options: ["constant", "final", "static", "const"],
    explanation: "Final variables in Java serve as constants when initialized during declaration, thereby preventing further modifications.",
    answer: "final",
    selectedOption: null,
  },
  {
    question: "What is the result of 5 + 7 * 2 in Java?",
    options: ["14", "24", "19", "None of the above"],
    explanation: "Due to operator precedence rules, multiplication takes priority over addition resulting in 5 + 14 yielding 19.",
    answer: "19",
    selectedOption: null,
  }
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

  questions.forEach((question, index) => {
      const questionContainer = document.getElementsByClassName('question-container')[index];
      const optionBtns = questionContainer.querySelectorAll('.option-btn');
      optionBtns.forEach(btn => {
          if (question.selectedOption === question.answer) {
              if (btn.textContent === question.selectedOption) {
                  btn.classList.add('correct');
              }
          } else {
            if (btn.textContent === question.selectedOption) {
              btn.classList.add('wrong');
              const explanationText = document.createElement('p');
              explanationText.textContent = `Explanation: ${question.explanation}`;
              questionContainer.appendChild(explanationText);
          }
              if (btn.textContent === question.answer) {
                  btn.classList.add('correct');
              }
          }
          // Disable option buttons
          btn.disabled = true;
      });
  });

  const scriptURL = 'https://script.google.com/macros/s/AKfycbwmQsn96L_pEGIgUvbNltqRjlpKYbhAHbEeev8xHNZ_sUIGSWAjOQ6IRv1pfm81_QVM1w/exec';
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
