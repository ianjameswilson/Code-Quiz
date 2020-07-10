// questions *****************************************************
var questions = [
    {
        title: "Arrays are created with:",
        choices: ["()", "' '", "{}", "[]"],
        answer: "[]"
    },
    {
        title: "Commonly Used data types DO NOT include:",
        choices: ["strings", "alerts", "booleans", "numbers"],
        answer: "alerts"
    },
    {
      title: "This property returns the number of code units in the string",
      choices: [".concat", ".com", ".length", ".que"],
      answer: ".length"
    },
    {
      title: ".push() is an array method that _________ items to an array",
      choices: ["divides", "adds", "subtracts", "multiplies"],
      answer: "adds"
    },
    {
        title: "The condition in an if / else statment is enclosed within _____.",
        choices: ["()", "''", "{}", "[]"],
        answer: "()"
    },
    {
        title: "What javascipt method can we use to select an html element?",
        choices: ["document.queryselector()", "document.getElementChild", "document.getElementById", "Both 1 and 3"],
        answer: "Both 1 and 3"
    },
    {
      title: "__________ outputs a message to the web console",
      choices: ["console.start", "console.load", "console.web", "console.log"],
      answer: "console.log"
    },
    {
      title: "The .ceil() method rounds a number ________ to the nearest integer, and returns the result",
      choices: ["downwards", "upwards", "negative", "positive"],
      answer: "upwards"
  },
  {
    title: "The index() method returns the index position of specified elements relative to other specified elements ",
    choices: ["false", "true", "null", "undefined"],
    answer: "true"
  },
    {
        title: "The break keyword allows programs to ___________",
        choices: ["reload page", "leave a loop during execution", "increment", "decrement"],
        answer: "leave a loop during execution"
    }
]



// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 7.5;
var timerId;

// variables to reference DOM elements....................................
var timeEl = document.querySelector("#time");
var startBtn = document.querySelector("#start-button");
var submitBtn = document.querySelector("#submit-button");
var titleScreen = document.querySelector("#title-section");
var quizScreen = document.querySelector("#quiz-section");
var highScoreScreen = document.querySelector("#highscore-section");
var highScoreDisplay = document.querySelector("#highscore-display-section");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

var questionsEl = document.querySelector("#question");
var choicesEl = document.querySelector("#choices");


//create a function to start the game
function startQuiz() {
    // hide start screen
    titleScreen.setAttribute("class", "hide");
  
    // un-hide questions section
    quizScreen.setAttribute("class", "show");
  
    // start timer
    timerId = setInterval(tick, 1000);
  
    // show starting time
    timeEl.textContent = time;
  
    getQuestion();
  }

  //create a second taken off of a clock
  function tick() {
    // update time
    time--;
    timeEl.textContent = time;
  
    // check if user ran out of time
    if (time <= 0) {
      quizEnd();
    }
  }

  function getQuestion() {
    // get current question object from array
    var currentQuestion = questions[currentQuestionIndex];
  
    // update title with current question
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;
  
    // clear out any old question choices
    choicesEl.innerHTML = "";
  
    // loop over choices
    currentQuestion.choices.forEach(function(choice, i) {
      // create new button for each choice
      var choiceNode = document.createElement("button");
      choiceNode.setAttribute("class", "choice");
      choiceNode.setAttribute("value", choice);
  
      choiceNode.textContent = i + 1 + ". " + choice;
  
      // attach click event listener to each choice
      choiceNode.onclick = questionClick;
  
      // display on the page
      choicesEl.appendChild(choiceNode);
    });
  }

// click on question answer either generate new question or end quiz if final question, and deduct time for answering wrong
  function questionClick() {
    // check if user guessed wrong
    if (this.value !== questions[currentQuestionIndex].answer) {
      // penalize time
      time -= 10;
  
      if (time < 0) {
        time = 0;
      }
  
      // display new time on page
      timeEl.textContent = time;
  
  
      feedbackEl.textContent = "Wrong!";
    } else {

      feedbackEl.textContent = "Correct!";
    }
  
    // flash right/wrong feedback on page for half a second
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);
  
    // move to next question
    currentQuestionIndex++;
  
    // check if we've run out of questions
    if (currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
  }


// end the quiz function
  function quizEnd() {
    // stop timer
    clearInterval(timerId);
  
    // show end screen
    var highscoreSectionEl = document.querySelector("#highscore-section");
    highscoreSectionEl.setAttribute("class", "show");
  
    // show final score
    var finalScoreEl = document.querySelector("#final-score");
    finalScoreEl.textContent = time;
  
    // hide questions section
    quizScreen.setAttribute("class", "hide");
  }

// function for saving highscore
function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value.trim();
  
    // make sure value wasn't empty
    if (initials !== "") {
      // get saved scores from localstorage, or if not any, set to empty array
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
  
      // format new score object for current user
      var newScore = {
        score: time,
        initials: initials
      };
  
      // save to localstorage
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
  
      // redirect to next page
      window.location.href = "highScore.html";
    }
  }

  function checkForEnter(event) {
    // "13" represents the enter key
    if (event.key === "Enter") {
      saveHighscore();
    }
  }
  
  // user clicks button to submit initials
  submitBtn.onclick = saveHighscore;
  
  // user clicks button to start quiz
  startBtn.onclick = startQuiz;
  
  initialsEl.onkeyup = checkForEnter;
