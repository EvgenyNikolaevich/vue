import _ from 'lodash';
import { SendRequest } from './send_request.js';
import { QuizState } from './quiz_state.js';

const startQuizButton = document.getElementById('start_quiz_button');
const sendAnswerButton = document.getElementById('send_answer_button');
const restartQuizButton = document.getElementById('restart_quiz_button');
const returnBackButton = document.getElementById('return_back_button');

const questionElement = document.querySelector('#question p');

let correctAnswersCount = 0;

function updateAnswers(numberOfQuestion, quizState, checkedAnswer) {
    const currentState = quizState.getState();

    let count = quizState.getCount();
    let currentAnswers = currentState.getAnswersObject();
    let currentQuestion = currentState.getQuestion();
    let previousCount, previousAnswers;

    currentAnswers.initRadioButtons(count);

    if (count) {
        previousCount = count - 1;
        previousAnswers = quizState.getStateByIndex(previousCount).getAnswersObject();

        previousAnswers.hideRadioButtons(previousCount);

        if (previousAnswers.getAnswerCorrectness(checkedAnswer)) {
            correctAnswersCount += 1;
        }
    }


    if (count < numberOfQuestion) {
        sendAnswerButton.removeAttribute('hidden');
        questionElement.innerHTML = currentQuestion;
    }

    if (count === numberOfQuestion - 1) {
        const resultElement = document.getElementById('quiz_result');

        resultElement.hidden = false;
        questionElement.hidden = true;
        restartQuizButton.hidden = false;

        sendAnswerButton.setAttribute('hidden', true);

        currentAnswers.update(count, correctAnswersCount, numberOfQuestion);
        currentAnswers.hideRadioButtons(count);
    }

    quizState.increaseCount();
}

function updateAnswersBack(numberOfQuestion, quizState, checkedAnswer) {
    quizState.decreaseCount();

    const currentState = quizState.getState();

    let count = quizState.getCount();
    let currentAnswers = currentState.getAnswersObject();
    let currentQuestion = currentState.getQuestion();
    let previousCount, previousAnswers;

    currentAnswers.showRadioButtons(count);

    if (count) {
        previousCount = count;
        previousAnswers = quizState.getStateByIndex(previousCount).getAnswersObject();

        previousAnswers.hideRadioButtons(previousCount);

        if (previousAnswers.getAnswerCorrectness(checkedAnswer)) {
            correctAnswersCount -= 1;
        }
    }


    if (count < numberOfQuestion) {
        sendAnswerButton.removeAttribute('hidden');
        questionElement.innerHTML = currentQuestion;
    }

    if (count === numberOfQuestion - 1) {
        const resultElement = document.getElementById('quiz_result');

        resultElement.hidden = false;
        questionElement.hidden = true;
        restartQuizButton.hidden = false;

        sendAnswerButton.setAttribute('hidden', true);

        currentAnswers.update(count, correctAnswersCount, numberOfQuestion);
        currentAnswers.hideRadioButtons(count);
    }
}


function initQuiz(results) {
    const quizState = new QuizState(results);

    startQuizButton.setAttribute('hidden', true);
    updateAnswers(results.length, quizState);

    sendAnswerButton.onclick = function(event) {
        const checkedAnswer = document.querySelector('input[name="answers"]:checked').value;

        updateAnswers(results.length, quizState, checkedAnswer);

        returnBackButton.removeAttribute('hidden');
        returnBackButton.onclick = function(event) {
            updateAnswersBack(results.length, quizState, checkedAnswer);
        };
    };
}

startQuizButton.onclick = function(event) {
    const linkForQuiz = 'https://opentdb.com/api.php?amount=6&type=multiple';
    const method = 'POST';
    const createRequest = new SendRequest(method, linkForQuiz);
    const callRequest = createRequest.getResponse.bind(createRequest);

    callRequest()
        .then(({ results }) => initQuiz(results))
        .catch((err) => err);
};

restartQuizButton.onclick = function() {
    document.location.reload();
};
