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
      const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRl2xBjqqa88h3pPYU3vpRWQ8XqxqQEOFtX15ICWLRU3_428l5LvBDtvqiH-COfUJxTYMRt6BstTRsZ/pub?gid=0&single=true&output=csv');
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
    question: "Which of these symbols represents a single line comment token in Java?",
    options: ["#", "/", "/*", "//"],
    explanation: "Two forward slashes (//) indicate a single line comment in Java. Anything written afterwards until the end of the line will be ignored by the compiler.",
    answer: "//",
    selectedOption: null,
    },
    {
    question: "How do you declare a final integer variable named 'counter' and initialize it to zero in Java?",
    options: ["final int counter = 0;", "integer final counter = 0;", "final int= 0 counter;", "int final counter = 0;"],
    explanation: "Declare and initialize a final integer variable in Java by typing 'final int counter = 0;'. Final variables can only be assigned a value once.",
    answer: "final int counter = 0;",
    selectedOption: null,
    },
    {
    question: "What is the purpose of semicolons (;) in Java?",
    options: ["Terminate statements.", "Separate arguments in a method call.", "Combine two lines together.", "Convert strings to integers."],
    explanation: "Semicolons (;) separate individual statements in Java, indicating the end of the statement.",
    answer: "Terminate statements.",
    selectedOption: null,
    },
    {
    question: "Choose the correct Java statement for printing 'Hello World' to the console:",
    options: ['print("Hello World!");', 'system.out.println("Hello World");', 'Console.WriteLine("Hello World");', 'System.out.print("Hello World");'],
    explanation: "Use the 'System.out.print' or 'System.out.println' statement in Java to write text to the console. Write 'System.out.println('Hello World');' to print 'Hello World' followed by a line break.",
    answer: 'System.out.print("Hello World");',
    selectedOption: null,
    },
    {
    question: "Which looping structure best fits situations requiring repeated actions a known number of times in Java?",
    options: ["For Loop", "While Loop", "Do While Loop", "Switch Case Statement"],
    explanation: "Out of the available options, the 'For Loop' is the ideal choice for performing repetitive tasks a fixed amount of times. Its initialization, condition, and update components enable easy control flow management.",
    answer: "For Loop",
    selectedOption: null,
    },
    {
    question: "When should you use a 'do-while' loop instead of a regular 'while' loop in Java?",
    options: ["Whenever you require a specific action performed exactly once.", "If unsure whether the controlling condition will ever evaluate as true.", "When you don't know when the loop should stop ahead of time.", "For sorting algorithms needing a custom stopping point."],
    explanation: "Choose a 'do-while' loop whenever you desire a particular action carried out at least once regardless of the controlling condition. Unlike traditional 'while' loops, 'do-whiles' test the condition after completing the loop block.",
    answer: "If unsure whether the controlling condition will ever evaluate as true.",
    selectedOption: null,
    },
    {
    question: "Select the correct format for an If-Else statement in Java:",
    options: ["if (condition) {statement;} else {elseStatement;}", "if (condition) then {statement;} else {elseStatement;}", "if (condition) {statement;} else {elseStatement};", "if (condition) -> {statement;} else -> {elseStatement};"],
    explanation: "An If-Else statement in Java follows the pattern 'if (condition) {statement;} else {elseStatement}'. Curly braces ({}) surround both the 'statement' and 'elseStatement', defining blocks of code associated with each branch.",
    answer: "if (condition) {statement;} else {elseStatement;}",
    selectedOption: null,
    },
    {
    question: "Pick the correct Java syntax representing a switch case statement:",
    options: ["switch (expression) {\r\ncases label:\r\nstatements;\r\nbreak;\r\ndefault:\r\nstatements;\r\n}", "(expression) switch {\r\nlables:\r\nstatements;\r\nbreak;\r\ndefault:\r\nstatements;\r\n}", "switch (expression):\r\nlabels:\r\nstatements\r\nbreak\r\ndefault:\r\nstatements", "switch (expression)\r\ncase label:\r\nstatements;\r\nbreak;\r\ndefault:\r\nstatements;\r\nbreak;\r\n"],
    explanation: "Write a switch case statement in Java using the following pattern: '\nswitch (expression) {\r\ncases label:\r\nstatements;\r\nbreak;\r\ndefault:\r\nstatements;\r\n}\n'. Labels correspond to possible cases evaluated inside the switch block. Statements follow each labeled section, ending with a mandatory 'break' command.",
    answer: "switch (expression) {\r\ncases label:\r\nstatements;\r\nbreak;\r\ndefault:\r\nstatements;\r\n}",
    selectedOption: null,
    },
    {
    question: "Identify the correct Java datatype corresponding to the whole number range (-128 to 127)",
    options: ["byte", "short", "int", "long"],
    explanation: "Choose 'byte' as the appropriate Java datatype capable of storing values within the range of -128 to 127.",
    answer: "byte",
    selectedOption: null,
    },
    {
    question: "Determine the incorrect way to declare a String variable in Java:",
    options: ["String greeting = 'Hello';", "str greeting = 'World!'';", "Greeting str = 'Java';", "String greet = 'Programming';"],
    explanation: "Strings in Java are often referred to as reference types, meaning they require the 'new' keyword for proper allocation. Nevertheless, Java automatically recognizes quoted sequences ('...') as instances of the String class even without explicit memory reservation.",
    answer: "str greeting = 'World!';",
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
  
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyscKH8TxEJqaQ4PVIn2w6ldvaf0mY0GZnUnbBrSAmVYASxGxOdPSBiG11yejIRt3xD/exec';
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
  
