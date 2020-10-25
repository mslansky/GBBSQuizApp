/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [{
    question: 'What is the name of The Great British Baking Show in England?',
    answers: ['The Great English Baking Show', 'The Great British Bake Off', 'Greatest British Bake Off Show', 'The English Bake Off'],
    correctAnswer: 'The Great British Bake Off',
  },
  {
    question: 'How do they test the ovens for consistency?',
    answers: ['Each oven is tested with an oven thermometer', 'Once a week the ovens are maintenced by a professional', 'Every day, every oven is used to bake a Victoria sponge cake', 'They expect the contestants to regulate thier own ovens'],
    correctAnswer: 'Every day, every oven is used to bake a Victoria sponge cake',
  },
  {
    question: 'Prospective contestant bakers must fill out an application with how many pages?',
    answers: ['Seven', 'Thirteen', 'Four', 'Twenty-One'],
    correctAnswer: 'Seven',
  },
  {
    question: 'How are the ingredients for each bake-off paid for?',
    answers: ['The show production company reimburses the bakers', 'The show crowd-funds for the cost of ingredients', 'The ingredients are gifted by a sponsored bakery', 'The contestents pay for the ingredients they use on thier own'],
    correctAnswer: 'The contestents pay for the ingredients they use on thier own',
  },
  {
    question: 'Last season, how many eggs in total did the bakers use?',
    answers: ['490', '1,600', '900', '2,500'],
    correctAnswer: '1,600',
  },
  {
    question: 'What is a soggy bottom?',
    answers: ['An undercooked bottom portion of your pastry', 'Leaky filling ruining your dessert', 'Tea cakes soaked in brandy', 'A tasty British treat'],
    correctAnswer: 'An undercooked bottom portion of your pastry',
  },
  {
    question: 'What is the technical challenge?',
    answers: ['A challenge where bakers have to deconstruct the ingredients of a pastry given to them', 'A challenge where the bakers can make anything they want', 'A challenge where bakers have to follow a recipe with missing instructions', 'A challenge for the judges to complete to show thier skills'],
    correctAnswer: 'A challenge where bakers have to follow a recipe with missing instructions',
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
  <section class="flexboxImages">
      <div class="startPageImages">
          <div class="PaulPrue">
              <img src="paul.png" alt="Image of Paul Hollywood"></div>
          <div class="PaulPrue">
              <img src="prue2.png" alt="Image of Prue Leith"></div>
      </div>
  </section>
  <div class="start-button-center">
  <button class="start-button">
  <span class="button-label">Ready...Bakers...Start!</span>
  </button>
  </div>
  <br/>
</div>`
  return startPage;
}

function generateQuestionPage() {
  let question = store.questions[store.questionNumber];
  console.log(question);
  let questionCount = store.questionNumber;
  questionCount++;
  let questionPage = `
<div class="card">
<div class="counters">
<p> Your Score : ${store.score}</p>
<p> Question Number : ${questionCount} / ${store.questions.length}</p>
</div>
  <h2>${question.question}</h2>
  <br/>
 <form>
      <div class="questionFormat">
      <input type="radio" name="answer" value="${question.answers[0]}">
      <label> ${question.answers[0]}</label>
      </div>
      <br/>

      <div class="questionFormat">
      <input type="radio" name="answer" value="${question.answers[1]}">
      <label> ${question.answers[1]}</label>
      </div>
      <br/>

      <div class="questionFormat">
      <input type="radio" name="answer" value="${question.answers[2]}">
      <label> ${question.answers[2]}</label>
      </div>
      <br/>

      <div class="questionFormat">
      <input type="radio" name="answer" value="${question.answers[3]}">
      <label> ${question.answers[3]}</label>
      </div>
      <br/>
      <br/>
      <br/>
    <div class="submit-button">
    <button type="submit">Give it a go!</button>
    </div>
    <br/>
  </form>
</div>`;
  return questionPage;
}

function generateFeedback() {
  let failedAnswer =
    `<div class="failed">
  <br/>
  <p>Blimey! That isn't right Mate.</p>
  <p>The right answer is actually : ${store.questions[store.questionNumber].correctAnswer} </p>
  <br/>
  <img src="https://media3.s-nbcnews.com/j/newscms/2020_39/3414748/200924-great-british-bake-off-ew-457p_4a3b4f2665f699cb673979c50d45ae4b.fit-760w.jpg">
  <br/>
  <br/>
  <div class ="failed-button">
  <button class="next-question">Cheers! Next Question</button>
  </div>
  <br/>
  </div>`;
  return failedAnswer;
}

function generateEndPage() {
  let endPage =
    `<div class="endPage">
  <br/>
  <h1>Jammy Job!</h1>
  <h2>You got ${store.score} correct!</h2>
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
  $('main').on("submit", function () { })
  $("main").on("submit", "form", function (evt) {
    evt.preventDefault();
    let selectedAnswer = document.querySelector('input[name="answer"]:checked').value;
    let sudoCorrectAnswer = store.questions[store.questionNumber].correctAnswer
    console.log(selectedAnswer, store.questionNumber);
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