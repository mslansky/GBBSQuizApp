/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [{
    question: 'What color is broccoli?',
    answers: ['red', 'orange', 'pink', 'green'],
    correctAnswer: 'green',
  },
  {
    question: 'What is the current year?',
    answers: ['1970', '2015', '2019', '2005'],
    correctAnswer: '2019',
  },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
};

/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 *
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates
function generateStartPage() {
  let startPage = `
  <div class="startPage">
  <h1>Welcome to the Great British Baking Show Quiz!</h1>
  <h2>Do you have what it takes to be starbaker?</h2>
  <section class="startPageFlex">
      <div class="startPageImages">
          <div class="Paul&Prue">
              <img src="paul.png" alt="Image of Paul Hollywood"></div>
          <div class="Paul&Prue">
              <img src="prue2.png" alt="Image of Prue Leith"></div>
      </div>
  </section>
  <div class="start-button-center">
  <button class="start-button">
  <span class="button-label">Ready...Bakers...Start!</span>
  </button>
  </div>
</div>`;
  return startPage;
}

function generateQuestionPage() {
  let question = store.questions[store.questionNumber];
  console.log(question);
  let questionCount = store.questionNumber;
  questionCount++;
  let questionPage = `
<div class="card">
<p>Score:${store.score}</p>
<p>Question:${questionCount}/${store.questions.length}</p>
  <h2>${question.question}</h2>
 <form>
      <label> ${question.answers[0]}</label>
      <input type="radio" name="answer" value="${question.answers[0]}">
      <br>
      <label> ${question.answers[1]}</label>
      <input type="radio" name="answer" value="${question.answers[1]}">
      <br>
      <label> ${question.answers[2]}</label>
      <input type="radio" name="answer" value="${question.answers[2]}">
      <br>
      <label> ${question.answers[3]}</label>
      <input type="radio" name="answer" value="${question.answers[3]}">
      <br>
      <button type="submit">Submit your answer</button>
  </form>
</div>`;
  return questionPage;
}

function generateFeedback() {
  let failedAnswer = `<div class="failed">
  <p>So close! The right answer is actually ${store.questions[store.questionNumber].correctAnswer} </p>
<br/><button class="next-question">Next question</button></div>`;
  return failedAnswer;
}

function generateEndPage() {
  let endPage = `<div class="endPage">
  <h1>Great Job!</h1>
  <p>Score:${store.score}</p>
  <button class="play-again-button">
    <span class="button-label">Play Again!</span>
  </button>
  </div>`
  return endPage;
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store
function renderStartPage() {
  $('main').html(generateStartPage());
}

function renderQuestionPage() {
  $('.failed').remove();
  console.log(store.questionNumber);
  let questionHTML = generateQuestionPage();
  $('main').html(questionHTML);
}

function renderFeedback() {
  let feedback = generateFeedback();
  $('main').html(feedback);
  $('button[type=submit]').remove();
  handleNextPage();
}

function renderEndPage() {
  $('.failed').remove();
  let endPage = generateEndPage();
  $('main').html(endPage);
  handleEndPage();
}


/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function handleStartQuiz() {
  $('.start-button').on('click', function () {
    store.quizStarted = true;
    renderQuestionPage();
    console.log("Quiz Started!");
  })
}

function handleAnswerSubmit() {
  //here we put the score counter
  //let scoreCount = 0
  $('main').on("submit", function () { })
  $("main").on("submit", "form", function (evt) {
    evt.preventDefault();
    let selectedAnswer = document.querySelector('input[name="answer"]:checked').value;

    //let selectedAnswer = $(`input[type='radio]:checked`).val();
    //console.log(selectedAnswer)

    let sudoCorrectAnswer = store.questions[store.questionNumber].correctAnswer
    console.log(selectedAnswer, store.questionNumber);
    //if (store.questions[store.questionNumber].correctAnswer === selectedAnswer){
    if (sudoCorrectAnswer === selectedAnswer) {
      store.score++;
    }
    console.log(store.questionNumber);
    if ((store.questionNumber + 1) >= store.questions.length) {
      store.questionNumber++;
      renderEndPage();
    } else {
      let selectedAnswer = document.querySelector('input[name=answer]:checked').value;
      console.log(selectedAnswer);
      if (selectedAnswer !== store.questions[store.questionNumber].correctAnswer) {
        renderFeedback();
      } else {
        store.questionNumber++;
        renderQuestionPage();
      }
    }
  })
}

function handleNextPage() {
  $(".next-question").on("click", function (evt) {
    store.questionNumber++;
    renderQuestionPage();
  });
}

function handleEndPage() {
  $(".play-again-button").on("click", function (evt) {
    store.questionNumber = 0;
    store.score = 0;
    store.quizStarted = false;
    renderStartPage();
    handleStartQuiz();
  });
}


function main() {
  renderStartPage();
  handleStartQuiz();
  handleAnswerSubmit();
}
main();